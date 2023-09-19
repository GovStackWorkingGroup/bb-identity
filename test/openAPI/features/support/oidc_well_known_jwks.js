const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  contentTypeHeader,
  defaultResponseTime,
  oidcWellKnownJWKSEndpoint,
  oidcWellKnownJWKSResponseSchema,
} = require('../support/helpers/helpers');

chai.use(require('chai-json-schema'));

const baseUrl = localhost + oidcWellKnownJWKSEndpoint;
const endpointTag = { tags: `@endpoint=/${oidcWellKnownJWKSEndpoint}` };

Before(endpointTag, () => {
  specJWKS = spec();
});

// Scenario: Successfully retrieves the IDBB server's public keys
Given(/^Wants to retrieve the IDBB server's public keys$/, () => "Wants to retrieve the IDBB server's public keys");

When(/^GET request to retrieve all the public keys of the IDBB server is sent$/, () => specJWKS.get(baseUrl));

Then(/^The response from \/\.well\-known\/jwks\.json endpoint is received$/, async () => await specJWKS.toss());

Then(/^The response from \/\.well\-known\/jwks\.json should be returned in a timely manner 15000ms$/, () =>
  specJWKS.response().to.have.responseTimeLessThan(defaultResponseTime)
);

Then(/^The response from \/\.well\-known\/jwks\.json should have status (\d+)$/, (status) =>
  specJWKS.response().to.have.status(status)
);

Then(/^The response from \/\.well\-known\/jwks\.json response should have "([^"]*)": "([^"]*)" header$/,
  (key, value) =>
    specJWKS
      .response()
      .should.have.headerContains(key, value)
);

Then(/^The response from \/\.well\-known\/jwks\.json should match json schema$/, () =>
  chai
    .expect(specJWKS._response.json)
    .to.be.jsonSchema(oidcWellKnownJWKSResponseSchema, 'Response body does not match with the json-schema\n')
);

Then(/^The combination of kid and kty is distinct for each element in the returned array$/, () => {
  const keys = specJWKS._response.json.keys;
  const combinations = new Set();

  let isDistinct = true;
  for (const keyObject in keys) {
    const combination = `${keys[keyObject].kid}:${keys[keyObject].kty}`;
    if (combinations.has(combination)) {
      isDistinct = false;
      break;
    }
    combinations.add(combination);
  }

  chai.expect(isDistinct).to.be.true;
});

After(endpointTag, () => {
  specJWKS.end();
});
