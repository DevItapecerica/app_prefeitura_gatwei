const AgendaRouter = (fastify) => {
    fastify.addHook("preHandler", authJWT);

    fastify.route({
        method: "GET",
        url: "/",
        handler: Agenda.getAgenda
    })
}