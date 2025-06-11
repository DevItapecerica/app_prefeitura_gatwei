// routers
import bolsistaRouter from "./bolsistasRouter.js";
import uploadRouter from "./uploadRouter.js";
import authRouter from "./authRouter.js";
import editalRouter from "./editalRouter.js";
import relatoryRouter from "./relatoryRouter.js";

export default async function router(fastify, opts) {
  await fastify.register(bolsistaRouter, { prefix: "/bolsista" });
  await fastify.register(uploadRouter, { prefix: "/img" });
  await fastify.register(authRouter, { prefix: "/auth" });
  await fastify.register(editalRouter, { prefix: "/edital" });
  await fastify.register(relatoryRouter, { prefix: "/relatory" });
}
