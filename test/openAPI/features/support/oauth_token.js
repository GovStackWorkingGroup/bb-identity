const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  oauthTokenEndpoint,
  defaultExpectedResponseTime,
  contentTypeHeader,
  oauthTokenResponse,
  oauthTokenErrorResponse
} = require("./helpers/helpers");
const { jsonToBase64 } = require("./helpers/utils");

chai.use(require('chai-json-schema'));

const base64ToJson = (base64String) => {
  const jsonString = Buffer.from(base64String, "base64").toString();
  return JSON.parse(jsonString);
};

let specOAuthToken;

const baseUrl = localhost + oauthTokenEndpoint;
const endpointTag = { tags: `@endpoint=/${oauthTokenEndpoint}` };

Before(endpointTag, () => {
  specOAuthToken = spec();
});

// Scenario: The user successfully receives the id and access token smoke type test

Given(/^The user wants to receive the id token and access token$/,
  () => 'The user wants to receive the id token and access token'
);

Given(
  /^The User sends POST request with given "([^"]*)" as grantType, "([^"]*)" as code, "([^"]*)" as clientId, "([^"]*)" as clientAssertionType, "([^"]*)" as clientAssertion, "([^"]*)" as redirectUri, "([^"]*)" as iss, "([^"]*)" as sub, "([^"]*)" as aud, (\d+) as exp, (\d+) as iat, "([^"]*)": "([^"]*)" header$/,
  (
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
    contentTypeKey,
    contentTypeValue,
  ) => {
    specOAuthToken.post(baseUrl)
      .withHeaders({
        contentTypeKey: contentTypeValue
      })
      .withForm({
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
  });

Then(/^User receives a response from the POST \/oauth\/token endpoint$/,
  async () => await specOAuthToken.toss()
);

Then(/^The POST \/oauth\/token endpoint response should be returned in a timely manner 15000ms$/,
  () => {
    specOAuthToken
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
  });

Then(/^The POST \/oauth\/token endpoint response should have status (\d+)$/,
  (status) => specOAuthToken.response().to.have.status(status)
);

Then(/^The POST \/oauth\/token response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) =>
    specOAuthToken
      .response()
      .should.have.headerContains(key, value)
);

Then(/^The POST \/oauth\/token endpoint response should match json schema$/,
  () => chai
    .expect(specOAuthToken._response.json)
    .to.be.jsonSchema(oauthTokenResponse)
);

Then(/^The POST \/oauth\/token endpoint response should contain "([^"]*)" as idToken$/,
  (idToken) => {
    chai
      .expect(specOAuthToken._response.json.id_token)
      .to.be.equal(idToken);
  });

Then(/^The POST \/oauth\/token endpoint response should contain "([^"]*)" as accessToken$/,
  (accessToken) => {
    chai
      .expect(specOAuthToken._response.json.access_token)
      .to.be.equal(accessToken);
  });

Then(/^The POST \/oauth\/token endpoint response should contain "([^"]*)" as tokenType$/,
  (tokenType) => {
    chai
      .expect(specOAuthToken._response.json.token_type)
      .to.be.equal(tokenType);
  });

Then(/^The POST \/oauth\/token endpoint response should contain (\d+) as expiresIn$/,
  (expiresIn) => {
    chai
      .expect(specOAuthToken._response.json.expires_in)
      .to.be.equal(expiresIn);
  });

// Scenario: The user is not able to receive the ID and access token because of the invalid client_assertion
// Given for this scenario are written in the aforementioned example
When(
  /^The User sends POST request with given "([^"]*)" as grantType, "([^"]*)" as code, "([^"]*)" as clientId, "([^"]*)" as clientAssertionType, "([^"]*)" as redirectUri, "([^"]*)": "([^"]*)" header$/,
  (
    grantType,
    code,
    clientId,
    clientAssertionType,
    redirectUri,
    contentTypeKey,
    contentTypeValue,
  ) => {
    specOAuthToken.post(baseUrl)
      .withHeaders({
        contentTypeKey: contentTypeValue
      })
      .withForm({
        grant_type: grantType,
        client_assertion_type: clientAssertionType,
        client_id: clientId,
        code: code,
        redirect_uri: redirectUri,
      })
  });

Then(/^The POST \/oauth\/token endpoint response should match json error schema$/,
  () => {
    chai
      .expect(specOAuthToken._response.json)
      .to.be.jsonSchema(oauthTokenErrorResponse)
  }
);

Then(
  /^The POST \/oauth\/token endpoint response should contain "([^"]*)" as errorType$/,
  (errorCode) =>
    chai
      .expect(specOAuthToken._response.json.error)
      .to.be.equal(errorCode)
);

// Scenario: The user is not able to receive the ID and access token because of the invalid client_assertion_type
// Given, Then for this scenario are written in the aforementioned example
When(
  /^The User sends POST request with given "([^"]*)" as grantType, "([^"]*)" as code, "([^"]*)" as clientId, "([^"]*)" as clientAssertion, "([^"]*)" as redirectUri, "([^"]*)": "([^"]*)" header$/,
  (
    grantType,
    code,
    clientId,
    clientAssertion,
    redirectUri,
    contentTypeKey,
    contentTypeValue,
  ) => {
    specOAuthToken.post(baseUrl)
      .withHeaders({
        contentTypeKey: contentTypeValue
      })
      .withForm({
        grant_type: grantType,
        client_assertion: clientAssertion,
        client_id: clientId,
        code: code,
        redirect_uri: redirectUri,
      })
  });


// Scenario: The user is not able to receive the ID and access token because of the invalid redirect_uri
// Given, Then for this scenario are written in the aforementioned example
When(
  /^The User sends POST request with given "([^"]*)" as grantType, "([^"]*)" as code, "([^"]*)" as clientId, "([^"]*)" as clientAssertionType, "([^"]*)" as clientAssertion, "([^"]*)": "([^"]*)" header$/,
  (
    grantType,
    code,
    clientId,
    clientAssertion,
    clientAssertionType,
    contentTypeKey,
    contentTypeValue,
  ) => {
    specOAuthToken.post(baseUrl)
      .withHeaders({
        contentTypeKey: contentTypeValue
      })
      .withForm({
        grant_type: grantType,
        client_assertion_type: clientAssertionType,
        client_assertion: clientAssertion,
        client_id: clientId,
        code: code,
      })
  });


// Scenario: The user is not able to receive the ID and access token because of the invalid input
// Given, Then for this scenario are written in the aforementioned example
When(
  /^The User sends POST request with given "([^"]*)" as grantType, "([^"]*)" as code, "([^"]*)" as clientId, "([^"]*)" as clientAssertionType, "([^"]*)" as clientAssertion, "([^"]*)" as redirectUri, "([^"]*)": "([^"]*)" header$/,
  (
    grantType,
    code,
    clientId,
    clientAssertion,
    clientAssertionType,
    redirectUri,
    contentTypeKey,
    contentTypeValue,
  ) => {
    specOAuthToken.post(baseUrl)
      .withHeaders({
        contentTypeKey: contentTypeValue
      })
      .withForm({
        grant_type: grantType,
        client_assertion_type: clientAssertionType,
        client_assertion: clientAssertion,
        client_id: clientId,
        code: code,
        redirect_uri: redirectUri,
      })
  });


// Scenario: The user is not able to receive the ID and access token because of the empty payload
// Given, Then for this scenario are written in the aforementioned example
When(
  /^The User sends POST request without a payload$/,
  () => {
    specOAuthToken.post(baseUrl)
  });

After(endpointTag, () => {
  specOAuthToken.end();
});
