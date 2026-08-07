/*
  Warnings:

  - You are about to drop the column `text_taille` on the `configurations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "configurations" DROP COLUMN "text_taille",
ADD COLUMN     "number_taille" INTEGER;
