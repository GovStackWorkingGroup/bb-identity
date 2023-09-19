const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  contentTypeHeader,
  walletGenerateLinkCodeEndpoint,
  XSRF_TOKEN,
  X_XSRF_TOKEN,
  transactionId,
  walletGenerateLinkCodeResponseSchema,
  walletLinkTransactionEndpoint,
  walletGenerateLinkAuthCodeEndpoint,
  walletLinkedAuthenticateEndpoint,
  walletConsentEndpoint,
  individualId,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specWalletGenerateLinkCode;
let specWalletLinkTransaction;
let specWalletGenerateLinkAuthCode;
let specWalletConsent;
let specWalletGenerateLinkCodeReused;
let specWalletLinkedAuthenticate;

const baseUrl = localhost + walletGenerateLinkCodeEndpoint;
const endpointTag = { tags: `@endpoint=/${walletGenerateLinkCodeEndpoint}` };

Before(endpointTag, () => {
  specWalletGenerateLinkCode = spec();
  specWalletLinkTransaction = spec();
  specWalletGenerateLinkAuthCode = spec();
  specWalletConsent = spec();
  specWalletGenerateLinkCodeReused = spec();
  specWalletLinkedAuthenticate = spec();
});

// Scenario: Successfully generates link code smoke type test
Given(/^Wants to generate link code$/, () => 'Wants to generate link code');

When(
  /^Send POST \/linked-authorization\/link-code request with given X-XSRF-TOKEN header, XSRF-TOKEN cookie, transactionId and requestTime$/,
  () => {
    specWalletGenerateLinkCode
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: transactionId,
        },
      });
  }
);

Then(/^Receive a response from the \/linked-authorization\/link-code endpoint$/, async () => {
  await specWalletGenerateLinkCode.toss();
});

Then(
  /^The \/linked-authorization\/link-code endpoint response should be returned in a timely manner (\d+) ms$/,
  (responseTime) => {
    specWalletGenerateLinkCode.response().to.have.responseTimeLessThan(responseTime);
  }
);

Then(/^The \/linked-authorization\/link-code endpoint response should have status (\d+)$/, (statusCode) => {
  specWalletGenerateLinkCode.response().to.have.status(statusCode);
});

Then(
  /^The \/linked-authorization\/link-code response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) => {
    specWalletGenerateLinkCode
      .response()
      .should.have.headerContains(key, value)
  }
);

Then(/^The \/linked-authorization\/link-code endpoint response should match json schema$/, () => {
  chai.expect(specWalletGenerateLinkCode._response.json).to.be.jsonSchema(walletGenerateLinkCodeResponseSchema);
  chai.expect(specWalletGenerateLinkCode._response.json.errors).to.be.empty;
});

Then(
  /^The \/linked-authorization\/link-code response should contain transactionId property equals provided transactionId$/,
  () => {
    chai.expect(specWalletGenerateLinkCode._response.json.response.transactionId).to.be.equal(transactionId);
  }
);

// Scenario: Not able to generate link code because of a random transaction_id
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/linked-authorization\/link-code request with given X-XSRF-TOKEN header, XSRF-TOKEN cookie, random transactionId and requestTime$/,
  () => {
    specWalletGenerateLinkCode
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: 'random-transaction-id',
        },
      });
  }
);

Then(/^The \/linked-authorization\/link-code endpoint response should match json schema with errors$/, () => {
  chai.expect(specWalletGenerateLinkCode._response.json).to.be.jsonSchema(walletGenerateLinkCodeResponseSchema);
  chai.expect(specWalletGenerateLinkCode._response.json.errors).to.not.be.empty;
});

Then(
  /^The \/linked-authorization\/link-code response should contain errorCode property equals "([^"]*)"$/,
  (errorCode) =>
    chai
      .expect(specWalletGenerateLinkCode._response.json.errors.map((error) => error.errorCode).toString())
      .to.be.equal(errorCode)
);

// Scenario: Not able to generate link code because of a blank transaction_id
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/linked-authorization\/link-code request with given X-XSRF-TOKEN header, XSRF-TOKEN cookie, blank transactionId and requestTime$/,
  () => {
    specWalletGenerateLinkCode
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: '',
        },
      });
  }
);

