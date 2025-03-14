const DBUser = require("../../db/model/UserModel");
const DBPermission = require("../../db/model/PermissionModel");
const DBService = require("../../db/model/ServiceModel");

// Obtem todos os serviços independente do usuário
exports.getAll = async (token) => {
  try {
    const AllServices = await DBService.findAll();
    return AllServices;
  } catch (error) {
    // O erro será tratado pelo hook onError
    throw error; // lançar o erro para que o middleware de erro o capture
or; // Lançar o erro para que o middleware de erro o capture
  }
};

// Obtem todos os serviços do usuário
exports.getOne = async (token) => {
  try {
    // Verifica se o usuário é admin para ignorar a verificação de permissões de visualização
    if (user.role != "admin") {
      const services = await DBService.findAll({
        include: {
          model: DBPermission,
          as: "permission", // Alias definido no relacionamento
          where: { user_Id: user.id, active: true },
          attributes: { exclude: ["id", "user_Id"] },
          include: {
            model: DBService,
            as: "service", // Alias definido no relacionamento
            attributes: { exclude: ["id"] },
          },
        },
      });

      return services;
    } else {
      const services = await DBService.findAll({
        include: {
          model: DBPermission,
          as: "permission", // Alias definido no relacionamento
          attributes: { exclude: ["id", "user_Id"] },
          where: { user_Id: user.id },
        },
      });

      return services;
    }
  } catch (error) {
    // O erro será tratado pelo hook onError
    throw error;; // lançar o erro para que o middleware de erro o capture
or; // Lançar o erro para que o middleware de erro o capture
  }
};

// Cria um novo serviço
exports.create = async (token, service) => {
  try {
    const newService = await DBService.create({
      name: service.name,
      description: service.description,
      url: service.url,
    });

    const users = await DBUser.findAll();

    for (const user of users) {
      await DBPermission.create({
        user_id: user.id,
        service_id: newService.id,
        active: false,
      });
    }
  } catch (error) {
    // O erro será tratado pelo hook onError
    throw error;; // lançar o erro para que o middleware de erro o capture
or; // Lançar o erro para que o middleware de erro o capture
  }
};

// Atualiza um serviço
exports.update = async (token, service, paramId) => {
  try {
    const [updated] = await DBService.update(
      {
        name: service.name,
        description: service.description,
        url: service.url,
      },
      {
        where: {
          id: paramId,
        },
      }
    );

    if (updated < 1) {
      throw { status: 404, message: "Serviço não encontrado" };
    }

    return updated;
  } catch (error) {
    // O erro será tratado pelo hook onError
    throw error;; // lançar o erro para que o middleware de erro o capture
or; // Lançar o erro para que o middleware de erro o capture
  }
};

// Remove um serviço
exports.remove = async (token, paramId) => {
  try {
    const destroy = await DBService.destroy({
      where: {
        id: paramId,
      },
    });

    if (destroy < 1) {
      throw { status: 404, message: "Serviço não encontrado" };
    }

    return destroy;
  } catch (error) {
    // O erro será tratado pelo hook onError
    throw error;; // lançar o erro para que o middleware de erro o capture
or; // Lançar o erro para que o middleware de erro o capture
  }
};
