const service_api = require("../../service/service_api"); 
const roles_api = require("../../service/permissions_api");

const createRoles = async (request, reply) =>{
    let {name} = request.body.role;
    const servicesResponse = await service_api.get('/service');
    const services = servicesResponse.data;

    let authorized = await verifyPermission(user, SERVICE, request.method);

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
    let authorized = await verifyPermission(user, SERVICE, request.method);

    const responseRoles = await roles_api.get("/roles");
    const roles = responseRoles.data;
    reply.status(200).send(roles);
}

const updateRoles = async (request, reply) =>{
    let authorized = await verifyPermission(user, SERVICE, request.method);

    let id = request.params.id
    let {name} = request.body.role;
    const servicesResponse = await service_api.get('/service');
    const services = servicesResponse.data;

    await roles_api.put(`/roles/${id}`, {
        role: {
            name: name,
        }
    })
    console.log(services)
    reply.status(201).send('updated role');
}


const deleteRoles = async (request, reply) =>{
    let authorized = await verifyPermission(user, SERVICE, request.method);

    let id = request.params.id

    await roles_api.delete(`/roles/${id}`)
    reply.status(201).send('updated role');
}



module.exports = {
    createRoles,
    getRoles,
    updateRoles,
    deleteRoles
}