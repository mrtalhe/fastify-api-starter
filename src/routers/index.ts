import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import authRouter from './auth';

export default function (app: FastifyInstance, options: FastifyPluginOptions, done: () => void): void {
  app.register(authRouter, { prefix: '/auth' });
  done();
}
