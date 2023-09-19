const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  contentTypeHeader,
  defaultExpectedResponseTime,
  walletGenerateLinkCodeEndpoint,
  X_XSRF_TOKEN,
  transactionId,
  walletLinkTransactionEndpoint,
  walletLinkedAuthenticateEndpoint,
  individualId,
  walletLinkedAuthenticateResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specWalletGenerateLinkCode;
let specWalletLinkTransaction;
let specWalletLinkedAuthenticate;
let specWalletLinkedAuthenticateReused;
let receivedLinkedTransactionId;

const baseUrl = localhost + walletLinkedAuthenticateEndpoint;
const endpointTag = { tags: `@endpoint=/${walletLinkedAuthenticateEndpoint}` };

Before(endpointTag, () => {
  specWalletGenerateLinkCode = spec();
  specWalletLinkTransaction = spec();
  specWalletLinkedAuthenticate = spec();
  specWalletLinkedAuthenticateReused = spec();
});

// Scenario: Successfully checks the correctness of the data smoke type test
Given('Wants to check the correctness of the data', () => 'Wants to check the correctness of the data');

Given('The link code is generated before POST \\/linked-authorization\\/authenticate', async () => {
  specWalletGenerateLinkCode
    .post(localhost + walletGenerateLinkCodeEndpoint)
    .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
    .withJson({
      requestTime: new Date().toISOString(),
      request: {
        transactionId: transactionId,
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
});

When(
  'Send POST \\/linked-authorization\\/authenticate request with given requestTime, linkedTransactionId, individualId, {string} as authFactorType, {string} as challenge, {string} as format',
  (authFactorType, challenge, format) => {
    specWalletLinkedAuthenticate.post(baseUrl).withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkedTransactionId: receivedLinkedTransactionId,
        individualId: individualId,
        challengeList: [
          {
            authFactorType: authFactorType,
            challenge: challenge,
            format: format,
          },
        ],
      },
    });
  }
);

Then(
  'Receive a response from the \\/linked-authorization\\/authenticate endpoint',
  async () => await specWalletLinkedAuthenticate.toss()
);

