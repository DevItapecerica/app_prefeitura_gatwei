import * as BolsistaController from '../controller/FT/FTController.js';
import { getAuth } from '../controller/FT/FTAuth.js';
import { authJWT } from '../middleware/authJWT.js';

import * as BolsistaSchema from '../schema/bolsistaSchema.js';
import * as FtAppSchema from '../api/ft_app_api.js';

const FTRouter = async (fastify, _options) => {
  // Protege todas as rotas do grupo com JWT
  fastify.addHook('preHandler', authJWT);

  fastify.route({
    method: 'GET',
    url: '/bolsista',
    schema: BolsistaSchema.getBolsistaSchema,
    handler: BolsistaController.getBolsistas,
  });

  fastify.route({
    method: 'GET',
    url: '/bolsista/:id',
    schema: BolsistaSchema.getOneBolsistaSchema,
    handler: BolsistaController.getOneBolsistas,
  });

  fastify.route({
    method: 'POST',
    url: '/bolsista',
    schema: BolsistaSchema.createBolsistaSchema,
    handler: BolsistaController.createBolsistas,
  });

  fastify.route({
    method: 'PUT',
    url: '/bolsista/:id',
    schema: BolsistaSchema.updateBolsistaSchema,
    handler: BolsistaController.updateBolsistas,
  });

  fastify.route({
    method: 'DELETE',
    url: '/bolsista/:id',
    schema: BolsistaSchema.deleteBolsistaSchema,
    handler: BolsistaController.deleteBolsistas,
  });

  fastify.route({
    method: 'GET',
    url: '/auth',
    schema: FtAppSchema.getTokenSchema,
    handler: getAuth,
  });
};

export default FTRouter;