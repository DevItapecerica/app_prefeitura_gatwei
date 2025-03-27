const Login = require('../controller/Auth/login')
const loginSchema = require('../schema/loginSchema')


const authenticateRouter = (fastify, options) =>{
    fastify.route({
        method: 'POST',
        url: '/login',
        schema: loginSchema,
        handler: Login.login
    })
}

module.exports = authenticateRouter