import { Prisma } from '@prisma/client';
import { FindManyQueries, PetsRepository } from '../pets-repository';
import { prisma } from '@/lib/prisma';
import { filterTruthyValues } from '@/utils/filterTruthyValues';

export class PrismaPetsRepository implements PetsRepository {
  async create(pet: Prisma.PetUncheckedCreateInput) {
    return await prisma.pet.create({
      data: pet,
    });
  }

  async findById(id: string) {
    return await prisma.pet.findUnique({
      where: {
        id,
      },
    });
  }

  async findMany(city: string, queries: FindManyQueries) {
    const filteredQueries = filterTruthyValues(queries);

    return await prisma.pet.findMany({
      where: {
        ...filteredQueries,
        org: {
          city: {
            contains: city,
            mode: 'insensitive',
          },
        },
      },
    });
  }
}
