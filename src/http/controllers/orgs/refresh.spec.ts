import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Refresh token', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh token', async () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    const cookies = authResponse.get('Set-Cookie');

    const response = await request(app.server)
      .post('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.statusCode).toEqual(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});
