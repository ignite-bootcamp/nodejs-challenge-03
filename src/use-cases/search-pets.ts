import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';

interface SearchPetsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPets {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(query, page);

    return {
      pets,
    };
  }
}
