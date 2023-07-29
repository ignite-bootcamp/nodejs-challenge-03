import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateOrg } from '@/utils/test/createAndAuthenticateOrg';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'node:crypto';

describe('Find pet controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should find create a pet', async () => {
    const { token, id } = await createAndAuthenticateOrg(app);
    const petId = randomUUID();

    await prisma.pet.create({
      data: {
        name: 'jorginho',
        about: 'cachorro sapeca',
        age: 'NEW_BORN',
        size: 'SMALL',
        energy: 'LOW',
        requirements: ['precisa dormir muito'],
        id: petId,
        org_id: id,
      },
    });

    const response = await request(app.server)
      .get(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: petId,
      }),
    );
  });

  it('should return 404 if pet dont exist', async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .get(`/pets/${randomUUID()}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(404);
  });
});
