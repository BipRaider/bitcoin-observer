/*
  Warnings:

  - You are about to drop the column `coin` on the `CriptoCoin` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `CriptoCoin` table. All the data in the column will be lost.
  - The `price` column on the `CriptoCoin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CriptoCoin" DROP COLUMN "coin",
DROP COLUMN "currency",
ADD COLUMN     "coinId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "symbol" TEXT NOT NULL DEFAULT '',
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;
