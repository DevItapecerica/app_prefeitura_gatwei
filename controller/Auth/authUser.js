const login_api = require("../../service/login_api");

exports.authUser = async (request, reply) => {
  let token = request.headers.authorization.replace("Bearer ", "");
  try {
    if(!token){
      let error = new Error('Token não informado')
      error.status = 400
      throw error
    }
    let response = await login_api.post('/authUser', {
      token: token
    })
  
    let user = response.data 
   
    reply.status(200).send(user)
  } catch (error) {
   reply.status(error.status || 500).send(error.response.data || error.message  || 'erro interno no servidor');
  }
};