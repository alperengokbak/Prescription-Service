/*
  Warnings:

  - You are about to drop the column `medicine` on the `Prescription` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Prescription` table. All the data in the column will be lost.
  - Added the required column `medicineId` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "medicine",
DROP COLUMN "price",
ADD COLUMN     "medicineId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Medicine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
