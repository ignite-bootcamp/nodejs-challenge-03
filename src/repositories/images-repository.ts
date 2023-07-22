import { Image, Prisma } from '@prisma/client';

export interface ImagesRepository {
  create(image: Prisma.ImageUncheckedCreateInput): Promise<Image>;
}
