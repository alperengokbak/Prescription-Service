/*
  Warnings:

  - You are about to drop the column `pharmacyId` on the `Medicine` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_pharmacyId_fkey";

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "pharmacyId";
