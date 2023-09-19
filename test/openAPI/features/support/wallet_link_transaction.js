const chai = require('chai');
const { spec, sleep } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  contentTypeHeader,
  defaultExpectedResponseTime,
  walletGenerateLinkCodeEndpoint,
  X_XSRF_TOKEN,
  transactionId,
  walletLinkTransactionEndpoint,
  walletLinkTransactionResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specWalletLinkTransaction;
let specWalletGenerateLinkCode;
let receivedLinkCode;
let newExpiredLinkCode;

const baseUrl = localhost + walletLinkTransactionEndpoint;
const endpointTag = { tags: `@endpoint=/${walletLinkTransactionEndpoint}` };

Before(endpointTag, () => {
  specWalletGenerateLinkCode = spec();
  specWalletLinkTransaction = spec();
});

// Scenario: Successfully validates the linkCode and its expiry and generates the linkTransactionId smoke type test
Given(
  'Wants to validate the linkCode and its expiry and generate the linkTransactionId',
  () =>
    'Wants to validate the linkCode and its expiry and generate the linkTransactionId'
);

Given(
  'The link code is generated before POST \\/linked-authorization\\/link-transaction',
  async () => {
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
    receivedLinkCode =
      specWalletGenerateLinkCode._response.json.response.linkCode;
  }
);

When(
  'Send POST \\/linked-authorization\\/link-transaction request with given linkCode and requestTime',
  () =>
    specWalletLinkTransaction.post(baseUrl).withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkCode: receivedLinkCode,
      },
    })
);

Then(
  'Receive a response from the \\/linked-authorization\\/link-transaction endpoint',
  async () => await specWalletLinkTransaction.toss()
);

Then(
  'The \\/linked-authorization\\/link-transaction endpoint response should be returned in a timely manner 15000ms',
  () =>
    specWalletLinkTransaction
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
  'The \\/linked-authorization\\/link-transaction endpoint response should have status 200',
  () => specWalletLinkTransaction.response().to.have.status(200)
);

Then(
  'The \\/linked-authorization\\/link-transaction response should have {string}: {string} header',
  (key, value) =>
    specWalletLinkTransaction
      .response()
      .should.have.headerContains(key, value)
);

Then(
  'The \\/linked-authorization\\/link-transaction endpoint response should match json schema with no error',
  () => {
    chai
      .expect(specWalletLinkTransaction._response.json)
      .to.be.jsonSchema(walletLinkTransactionResponseSchema);
    chai.expect(specWalletLinkTransaction._response.json.errors).to.be.empty;
  }
);

// Scenario: Not able to validate the linkCode and its expiry and generate the linkTransactionId because of invalid linkCode
// Given and others Then for this scenario are written in the aforementioned example
When(
  'Send POST \\/linked-authorization\\/link-transaction request with given invalid linkCode and requestTime',
  () =>
    specWalletLinkTransaction.post(baseUrl).withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkCode: 'invalid_link_code',
      },
    })
);

Then(
  'The \\/linked-authorization\\/link-transaction endpoint response should match json schema',
  () =>
    chai
      .expect(specWalletLinkTransaction._response.json)
      .to.be.jsonSchema(walletLinkTransactionResponseSchema)
);

Then(
  'The \\/linked-authorization\\/link-transaction response should contain errorCode property equals to {string}',
  (errorCode) =>
    chai
      .expect(
        specWalletLinkTransaction._response.json.errors
          .map((error) => error.errorCode)
          .toString()
      )
      .to.be.equal(errorCode)
);

// Scenario: Not able to validate the linkCode and its expiry and generate the linkTransactionId because of expired linkCode
Given(
  'The link code is generated before POST \\/linked-authorization\\/link-transaction but wait 30s to be expired',
  { timeout: 31 * 1000 },
  async () => {
    specWalletGenerateLinkCode
      .post(localhost + walletGenerateLinkCodeEndpoint)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: 'transactionIdToBeExpired',
        },
      });
    await specWalletGenerateLinkCode.toss();

    await sleep(30 * 1000);

    newExpiredLinkCode =
      specWalletGenerateLinkCode._response.json.response.linkCode;
  }
);

When(
  'Send POST \\/linked-authorization\\/link-transaction request with given expired linkCode and requestTime',
  () =>
    specWalletLinkTransaction.post(baseUrl).withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkCode: newExpiredLinkCode,
      },
    })
);

After(endpointTag, () => {
  specWalletGenerateLinkCode.end();
  specWalletLinkTransaction.end();
});
