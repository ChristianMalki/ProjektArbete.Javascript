import fastify from "fastify";
import database from "./utils/db.js";
import MovieRoutes from "./routes.js";

const server = fastify({ logger: true });

async function start() {
  try {
    await server.register(database);

    await server.register(MovieRoutes);

    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server is running!!!!!!!!");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
