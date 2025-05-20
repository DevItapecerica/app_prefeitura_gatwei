// const { getAll, getOne, create, update, deleteOne } = require("./service");
const { Op } = require("sequelize");
const DbService = require("../db/model/serviceModel");

const getAll = async () => {
  try {
    let services = await DbService.findAll();

    return services;
  } catch (error) {
    throw error;
  }
};

const getOne = async (id) => {
  try {
    let services = await DbService.findOne({
      where: { id: id },
    });

    return services;
  } catch (error) {
    throw error;
  }
};

const create = async (service) => {
  try {
    let newService = await DbService.create(service);
    console.log(newService)
    return newService;
  } catch (error) {
    throw error;
  }
};

const deleteOne = async (id) => {
  try {
    let service = await DbService.destroy({
      where: { id: id },
    });
    return service;
  } catch (error) {
    throw error;
  }
};

const update = (id, service) => {
  try {
    let serviceUpdate = DbService.update(service, {
      where: { id: id },
    });
    return serviceUpdate;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
