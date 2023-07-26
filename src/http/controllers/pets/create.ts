import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaImagesRepository } from '@/repositories/prisma/images-repository';
import { PrismaOrgsRepository } from '@/repositories/prisma/orgs-repository';
import { PrismaPetsRepository } from '@/repositories/prisma/pets-repository';
import { CreatePetUseCase } from '@/use-cases/create-pet';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { Age, Energy, Size } from '@prisma/client';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string().max(300),
    age: z.nativeEnum(Age),
    size: z.nativeEnum(Size),
    energy: z.nativeEnum(Energy),
    requirements: z.array(z.string()),
    images: z.array(
      z.object({
        publicId: z.string(),
        format: z.string(),
        version: z.string(),
      }),
    ),
  });

  const createPetParamsSchema = z.object({
    org_id: z.string().uuid(),
  });

  const body = createPetBodySchema.parse(request.body);
  const { org_id } = createPetParamsSchema.parse(request.params);

  try {
    const petsRepository = new PrismaPetsRepository();
    const imagesRepository = new PrismaImagesRepository();
    const orgsRepository = new PrismaOrgsRepository();

    const createPetsUseCase = new CreatePetUseCase(
      petsRepository,
      imagesRepository,
      orgsRepository,
    );

    await createPetsUseCase.execute({
      org_id,
      ...body,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
