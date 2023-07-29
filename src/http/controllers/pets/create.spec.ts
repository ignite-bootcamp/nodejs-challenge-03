import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateOrg } from '@/utils/test/createAndAuthenticateOrg';

describe('Create pet controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a pet', async () => {
    const { token, id } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post(`/pets/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'jorginho',
        about: 'cachorro sapeca',
        age: 'NEW_BORN',
        size: 'SMALL',
        energy: 'LOW',
        requirements: ['precisa dormir muito'],
        images: [
          {
            publicId: 'image-id',
            format: 'png',
            version: '1',
          },
        ],
      });

    expect(response.statusCode).toEqual(204);
  });
});
