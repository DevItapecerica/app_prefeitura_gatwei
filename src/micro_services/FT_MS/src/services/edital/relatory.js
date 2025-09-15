import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { format } from "@fast-csv/format";
import { pipeline } from "stream/promises";
import { Readable, PassThrough } from "stream";
import { DataFormat } from "./dataRelatoryFormat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, "../../../relatory");
const fileName = "relatorio.csv";
const filePath = path.join(outputDir, fileName);

export async function createRelatory(data) {
  try {
    if (!data)
      throw {
        code: 403,
        ok: false,
        api: "FT_MS",
        message: "Data not passed to generate relatory",
      };

    const { headerBlock, bolsistasRows } = await DataFormat(data);

    await fs.promises.mkdir(outputDir, { recursive: true });

    const writeStream = fs.createWriteStream(filePath);

    // Escrevendo bloco 1 (cabeçalho manual)
    for (const line of headerBlock) {
      writeStream.write(line.join(";") + "\n");
    }

    // Escrevendo bloco 2 (bolsistas via fast-csv)
    const csvStream = format({ delimiter: ";" });
    const pass = new PassThrough();
    csvStream.pipe(pass).pipe(writeStream);

    await pipeline(Readable.from(bolsistasRows), csvStream);

    console.log(`Arquivo CSV gerado com sucesso: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error("Erro ao gerar CSV:", error);
    throw {
      code: error.code,
      message: error.message,
      ok: error.ok,
      api: error.api,
    };
  }
}

export const sendRelatory = async () => {
  if (!fs.existsSync(filePath)) {
    throw { code: 404, ok: false, api: "FT_MS", message: "File not found" };
  }

  const file = fs.createReadStream(filePath);

  const type = "text/csv";

  return { file, type };
};
