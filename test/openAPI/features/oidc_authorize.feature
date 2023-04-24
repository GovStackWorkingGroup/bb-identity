Feature: The authorized endpoint of Open ID Connect (OIDC).

  This is the authorized endpoint of Open ID Connect (OIDC), the relying party applications will do a browser redirect
  to this endpoint with all required details passed as query parameters.

  Request endpoint: GET /authorize

  Scenario: Successfully loads the JS application and validates the provided query parameters using the OAuth-details endpoint
    Given The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint
    When The user triggers an action with every required parameter
    Then The user successfully loads the JS application and validates the provided query parameters using the OAuth-details endpoint

  Scenario: The user is not able to load the JS application and validates the provided query parameters using the OAuth-details endpoint, because of an invalid scope provided
    Given The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid scope parameter
    When The user triggers an action with an invalid scope parameter
    Then The result of an operation returns an error because of an invalid scope provided

  Scenario: The user is not able to load the JS application and validates the provided query parameters using the OAuth-details endpoint, because of an invalid response_type provided
    Given The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid response_type parameter
    When The user triggers an action with an invalid response_type parameter
    Then The result of an operation returns an error, because of an invalid response_type provided

  Scenario: The user is not able to load the JS application and validates the provided query parameters using the OAuth-details endpoint, because of an invalid client_id provided
    Given The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid client_id parameter
    When The user triggers an action with an invalid client_id parameter
    Then The result of an operation returns an error, because of an invalid client_id provided

  Scenario: The user is not able to load the JS application and validates the provided query parameters using the OAuth-details endpoint, because of an invalid redirect_uri provided
    Given The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid redirect_uri parameter
    When The user triggers an action with an invalid redirect_uri parameter
    Then The result of an operation returns an error, because of an invalid redirect_uri provided

  Scenario: The user is not able to load the JS application and validates the provided query parameters using the OAuth-details endpoint because none parameters provided
    Given The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint without parameters
    When The user triggers an action without parameters
    Then The result of an operation returns an error because none parameters provided
