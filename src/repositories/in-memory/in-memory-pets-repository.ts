import { Prisma, Pet } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { PetsRepository } from '@/repositories/pets-repository';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(pet: Prisma.PetUncheckedCreateInput) {
    const newPet: Pet = {
      age: pet.age,
      name: pet.name,
      size: pet.size,
      about: pet.about,
      energy: pet.energy,
      org_id: pet.org_id ?? null,
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
}
