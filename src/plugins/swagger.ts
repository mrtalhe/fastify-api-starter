import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";

export default fastifyPlugin<FastifyPluginAsync>(
  async (fastify): Promise<void> => {
    await fastify.register(fastifySwagger, {
      routePrefix: "/docs",
      swagger: {
        info: {
          title: "My API",
          description: "API documentation",
          version: "1.0.0",
        },
        externalDocs: {
          url: "https://swagger.io",
          description: "Find more info here",
        },
        consumes: ["application/json"],
        produces: ["application/json"],
      },
      exposeRoute: true,
    });
  },
  { name: "swagger" }
);
