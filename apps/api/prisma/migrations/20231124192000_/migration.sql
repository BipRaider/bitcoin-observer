/*
  Warnings:

  - You are about to drop the `_CriptoCoinToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CriptoCoinToUser" DROP CONSTRAINT "_CriptoCoinToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CriptoCoinToUser" DROP CONSTRAINT "_CriptoCoinToUser_B_fkey";

-- DropTable
DROP TABLE "_CriptoCoinToUser";