Then('The \\/linked-authorization\\/authenticate endpoint response should be returned in a timely manner 15000ms', () =>
  specWalletLinkedAuthenticate.response().to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then('The \\/linked-authorization\\/authenticate endpoint response should have status 200', () =>
  specWalletLinkedAuthenticate.response().to.have.status(200)
);

Then(
  'The \\/linked-authorization\\/authenticate response should have {string}: {string} header',
  (key, value) =>
    specWalletLinkedAuthenticate
      .response()
      .should.have.headerContains(key, value)
);

Then(
  'The \\/linked-authorization\\/authenticate endpoint response linkedTransactionId should be the same as sent in request',
  () =>
    chai
      .expect(specWalletLinkedAuthenticate._response.json.response.linkedTransactionId)
      .to.be.equal(receivedLinkedTransactionId)
);

Then(
  'The \\/linked-authorization\\/authenticate endpoint response should match json schema without errors',
  () => chai.expect(specWalletLinkedAuthenticate._response.json.errors).to.be.empty
);

// Scenario: Not able to check the correctness of the data because of an invalid linkedTransactionId
// Given and others Then for this scenario are written in the aforementioned example
When('Send POST \\/linked-authorization\\/authenticate request with given invalid linkedTransactionId', () => {
  specWalletLinkedAuthenticate.post(baseUrl).withJson({
    requestTime: new Date().toISOString(),
    request: {
      linkedTransactionId: 'invalid_linked_transaction_id',
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
});

Then('The \\/linked-authorization\\/authenticate endpoint response should match json schema with errors', () => {
  chai.expect(specWalletLinkedAuthenticate._response.json).to.be.jsonSchema(walletLinkedAuthenticateResponseSchema);
  chai.expect(specWalletLinkedAuthenticate._response.json.errors).to.not.be.empty;
});

Then(
  'The \\/linked-authorization\\/authenticate response should contain errorCode property equals to {string}',
  (errorCode) =>
    chai
      .expect(specWalletLinkedAuthenticate._response.json.errors.map((error) => error.errorCode).toString())
      .to.be.equal(errorCode)
);

// Scenario: Not able to check the correctness of the data because of an invalid individualId
// Given and Then for this scenario are written in the aforementioned example
When('Send POST \\/linked-authorization\\/authenticate request with given invalid individualId', () => {
  specWalletLinkedAuthenticate.post(baseUrl).withJson({
    requestTime: new Date().toISOString(),
    request: {
      linkedTransactionId: receivedLinkedTransactionId,
      individualId: null,
      challengeList: [
        {
          authFactorType: 'PIN',
          challenge: 'password',
          format: 'alpha-numeric',
        },
      ],
    },
  });
});

// Scenario: Not able to check the correctness of the data because of an invalid challengeList
// Given and Then for this scenario are written in the aforementioned example
When('Send POST \\/linked-authorization\\/authenticate request with given invalid challengeList', () => {
  specWalletLinkedAuthenticate.post(baseUrl).withJson({
    requestTime: new Date().toISOString(),
    request: {
      linkedTransactionId: receivedLinkedTransactionId,
      individualId: individualId,
      challengeList: [],
    },
  });
});

// Scenario: Not able to check the correctness of the data because of reused link code
// Others Given, When, Then for this scenario are written in the aforementioned example
Then('Try to authenticate reusing link code', () => {
  specWalletLinkedAuthenticateReused.post(baseUrl).withJson({
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
});

Then(
  'Receive a response from the \\/linked-authorization\\/authenticate endpoint for reused link code',
  async () => await specWalletLinkedAuthenticateReused.toss()
);

Then(
  'The \\/linked-authorization\\/authenticate endpoint response for reused link code should be returned in a timely manner 15000ms',
  () => specWalletLinkedAuthenticateReused.response().to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then('The \\/linked-authorization\\/authenticate endpoint response for reused link code should have status 200', () =>
  specWalletLinkedAuthenticateReused.response().to.have.status(200)
);

Then(
  'The \\/linked-authorization\\/authenticate endpoint response for reused link code should have {string}: {string} header',
  (key, value) => 
  specWalletLinkedAuthenticateReused
  .response()
  .should.have.headerContains(key, value)
);

Then(
  'The \\/linked-authorization\\/authenticate endpoint response for reused link code should match json schema with errors',
  () => {
    chai
      .expect(specWalletLinkedAuthenticateReused._response.json)
      .to.be.jsonSchema(walletLinkedAuthenticateResponseSchema);

    // the test will fail using mockoon so will be invoked only on tested softwares
    if (specWalletLinkedAuthenticateReused._response.json.responseTime != 'string') {
      chai.expect(specWalletLinkedAuthenticateReused._response.json.errors).to.not.be.empty;
    }
  }
);

Then(
  'The \\/linked-authorization\\/authenticate response for reused link code should contain errorCode property equals to {string}',
  (errorCode) => {
    // the test will fail using mockoon so will be invoked only on tested softwares
    if (specWalletLinkedAuthenticateReused._response.json.responseTime != 'string') {
      chai
        .expect(specWalletLinkedAuthenticateReused._response.json.errors.map((error) => error.errorCode).toString())
        .to.be.equal(errorCode);
    }
  }
);

// Scenario: Not able to check the correctness of the data because of invalid requestTime
// Given and Then for this scenario are written in the aforementioned example
When(
  'Send POST \\/linked-authorization\\/authenticate request with given invalid requestTime, linkedTransactionId, individualId, {string} as authFactorType, {string} as challenge, {string} as format',
  (authFactorType, challenge, format) => {
    specWalletLinkedAuthenticate.post(baseUrl).withJson({
      requestTime: null,
      request: {
        linkedTransactionId: receivedLinkedTransactionId,
        individualId: individualId,
        challengeList: [
          {
            authFactorType: authFactorType,
            challenge: challenge,
            format: format,
          },
        ],
      },
    });
  }
);

// Scenario: Not able to check the correctness of the data because auth failed
// Given and Then for this scenario are written in the aforementioned example
When(
  'Send POST \\/linked-authorization\\/authenticate request with given requestTime, linkedTransactionId, individualId, {string} as authFactorType, {string} as invalid challenge, {string} as format',
  (authFactorType, invalidChallenge, format) => {
    specWalletLinkedAuthenticate.post(baseUrl).withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkedTransactionId: receivedLinkedTransactionId,
        individualId: individualId,
        challengeList: [
          {
            authFactorType: authFactorType,
            challenge: invalidChallenge,
            format: format,
          },
        ],
      },
    });
  }
);

After(endpointTag, () => {
  specWalletGenerateLinkCode.end();
  specWalletLinkTransaction.end();
  specWalletLinkedAuthenticate.end();
  specWalletLinkedAuthenticateReused.end();
});
