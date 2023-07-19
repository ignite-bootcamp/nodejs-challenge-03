import { Pet } from '@prisma/client';
import { PetsRepository } from '../pets-repository';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async searchMany(query: string, page: number) {
    return this.items
      .filter(item => item.name.includes(query))
      .slice((page - 1) * 20, page * 20);
  }
}
