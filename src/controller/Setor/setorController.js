const setor_api = require('../../api/setor_api');
const user_api = require('../../api/user_api');
const services_api = require('../../api/service_api');
const permission_api = require('../../api/permissions_api');
const {verifyPermission} = require('../../utils/verifyPermission')


const SERVICE = 2

const getSetores = async (request, reply) => {
  try {
    let user = request.user

    await verifyPermission(user, SERVICE, request.method) 



    const response = await setor_api.get('/setor');

    let setores = response.data
    reply.status(200).send(setores);
  } catch (error) {
    throw error;
  }
}

const getOneSetor = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user

    await verifyPermission(user, SERVICE, request.method) 



    const response = await setor_api.get(`/setor/${id}`);

    let setor = response.data
    reply.status(200).send(setor);
  } catch (error) {
    throw error;
  }
}

const createSetor = async (request, reply) => {
  try {
    let user = request.user

    await verifyPermission(user, SERVICE, request.method) 

    let setor = request.body.setor;
    const response = await setor_api.post('/setor', {setor});

    let responseServices = await services_api.get('/service');
    let services = responseServices.data.services;

    await permission_api.post(`/visibility/setor/${response.data.setor.id}`, {
      services: services,
    });

    reply.status(200).send(response.data);
  }
  catch (error) {
    throw error;
  }
}

const updateSetor = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user

    await verifyPermission(user, SERVICE, request.method) 



    let setor = request.body.setor;
    await setor_api.put(`/setor/${id}`, {setor});

    reply.status(204);
  } catch (error) {
    throw error;
  }
}

const deleteSetor = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user

    await verifyPermission(user, SERVICE, request.method) 



    if (id === 1){
      throw { status: 400, message: "You cannot delete the default setor." }
    }
    await setor_api.delete(`/setor/${id}`);
    await user_api.delete(`/user/setor/${id}`);
    await permissions_api.delete(`/visibility/setor/${id}`);

    reply.status(204);
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getSetores,
  getOneSetor,
  createSetor,
  updateSetor,
  deleteSetor,

}