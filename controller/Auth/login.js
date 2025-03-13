const login_api = require("../../service/login_api");

exports.login = async (resquest, reply) => {
  const { email, pwd } = resquest.body;
  try {
    const response = await login_api.post("/login", {
      email: email,
      pwd: pwd,
    });
    
    let login = response.data;

    reply.status(200).send(login)
  } catch (error) {
    switch (error.status) {
      case 401:
        reply.code(401).send({ message: "Invalid email or password" });
        break;
      default:
        console.log(error)
        reply.code(error.status || 500).send({ message: "Internal Server Error" });
        break;
    }
  }
};
