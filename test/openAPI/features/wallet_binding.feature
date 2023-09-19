@method=POST @endpoint=/wallet-binding
Feature: The endpoint to validate wallet create wallet user id

  @smoke @unit @positive
  Scenario: Successfully validates the wallet and generates the wallet user id smoke type test
    Given Wants to validate the wallet and generate wallet user id
    When Send POST /wallet-binding request with given "n3fy2qkg9r7h2" as individualId and "OTP" as authFactorType and "encoded-json" as format and "string" as challenge and requestTime and publicKey
    Then Receive a response from the /wallet-binding endpoint
    And The /wallet-binding response should be returned in a timely manner 15000ms
    And The /wallet-binding endpoint response should have status 200
    And The /wallet-binding response should have "content-type": "application/json" header
    And The /wallet-binding endpoint response should match json schema with no errors
    And The /wallet-binding endpoint response should have authFactorType value should be equal to specified enum
    And The /wallet-binding endpoint response should contain a future expireDateTime in ISO 8601 format

  @negative
  Scenario: Not able to generate the wallet binding because of unsupported challenge format
    Given Wants to validate the wallet and generate wallet user id
    When Send POST /wallet-binding request with given invalid format "n3fy2qkg9r7h2" as individualId and "OTP" as authFactorType and "invalid_format" as format and "string" as challenge and requestTime and publicKey
    Then Receive a response from the /wallet-binding endpoint
    And The /wallet-binding response should be returned in a timely manner 15000ms
    And The /wallet-binding endpoint response should have status 200
    And The /wallet-binding response should have "content-type": "application/json" header
    And The /wallet-binding endpoint response should match json schema with errors
    And The /wallet-binding response should contain errorCode property equals to "unsupported_challenge_format"

  @negative
  Scenario: Not able to generate the wallet binding because of invalid public key
    Given Wants to validate the wallet and generate wallet user id
    When Send POST /wallet-binding request with given format "n3fy2qkg9r7h2" as individualId and "OTP" as authFactorType and "encoded-json" as format and "string" as challenge and requestTime and invalid publicKey
    Then Receive a response from the /wallet-binding endpoint
    And The /wallet-binding response should be returned in a timely manner 15000ms
    And The /wallet-binding endpoint response should have status 200
    And The /wallet-binding response should have "content-type": "application/json" header
    And The /wallet-binding endpoint response should match json schema with errors
    And The /wallet-binding response should contain errorCode property equals to "invalid_public_key"

  @negative
  Scenario: Not able to generate the wallet binding because of duplicated public key
    Given Wants to validate the wallet and generate wallet user id
    When Send POST /wallet-binding request with given "n3fy2qkg9r7h2" as individualId and "OTP" as authFactorType and "encoded-json" as format and "string" as challenge and requestTime and duplicated publicKey
    Then Receive a response from the /wallet-binding endpoint
    When Send POST /wallet-binding request with the same public key as in the previous request
    Then Receive a response from the /wallet-binding endpoint
    And The /wallet-binding response should be returned in a timely manner 15000ms
    And The /wallet-binding endpoint response should have status 200
    And The /wallet-binding response should have "content-type": "application/json" header
    And The /wallet-binding endpoint response should match json schema with errors
    And The /wallet-binding response should contain errorCode property equals to "duplicate_public_key"

  @negative
  Scenario: Not able to generate the wallet binding because of invalid auth challenge
    Given Wants to validate the wallet and generate wallet user id
    When Send POST /wallet-binding request with given "n3fy2qkg9r7h2" as individualId and "OTP" as authFactorType and "encoded-json" as format and "" as challenge and requestTime and publicKey
    Then Receive a response from the /wallet-binding endpoint
    And The /wallet-binding response should be returned in a timely manner 15000ms
    And The /wallet-binding endpoint response should have status 200
    And The /wallet-binding response should have "content-type": "application/json" header
    And The /wallet-binding endpoint response should match json schema with errors
    And The /wallet-binding response should contain errorCode property equals to "invalid_auth_challenge"
