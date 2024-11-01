/*
  Warnings:

  - You are about to alter the column `comment_count` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "comment_count" SET DATA TYPE INTEGER;
