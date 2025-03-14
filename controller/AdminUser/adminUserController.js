const { getAll, getOne, create, update, remove } = require("./adminUser");

const login_api = require('../../service/login_api')

const serviceID = 1;

exports.cadastrarUser = async (request, reply) => {
  const token = request.headers["authorization"].split(" ")[1];
  
  try {

    await login_api.post('/authUser', {
      token: token
    })

    await create(request.body)

    reply.status(200).send('usuário criado com sucesso')
    
  } catch (error) {
    reply.status(error.status || 500).send(error.response?.data || error.message || "Erro ao cadastrar usuário");
  }
};

exports.getOneUser = async (request, reply) => {
  const token = request.headers["authorization"].split(" ")[1];
  
  try {

    await login_api.post('/authUser', {
      token: token
    })

    let user = await getOne(request.params.id)

    reply.status(200).send(user)
    
  } catch (error) {
    reply.status(error.status || 500).send(error.response?.data || error.message || "Erro ao cadastrar usuário");
  }
};

exports.getAllUser = async (request, reply) => {
  try {
    let users = await getAll(request.body)

    reply.status(200).send(users)
    
  } catch (error) {
    reply.status(error.status || 500).send(error.response.data || error.message || "Erro ao cadastrar usuário");
  }
};

exports.atualizarUser = async (request, reply) => {};

exports.deletarUser = async (request, reply) => {
  try {
    await remove(request.params.id)

    reply.status(200).send('Usuário excluido com sucesso')
    
  } catch (error) {
    reply.status(error.status || 500).send(error.response.data || error.message || "Erro ao cadastrar usuário");
  }
};