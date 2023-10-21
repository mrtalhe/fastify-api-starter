import connectDb from "./startup/db";
import Fastify, {
  FastifyInstance,
} from "fastify";
import routers from "./routers";
import 'dotenv/config'

const start = async () => {

  const app: FastifyInstance = Fastify({
    logger: true,
  });

  connectDb;
  app.register(routers, { prefix: "/api" });

  try {

    await app.listen({ port: 3000 });
    app.server.address();

  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
