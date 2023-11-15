import {FastifyPluginAsync} from "fastify"
import fastifyAutoload from "@fastify/autoload";
import { join } from "path";
interface User {
	id: number;
	email: string;
	password: string;
	name: string | null;
	isAdmin: boolean;
  }
declare module "fastify" {
	interface FastifyRequest {
	  user: User;
	}
  }

const pluginLoader: FastifyPluginAsync = async (fastify) => {
	
	await fastify
		.register(fastifyAutoload, {
			dir: join(__dirname, '../plugins'),
		})

}

export default pluginLoader