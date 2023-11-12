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
  // create user
  async createUser(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) {
    // get data from body
    const { name, email, password } = request.body;
    // create User
    const newUser = await this.userService.createUser({
      name,
      email,
      password,
    });
    reply.code(200).send({
      message: "User Created successfully",
      data: newUser,
    });
  }
  // get all users
  async getAllUsersHandler(request: FastifyRequest, reply: FastifyReply) {
    const users = await this.userService.getAllUsers();
    return reply.code(200).send({
      message: "all users!",
      data: users,
    });
  }
  // delete user 
  async deleteUserHandler(request: FastifyRequest<{ Params: {id: number} }>, reply: FastifyReply){
    const id = Number(request.params.id)
    // check user
    const checkUser = await this.userService.findUserById(id)
    if(!checkUser){
      reply.code(404).send({message: "user not Found!"})
    }
    // delete user
    const user = await this.userService.deleteUser(id)
    reply.code(200).send({
      message: "User Deleted successfully",
      data: user,
    })
  }
}

export default UserController;
