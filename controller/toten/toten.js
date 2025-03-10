const User = require("../../db/model/UserModel");
const TOTEN_API = require("../../service/toten_api");

const pegarSenhas = async (target) => {
  
  let user = await User.findOne({ where: { id: target.id }, atributes: ["setor_id"] });
  let responseSenhas = await TOTEN_API.get(`/today?dpto=${user.setor_id}`);
  let responseStatus = await TOTEN_API.get(`/statsdptotoday?dpto=${user.setor_id}`);
  
  let senhas = responseSenhas.data;
  let status = responseStatus.data;

  return ({senhas, status});
};

const pegarSenhasToday = async (target) => {
  
    let user = await User.findOne({ where: { id: target.id }, atributes: ["setor_id"] });
    let responseSenhas = await TOTEN_API.get(`/today?dpto=${user.setor_id}`);
    let responseStatus = await TOTEN_API.get(`/statsdptotoday?dpto=${user.setor_id}`);

    let senhas = responseSenhas.data;
    let status = responseStatus.data;
  
    return ({senhas, status});

  };
  

module.exports = {
  pegarSenhas,
  pegarSenhasToday,
};
