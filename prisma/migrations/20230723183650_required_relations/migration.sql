/*
  Warnings:

  - Made the column `pet_id` on table `images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `org_id` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_id_fkey";

-- AlterTable
ALTER TABLE "images" ALTER COLUMN "pet_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "org_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
