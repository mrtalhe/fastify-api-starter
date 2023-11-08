import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserInput } from "./user.schema";
import UserService from "./user.service";
import { FastifyInstance } from "fastify/types/instance";
import autoBind from "auto-bind";

class UserController {
  private userService: UserService;
  constructor(private readonly server: FastifyInstance) {
    const { userServices } = this.server.diContainer.cradle;
    this.userService = userServices;
    autoBind(this);
  }

  async createUser(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) {
    // get data from body
    const { name, email, password } = request.body;
    // register User
    const newUser = await this.userService.createUser({
      name,
      email,
      password,
    });
    reply.code(200).send({
      message: "User registered successfully",
      data: newUser,
    });
  }

  async getAllUsersHandler(request: FastifyRequest, reply: FastifyReply) {
    const users = await this.userService.getAllUsers();
    return reply.code(200).send({
      message: "all users!",
      data: users,
    });
  }
}

export default UserController;
