import { FastifyInstance } from "fastify/types/instance";
import { forgetpasswordSchema, loginSchema, registerSchema, resetpasswordSchema } from "./auth.schema";

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

  server.route({
    method: "POST",
    url: "/forgetpassword",
    schema: { body: forgetpasswordSchema },
    handler: authControlleres.forgetPassword,
  });
  server.route({
    method: "PATCH",
    url: "/resetpassword:resettoken",
    schema: { body: resetpasswordSchema },
    handler: authControlleres.resetPassword,
  });
}

export default authRoutes;
