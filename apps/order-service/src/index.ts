import Fastify from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";

const startedAt = Date.now();
const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: Math.floor((Date.now() - startedAt) / 1000),
    timestamp: Date.now(),
  });
});
fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
  return reply.send({
    message: "Order server is authenticated!",
    userId: request.userId,
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("Order service is running");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
