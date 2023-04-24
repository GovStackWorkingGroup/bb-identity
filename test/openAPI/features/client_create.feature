Feature: API to add new open ID connect (OIDC) clients, it can be invoked by other modules which manage the relying parties/partners.

  Create OIDC Client Endpoint.

  Request endpoint: POST /client-mgmt/oidc-client

  Background: 
    Given The user wants to add the new client to the Open ID Connect (OIDC)

  Scenario: The new client is successfully added to the Open ID Connect (OIDC)
    When The user triggers an action to add the new client to the Open ID Connect (OIDC)
    Then The user successfully added the new client to the Open ID Connect (OIDC)

  Scenario: The user is not able to add the new client to the Open ID Connect (OIDC), because of an invalid request
    When The user triggers an action to add a new client to the Open ID Connect (OIDC) with an invalid request
    Then The result of an operation returns an error, because of an invalid request
