const corsConfig = {
    origin: true, // Specific allowed origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Métodos permitidos
    credentials: true,
}

module.exports = {corsConfig};