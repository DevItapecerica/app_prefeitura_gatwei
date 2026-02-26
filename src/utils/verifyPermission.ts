import permissions_api from "../api/permissions_api.js";
import user_api from "../api/user_api.js";
import { ListPermissionsType } from "../types/permissionType.js";

export const verifyPermission = async (user: {id: string, role_id: number, name: string}, service: number, methode: string) => {
  const permissionResponse = await permissions_api.get(`/permission/service/${service}`);
  const permissions: ListPermissionsType = permissionResponse.data.permissions;
  const roles_permission = permissions.find(
    (permission) => permission.role_id == user.role_id
  );

  const responseUser = await user_api.get(`/user/${user.id}`);

  const userData = responseUser.data.user;

  const responseSetorvisibility = await permissions_api.get(
    `/visibility/setor/${userData.setor_id}`
  );

  const visibilities = responseSetorvisibility.data.visibility; 
  const setorServiceVisibility = visibilities.filter(
    (visibility) => visibility.service_id == service
  );

  const isVisible = setorServiceVisibility[0]?.visibility;

  switch (methode) {
    case "GET":
      if (!roles_permission?.read || !isVisible) {
        throw {
          code: 403,
          message: "You don't have the right to read this service",
          ok: false,
          api: "Gatwei",
        };
      }
      break;

    case "POST":
      if (!roles_permission?.write || !isVisible) {
        throw {
          code: 403,
          message: "You don't have the right to write this service",
          ok: false,
          api: "Gatwei",
        };
      }
      break;

    case "PUT":
      if (!roles_permission?.edit || !isVisible) {
        throw {
          code: 403,
          message: "You don't have the right to edit this service",
          api: "Gatwei",
          ok: false,
        };
      }
      break;

    case "DELETE":
      if (!roles_permission?.del || !isVisible) {
        throw {
          code: 403,
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
