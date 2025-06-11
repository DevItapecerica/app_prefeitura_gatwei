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
        statusCode: 403,
        message: "Data not passed to generate relatory",
      };

    const { headerBlock, bolsistasHeader, bolsistasRows } = await DataFormat(
      data
    );

    await fs.promises.mkdir(outputDir, { recursive: true });

    const writeStream = fs.createWriteStream(filePath);

    // Escrevendo bloco 1 (cabeçalho manual)
    for (const line of headerBlock) {
      writeStream.write(line.join(",") + "\n");
    }

    // Escrevendo bloco 2 (bolsistas via fast-csv)
    const csvStream = format({ headers: bolsistasHeader });
    const pass = new PassThrough();
    csvStream.pipe(pass).pipe(writeStream);

    await pipeline(Readable.from(bolsistasRows), csvStream);

    console.log(`Arquivo CSV gerado com sucesso: ${filePath}`);
    return filePath;
  } catch (err) {
    console.error("Erro ao gerar CSV:", err);
    throw err;
  }
}

export const sendRelatory = async () => {

  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    throw { status: 404, message: "File not found" };
  }

  const file = fs.createReadStream(filePath);

  const type = "text/csv " || "application/octet-stream";

  return { file, type };
};
