const user_api = require("../../service/user_api");
const permission_api = require("../../service/permissions_api");
const {verifyPermission} = require('../../utils/verifyPermission')

const SERVICE = 1;
const cadastrarUser = async (request, reply) => {
  try {
    let userTarget = request.body.user;

    let response = await permission_api.get("/roles");
    let permissions = response.data;

    await console.log("permissions: ", permissions);
    await console.log("user: ", userTarget);

    const isValid = permissions.some((permission) => {
      return permission.name === userTarget.role;
    });

    if (!isValid) {
      throw { status: 403, message: "Role not found" };
    }

    console.log("isvalid: ", isValid);
    await user_api.post("/user", {
      user: {
        ...userTarget,
      },
    });

    reply.status(200).send("usuário criado com sucesso");
  } catch (error) {
    throw error;
  }
};

const getOneUser = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user

    let authorized = await verifyPermission(user, SERVICE, request.method) 

    if(!authorized){
      throw { status: 401, message: "You do not have permission to access this resource." }
    }

    let response = await user_api.get(`/user/${id}`);
    let userTarget = response.data;

    reply.status(200).send(userTarget);
  } catch (error) {
    throw error;
  }
};

const getAllUser = async (request, reply) => {
  try {
    let user = request.user

    let authorized = await verifyPermission(user, SERVICE, request.method) 

    if(!authorized){
      throw { status: 401, message: "You do not have permission to access this resource." }
    }

    let response = await user_api.get(`/user`);
    let usersTarget = response.data;

    reply.status(200).send(usersTarget);
  } catch (error) {
    throw error;
  }
};

const atualizarUser = async (request, reply) => {
  try {
    let id = request.params.id;
    let userTarget = request.body.user;
    let user = request.user

    let authorized = await verifyPermission(user, SERVICE, request.method) 

    if(!authorized){
      throw { status: 401, message: "You do not have permission to access this resource." }
    }

    await user_api.put(`/user/${id}`, {
      user: {
        ...userTarget,
      },
    });
    reply.status(200).send("usuário atualizado com sucesso");
  } catch (error) {
    throw error;
  }
};

const deletarUser = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user

    let authorized = await verifyPermission(user, SERVICE, request.method) 

    if(!authorized){
      throw { status: 401, message: "You do not have permission to access this resource." }
    }

    await user_api.delete(`/user/${id}`);

    reply.status(200).send("Usuário excluido com sucesso");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  cadastrarUser,
  getOneUser,
  getAllUser,
  atualizarUser,
  deletarUser,
};
