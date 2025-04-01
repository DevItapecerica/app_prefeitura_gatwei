const permissions_api = require("../service/permissions_api");

const verifyPermission = async (user, service, methode) => {
  let roles = await permissions_api.get("/roles");
  let permissions = await permissions_api.get(`/permission/service/${service}`);

  const role_id = roles.data.find((role) => role.name == user.role).id;

  let roles_permission = permissions.data.find(
    (permission) => permission.role_id === role_id
  );

  switch (methode) {
    case "GET":
      return roles_permission.read;
    case "POST":
      return roles_permission.write;
    case "PUT":
      return roles_permission.edit;
    case "DELETE":
      return roles_permission.del;
    default:
      return false;
  }
};

module.exports = {
  verifyPermission,
};
