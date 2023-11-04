import prisma from "../../utils/prisma";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { CreateUserInput } from "./user.schema";

class UserService {
  // create user
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
  // find user by email
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }
  // find one user
  async findOneUser(email: string) {
    return await prisma.user.findFirst({ where: { email } });
  }
  // get all users
  async getAllUsers() {
    return await prisma.user.findMany({
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
}

export default UserService;
