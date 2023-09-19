@method=POST @endpoint=/linked-authorization/link-status
Feature: The endpoint to checks the status of link code.

  @smoke @positive
  Scenario: Successfully checks the status of link code smoke type test
    Given Wants to check the status of link code
    And The link code is generated
    When Send POST /linked-authorization/link-status request with given X-XSRF-TOKEN header, transactionId, linkCode and requestTime
    Then Receive a response from the /linked-authorization/link-status endpoint
    And The /linked-authorization/link-status endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-status endpoint response should have status 200
    And The /linked-authorization/link-status endpoint response should have content-type: application/json header
    And The /linked-authorization/link-status endpoint response should match json schema with no errors
    And The /linked-authorization/link-status response should contain transactionId property equals provided transactionId

  @negative
  Scenario: Not able to check the status of link code because of the blank transactionId 
    Given Wants to check the status of link code
    When Send POST /linked-authorization/link-status request with given X-XSRF-TOKEN header, blank transactionId, linkCode and requestTime
    Then Receive a response from the /linked-authorization/link-status endpoint
    And The /linked-authorization/link-status endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-status endpoint response should have status 200
    And The /linked-authorization/link-status endpoint response should have content-type: application/json header
    And The /linked-authorization/link-status endpoint response should match json schema with errors
    And The /linked-authorization/link-status response should contain errorCode property equals to "invalid_transaction_id"

  @negative
  Scenario: Not able to check the status of link code because of the random transactionId
    Given Wants to check the status of link code
    When Send POST /linked-authorization/link-status request with given X-XSRF-TOKEN header, random transactionId, linkCode and requestTime
    Then Receive a response from the /linked-authorization/link-status endpoint
    And The /linked-authorization/link-status endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-status endpoint response should have status 200
    And The /linked-authorization/link-status endpoint response should have content-type: application/json header
    And The /linked-authorization/link-status endpoint response should match json schema with errors
    And The /linked-authorization/link-status response should contain errorCode property equals to "invalid_transaction_id"

  @negative
  Scenario: Not able to check the status of link code because of the completed transactionId
    Given Wants to check the status of link code
    When Send POST /linked-authorization/link-status request with given X-XSRF-TOKEN header, completed transactionId, linkCode and requestTime
    Then Receive a response from the /linked-authorization/link-status endpoint
    And The /linked-authorization/link-status endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-status endpoint response should have status 200
    And The /linked-authorization/link-status endpoint response should have content-type: application/json header
    And The /linked-authorization/link-status endpoint response should match json schema with errors
    And The /linked-authorization/link-status response should contain errorCode property equals to "invalid_transaction_id"

  @negative
  Scenario: Not able to check the status of link code because of the random linkCode
    Given Wants to check the status of link code
    When Send POST /linked-authorization/link-status request with given X-XSRF-TOKEN header, transactionId, random linkCode and requestTime
    Then Receive a response from the /linked-authorization/link-status endpoint
    And The /linked-authorization/link-status endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-status endpoint response should have status 200
    And The /linked-authorization/link-status endpoint response should have content-type: application/json header
    And The /linked-authorization/link-status endpoint response should match json schema with errors
    And The /linked-authorization/link-status response should contain errorCode property equals to "invalid_link_code"
    
  @negative
  Scenario: Not able to check the status of link code because of the blank linkCode
    Given Wants to check the status of link code
    When Send POST /linked-authorization/link-status request with given X-XSRF-TOKEN header, transactionId, blank linkCode and requestTime
    Then Receive a response from the /linked-authorization/link-status endpoint
    And The /linked-authorization/link-status endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-status endpoint response should have status 200
    And The /linked-authorization/link-status endpoint response should have content-type: application/json header
    And The /linked-authorization/link-status endpoint response should match json schema with errors
    And The /linked-authorization/link-status response should contain errorCode property equals to "invalid_link_code"

  @negative
  Scenario: Not able to check the status of link code because of the linkCode connected to a different transactionId
    Given Wants to check the status of link code
    And The link code is generated
    And The second link code for diffrent transaction id is generated
    When Send POST /linked-authorization/link-status request with given X-XSRF-TOKEN header, transactionId, linkCode connected to a different transactionId and requestTime
    Then Receive a response from the /linked-authorization/link-status endpoint
    And The /linked-authorization/link-status endpoint response should be returned in a timely manner 25000 ms
    And The /linked-authorization/link-status endpoint response should have status 200
    And The /linked-authorization/link-status endpoint response should have content-type: application/json header
    And The /linked-authorization/link-status endpoint response should match json schema with errors
    And The /linked-authorization/link-status response should contain errorCode property equals to "invalid_link_code"
