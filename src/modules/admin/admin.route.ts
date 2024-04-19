import { FastifyInstance } from "fastify/types/instance";
import { auth, isAdmin } from "../../middleware/auth";
import { FastifyReply, FastifyRequest } from "fastify";

async function adminRoutes(server: FastifyInstance) {
  const { adminControlleres } = server.diContainer.cradle;
  // check admin user
  server.addHook(
    "preHandler",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await auth(request, reply, () => {});
      await isAdmin(request, reply, (err) => {
        if (err) {
          reply.code(500).send(err.message);
        }
      });
    }
  );
  // other routes
  server.route({
    method: "get",
    url: "/",
    schema: {
      tags: ["admin"],
    },
    handler: adminControlleres.home,
  });
}

export default adminRoutes;
