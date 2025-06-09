import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), 'logs', 'scheduler.log');

const logScheduler = (id, message, dayWithoutError, users, error) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    id: id,
    message: message,
    dayWithoutError: dayWithoutError,
    users: users || null,
    error: error || null
  };

  const line = JSON.stringify(logEntry) + "\n";

  fs.appendFile(logFilePath, line, (err) => {
    if (err) console.error("Erro ao escrever log:", err);
  });
};

export default logScheduler;
