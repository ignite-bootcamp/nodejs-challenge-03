import { Pet } from '@prisma/client';

export interface PetsRepository {
  searchMany(query: string, page: number): Promise<Pet[]>;
}
