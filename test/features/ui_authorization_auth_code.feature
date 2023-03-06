@method=POST @endpoint=/authorization/auth-code
Feature: The API sends the accepted consent and permitted scopes and retrieves the authorization code.

  This endpoint is invoked from JS application to send the accepted consent and permitted scopes.

  @smoke @unit @positive
  Scenario: Successfully retrieve the authorization code

    Given The end-user wants to send the accepted consent and permitted scopes via JS application
    When POST request with given current date as requestTime "jskSD23wes324545F" as transactionId "string" as permittedAuthorizeScopes "string" as acceptedClaims is sent
    Then The response is received
    And The response should be returned in a timely manner
    And The response should match json schema
    And The response should contain authorization code
    And The response should have status 200
    And The response header content-type should be "application/json; charset=utf-8"


  @unit @negative
  Scenario: Unable to retrieve the authorization code because of an invalid transactionId parameter

    Given The end-user wants to send the accepted consent and permitted scopes via JS application
    When POST request with given current date as requestTime "<transactionId>" as transactionId "<permittedAuthorizeScopes>" as permittedAuthorizeScopes "<acceptedClaims>" as acceptedClaims is sent
    Then The response is received
    And The response should be returned in a timely manner
    And The response should match json schema
    And The response should have status 200
    And The response header content-type should be "application/json; charset=utf-8"

  Examples: Invalid transactionId
  | transactionId | permittedAuthorizeScopes | acceptedClaims   |
  | aaa-aaa-aaa   | string, string           | string           |
  | invalid&id    | string, string           | string           |
  | $id_invalid-x | string                   | string, string   |
  |               | string                   | string           |


  @unit @negative
  Scenario: Unable to retrieve the authorization code because no parameter was specified

    Given The end-user wants to send the accepted consent and permitted scopes via JS application
    When POST request without payload is sent
    Then The response is received
    And The response should be returned in a timely manner
    And The response should match json schema
    And The response should have status 200
    And The response header content-type should be "application/json; charset=utf-8"
