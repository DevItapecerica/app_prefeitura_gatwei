// Remove um usuário
exports.remove = async (paramId) => {
  try {
    let response = await user_api.delete(`/user/${paramId}`);
    let result = response;
    return result;
  } catch (error) {
    throw {
      message: error.message || "erro ao buscar o usuário",
      status: error.status,
    };
  }
};
