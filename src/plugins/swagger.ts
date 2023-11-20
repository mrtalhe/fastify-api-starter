import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import authRoutes from "../modules/auth/auth.route";
import userRoutes from "../modules/user/user.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.route";

export default fastifyPlugin<FastifyPluginAsync>(
  async (fastify): Promise<void> => {
    await fastify.register(fastifySwagger, {
      routePrefix: '/docs',
      swagger: {
        info: {
          title: 'My API',
          description: 'API documentation',
          version: '1.0.0'
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here'
        },
        consumes: ['application/json'],
        produces: ['application/json']
      },
      exposeRoute: true
    });
    
    await fastify.register(userRoutes, { prefix: "users" });
    await fastify.register(dashboardRoutes, { prefix: "dashboard" });
    await fastify.register(authRoutes, { prefix: "auth" });

  },
  { name: "swagger" }
);
