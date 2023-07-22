import { describe, it, expect, beforeEach } from 'vitest';

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { RegisterOrgUseCase } from './register-org';
import { compare } from 'bcryptjs';
import { OrgAlreadyExistsError } from './errors/org-already-exists-error';

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterOrgUseCase;

describe('Register org use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterOrgUseCase(orgsRepository);
  });

  it('should register an org', async () => {
    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      cellphone: '84999999999',
      latitude: -5.8147019,
      longitude: -35.2135645,
      address: 'Rua teste 457',
      owner: 'John Doe',
      cep: '00000-000',
      uf: 'RN',
      city: 'Natal',
      password: '123456',
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it('should hash org password', async () => {
    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      cellphone: '84999999999',
      latitude: -5.8147019,
      longitude: -35.2135645,
      address: 'Rua teste 457',
      owner: 'John Doe',
      cep: '00000-000',
      uf: 'RN',
      city: 'Natal',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      org.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register an org with the same email twice', async () => {
    await sut.execute({
      email: 'johndoe@example.com',
      cellphone: '84999999999',
      latitude: -5.8147019,
      longitude: -35.2135645,
      address: 'Rua teste 457',
      owner: 'John Doe',
      cep: '00000-000',
      uf: 'RN',
      city: 'Natal',
      password: '123456',
    });

    await expect(() => {
      return sut.execute({
        email: 'johndoe@example.com',
        cellphone: '84999999999',
        latitude: -5.8147019,
        longitude: -35.2135645,
        address: 'Rua teste 457',
        owner: 'John Doe',
        cep: '00000-000',
        uf: 'RN',
        city: 'Natal',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
