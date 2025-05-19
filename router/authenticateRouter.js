const Login = require('../controller/Auth/login')
const loginSchema = require('../src/schema/loginSchema')
const authSchema = require('../src/schema/authSchema')

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
        url: '/',
        schema: authSchema,
        handler: authUser.authUser
    })
}

module.exports = authenticateRouter