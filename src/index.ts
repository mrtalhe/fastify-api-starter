import Fastify, { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";
import userRoutes from "./modules/user/user.routes";
import diConfig from "./plugins/di.config";



const start = async () => {
  dotenv.config();

  const app: FastifyInstance = Fastify({
    logger: true,
  });

  app.register(diConfig)

  app.register(userRoutes, { prefix: "api/users" });
  try {
    await app.listen({ port: 3000 });
    app.server.address();
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
