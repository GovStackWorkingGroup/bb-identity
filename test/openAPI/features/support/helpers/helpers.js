module.exports = {
  localhost: 'http://localhost:3333/',
  contentTypeHeader: {
    key: 'content-type',
    value: 'application/json; charset=utf-8',
  },
  contentTypeHeaderJWT: {
    key: 'content-type',
    value: 'application/jwt; charset=utf-8',
  },
  defaultExpectedResponseTime: 15000,
  transactionId: 'transactionId01',
  transactionId_2: 'transactionId02',
  transactionId_03: 'transactionId03',
  transactionId_04: 'transactionId04',
  linkedCode: 'linkedCode01',
  expiredLinkCode: 'expired-link-code-001',
  X_XSRF_TOKEN: {
    key: 'X-XSRF-TOKEN',
    value: 'X-XSRF-TOKEN',
  },
  // value of the XSRF_TOKEN should be the same as value of the X_XSRF_TOKEN
  XSRF_TOKEN: {
    key: 'XSRF-TOKEN',
    value: 'X-XSRF-TOKEN',
  },
  individualId: '05a5eecd-8b70-480d-9662-b2e63e4bafdb',
  // oidc_well_openid_configuration
  wellKnownOpenidConfigurationEndpoint: '.well-known/openid-configuration',
  oidcWellKnownOpenidConfigurationSchema: {
    type: 'object',
    properties: {
      issuer: { type: 'string' },
      authorization_endpoint: { type: 'string' },
      token_endpoint: { type: 'string' },
      userinfo_endpoint: { type: 'string' },
      jwks_uri: { type: 'string' },
      registration_endpoint: { type: 'string' },
      scopes_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      response_types_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      acr_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      userinfo_signing_alg_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      userinfo_encryption_alg_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      userinfo_encryption_enc_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      token_endpoint_auth_methods_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      display_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      claim_types_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      claims_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      claims_locales_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      ui_locales_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      response_modes_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      token_endpoint_auth_signing_alg_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      id_token_signing_alg_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
    },
    required: [
      'issuer',
      'authorization_endpoint',
      'token_endpoint',
      'userinfo_endpoint',
      'jwks_uri',
      'registration_endpoint',
      'scopes_supported',
      'response_types_supported',
    ],
  },
  // oidc_well_known_jwks
  oidcWellKnownJWKSEndpoint: '.well-known/jwks.json',
  oidcWellKnownJWKSResponseSchema: {
    type: 'object',
    properties: {
      keys: {
        type: 'array',
        items: [
          {
            type: 'object',
            properties: {
              kid: { type: 'string' },
              use: {
                type: 'string',
                enum: ['sig'],
              },
              kty: {
                type: 'string',
                enum: ['RSA'],
              },
              e: { type: 'string' },
              n: { type: 'string' },
              'x5t#S256': { type: 'string' },
              x5c: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
              exp: { type: 'string' },
            },
            required: ['kid', 'use', 'kty', 'e', 'n', 'x5t#S256', 'x5c', 'exp'],
          },
        ],
      },
    },
  },
  // client_create
  clientCreateEndpoint: 'client-mgmt/oidc-client',
  // client_update
  clientUpdateEndpoint: 'client-mgmt/oidc-client/{client_id}',
  // oidc_authorize
  oidcAuthorizeEndpoint: 'authorize',
  // wallet_generate_link_code
  walletGenerateLinkCodeEndpoint: 'linked-authorization/link-code',
  walletGenerateLinkCodeResponseSchema: {
    type: 'object',
    properties: {
      responseTime: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          transactionId: { type: 'string' },
          linkCode: { type: 'string' },
          expireDateTime: { type: 'string' },
        },
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            errorCode: {
              type: 'string',
              enum: ['invalid_transaction_id', 'link_code_gen_failed', 'invalid_transaction', 'invalid_request'],
              errorMessage: { type: 'string' },
            },
          },
        },
      },
    },
  },
  // wallet_link_status
  walletLinkStatusEndpoint: 'linked-authorization/link-status',
  walletLinkStatusExpectedResponseTime: 25000,
  walletLiskStatusResponseSchema: {
    type: 'object',
    properties: {
      responseTIme: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          transactionId: { type: 'string' },
          linkStatus: {
            type: 'string',
            enum: ['LINKED'],
          },
          linkedDateTime: { type: 'string' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                errorCode: {
                  type: 'string',
                  enum: ['invalid_transaction_id', 'invalid_link_code', 'response_timeout', 'unknown_error'],
                  errorMessage: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
  // wallet_link_transaction
  walletLinkTransactionEndpoint: 'linked-authorization/link-transaction',
  walletLinkTransactionResponseSchema: {
    type: 'object',
    properties: {
      responseTime: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          linkTransactionId: { type: 'string' },
          clientName: { type: 'string' },
          logoUrl: { type: 'string' },
          authorizeScopes: {
            type: 'array',
            items: { type: 'string' },
          },
          essentialClaims: {
            type: 'array',
            items: { type: 'string' },
          },
          voluntaryClaims: {
            type: 'array',
            items: { type: 'string' },
          },
          authFactors: {
            type: 'array',
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    enum: ['PIN', 'OTP', 'L1-bio-device', 'Wallet'],
                  },
                  count: {
                    type: 'integer',
                  },
                  bioSubTypes: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
                required: ['type'],
              },
            },
          },
        },
        configs: { type: 'object' },
      },
    },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          errorCode: {
            type: 'string',
            enum: ['invalid_link_code', 'invalid_transaction', 'invalid_client_id', 'unknown_error'],
          },
          errorMessage: { type: 'string' },
        },
      },
    },
  },
  // oauth_token
  oauthTokenEndpoint: 'oauth/token',
  oauthTokenResponse: {
    type: 'object',
    properties: {
      id_token: { type: 'string' },
      access_token: { type: 'string' },
      token_type: { type: 'string' },
      expires_in: { type: 'number' },
    },
    required: ['id_token', 'access_token', 'token_type', 'expires_in'],
  },
  oauthTokenErrorResponse: {
    type: 'object',
    properties: {
      error: { type: 'string' },
      error_description: { type: 'string' },
    },
    required: ['error', 'error_description'],
  },
  //wallet_generate_link_auth_code
  walletGenerateLinkAuthCodeEndpoint: 'linked-authorization/link-auth-code',
  walletGenerateLinkAuthCodeResponseSchema: {
    type: 'object',
    properties: {
      responseTime: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          redirectUri: { type: 'string' },
          state: { type: 'string' },
          nonce: { type: 'string' },
        },
        required: ['code', 'redirectUri', 'state', 'nonce'],
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            errorCode: {
              type: 'string',
              enum: [
                'invalid_transaction',
                'invalid_transaction_id',
                'invalid_link_code',
                'response_timeout',
                'unknown_error',
                'invalid_request'
              ],
              errorMessage: { type: 'string' },
            },
          },
        },
      },
    },
  },
  // wallet_linked_authenticate
  walletLinkedAuthenticateEndpoint: 'linked-authorization/authenticate',
  walletLinkedAuthenticateResponseSchema: {
    type: 'object',
    properties: {
      responseTime: { type: 'string' },
      response: {
        type: 'object',
        properties: { linkedTransactionId: { type: 'string' } },
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            errorCode: {
              type: 'string',
              enum: [
                'invalid_transaction_id',
                'invalid_transaction',
                'invalid_identifier',
                'invalid_no_of_challenges',
                'auth_failed',
                'unknown_error',
                'invalid_request'
              ],
            },
            errorMessage: { type: 'string' },
          },
        },
      },
    },
  },
  // wallet_consent
  walletConsentEndpoint: 'linked-authorization/consent',
  walletConsentResponseSchema: {
    type: 'object',
    properties: {
      responseTime: { type: 'string' },
      response: {
        type: 'object',
        properties: { linkedTransactionId: { type: 'string' } },
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            errorCode: {
              type: 'string',
              enum: [
                'invalid_transaction_id',
                'invalid_transaction',
                'invalid_accepted_claim',
                'invalid_permitted_scope',
              ],
            },
            errorMessage: { type: 'string' },
          },
        },
      },
    },
  },
  // wallet_binding
  walletBindingEndpoint: 'wallet-binding',
  walletBindingResponseSchema: {
    type: 'object',
    properties: {
      responseTime: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          walletUserId: { type: 'string' },
          certificate: { type: 'string' },
          expireDateTime: { type: 'string' },
        },
        errors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              errorCode: {
                type: 'string',
                enum: [
                  'unsupported_challenge_format',
                  'key_binding_failed',
                  'invalid_public_key',
                  'invalid_auth_challenge',
                  'duplicate_public_key',
                ],
              },
              errorMessage: { type: 'string' },
            },
          },
        },
      },
    },
    required: ['responseTime'],
  },
  //oidc_userinfo
  oidcUserinfoEndpoint: 'oidc/userinfo',
  oidcUserinfoResponseSchema: {
    type: 'string',
    format: 'jwt',
  },
  //shares
  clientResponseSchema: {
    type: 'object',
    properties: {
      responseTime: { type: 'string' },
      response: {
        type: 'object',
        properties: { clientId: { type: 'string' } },
        errors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              errorCode: {
                type: 'string',
                enum: this.clientCreateErrorCodeEnum,
              },
              errorMessage: { type: 'string' },
            },
            additionalProperties: false,
          },
        },
      },
    },
  },
  clientCreateErrorCodeEnum: [
    'duplicate_client_id',
    'invalid_public_key',
    'invalid_input',
    'invalid_client_id',
    'invalid_client_name',
    'invalid_rp_id',
    'invalid_claim',
    'invalid_acr',
    'invalid_uri',
    'invalid_redirect_uri',
    'invalid_grant_type',
    'invalid_client_auth',
  ],
};
