@method=POST @endpoint=/linked-authorization/link-auth-code
Feature: The endpoint to validates the link-code and its expiry and generates the link auth code.

  @smoke @unit @positive
  Scenario: Successfully validates the link-code and its expiry and generates the link auth code smoke type test
    Given Wants to validate the link-auth-code and generate the auth code
    And The link code, transaction and authenticate is completed before POST /linked-authorization/link-auth-code
    When Send POST /linked-authorization/link-auth-code request with given linkedCode and transactionId and "X-XSRF-TOKEN" header and requestTime
    Then Receive a response from the /linked-authorization/link-auth-code endpoint
    And The /linked-authorization/link-auth-code endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-auth-code endpoint response should have status 200
    And The /linked-authorization/link-auth-code response should have "content-type": "application/json" header
    And The /linked-authorization/link-auth-code endpoint response should match json schema with no errors

  @negative
  Scenario: Not able to validate the link-code and its expiry and generate the link auth code because of invalid linkedCode
    Given Wants to validate the link-auth-code and generate the auth code
    And The link code, transaction and authenticate is completed before POST /linked-authorization/link-auth-code
    When Send POST /linked-authorization/link-auth-code request with given invalid linkedCode and "X-XSRF-TOKEN" header and requestTime
    Then Receive a response from the /linked-authorization/link-auth-code endpoint
    And The /linked-authorization/link-auth-code endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-auth-code endpoint response should have status 200
    And The /linked-authorization/link-auth-code response should have "content-type": "application/json" header
    And The /linked-authorization/link-auth-code endpoint response should match json schema with errors
    And The /linked-authorization/link-auth-code response should contain errorCode property equals to "invalid_link_code"

  @negative
  Scenario: Not able to validate the link-code and its expiry and generate the link auth code because of invalid transactionId
    Given Wants to validate the link-auth-code and generate the auth code
    And The link code, transaction and authenticate is completed before POST /linked-authorization/link-auth-code
    When Send POST /linked-authorization/link-auth-code request with given invalid transactionId and "X-XSRF-TOKEN" header and requestTime
    Then Receive a response from the /linked-authorization/link-auth-code endpoint
    And The /linked-authorization/link-auth-code endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-auth-code endpoint response should have status 200
    And The /linked-authorization/link-auth-code response should have "content-type": "application/json" header
    And The /linked-authorization/link-auth-code endpoint response should match json schema with errors
    And The /linked-authorization/link-auth-code response should contain errorCode property equals to "invalid_transaction_id"

  @negative
  Scenario: Not able to validate the link-code and its expiry and generate the link auth code because of invalid linkedCode and transactionId
    Given Wants to validate the link-auth-code and generate the auth code
    And The link code, transaction and authenticate is completed before POST /linked-authorization/link-auth-code
    When Send POST /linked-authorization/link-auth-code request with given invalid linkedCode and transactionId and "X-XSRF-TOKEN" header and requestTime
    Then Receive a response from the /linked-authorization/link-auth-code endpoint
    And The /linked-authorization/link-auth-code endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-auth-code endpoint response should have status 200
    And The /linked-authorization/link-auth-code response should have "content-type": "application/json" header
    And The /linked-authorization/link-auth-code endpoint response should match json schema with errors
    And The /linked-authorization/link-auth-code response should contain errorCode property equals to "invalid_link_code"

  @negative
  Scenario: Not able to validate the link-code and its expiry and generate the link auth code because of invalid requestTime
    Given Wants to validate the link-auth-code and generate the auth code
    And The link code, transaction and authenticate is completed before POST /linked-authorization/link-auth-code
    When Send POST /linked-authorization/link-auth-code request with given linkedCode and transactionId and "X-XSRF-TOKEN" header and invalid requestTime
    Then Receive a response from the /linked-authorization/link-auth-code endpoint
    And The /linked-authorization/link-auth-code endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-auth-code endpoint response should have status 200
    And The /linked-authorization/link-auth-code response should have "content-type": "application/json" header
    And The /linked-authorization/link-auth-code endpoint response should match json schema with errors
    And The /linked-authorization/link-auth-code response should contain errorCode property equals to "invalid_request"

  @negative
  Scenario: Not able to validate the link-code and its expiry because of transaction and link code are not connected to each other
    Given Wants to validate the link-auth-code and generate the auth code
    And The link code, transaction and authenticate is completed before POST /linked-authorization/link-auth-code
    And The second link code, transaction and authenticate is completed before POST /linked-authorization/link-auth-code
    When Send POST /linked-authorization/link-auth-code request with given valid linkedCode and transactionId and "X-XSRF-TOKEN" header and requestTime
    Then Receive a response from the /linked-authorization/link-auth-code endpoint
    And The /linked-authorization/link-auth-code endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-auth-code endpoint response should have status 200
    And The /linked-authorization/link-auth-code response should have "content-type": "application/json" header
    And The /linked-authorization/link-auth-code endpoint response should match json schema with errors
    And The /linked-authorization/link-auth-code response should contain errorCode property equals to "invalid_link_code"

  @negative
  Scenario: Not able to validate the link-code and its expiry because of reuse of the completed transaction_id
    Given Wants to validate the link-auth-code and generate the auth code
    And The first authorization flow for transactionID ends
    When Send POST /linked-authorization/link-auth-code request with given linkedCode and reused completed transactionId and "X-XSRF-TOKEN" header and requestTime
    Then Receive a response for reuse transactionId from the /linked-authorization/link-auth-code endpoint
    And The /linked-authorization/link-auth-code endpoint response for reuse transactionId should have status 200
    And The /linked-authorization/link-auth-code endpoint response for reuse transactionId should have "content-type": "application/json" header
    And The /linked-authorization/link-auth-code endpoint response for reuse transactionId should match json schema with errors
    And The /linked-authorization/link-auth-code response for reuse transactionId should contain errorCode property equals to "invalid_transaction_id"
