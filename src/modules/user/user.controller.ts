import { FastifyRequest, FastifyReply } from "fastify";
import {
  createUser,
  findUserByEmail,
  hashUserPassword,
  getAllUsers,
  comparePassword,
  createToken,
} from "./user.service";

import { CreateUserInput, LoginInput } from "./user.schema";
export async function rigsterUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const { name, email, password } = request.body;
  // find user by email
  const user = await findUserByEmail(email);
  if (user) {
    return reply.code(400).send({
      message: "The user has already registered",
    });
  }
  // hash user password
  const hashedPassword = await hashUserPassword(password);
  // register User
  const newUser = await createUser({ name, email, password: hashedPassword });
  reply.code(200).send({
    message: "User registered successfully",
    data: newUser,
  });
}

// login handler
export async function loginUserHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  // check user
  const user = await findUserByEmail(email);
  if (!user) {
    return reply.code(400).send({
      message: "invalid email or password",
    });
  }
  // check password
  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return reply.code(400).send({
      message: "invalid email or password",
    });
  }
  const token = await createToken(user.id, process.env.JWT_KEY!);
  return reply.code(200).send({
    message: "successfuly logged in",
    data: token,
  });
}

export async function getAllUsersHandler() {
  const users = await getAllUsers();
  return users;
}
