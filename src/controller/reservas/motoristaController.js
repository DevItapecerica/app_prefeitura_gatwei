import RESERVAS_API from "../../api/reservas_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 10;

export default class MotoristaController {
  static async getMotoristas(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const query = req.query;
      const { page, limit, search } = query;

      const url = search
        ? `/motorista?page=${page || 0}&limit=${limit || 10}&search=${search}`
        : `/motorista?page=${page || 0}&limit=${limit || 10}`;

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

  static async createMotorista(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const { data } = await RESERVAS_API.post("/motorista", req.body);
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

  static getById = async (req, res) => {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const { uuid } = req.params;
      const { data } = await RESERVAS_API.get(`/motorista/${uuid}`, {
        headers: {
          "x-user-id": req.user.id,
        },
      });

      console.log(data);
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
  };

  static async updateMotorista(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const { uuid } = req.params;
      const { data } = await RESERVAS_API.put(`/motorista/${uuid}`, req.body);
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

  static async deleteMotorista (req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const { uuid } = req.params;
      const { data } = await RESERVAS_API.delete(`/motorista/${uuid}`);
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
