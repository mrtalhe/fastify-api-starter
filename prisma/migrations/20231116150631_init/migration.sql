/*
  Warnings:

  - You are about to drop the column `resetExpire2` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetExpire2",
ADD COLUMN     "resetExpire" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
