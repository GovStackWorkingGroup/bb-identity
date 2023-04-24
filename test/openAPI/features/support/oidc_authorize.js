const pactum = require("pactum");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { localhost } = require("./helpers/helpers");

let specOIDCAuthorize;
let invalidScope;
let invalidResponseType;
let invalidClientId;
let invalidRedirectUri;

const baseUrl = `${localhost}authorize`;

const validScope = "openid profile";
const validResponseType = "code";
const validClientId = "1245435";
const validRedirect_uri = "http://example.com";

const requestFunction = (scope, responseType, clientId, redirectUri) =>
  specOIDCAuthorize
    .get(baseUrl)
    .withQueryParams("scope", scope)
    .withQueryParams("response_type", responseType)
    .withQueryParams("client_id", clientId)
    .withQueryParams("redirect_uri", redirectUri);

const errorResultFunction = async () => {
  await specOIDCAuthorize.toss();
  specOIDCAuthorize.response().should.have.status(400);
};

Before(() => {
  specOIDCAuthorize = pactum.spec();
});

// Scenario: Successfully loads the JS application and validates the provided query parameters using the OAuth-details endpoint
Given(
  "The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint",
  () => {
    return "Every provided query parameters are valid";
  }
);

When("The user triggers an action with every required parameter", () => {
  requestFunction(
    validScope,
    validResponseType,
    validClientId,
    validRedirect_uri
  );
});

Then(
  "The user successfully loads the JS application and validates the provided query parameters using the OAuth-details endpoint",
  async () => {
    await specOIDCAuthorize.toss();
    specOIDCAuthorize.response().should.have.status(200);
  }
);

// Scenario: The user is not able to load the JS application and validates the provided query parameters using the OAuth-details endpoint, because of an invalid scope provided
Given(
  "The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid scope parameter",
  () => {
    invalidScope = "Invalid Scope";

    return invalidScope;
  }
);

When("The user triggers an action with an invalid scope parameter", () =>
  requestFunction(
    invalidScope,
    validResponseType,
    validClientId,
    validRedirect_uri
  )
);

Then(
  "The result of an operation returns an error because of an invalid scope provided",
  async () => {
    await errorResultFunction();
  }
);

// Scenario: The user is not able to load the JS application and validates the provided query parameters using the OAuth-details endpoint, because of an invalid scope provided
Given(
  "The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid response_type parameter",
  () => {
    invalidResponseType = "Not a code";
  }
);

When(
  "The user triggers an action with an invalid response_type parameter",
  () =>
    requestFunction(
      validScope,
      invalidResponseType,
      validClientId,
      validRedirect_uri
    )
);

Then(
  "The result of an operation returns an error, because of an invalid response_type provided",
  async () => {
    await errorResultFunction();
  }
);

// Scenario: The user is not able to load the JS application and validates the provided query parameters using the OAuth-details endpoint, because of an invalid client_id provided
Given(
  "The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid client_id parameter",
  () => {
    invalidClientId = "";
    return invalidClientId;
  }
);

When("The user triggers an action with an invalid client_id parameter", () =>
  requestFunction(
    validScope,
    validResponseType,
    invalidClientId,
    validRedirect_uri
  )
);

Then(
  "The result of an operation returns an error, because of an invalid client_id provided",
  async () => {
    await errorResultFunction();
  }
);
// Scenario: The user is not able to load the JS application and validates the provided query parameters using the OAuth-details endpoint, because of an invalid redirect_uri provided
Given(
  "The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid redirect_uri parameter",
  () => {
    invalidRedirectUri = "";
    return invalidRedirectUri;
  }
);

When(
  "The user triggers an action with an invalid redirect_uri parameter",
  () => {
    requestFunction(
      validScope,
      validResponseType,
      validClientId,
      invalidRedirectUri
    );
  }
);

Then(
  "The result of an operation returns an error, because of an invalid redirect_uri provided",
  async () => {
    await errorResultFunction();
  }
);

// Scenario: The user is not able to load the JS application and validates the provided query parameters using the OAuth-details endpoint because none parameters provided
Given(
  "The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint without parameters",
  () => {
    return "None parameters provided";
  }
);

When("The user triggers an action without parameters", () =>
  specOIDCAuthorize.get(baseUrl)
);

Then(
  "The result of an operation returns an error because none parameters provided",
  async () => {
    await errorResultFunction();
  }
);

After(() => {
  specOIDCAuthorize.end();
});
