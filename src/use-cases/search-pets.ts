import { Age, Energy, Pet, Size } from '@prisma/client';
import { PetsRepository } from '@/repositories/pets-repository';

interface SearchPetsUseCaseRequest {
  city: string;
  queries?: {
    age?: Age;
    energy?: Energy;
    size?: Size;
  };
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    queries,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany(city, {
      age: queries?.age,
      size: queries?.size,
      energy: queries?.energy,
    });

    return {
      pets,
    };
  }
}
