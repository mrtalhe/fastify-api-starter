import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserInput, LoginInput } from "./user.schema";
import container from "./user.service";

class UserController {
  async rigsterUserHandler(
    request: FastifyRequest<{
      Body: CreateUserInput;
    }>,
    reply: FastifyReply
  ) {
    const userService = container.resolve("userService");

    const { name, email, password } = request.body;
    // find user by email
    const user = await userService.findUserByEmail(email);
    if (user) {
      return reply.code(400).send({
        message: "The user has already registered",
      });
    }
    // hash user password
    const hashedPassword = await userService.hashUserPassword(password);
    // register User
    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword,
    });
    reply.code(200).send({
      message: "User registered successfully",
      data: newUser,
    });
  }

  async loginUserHandler(
    request: FastifyRequest<{
      Body: LoginInput;
    }>,
    reply: FastifyReply
  ) {
    const { email, password } = request.body;
    const userService = container.resolve("userService");
    // check user
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return reply.code(400).send({
        message: "invalid email or password",
      });
    }
    // check password
    const isValid = await userService.comparePassword(password, user.password);
    if (!isValid) {
      return reply.code(400).send({
        message: "invalid email or password",
      });
    }
    const token = await userService.createToken(user.id, process.env.JWT_KEY!);
    return reply.code(200).send({
      message: "successfuly logged in",
      data: token,
    });
  }

  async getAllUsersHandler() {
    const userService = container.resolve("userService");
    const users = await userService.getAllUsers();
    return users;
  }
}

export default new UserController;