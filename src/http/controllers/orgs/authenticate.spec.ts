import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Authenticate org controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should authenticate an org', async () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });

  it('should return return invalid credentials error', async () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '12345',
    });

    expect(response.statusCode).toEqual(400);
  });
});
