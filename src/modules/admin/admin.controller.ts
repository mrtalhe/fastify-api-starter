import { FastifyRequest, FastifyReply } from "fastify";
import { FastifyInstance } from "fastify/types/instance";

class AdminController {
  private autoBind;
  constructor(private readonly server: FastifyInstance) {
    const { autoBind } = this.server.diContainer.cradle;
    this.autoBind = autoBind(this);
  }

  async home(request: FastifyRequest, reply: FastifyReply) {
    reply.send("admin")
  }
}
export default AdminController;
