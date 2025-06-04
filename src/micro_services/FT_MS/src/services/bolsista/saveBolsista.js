import * as Bolsista from "./bolsistaOperation.js";
import { cpf } from 'cpf-cnpj-validator'; 

const saveBolsista = async (data, id) => {
    let newBolsista = null;
    // Validate CPF
    if (!cpf.isValid(data.cpf)) {
        throw {
            status: 400,
            message: "CPF inválido",
        };
    }

    if(id) {
        newBolsista = await Bolsista.updateBolsista(data, id);
    }
    else {
        newBolsista = await Bolsista.createBolsista(data)
    }

    return newBolsista;
}

export default saveBolsista;