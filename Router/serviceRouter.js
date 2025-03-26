const Service = require('../controller/Service/ServicesController')
const serviceSchema = require('../schema/servicesSchema')
const auth = require('../middleware/authJWT')

const serviceRouter = (fastify, options) => {
    fastify.route({
        method: 'GET',
        url: '/service',
        schema: serviceSchema.getServices,
        preHandler: [auth],
        handler: Service.getAllServices
    })

    fastify.route({
        method: 'GET',
        url: '/service/:id',
        schema: serviceSchema.getOneService,
        preHandler: [auth],
        handler: Service.getService
    })


    fastify.route({
        method: 'POST',
        url: '/service',
        schema: serviceSchema.postServices,
        preHandler: [auth],
        handler: Service.createService
    })
}

module.exports = serviceRouter;