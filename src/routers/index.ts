import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import authRouter from './auth';
import productsRouter from './products';

export default function (app: FastifyInstance, options: FastifyPluginOptions, done: () => void): void {
  app.register(authRouter, { prefix: '/auth' });
  app.register(productsRouter, { prefix: '/products' });
  done();
}
