import { FastifyInstance } from "fastify/types/instance";
import { createUserSchema } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  const { userControlleres } = server.diContainer.cradle;

  server.route({
    method: "POST",
    url: "/create",
    schema: { body: createUserSchema },
    handler: userControlleres.createUser,
  });

  server.get("/", userControlleres.getAllUsersHandler);
}

export default userRoutes;
