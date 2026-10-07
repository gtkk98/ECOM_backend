import Fastify from "fastify";

const startedAt = Date.now();
const fastify = Fastify()

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status:"ok",
    uptime: Math.floor((Date.now() - startedAt) / 1000),
    timestamp:Date.now()
  });
})

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("Order service is running")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start();