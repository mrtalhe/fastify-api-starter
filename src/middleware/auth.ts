import * as jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
interface User {
  id: number;
  email: string;
  password: string;
  name: string | null;
  isAdmin: boolean;
}
interface CustomRequest extends FastifyRequest {
  user?: User;
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

async function isAdmin(request: CustomRequest,response: FastifyReply,next: (err?: Error) => void){
  if(!request.user || !request.user.isAdmin) response.code(403).send('Access denied You are not an administrator');
  next();
}


export {auth,isAdmin};
