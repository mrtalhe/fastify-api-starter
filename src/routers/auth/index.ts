import { FastifyInstance } from "fastify";
import User from "./../../models/user";
import controller from "./controller";

async function authRouter(fastify: FastifyInstance) {

  fastify.post("/register", controller.register);
  fastify.post("/login", controller.login);
}

export default authRouter;
