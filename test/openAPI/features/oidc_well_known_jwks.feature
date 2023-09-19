@method=GET @endpoint=/.well-known/jwks.json
Feature: Endpoint to retrieve all the public keys of the IDBB server

  @smoke @unit @positive
  Scenario: Successfully retrieves the IDBB server's public keys
    Given Wants to retrieve the IDBB server's public keys
    When GET request to retrieve all the public keys of the IDBB server is sent
    Then The response from /.well-known/jwks.json endpoint is received
    And The response from /.well-known/jwks.json should be returned in a timely manner 15000ms
    And The response from /.well-known/jwks.json should have status 200
    And The response from /.well-known/jwks.json response should have "content-type": "application/json" header
    And The response from /.well-known/jwks.json should match json schema
    And The combination of kid and kty is distinct for each element in the returned array
