import mongoose, { Model } from "mongoose";
import fp from "fastify-plugin";
import Movie from "../Model/Movie.js";
import User from "../Model/User.js";

async function database(server, options) {
  try {
    mongoose.connection.on("connected", () => {
      server.log.info({ actor: "MongoDB" }, "connected!!");
    });

    mongoose.connection.on("disconnected", () => {
      server.log.info({ actor: "MongoDB" }, "disconnected!!");
    });

    await mongoose.connect(
      "mongodb+srv://christianmalki:Hello123@bookdb.f2sjxbh.mongodb.net/?retryWrites=true&w=majority"
    );

    const models = { Movie, User };

    server.addHook("onRequest", async (request, response) => {
      request.db = { models };
    });
  } catch (error) {}
}

export default fp(database);
