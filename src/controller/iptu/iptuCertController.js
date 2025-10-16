import IPTU_API from "../../api/iptu_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 7;

export class IptuCertController {
  static async getCertidao(req, res) {
    await verifyPermission(req.user, SERVICE, req.method);

    res.render("certidao");
  }

  static async getCertidaoById(req, res) {
    try {
    await verifyPermission(req.user, SERVICE, req.method);

      const { uuid } = req.params;
      const { data } = await IPTU_API.get(`/cert/${uuid}`);

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

  static async postCertidao(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const { name, archive, municipe_uuid } = req.body;

      const { data } = await IPTU_API.post("/cert", {
        cert: {
          name,
          archive,
          municipe_uuid,
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

  static async deleteCertidao(req, res) {
    try {
      await verifyPermission(req.user, SERVICE, req.method);

      const { uuid } = req.params;
      const { data } = await IPTU_API.delete(`/cert/${uuid}`);

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
