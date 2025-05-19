const login_api = require("../../api/login_api");

exports.authUser = async (request, reply) => {
  try {
    let token = request.headers.authorization?.replace("Bearer ", "");
    if(!token){
      throw {message: 'Token não informado', status: 401}
    }

    let response = await login_api.post('/authUser', {
      token: token
    })
  
    let user = response.data 
   
    reply.status(200).send(user)
  } catch (error) {
   throw error
  }
};