/*
  Warnings:

  - Made the column `resetExpire` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resetToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "resetExpire" SET NOT NULL,
ALTER COLUMN "resetExpire" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "resetToken" SET NOT NULL;
