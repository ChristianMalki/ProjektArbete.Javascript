import fp from "fastify-plugin";
import * as controllers from "./controllers.js";
import * as schemas from "./schemas.js";

export async function MovieRoutes(server, options) {
  server.route({
    method: "POST",
    url: "/login",
    schema: schemas.LoginSchema,
    handler: controllers.LoginController,
  });

  server.route({
    method: "POST",
    url: "/register",
    schema: schemas.RegisterSchema,
    handler: controllers.RegisterController,
  });
  server.route({
    method: "POST",
    url: "/movies",
    schema: schemas.AddMovieSchema,
    handler: controllers.AddMovieController,
  });
  server.route({
    method: "PUT",
    url: "/update",
    schema: schemas.UpdateMovieSchema,
    handler: controllers.UpdateMoviesController,
  });
  server.route({
    method: "GET",
    url: "/movies",
    schema: schemas.GetMoviesSchema,
    handler: controllers.GetMoviesController,
  });

  server.route({
    method: "DELETE",
    url: "/movies",
    schema: schemas.DeleteMovieSchema,
    handler: controllers.DeleteMovieController,
  });
}

export default fp(MovieRoutes);
