const Login = require('../controller/Auth/login')
const loginSchema = require('../schema/loginSchema')
const authSchema = require('../schema/authSchema')

const authUser = require('../controller/Auth/authUser')

const authenticateRouter = (fastify, options) =>{
    fastify.route({
        method: 'POST',
        url: '/login',
        schema: loginSchema,
        handler: Login.login
    })

    fastify.route({
        method: 'GET',
        url: '/authuser',
        schema: authSchema,
        handler: authUser.authUser
    })
}

module.exports = authenticateRouter