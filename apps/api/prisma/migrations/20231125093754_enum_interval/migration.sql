/*
  Warnings:

  - The `interval` column on the `CriptoCoin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Interval" AS ENUM ('ONE', 'THIRTY', 'SIXTY');

-- AlterTable
ALTER TABLE "CoinOptions" ADD COLUMN     "interval" "Interval" NOT NULL DEFAULT 'ONE';

-- AlterTable
ALTER TABLE "CriptoCoin" DROP COLUMN "interval",
ADD COLUMN     "interval" "Interval" NOT NULL DEFAULT 'ONE';
