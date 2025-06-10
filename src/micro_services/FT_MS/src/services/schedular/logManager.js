import fs from "fs";
import path from "path";


const logScheduler = (message, location) => {
const logFilePath = path.join(process.cwd(), 'logs', location);

  const logEntry = {
    timestamp: new Date().toISOString(),
    message: message,
  };

  const line = JSON.stringify(logEntry) + "\n";

  fs.appendFile(logFilePath, line, (err) => {
    if (err) console.error("Erro ao escrever log:", err);
  });
};

export default logScheduler;
