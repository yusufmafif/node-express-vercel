/*
  Warnings:

  - You are about to drop the column `uuid` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `TransactionDetails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productName` to the `TransactionDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionDetails" DROP CONSTRAINT "TransactionDetails_productId_fkey";

-- DropIndex
DROP INDEX "Product_uuid_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "TransactionDetails" DROP COLUMN "productId",
ADD COLUMN     "productName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- AddForeignKey
ALTER TABLE "TransactionDetails" ADD CONSTRAINT "TransactionDetails_productName_fkey" FOREIGN KEY ("productName") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
