/*
  Warnings:

  - You are about to drop the column `resetExpire` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetExpire",
ADD COLUMN     "resetExpire2" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
