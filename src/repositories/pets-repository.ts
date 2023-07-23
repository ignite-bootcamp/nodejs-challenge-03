import { Age, Energy, Pet, Prisma, Size } from '@prisma/client';

export interface FindManyQueries {
  age?: Age;
  energy?: Energy;
  size?: Size;
}

export interface PetsRepository {
  create(pet: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findMany(city: string, queries: FindManyQueries): Promise<Pet[]>;
}
