import permissions_api from "../api/permissions_api.js";
import user_api from "../api/user_api.js";

export const verifyPermission = async (user, service, methode) => {
  const { data } = await permissions_api.get(`/permission/service/${service}`);
  const roles_permission = data.permissions.find(
    (permission) => permission.role_id == user.role
  );

  const responseUser = await user_api.get(`/user/${user.id}`);

  const userData = responseUser.data.user;

  const responseSetorvisibility = await permissions_api.get(
    `/visibility/setor/${userData.setor_id}`
  );
  const setorServiceVisibility = responseSetorvisibility.data.visibility.filter(
    (visibility) => visibility.service_id == service
  );

  const isVisible = setorServiceVisibility[0]?.visibility;

  switch (methode) {
    case "GET":
      if (!roles_permission?.read || !isVisible) {
        throw {
          code: 401,
          message: "You don't have the right to read this service",
          ok: false,
          api: "Gatwei",
        };
      }
      break;

    case "POST":
      if (!roles_permission?.write || !isVisible) {
        throw {
          code: 401,
          message: "You don't have the right to write this service",
          ok: false,
          api: "Gatwei",
        };
      }
      break;

    case "PUT":
      if (!roles_permission?.edit || !isVisible) {
        throw {
          code: 401,
          message: "You don't have the right to edit this service",
          api: "Gatwei",
          ok: false,
        };
      }
      break;

    case "DELETE":
      if (!roles_permission?.del || !isVisible) {
        throw {
          code: 401,
          message: "You don't have the right to delete this service",
          ok: false,
          api: "Gatwei",
        };
      }
      break;

    default:
      return false;
  }
};
