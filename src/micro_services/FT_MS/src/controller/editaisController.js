import * as Editais from '../services/editais/editaisOperations.js'

export const getEditais = async (req, res) => {
    try {
        const editais = Editais.AllEditais();

        return res.status(200).send(editais);
    }
    catch (error) {
        console.error("Error fetching editais:", error);
        throw error;
    }
}

export const getEditalById = async (req, res) => {
    try {
        const { id } = req.params;

        const edital = Editais.EditaisById(id);

        return res.status(200).json(edital);
    }
    catch (error) {
        console.error("Error fetching edital:", error);
        throw error;
    }
}
export const postEdital = async (req, res) => {
    try {
        const data = req.body;

        const newEdital = await Editais.CreateEdital(data);

        return res.status(201).json(newEdital);
    }
    catch (error) {
        console.error("Error creating edital:", error);
        throw error;
    }
}
export const updateEdital = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const edital = await Editais.UpdateEdital(id, data);

        return res.status(200).json(edital);
    }
    catch (error) {
        console.error("Error updating edital:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
 
export const deleteEdital = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Editais.DeleteEdital(id);

        return res.status(201).send(response);
    }
    catch (error) {
        console.error("Error deleting edital:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


// a serem implementados
export const getEditaisByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ message: "Date query parameter is required" });
        }
        const editais = await Editais.findAll({
            where: {
                data_publicacao: date
            }
        });
        return res.status(200).json(editais);
    }
    catch (error) {
        console.error("Error fetching editais by date:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getEditaisByTitle = async (req, res) => { 
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: "Title query parameter is required" });
        }
        const editais = await Editais.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${title}%`
                }
            }
        });
        return res.status(200).json(editais);
    }
    catch (error) {
        console.error("Error fetching editais by title:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getEditaisByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Start date and end date query parameters are required" });
        }
        const editais = await Editais.findAll({
            where: {
                data_publicacao: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
        });
        return res.status(200).json(editais);
    }
    catch (error) {
        console.error("Error fetching editais by date range:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getEditaisByPagination = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const editais = await Editais.findAndCountAll({
            limit: parseInt(limit),
            offset: offset
        });
        return res.status(200).json({
            total: editais.count,
            pages: Math.ceil(editais.count / limit),
            currentPage: page,
            data: editais.rows
        });
    }
    catch (error) {
        console.error("Error fetching editais with pagination:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getEditaisBySorting = async (req, res) => {
    try {
        const { sortBy = "data_publicacao", order = "DESC" } = req.query;
        const editais = await Editais.findAll({
            order: [[sortBy, order.toUpperCase()]]
        });
        return res.status(200).json(editais);
    }
    catch (error) {
        console.error("Error fetching editais with sorting:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}