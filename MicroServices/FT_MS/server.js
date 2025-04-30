const fatify = require("fastify");
const cors = require("@fastify/cors");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
require('dotenv').config({path: `${__dirname}/config/.env`});
const {errorConfig} = require("./config/errorHanddlerConfig");

const {swaggerConfig, swaggerUiConfig} = require('./config/swaggerConfig');
const { corsConfig } = require("./config/corsConfig");

const ftRoutes = require("./router/ftRouter");

const port = process.env.APPLICATION_PORT || 8001;
const app = fatify();

app.register(cors, corsConfig);

app.register(require('@fastify/multipart'), {
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB limite
  }
});

app.register(fastifySwagger, swaggerConfig(port));
app.register(fastifySwaggerUi, swaggerUiConfig);

// Usando o hook onError para tratamento global de erros
app.setErrorHandler((error, request, reply) => {
  ('----------------------------------------------------------');
  ('Error: ', error);
  ('----------------------------------------------------------');
  errorConfig(error, reply);
});

app.register(ftRoutes);

const start = () => {
  try {
    app.listen({ port, host: "0.0.0.0" });
    console.log(`Server is running on port ${port}`);
  } catch (error) {}
};

start();
