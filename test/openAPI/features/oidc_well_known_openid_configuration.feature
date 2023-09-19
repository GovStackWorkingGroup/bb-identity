@method=GET @endpoint=/.well-known/openid-configuration
Feature: This endpoint is only used to facilitate the OIDC provider details in a standardised manner.

  @smoke @unit @positive
  Scenario: Successful facilitation of OIDC provider details
    Given Wants to facilitate the OIDC provider details in a standard way
    When GET request to facilitate the OIDC provider details is sent
    Then The response from /.well-known/openid-configuration endpoint is received
    And The response from /.well-known/openid-configuration should be returned in a timely manner 15000ms
    And The response from /.well-known/openid-configuration should have status 200
    And The response from /.well-known/openid-configuration response should have "content-type": "application/json" header
    And The response from /.well-known/openid-configuration should match json schema
