import { fastifyPlugin } from "fastify-plugin";
import { Lifetime, asClass, asValue } from "awilix";
import { FastifyPluginAsync } from "fastify";
import { fastifyDiPlugin } from "@inaiat/fastify-di-plugin";
import UserService from "../modules/user/user.service.js";
import UserController from "../modules/user/user.controller.js";
import { FastifyInstance } from "fastify/types/instance.js";
import AuthController from "../modules/auth/auth.controller.js";
declare module "@inaiat/fastify-di-plugin" {
  interface Cradle {
    readonly userServices: UserService;
    readonly userControlleres: UserController;
    readonly authControlleres: AuthController;
    readonly server: FastifyInstance;
  }
}

export default fastifyPlugin<FastifyPluginAsync>(
  async (fastify) => {
    await fastify.register(fastifyDiPlugin, {
      module: {
        userServices: asClass(UserService, { lifetime: Lifetime.SINGLETON }),
        userControlleres: asClass(UserController, {
          lifetime: Lifetime.SINGLETON,
        }),
        authControlleres: asClass(AuthController, {
          lifetime: Lifetime.SINGLETON,
        }),
        server: asValue(fastify), // register FastifyInstance
      },
      injectionMode: "CLASSIC",
    });
  },
  { name: "di.config" }
);
