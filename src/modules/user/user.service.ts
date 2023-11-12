import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { CreateUserInput } from "./user.schema";
import { FastifyInstance } from "fastify/types/instance";
import { PrismaClient } from "@prisma/client";

class UserService {
  private prisma: PrismaClient;
  constructor(private server: FastifyInstance){
    const {prisma} = this.server.diContainer.cradle
    this.prisma = prisma
  }
  // create user
  async createUser(input: CreateUserInput) {
    const { name, email, password } = input;

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
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
    return await this.prisma.user.findUnique({ where: { id } });
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
  async deleteUser(id: number){
    const user = await this.prisma.user.delete({
      where: {id: id}
    })
    return user
  }
}

export default UserService;
