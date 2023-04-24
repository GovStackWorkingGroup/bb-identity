const pactum = require("pactum");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { localhost } = require("./helpers/helpers");

let requestPayload;
let specClientCreate;

const baseUrl = `${localhost}client-mgmt/oidc-client`;
const requestFunction = () =>
  specClientCreate.post(baseUrl).withBody(requestPayload);

Before(() => {
  specClientCreate = pactum.spec();
});

// Background:
Given(
  "The user wants to add the new client to the Open ID Connect \\(OIDC)",
  () => {
    requestPayload = {
      requestTime: "2011-10-05T14:48:00.000Z",
      request: {
        clientId: "e-health-service",
        clientName: "Health Service",
        relyingPartyId: "bharath-gov",
        logoUri: "http://example.com",
        publicKey: {},
        authContextRefs: ["mosip:idp:acr:static-code"],
        userClaims: ["name"],
        grantTypes: ["authorization_code"],
        clientAuthMethods: ["private_key_jwt"],
      },
    };

    return requestPayload;
  }
);

// Scenario: The new client is successfully added to the Open ID Connect (OIDC)
When(
  "The user triggers an action to add the new client to the Open ID Connect \\(OIDC)",
  () => {
    requestFunction();
  }
);

Then(
  "The user successfully added the new client to the Open ID Connect \\(OIDC)",
  async () => {
    await specClientCreate.toss();
    specClientCreate.response().should.have.status(200);
    specClientCreate.response().should.have.jsonLike({
      responseTime: "string",
      response: {
        clientId: "string",
      },
      errors: [],
    });
  }
);

// Scenario: The user is not able to add the new client to the Open ID Connect (OIDC), because of an invalid clientId
When(
  "The user triggers an action to add a new client to the Open ID Connect \\(OIDC) with an invalid request",
  () => {
    requestPayload.request.clientId = "";
    requestFunction();
  }
);

Then(
  "The result of an operation returns an error, because of an invalid request",
  async () => {
    await specClientCreate.toss();
    specClientCreate.response().should.have.status(400);
    specClientCreate.response().should.have.jsonLike({
      responseTime: "string",
      response: {
        clientId: "string",
      },
      errors: [
        {
          errorCode: "invalid_request",
          errorMessage: "string",
        },
      ],
    });
  }
);

After(() => {
  specClientCreate.end();
});