// Scenario: Not able to generate link code because of reuse of the completed transaction_id
// Given and others Then for this scenario are written in the aforementioned example
Given(/^The first authorization flow for transactionId ends$/, async () => {
  specWalletGenerateLinkCode
    .post(baseUrl)
    .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
    .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
    .withJson({
      requestTime: new Date().toISOString(),
      request: {
        transactionId: 'transaction_id_003',
      },
    });
  await specWalletGenerateLinkCode.toss();

  specWalletLinkTransaction.post(localhost + walletLinkTransactionEndpoint).withJson({
    requestTime: new Date().toISOString(),
    request: {
      linkCode: specWalletGenerateLinkCode._response.json.response.linkCode,
    },
  });
  await specWalletLinkTransaction.toss();

  receivedLinkedTransactionId = specWalletLinkTransaction._response.json.response.linkTransactionId;

  specWalletLinkedAuthenticate.post(localhost + walletLinkedAuthenticateEndpoint).withJson({
    requestTime: new Date().toISOString(),
    request: {
      linkedTransactionId: receivedLinkedTransactionId,
      individualId: individualId,
      challengeList: [
        {
          authFactorType: 'PIN',
          challenge: 'password',
          format: 'alpha-numeric',
        },
      ],
    },
  });
  await specWalletLinkedAuthenticate.toss();

  specWalletConsent.post(localhost + walletConsentEndpoint).withJson({
    requestTime: new Date().toISOString(),
    request: {
      linkedTransactionId: specWalletLinkTransaction._response.json.response.linkTransactionId,
    },
  });
  await specWalletConsent.toss();

  specWalletGenerateLinkAuthCode
    .post(localhost + walletGenerateLinkAuthCodeEndpoint)
    .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
    .withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkedCode: specWalletGenerateLinkCode._response.json.response.linkCode,
        transactionId: 'transaction_id_003',
      },
    });
  await specWalletGenerateLinkAuthCode.toss();
});

When(
  /^Send POST \/linked-authorization\/link-code request with given X-XSRF-TOKEN header, XSRF-TOKEN cookie, already used completed transactionId and requestTime$/,
  () => {
    specWalletGenerateLinkCodeReused
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: 'transaction_id_003',
        },
      });
  }
);

Then(
  /^Receive a response for completed transactionId from the \/linked-authorization\/link-code endpoint$/,
  async () => {
    await specWalletGenerateLinkCodeReused.toss();
  }
);

Then(
  /^The \/linked-authorization\/link-code endpoint response for completed transactionId should have status (\d+)$/,
  (statusCode) => {
    specWalletGenerateLinkCodeReused.response().to.have.status(statusCode);
  }
);

Then(
  /^The \/linked-authorization\/link-code endpoint response for completed transactionId should have "([^"]*)": "([^"]*)" header$/,
  (key, value) => {
    specWalletGenerateLinkCodeReused
    .response()
    .should.have.headerContains(key, value);
  }
);

Then(
  /^The \/linked-authorization\/link-code endpoint response for completed transactionId should match json schema with errors$/,
  () => {
    chai.expect(specWalletGenerateLinkCodeReused._response.json).to.be.jsonSchema(walletGenerateLinkCodeResponseSchema);
    chai.expect(specWalletGenerateLinkCodeReused._response.json.errors).to.not.be.empty;
  }
);

Then(
  /^The \/linked-authorization\/link-code response for completed transactionId should contain errorCode property equals to "([^"]*)"$/,
  (errorCode) => {
    chai
      .expect(specWalletGenerateLinkCodeReused._response.json.errors.map((error) => error.errorCode).toString())
      .to.be.equal(errorCode);
  }
);

// Scenario: Not able to generate link code because of invalid requestTime
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/linked-authorization\/link-code request with given X-XSRF-TOKEN header, XSRF-TOKEN cookie, transactionId and invalid requestTime$/,
  () => {
    specWalletGenerateLinkCode
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: null,
        request: {
          transactionId: transactionId,
        },
      });
  }
);

// Scenario: Not able to generate link code because of invalid xsrf token
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/linked-authorization\/link-code request with given invalid X-XSRF-TOKEN header, invalid XSRF-TOKEN cookie, transactionId and requestTime$/,
  () => {
    specWalletGenerateLinkCode
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, 'invalid X-XSRF-TOKEN header')
      .withCookies(XSRF_TOKEN.key, 'invalid XSRF-TOKEN cookie')
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: transactionId,
        },
      });
  }
);

After(endpointTag, () => {
  specWalletGenerateLinkCode.end();
  specWalletLinkTransaction.end();
  specWalletGenerateLinkAuthCode.end();
  specWalletConsent.end();
  specWalletGenerateLinkCodeReused.end();
  specWalletLinkedAuthenticate.end();
});
