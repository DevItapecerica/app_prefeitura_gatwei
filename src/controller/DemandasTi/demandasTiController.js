import { verifyPermission } from "../../utils/verifyPermission.js";
import user_api from "../../api/user_api.js";
import setor_api from "../../api/setor_api.js";
import demandas_api from "../../api/demandas_api.js";

const SERVICE = 5;

const getDemandas = async (request, reply) => {
  try {
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    let demandas = null;
    let response = null;

    const setorResponse = await setor_api.get("/setor");
    const setores = setorResponse.data;

    switch (user.role) {
      case "1":
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
        break;
      default:
        response = await demandas_api.get(`/demandas/user/${user.id}`);
        demandas = response.data;
        break;
    }

    reply.status(200).send({ ...demandas, ...setores });
  } catch (error) {
    throw error;
  }
};

const getOneDemandas = async (request, reply) => {
  try {
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    let id = request.params.id;
    let response = await demandas_api.get(`/demandas/${id}`);
    let demandas = response.data;
    reply.status(200).send({ ...demandas });
  } catch (error) {
    throw error;
  }
};

const getUserDemandas = async (request, reply) => {
  try {
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    const setorResponse = await setor_api.get("/setor");
    const setores = setorResponse.data;
    let response = await demandas_api.get(`/demandas/user/${user.id}`);
    let demandas = response.data;

    reply.status(200).send({ ...demandas, ...setores });
  } catch (error) {
    throw error;
  }
};

const getHistoryDemandas = async (request, reply) => {
  try {
    let user = request.user;

    await verifyPermission(user, SERVICE, request.method);

    let demandas;
    let response;

    const setorResponse = await setor_api.get("/setor");
    const setores = setorResponse.data;

    switch (user.role) {
      case "1":
      case "2":
        response = await demandas_api.get(`/demandas/history`);
        demandas = response.data;
        break;
      case "3":
        let userResponse = await user_api.get(`/user/${user.id}`);
        let userData = userResponse.data.user;

        let setor = userData.setor_id;
        response = await demandas_api.get(`/demandas/history/setor/${setor}`);

        demandas = response.data;
        break;
      default:
        response = await demandas_api.get(`/demandas/history/user/${user.id}`);
        demandas = response.data;
        break;
    }

    reply.status(200).send({ ...demandas, ...setores });
  } catch (error) {
    throw error;
  }
};

const deleteDemandas = async (request, reply) => {
  let user = request.user;

  await verifyPermission(user, SERVICE, request.method);

  let id = request.params.id;
  let demandas = await demandas_api.deleteDemandas(id);

  reply.status(200).send({ demandas });
};

const updateDemandas = async (request, reply) => {
  let user = request.user;
  let demandaId = request.params.id;

  await verifyPermission(user, SERVICE, request.method);

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

  await verifyPermission(user, SERVICE, request.method);

  let demanda = request.body.demanda;

  let {data} = await user_api.get(`/user/${user.id}`);
  let userData = data.user;
  console.log("---------------------------------------------")
  console.log("---------------------------------------------")
  console.log(demanda)
  console.log("---------------------------------------------")
  console.log("---------------------------------------------")

  let response = await demandas_api.post("/demandas", {
    demanda,
    user: { ...userData },
  });

  let newDemanda = response.data;

  reply.status(200).send({ demanda: { ...newDemanda } });
};

const assumeDemandas = async (request, reply) => {
  let user = request.user;

  await verifyPermission(user, SERVICE, request.method);

  // id da demanda
  let id = request.params.id;
  let user_id = user.id;

  await demandas_api.put(`/demandas/${id}/assume`, {
    responsavel: user_id,
  });

  reply.status(204);
};

const finishDemandas = async (request, reply) => {
  let user = request.user;

  await verifyPermission(user, SERVICE, request.method);

  let id = request.params.id;

  let demandas = await demandas_api.put(`/demandas/${id}/finish`, {
    user: user.id,
  });

  reply.status(204);
};

export {
  getDemandas,
  getOneDemandas,
  getUserDemandas,
  getHistoryDemandas,
  deleteDemandas,
  updateDemandas,
  createDemandas,
  assumeDemandas,
  finishDemandas,
};
