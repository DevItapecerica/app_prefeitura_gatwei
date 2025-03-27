const login_api = require("../../service/login_api");

exports.authUser = async (request, reply) => {
  let token = request.headers.authorization.replace("Bearer ", "");
  try {
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