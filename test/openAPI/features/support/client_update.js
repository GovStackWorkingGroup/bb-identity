const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  clientUpdateEndpoint,
  clientCreateEndpoint,
  defaultExpectedResponseTime,
  contentTypeHeader,
  clientResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specClientCreate;
let specClientUpdate;
let createdClientId;

const baseUrl = localhost + clientUpdateEndpoint;
const endpointTag = { tags: `@endpoint=/${clientUpdateEndpoint}` };

Before(endpointTag, () => {
  specClientCreate = spec();
  specClientUpdate = spec();
});

// Scenario: The client profile is successfully updated in the Open ID Connect (OIDC) smoke type test
Given(
  'The user wants to update the client profile in the Open ID Connect \\(OIDC)',
  () =>
    'The user wants to update the client profile in the Open ID Connect (OIDC)'
);

Given(
  'The client profile with {string} as clientId is created',
  async (clientId) => {
    specClientCreate.post(localhost + clientCreateEndpoint).withJson({
      requestTime: new Date().toISOString(),
      request: {
        clientId: clientId,
        clientName: 'Health Service',
        relyingPartyId: 'bharath-gov',
        logoUri: 'http://example.com',
        publicKey: {},
        authContextRefs: ['idbb:acr:generated-code'],
        userClaims: ['name'],
        grantTypes: ['authorization_code'],
        clientAuthMethods: ['private_key_jwt'],
      },
    });
    await specClientCreate.toss();
    createdClientId = specClientCreate._response.json.response.clientId;
  }
);

When(
  'User sends PUT request with given {string} as client_id parameter, requestTime, {string} as clientName, {string} as status, {string} as logoUri, {string} as redirectUris, {string} as userClaims, {string} as authContextRefs, {string} as grantTypes, {string} as clientAuthMethods',
  (
    client_id,
    clientName,
    status,
    logoUri,
    redirectUris,
    userClaims,
    authContextRefs,
    grantTypes,
    clientAuthMethods
  ) =>
    specClientUpdate
      .put(baseUrl)
      .withPathParams('client_id', client_id)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          clientName: clientName,
          status: status,
          logoUri: logoUri,
          redirectUris: [redirectUris],
          userClaims: [userClaims],
          authContextRefs: [authContextRefs],
          grantTypes: [grantTypes],
          clientAuthMethods: [clientAuthMethods],
        },
      })
);

Then(
  'User receives a response from the PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint',
  async () => await specClientUpdate.toss()
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should be returned in a timely manner 15000ms',
  () =>
    specClientUpdate
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should have status 200',
  () => specClientUpdate.response().to.have.status(200)
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} response should have {string}: {string} header',
  (key, value) =>
    specClientUpdate
      .response()
      .should.have.headerContains(key, value)
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should match json schema',
  () => {
    clientResponseSchema.properties.response.errors = [];
    chai
      .expect(specClientUpdate._response.json)
      .to.be.jsonSchema(clientResponseSchema);
  }
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should contain {string} as clientId',
  (clientId) =>
    chai
      .expect(specClientUpdate._response.json.response.clientId)
      .to.be.equal(clientId)
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should contain empty errors array',
  () => chai.expect(specClientUpdate._response.json.errors).to.be.empty
);

// Scenario: Not able to update the client because of invalid clientAuthMethods
// Given, Then for this scenario are written in the aforementioned example
When(
  'User sends PUT request with given {string} as invalid clientAuthMethods',
  (clientAuthMethods) =>
    specClientUpdate
      .put(baseUrl)
      .withPathParams('client_id', createdClientId)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          clientName: 'Health Service',
          status: 'active',
          logoUri: 'http://example.com',
          redirectUris: ['http://example-redirect.com'],
          userClaims: ['name'],
          authContextRefs: ['idbb:acr:generated-code'],
          grantTypes: ['authorization_code'],
          clientAuthMethods: [clientAuthMethods],
        },
      })
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should match json schema with error',
  () =>
    chai
      .expect(specClientUpdate._response.json)
      .to.be.jsonSchema(clientResponseSchema)
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should match with error code {string}',
  (errorCode) =>
    chai
      .expect(
        specClientUpdate._response.json.errors
          .map((error) => error.errorCode)
          .toString()
      )
      .to.be.equals(errorCode)
);

