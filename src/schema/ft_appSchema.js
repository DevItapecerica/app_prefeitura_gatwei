const getTokenSchema = {
  tag: ["FT_APP", "FT_APP_AUTH"],
  security: [{ APIKey: [], JWTToken: [] }],
  description:
    "Get a token for consume FT_APP_API to upload and download image",
  summary: "Get a token for consume FT_APP_API to upload and download image",
  response: {
    200: {
      description: "Token",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
                example: "your token here",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { getTokenSchema };
