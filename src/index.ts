import Fastify, { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";
import { appConfig } from "./config/app.config";
import pluginLoader from "./config/fastify.config";

const start = async () => {
  dotenv.config();

  const app: FastifyInstance = Fastify({
    logger: true,
  });

  await app.register(pluginLoader);
  const { PORT, development } = appConfig();

  try {
    await app.listen({
      port: PORT,
      host: development ? "127.0.0.1" : "0.0.0.0",
    });
    app.server.address();
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
