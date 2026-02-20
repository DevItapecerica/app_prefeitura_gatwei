import RESERVAS_API from "../../api/reservas_api.js.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 10;

export default class AgendamentoController {
  static async getAgenda(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const query = req.query;
      const { page, limit, search } = query;

      const url = search
        ? `/agendamento?page=${page || 0}&limit=${limit || 10}&search=${search}`
        : `/agendamento?page=${page || 0}&limit=${limit || 10}`;

      const { data } = await RESERVAS_API.get(`${url}`, {
        headers: {
          "x-user-id": req.user.id,
        },
      });

      res.send(data);
    } catch (error) {
      console.log(error);
      const response = error.response ? error.response.data : error;
      throw {
        code: error.status || response.code,
        message: response.message,
        ok: false,
        api: response.api,
        validation: response.validation,
      };
    }
  }

  static async postAgenda(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const { data } = await RESERVAS_API.post("/agendamento", req.body, {
        headers: {
          "x-user-id": req.user.id,
        },
      });
      res.send(data);
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
  }

  static async ConfirmarAgendamento(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const { uuid } = req.params;
      const { data } = await RESERVAS_API.put(`/agendamento/${uuid}/confirmar`, req.body, {
        headers: {
          "x-user-id": req.user.id,
        },
      });
      res.send(data);
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
  }

  static async CancelarAgendamento(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const {observacao} = req.body
      const { uuid } = req.params;
      const { data } = await RESERVAS_API.put(
        `/agendamento/${uuid}/cancelar`,
        { observacao: observacao },
        {
          headers: {
            "x-user-id": req.user.id,
          },
        },
      );
      res.send(data);
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
  }

  static async verificarDisponiveis (req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);
      const { data, inicio, fim} = req.query

      const response = await RESERVAS_API.get(`/agendamento/disponiveis?data=${data}&inicio=${inicio}&fim=${fim}`, {
        headers: {
          "x-user-id": req.user.id,
        },
      });
      res.send(response.data);
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
  }

  static async deleteAgendamento(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const { uuid } = req.params;
      const { data } = await RESERVAS_API.delete(`/agendamento/${uuid}`, {
        headers: {
          "x-user-id": req.user.id,
        },
      });
      res.send(data);
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
  }
}
