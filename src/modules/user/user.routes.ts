import { FastifyInstance } from "fastify/types/instance";
import UserController from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {

  server.route({
    method: "POST",
    url: "/register",
    schema: { body: $ref("createUserSchema") },
    handler: UserController.prototype.rigsterUserHandler,
  });
  server.route({
    method: "POST",
    url: "/login",
    schema: { body: $ref("loginSchema") },
    handler: UserController.prototype.loginUserHandler,
  });

  server.get("/", UserController.prototype.getAllUsersHandler);
}

export default userRoutes;


