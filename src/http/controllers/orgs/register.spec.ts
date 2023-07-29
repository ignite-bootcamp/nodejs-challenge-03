import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Register org controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register an org', async () => {
    const response = await request(app.server).post('/orgs').send({
      owner: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345678',
      address: 'John doe street 132',
      uf: 'RN',
      city: 'Natal',
      latitude: -50.46321,
      longitude: -32.62123,
      cellphone: '999999999',
      password: '123456',
    });
    expect(response.statusCode).toEqual(204);
  });

  it('should return 409 if an org already exist', async () => {
    await request(app.server).post('/orgs').send({
      owner: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345678',
      address: 'John doe street 132',
      uf: 'RN',
      city: 'Natal',
      latitude: -50.46321,
      longitude: -32.62123,
      cellphone: '999999999',
      password: '123456',
    });

    const response = await request(app.server).post('/orgs').send({
      owner: 'John Doe',
      email: 'johndoe@example.com',
      cep: '12345678',
      address: 'John doe street 132',
      uf: 'RN',
      city: 'Natal',
      latitude: -50.46321,
      longitude: -32.62123,
      cellphone: '999999999',
      password: '123456',
    });

    expect(response.statusCode).toEqual(409);
  });
});
