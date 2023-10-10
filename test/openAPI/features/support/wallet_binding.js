const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultExpectedResponseTime,
  walletBindingEndpoint,
  walletBindingResponseSchema,
  contentTypeHeader,
} = require('./helpers/helpers');
const { generateUniqueKey, baseKey } = require('./helpers/utils');

chai.use(require('chai-json-schema'));

let specWalletBinding;
let specWalletBindingDuplicate;
let providedAuthFactorType;

const baseUrl = localhost + walletBindingEndpoint;
const endpointTag = { tags: `@endpoint=/${walletBindingEndpoint}` };

Before(endpointTag, () => {
  specWalletBinding = spec();
  specWalletBindingDuplicate = spec();
});

// Scenario: Successfully validates the wallet and generates the wallet user id smoke type test
Given('Wants to validate the wallet and generate wallet user id',
    () => 'Wants to validate the wallet and generate wallet user id');

Given(/^The request headers contain "([^"]*)" and "([^"]*)"$/,
(partnerId, partnerApiKey) => {
  specWalletBinding.withHeaders({
    "PARTNER-ID": partnerId,
    "PARTNER-API-KEY": partnerApiKey
  });
});

When(
    /^Send POST \/wallet\-binding request with given "([^"]*)" as individualId and "([^"]*)" as authFactorType and "([^"]*)" as format and "([^"]*)" as challenge and requestTime and publicKey$/,
    (individualId, authFactorType, format, challenge) => {
      specWalletBinding
          .post(baseUrl)
          .withJson({
            requestTime: new Date().toISOString(),
            request: {
              individualId: individualId,
              authFactorType: authFactorType,
              format: format,
              challengeList: [
                {
                  authFactorType: authFactorType,
                  challenge: challenge,
                  format: format,
                }
              ],
              publicKey: generateUniqueKey(baseKey, "-test1"),
            },
          })

      providedAuthFactorType = authFactorType;
    });

Then(
    /^Receive a response from the \/wallet\-binding endpoint$/,
    async () => await specWalletBinding.toss()
);

Then(
    /^The \/wallet\-binding response should be returned in a timely manner 15000ms$/,
    () =>
        specWalletBinding
            .response()
            .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
    /^The \/wallet\-binding endpoint response should have status (\d+)$/,
    (status) => specWalletBinding.response().to.have.status(status)
);

Then(
    /^The \/wallet\-binding response should have "([^"]*)": "([^"]*)" header$/,
    (key, value) =>
        specWalletBinding
        .response()
        .should.have.headerContains(key, value)
);

Then(
    /^The \/wallet\-binding endpoint response should match json schema with no errors$/,
    () => {
      chai
          .expect(specWalletBinding._response.json)
          .to.be.jsonSchema(walletBindingResponseSchema);
      chai.expect(specWalletBinding._response.json.errors).to.be.empty;
    }
);

Then(
    /^The \/wallet\-binding endpoint response should have authFactorType value should be equal to specified enum$/,
    () =>
        chai.expect(providedAuthFactorType).to.be.oneOf(['OTP','BIO','PIN','WLA'])
);

Then(
    /^The \/wallet\-binding endpoint response should contain a future expireDateTime in ISO 8601 format$/,
    () => {
      const expireDateTime = specWalletBinding._response.json.response.expireDateTime;
      const iso8601Regex = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

      chai.expect(expireDateTime > new Date().toISOString() && iso8601Regex.test(expireDateTime)).to.be.true;
    }
);

// Scenario: Not able to generate the wallet binding because of unsupported challenge format
// Given and others Then for this scenario are written in the aforementioned example
When(
    /^Send POST \/wallet\-binding request with given invalid format "([^"]*)" as individualId and "([^"]*)" as authFactorType and "([^"]*)" as format and "([^"]*)" as challenge and requestTime and publicKey$/,
    (individualId, authFactorType, format, challenge) =>
        specWalletBinding
            .post(baseUrl)
            .withJson({
              requestTime: new Date().toISOString(),
              request: {
                individualId: individualId,
                authFactorType: authFactorType,
                format: format,
                challengeList: [
                  {
                    authFactorType: authFactorType,
                    challenge: challenge,
                    format: format,
                  }
                ],
                publicKey: generateUniqueKey(baseKey, "-test2"),
              },
            })
);

  Then(
      /^The \/wallet\-binding endpoint response should match json schema with errors$/,
      () => {
        chai
            .expect(specWalletBinding._response.json)
            .to.be.jsonSchema(walletBindingResponseSchema);
        chai.expect(specWalletBinding._response.json.errors).to.not.be.empty;
      }
  );

Then(
    /^The \/wallet\-binding response should contain errorCode property equals to "([^"]*)"$/,
    (errorCode) =>
        chai
            .expect(
                specWalletBinding._response.json.errors
                    .map((error) => error.errorCode)
                    .toString()
            )
            .to.be.equal(errorCode)
);

