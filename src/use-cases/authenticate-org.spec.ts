import { describe, it, expect, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { AuthenticateOrgUseCase } from './authenticate-org';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateOrgUseCase;

describe('Register org use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

  it('should authenticate an org', async () => {
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

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(org.id).toEqual(id);
  });

  it('should not be able to authenticate an org with wrong email', async () => {
    await expect(() => {
      return sut.execute({
        email: 'wrongemail@example.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate an org with wrong password', async () => {
    await orgsRepository.create({
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

    await expect(() => {
      return sut.execute({
        email: 'johndoe@example.com',
        password: '1231254',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
