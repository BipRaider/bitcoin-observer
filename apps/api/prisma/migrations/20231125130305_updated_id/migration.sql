/*
  Warnings:

  - The primary key for the `CoinOptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CryptoCoin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CoinOptions" DROP CONSTRAINT "CoinOptions_userId_fkey";

-- AlterTable
ALTER TABLE "CoinOptions" DROP CONSTRAINT "CoinOptions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CoinOptions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CoinOptions_id_seq";

-- AlterTable
ALTER TABLE "CryptoCoin" DROP CONSTRAINT "CryptoCoin_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CryptoCoin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CryptoCoin_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "CoinOptions" ADD CONSTRAINT "CoinOptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
