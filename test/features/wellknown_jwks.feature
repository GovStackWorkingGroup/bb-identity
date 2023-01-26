Feature: Endpoint to retrieve all public keys of the IdP server. Returns the public key set in JWKS format

  Request endpoint: GET /.well-known/jwks.json

  Scenario: Successfully retrieves the IdP server's public keys
    When The request to retrieve all public keys of the IdP server is sent
    Then The operation returns a public key set in JWKS format