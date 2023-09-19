@method=GET @endpoint=/oidc/userinfo
Feature: API to receive user information

  @smoke @positive @unit
  Scenario: The user successfully receives user information smoke type test
    Given The user wants to receive user information
    Given The id_token is generated before GET /oidc/userinfo with given "authorization_code" as grantType, "code" as code, "payment-service" as clientId, "urn:ietf:params:oauth:client-assertion-type:jwt-bearer" as clientAssertionType, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." as clientAssertion, "http://example.com" as redirectUri, "payment-service" as iss, "payment-service" as sub, "IDBB server" as aud, 1024 as exp, 1516239022 as iat
    When The User sends GET request to receive user information
    Then User receives a response from the GET /oidc/userinfo endpoint
    And The GET /oidc/userinfo endpoint response should be returned in a timely manner 15000ms
    And The GET /oidc/userinfo endpoint response should have status 200
    And The GET /oidc/userinfo response should have "content-type": "application/jwt" header
    And The GET /oidc/userinfo endpoint response should match json schema
