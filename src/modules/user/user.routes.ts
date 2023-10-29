
import UserController from "./user.controller";
import { FastifyInstance} from "fastify"

async function userRoutes(server: FastifyInstance) {

  server.post("/register",UserController.rigsterUserHandler);
  server.post("/login", UserController.loginUserHandler);
  server.get("/", UserController.getAllUsersHandler);
}

export default userRoutes;