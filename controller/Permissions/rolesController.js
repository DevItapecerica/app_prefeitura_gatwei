const service_api = require("../../service/service_api"); 

const createRole = async (request, reply) =>{
    let {name} = request.body.role;
    const servicesResponse = await service_api.get('/service');
    const services = servicesResponse.data;
    console.log(services)
    reply.status(200).send({teste: services, name})
}

module.exports = {
    createRole
}