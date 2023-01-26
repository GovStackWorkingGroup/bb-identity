const { spec } = require("pactum");
const chai = require("chai");
const { When, Then, Before, After } = require("@cucumber/cucumber");
const { localhost } = require("./helpers/helpers");

const baseUrl = `${localhost}.well-known/jwks.json`;

Before(() => {
  specJWKS = spec().expectResponseTime(15000);
});

// Scenario: Successfully retrieves the IdP server's public keys
When("The request to retrieve all public keys of the IdP server is sent", () =>
  specJWKS.get(baseUrl)
);

Then("The operation returns a public key set in JWKS format", async () => {
  specJWKS.expectStatus(200).expectJsonLike({
    keys: [
      {
        kid: /^\S+$/,
        alg: "RS256",
        use: "sig",
        kty: "RSA",
        e: /^\S+$/,
        n: /^\S+$/,
      },
    ],
  });

  await specJWKS.toss();

  specJWKS._response.json.keys.forEach((keyJWKS) => {
    if (keyJWKS.hasOwnProperty("status")) {
      chai
        .expect(keyJWKS.status)
        .to.match(/^ACTIVE$|^EXPIRED$|^NEXT$/, "Invalid status value");
    }
    if (keyJWKS.hasOwnProperty("x5c")) {
      chai.expect(keyJWKS.x5c).to.match(/^\S+$/, "Invalid x5c value");
    }
  });
});

After(() => {
  specJWKS.end();
});
