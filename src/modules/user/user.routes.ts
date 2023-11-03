import { FastifyInstance } from "fastify/types/instance";
import UserController from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  const {userControlleres} = server.diContainer.cradle
  server.route({
    method: "POST",
    url: "/register",
    schema: { body: $ref("createUserSchema") },
    handler: userControlleres.rigsterUserHandler,
  });
  server.route({
    method: "POST",
    url: "/login",
    schema: { body: $ref("loginSchema") },
    handler: userControlleres.loginUserHandler,
  });

  server.get("/", userControlleres.getAllUsersHandler);
}

export default userRoutes;


