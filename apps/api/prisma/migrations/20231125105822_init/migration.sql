-- CreateEnum
CREATE TYPE "IntervalEnum" AS ENUM ('ONE', 'THIRTY', 'SIXTY');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinOptions" (
    "id" SERIAL NOT NULL,
    "coinNames" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "interval" "IntervalEnum" NOT NULL DEFAULT 'ONE',
    "upperPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "middlePrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lowerPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CoinOptions_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_email_key" ON "User"("username", "email");

-- CreateIndex
CREATE UNIQUE INDEX "CoinOptions_userId_key" ON "CoinOptions"("userId");

-- AddForeignKey
ALTER TABLE "CoinOptions" ADD CONSTRAINT "CoinOptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
