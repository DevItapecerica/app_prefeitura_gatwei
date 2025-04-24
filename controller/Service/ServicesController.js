const setor_api = require("../../service/setor_api");
const service_api = require("../../service/service_api");
const permissions_api = require("../../service/permissions_api");
const user_api = require("../../service/user_api");
const { verifyPermission } = require("../../utils/verifyPermission");

const SERVICE = 3;

const getAllServices = async (request, reply) => {
  try {
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    const [
      {
        data: { services },
      },
      {
        data: { permissions },
      },
      {
        data: { roles },
      },
      {
        data: { setores },
      },
      {
        data: { visibility },
      },
    ] = await Promise.all([
      service_api.get("/service"),
      permissions_api.get("/permission/service"),
      permissions_api.get(`/roles`),
      setor_api.get("/setor"),
      permissions_api.get(`/visibility`),
    ]);

    let role_id = roles.find((role) => role.id == user.role).id;

    if (!role_id) {
      throw { status: 500, message: "Role not found" };
    }

    services.forEach((service) => {
      service.permission = [];
      service.visibility = [];

      service.permission = [
        ...service.permission,
        ...permissions?.filter(
          (permission) => permission.service_id == service.id
        ),
      ];

      service.visibility = [
        ...service.visibility,
        ...visibility?.filter(
          (visibility) => visibility.service_id == service.id
        ),
      ];
    });

    reply.status(200).send({ services, roles, setores });
  } catch (error) {
    throw error;
  }
};

const getUserServices = async (request, reply) => {
  try {
    const userId = request.user.id;

    let userResponse = await user_api.get(`/user/${userId}`);
    let user = userResponse.data.user;
    // 🚀 Fazendo chamadas paralelas
    const [
      {
        data: { services },
      },
      {
        data: { permissions },
      },
      {
        data: { visibility },
      },
    ] = await Promise.all([
      service_api.get("/service"),
      permissions_api.get("/permission/service"),
      permissions_api.get(`/visibility/setor/${user.setor_id}`),
    ]);

    const roleId = user.role_id;

    if (!roleId) {
      throw { status: 500, message: "Role not found" };
    }

    // 🔍 Filtrando serviços com permissão de leitura
    const roleService = services.filter((service) => {
      const userPermission = permissions.find(
        (permission) =>
          permission.role_id === roleId && permission.service_id === service.id
      );

      return userPermission?.read;
    });

    // 👀 Filtrando visibilidades
    const visibleServiceIds = new Set(
      visibility.filter((v) => v.visibility).map((v) => v.service_id)
    );

    const userServicesVisible = roleService.filter((service) =>
      visibleServiceIds.has(service.id)
    );

    // ✅ Resposta final
    reply.status(200).send({ services: userServicesVisible });
  } catch (error) {
    reply.status(error.status || 500).send({
      message: error.message || "Erro interno ao buscar serviços do usuário.",
    });
  }
};

const getService = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    let response = await service_api.get(`/service/${id}`);
    let services = response.data.service;

    reply.status(200).send({ services });
  } catch (error) {
    throw error;
  }
};

const createService = async (request, reply) => {
  try {
    let service = request.body.service;
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    let response = await service_api.post(`/service`, {
      service,
    });
    let serviceResult = response.data;
    await permissions_api.post(`/permission/service`, {
      service: {
        service_id: serviceResult.service.id,
      },
    });

    let responseSetor = await setor_api.get("/setor");
    let setores = responseSetor.data;

    console.log(setores)

    await permissions_api.post(
      `/visibility/service/${serviceResult.service.id}`,
      {
        setores: setores.setores,
      }
    );

    reply.status(200).send({ ...serviceResult, message: "Tudo okay" });
  } catch (error) {
    throw error;
  }
};

const updateService = async (request, reply) => {
  try {
    try {
      let service = request.body.service;
      let permissions = request.body.service.permission;
      let id = request.params.id;
      let user = request.user;
      let visibility = request.body.service.visibility;

      console.log(visibility)

      await verifyPermission(user, SERVICE, request.method);

      await service_api.put(`/service/${id}`, {
        service: {
          name: service.name,
          description: service.description,
          url: service.url,
        },
      });

      await permissions_api.put(`/visibility/service/${id}`, {
        visibility
      });

      await permissions_api.put(`/permission/service/${id}`, { permissions });
      reply.status(204);
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const deleteService = async (request, reply) => {
  try {
    let id = request.params.id;
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    await service_api.delete(`/service/${id}`);
    await permissions_api.delete(`/permission/service/${id}`);
    await permissions_api.delete(`/visibility/service/${id}`);

    reply.status(204);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
  getUserServices,
};
