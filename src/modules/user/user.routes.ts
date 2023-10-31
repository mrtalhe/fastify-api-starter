import UserController from "./user.controller";
import { FastifyInstance } from "fastify";
import { $ref } from "./user.schema";
import userController from "./user.controller";

async function userRoutes(server: FastifyInstance) {
  server.route({
    method: "POST",
    url: "/register",
    schema: { body: $ref("createUserSchema") },
    handler: userController.prototype.rigsterUserHandler,
  });
  server.route({
    method: "POST",
    url: "/login",
    schema: { body: $ref("loginSchema") },
    handler: userController.prototype.loginUserHandler,
  });

  server.get("/", UserController.prototype.getAllUsersHandler);
}

export default userRoutes;