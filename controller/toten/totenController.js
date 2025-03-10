const { checkPermission } = require("../../middleware/checkPermission");
const { verifyToken } = require("../../middleware/auth");
const TOTEN_API = require("../../service/toten_api");
const { pegarSenhas, pegarSenhasToday } = require("./toten");

SERVICE_ID = 5;

exports.getToten = async (request, reply) => {
  const token = request.headers.authorization.split(" ")[1];
  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, SERVICE_ID, ["admin", "tecnico", "gestor"]);

    let data = await pegarSenhas(user);

    reply.status(200).send({ ...data.senhas, ...data.status, ip: request.ip });
  } catch (error) {
    console.log(error);
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar senhas");
  }
};

exports.getTodayToten = async (request, reply) => {
  const token = request.headers.authorization.split(" ")[1];
  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, SERVICE_ID, ["admin", "tecnico", "gestor", "user"]);

    let senhas = await pegarSenhasToday(user);

    reply.status(200).send({ ...senhas, ip: request.ip });
  } catch (error) {
    console.log(error);
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar senhas");
  }
};

exports.postToten = async (request, reply) => {
  reply.status(200).send(request.body)
}