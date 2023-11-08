import { fastifyPlugin } from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import userRoutes from "../modules/user/user.routes";
import authRoutes from "../modules/auth/auth.route";

export default fastifyPlugin<FastifyPluginAsync>(async (fastify) => {
  fastify.register(userRoutes, { prefix: "users" });
  fastify.register(authRoutes, { prefix: "auth" });
});
