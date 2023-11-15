import { FastifyInstance } from "fastify/types/instance";
import autoBind from "auto-bind";
import UserService from "../user/user.service";
import { FastifyRequest, FastifyReply } from "fastify";
import { updateProfileInput } from "./dashboard.schema";

class DashboardController {
  private userService: UserService;
  constructor(private readonly server: FastifyInstance) {
    const { userServices } = this.server.diContainer.cradle;
    this.userService = userServices;
    autoBind(this);
  }
  async profile(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.user;
    const user = await this.userService.findUserById(id);
    reply.code(200).send({
      message: "user dashboard",
      data: user,
    });
  }
  async updateProfile(request: FastifyRequest<{Body: updateProfileInput}>, reply: FastifyReply) {
    const { id } = request.user;
    const updateUser = await this.userService.updateUser(request.body, id)
    reply.code(200).send({
      message: "profile Updated",
      data: updateUser,
    });
  }
}
export default DashboardController;
