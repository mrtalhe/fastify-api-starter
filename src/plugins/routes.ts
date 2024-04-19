import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authRoutes from "../modules/auth/auth.route";
import userRoutes from "../modules/user/user.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.route";
import adminRoutes from "../modules/admin/admin.route";

const routes = async (fastify: FastifyInstance) => {
  await fastify.register(userRoutes, { prefix: "/users" });
  await fastify.register(dashboardRoutes, { prefix: "/dashboard" });
  await fastify.register(authRoutes, { prefix: "/auth" });
  await fastify.register(adminRoutes, { prefix: "/admin" });
};
export default routes;
