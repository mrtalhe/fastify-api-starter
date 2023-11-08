import * as jwt from "jsonwebtoken";
import prisma from "../utils/prisma";


async function auth(request: any, reply: any, next: any) {
    const token = request.headers["x-auth-token"];
    if (!token) reply.code(401).send("access denied");
    try {
        const secretKey: string | any = process.env.JWT_KEY;
        const decoded: any = jwt.verify(token, secretKey);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        request.user = user;
        next();
    } catch (ex) {
        reply.code(400).send("invalid token");
    }
}

export default auth;





