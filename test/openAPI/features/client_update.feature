Feature: API to update existing Open ID Connect (OIDC) client.

  Update OIDC Client Endpoint.

  Request endpoint: PUT /client-mgmt/oidc-client/{client_id}

  Background:
    Given The user wants to update the client profile in the Open ID Connect (OIDC)

  Scenario: The client profile is successfully updated in the Open ID Connect (OIDC)
    When The user triggers an action to update the client profile in the Open ID Connect (OIDC)
    Then The user successfully updated the client profile in the Open ID Connect (OIDC)

  Scenario: The user is not able to update the client profile, because it does not exist in the Open ID Connect (OIDC)
    When The user triggers an action to update the client profile in the Open ID Connect (OIDC) with client id whick does not exist
    Then The result of an operation returns an error, because the client_id does not exist in the Open ID Connect (OIDC)
