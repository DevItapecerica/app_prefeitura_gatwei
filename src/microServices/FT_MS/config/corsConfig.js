const corsConfig = {
    origin: "*",
    allowedHeaders: ["Content-Type", "x-api-key", "x-access-token"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}

module.exports = {corsConfig};