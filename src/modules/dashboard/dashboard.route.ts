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
    schema: {
      tags: ["dashboard"],
    },
    handler: dashboardControlleres.profile,
  });
  server.route({
    method: "PUT",
    url: "/updateprofile",
    schema: {
      tags: ["dashboard"],
      body: updateProfileSchema,
    },
    handler: dashboardControlleres.updateProfile,
  });
}

export default dashboardRoutes;
