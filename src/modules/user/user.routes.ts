import UserController from "./user.controller";
import { FastifyInstance } from "fastify";
import { $ref } from "./user.schema";
import userController from "./user.controller";

async function userRoutes(server: FastifyInstance) {
  server.route({
    method: "POST",
    url: "/register",
    schema: { body: $ref("createUserSchema") },
    handler: userController.rigsterUserHandler,
  });
  server.route({
    method: "POST",
    url: "/login",
    schema: { body: $ref("loginSchema") },
    handler: userController.loginUserHandler,
  });

  server.get("/", UserController.getAllUsersHandler);
}

export default userRoutes;
