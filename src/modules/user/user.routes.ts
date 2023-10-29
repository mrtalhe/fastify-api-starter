
import {rigsterUserHandler,getAllUsersHandler, loginUserHandler} from "./user.controller";
import { FastifyInstance} from "fastify"


async function userRoutes(server: FastifyInstance) {

  server.post("/register", rigsterUserHandler);
  server.post("/login", loginUserHandler);
  server.get("/", getAllUsersHandler);
}

export default userRoutes;