import fp from "fastify-plugin";
import fastifyRateLimit from "@fastify/rate-limit";

export const rateLimitConfig = fp(async (fastify) => {
  fastify.register(fastifyRateLimit, {
    global: true,
    max: 100,
    timeWindow: "1 minute",
    addHeaders: {
      "x-ratelimit-limit": true,
      "x-ratelimit-remaining": true,
      "retry-after": true,
    },
    keyGenerator: (request) => {
      const ip = request.headers["x-real-ip"];

      if (Array.isArray(ip)) {
        return ip[0];
      }

      return ip ?? request.ip;
    },
    errorResponseBuilder: function (req, context) {
      return {
        statusCode: 429,
        message: `Too many requests. Try again into ${context.after}.`,
        validation: false,
        ok: false,
        api: "Gatwei",
      };
    },
  });
});
