import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import FastifySwagger from "@fastify/swagger";

export default fastifyPlugin<FastifyPluginAsync>(
  async (fastify): Promise<void> => {
    await fastify.register(FastifySwagger, {
      exposeRoute: true,
      routePrefix: "/docs",
      openapi: {
        info: {
          title: "Fastify sample server",
          description: "Fastify sample api",
          version: "0.1.0",
        },
      },
    });
  },
  { name: "swagger" }
);
