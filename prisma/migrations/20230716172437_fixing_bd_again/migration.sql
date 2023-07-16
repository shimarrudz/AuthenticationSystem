/*
  Warnings:

  - You are about to drop the column `user` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `refresh_tokens` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_fkey";

-- AlterTable
ALTER TABLE "refresh_tokens" DROP COLUMN "user",
DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
