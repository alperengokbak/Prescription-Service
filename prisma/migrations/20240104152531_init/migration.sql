/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `Pharmacy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pharmacy_userName_key" ON "Pharmacy"("userName");