// Scenario: Not able to update the client because of invalid grantTypes
// Given, Then for this scenario are written in the aforementioned example
When(
  'User sends PUT request with given {string} as invalid grantTypes',
  (grantTypes) =>
    specClientUpdate
      .put(baseUrl)
      .withPathParams('client_id', createdClientId)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          clientName: 'Health Service',
          status: 'active',
          logoUri: 'http://example.com',
          redirectUris: ['http://example-redirect.com'],
          userClaims: ['name'],
          authContextRefs: ['idbb:acr:generated-code'],
          grantTypes: [grantTypes],
          clientAuthMethods: ['private_key_jwt'],
        },
      })
);

// Scenario: Not able to update the client because of invalid userClaims
// Given, Then for this scenario are written in the aforementioned example
When(
  'User sends PUT request with given {string} as invalid userClaims',
  (userClaims) =>
    specClientUpdate
      .put(baseUrl)
      .withPathParams('client_id', createdClientId)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          clientName: 'Health Service',
          status: 'active',
          logoUri: 'http://example.com',
          redirectUris: ['http://example-redirect.com'],
          userClaims: [userClaims],
          authContextRefs: ['idbb:acr:generated-code'],
          grantTypes: ['authorization_code'],
          clientAuthMethods: ['private_key_jwt'],
        },
      })
);

// Scenario: Not able to update the client because of invalid authContextRefs
// Given, Then for this scenario are written in the aforementioned example
When(
  'User sends PUT request with given {string} as invalid authContextRefs',
  (authContextRefs) =>
    specClientUpdate
      .put(baseUrl)
      .withPathParams('client_id', createdClientId)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          clientName: 'Health Service',
          status: 'active',
          logoUri: 'http://example.com',
          redirectUris: ['http://example-redirect.com'],
          userClaims: ['name'],
          authContextRefs: [authContextRefs],
          grantTypes: ['authorization_code'],
          clientAuthMethods: ['private_key_jwt'],
        },
      })
);

// Scenario: Not able to update the client because of invalid redirectUri
// Given, Then for this scenario are written in the aforementioned example
When(
  'User sends PUT request with given {string} as invalid redirectUri',
  (redirectUri) =>
    specClientUpdate
      .put(baseUrl)
      .withPathParams('client_id', createdClientId)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          clientName: 'Health Service',
          status: 'active',
          logoUri: 'http://example.com',
          redirectUris: [redirectUri],
          userClaims: ['name'],
          authContextRefs: ['idbb:acr:generated-code'],
          grantTypes: ['authorization_code'],
          clientAuthMethods: ['private_key_jwt'],
        },
      })
);

// Scenario: Not able to update the client because of invalid logoUri
// Given, Then for this scenario are written in the aforementioned example
When(
  'User sends PUT request with given {string} as invalid logoUri',
  (logoUri) =>
    specClientUpdate
      .put(baseUrl)
      .withPathParams('client_id', createdClientId)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          clientName: 'Health Service',
          status: 'active',
          logoUri: logoUri,
          redirectUris: ['http://example-redirect.com'],
          userClaims: ['name'],
          authContextRefs: ['idbb:acr:generated-code'],
          grantTypes: ['authorization_code'],
          clientAuthMethods: ['private_key_jwt'],
        },
      })
);

// Scenario: Not able to update the client because of invalid clientName
// Given, Then for this scenario are written in the aforementioned example
When(
  'User sends PUT request with given {string} as invalid clientName',
  (clientName) =>
    specClientUpdate
      .put(baseUrl)
      .withPathParams('client_id', createdClientId)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          clientName: clientName,
          status: 'active',
          logoUri: 'http://example.com',
          redirectUris: ['http://example-redirect.com'],
          userClaims: ['name'],
          authContextRefs: ['idbb:acr:generated-code'],
          grantTypes: ['authorization_code'],
          clientAuthMethods: ['private_key_jwt'],
        },
      })
);

// Scenario: Not able to update the client because of invalid client_id
// Given, Then for this scenario are written in the aforementioned example
When(
  'User sends PUT request with given {string} as invalid client_id',
  (client_id) =>
    specClientUpdate
      .put(baseUrl)
      .withPathParams('client_id', client_id)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          clientName: 'Health Service',
          status: 'active',
          logoUri: 'http://example.com',
          redirectUris: ['http://example-redirect.com'],
          userClaims: ['name'],
          authContextRefs: ['idbb:acr:generated-code'],
          grantTypes: ['authorization_code'],
          clientAuthMethods: ['private_key_jwt'],
        },
      })
);

After(endpointTag, () => {
  specClientCreate.end();
  specClientUpdate.end();
});
