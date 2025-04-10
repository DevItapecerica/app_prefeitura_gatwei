const service_api = require("../../service/service_api"); 
const roles_api = require("../../service/permissions_api");

const createRole = async (request, reply) =>{
    let {name} = request.body.role;
    const servicesResponse = await service_api.get('/service');
    const services = servicesResponse.data;

    await roles_api.post({
        role: {
            name: name,
        },
        services: services
    })
    console.log(services)
    reply.status(201).send('Created role');
}

module.exports = {
    createRole
}