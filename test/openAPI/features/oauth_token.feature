@method=POST @endpoint=/oauth/token
Feature: API to create access token

  @smoke
  Scenario: The user successfully receives the id and access token smoke type test
    Given The user wants to receive the id token and access token
    When The User sends POST request with given "authorization_code" as grantType, "code" as code, "payment-service" as clientId, "urn:ietf:params:oauth:client-assertion-type:jwt-bearer" as clientAssertionType, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." as clientAssertion, "http://example.com" as redirectUri, "payment-service" as iss, "payment-service" as sub, "IDBB server" as aud, 1024 as exp, 1516239022 as iat, "content-type": "application/x-www-form-urlencoded" header
    Then User receives a response from the POST /oauth/token endpoint
    And The POST /oauth/token endpoint response should be returned in a timely manner 15000ms
    And The POST /oauth/token endpoint response should have status 200
    And The POST /oauth/token response should have "content-type": "application/json" header
    And The POST /oauth/token endpoint response should match json schema
    And The POST /oauth/token endpoint response should contain "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" as idToken
    And The POST /oauth/token endpoint response should contain "string.string.string" as accessToken
    And The POST /oauth/token endpoint response should contain "Bearer" as tokenType
    And The POST /oauth/token endpoint response should contain 0 as expiresIn

  @unit @positive
  Scenario Outline: The user successfully receives the id and access token
    Given The user wants to receive the id token and access token
    When The User sends POST request with given "authorization_code" as grantType, "code" as code, "<clientId>" as clientId, "urn:ietf:params:oauth:client-assertion-type:jwt-bearer" as clientAssertionType, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." as clientAssertion, "<redirectUri>" as redirectUri, "<clientId>" as iss, "<clientId>" as sub, "<audience>" as aud, 1024 as exp, 1516239022 as iat, "content-type": "application/x-www-form-urlencoded" header
    Then User receives a response from the POST /oauth/token endpoint
    And The POST /oauth/token endpoint response should be returned in a timely manner 15000ms
    And The POST /oauth/token endpoint response should have status 200
    And The POST /oauth/token response should have "content-type": "application/json" header
    And The POST /oauth/token endpoint response should match json schema
    And The POST /oauth/token endpoint response should contain "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" as idToken
    And The POST /oauth/token endpoint response should contain "string.string.string" as accessToken
    And The POST /oauth/token endpoint response should contain "Bearer" as tokenType
    And The POST /oauth/token endpoint response should contain 0 as expiresIn

    Examples: Valid data
      | clientId           | audience     | redirectUri            |
      | payment-service    | IDBB server1 | http://redirectMe1.com |
      | e-bank-service     | IDBB server2 | http://redirectMe2.com |
      | e-commerce-service | IDBB server3 | http://redirectMe3.com |
      | health-service     | IDBB server4 | http://redirectMe4.com |

  Scenario: The user is not able to receive the ID and access token because of the invalid client_assertion
    When The User sends POST request with given "authorization_code" as grantType, "code" as code, "payment-service" as clientId, "urn:ietf:params:oauth:client-assertion-type:jwt-bearer" as clientAssertionType, "http://example.com" as redirectUri, "content-type": "application/x-www-form-urlencoded" header
    Then User receives a response from the POST /oauth/token endpoint
    And The POST /oauth/token endpoint response should be returned in a timely manner 15000ms
    And The POST /oauth/token endpoint response should have status 400
    And The POST /oauth/token response should have "content-type": "application/json" header
    And The POST /oauth/token endpoint response should match json error schema
    And The POST /oauth/token endpoint response should contain "invalid_assertion" as errorType

  Scenario: The user is not able to receive the ID and access token because of the invalid client_assertion_type
    Given The user wants to receive the id token and access token
    When The User sends POST request with given "authorization_code" as grantType, "code" as code, "payment-service" as clientId, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." as clientAssertion, "http://example.com" as redirectUri, "content-type": "application/x-www-form-urlencoded" header
    Then User receives a response from the POST /oauth/token endpoint
    And The POST /oauth/token endpoint response should be returned in a timely manner 15000ms
    And The POST /oauth/token endpoint response should have status 400
    And The POST /oauth/token response should have "content-type": "application/json" header
    And The POST /oauth/token endpoint response should match json error schema
    And The POST /oauth/token endpoint response should contain "invalid_assertion_type" as errorType

  Scenario: The user is not able to receive the ID and access token because of the invalid redirect_uri
    Given The user wants to receive the id token and access token
    When The User sends POST request with given "authorization_code" as grantType, "code" as code, "payment-service" as clientId, "urn:ietf:params:oauth:client-assertion-type:jwt-bearer" as clientAssertionType, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." as clientAssertion, "content-type": "application/x-www-form-urlencoded" header
    Then User receives a response from the POST /oauth/token endpoint
    And The POST /oauth/token endpoint response should be returned in a timely manner 15000ms
    And The POST /oauth/token endpoint response should have status 400
    And The POST /oauth/token response should have "content-type": "application/json" header
    And The POST /oauth/token endpoint response should match json error schema
    And The POST /oauth/token endpoint response should contain "invalid_redirect_uri" as errorType

  Scenario: The user is not able to receive the ID and access token because of the invalid input
    Given The user wants to receive the id token and access token
    When The User sends POST request with given "" as grantType, "" as code, "" as clientId, "" as clientAssertionType, "" as clientAssertion, "" as redirectUri, "content-type": "application/x-www-form-urlencoded" header
    Then User receives a response from the POST /oauth/token endpoint
    And The POST /oauth/token endpoint response should be returned in a timely manner 15000ms
    And The POST /oauth/token endpoint response should have status 400
    And The POST /oauth/token response should have "content-type": "application/json" header
    And The POST /oauth/token endpoint response should match json error schema
    And The POST /oauth/token endpoint response should contain "invalid_input" as errorType

  Scenario: The user is not able to receive the ID and access token because of the empty payload
    Given The user wants to receive the id token and access token
    When The User sends POST request without a payload
    Then User receives a response from the POST /oauth/token endpoint
    And The POST /oauth/token endpoint response should be returned in a timely manner 15000ms
    And The POST /oauth/token endpoint response should have status 400
    And The POST /oauth/token response should have "content-type": "application/json" header
    And The POST /oauth/token endpoint response should match json error schema
    And The POST /oauth/token endpoint response should contain "invalid_payload" as errorType
