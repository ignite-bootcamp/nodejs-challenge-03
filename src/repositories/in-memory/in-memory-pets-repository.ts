import { Prisma, Pet } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import {
  FindManyQueries,
  PetsRepository,
} from '@/repositories/pets-repository';
import { OrgsRepository } from '../orgs-repository';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: OrgsRepository) {}

  async create(pet: Prisma.PetUncheckedCreateInput) {
    const newPet: Pet = {
      age: pet.age,
      name: pet.name,
      size: pet.size,
      about: pet.about,
      energy: pet.energy,
      org_id: pet.org_id,
      requirements: pet.requirements as string[],
      id: randomUUID(),
      created_at: new Date(),
    };

    this.items.push(newPet);

    return newPet;
  }

  async findById(id: string) {
    return this.items.find(item => item.id === id) ?? null;
  }

  async findMany(city: string, queries: FindManyQueries): Promise<Pet[]> {
    const orgs = await this.orgsRepository.findMany({ city });
    const orgIds: string[] = orgs.map(org => org.id);

    const filteredPets: Pet[] = this.items.filter(
      pet =>
        orgIds.includes(pet.org_id) &&
        (!queries.age || pet.age === queries.age) &&
        (!queries.energy || pet.energy === queries.energy) &&
        (!queries.size || pet.size === queries.size),
    );

    return filteredPets;
  }
}
