const { spec } = require("pactum");
const { regex } = require("pactum-matchers");
const chai = require("chai");
const { When, Then, Before, After, Given } = require("@cucumber/cucumber");
const { localhost } = require("./helpers/helpers");

let specOpenidConfiguration;

const baseUrl = `${localhost}.well-known/openid-configuration`;

Before(() => {
  specOpenidConfiguration = spec().expectResponseTime(15000);
});

// Scenario: Successful facilitation of OIDC provider details
Given(
  "Wants to facilitate the OIDC provider details in a standard way",
  () => "Wants to facilitate the OIDC provider details in a standard way"
);

When("The request to facilitate the OIDC provider details is sent", () =>
  specOpenidConfiguration.get(baseUrl)
);

Then(
  "The operation returns the facilitated details of the OIDC provider",
  async () => {
    specOpenidConfiguration
      .expectStatus(200)
      .expectJsonMatch({
        issuer: regex("string", /^\S+$/),
        authorization_endpoint: regex("string", /^\S+$/),
        token_endpoint: regex("string", /^\S+$/),
        jwks_uri: regex("string", /^\S+$/),
        registration_endpoint: regex("string", /^\S+$/),
        scopes_supported: regex("openid", /^openid$/),
        response_types_supported: regex("code", /^code$/),
      })
      .expectJsonSchema({
        type: "object",
      });

    await specOpenidConfiguration.toss();

    const response = specOpenidConfiguration._response.json;
    let regexToUse;

    for (const key in response) {
      switch (key) {
        case "claim_types_supported": {
          regexToUse = /^normal$|^aggregated$|^distributed$/;
          break;
        }
        case "token_endpoint_auth_methods_supported": {
          regexToUse = /^private_key_jwt$/;
          break;
        }
        default: {
          regexToUse = /^\S+$/;
          break;
        }
      }

      chai
        .expect(response[key])
        .to.match(regexToUse, "Invalid " + key + " value");
    }
  }
);

After(() => {
  specOpenidConfiguration.end();
});
