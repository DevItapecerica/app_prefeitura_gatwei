const permissions_api = require("../service/permissions_api");

const verifyPermission = async (user, service, methode) => {
  let permissions = await permissions_api.get(`/permission/service/${service}`);

  let roles_permission = permissions.data.permissions.find(
    (permission) => permission.role_id == user.role
  );

  switch (methode) {
    case "GET":
      if (!roles_permission.read) {
        throw {
          status: 401,
          message: "You don't have the right to read this service",
        };
      }
      break;
    case "POST":
      if (!roles_permission.write) {
        throw {
          status: 401,
          message: "You don't have the right to write this service",
        };
      }
      break;

    case "PUT":
      if (!roles_permission.edit) {
        throw {
          status: 401,
          message: "You don't have the right to edit this service",
        };
      }
      break;

    case "DELETE":
      if (!roles_permission.del) {
        throw {
          status: 401,
          message: "You don't have the right to del this service",
        };
      }
      break;

    default:
      return false;
  }
};

module.exports = {
  verifyPermission,
};
