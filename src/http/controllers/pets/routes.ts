import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { find } from './find';
import { create } from './create';

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/pets/:id', find);
  app.post('/pets/:org_id', create);
}
