import { FastifyPluginAsync } from "fastify";
import fastifyAutoload from "@fastify/autoload";
import { join } from "path";
import routes from "../plugins/routes";
import fastifyHelmet from "@fastify/helmet";
interface User {
  id: number;
  email: string;
  password: string;
  name: string | null;
  isAdmin: boolean;
}
declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}

const pluginLoader: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyAutoload, {
    dir: join(__dirname, "../plugins"),
  });
  // config all routes
  await fastify.register(routes, { prefix: "/api" });
  // add helmet
  await fastify.register(fastifyHelmet)
};

export { pluginLoader };
