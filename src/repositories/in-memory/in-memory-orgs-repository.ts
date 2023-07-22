import { Prisma, Org } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { OrgsRepository } from '@/repositories/orgs-repository';

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(org: Prisma.OrgCreateInput): Promise<Org> {
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

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find(item => item.email.includes(email)) ?? null;
  }
}
