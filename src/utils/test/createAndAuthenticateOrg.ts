import { randomUUID } from 'node:crypto';
import { FastifyInstance } from 'fastify';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { prisma } from '@/lib/prisma';

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org_id = randomUUID();
  await prisma.org.create({
    data: {
      id: org_id,
      owner: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345678',
      address: 'John doe street 132',
      uf: 'RN',
      city: 'Natal',
      latitude: -50.46321,
      longitude: -32.62123,
      cellphone: '999999999',
      password_hash: await hash('123456', 6),
    },
  });

  const response = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  });

  const { token } = response.body;

  return { token, id: org_id };
}
