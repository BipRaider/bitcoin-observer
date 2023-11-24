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
    "upperPrice" INTEGER NOT NULL DEFAULT 0,
    "middlePrice" INTEGER NOT NULL DEFAULT 0,
    "lowerPrice" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CoinOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CriptoCoin" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "coin" TEXT NOT NULL,
    "interval" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CriptoCoin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CriptoCoinToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_email_key" ON "User"("username", "email");

-- CreateIndex
CREATE UNIQUE INDEX "CoinOptions_userId_key" ON "CoinOptions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_CriptoCoinToUser_AB_unique" ON "_CriptoCoinToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CriptoCoinToUser_B_index" ON "_CriptoCoinToUser"("B");

-- AddForeignKey
ALTER TABLE "CoinOptions" ADD CONSTRAINT "CoinOptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_CriptoCoinToUser" ADD CONSTRAINT "_CriptoCoinToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CriptoCoin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CriptoCoinToUser" ADD CONSTRAINT "_CriptoCoinToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
