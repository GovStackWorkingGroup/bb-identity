module.exports = {
  localhost: 'http://localhost:3333/',
  statusCode200: 200,
  defaultResponseTime: 15000,
  oidcWellKnownOpenidConfigurationEndpoint: '.well-known/openid-configuration',
  oidcWellKnownOpenidConfigurationSchema: {
    type: 'object',
    properties: {
      issuer: {
        type: "string"
      },
      authorization_endpoint: {
        type: "string"
      },
      token_endpoint: {
        type: "string"
      },
      userinfo_endpoint: {
        type: "string"
      },
      jwks_uri: {
        type: "string"
      },
      registration_endpoint: {
        type: "string"
      },
      scopes_supported: {
        type: "array",
        items: {
          type: "string"
        }
      },
      response_types_supported: {
        type: "array",
        items: {
          type: "string"
        }
      },
      acr_values_supported: {
        type: "array",
        items: {}
      },
      userinfo_signing_alg_values_supported: {
        type: "array",
        items: {}
      },
      userinfo_encryption_alg_values_supported: {
        type: "array",
        items: {}
      },
      userinfo_encryption_enc_values_supported: {
        type: "array",
        items: {}
      },
      token_endpoint_auth_methods_supported: {
        type: "array",
        items: {
          type: "string"
        }
      },
      display_values_supported: {
        type: "array",
        items: {}
      },
      claim_types_supported: {
        type: "array",
        items: {
          type: "string"
        }
      },
      claims_supported: {
        type: "array",
        items: {
          type: "string"
        }
      },
      claims_locales_supported: {
        type: "array",
        items: {
          type: "string"
        }
      },
      ui_locales_supported: {
        type: "array",
        items: {
          type: "string"
        }
      },
      response_modes_supported: {
        type: "array",
        items: {
          type: "string"
        }
      },
      token_endpoint_auth_signing_alg_values_supported: {
        type: "array",
        items: {
          type: "string"
        }
      },
      id_token_signing_alg_values_supported: {
        type: "array",
        items: {
          type: "string"
        }
      }
    },
    required: [
      "issuer",
      "authorization_endpoint",
      "token_endpoint",
      "userinfo_endpoint",
      "jwks_uri",
      "registration_endpoint",
      "scopes_supported",
      "response_types_supported",
      "acr_values_supported",
      "userinfo_signing_alg_values_supported",
      "userinfo_encryption_alg_values_supported",
      "userinfo_encryption_enc_values_supported",
      "token_endpoint_auth_methods_supported",
      "display_values_supported",
      "claim_types_supported",
      "claims_supported",
      "claims_locales_supported",
      "ui_locales_supported",
      "response_modes_supported",
      "token_endpoint_auth_signing_alg_values_supported",
      "id_token_signing_alg_values_supported"
    ]
  },
};
