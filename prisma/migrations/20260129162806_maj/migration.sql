/*
  Warnings:

  - You are about to drop the column `number_page_id` on the `footers` table. All the data in the column will be lost.
  - You are about to drop the column `number_page_id` on the `headers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "footers" DROP CONSTRAINT "footers_number_page_id_fkey";

-- DropForeignKey
ALTER TABLE "headers" DROP CONSTRAINT "headers_number_page_id_fkey";

-- DropIndex
DROP INDEX "footers_number_page_id_key";

-- DropIndex
DROP INDEX "headers_number_page_id_key";

-- AlterTable
ALTER TABLE "footers" DROP COLUMN "number_page_id";

-- AlterTable
ALTER TABLE "headers" DROP COLUMN "number_page_id";
