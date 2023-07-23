import { describe, it, expect, beforeEach } from 'vitest';

import { FindPetUseCase } from './find-pet';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FindPetUseCase;

describe('Register org use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new FindPetUseCase(petsRepository);
  });

  it('should create a pet', async () => {
    const { id } = await petsRepository.create({
      org_id: 'org-id',
      requirements: ['precisa de carinho'],
      energy: 'LOW',
      about: 'Um cachorrinho legal',
      size: 'SMALL',
      name: 'Jorginho',
      age: 'NEW_BORN',
    });

    const { pet } = await sut.execute(id);

    expect(pet).toEqual(
      expect.objectContaining({
        id,
      }),
    );
  });

  it('should not create a pet with invalid id', async () => {
    await expect(() => {
      return sut.execute('invalid-id');
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
