const { checkPermission } = require("../../middleware/checkPermission");
const { verifyToken } = require("../../middleware/auth");
const TOTEN_API = require("../../service/toten_api");
const { pegarSenhas } = require("./toten");

SERVICE_ID = 5

exports.getToten = async (request, reply) => {
  const token = request.headers.authorization.split(" ")[1];
  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, 6, ["admin", "tecnico"]);

    let senhas = await pegarSenhas(user);
    reply.status(200).send({...senhas, ip: request.ip});
  } catch (error) {
    console.log(error);
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar senhas");
  }
};

exports.getTodayToten = async (request, reply) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    let response = await TOTEN_API.get("/today?dpto=2");
    let senhas = response.data;
    console.log(senhas);
    reply.status(200).send(senhas);
  } catch (error) {
    console.log(error);
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar senhas");
  }
};
