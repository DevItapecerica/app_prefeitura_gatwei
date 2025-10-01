import IPTU_API from "../../api/iptu_api.js";

export class IptuCertController {
  static async getCertidao(req, res) {
    res.render("certidao");
  }

  static async getCertidaoById(req, res) {
    res.render("certidao by id");
  }

  static async postCertidao(req, res) {
    try {
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
}