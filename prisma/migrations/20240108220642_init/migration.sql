/*
  Warnings:

  - You are about to drop the column `prescriptionName` on the `Medicine` table. All the data in the column will be lost.
  - Added the required column `prescriptionType` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "prescriptionName",
ADD COLUMN     "prescriptionType" TEXT NOT NULL;
