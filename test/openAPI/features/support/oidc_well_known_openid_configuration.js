const chai = require('chai');
const { spec } = require('pactum');
const { When, Then, Before, After, Given } = require('@cucumber/cucumber');
const {
  localhost,
  contentTypeHeader,
  defaultResponseTime,
  oidcWellKnownOpenidConfigurationEndpoint,
  oidcWellKnownOpenidConfigurationSchema,
} = require('../support/helpers/helpers');

chai.use(require('chai-json-schema'));

const baseUrl = localhost + oidcWellKnownOpenidConfigurationEndpoint;
const endpointTag = { tags: `@endpoint=/${oidcWellKnownOpenidConfigurationEndpoint}` };

Before(endpointTag, () => {
  specOpenidConfiguration = spec();
});

// Scenario: Successful facilitation of OIDC provider details
Given(
  /^Wants to facilitate the OIDC provider details in a standard way$/,
  () => 'Wants to facilitate the OIDC provider details in a standard way'
);

When(/^GET request to facilitate the OIDC provider details is sent$/, () => specOpenidConfiguration.get(baseUrl));

Then(
  /^The response from \/\.well\-known\/openid\-configuration endpoint is received$/,
  async () => await specOpenidConfiguration.toss()
);

Then(/^The response from \/\.well\-known\/openid\-configuration should be returned in a timely manner 15000ms$/, () =>
  specOpenidConfiguration.response().to.have.responseTimeLessThan(defaultResponseTime)
);

Then(/^The response from \/\.well\-known\/openid\-configuration should have status (\d+)$/, (status) =>
  specOpenidConfiguration.response().to.have.status(status)
);

Then(
  /^The response from \/\.well\-known\/openid\-configuration response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) =>
    specOpenidConfiguration
      .response()
      .should.have.headerContains(key, value)
);

Then(/^The response from \/\.well\-known\/openid\-configuration should match json schema$/, () =>
  chai
    .expect(specOpenidConfiguration._response.json)
    .to.be.jsonSchema(oidcWellKnownOpenidConfigurationSchema, 'Response body does not match with the json-schema\n')
);

After(endpointTag, () => {
  specOpenidConfiguration.end();
});
