@method=POST @endpoint=/linked-authorization/authenticate
Feature: The endpoint to check the correctness of the data.

  @smoke @positive
  Scenario: Successfully checks the correctness of the data smoke type test
    Given Wants to check the correctness of the data
    And The link code is generated before POST /linked-authorization/authenticate
    When Send POST /linked-authorization/authenticate request with given requestTime, linkedTransactionId, individualId, "PIN" as authFactorType, "password" as challenge, "alpha-numeric" as format
    Then Receive a response from the /linked-authorization/authenticate endpoint
    And The /linked-authorization/authenticate endpoint response should be returned in a timely manner 15000ms
    And The /linked-authorization/authenticate endpoint response should have status 200
    And The /linked-authorization/authenticate response should have "content-type": "application/json" header
    And The /linked-authorization/authenticate endpoint response linkedTransactionId should be the same as sent in request
    And The /linked-authorization/authenticate endpoint response should match json schema without errors

  @negative
  Scenario: Not able to check the correctness of the data because of reused link code
    Given Wants to check the correctness of the data
    When Try to authenticate reusing link code
    And Receive a response from the /linked-authorization/authenticate endpoint for reused link code
    And The /linked-authorization/authenticate endpoint response for reused link code should be returned in a timely manner 15000ms
    And The /linked-authorization/authenticate endpoint response for reused link code should have status 200
    And The /linked-authorization/authenticate endpoint response for reused link code should have "content-type": "application/json" header
    And The /linked-authorization/authenticate endpoint response for reused link code should match json schema with errors
    And The /linked-authorization/authenticate response for reused link code should contain errorCode property equals to "invalid_transaction_id"

  @negative
  Scenario: Not able to check the correctness of the data because of an invalid linkedTransactionId
    Given Wants to check the correctness of the data
    When Send POST /linked-authorization/authenticate request with given invalid linkedTransactionId
    Then Receive a response from the /linked-authorization/authenticate endpoint
    And The /linked-authorization/authenticate endpoint response should be returned in a timely manner 15000ms
    And The /linked-authorization/authenticate endpoint response should have status 200
    And The /linked-authorization/authenticate response should have "content-type": "application/json" header
    And The /linked-authorization/authenticate endpoint response should match json schema with errors
    And The /linked-authorization/authenticate response should contain errorCode property equals to "invalid_transaction_id"

  @negative
  Scenario: Not able to check the correctness of the data because of an invalid individualId
    Given Wants to check the correctness of the data
    When Send POST /linked-authorization/authenticate request with given invalid individualId
    Then Receive a response from the /linked-authorization/authenticate endpoint
    And The /linked-authorization/authenticate endpoint response should be returned in a timely manner 15000ms
    And The /linked-authorization/authenticate endpoint response should have status 200
    And The /linked-authorization/authenticate response should have "content-type": "application/json" header
    And The /linked-authorization/authenticate endpoint response should match json schema with errors
    And The /linked-authorization/authenticate response should contain errorCode property equals to "invalid_identifier"

  @negative
  Scenario: Not able to check the correctness of the data because of an invalid challengeList
    Given Wants to check the correctness of the data
    When Send POST /linked-authorization/authenticate request with given invalid challengeList
    Then Receive a response from the /linked-authorization/authenticate endpoint
    And The /linked-authorization/authenticate endpoint response should be returned in a timely manner 15000ms
    And The /linked-authorization/authenticate endpoint response should have status 200
    And The /linked-authorization/authenticate response should have "content-type": "application/json" header
    And The /linked-authorization/authenticate endpoint response should match json schema with errors
    And The /linked-authorization/authenticate response should contain errorCode property equals to "invalid_no_of_challenges"

  @negative
  Scenario: Not able to check the correctness of the data because of invalid requestTime
    Given Wants to check the correctness of the data
    And The link code is generated before POST /linked-authorization/authenticate
    When Send POST /linked-authorization/authenticate request with given invalid requestTime, linkedTransactionId, individualId, "PIN" as authFactorType, "password" as challenge, "alpha-numeric" as format
    Then Receive a response from the /linked-authorization/authenticate endpoint
    And The /linked-authorization/authenticate endpoint response should be returned in a timely manner 15000ms
    And The /linked-authorization/authenticate endpoint response should have status 200
    And The /linked-authorization/authenticate response should have "content-type": "application/json" header
    And The /linked-authorization/authenticate endpoint response should match json schema with errors
    And The /linked-authorization/authenticate response should contain errorCode property equals to "invalid_request"

  @negative
  Scenario: Not able to check the correctness of the data because auth failed
    Given Wants to check the correctness of the data
    And The link code is generated before POST /linked-authorization/authenticate
    When Send POST /linked-authorization/authenticate request with given requestTime, linkedTransactionId, individualId, "PIN" as authFactorType, "9999" as invalid challenge, "number" as format
    Then Receive a response from the /linked-authorization/authenticate endpoint
    And The /linked-authorization/authenticate endpoint response should be returned in a timely manner 15000ms
    And The /linked-authorization/authenticate endpoint response should have status 200
    And The /linked-authorization/authenticate response should have "content-type": "application/json" header
    And The /linked-authorization/authenticate endpoint response should match json schema with errors
    And The /linked-authorization/authenticate response should contain errorCode property equals to "auth_failed"
