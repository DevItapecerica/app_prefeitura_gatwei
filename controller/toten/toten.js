const User = require("../../db/model/UserModel");
const TOTEN_API = require("../../service/toten_api");

const pegarSenhas = async (target) => {
  
  let user = await User.findOne({ where: { id: target.id } });
  let response = await TOTEN_API.get(`?dpto=${user.setor_id}`);
  let senhas = response.data;

  return senhas;
};

module.exports = {
  pegarSenhas,
};
