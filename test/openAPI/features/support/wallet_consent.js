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
  walletConsentEndpoint,
  walletConsentResponseSchema,
  individualId,
  walletLinkedAuthenticateEndpoint,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specWalletGenerateLinkCode;
let specWalletLinkTransaction;
let specWalletConsent;
let receivedLinkedTransactionId;

const baseUrl = localhost + walletConsentEndpoint;
const endpointTag = { tags: `@endpoint=/${walletConsentEndpoint}` };

Before(endpointTag, () => {
  specWalletGenerateLinkCode = spec();
  specWalletLinkTransaction = spec();
  specWalletLinkedAuthenticate = spec();
  specWalletConsent = spec();
});

// Scenario: Successfully sends the accepted user claims and permitted scopes smoke type test
Given(
  'Wants to send the accepted user claims and permitted scopes',
  () => 'Wants to send the accepted user claims and permitted scopes'
);

Given(
  'The linkedTransactionId is generated before POST \\/linked-authorization\\/consent',
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

    specWalletLinkTransaction
      .post(localhost + walletLinkTransactionEndpoint)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          linkCode: specWalletGenerateLinkCode._response.json.response.linkCode,
        },
      });

    await specWalletLinkTransaction.toss();

    specWalletLinkedAuthenticate
      .post(localhost + walletLinkedAuthenticateEndpoint)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          linkedTransactionId:
            specWalletLinkTransaction._response.json.response.linkTransactionId,
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

    receivedLinkedTransactionId =
      specWalletLinkTransaction._response.json.response.linkTransactionId;
  }
);

When(
  'Send POST \\/linked-authorization\\/consent request with given requestTime and linkedTransactionId',
  () =>
    specWalletConsent.post(baseUrl).withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkedTransactionId: receivedLinkedTransactionId,
      },
    })
);

Then(
  'Receive a response from the \\/linked-authorization\\/consent endpoint',
  async () => await specWalletConsent.toss()
);

Then(
  'The \\/linked-authorization\\/consent endpoint response should be returned in a timely manner 15000ms',
  () =>
    specWalletConsent
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
  'The \\/linked-authorization\\/consent endpoint response should have status 200',
  () => specWalletConsent.response().to.have.status(200)
);

// Scenario: Successfully sends the accepted user claims and permitted scopes
// Given and others Then for this scenario are written in the aforementioned example
When(
  'Send POST \\/linked-authorization\\/consent request with given requestTime, linkedTransactionId, {string} as permittedAuthorizeScopes, {string} as acceptedClaims',
  (permittedAuthorizeScopes, acceptedClaims) =>
    specWalletConsent.post(baseUrl).withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkedTransactionId: receivedLinkedTransactionId,
        permittedAuthorizeScopes: permittedAuthorizeScopes,
        acceptedClaims: acceptedClaims,
      },
    })
);

Then(
  'The \\/linked-authorization\\/consent response should have {string}: {string} header',
  (key, value) =>
    specWalletConsent
      .response()
      .should.have.headerContains(key, value)
);

Then(
  'The \\/linked-authorization\\/consent endpoint response should contain linkedTransactionId',
  () =>
    chai
      .expect(specWalletConsent._response.json.response.linkedTransactionId)
      .to.be.equal(receivedLinkedTransactionId)
);

Then(
  'The \\/linked-authorization\\/consent endpoint response should match json schema without errors',
  () => {
    chai.expect(specWalletConsent._response.json.errors).to.be.empty;
  }
);

// Scenario: Not able to send the accepted user claims and permitted scopes because of invalid linkedTransactionId
// Given and others Then for this scenario are written in the aforementioned example
When(
  'Send POST \\/linked-authorization\\/consent request with given invalid linkedTransactionId',
  () =>
    specWalletConsent.post(baseUrl).withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkedTransactionId: 'invalid_transaction_id',
      },
    })
);

Then(
  'The \\/linked-authorization\\/consent endpoint response should match json schema',
  () =>
    chai
      .expect(specWalletConsent._response.json)
      .to.be.jsonSchema(walletConsentResponseSchema)
);

Then(
  'The \\/linked-authorization\\/consent response should contain errorCode property equals to {string}',
  (errorCode) =>
    chai
      .expect(
        specWalletConsent._response.json.errors
          .map((error) => error.errorCode)
          .toString()
      )
      .to.be.equal(errorCode)
);

After(endpointTag, () => {
  specWalletGenerateLinkCode.end();
  specWalletLinkTransaction.end();
  specWalletLinkedAuthenticate.end();
  specWalletConsent.end();
});
