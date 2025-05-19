const Role = require("../db/model/rolesModel");
const Permissions = require("../db/model/permissionModel");

// CREATE: Criar um novo role
const createRole = async (request, reply) => {
  try {
    const { name } = request.body.role;
    const { services } = request.body;
    console.log(services);
    const role = await Role.create({ name });

    services.forEach(async (service) => {
      await Permissions.create({
        service_id: service.id,
        role_id: role.id,
        read: false,
        write: false,
        edit: false,
        del: false,
      });
    });

    reply.status(201).send({ message: "Role created successfully", role });
  } catch (error) {
    throw error;
  }
};

// READ: Obter todos os roles
const getRoles = async (request, reply) => {
  try {
    const roles = await Role.findAll();


    reply.status(200).send({ roles });
  } catch (error) {
    throw error;
  }
};

// READ: Obter role por ID
const getRoleById = async (request, reply) => {
  try {
    const { id } = request.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return reply.status(404).send({ error: "Role not found" });
    }

    reply.status(200).send({ role });
  } catch (error) {
    throw error;
  }
};

// UPDATE: Atualizar role
const updateRole = async (request, reply) => {
  try {
    const { id } = request.params;
    const { name } = request.body.role;

    const role = await Role.findByPk(id);

    if (!role) {
      return reply.status(404).send({ error: "Role not found" });
    }

    await role.update({
      name: name,
    });

    reply.status(200).send({ message: "Role updated successfully", role });
  } catch (error) {
    throw error;
  }
};

// DELETE: Deletar role
const deleteRole = async (request, reply) => {
  try {
    const { id } = request.params;

    const role = await Role.destroy({
      where: {
        id: id,
      },
    });

    const permissions = await Permissions.findAll({
      where: {
        role_id: id,
      },
    });

    permissions.forEach(async (permission) => {
      Permissions.destroy({
        where: {
          id: permission.id,
        },
      });
    });

    if (!role) {
      return reply.status(404).send({ error: "Role not found" });
    }

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
