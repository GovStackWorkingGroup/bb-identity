const chai = require('chai');
const { spec } = require('pactum');
const { When, Then, Before, After, Given } = require('@cucumber/cucumber');
const {
  localhost,
  statusCode200,
  defaultResponseTime,
  oidcWellKnownOpenidConfigurationEndpoint,
  oidcWellKnownOpenidConfigurationSchema,
} = require('../support/helpers/helpers');

chai.use(require('chai-json-schema'));

let specOpenidConfiguration;
const baseUrl = localhost + oidcWellKnownOpenidConfigurationEndpoint;
const tag = { tags: `@endpoint=/${oidcWellKnownOpenidConfigurationEndpoint}` };

Before(tag, () => {
  specOpenidConfiguration = spec();
});

// Scenario: Successful facilitation of OIDC provider details
Given(
  'Wants to facilitate the OIDC provider details in a standard way',
  () => 'Wants to facilitate the OIDC provider details in a standard way'
);

When('GET request to facilitate the OIDC provider details is sent', () =>
  specOpenidConfiguration.get(baseUrl)
);

Then('The response is received', async () => await specOpenidConfiguration.toss());

Then('The response should be returned in a timely manner', () =>
  specOpenidConfiguration.response().to.have.responseTimeLessThan(defaultResponseTime)
);

Then('The response should have status 200', () =>
  specOpenidConfiguration.response().to.have.status(statusCode200)
);

Then('The response header content-type should be {string}', (header_value) =>
  specOpenidConfiguration.response().to.have.header('content-type', header_value)
);

Then('The response should match json schema', () =>
  chai
    .expect(specOpenidConfiguration._response.json)
    .to.be.jsonSchema(
      oidcWellKnownOpenidConfigurationSchema,
      'Response body does not match with the json-schema\n'
    )
);

After(tag, () => {
  specOpenidConfiguration.end();
});
