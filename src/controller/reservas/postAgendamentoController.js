import RESERVAS_API from "../../api/reservas_api.js";

import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 10;

const postAgendamento = async (request, reply) => {
  try {

    await verifyPermission(req.user, SERVICE, req.method);

    const { data } = await RESERVAS_API.post("/agendamento", request.body, {
      headers: {
        "x-user-id": request.user.id,
      },
    });
    reply.send(data);
  } catch (error) {
    const response = error.response ? error.response.data : error;
    throw {
      code: error.status || response.code,
      message: response.message,
      ok: false,
      api: response.api,
      validation: response.validation,
    };
  }
};


export default postAgendamento;