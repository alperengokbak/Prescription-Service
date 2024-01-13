/*
  Warnings:

  - You are about to drop the column `idCardNumber` on the `Client` table. All the data in the column will be lost.
  - Added the required column `idNumber` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "idCardNumber",
ADD COLUMN     "idNumber" TEXT NOT NULL;
