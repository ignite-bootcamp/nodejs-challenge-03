import { Org, Prisma } from '@prisma/client';

export interface FindManyProps {
  city?: string;
}

export interface OrgsRepository {
  create(org: Prisma.OrgCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
  findById(id: string): Promise<Org | null>;
  findMany(props: FindManyProps): Promise<Org[]>;
}
