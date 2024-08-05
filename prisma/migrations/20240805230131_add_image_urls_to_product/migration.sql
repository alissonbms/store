/*
  Warnings:

  - You are about to drop the column `imagesUrl` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imagesUrl",
ADD COLUMN     "imageUrls" TEXT[];
