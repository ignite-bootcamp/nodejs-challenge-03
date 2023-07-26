import { PrismaPetsRepository } from '@/repositories/prisma/pets-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FindPetUseCase } from '@/use-cases/find-pet';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const findPetParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = findPetParamsSchema.parse(request.params);

  try {
    const petsRepository = new PrismaPetsRepository();
    const findPetUseCase = new FindPetUseCase(petsRepository);

    const { pet } = await findPetUseCase.execute(id);

    return reply.status(200).send(pet);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
