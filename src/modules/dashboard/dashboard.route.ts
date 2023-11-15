import { FastifyInstance } from "fastify/types/instance";
import { auth } from "../../middleware/auth";
import { updateProfileSchema } from "./dashboard.schema";

async function dashboardRoutes(server: FastifyInstance) {
  const { dashboardControlleres } = server.diContainer.cradle;
  server.addHook("preHandler", (request, reply, done) => {
    auth(request, reply, done);
  });
  server.route({
    method: "GET",
    url: "/profile",
    handler: dashboardControlleres.profile,
  });
  server.route({
    method: "PUT",
    url: "/updateprofile",
    schema: { body: updateProfileSchema },
    handler: dashboardControlleres.updateProfile,
  });
}

export default dashboardRoutes;
