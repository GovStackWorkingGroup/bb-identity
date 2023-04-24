const pactum = require("pactum");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { localhost } = require("./helpers/helpers");

let requestPayload;
let specClientUpdate;
let clientId;

const baseUrl = `${localhost}client-mgmt/oidc-client/{client_id}`;
const requestFunction = (clientId) =>
  specClientUpdate
    .put(baseUrl)
    .withPathParams("client_id", clientId)
    .withBody(requestPayload);

Before(() => {
  specClientUpdate = pactum.spec();
});

// Background:
Given(
  "The user wants to update the client profile in the Open ID Connect \\(OIDC)",
  () => {
    requestPayload = {
      requestTime: "2022-09-22T08:03:45.000Z",
      request: {
        clientName: "Health Service",
        status: "active",
        logoUri: "http://example.com",
        redirectUris: ["http://example.com"],
        userClaims: ["name"],
        authContextRefs: ["mosip:idp:acr:static-code"],
        grantTypes: ["authorization_code"],
        clientAuthMethods: ["private_key_jwt"],
      },
    };

    return requestPayload;
  }
);

// Scenario: The client profile is successfully updated in the Open ID Connect (OIDC)
When(
  "The user triggers an action to update the client profile in the Open ID Connect \\(OIDC)",
  () => {
    clientId = "785b806d0e594657b05aabdb30fff8a4";
    requestFunction(clientId);
  }
);

Then(
  "The user successfully updated the client profile in the Open ID Connect \\(OIDC)",
  async () => {
    await specClientUpdate.toss();
    specClientUpdate.response().should.have.status(200);
    specClientUpdate.response().should.have.jsonLike({
      responseTime: "string",
      response: {
        clientId: "string",
      },
      errors: [],
    });
  }
);

// Scenario: The user is not able to update the client profile, because it does not exist in the Open ID Connect (OIDC)
When(
  "The user triggers an action to update the client profile in the Open ID Connect \\(OIDC) with client id whick does not exist",
  () => {
    clientId = "doesnotexist";
    requestFunction(clientId);
  }
);

Then(
  "The result of an operation returns an error, because the client_id does not exist in the Open ID Connect \\(OIDC)",
  async () => {
    await specClientUpdate.toss();
    specClientUpdate.response().should.have.status(404);
    specClientUpdate.response().should.have.jsonLike({
      responseTime: "string",
      response: {
        clientId: "string",
      },
      errors: [
        {
          errorCode: "client_id does not exist",
          errorMessage: "string",
        },
      ],
    });
  }
);

After(() => {
  specClientUpdate.end();
});
