import * as Edital from "../services/edital/editalOperations.js";

export const getEdital = async (req, res) => {
  try {
    const edital = await Edital.AllEdital();

    return res
      .status(200)
      .send({ message: "Edital selecionados com sucesso", edital });
  } catch (error) {
    console.error("Error fetching edital:", error);
    throw error;
  }
};

export const getEditalById = async (req, res) => {
  try {
    const { id } = req.params;

    const edital = await Edital.EditalById(id);

    return res
      .status(200)
      .send({ message: "Edital selecionados com sucesso", edital });
  } catch (error) {
    console.error("Error fetching edital:", error);
    throw error;
  }
};

export const postEdital = async (req, res) => {
  try {
    const { edital } = req.body;

    const newEdital = await Edital.CreateEdital(edital);

    return res
      .status(201)
      .send({ message: "Edital criado com sucesso", newEdital });
  } catch (error) {
    console.error("Error creating edital:", error);
    throw error;
  }
};
export const updateEdital = async (req, res) => {
  try {
    const { id } = req.params;
    const { edital } = req.body;

    const newEdital = await Edital.UpdateEdital(id, edital);

    return res
      .status(200)
      .send({ message: "Edital criado com sucesso", edital: newEdital });
  } catch (error) {
    throw error;
  }
};

export const deleteEdital = async (req, res) => {
  try {
    const { id } = req.params;

    await Edital.DeleteEdital(id);

    return res.status(201).send({ message: "Edital deletado com sucesso" });
  } catch (error) {
    console.error("Error deleting edital:", error);
    throw error;
  }
};

export const vincularBolsista = async (req, res) => {
  try {
    const { id } = req.params;
    const { bolsista } = req.body;

    await Edital.vincularBolsista(id, bolsista);

    return res
      .status(201)
      .send({ message: "Bolsista vinculado com sucesso" });
      
  } catch (error) {
    console.error("Error vinculando bolsista:", error);

    throw error;
  }
};

export const getAllEditalWithBolsista = async (req, res) => {
  const bolsista_edital = await Edital.getAllWithBolsista()

  res.status(200).send({message: "Todos os editais com bolsistas", bolsista_edital})
}

export const getEditalWithBolsista = async (req, res) => {
  const { id } = req.params;
  const bolsista_edital = await Edital.getWithBolsista(id)

  res.status(200).send({message: "Todos os editais com bolsistas", bolsista_edital})
}



// a serem implementados
export const getEditalByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .status(400)
        .json({ message: "Date query parameter is required" });
    }
    const edital = await Edital.findAll({
      where: {
        data_publicacao: date,
      },
    });
    return res.status(200).json(edital);
  } catch (error) {
    console.error("Error fetching edital by date:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getEditalByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res
        .status(400)
        .json({ message: "Title query parameter is required" });
    }
    const edital = await Edital.findAll({
      where: {
        titulo: {
          [Op.like]: `%${title}%`,
        },
      },
    });
    return res.status(200).json(edital);
  } catch (error) {
    console.error("Error fetching edital by title:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getEditalByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "Start date and end date query parameters are required",
      });
    }
    const edital = await Edital.findAll({
      where: {
        data_publicacao: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });
    return res.status(200).json(edital);
  } catch (error) {
    console.error("Error fetching edital by date range:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getEditalByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const edital = await Edital.findAndCountAll({
      limit: parseInt(limit),
      offset: offset,
    });
    return res.status(200).json({
      total: edital.count,
      pages: Math.ceil(edital.count / limit),
      currentPage: page,
      data: edital.rows,
    });
  } catch (error) {
    console.error("Error fetching edital with pagination:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getEditalBySorting = async (req, res) => {
  try {
    const { sortBy = "data_publicacao", order = "DESC" } = req.query;
    const edital = await Edital.findAll({
      order: [[sortBy, order.toUpperCase()]],
    });
    return res.status(200).json(edital);
  } catch (error) {
    console.error("Error fetching edital with sorting:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
