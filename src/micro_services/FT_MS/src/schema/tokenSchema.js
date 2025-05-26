import errorSchema from './errorSchema.js';

const tokenSchema = {
  description: 'Get a random token for a user',
  tags: ['auth'],
  summary: 'Get a random token for a user',
  security: [{ APIKey: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' }
      }
    },
    ...errorSchema
  }
};

export default tokenSchema;
