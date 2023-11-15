import { FastifyInstance } from "fastify/types/instance";
import { createUserSchema } from "./user.schema";
import {auth,isAdmin} from "../../middleware/auth";


async function userRoutes(server: FastifyInstance) {
  const { userControlleres } = server.diContainer.cradle;

  server.route({
    method: "POST",
    url: "/create",
    schema: { body: createUserSchema },
    handler: userControlleres.createUser,
  });

  server.route({
    method: "GET",
    url: "/",
    handler: userControlleres.getAllUsersHandler,
  });

  server.route({
    method: "DELETE",
    url: "/delete/:id",
    handler: userControlleres.deleteUserHandler,
  });
  server.route({
    method: "PUT",
    url: "/update/:id",
    schema: { body: createUserSchema },
    handler: userControlleres.updateUserHandler,
  });

}

export default userRoutes;
