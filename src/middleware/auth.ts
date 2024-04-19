import * as jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

async function auth(
  request: FastifyRequest,
  reply: FastifyReply,
  next: (err?: Error) => void
) {
  const { appconfig } = request.server.diContainer.cradle;
  const token: any = request.headers["x-auth-token"];
  if (!token) reply.code(401).send("access denied");
  try {
    const secretKey: jwt.Secret = appconfig.JWT_KEY;
    const decoded: any = jwt.verify(token, secretKey);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    console.log(user);
    if (user) {
      request.user = user;

      next();
    } else {
      reply.code(401).send("access denied");
    }
  } catch (ex) {
    reply.code(400).send("invalid token");
  }
}

async function isAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
  next: (err?: Error) => void
) {
  if (!request.user.isAdmin) {
    return reply.code(403).send("Access denied You are not an administrator");
  } else {
    return next();
  }
}

export { auth, isAdmin };
