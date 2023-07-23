import { Prisma, Image } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { ImagesRepository } from '@/repositories/images-repository';

export class InMemoryImagesRepository implements ImagesRepository {
  public items: Image[] = [];

  async create(pet: Prisma.ImageUncheckedCreateInput) {
    const newImage: Image = {
      id: randomUUID(),
      format: pet.format,
      version: pet.version,
      pet_id: pet.pet_id,
      publicId: pet.publicId,
    };

    this.items.push(newImage);

    return newImage;
  }
}
