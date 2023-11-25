/*
  Warnings:

  - Changed the type of `coinId` on the `CryptoCoin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CryptoCoin" DROP COLUMN "coinId",
ADD COLUMN     "coinId" INTEGER NOT NULL,
ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "symbol" DROP DEFAULT,
ALTER COLUMN "slug" DROP DEFAULT;
