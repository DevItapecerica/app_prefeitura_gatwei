const login_api = require("../../service/login_api");

exports.authUser = async (request, reply) => {
  const token = request.headers["authorization"].split(" ")[1];
  try {
    let response = await login_api.post('/authUser', {
      token: token
    })
  
    let user = response.data 
   
    reply.status(200).send(user)
  } catch (error) {
   reply.status(error.status || 500).send(error.response.data || error.message  || 'erro interno no servidor');
  }
};