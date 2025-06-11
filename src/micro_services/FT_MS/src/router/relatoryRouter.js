import { getRelatory } from "../controller/relatoryController.js";
import authJWT from "../middleware/authJWT.js";

const relatoryRouter = (fastify, options) => {

  fastify.route({
    method: "GET",
    url: "/:id",
    handler: getRelatory,
  });
};

export default relatoryRouter;
