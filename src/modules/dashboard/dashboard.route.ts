import { FastifyInstance } from "fastify/types/instance";
import { auth, isAdmin } from "../../middleware/auth";

async function dashboardRoutes(server: FastifyInstance) {
  const { dashboardControlleres } = server.diContainer.cradle;
  server.route({
    method: "GET",
    url: "/me",
    handler: dashboardControlleres.userDashboard,
    preHandler: [auth, isAdmin],
  });
}

export default dashboardRoutes;
