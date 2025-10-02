import IPTU_API from "../../api/iptu_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 7;

export class IptuMunicipeController {
  static async getMunicipe(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const query = req.query;
      const { page, limit, search } = query;

      const url = search
        ? `/municipe?page=${page || 0}&limit=${limit || 10}&search=${search}`
        : `/municipe?page=${page || 0}&limit=${limit || 10}`;

      const { data } = await IPTU_API.get(`${url}`);

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

  static async createMunicipe(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const { data } = await IPTU_API.post("/municipe", req.body);
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

  static async updateMunicipe(req, res) {
    try {
    await verifyPermission(req.user, SERVICE, req.method);

      const { uuid } = req.params;
      const { data } = await IPTU_API.put(`/municipe/${uuid}`, req.body);
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

  static async deleteMunicipe(req, res) {
    try {
    await verifyPermission(req.user, SERVICE, req.method);

      const { uuid } = req.params;
      const { data } = await IPTU_API.delete(`/municipe/${uuid}`);
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
