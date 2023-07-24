import { prisma } from '@/lib/prisma';
import { FindManyProps, OrgsRepository } from '../orgs-repository';
import { Prisma } from '@prisma/client';

export class PrismaOrgsRepository implements OrgsRepository {
  async findMany({ city }: FindManyProps) {
    return await prisma.org.findMany({
      where: {
        city,
      },
    });
  }

  async findById(id: string) {
    return await prisma.org.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await prisma.org.findUnique({
      where: {
        email,
      },
    });
  }

  async create(org: Prisma.OrgCreateInput) {
    return await prisma.org.create({
      data: org,
    });
  }
}
