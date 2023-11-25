/*
  Warnings:

  - The `interval` column on the `CoinOptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `interval` column on the `CriptoCoin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IntervalEnum" AS ENUM ('ONE', 'THIRTY', 'SIXTY');

-- AlterTable
ALTER TABLE "CoinOptions" DROP COLUMN "interval",
ADD COLUMN     "interval" "IntervalEnum" NOT NULL DEFAULT 'ONE';

-- AlterTable
ALTER TABLE "CriptoCoin" DROP COLUMN "interval",
ADD COLUMN     "interval" "IntervalEnum" NOT NULL DEFAULT 'ONE';

-- DropEnum
DROP TYPE "Interval";
