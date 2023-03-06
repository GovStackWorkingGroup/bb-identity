module.exports = {
  localhost: 'http://localhost:3344/',
  status_code_200: 200,
  validTransactionId: 'jskSD23wes324545F',
  request_time: new Date().toISOString(),
  default_response_time: 15000,
  ui_auth_code_endpoint: 'authorization/auth-code',
  ui_auth_code_response_schema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      version: {
        type: 'string',
      },
      responseTime: {
        type: 'string',
      },
      response: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          redirectUri: {
            type: 'string',
          },
          nonce: {
            type: 'string',
          },
          state: {
            type: 'string',
          },
        },
        additionalProperties: false,
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            errorCode: {
              type: 'string',
              enum: ['invalid_request', 'invalid_transaction'],
            },
            errorMessage: {
              type: 'string',
            },
          },
          additionalProperties: false,
        },
      },
    },
    additionalProperties: false,
  },
};
