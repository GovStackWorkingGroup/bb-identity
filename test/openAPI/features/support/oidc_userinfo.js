const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultExpectedResponseTime,
  oidcUserinfoEndpoint,
  contentTypeHeaderJWT, oidcUserinfoResponseSchema, oauthTokenEndpoint,
} = require("./helpers/helpers");
const { jsonToBase64 } = require("./helpers/utils");

chai.use(require('chai-json-schema'));

let specOAuthToken;
let specOidcUserinfo;
let receivedToken;

const baseUrl = localhost + oidcUserinfoEndpoint;
const endpointTag = { tags: `@endpoint=/${oidcUserinfoEndpoint}` };

Before(endpointTag, () => {
  specOAuthToken = spec();
  specOidcUserinfo = spec();
});

// Scenario: The user successfully receives user information smoke type test

Given(/^The user wants to receive user information$/,
    () => 'The user wants to receive user information'
);

Given(
    /^The id_token is generated before GET \/oidc\/userinfo with given "([^"]*)" as grantType, "([^"]*)" as code, "([^"]*)" as clientId, "([^"]*)" as clientAssertionType, "([^"]*)" as clientAssertion, "([^"]*)" as redirectUri, "([^"]*)" as iss, "([^"]*)" as sub, "([^"]*)" as aud, (\d+) as exp, (\d+) as iat$/,
  async (
    grantType,
    code,
    clientId,
    clientAssertionType,
    clientAssertion,
    redirectUri,
    iss,
    sub,
    aud,
    exp,
    iat,
    ) => {
      specOAuthToken.post(localhost + oauthTokenEndpoint)
          .withJson({
        grant_type: grantType,
        client_assertion_type: clientAssertionType,
        client_assertion:
          clientAssertion +
          jsonToBase64({
            iss: iss,
            sub: sub,
            aud: aud,
            exp: exp,
            iat: iat,
          }),
        client_id: clientId,
        code: code,
        redirect_uri: redirectUri,
      })
    await specOAuthToken.toss();
    receivedToken = specOAuthToken._response.json.id_token;
  });

When(/^The User sends GET request to receive user information$/,
    async () => {
      if (receivedToken) {
        await specOidcUserinfo.get(baseUrl)
      }
    });

Then(/^User receives a response from the GET \/oidc\/userinfo endpoint$/,
    async () => await specOidcUserinfo.toss()
);

Then(/^The GET \/oidc\/userinfo endpoint response should be returned in a timely manner 15000ms$/,
    () => {
      specOidcUserinfo
          .response()
          .to.have.responseTimeLessThan(defaultExpectedResponseTime)
    });

Then(/^The GET \/oidc\/userinfo endpoint response should have status (\d+)$/,
    (status) => specOidcUserinfo.response().to.have.status(status)
);

Then(/^The GET \/oidc\/userinfo response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) =>
      specOidcUserinfo
      .response()
      .should.have.headerContains(key, value)
);

Then(/^The GET \/oidc\/userinfo endpoint response should match json schema$/,
    () =>  chai
        .expect(specOidcUserinfo._response.json)
        .to.be.jsonSchema(oidcUserinfoResponseSchema)
);


After(endpointTag, () => {
  specOAuthToken.end();
  specOidcUserinfo.end()
});
