/*
  Warnings:

  - You are about to drop the `Medicine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `medicine` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_prescriptionId_fkey";

-- AlterTable
ALTER TABLE "Prescription" ADD COLUMN     "medicine" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Medicine";
