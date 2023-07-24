import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PrismaOrgsRepository } from '@/repositories/prisma/orgs-repository';
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error';
import { RegisterOrgUseCase } from '@/use-cases/register-org';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    owner: z.string(),
    email: z.string().email(),
    cep: z.string().length(8),
    address: z.string().max(150),
    uf: z.string().length(2),
    city: z.string().max(50),
    latitude: z.number(),
    longitude: z.number(),
    cellphone: z.string().max(14),
    password: z.string().min(6),
  });

  const parsedBody = registerBodySchema.parse(request.body);

  try {
    const orgsRepository = new PrismaOrgsRepository();
    const registerUseCase = new RegisterOrgUseCase(orgsRepository);

    await registerUseCase.execute(parsedBody);
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
