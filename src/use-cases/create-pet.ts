import { ImagesRepository } from '@/repositories/images-repository';
import { OrgsRepository } from '@/repositories/orgs-repository';
import { PetsRepository } from '@/repositories/pets-repository';
import { Age, Energy, Image, Pet, Size } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: Age;
  size: Size;
  energy: Energy;
  requirements: string[];
  org_id: string;
  images: {
    publicId: string;
    format: string;
    version: string;
  }[];
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private imagesRepository: ImagesRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    images,
    ...rest
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create(rest);
    const org = await this.orgsRepository.findById(rest.org_id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    for await (let image of images) {
      await this.imagesRepository.create({
        ...image,
        pet_id: pet.id,
      });
    }

    return {
      pet,
    };
  }
}
