import IPTU_API from "../../api/iptu_api.js";

export class IptuMunicipeController {
  static async getMunicipe(req, res) {
    try {
      const query = req.query
      const {page, limit, search} = query

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
}
