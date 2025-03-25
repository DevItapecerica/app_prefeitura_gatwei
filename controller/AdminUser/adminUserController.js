const { getAll, getOne, update, remove } = require("./adminUser");

const user_api = require("../../service/user_api");


exports.cadastrarUser = async (request, reply) => {
  try {
    let user = request.body.user;

    await user_api.post("/user", {
      user: {
        ...user,
      },
    });

    reply.status(200).send('usuário criado com sucesso')
    
  } catch (error) {
    throw error
  }
};

exports.getOneUser = async (request, reply) => {
  try {
    let id = request.params.id
    let response = await user_api.get(`/user/${id}`)
    let user = response.data

    reply.status(200).send(user)
    
  } catch (error) {
    throw error
  }
};

exports.getAllUser = async (request, reply) => {
  try {
    let response = await user_api.get(`/user`)
    let users = response.data

    reply.status(200).send(users)
    
  } catch (error) {
    throw error
  }
};

exports.atualizarUser = async (request, reply) => {
  try {
    let id = request.params.id
    let user = request.body.user;

    await user_api.put(`/user/${id}`, {
      user: {
        ...user,
      },
    });
    reply.status(200).send('usuário atualizado com sucesso')

  } catch (error) {
    throw error
  }
};

exports.deletarUser = async (request, reply) => {
  try {
    let id = request.params.id
    await user_api.delete(`/user/${id}`)

    reply.status(200).send('Usuário excluido com sucesso')
    
  } catch (error) {
    throw error
  }
};