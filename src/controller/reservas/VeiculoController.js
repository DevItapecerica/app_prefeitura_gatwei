import RESERVAS_API from "../../api/reservas_api.js";
import { verifyPermission } from "../../utils/verifyPermission.js";

const SERVICE = 9;

export default class VeiculosController {
   static async getVeiculo(req, res) {
      try {
         await verifyPermission(req.user, SERVICE, req.method);

         const query = req.query;
         const { page, limit, search } = query;

         const url = search
            ? `/veiculo?page=${page || 0}&limit=${limit || 10}&search=${search}`
            : `/veiculo?page=${page || 0}&limit=${limit || 10}`;

         const { data } = await RESERVAS_API.get(`${url}`, {
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

   static async createVeiculo(req, res) {
      try {
         await verifyPermission(req.user, SERVICE, req.method);

         const { data } = await RESERVAS_API.post("/veiculo", req.body);
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

   static async updateVeiculo(req, res) {
      try {
         await verifyPermission(req.user, SERVICE, req.method);

         const { uuid } = req.params;
         const { data } = await RESERVAS_API.put(`/veiculo/${uuid}`, req.body);
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

   static async deleteVeiculo(req, res) {
      try {
         await verifyPermission(req.user, SERVICE, req.method);

         const { uuid } = req.params;
         const { data } = await RESERVAS_API.delete(`/veiculo/${uuid}`);
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

   static async getVeiculoById(req, res) {
      try {
         await verifyPermission(req.user, SERVICE, req.method);

         const { uuid } = req.params;
         const { data } = await RESERVAS_API.get(`/veiculo/${uuid}`, {
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
