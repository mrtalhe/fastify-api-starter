import { FastifyInstance } from "fastify/types/instance";
import { createUserSchema } from "./user.schema";
import {auth,isAdmin} from "../../middleware/auth";

async function userRoutes(server: FastifyInstance) {
  const { userControlleres } = server.diContainer.cradle;
  // create user
  server.route({
    method: "POST",
    url: "/create",
    schema: { body: createUserSchema },
    handler: userControlleres.createUser,
  });
  // get all users
  server.route({
    method: "GET",
    url: "/",
    handler: userControlleres.getAllUsersHandler,
    preHandler: [auth,isAdmin]
  });
  // delete user
  server.route({
    method: "DELETE",
    url: "/delete/:id",
    handler: userControlleres.deleteUserHandler,
  });
  // update user
  server.route({
    method: "PUT",
    url: "/update/:id",
    schema: { body: createUserSchema },
    handler: userControlleres.updateUserHandler,
  });

}

export default userRoutes;
