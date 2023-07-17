import fastify from 'fastify';
import { env } from './env';

export const app = fastify();

app.get('/', (request, reply) => {
  return reply.send({ message: 'hello' });
});

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running ${env.PORT}`);
  })
  .catch(error => {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    }
  });
