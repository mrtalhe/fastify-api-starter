import { FastifyInstance } from "fastify/types/instance";
import autoBind from "auto-bind";
import UserService from "../user/user.service";
import { FastifyRequest, FastifyReply } from "fastify";

class DashboardController {
  private userService: UserService;
  constructor(private readonly server: FastifyInstance) {
    const { userServices } = this.server.diContainer.cradle;
    this.userService = userServices;
    autoBind(this);
  }
  async userDashboard(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.user;
    const user = await this.userService.findUserById(id);
    reply.code(200).send({
      message: "user dashboard",
      data: user,
    });
  }
}
export default DashboardController;
