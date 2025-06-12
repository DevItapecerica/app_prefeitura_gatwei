import { getWithBolsista } from "../services/edital/editalOperations.js";
import { createRelatory, sendRelatory } from "../services/edital/relatory.js";

export const getRelatory = async (req, res) => {
  try {
    const { id } = req.params;
    const editalData = await getWithBolsista(id);

    if (!editalData) {
      throw { statusCode: 403, message: "not data found to this edital" };
    }

    await createRelatory(editalData);

    let archive = await sendRelatory();

    return res.status(200).type(archive.type).send(archive.file);
  } catch (error) {
    throw error;
  }
};
