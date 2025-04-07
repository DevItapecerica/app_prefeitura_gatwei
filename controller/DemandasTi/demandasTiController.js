const { verifyPermission } = require("../../utils/verifyPermission");
const user_api = require("../../service/user_api");
const demandas_api = require("../../service/demandas_api");

const SERVICE = 102;

const getDemandas = async (request, reply) => {
  try {
    let user = request.user;

    console.log("user", user);
    let authorized = await verifyPermission(user, SERVICE, request.method);

    if (!authorized) {
      throw {
        status: 401,
        message: "You do not have permission to access this resource.",
      };
    }
    let demandas;
    let response;

    console.log(user);
    switch (user.role) {
      case "1":
        response = await demandas_api.get(`/demandas`);
        demandas = response.data;
        break;
      case "2":
        response = await demandas_api.get(`/demandas`);
        demandas = response.data;
        break;
      case "3":
        let userResponse = await user_api.get(`/user/${user.id}`);
        let userData = userResponse.data.user;

        let setor = userData.setor_id;
        response = await demandas_api.get(`/demandas/setor/${setor}`);

        demandas = response.data;
      default:
        response = await demandas_api.get(`/demandas/user/${user.id}`);
        demandas = response.data;
        break;
    }

    reply.status(200).send({ demandas });
  } catch (error) {
    throw error;
  }
};
const getOneDemandas = async (request, reply) => {
  try {
    let user = request.user;

    let authorized = await verifyPermission(user, SERVICE, request.method);

    if (!authorized) {
      throw {
        status: 401,
        message: "You do not have permission to access this resource.",
      };
    }
    let id = request.params.id;
    let response = await demandas_api.get(`/demandas/${id}`);
    let demandas = response.data;
    reply.status(200).send({ demandas });
  } catch (error) {
    throw error;
  }
};
const getUserDemandas = async (request, reply) => {
  try {
    let user = request.user;

    console.log("user", user);
    let authorized = await verifyPermission(user, SERVICE, request.method);

    if (!authorized) {
      throw {
        status: 401,
        message: "You do not have permission to access this resource.",
      };
    }

    let response = await demandas_api.get(`/demandas/user/${user.id}`);
    let demandas = response.data;

    reply.status(200).send({ demandas });
  } catch (error) {
    throw error;
  }
};

const getSetorDemandas = async (request, reply) => {
  try {
    let user = request.user;

    console.log("user", user);
    let authorized = await verifyPermission(user, SERVICE, request.method);

    if (!authorized) {
      throw {
        status: 401,
        message: "You do not have permission to access this resource.",
      };
    }

    let userResponse = await user_api.get(`/user/${user.id}`);
    let userData = userResponse.data.user;

    let setor = userData.setor_id;
    let response = await demandas_api.get(`/demandas/setor/${setor}`);
    
    let demandas = response.data;

    reply.status(200).send({ demandas });
  } catch (error) {
    throw error;
  }
};

const getHistoryDemandas = async (request, reply) => {
  let user = request.user;

  let authorized = await verifypermission(user, service, request.method);

  if (!authorized) {
    throw {
      status: 401,
      message: "you do not have permission to access this resource.",
    };
  }
  let { id } = request.user;
  let { setor_id } = request.query;

  let demandas = await demandas_api.getHistoryDemandas(id, setor_id);

  reply.status(200).send({ demandas });
};
const getUserHistoryDemandas = async (request, reply) => {
  let user = request.user;

  let authorized = await verifypermission(user, service, request.method);

  if (!authorized) {
    throw {
      status: 401,
      message: "you do not have permission to access this resource.",
    };
  }
  let id = request.params.id;
  let demandas = await demandas_api.getUserHistoryDemandas(id);

  reply.status(200).send({ demandas });
};
const getSetorHistoryDemandas = async (request, reply) => {
  let user = request.user;

  let authorized = await verifypermission(user, service, request.method);

  if (!authorized) {
    throw {
      status: 401,
      message: "you do not have permission to access this resource.",
    };
  }
  let id = request.params.id;
  let demandas = await demandas_api.getUserHistoryDemandas(id);

  reply.status(200).send({ demandas });
};

const deleteDemandas = async (request, reply) => {
  let user = request.user;

  let authorized = await verifypermission(user, service, request.method);

  if (!authorized) {
    throw {
      status: 401,
      message: "you do not have permission to access this resource.",
    };
  }
  let id = request.params.id;
  let demandas = await demandas_api.deleteDemandas(id);

  reply.status(200).send({ demandas });
};

const updateDemandas = async (request, reply) => {
  let user = request.user;
  let demandaId = request.params.id;

  let authorized = await verifyPermission(user, SERVICE, request.method);

  if (!authorized) {
    throw {
      status: 401,
      message: "you do not have permission to access this resource.",
    };
  }
  let { id } = request.user;
  let demanda = request.body.demanda;

  let userResponse = await user_api.get(`/user/${user.id}`);
  let userData = userResponse.data.user;

  let response = await demandas_api.put(`/demandas/${demandaId}`, {
    demanda,
    user: { ...userData },
  });
  let newDemanda = response.data;

  reply.status(204);
};
const createDemandas = async (request, reply) => {
  let user = request.user;

  let authorized = await verifyPermission(user, SERVICE, request.method);

  if (!authorized) {
    throw {
      status: 401,
      message: "you do not have permission to access this resource.",
    };
  }
  let { id } = request.user;
  let demanda = request.body.demanda;

  let userResponse = await user_api.get(`/user/${user.id}`);
  let userData = userResponse.data.user;

  let response = await demandas_api.post("/demandas", {
    demanda,
    user: { ...userData },
  });
  let newDemanda = response.data;

  reply.status(200).send({ demanda: { ...newDemanda } });
};

const assumeDemandas = async (request, reply) => {
  let user = request.user;

  let authorized = await verifyPermission(user, SERVICE, request.method);

  if (!authorized) {
    throw {
      status: 401,
      message: "you do not have permission to access this resource.",
    };
  }

  //id da demanda
  let id = request.params.id;
  let user_id = user.id;

  await demandas_api.put(`/demandas/${id}/assume`, {
    responsavel: user_id,
  });

  reply.status(204);
};

const finishDemandas = async (request, reply) => {
  let user = request.user;

  let authorized = await verifypermission(user, service, request.method);

  if (!authorized) {
    throw {
      status: 401,
      message: "you do not have permission to access this resource.",
    };
  }
  let id = request.params.id;
  let { setor_id } = request.body;

  let demandas = await demandas_api.finishDemandas(id, setor_id);

  reply.status(200).send({ demandas });
};

module.exports = {
  getDemandas,
  getOneDemandas,
  getUserDemandas,
  getSetorDemandas,

  getHistoryDemandas,
  getUserHistoryDemandas,
  getSetorHistoryDemandas,

  deleteDemandas,
  updateDemandas,
  createDemandas,

  assumeDemandas,
  finishDemandas,
};
