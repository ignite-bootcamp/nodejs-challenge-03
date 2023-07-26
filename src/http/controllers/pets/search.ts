import { PrismaPetsRepository } from '@/repositories/prisma/pets-repository';
import { SearchPetsUseCase } from '@/use-cases/search-pets';
import { Age, Energy, Size } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z
    .object({
      age: z.nativeEnum(Age),
      energy: z.nativeEnum(Energy),
      size: z.nativeEnum(Size),
    })
    .partial();

  const searchPetsParamsSchema = z.object({
    city: z.string().max(50).toLowerCase(),
  });

  const queries = searchPetsQuerySchema.parse(request.query);
  const { city } = searchPetsParamsSchema.parse(request.params);

  const petsRepository = new PrismaPetsRepository();
  const searchPetsUseCase = new SearchPetsUseCase(petsRepository);

  const { pets } = await searchPetsUseCase.execute({
    city,
    queries,
  });

  return reply.status(200).send(pets);
}
