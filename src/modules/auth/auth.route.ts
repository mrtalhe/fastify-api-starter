import { FastifyInstance } from "fastify/types/instance";
import { loginSchema, registerSchema } from "./auth.schema";

async function authRoutes(server: FastifyInstance) {
  const { authControlleres } = server.diContainer.cradle;
  server.route({
    method: "POST",
    url: "/register",
    schema: { body: registerSchema },
    handler: authControlleres.register,
  });
  server.route({
    method: "POST",
    url: "/login",
    schema: { body: loginSchema },
    handler: authControlleres.login,
  });
}

export default authRoutes;
