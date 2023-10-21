import { FastifyInstance } from "fastify";
import controller from "./controller";
import auth from "../../middleware/auth";



async function authRouter(fastify: FastifyInstance) {

  fastify.route({
    method: 'get',
    url: '/',
    handler: controller.products,
    preHandler: [
      auth
    ]
  })


}

export default authRouter;
