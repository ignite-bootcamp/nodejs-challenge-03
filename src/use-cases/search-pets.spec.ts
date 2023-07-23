import { describe, it, expect, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { SearchPetsUseCase } from './search-pets';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: SearchPetsUseCase;

describe('Register org use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new SearchPetsUseCase(petsRepository);
  });

  it('should search pets by city', async () => {
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

    await petsRepository.create({
      org_id: id,
      requirements: ['precisa de carinho'],
      energy: 'LOW',
      about: 'Um cachorrinho legal',
      size: 'SMALL',
      name: 'Jorginho',
      age: 'NEW_BORN',
    });

    await petsRepository.create({
      org_id: id,
      requirements: ['precisa de carinho'],
      energy: 'LOW',
      about: 'Um cachorrinho legal',
      size: 'SMALL',
      name: 'Jorginho',
      age: 'NEW_BORN',
    });

    const { pets } = await sut.execute({
      city: 'Natal',
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({
        org_id: id,
      }),
      expect.objectContaining({
        org_id: id,
      }),
    ]);
  });

  it('should return empty array if city has no pets', async () => {
    const { pets } = await sut.execute({
      city: 'Natal',
    });

    expect(pets).toHaveLength(0);
  });

  it('should filter by age, energy and size', async () => {
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

    await petsRepository.create({
      org_id: id,
      requirements: ['precisa de carinho'],
      energy: 'HIGH',
      about: 'Um cachorrinho legal',
      size: 'SMALL',
      name: 'Jorginho',
      age: 'NEW_BORN',
    });

    await petsRepository.create({
      org_id: id,
      requirements: ['precisa de carinho'],
      energy: 'LOW',
      about: 'Um cachorrinho legal',
      size: 'LARGE',
      name: 'Jorginho',
      age: 'OLD',
    });

    const { pets } = await sut.execute({
      city: 'Natal',
      queries: {
        age: 'OLD',
      },
    });

    expect(pets).toHaveLength(1);
    expect(pets[0]).toEqual(
      expect.objectContaining({
        org_id: id,
        age: 'OLD',
        size: 'LARGE',
        energy: 'LOW',
      }),
    );
  });
});
