/*
  Warnings:

  - You are about to drop the `CriptoCoin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CriptoCoin";

-- CreateTable
CREATE TABLE "CryptoCoin" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coinId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "symbol" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "interval" "IntervalEnum" NOT NULL DEFAULT 'ONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CryptoCoin_pkey" PRIMARY KEY ("id")
);
