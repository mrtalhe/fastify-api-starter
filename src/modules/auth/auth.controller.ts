import { FastifyInstance } from "fastify/types/instance";
import autoBind from "auto-bind";
import UserService from "../user/user.service";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  ForgetPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "./auth.schema";
import { Env } from "../../config/app.config";
import resetPassTempelate from "../../templates/email/forget.js";
import sendEmail from "../../utils/nodemailer";
import { emitWarning } from "process";
class AuthController {
  private userService: UserService;
  private config: Env;
  constructor(private readonly server: FastifyInstance) {
    const { userServices, appconfig } = this.server.diContainer.cradle;
    this.userService = userServices;
    this.config = appconfig;
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
  // forget password
  async forgetPassword(
    request: FastifyRequest<{ Body: ForgetPasswordInput }>,
    reply: FastifyReply
  ) {
    const { email } = request.body;
    // check user
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      reply.code(400).send({
        message: "'No user found!'",
      });
    }
    const token = await this.userService.generateRefreshToken(email);
    const template = await resetPassTempelate(token);
    const options = { to: email, subject: "Reset Password", html: template };
    setImmediate(async () => {
      await sendEmail(options, request);
    });
    reply.code(200).send({
      message: "The password recovery link has been sent to your email",
    });
  }

  // reset password
  async resetPassword(
    request: FastifyRequest<{
      Body: ResetPasswordInput;
      Querystring: { resetToken: string };
    }>,
    reply: FastifyReply
  ) {
    const { password } = request.body;
    const { resetToken } = request.query;
    await this.userService.resetUserPassword(
      resetToken,
      password
    );
    reply.code(200).send({
      message: "Password successfully retrieved",
    })
  }
}
export default AuthController;
