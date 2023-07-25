/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenExpiry` on the `tokens` table. All the data in the column will be lost.
  - Added the required column `refresh_token` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token_expiry` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userId_fkey";

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "refreshToken",
DROP COLUMN "refreshTokenExpiry",
ADD COLUMN     "refresh_token" TEXT NOT NULL,
ADD COLUMN     "refresh_token_expiry" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
