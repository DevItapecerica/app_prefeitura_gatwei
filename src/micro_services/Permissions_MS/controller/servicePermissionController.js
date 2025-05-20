const Permissions = require("../db/model/permissionModel");
const Role = require("../db/model/rolesModel");

const getServicePermission = async (request, reply) => {
  try {
    let id = request.params.id;

    let permissions = await Permissions.findAll({
      where: {
        service_id: id,
      },
    });
    reply.status(200).send({ permissions });
  } catch (error) {
    throw error;
  }
};

const getAllServicesPermissions = async (request, reply) => {
  try {
    let permissions = await Permissions.findAll();
    reply.status(200).send({ permissions });
  } catch (error) {
    throw error;
  }
};

const createServicePermission = async (request, reply) => {
  try {
    let { service_id } = request.body.service;
    let testRoles = await Permissions.findAll({
      where: {
        service_id: service_id,
      },
    });
    
    if(testRoles.length > 0 ){
      throw {status: 403, message: "Service already has roles"}
    }

    const roles = await Role.findAll();
    for (const role of roles) {
      await Permissions.create({
        service_id: service_id,
        role_id: role.id,
        read: false,
        write: false,
        edit: false,
        del: false,
      });
    }

    reply.status(201).send("Permissões criadas com sucesso");
  } catch (error) {
    throw error;
  }
};

const putServicePermission = async (request, reply) => {
  try {
    let id = request.params.id;
    let { permissions } = request.body;

    // Usando for...of para garantir que todas as permissões sejam processadas sequencialmente
    for (const permission of permissions) {
      await Permissions.update(
        {
          read: permission.read,
          write: permission.write,
          edit: permission.edit,
          del: permission.del,
        },
        {
          where: {
            service_id: id,
            role_id: permission.role_id,
          },
        }
      );
    }

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

const deleteServicePermission = async (request, reply) => {
  try {
    let id = request.params.id;
    await Permissions.destroy({
      where: {
        service_id: id,
      },
    });
    reply.status(204);
  } catch (error) {
    throw error;
  }
};


const deleteRolePermission = async (request, reply) => {
  try {
    let id = request.params.id;
    await Permissions.destroy({
      where: {
        role_id: id,
      },
    });
    reply.status(204);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getServicePermission,
  getAllServicesPermissions,
  createServicePermission,
  putServicePermission,
  deleteServicePermission,
  deleteRolePermission
};
