import user_api from "../../api/user_api.js";
import permission_api from "../../api/permissions_api.js";
import role_api from "../../api/permissions_api.js";
import setor_api from "../../api/setor_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 1;

export const cadastrarUser = async (request, reply) => {
  try {
    const userTarget = request.body.user;

    const response = await permission_api.get("/roles");
    const permissions = response.data;

    const isValid = permissions.roles.some((permission) => {
      return permission.id == userTarget.role_id;
    });

    if (!isValid) {
      throw { status: 403, message: "Role not found" };
    }

    await user_api.post("/user", { user: { ...userTarget } });

    reply.status(200).send("usuário criado com sucesso");
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const getOneUser = async (request, reply) => {
  try {
    const id = request.params.id;
    const user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    const response = await user_api.get(`/user/${id}`);
    const userTarget = response.data;

    reply.status(200).send(userTarget);
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const getAllUser = async (request, reply) => {
  try {
    const user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    const responseUser = await user_api.get(`/user`);
    const responseSetor = await setor_api.get("/setor");
    const responseRole = await role_api.get("/roles");

    const usersTarget = responseUser.data;
    const setores = responseSetor.data;
    const roles = responseRole.data;

    reply.status(200).send({ ...usersTarget, ...setores, ...roles });
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const atualizarUser = async (request, reply) => {
  try {
    const id = request.params.id;
    const userTarget = request.body.user;
    const user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    const response = await permission_api.get("/roles");
    const permissions = response.data;

    const isValid = permissions.roles.some((permission) => {
      return permission.id == userTarget.role_id;
    });

    if (!isValid) {
      throw { status: 403, message: "Role not found" };
    }

    await user_api.put(`/user/${id}`, { user: { ...userTarget } });

    reply.status(204).send(); // Adicionado .send() para finalizar resposta
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};

export const deletarUser = async (request, reply) => {
  try {
    const id = request.params.id;
    const user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    await user_api.delete(`/user/${id}`);

    reply.status(204).send(); // Adicionado .send() para finalizar resposta
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
    };
  }
};
