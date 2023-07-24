import { Prisma } from '@prisma/client';
import { ImagesRepository } from '../images-repository';
import { prisma } from '@/lib/prisma';

export class PrismaImagesRepository implements ImagesRepository {
  async create(image: Prisma.ImageUncheckedCreateInput) {
    return await prisma.image.create({
      data: image,
    });
  }
}
