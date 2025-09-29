import IPTU_API from "../../api/iptu_api.js";

export class IptuMunicipeController {
  static async getMunicipe(req, res) {
    try {
      const { data } = await IPTU_API.get("/municipe");

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
