import { Prisma, Org } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { FindManyProps, OrgsRepository } from '@/repositories/orgs-repository';

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(org: Prisma.OrgCreateInput) {
    const newOrg: Org = {
      ...org,
      created_at: new Date(),
      id: randomUUID(),
      latitude: new Prisma.Decimal(org.latitude.toString()),
      longitude: new Prisma.Decimal(org.longitude.toString()),
    };

    this.items.push(newOrg);

    return newOrg;
  }

  async findByEmail(email: string) {
    return this.items.find(item => item.email.includes(email)) ?? null;
  }

  async findById(id: string): Promise<Org | null> {
    return this.items.find(item => item.id === id) ?? null;
  }

  async findMany({ city }: FindManyProps) {
    return this.items.filter(item => {
      if (city) {
        return item.city.includes(city);
      }

      return item;
    });
  }
}
