@method=POST @endpoint=/client-mgmt/oidc-client
Feature: API to add new open ID connect (OIDC) clients.

  @smoke 
  Scenario: The new client is successfully added to the Open ID Connect (OIDC) smoke type test
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given requestTime, "e-health-service" as clientId, "Health Service" as clientName, "bharath-gov" as relyingPartyId, "http://example.com" as logoUri, publicKey, "idbb:acr:generated-code" as authContextRefs, "name" as userClaims, "authorization_code" as grantTypes, "private_key_jwt" as clientAuthMethods, "http://example.com/login-success" as redirectUris
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema
    And The POST /client-mgmt/oidc-client endpoint response should contain "e-health-service" as clientId
    And The POST /client-mgmt/oidc-client endpoint response should contain empty errors array

  @unit @positive
  Scenario Outline: The new client is successfully added to the Open ID Connect (OIDC)
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given requestTime, "<clientId>" as clientId, "<clientName>" as clientName, "<relyingPartyId>" as relyingPartyId, "<logoUri>" as logoUri, publicKey, "<authContextRefs>" as authContextRefs, "<userClaims>" as userClaims, "authorization_code" as grantTypes, "private_key_jwt" as clientAuthMethods, "<redirectUris>" as redirectUris
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema
    And The POST /client-mgmt/oidc-client endpoint response should contain "<clientId>" as clientId
    And The POST /client-mgmt/oidc-client endpoint response should contain empty errors array

    Examples: Valid data
    | clientId           | clientName       | relyingPartyId | logoUri             | authContextRefs                    | userClaims         | redirectUris           |
    | payment-service    | Payment Service  | abc-gov        | http://example1.com | idbb:acr:static-code               | given_name         | http://redirectMe1.com |
    | e-bank-service     | Bank Service     | bankser-gov    | http://example2.com | idbb:acr:linked-wallet-static-code | family_name        | http://redirectMe2.com |
    | e-commerce-service | Commerce Service | ecommer-gov    | http://example3.com | idbb:acr:biometrics-generated-code | middle_name        | http://redirectMe3.com |
    | health-service     | Health Service   | health-gov     | http://example4.com | idbb:acr:biometrics                | preferred_username | http://redirectMe4.com |

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid requestTime
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "2011-10-05" as invalid requestTime
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_request"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid authContextRefs
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "idbb:acr:invalid" as invalid authContextRefs
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_acr"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid userClaims
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "invalid_claims" as invalid userClaims
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_claim"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid grantTypes
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "invalid_code" as invalid grantTypes
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_grant_type"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid clientAuthMethods
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "invalid_auth_method" as invalid clientAuthMethods
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_client_auth"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid clientName
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given '' as invalid clientName
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_client_name"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid relyingPartyId
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given '' as invalid relyingPartyId
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_rp_id"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid logoUri
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given '' as invalid logoUri
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_uri"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid clientId
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given '' as invalid clientId
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_client_id"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid publicKey
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given publicKey as a string not JWT format
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_public_key"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of empty array of redirectUris
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given none redirectUris
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_redirect_uri"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of duplicate clientId
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "e-health-service" as clientId
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client response should have "content-type": "application/json" header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "duplicate_client_id"
