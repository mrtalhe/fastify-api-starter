import {FastifyRequest, FastifyReply} from "fastify"
import { createUser } from "./user.service"
import  createUserInput  from "./user.schema";
export async function registerUserHandler(request: FastifyRequest<{
    Body: typeof createUserInput
}>, reply: FastifyReply) {
    const body: any = request.body
    const user = await createUser(body)
    return reply.code(200).send(user)
}