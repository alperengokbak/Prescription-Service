/*
  Warnings:

  - A unique constraint covering the columns `[idNumber]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_idNumber_key" ON "Client"("idNumber");
