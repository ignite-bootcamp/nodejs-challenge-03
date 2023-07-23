import { Org } from '@prisma/client';
import { hash } from 'bcryptjs';

import { OrgsRepository } from '@/repositories/orgs-repository';
import { OrgAlreadyExistsError } from './errors/org-already-exists-error';

interface RegisterOrgUseCaseRequest {
  owner: string;
  email: string;
  cep: string;
  address: string;
  uf: string;
  city: string;
  latitude: number;
  longitude: number;
  cellphone: string;
  password: string;
}

interface RegisterOrgUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    request: RegisterOrgUseCaseRequest,
  ): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(request.password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(
      request.email,
    );

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      ...request,
      password_hash,
    });

    return {
      org,
    };
  }
}
