import {FastifyInstance} from "fastify"



async function userRoutes(server: FastifyInstance){
server.post("/", async (request, reply) => {
    reply.send("users")
})
}

export default userRoutes