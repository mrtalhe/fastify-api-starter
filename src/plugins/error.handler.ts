import { fastifyPlugin } from "fastify-plugin";
import {
  FastifyRequest,
  FastifyReply,
  FastifyError,
  FastifyPluginAsync,
} from "fastify";

export default fastifyPlugin<FastifyPluginAsync>(async (fastify) => {
  fastify.setErrorHandler(
    async (
      error: FastifyError,
      request: FastifyRequest,
      reply: FastifyReply
    ) => {
      const statusCode = error.statusCode ?? 400;
      fastify.log.error(error, `This error has status code ${statusCode}`);
      reply
        .code(statusCode >= 400 ? statusCode : 500)
        .type("text/plain")
        .send(statusCode >= 500 ? "Internal server error" : error.message);
    }
  );
});
