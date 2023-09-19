const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  contentTypeHeader,
  walletGenerateLinkCodeEndpoint,
  X_XSRF_TOKEN,
  transactionId,
  walletGenerateLinkAuthCodeResponseSchema,
  walletGenerateLinkAuthCodeEndpoint,
  individualId,
  walletLinkedAuthenticateEndpoint,
  walletLinkTransactionEndpoint,
  walletConsentEndpoint,
  transactionId_03,
  transactionId_04
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specWalletGenerateLinkCode;
let specWalletGenerateLinkCode_2;
let specWalletGenerateLinkAuthCode;
let specWalletGenerateLinkAuthCodeReusable;
let specWalletLinkTransaction;
let specWalletLinkTransaction_2;
let specWalletLinkedAuthenticate;
let specWalletLinkedAuthenticate_2;
let specWalletConsent;
let specWalletConsent_2;
let receivedLinkCode;
let receivedLinkCode_2;
let receivedLinkedTransactionId;
let receivedLinkedTransactionId_2;

const baseUrl = localhost + walletGenerateLinkAuthCodeEndpoint;
const endpointTag = { tags: `@endpoint=/${walletGenerateLinkAuthCodeEndpoint}` };

Before(endpointTag, () => {
  specWalletGenerateLinkAuthCode = spec();
  specWalletGenerateLinkAuthCodeReusable = spec();
  specWalletGenerateLinkCode = spec();
  specWalletGenerateLinkCode_2 = spec();
  specWalletLinkTransaction = spec();
  specWalletLinkTransaction_2 = spec();
  specWalletLinkedAuthenticate = spec();
  specWalletLinkedAuthenticate_2 = spec();
  specWalletConsent = spec();
  specWalletConsent_2 = spec();
});

// Scenario: Successfully validates the link-code and its expiry and generates the link auth code smoke type test
Given(
    'Wants to validate the link-auth-code and generate the auth code',
    () =>
        'Wants to validate the link-auth-code and generate the auth code'
);

Given(
    /^The link code, transaction and authenticate is completed before POST \/linked\-authorization\/link\-auth\-code$/,
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

      specWalletLinkTransaction
        .post(localhost + walletLinkTransactionEndpoint)
        .withJson({
          requestTime: new Date().toISOString(),
          request: {
            linkCode: receivedLinkCode,
          },
        });

      await specWalletLinkTransaction.toss();

      receivedLinkedTransactionId =
          specWalletLinkTransaction._response.json.response.linkTransactionId;

      specWalletLinkedAuthenticate.post(localhost + walletLinkedAuthenticateEndpoint)
        .withJson({
          requestTime: new Date().toISOString(),
          request: {
            linkedTransactionId: receivedLinkedTransactionId,
            individualId: individualId,
            challengeList: [
              {
                authFactorType: "PIN",
                challenge: "password",
                format: "alpha-numeric",
              },
            ],
          },
        })

      await specWalletLinkedAuthenticate.toss();

      specWalletConsent.post(localhost + walletConsentEndpoint).withJson({
        requestTime: new Date().toISOString(),
        request: {
          linkedTransactionId: specWalletLinkedAuthenticate._response.json.response.linkTransactionId,
        },
      })

      await specWalletConsent.toss();
    }
);

When(
    /^Send POST \/linked\-authorization\/link\-auth\-code request with given linkedCode and transactionId and "([^"]*)" header and requestTime$/,
    (X_XSRF_TOKEN) =>
        specWalletGenerateLinkAuthCode.post(baseUrl)
          .withHeaders(X_XSRF_TOKEN, X_XSRF_TOKEN)
          .withJson({
          requestTime: new Date().toISOString(),
          request: {
            linkedCode: receivedLinkCode,
            transactionId: transactionId
          },
        })
);

Then(
    /^Receive a response from the \/linked\-authorization\/link\-auth\-code endpoint$/,
    async () => await specWalletGenerateLinkAuthCode.toss()
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code endpoint response should be returned in a timely manner (\d+) ms$/,
    (responseTime) =>
        specWalletGenerateLinkAuthCode
            .response()
            .to.have.responseTimeLessThan(responseTime)
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code endpoint response should have status (\d+)$/,
    (status) => specWalletGenerateLinkAuthCode.response().to.have.status(status)
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code response should have "([^"]*)": "([^"]*)" header$/,
    (key, value) =>
        specWalletGenerateLinkAuthCode
        .response()
        .should.have.headerContains(key, value)
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code endpoint response should match json schema with no errors$/,
    () => {
      chai
          .expect(specWalletGenerateLinkAuthCode._response.json)
          .to.be.jsonSchema(walletGenerateLinkAuthCodeResponseSchema);
      chai.expect(specWalletGenerateLinkAuthCode._response.json.errors).to.be.empty;
    }
);

// Scenario: Not able to validate the link-code and its expiry and generate the link auth code because of invalid linkedCode
// Given and others Then for this scenario are written in the aforementioned example
When(
    /^Send POST \/linked\-authorization\/link\-auth\-code request with given invalid linkedCode and "([^"]*)" header and requestTime$/,
    (X_XSRF_TOKEN) =>
        specWalletGenerateLinkAuthCode.post(baseUrl)
          .withHeaders(X_XSRF_TOKEN, X_XSRF_TOKEN)
          .withJson({
          requestTime: new Date().toISOString(),
          request: {
            linkedCode: 'invalid_linked_code',
            transactionId: transactionId
          },
        })
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code endpoint response should match json schema with errors$/,
    () => {
      chai
          .expect(specWalletGenerateLinkAuthCode._response.json)
          .to.be.jsonSchema(walletGenerateLinkAuthCodeResponseSchema);
      chai.expect(specWalletGenerateLinkAuthCode._response.json.errors).to.not.be.empty;
    }
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code response should contain errorCode property equals to "([^"]*)"$/,
    (errorCode) =>
        chai
            .expect(
                specWalletGenerateLinkAuthCode._response.json.errors
                    .map((error) => error.errorCode)
                    .toString()
            )
            .to.be.equal(errorCode)
);

