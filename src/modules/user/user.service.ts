import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

// create user
export async function createUser(input: CreateUserInput) {
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
// find user bt email
export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
// find one user
export async function findOneUser(email: string) {
  return await prisma.user.findFirst({ where: { email } });
}
// get all users
export async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
}
// hash user password
export async function hashUserPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}
// compare user password
export async function comparePassword(password: string, userPassword: string) {
  const isValid = await bcrypt.compare(password, userPassword);
  return isValid;
}
// create token
export async function createToken(userId: number, jwtKey: string) {
  const token = jwt.sign({ id: userId }, jwtKey);
  return token;
}
