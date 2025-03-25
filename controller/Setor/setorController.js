const setor_api = require('../../service/setor_api');

const getSetores = async (request, reply) => {
  try {
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
    const response = await setor_api.get(`/setor/${id}`);

    let setor = response.data
    reply.status(200).send(setor);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getSetores,
  getOneSetor,
}