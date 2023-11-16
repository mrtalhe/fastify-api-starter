import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { CreateUserInput } from "./user.schema";
import { FastifyInstance } from "fastify/types/instance";
import { PrismaClient } from "@prisma/client";

class UserService {
  private prisma: PrismaClient;
  constructor(private server: FastifyInstance) {
    const { prisma } = this.server.diContainer.cradle;
    this.prisma = prisma;
  }
  // create user
  async createUser(input: CreateUserInput) {
    const user = await this.prisma.user.create({
      select: {
        name: true,
        email: true,
        id: true,
      },
      data: {
        ...input,
      },
    });
    return user;
  }
  // find user by email
  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
  // find user by id
  async findUserById(id: number) {
    return await this.prisma.user.findUnique({
      select: { password: false, name: true, email: true, id: true },
      where: { id },
    });
  }
  // get all users
  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: {
        email: true,
        name: true,
        id: true,
      },
    });
  }
  // hash user password
  async hashUserPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
  // compare user password
  async comparePassword(password: string, userPassword: string) {
    const isValid = await bcrypt.compare(password, userPassword);
    return isValid;
  }
  // create token
  async createToken(userId: number, jwtKey: string) {
    const token = jwt.sign({ id: userId }, jwtKey);
    return token;
  }
  // delete user
  async deleteUser(id: number) {
    const user = await this.prisma.user.delete({
      select: { email: true, name: true, id: true },
      where: { id: id },
    });
    return user;
  }
  // update user
  async updateUser(input: CreateUserInput, id: number) {
    const hashedPassword = await this.hashUserPassword(input.password);
    const user = await this.prisma.user.update({
      select: { email: true, name: true, id: true },
      data: {
        ...input,
        isAdmin: false,
        password: hashedPassword,
      },
      where: { id: id },
    });
    return user;
  }
  // generate refresh token
  async generateRefreshToken(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid or expired reset token");
    }
    const data = crypto.randomBytes(40).toString("hex");
    const resetToken = crypto.createHash("sha256").update(data).digest("hex");
    await this.prisma.user.update({
      where: { email: user.email },
      data: {
        resetToken: resetToken,
        resetExpire: new Date(Date.now() + 5 * 60 * 1000)
      }
    });
    return resetToken;
  }
  // reset user password
  async resetUserPassword(token: string, password: string) {
    let user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetExpire: { gte: new Date() },
      },
    });

    if (!user) {
      return false;
    }

    const userId = user.id;
    user.password = password;
    user.resetToken = null;
    user.resetExpire = null;

    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await this.prisma.user.update({
      select: { resetExpire: true, resetToken: true, id: true },
      data: {
        ...user,
      },
      where: { id: userId },
    });

    return true;
  }
}

export default UserService;
