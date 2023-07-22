import { describe, it, expect, beforeEach } from 'vitest';

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository';
import { CreatePetUseCase } from './create-pet';

let orgsRepository: InMemoryOrgsRepository;
let imagesRepository: InMemoryImagesRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe('Register org use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    imagesRepository = new InMemoryImagesRepository();
    sut = new CreatePetUseCase(
      petsRepository,
      imagesRepository,
      orgsRepository,
    );
  });

  it.todo('should create a pet');

  it.todo('should not create a pet with invalid org');
});
