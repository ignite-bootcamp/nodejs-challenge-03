/*
  Warnings:

  - You are about to drop the column `petId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `pets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_petId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgId_fkey";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "orgId",
ADD COLUMN     "org_id" TEXT;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
