@method=POST @endpoint=/linked-authorization/consent
Feature: The endpoint to send the accepted user claims and permitted scopes.

  @smoke @unit @positive
  Scenario: Successfully sends the accepted user claims and permitted scopes smoke type test
    Given Wants to send the accepted user claims and permitted scopes
    And The linkedTransactionId is generated before POST /linked-authorization/consent
    When Send POST /linked-authorization/consent request with given requestTime and linkedTransactionId
    Then Receive a response from the /linked-authorization/consent endpoint
    And The /linked-authorization/consent endpoint response should be returned in a timely manner 15000ms
    And The /linked-authorization/consent endpoint response should have status 200

  @positive
  Scenario: Successfully sends the accepted user claims and permitted scopes
    Given Wants to send the accepted user claims and permitted scopes
    When Send POST /linked-authorization/consent request with given requestTime, linkedTransactionId, "openid" as permittedAuthorizeScopes, "given_name" as acceptedClaims
    Then Receive a response from the /linked-authorization/consent endpoint
    And The /linked-authorization/consent endpoint response should be returned in a timely manner 15000ms
    And The /linked-authorization/consent endpoint response should have status 200
    And The /linked-authorization/consent response should have "content-type": "application/json" header
    And The /linked-authorization/consent endpoint response should contain linkedTransactionId
    And The /linked-authorization/consent endpoint response should match json schema without errors

  @negative
  Scenario: Not able to send the accepted user claims and permitted scopes because of invalid linkedTransactionId
    Given Wants to check the correctness of the data
    When Send POST /linked-authorization/consent request with given invalid linkedTransactionId
    Then Receive a response from the /linked-authorization/consent endpoint
    And The /linked-authorization/consent endpoint response should be returned in a timely manner 15000ms
    And The /linked-authorization/consent endpoint response should have status 200
    And The /linked-authorization/consent response should have "content-type": "application/json" header
    And The /linked-authorization/consent endpoint response should match json schema
    And The /linked-authorization/consent response should contain errorCode property equals to "invalid_transaction_id"
