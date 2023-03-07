module.exports = {
  localhost: 'http://localhost:3344/',
  statusCode200: 200,
  defaultResponseTime: 15000,
  oidcWellKnownOpenidConfigurationEndpoint: '.well-known/openid-configuration',
  oidcWellKnownOpenidConfigurationSchema: {
    type: 'object',
    properties: {
      issuer: {
        type: 'string',
      },
      authorization_endpoint: {
        type: 'string',
      },
      token_endpoint: {
        type: 'string',
      },
      jwks_uri: {
        type: 'string',
      },
      registration_endpoint: {
        type: 'string',
      },
      scopes_supported: {
        type: 'string',
        enum: ['openid'],
      },
      response_types_supported: {
        type: 'string',
        enum: ['code'],
      },
      acr_values_supported: {
        type: 'string',
      },
      userinfo_signing_alg_values_supported: {
        type: 'string',
      },
      userinfo_encryption_alg_values_supported: {
        type: 'string',
      },
      userinfo_encryption_enc_values_supported: {
        type: 'string',
      },
      token_endpoint_auth_methods_supported: {
        type: 'string',
        enum: ['private_key_jwt'],
      },
      display_values_supported: {
        type: 'string',
      },
      claim_types_supported: {
        type: 'string',
        enum: ['normal', 'aggregated', 'distributed'],
      },
      claims_supported: {
        type: 'string',
      },
      claims_locales_supported: {
        type: 'string',
      },
      ui_locales_supported: {
        type: 'string',
      },
    },
    required: [
      'issuer',
      'authorization_endpoint',
      'token_endpoint',
      'jwks_uri',
      'registration_endpoint',
      'scopes_supported',
      'response_types_supported',
    ],
  },
};
