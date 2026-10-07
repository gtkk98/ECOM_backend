import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
const startedAt = Date.now();

app.get("/health", (c) => {
  return c.json({
    status:"ok",
    uptime: Math.floor((Date.now() - startedAt) / 1000),
    timestamp:Date.now()
  });
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(`Payment service is running on port 8002`);
      },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

start();