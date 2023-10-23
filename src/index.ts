import connectDb from "./startup/db";
import Fastify, {
  FastifyInstance,
} from "fastify";
import userRoutes from "./modules/user/user.routes"
import 'dotenv/config'

const start = async () => {

  const app: FastifyInstance = Fastify({
    logger: true,
  });

  connectDb
  console.log(connectDb);
  
  app.register(userRoutes, {prefix: "api/users"})
  try {

    await app.listen({ port: 3000 });
    app.server.address();

  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