// Scenario: Not able to validate the link-code and its expiry and generate the link auth code because of invalid transactionId
// Given and others Then for this scenario are written in the aforementioned example
When(
    /^Send POST \/linked\-authorization\/link\-auth\-code request with given invalid transactionId and "([^"]*)" header and requestTime$/,
    (X_XSRF_TOKEN) =>
        specWalletGenerateLinkAuthCode.post(baseUrl)
            .withHeaders(X_XSRF_TOKEN, X_XSRF_TOKEN)
            .withJson({
              requestTime: new Date().toISOString(),
              request: {
                transactionId: 'invalid_transaction_id',
                linkedCode: receivedLinkCode
              },
            })
);

// Scenario: Not able to validate the link-code and its expiry and generate the link auth code because of invalid linkedCode and transactionId
// Given and others Then for this scenario are written in the aforementioned example
When(
    /^Send POST \/linked\-authorization\/link\-auth\-code request with given invalid linkedCode and transactionId and "([^"]*)" header and requestTime$/,
    (X_XSRF_TOKEN) =>
        specWalletGenerateLinkAuthCode.post(baseUrl)
            .withHeaders(X_XSRF_TOKEN, X_XSRF_TOKEN)
            .withJson({
              requestTime: new Date().toISOString(),
              request: {
                transactionId: 'invalid_transaction_id',
                linkedCode: 'invalid_linked_code',
              },
            })
);

// Scenario: Not able to validate the link-code and its expiry and generate the link auth code because of invalid requestTime
// Given and others Then for this scenario are written in the aforementioned example
When(
    /^Send POST \/linked\-authorization\/link\-auth\-code request with given linkedCode and transactionId and "([^"]*)" header and invalid requestTime$/,
    (X_XSRF_TOKEN) =>
        specWalletGenerateLinkAuthCode.post(baseUrl)
            .withHeaders(X_XSRF_TOKEN, X_XSRF_TOKEN)
            .withJson({
              requestTime: null,
              request: {
                transactionId: transactionId,
                linkedCode: receivedLinkCode,
              },
            })
);

// Scenario: Not able to validate the link-code and its expiry because of transaction and link code are not connected to each other
// Given and others Then for this scenario are written in the aforementioned example
Given(/^The second link code, transaction and authenticate is completed before POST \/linked-authorization\/link-auth-code$/, async () => {
  specWalletGenerateLinkCode_2
    .post(localhost + walletGenerateLinkCodeEndpoint)
    .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
    .withJson({
      requestTime: new Date().toISOString(),
      request: {
        transactionId: transactionId_03,
      },
    });

  await specWalletGenerateLinkCode_2.toss();

  receivedLinkCode_2 =
      specWalletGenerateLinkCode_2._response.json.response.linkCode;

  specWalletLinkTransaction_2
    .post(localhost + walletLinkTransactionEndpoint)
    .withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkCode: receivedLinkCode_2,
      },
  });

  await specWalletLinkTransaction_2.toss();

  receivedLinkedTransactionId_2 =
      specWalletLinkTransaction_2._response.json.response.linkTransactionId;

  specWalletLinkedAuthenticate_2.post(localhost + walletLinkedAuthenticateEndpoint)
    .withJson({
      requestTime: new Date().toISOString(),
      request: {
        linkedTransactionId: receivedLinkedTransactionId_2,
        individualId: individualId,
        challengeList: [
          {
            authFactorType: "PIN",
            challenge: "password",
            format: "alpha-numeric",
          },
        ],
      },
    })

  await specWalletLinkedAuthenticate_2.toss();

  specWalletConsent_2.post(localhost + walletConsentEndpoint).withJson({
    requestTime: new Date().toISOString(),
    request: {
      linkedTransactionId: specWalletLinkedAuthenticate_2._response.json.response.linkTransactionId,
    },
  })

  await specWalletConsent_2.toss();
})

