const DBUser = require("../../db/model/UserModel");
const { verifyToken } = require("../../middleware/auth");

exports.verifyAuth = async (request, reply) => {
  const token = request.headers.authorization.split(' ')[1];

  try {
    const user = await verifyToken(token);
    const verifyUser = await DBUser.findOne({
      where: {
        id: user.id,
      },
    });
    
    if (!verifyUser) {
      throw { message: "Unauthorized", status: 401 };
    }

    reply.status(200).send({message: 'Usuário authenticado', scopo: verifyUser.role});

  } catch (error) {
    return reply.status(error.status || 500).send({ message: error.message || "Erro interno no servidor", error: error });
  }
};
