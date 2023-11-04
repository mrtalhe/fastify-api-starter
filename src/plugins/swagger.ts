import { FastifyPluginCallback } from 'fastify';
import fastifySwagger from '@fastify/swagger';

const plugin: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: '/docs',
    openapi: {
      info: {
        title: 'Fastify sample server',
        description: 'Fastify sample api',
        version: '0.1.0',
      },
    },
  });
  done();
};

export default plugin;