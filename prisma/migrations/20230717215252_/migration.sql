/*
  Warnings:

  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
