import { FastifyInstance } from 'fastify';
import { register } from './register';
import { refresh } from './refresh';

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register);
  app.post('/token/refresh', refresh);
}
