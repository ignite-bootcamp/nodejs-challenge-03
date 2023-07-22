import { Org, Prisma } from '@prisma/client';

export interface OrgsRepository {
  create(org: Prisma.OrgCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
}
