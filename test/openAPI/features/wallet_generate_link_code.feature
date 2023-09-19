@method=POST @endpoint=/linked-authorization/link-code
Feature: The endpoint to generate link code.

  @smoke @positive
  Scenario: Successfully generates link code smoke type test
    Given Wants to generate link code
    When Send POST /linked-authorization/link-code request with given X-XSRF-TOKEN header, XSRF-TOKEN cookie, transactionId and requestTime
    Then Receive a response from the /linked-authorization/link-code endpoint
    And The /linked-authorization/link-code endpoint response should be returned in a timely manner 15000 ms
    And The /linked-authorization/link-code endpoint response should have status 200
    And The /linked-authorization/link-code response should have "content-type": "application/json" header
    And The /linked-authorization/link-code endpoint response should match json schema
    And The /linked-authorization/link-code response should contain transactionId property equals provided transactionId

  @negative
  Scenario: Not able to generate link code because of a random transaction_id
    Given Wants to generate link code
    When Send POST /linked-authorization/link-code request with given X-XSRF-TOKEN header, XSRF-TOKEN cookie, random transactionId and requestTime
    Then Receive a response from the /linked-authorization/link-code endpoint
    And The /linked-authorization/link-code endpoint response should be returned in a timely manner 15000 ms
    And The /linked-authorization/link-code endpoint response should have status 200
    And The /linked-authorization/link-code response should have "content-type": "application/json" header
    And The /linked-authorization/link-code endpoint response should match json schema with errors
    And The /linked-authorization/link-code response should contain errorCode property equals "invalid_transaction_id"

  @negative
  Scenario: Not able to generate link code because of a blank transaction_id
    Given Wants to generate link code
    When Send POST /linked-authorization/link-code request with given X-XSRF-TOKEN header, XSRF-TOKEN cookie, blank transactionId and requestTime
    Then Receive a response from the /linked-authorization/link-code endpoint
    And The /linked-authorization/link-code endpoint response should be returned in a timely manner 15000 ms
    And The /linked-authorization/link-code endpoint response should have status 200
    And The /linked-authorization/link-code response should have "content-type": "application/json" header
    And The /linked-authorization/link-code endpoint response should match json schema with errors
    And The /linked-authorization/link-code response should contain errorCode property equals "invalid_transaction_id"

  @negative
  Scenario: Not able to generate link code because of reuse of the completed transaction_id
    Given Wants to generate link code
    And The first authorization flow for transactionId ends 
    When Send POST /linked-authorization/link-code request with given X-XSRF-TOKEN header, XSRF-TOKEN cookie, already used completed transactionId and requestTime
    Then Receive a response for completed transactionId from the /linked-authorization/link-code endpoint
    And The /linked-authorization/link-code endpoint response for completed transactionId should have status 200
    And The /linked-authorization/link-code endpoint response for completed transactionId should have "content-type": "application/json" header
    And The /linked-authorization/link-code endpoint response for completed transactionId should match json schema with errors
    And The /linked-authorization/link-code response for completed transactionId should contain errorCode property equals to "invalid_transaction_id"

  @negative
  Scenario: Not able to generate link code because of invalid requestTime
    Given Wants to generate link code
    When Send POST /linked-authorization/link-code request with given X-XSRF-TOKEN header, XSRF-TOKEN cookie, transactionId and invalid requestTime
    Then Receive a response from the /linked-authorization/link-code endpoint
    And The /linked-authorization/link-code endpoint response should be returned in a timely manner 15000 ms
    And The /linked-authorization/link-code endpoint response should have status 200
    And The /linked-authorization/link-code response should have "content-type": "application/json" header
    And The /linked-authorization/link-code endpoint response should match json schema with errors
    And The /linked-authorization/link-code response should contain errorCode property equals "invalid_request"

  @negative
  Scenario: Not able to generate link code because of invalid xsrf token
    Given Wants to generate link code
    When Send POST /linked-authorization/link-code request with given invalid X-XSRF-TOKEN header, invalid XSRF-TOKEN cookie, transactionId and requestTime
    Then Receive a response from the /linked-authorization/link-code endpoint
    And The /linked-authorization/link-code endpoint response should be returned in a timely manner 15000 ms
    And The /linked-authorization/link-code endpoint response should have status 403
