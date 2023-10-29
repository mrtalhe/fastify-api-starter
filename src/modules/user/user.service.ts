import { Lifetime, createContainer, asClass } from "awilix";
import prisma from "../../utils/prisma";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { CreateUserInput } from "./user.schema";

class UserService {
  async createUser(input: CreateUserInput) {
    const { name, email, password } = input;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findOneUser(email: string) {
    return await prisma.user.findFirst({ where: { email } });
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        id: true,
      },
    });
  }

  async hashUserPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  async comparePassword(password: string, userPassword: string) {
    const isValid = await bcrypt.compare(password, userPassword);
    return isValid;
  }

  async createToken(userId: number, jwtKey: string) {
    const token = jwt.sign({ id: userId }, jwtKey);
    return token;
  }
}

const container = createContainer();

container.register({
  userService: asClass(UserService, { lifetime: Lifetime.SINGLETON }),
});

export default container;