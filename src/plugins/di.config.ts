import { fastifyPlugin } from "fastify-plugin";
import { Lifetime, asClass, asValue } from "awilix";
import { FastifyPluginAsync } from "fastify";
import { fastifyDiPlugin } from "@inaiat/fastify-di-plugin";
import UserService from "../modules/user/user.service.js";
import UserController from "../modules/user/user.controller.js";
import { FastifyInstance } from "fastify/types/instance.js";
import AuthController from "../modules/auth/auth.controller.js";
import { PrismaClient } from "@prisma/client";
import { Env, appConfig } from "../config/app.config.js";
import DashboardController from "../modules/dashboard/dashboard.controller.js";


declare module "@inaiat/fastify-di-plugin" {
  interface Cradle {
    readonly config: Env;
    readonly userServices: UserService;
    readonly userControlleres: UserController;
    readonly authControlleres: AuthController;
    readonly dashboardControlleres: DashboardController;
    readonly prisma: PrismaClient;
    readonly server: FastifyInstance;
  }
}

export default fastifyPlugin<FastifyPluginAsync>(
  async (fastify) => {
    const prisma = new PrismaClient();
    await fastify.register(fastifyDiPlugin, {
      module: {
        userServices: asClass(UserService, { lifetime: Lifetime.SINGLETON }),
        userControlleres: asClass(UserController, {lifetime: Lifetime.SINGLETON,}),
        authControlleres: asClass(AuthController, {lifetime: Lifetime.SINGLETON,}),
        dashboardControlleres: asClass(DashboardController, {lifetime: Lifetime.SINGLETON,}),
        prisma: asValue(prisma), 
        server: asValue(fastify), 
        config: asValue(appConfig()),
      },
      injectionMode: "CLASSIC",
    });
  },
  { name: "di.config" }
);
