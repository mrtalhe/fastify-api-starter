import * as jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

interface CustomRequest extends FastifyRequest {
  user?: any;
}
async function auth(
  request: CustomRequest,
  reply: FastifyReply,
  next: (err?: Error) => void
) {
  const { config } = request.server.diContainer.cradle;
  const token: string | any = request.headers["x-auth-token"];
  if (!token) reply.code(401).send("access denied");
  try {
    const secretKey: string = config.JWT_KEY;
    const decoded: string | any = jwt.verify(token, secretKey);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
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

export default auth;
