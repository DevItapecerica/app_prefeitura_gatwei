const { verifyParam } = require("../../middleware/verifyParam");
const { alterPwd } = require("./alterPwd");

exports.alterPwdController = async (request, reply) => {
    const token = request.headers.authorization.split(' ')[1];
  
  try {
    verifyParam(["email", "oldPass", "newPass"], request.body);
  
    const { email, oldPass, newPass } = request.body;
    const updated = await alterPwd(token, email, oldPass, newPass)
    
    if(updated < 1){
      return reply.status(401).send("Email ou senha incorretos");
    } else {
      return reply.status(200).send("Senha alterada com sucesso");
    }
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao alterar a senha");
  }
};
