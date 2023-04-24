@method=GET @endpoint=/.well-known/openid-configuration
Feature: This endpoint is only used to facilitate the OIDC provider details in a standardised manner.

  @smoke @unit @positive
  Scenario: Successful facilitation of OIDC provider details
    Given Wants to facilitate the OIDC provider details in a standard way
    When GET request to facilitate the OIDC provider details is sent
    Then The response is received
    And The response should be returned in a timely manner
    And The response should have status 200
    And The response header content-type should be "application/json; charset=utf-8"
    And The response should match json schema
