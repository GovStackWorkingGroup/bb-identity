const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  contentTypeHeader,
  walletGenerateLinkCodeEndpoint,
  X_XSRF_TOKEN,
  XSRF_TOKEN,
  transactionId,
  transactionId_2,
  individualId,
  walletLiskStatusResponseSchema,
  walletLinkStatusEndpoint,
  walletLinkTransactionEndpoint,
  walletLinkedAuthenticateEndpoint,
  walletConsentEndpoint,
  walletGenerateLinkAuthCodeEndpoint,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specWalletLinkStatus;
let specWalletGenerateLinkCode;
let specWalletGenerateLinkCode_02;
let recivedLinkCode;
let recivedLinkCode_2;

const baseUrl = localhost + walletLinkStatusEndpoint;
const endpointTag = { tags: `@endpoint=/${walletLinkStatusEndpoint}` };

Before(endpointTag, () => {
  specWalletGenerateLinkCode = spec();
  specWalletGenerateLinkCode_02 = spec();
  specWalletLinkTransaction = spec();
  specWalletLinkedAuthenticate = spec();
  specWalletConsent = spec();
  specWalletGenerateLinkAuthCode = spec();
  specWalletLinkStatus = spec();
});

// Scenario: Successfully checks the status of link code smoke type test
Given(/^Wants to check the status of link code$/, () => 'Wants to check the status of link code');

Given('The link code is generated', async () => {
  specWalletGenerateLinkCode
    .post(localhost + walletGenerateLinkCodeEndpoint)
    .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
    .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
    .withJson({
      requestTime: new Date().toISOString(),
      request: {
        transactionId: transactionId,
      },
    });

  await specWalletGenerateLinkCode.toss();
  recivedLinkCode = specWalletGenerateLinkCode._response.json.response.linkCode;
});

When(
  /^Send POST \/linked-authorization\/link-status request with given X-XSRF-TOKEN header, transactionId, linkCode and requestTime$/,
  () => {
    specWalletLinkStatus
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: transactionId,
          linkCode: recivedLinkCode,
        },
      });
  }
);

Then(/^Receive a response from the \/linked-authorization\/link-status endpoint$/, async () => {
  await specWalletLinkStatus.toss();
});

Then(
  /^The \/linked-authorization\/link-status endpoint response should be returned in a timely manner (\d+) ms$/,
  (responseTime) => {
    specWalletLinkStatus.response().to.have.responseTimeLessThan(responseTime);
  }
);

Then(/^The \/linked-authorization\/link-status endpoint response should have status (\d+)$/, (statusCode) => {
  specWalletLinkStatus.response().to.have.status(statusCode);
});

Then(
  /^The \/linked-authorization\/link-status endpoint response should have content-type: application\/json header$/,
  () => {
    specWalletLinkStatus.response().should.have.header(contentTypeHeader.key, contentTypeHeader.value);
  }
);

Then(/^The \/linked-authorization\/link-status endpoint response should match json schema with no errors$/, () => {
  chai.expect(specWalletLinkStatus._response.json).to.be.jsonSchema(walletLiskStatusResponseSchema);
  chai.expect(specWalletLinkStatus._response.json.errors).to.be.empty;
});

Then(
  /^The \/linked-authorization\/link-status response should contain transactionId property equals provided transactionId$/,
  () => {
    chai.expect(specWalletLinkStatus._response.json.response.transactionId).to.be.equal(transactionId);
  }
);

// Scenario: Not able to check the status of link code because of the blank transactionId
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/linked-authorization\/link-status request with given X-XSRF-TOKEN header, blank transactionId, linkCode and requestTime$/,
  () =>
    specWalletLinkStatus
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: '',
          linkCode: recivedLinkCode,
        },
      })
);

Then(/^The \/linked-authorization\/link-status endpoint response should match json schema with errors$/, () => {
  chai.expect(specWalletLinkStatus._response.json).to.be.jsonSchema(walletLiskStatusResponseSchema);
  chai.expect(specWalletLinkStatus._response.json.errors).to.not.be.empty;
});

Then(
  /^The \/linked-authorization\/link-status response should contain errorCode property equals to "([^"]*)"$/,
  (errorCode) => {
    chai
      .expect(specWalletLinkStatus._response.json.errors.map((error) => error.errorCode).toString())
      .to.be.equal(errorCode);
  }
);

// Scenario: Not able to check the status of link code because of the random transactionId
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/linked-authorization\/link-status request with given X-XSRF-TOKEN header, random transactionId, linkCode and requestTime$/,
  () => {
    specWalletLinkStatus
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: 'random-transaction-id',
          linkCode: recivedLinkCode,
        },
      });
  }
);

// Scenario: Not able to check the status of link code because of the completed transactionId
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/linked-authorization\/link-status request with given X-XSRF-TOKEN header, completed transactionId, linkCode and requestTime$/,
  async () => {
    specWalletGenerateLinkCode
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: 'transaction_id_004',
        },
      });
    await specWalletGenerateLinkCode.toss();

    const receivedLinkCode = specWalletGenerateLinkCode._response.json.response.linkCode;

    specWalletLinkTransaction.post(localhost + walletLinkTransactionEndpoint).withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkCode: receivedLinkCode,
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
        linkedTransactionId: receivedLinkedTransactionId,
      },
    });
    await specWalletConsent.toss();

    specWalletGenerateLinkAuthCode
      .post(localhost + walletGenerateLinkAuthCodeEndpoint)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          linkedCode: receivedLinkCode,
          transactionId: 'transaction_id_004',
        },
      });
    await specWalletGenerateLinkAuthCode.toss();

    specWalletLinkStatus
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: 'transaction_id_004',
          linkCode: receivedLinkCode,
        },
      });
  }
);

// Scenario: Not able to check the status of link code because of the random linkCode
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/linked-authorization\/link-status request with given X-XSRF-TOKEN header, transactionId, random linkCode and requestTime$/,
  () => {
    specWalletLinkStatus
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: transactionId,
          linkCode: 'invalid_link_code',
        },
      });
  }
);

// Scenario: Not able to check the status of link code because of the blank linkCode
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/linked-authorization\/link-status request with given X-XSRF-TOKEN header, transactionId, blank linkCode and requestTime$/,
  () => {
    specWalletLinkStatus
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: transactionId,
          linkCode: '',
        },
      });
  }
);

// Scenario: Not able to check the status of link code because of the linkCode connected to a different transactionId
// Given and others Then for this scenario are written in the aforementioned example
Given('The second link code for diffrent transaction id is generated', async () => {
  specWalletGenerateLinkCode_02
    .post(localhost + walletGenerateLinkCodeEndpoint)
    .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
    .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
    .withJson({
      requestTime: new Date().toISOString(),
      request: {
        transactionId: transactionId_2,
      },
    });

  await specWalletGenerateLinkCode_02.toss();
  recivedLinkCode_2 = specWalletGenerateLinkCode_02._response.json.response.linkCode;
});

When(
  /^Send POST \/linked-authorization\/link-status request with given X-XSRF-TOKEN header, transactionId, linkCode connected to a different transactionId and requestTime$/,
  () => {
    specWalletLinkStatus
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withCookies(XSRF_TOKEN.key, XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: transactionId,
          linkCode: recivedLinkCode_2,
        },
      });
  }
);

After(endpointTag, () => {
  specWalletGenerateLinkCode.end();
  specWalletGenerateLinkCode_02.end();
  specWalletLinkTransaction.end();
  specWalletLinkedAuthenticate.end();
  specWalletConsent.end();
  specWalletGenerateLinkAuthCode.end();
  specWalletLinkStatus.end();
});
