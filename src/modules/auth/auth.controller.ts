import { FastifyInstance } from "fastify/types/instance";
import autoBind from "auto-bind";
import UserService from "../user/user.service";
import { FastifyRequest, FastifyReply } from "fastify";
import { LoginInput, RegisterInput } from "./auth.schema";
import { Env } from "../../config/app.config";

class AuthController {
  private userService: UserService;
  private config: Env;
  constructor(private readonly server: FastifyInstance) {
    const { userServices, config } = this.server.diContainer.cradle;
    this.userService = userServices;
    this.config = config;
    autoBind(this);
  }
  async register(
    request: FastifyRequest<{ Body: RegisterInput }>,
    reply: FastifyReply
  ) {
    const { email, password, name } = request.body;
    // find user by email
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      return reply.code(400).send({
        message: "The user has already registered",
      });
    }
    // hash user password
    const hashedPassword = await this.userService.hashUserPassword(password);
    // register user
    const newUser = await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
    });
    reply.code(200).send({
      message: "User registered successfully",
      data: newUser,
    });
  }
  // login
  async login(
    request: FastifyRequest<{ Body: LoginInput }>,
    reply: FastifyReply
  ) {
    const { email, password } = request.body;
    // check user
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      return reply.code(400).send({
        message: "invalid email or password",
      });
    }
    // check password
    const isValid = await this.userService.comparePassword(
      password,
      user.password
    );
    if (!isValid) {
      return reply.code(400).send({
        message: "invalid email or password",
      });
    }
    // create token and send for user
    const token = await this.userService.createToken(
      user.id,
      this.config.JWT_KEY
    );
    return reply.code(200).send({
      message: "successfuly logged in",
      accessToken: token,
    });
  }
}
export default AuthController;
