const setor_api = require('../../service/setor_api');
const {verifyPermission} = require('../../utils/verifyPermission')


const SERVICE = 2

const getSetores = async (request, reply) => {
  try {
    let user = request.user

    let authorized = await verifyPermission(user, SERVICE, request.method) 

    if(!authorized){
      throw { status: 401, message: "You do not have permission to access this resource." }
    }

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

    let authorized = await verifyPermission(user, SERVICE, request.method) 

    if(!authorized){
      throw { status: 401, message: "You do not have permission to access this resource." }
    }

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

    let authorized = await verifyPermission(user, SERVICE, request.method) 

    if(!authorized){
      throw { status: 401, message: "You do not have permission to access this resource." }
    }

    let setor = request.body.setor;
    const response = await setor_api.post('/setor', {setor});

    reply.status(200).send(response.data);
  }
  catch (error) {
    throw error;
  }
}

const  updateSetor = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user

    let authorized = await verifyPermission(user, SERVICE, request.method) 

    if(!authorized){
      throw { status: 401, message: "You do not have permission to access this resource." }
    }

    let setor = request.body.setor;
    const response = await setor_api.put(`/setor/${id}`, {setor});

    reply.status(204);
  } catch (error) {
    throw error;
  }
}

const deleteSetor = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user

    let authorized = await verifyPermission(user, SERVICE, request.method) 

    if(!authorized){
      throw { status: 401, message: "You do not have permission to access this resource." }
    }
    await setor_api.delete(`/setor/${id}`);

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