const service_api = require("../../service/service_api"); 
const roles_api = require("../../service/permissions_api");

const createRoles = async (request, reply) =>{
    let {name} = request.body.role;
    const servicesResponse = await service_api.get('/service');
    const services = servicesResponse.data;

    await roles_api.post("/roles", {
        role: {
            name: name,
        },
        services: services
    })
    console.log(services)
    reply.status(201).send('Created role');
}

const getRoles = async (request, reply) => {

    const responseRoles = roles_api.get("/roles");
    const roles = responseRoles.data;
    reply.status(200).send(roles);
}

module.exports = {
    createRoles,
    getRoles
}