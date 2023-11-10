import { FastifyInstance } from "fastify/types/instance";
import { createUserSchema } from "./user.schema";
import auth from "../../middleware/auth";

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
    preHandler: auth
  });

}

export default userRoutes;
