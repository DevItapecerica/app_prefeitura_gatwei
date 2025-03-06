const jwt = require("jsonwebtoken");
require("dotenv").config();

const DBUser = require("../../db/model/UserModel");
const bcrypt = require("bcryptjs"); // Para comparação de senha criptografada

exports.login = async (request, reply) => {
    
  const { email, pwd } = request.body;

  try {
    const user = await DBUser.findOne({ where: { email: email } });

    if (!user) {
      throw { message: "Email ou senha incorretos", status: 401 };
    }

    const validPassword = await bcrypt.compare(pwd, user.password);

    if (!validPassword && pwd != user.password) {
      throw { message: "Email ou senha incorretos", status: 401 };
    }
    
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role, },
      process.env.SECRET_KEY);

    reply.status(200).send({
      firstLogin: user.firstLogin,
      message: "Login bem sucedido",
      name: user.name,
      token: token, 
      ip: request.ip,
      scopo: user.role,
    });
  } catch (error) {
    console.error("Erro ao processar o login:", error);
    return reply.status(error.status || 500).send(error.message || "Erro interno no servidor");
  }
};