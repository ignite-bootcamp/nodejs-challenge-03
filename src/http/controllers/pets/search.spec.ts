import { beforeEach, expect, describe, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateOrg } from '@/utils/test/createAndAuthenticateOrg';
import { prisma } from '@/lib/prisma';

describe('Search pet controller', () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(async () => {
    await prisma.pet.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search pets by city', async () => {
    const { token, id } = await createAndAuthenticateOrg(app);

    await prisma.pet.create({
      data: {
        name: 'jorginho',
        about: 'cachorro sapeca',
        age: 'NEW_BORN',
        size: 'SMALL',
        energy: 'LOW',
        requirements: ['precisa dormir muito'],
        org_id: id,
      },
    });

    const response = await request(app.server)
      .get(`/pets/search/natal`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual([
      expect.objectContaining({
        name: 'jorginho',
      }),
    ]);
  });

  it('should be able to filter pets by age', async () => {
    const { token, id } = await createAndAuthenticateOrg(app);

    await prisma.pet.create({
      data: {
        name: 'jorginho',
        about: 'cachorro sapeca',
        age: 'NEW_BORN',
        size: 'SMALL',
        energy: 'LOW',
        requirements: ['precisa dormir muito'],
        org_id: id,
      },
    });

    await prisma.pet.create({
      data: {
        name: 'carlinhos',
        about: 'cachorro calmo',
        age: 'OLD',
        size: 'LARGE',
        energy: 'HIGH',
        requirements: ['precisa dormir muito'],
        org_id: id,
      },
    });

    const response = await request(app.server)
      .get(`/pets/search/natal`)
      .query({
        age: 'OLD',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual([
      expect.objectContaining({
        name: 'carlinhos',
      }),
    ]);
  });

  it('should be able to filter pets by size', async () => {
    const { token, id } = await createAndAuthenticateOrg(app);

    await prisma.pet.create({
      data: {
        name: 'jorginho',
        about: 'cachorro sapeca',
        age: 'NEW_BORN',
        size: 'SMALL',
        energy: 'LOW',
        requirements: ['precisa dormir muito'],
        org_id: id,
      },
    });

    await prisma.pet.create({
      data: {
        name: 'carlinhos',
        about: 'cachorro calmo',
        age: 'OLD',
        size: 'LARGE',
        energy: 'HIGH',
        requirements: ['precisa dormir muito'],
        org_id: id,
      },
    });

    const response = await request(app.server)
      .get(`/pets/search/natal`)
      .query({
        size: 'LARGE',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual([
      expect.objectContaining({
        name: 'carlinhos',
      }),
    ]);
  });

  it('should be able to filter pets by energy', async () => {
    const { token, id } = await createAndAuthenticateOrg(app);

    await prisma.pet.create({
      data: {
        name: 'jorginho',
        about: 'cachorro sapeca',
        age: 'NEW_BORN',
        size: 'SMALL',
        energy: 'LOW',
        requirements: ['precisa dormir muito'],
        org_id: id,
      },
    });

    await prisma.pet.create({
      data: {
        name: 'carlinhos',
        about: 'cachorro calmo',
        age: 'OLD',
        size: 'LARGE',
        energy: 'HIGH',
        requirements: ['precisa dormir muito'],
        org_id: id,
      },
    });

    const response = await request(app.server)
      .get(`/pets/search/natal`)
      .query({
        energy: 'HIGH',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual([
      expect.objectContaining({
        name: 'carlinhos',
      }),
    ]);
  });
});
