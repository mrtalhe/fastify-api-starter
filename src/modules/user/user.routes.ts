import { FastifyInstance } from "fastify/types/instance";
import { createUserSchema } from "./user.schema";
import { auth, isAdmin } from "../../middleware/auth";

async function userRoutes(server: FastifyInstance) {
  const { userControlleres } = server.diContainer.cradle;

  server.route({
    method: "POST",
    url: "/create",
    schema: {
      tags: ["user"],
      body: createUserSchema,
    },
    handler: userControlleres.createUser,
  });

  server.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["user"],
    },
    handler: userControlleres.getAllUsersHandler,
  });

  server.route({
    method: "DELETE",
    url: "/delete/:id",
    schema: {
      tags: ["user"],
    },
    handler: userControlleres.deleteUserHandler,
  });
  server.route({
    method: "PUT",
    url: "/update/:id",
    schema: {
      tags: ["user"],
      body: createUserSchema,
    },
    handler: userControlleres.updateUserHandler,
  });
}

export default userRoutes;
