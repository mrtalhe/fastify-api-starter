import {FastifyPluginAsync} from "fastify"
import fastifyAutoload from "@fastify/autoload";
import { join } from "path";


const pluginLoader: FastifyPluginAsync = async (fastify) => {
	await fastify
		.register(fastifyAutoload, {
			dir: join(__dirname, '../plugins'),
		})

}

export default pluginLoader