import { describe, it, expect, beforeEach } from 'vitest';

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository';
import { CreatePetUseCase } from './create-pet';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

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

  it('should create a pet', async () => {
    const { id } = await orgsRepository.create({
      email: 'johndoe@example.com',
      cellphone: '84999999999',
      latitude: -5.8147019,
      longitude: -35.2135645,
      address: 'Rua teste 457',
      owner: 'John Doe',
      cep: '00000-000',
      uf: 'RN',
      city: 'Natal',
      password_hash: await hash('123456', 6),
    });

    const { pet } = await sut.execute({
      org_id: id,
      requirements: ['precisa de carinho'],
      energy: 'LOW',
      about: 'Um cachorrinho legal',
      size: 'SMALL',
      name: 'Jorginho',
      age: 'NEW_BORN',
      images: [
        {
          publicId: 'mocked-public-id',
          version: '1',
          format: 'png',
        },
      ],
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.org_id).toEqual(id);
  });

  it.todo('should not create a pet with invalid org', async () => {
    await expect(() => {
      return sut.execute({
        org_id: 'invalid-org-id',
        requirements: ['precisa de carinho'],
        energy: 'LOW',
        about: 'Um cachorrinho legal',
        size: 'SMALL',
        name: 'Jorginho',
        age: 'NEW_BORN',
        images: [
          {
            publicId: 'mocked-public-id',
            version: '1',
            format: 'png',
          },
        ],
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
