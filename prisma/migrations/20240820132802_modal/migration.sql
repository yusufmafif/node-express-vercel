-- DropForeignKey
ALTER TABLE "TransactionDetails" DROP CONSTRAINT "TransactionDetails_transactionId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "capitalPrice" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "TransactionDetails" ADD CONSTRAINT "TransactionDetails_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
