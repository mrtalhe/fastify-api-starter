import { FastifyInstance } from "fastify/types/instance";
import {
  forgetpasswordSchema,
  loginSchema,
  registerSchema,
  resetpasswordSchema,
} from "./auth.schema";
import { auth } from "../../middleware/auth";

async function authRoutes(server: FastifyInstance) {
  const { authControlleres } = server.diContainer.cradle;
  server.route({
    method: "POST",
    url: "/register",
    schema: {
      tags: ["auth"],
      body: registerSchema,
    },
    handler: authControlleres.register,
  });

  server.route({
    method: "POST",
    url: "/login",
    schema: {
      tags: ["auth"],
      body: loginSchema,
    },
    handler: authControlleres.login,
  });

  server.route({
    method: "POST",
    url: "/forgetpassword",
    schema: {
      tags: ["auth"],
      body: forgetpasswordSchema,
    },
    handler: authControlleres.forgetPassword,
  });
  server.route({
    method: "PATCH",
    url: "/resetpassword:resettoken",
    handler: authControlleres.resetPassword,
    schema: {
      querystring: {
        type: "object",
        properties: {
          resetToken: {
            type: "string",
            description: "resetToken for reset password",
          },
        },
      },
      tags: ["auth"],
      body: resetpasswordSchema,
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            hello: { type: "string" },
          },
        },
      },
    },
  });
}

export default authRoutes;
