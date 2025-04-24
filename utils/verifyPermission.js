const permissions_api = require("../service/permissions_api");
const user_api = require("../service/user_api");

const verifyPermission = async (user, service, methode) => {
  let permissions = await permissions_api.get(`/permission/service/${service}`);

  let roles_permission = permissions.data.permissions.find(
    (permission) => permission.role_id == user.role
  );

  let responseUser = await user_api.get(`/user/${user.id}`);
  let userData = responseUser.data.user;
  let responseSetorvisibility = await permissions_api.get(`/visibility/setor/${userData.setor_id}`);

  let setorServiceVisibility = responseSetorvisibility.data.visibility.filter(visibility => {
    return visibility.service_id == service;
  })

  console.log(setorServiceVisibility[0].visibility);
  console.log(`---------------------------------------------------`);

  switch (methode) {
    case "GET":
      if (!roles_permission.read || !setorServiceVisibility[0].visibility) {
        throw {
          status: 401,
          message: "You don't have the right to read this service",
        };
      }
      break;
    case "POST":
      if (!roles_permission.write || !setorServiceVisibility[0].visibility) {
        throw {
          status: 401,
          message: "You don't have the right to write this service",
        };
      }
      break;

    case "PUT":
      if (!roles_permission.edit || !setorServiceVisibility[0].visibility) {
        throw {
          status: 401,
          message: "You don't have the right to edit this service",
        };
      }
      break;

    case "DELETE":
      if (!roles_permission.del || !setorServiceVisibility[0].visibility) {
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