When(
    /^Send POST \/linked\-authorization\/link\-auth\-code request with given valid linkedCode and transactionId and "([^"]*)" header and requestTime$/,
    (X_XSRF_TOKEN) =>
        specWalletGenerateLinkAuthCode.post(baseUrl)
            .withHeaders(X_XSRF_TOKEN, X_XSRF_TOKEN)
            .withJson({
              requestTime: new Date().toISOString(),
              request: {
                linkedCode: receivedLinkCode_2,
                transactionId: transactionId
              },
            })
);

// Scenario: Not able to validate the link-code and its expiry because of reuse of the completed transaction_id
// Given and others Then for this scenario are written in the aforementioned example
Given(
    /^The first authorization flow for transactionID ends$/,
    async () => {
      specWalletGenerateLinkCode
          .post(localhost + walletGenerateLinkCodeEndpoint)
          .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
          .withJson({
            requestTime: new Date().toISOString(),
            request: {
              transactionId: transactionId_04,
            },
          });
      await specWalletGenerateLinkCode.toss();

      receivedLinkCode =
          specWalletGenerateLinkCode._response.json.response.linkCode;

      specWalletLinkTransaction
          .post(localhost + walletLinkTransactionEndpoint)
          .withJson({
            requestTime: new Date().toISOString(),
            request: {
              linkCode: receivedLinkCode,
            },
          });

      await specWalletLinkTransaction.toss();

      receivedLinkedTransactionId =
          specWalletLinkTransaction._response.json.response.linkTransactionId;

      specWalletLinkedAuthenticate.post(localhost + walletLinkedAuthenticateEndpoint)
          .withJson({
            requestTime: new Date().toISOString(),
            request: {
              linkedTransactionId: receivedLinkedTransactionId,
              individualId: individualId,
              challengeList: [
                {
                  authFactorType: "PIN",
                  challenge: "password",
                  format: "alpha-numeric",
                },
              ],
            },
          })

      await specWalletLinkedAuthenticate.toss();

      specWalletConsent.post(localhost + walletConsentEndpoint).withJson({
        requestTime: new Date().toISOString(),
        request: {
          linkedTransactionId: specWalletLinkedAuthenticate._response.json.response.linkTransactionId,
        },
      })

      await specWalletConsent.toss();

      specWalletGenerateLinkAuthCode.post(baseUrl)
          .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
          .withJson({
            requestTime: new Date().toISOString(),
            request: {
              linkedCode: receivedLinkCode,
              transactionId: transactionId_04
            },
          })

    }
);

When(
    /^Send POST \/linked\-authorization\/link\-auth\-code request with given linkedCode and reused completed transactionId and "([^"]*)" header and requestTime$/,
    (X_XSRF_TOKEN) =>
        specWalletGenerateLinkAuthCodeReusable.post(baseUrl)
            .withHeaders(X_XSRF_TOKEN, X_XSRF_TOKEN)
            .withJson({
              requestTime: new Date().toISOString(),
              request: {
                linkedCode: receivedLinkCode,
                transactionId: transactionId_04
              },
            })
);

Then(
    /^Receive a response for reuse transactionId from the \/linked\-authorization\/link\-auth\-code endpoint$/,
    async () => await specWalletGenerateLinkAuthCodeReusable.toss()
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code endpoint response for reuse transactionId should be returned in a timely manner 25000ms$/,
    () =>
        specWalletGenerateLinkAuthCodeReusable
            .response()
            .to.have.responseTimeLessThan(linkAuthCodeExpectedResponseTime)
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code endpoint response for reuse transactionId should have status (\d+)$/,
    (status) => specWalletGenerateLinkAuthCodeReusable.response().to.have.status(status)
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code endpoint response for reuse transactionId should have "([^"]*)": "([^"]*)" header$/,
    (key, value) =>
        specWalletGenerateLinkAuthCodeReusable
        .response()
        .should.have.headerContains(key, value)
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code endpoint response for reuse transactionId should match json schema with errors$/,
    () => {
      chai
          .expect(specWalletGenerateLinkAuthCodeReusable._response.json)
          .to.be.jsonSchema(walletGenerateLinkAuthCodeResponseSchema);
      chai.expect(specWalletGenerateLinkAuthCodeReusable._response.json.errors).to.not.be.empty;
    }
);

Then(
    /^The \/linked\-authorization\/link\-auth\-code response for reuse transactionId should contain errorCode property equals to "([^"]*)"$/,
    (errorCode) =>
        chai
            .expect(
                specWalletGenerateLinkAuthCodeReusable._response.json.errors
                    .map((error) => error.errorCode)
                    .toString()
            )
            .to.be.equal(errorCode)
);

After(endpointTag, () => {
  specWalletGenerateLinkCode.end();
  specWalletGenerateLinkCode_2.end();
  specWalletGenerateLinkAuthCode.end();
  specWalletLinkTransaction.end();
  specWalletLinkTransaction_2.end();
  specWalletLinkedAuthenticate.end();
  specWalletLinkedAuthenticate_2.end();
  specWalletConsent.end();
  specWalletConsent_2.end();
});
