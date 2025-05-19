const user_api = require("../../api/user_api");
const permission_api = require("../../api/permissions_api");
const role_api = require("../../api/permissions_api");
const setor_api = require("../../api/setor_api");
const { verifyPermission } = require("../../utils/verifyPermission");

const SERVICE = 1;
const cadastrarUser = async (request, reply) => {
  try {
    let userTarget = request.body.user;

    let response = await permission_api.get("/roles");
    let permissions = response.data;

    const isValid = permissions.roles.some((permission) => {
      return permission.id == userTarget.role_id;
    });

    if (!isValid) {
      throw { status: 403, message: "Role not found" };
    }

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
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);



    let response = await user_api.get(`/user/${id}`);
    let userTarget = response.data;

    reply.status(200).send(userTarget);
  } catch (error) {
    throw error;
  }
};

const getAllUser = async (request, reply) => {
  try {
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);



    let responseUser = await user_api.get(`/user`);
    let responseSetor = await setor_api.get("/setor");
    let responseRole = await role_api.get("/roles");
    let usersTarget = responseUser.data;
    let setores = responseSetor.data;
    let roles = responseRole.data;

    reply.status(200).send({ ...usersTarget, ...setores, ...roles });
  } catch (error) {
    throw error;
  }
};

const atualizarUser = async (request, reply) => {
  try {
    let id = request.params.id;
    let userTarget = request.body.user;
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);



    let response = await permission_api.get("/roles");
    let permissions = response.data;

    const isValid = permissions.roles.some((permission) => {
      return permission.id == userTarget.role_id;
    });

    if (!isValid) {
      throw { status: 403, message: "Role not found" };
    }

    await user_api.put(`/user/${id}`, {
      user: {
        ...userTarget,
      },
    });

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

const deletarUser = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);



    await user_api.delete(`/user/${id}`);

    reply.status(204);
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
