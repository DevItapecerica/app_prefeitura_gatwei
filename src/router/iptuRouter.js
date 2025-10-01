import { IptuCertController } from "../controller/iptu/iptuCertController.js";
import { IptuMunicipeController } from "../controller/iptu/iptuMunicipeControlelr.js";
import { authJWT } from "../middleware/authJWT.js";

const iptuRouter = (fastify, opt) => {
  fastify.addHook("preHandler", authJWT);

  fastify.route({
    method: "GET",
    url: "/cert",
    handler: IptuCertController.getCertidao,
  });

  fastify.route({
    method: "GET",
    url: "/cert/:id",
    handler: IptuCertController.getCertidaoById,
  });

  fastify.route({
    method: "POST",
    url: "/cert",
    handler: IptuCertController.postCertidao,
  });

  // fastify.route({
  //     method: "DELETE",
  //     url: "/cert/:id",
  //     handler: IptuCertController.deleteCertidao,
  // });

  // fastify.update({
  //     method: "PUT",
  //     url: "/cert/:id",
  //     handler: IptuCertController.updateCertidao,
  // });

  fastify.route({
    method: "GET",
    url: "/municipe",
    handler: IptuMunicipeController.getMunicipe,
  });

  fastify.route({
    method: "POST",
    url: "/municipe",
    handler: IptuMunicipeController.getMunicipe,
  });
};

export default iptuRouter;
