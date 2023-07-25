import { FastifyInstance } from 'fastify';
import { register } from './register';
import { refresh } from './refresh';
import { authenticate } from './authenticate';

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register);
  app.post('/sessions', authenticate);
  app.post('/token/refresh', refresh);
}
