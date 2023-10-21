import { FastifyInstance } from "fastify";
import controller from "./controller";



async function authRouter(fastify: FastifyInstance) {


  fastify.route({
    method: 'post',
    url: '/register',
    handler: controller.register,
  })
  
  fastify.route({
    method: 'post',
    url: '/login',
    handler: controller.login,
  })
}

export default authRouter;
