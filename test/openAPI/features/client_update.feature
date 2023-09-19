@method=PUT @endpoint=/client-mgmt/oidc-client/{client_id}
Feature: API to update existing Open ID Connect (OIDC) client.

  @smoke @unit @positive
  Scenario: The client profile is successfully updated in the Open ID Connect (OIDC) smoke type test
    Given The user wants to update the client profile in the Open ID Connect (OIDC)
    And The client profile with "e-health-service" as clientId is created
    When User sends PUT request with given "e-health-service" as client_id parameter, requestTime, "Health Service" as clientName, "active" as status, "http://example.com" as logoUri, "http://example-redirect.com" as redirectUris, "name" as userClaims, "idbb:acr:generated-code" as authContextRefs, "authorization_code" as grantTypes, "private_key_jwt" as clientAuthMethods
    Then User receives a response from the PUT /client-mgmt/oidc-client/{client_id} endpoint
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should be returned in a timely manner 15000ms
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have status 200
    And The PUT /client-mgmt/oidc-client/{client_id} response should have "content-type": "application/json" header
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match json schema
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should contain "e-health-service" as clientId
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should contain empty errors array

  @unit @negative
  Scenario: Not able to update the client because of invalid clientAuthMethods
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    And The client profile with "e-health-service-01" as clientId is created
    When User sends PUT request with given "invalid_auth_method" as invalid clientAuthMethods
    Then User receives a response from the PUT /client-mgmt/oidc-client/{client_id} endpoint
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should be returned in a timely manner 15000ms
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have status 200
    And The PUT /client-mgmt/oidc-client/{client_id} response should have "content-type": "application/json" header
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match json schema with error
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match with error code "invalid_client_auth"

  @unit @negative
  Scenario: Not able to update the client because of invalid grantTypes
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    And The client profile with "e-health-service-02" as clientId is created
    When User sends PUT request with given "invalid_code" as invalid grantTypes
    Then User receives a response from the PUT /client-mgmt/oidc-client/{client_id} endpoint
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should be returned in a timely manner 15000ms
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have status 200
    And The PUT /client-mgmt/oidc-client/{client_id} response should have "content-type": "application/json" header
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match json schema with error
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match with error code "invalid_grant_type"

  @unit @negative
  Scenario: Not able to update the client because of invalid userClaims
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    And The client profile with "e-health-service-03" as clientId is created
    When User sends PUT request with given "invalid_claims" as invalid userClaims
    Then User receives a response from the PUT /client-mgmt/oidc-client/{client_id} endpoint
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should be returned in a timely manner 15000ms
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have status 200
    And The PUT /client-mgmt/oidc-client/{client_id} response should have "content-type": "application/json" header
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match json schema with error
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match with error code "invalid_claim"

  @unit @negative
  Scenario: Not able to update the client because of invalid authContextRefs
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    And The client profile with "e-health-service-04" as clientId is created
    When User sends PUT request with given "idbb:acr:invalid" as invalid authContextRefs
    Then User receives a response from the PUT /client-mgmt/oidc-client/{client_id} endpoint
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should be returned in a timely manner 15000ms
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have status 200
    And The PUT /client-mgmt/oidc-client/{client_id} response should have "content-type": "application/json" header
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match json schema with error
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match with error code "invalid_acr"

  @unit @negative
  Scenario: Not able to update the client because of invalid redirectUri
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    And The client profile with "e-health-service-05" as clientId is created
    When User sends PUT request with given "" as invalid redirectUri
    Then User receives a response from the PUT /client-mgmt/oidc-client/{client_id} endpoint
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should be returned in a timely manner 15000ms
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have status 200
    And The PUT /client-mgmt/oidc-client/{client_id} response should have "content-type": "application/json" header
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match json schema with error
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match with error code "invalid_redirect_uri"

  @unit @negative
  Scenario: Not able to update the client because of invalid logoUri
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    And The client profile with "e-health-service-06" as clientId is created
    When User sends PUT request with given "" as invalid logoUri
    Then User receives a response from the PUT /client-mgmt/oidc-client/{client_id} endpoint
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should be returned in a timely manner 15000ms
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have status 200
    And The PUT /client-mgmt/oidc-client/{client_id} response should have "content-type": "application/json" header
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match json schema with error
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match with error code "invalid_uri"

  @unit @negative
  Scenario: Not able to update the client because of invalid clientName
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    And The client profile with "e-health-service-07" as clientId is created
    When User sends PUT request with given "" as invalid clientName
    Then User receives a response from the PUT /client-mgmt/oidc-client/{client_id} endpoint
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should be returned in a timely manner 15000ms
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have status 200
    And The PUT /client-mgmt/oidc-client/{client_id} response should have "content-type": "application/json" header
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match json schema with error
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match with error code "invalid_client_name"

  @unit @negative
  Scenario: Not able to update the client because of invalid client_id
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    And The client profile with "e-health-service-08" as clientId is created
    When User sends PUT request with given "e-service" as invalid client_id
    Then User receives a response from the PUT /client-mgmt/oidc-client/{client_id} endpoint
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should be returned in a timely manner 15000ms
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have status 200
    And The PUT /client-mgmt/oidc-client/{client_id} response should have "content-type": "application/json" header
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match json schema with error
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match with error code "invalid_client_id"
