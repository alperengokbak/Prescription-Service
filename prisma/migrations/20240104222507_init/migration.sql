/*
  Warnings:

  - You are about to drop the column `userName` on the `Pharmacy` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Pharmacy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Pharmacy` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pharmacy_userName_key";

-- AlterTable
ALTER TABLE "Pharmacy" DROP COLUMN "userName",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacy_username_key" ON "Pharmacy"("username");
