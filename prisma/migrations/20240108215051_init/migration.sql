/*
  Warnings:

  - A unique constraint covering the columns `[barcode]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `atcCode` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atcName` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barcode` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prescriptionName` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "atcCode" TEXT NOT NULL,
ADD COLUMN     "atcName" TEXT NOT NULL,
ADD COLUMN     "barcode" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "prescriptionName" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_barcode_key" ON "Medicine"("barcode");