// Scenario: Not able to generate the wallet binding because of unsupported challenge format
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/wallet\-binding request with given format "([^"]*)" as individualId and "([^"]*)" as authFactorType and "([^"]*)" as format and "([^"]*)" as challenge and requestTime and invalid publicKey$/,
  (individualId, authFactorType, format, challenge) =>
    specWalletBinding
      .post(baseUrl)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          individualId: individualId,
          authFactorType: authFactorType,
          format: format,
          challengeList: [
            {
              authFactorType: authFactorType,
              challenge: challenge,
              format: format,
            }
          ],
          publicKey: "string",
        },
      })
);

// Scenario: Not able to generate the wallet binding because of duplicated public key
// Given and others Then for this scenario are written in the aforementioned example
When(
  /^Send POST \/wallet\-binding request with given "([^"]*)" as individualId and "([^"]*)" as authFactorType and "([^"]*)" as format and "([^"]*)" as challenge and requestTime and duplicated publicKey$/,
  (individualId, authFactorType, format, challenge) => {
    specWalletBinding
        .post(baseUrl)
        .withJson({
          requestTime: new Date().toISOString(),
          request: {
            individualId: individualId,
            authFactorType: authFactorType,
            format: format,
            challengeList: [
              {
                authFactorType: authFactorType,
                challenge: challenge,
                format: format,
              }
            ],
            publicKey: "eyJrdHkiOiJSU0EiLCJhIjoiQVFBQiIsInVzZSI6InNpZyIsImFsZyI6IlJTMjU2IiwibiI6IlZGVWlQaHBPTkttNTRXeWhUZ1FKMU9ORU53WDFYNm5SNHF5TldBT0RLRlhzWUcyMEVadEp3THl1dUwzNUQxb0JtTEhoUVk5emRXVlpaVnk1cjh1SjN1ZWIwcGZsOFpxTzVCTnZnZW9ETTZkZXh0cEk2c250UUNVY1J1RVJCN29DOUZycldQWWtLTzlsRlFmckpGUmhtRHRONFh2aUVwSkFYVzVMcHgwaU5YSm5YTnJGWk9jS3JmUWZBV1B4QnJJRlBNSlJCeTZnaU0xUkpBandqSFE4VUxPV0dScG9JT0d5UXkySU9XS0c2ZjBVckZhTzlxVUltQlI4MmFQdW1TQXVKYXNsUkZUaE00bjZBSkZycmhCVDVuQWdTNmpQZjlENDhOWWtYUnJvSm5UbEpxbTdrVmdmT01qUEtnUTdUOUpzSjlNVHBWNWtlVFFTd0UyR0haTmExUCJ9",
          },
        })

    providedAuthFactorType = authFactorType;
  });

When (/^Send POST \/wallet-binding request with the same public key as in the previous request$/, () => {
  specWalletBindingDuplicate
      .post(baseUrl)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          individualId: 'n3fy2qkg9r7h2',
            authFactorType: 'OTP',
            format: 'encoded-json',
            challengeList: [
              {
                authFactorType: 'OTP',
                challenge: 'string',
                format: 'encoded-json',
              }
            ],
            publicKey: generateUniqueKey(baseKey, "-test3"),
        },
      })
})

// Scenario: Not able to generate the wallet binding because of invalid auth challenge
// Given and others Then for this scenario are written in the aforementioned example

After(endpointTag, () => {
  specWalletBinding.end();
  specWalletBindingDuplicate.end();
});
