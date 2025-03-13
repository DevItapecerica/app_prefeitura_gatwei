const User = require("../controller/AdminUser/adminUserController");
// const Setor = require("../controller/Setor/setorController");
// const services = require("../controller/AdminService/adminServicesController");
// const demandasTi = require("../controller/DemandasTi/demandasTiController");
// const alterPwd = require("../controller/UserSttings/alterPwdController");
const login = require("../controller/Auth/login");
const verifyAuth = require('../controller/Auth/authUser')
const toten = require("../controller/toten/totenController");

const loginSchema = require('../schemas/Auth/loginSchema')
const verifyAuthSchema = require('../schemas/Auth/verifyAuthSchema')
const UserSchema = require('../schemas/User/userSchema')

async function routes(fastify, options) {
  // 📌 Users
  fastify.get("/user", UserSchema.getUserSchema, User.getAllUser);
  fastify.get("/user/:id", UserSchema.getOneUserSchema, User.getOneUser);
  fastify.post("/user", User.cadastrarUser);
  // fastify.put("/user/:id", userSchema.updateUserSchema, User.atualizarUser);
  fastify.delete("/user/:id", UserSchema.deleteUserSchema, User.deletarUser);

  // 📌 Services
  // fastify.get("/allservices", serviceSchema.getServiceSchema, services.getAllServices);
  // fastify.get("/services", serviceSchema.getUserServicesSchema, services.getUserServices);
  // fastify.post("/services", serviceSchema.postServiceSchema, services.createServices);
  // fastify.put("/services/:id", serviceSchema.updateServiceSchema, services.atualizarService);
  // fastify.delete("/services/:id", serviceSchema.deleteServiceSchema, services.deletarService);

  // 📌 Setor
  // fastify.get("/setor", setorSchema.getSetorSchema, Setor.pegarSetor);
  // fastify.post("/setor", setorSchema.postSetorSchema, Setor.cadastrarSetor);
  // fastify.put("/setor/:id", setorSchema.updateSetorSchema, Setor.atualizarSetor);
  // fastify.delete("/setor/:id", setorSchema.deleteSetorSchema, Setor.deletarSetor);

  // 📌 Demandas TI
  // fastify.get("/demandas", demandasSchema.demandasGetSchema, demandasTi.pegarTodasDemandas);
  // fastify.post("/demandas", demandasSchema.demandasPostSchema, demandasTi.cadastrarDemandas);
  // fastify.delete("/demandas/:id", demandasSchema.demandasDeleteSchema, demandasTi.deletarDemandas);
  // fastify.put("/demandas/assumir/:id", demandasSchema.assumirDemandasSchema, demandasTi.assumirDemanda);
  // fastify.get("/demandas/user", demandasSchema.getUserDemandas, demandasTi.pegarUserDemandas);
  // fastify.put("/demandas/user/:id", demandasSchema.updateUserDemandas, demandasTi.atualizarDemandas);
  // fastify.get("/demandas/user/history", demandasTi.historyDemandas);
  // fastify.put("/demandas/finalizar/:id", demandasSchema.finalizarDemandaSchema, demandasTi.finalizarDemanda);

  // 📌 Login
  fastify.post("/login", loginSchema, login.login);

  // 📌 Alterar Senha
  // fastify.post("/changePwd", alterPwdSchema, alterPwd.alterPwdController);

  // Verificar Usuário
  fastify.get("/authUser", verifyAuthSchema, verifyAuth.authUser);


  //toten
  fastify.get('/toten', toten.getToten)
  fastify.get('/toten/today', toten.getTodayToten)
  fastify.post('/toten', toten.postToten)
}

module.exports = routes;
