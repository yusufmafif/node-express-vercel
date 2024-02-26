-- AlterTable
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "TransactionDetails" ADD CONSTRAINT "TransactionDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
