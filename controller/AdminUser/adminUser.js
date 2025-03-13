const user_api = require("../../service/user_api");

// Função para criar um usuário
exports.create = async (userTarget) => {
  try {
    let { name, email, ramal, setor_id, role } = userTarget;

    await user_api.post("/user", {
      name: name,
      email: email,
      ramal: ramal,
      setor_id: setor_id,
      role: role,
    });
  } catch (error) {
    throw {
      message:
        error.response.data || error.message || "erro ao criar o usuário",
      status: error.status,
    };
  }
};

// Obtém um único usuário por ID
exports.getOne = async (paramId) => {
  try {
    let response = await user_api.get(`/user/${paramId}`);
    let user = response.data;

    return user;
  } catch (error) {
    throw {
      message:
        error.response.data || error.message || "erro ao buscar o usuário",
      status: error.status,
    };
  }
};

// Obtém todos os usuários
exports.getAll = async () => {
  try {
    let response = await user_api.get(`/user`);
    let users = response.data;

    return users;
  } catch (error) {
    throw {
      message:
        error.response?.data || error.message || "erro ao buscar o usuário",
      status: error.status,
    };
  }
};

// Atualiza um usuário
exports.update = async (userTarget, paramId) => {};

// Remove um usuário
exports.remove = async (paramId) => {
  try {
    let response = await user_api.delete(`/user/delete/${paramId}`);
    let result = response;
    return result;
    
  } catch (error) {
    throw {
      message:
        error.message || "erro ao buscar o usuário",
      status: error.status,
    };
  }
};
