require('dotenv').config({path: `${__dirname}/config/.env`});

const fastify = require("fastify");
const cors = require("@fastify/cors");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const {errorConfig} = require("./config/errorHanddlerConfig");

const {swaggerConfig, swaggerUiConfig} = require('./config/swaggerConfig');
const { corsConfig } = require("./config/corsConfig");

const ftRoutes = require("./router/ftRouter");
const uploadRouter = require("./router/uploadRouter");

const port = process.env.APPLICATION_PORT || 8001;
const app = fastify();

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
app.register(uploadRouter);

const start = async() => {
  try {
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

start();
