const Role = require("../controller/Permissions/rolesController");

const roleRouter = (fastify, opt) => {
    fastify.route({
        method: 'POST',
        url: '/roles',
        handler: Role.createRole})
}

module.exports = roleRouter;