

exports.cadastrarDemandas = async (request, reply) => {
    const token = request.headers.authorization.split(' ')[1];

  try {
    const user = await verifyToken(token);

    await checkPermission(user.id, user.role, SERVICE_ID, [
      "admin",
      "gestor",
      "user",
    ]);

    await verifyParam(
      ["patrimonio", "description", "prioridade"],
      request.body
    );

    let target = request.body;

    let message = await create(target, user.id);

    reply.status(200).send("Demanda cadastrada com sucesso");
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar demandas");
  }
};

//#endregion /demandas

//#region /User
exports.atualizarDemandas = async (request, reply) => {
    const token = request.headers.authorization.split(' ')[1];

  try {
    const user = await verifyToken(token);

    verifyParam(["id"], request.params);
    verifyParam(
      ["patrimonio", "description", "prioridade", "status"],
      request.body
    );
    let target = request.body;
    let id = request.params.id;

    await checkPermission(user.id, user.role, SERVICE_ID, [
      "admin",
      "gestor",
      "tecnico",
      "user",
    ]);

  
    let updated;

    switch (user.role) {
      case "admin":
        updated = await DBDemandas.update(
          {
            user_id: user.id,
            setor_id: user.setor_id,
            patrimonio: target.patrimonio,
            description: target.description,
            prioridade: target.prioridade,
            status: target.status,
          },
          {
            where: { id: id },
          }
        );
        break;
      case "tecnico":
        updated = await DBDemandas.update(
          {
            user_id: user.id,
            prioridade: target.prioridade,
          },
          {
            where: { id: id },
          }
        );
        break;
      case "user":
      case "gestor":
        updated = await DBDemandas.update(
          {
            user_id: user.id,
            description: target.description,
          },
          {
            where: { id: id },
          }
        );
        break;
      default:
        updated = await DBDemandas.update(
          {
            user_id: user.id,
            setor: target.setor,
            description: target.description,
          },
          {
            where: { id: id },
          }
        );
    }

    reply.status(200).send("Demanda atualizada");
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar demandas");
  }
};

exports.historyDemandas = async (request, reply) => {
    const token = request.headers.authorization.split(' ')[1];

  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, SERVICE_ID, [
      "admin",
      "tecnico",
      "user",
      "gestor",
    ]);

    const history = await getHistory(user);

    reply.status(200).send({demandasHistory: history});
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar demandas");
  }
};