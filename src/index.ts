import Fastify, { FastifyInstance } from "fastify";
import userRoutes from "./modules/user/user.routes";
import * as dotenv from "dotenv";
import { userSchemas } from "./modules/user/user.schema";




const start = async () => {
  dotenv.config();
  
  const app: FastifyInstance = Fastify({
    logger: true,
  });



  for (const schema of [...userSchemas]) {
    app.addSchema(schema);
  }

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
