import Fastify, { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";
import userRoutes from "./modules/user/user.routes";
import fastifyAutoload from "@fastify/autoload";
import path from "path";
import { appConfig } from "./config/app.config";

const start = async () => {
  dotenv.config();

  const app: FastifyInstance = Fastify({
    logger: true,
  });

  await app.register(fastifyAutoload, {
    dir: path.join(__dirname, "plugins"),
  });
  const {PORT, development} = appConfig()
  try {
    await app.listen({port: PORT, host: development ? '127.0.0.1' : '0.0.0.0'})
    app.server.address();
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
