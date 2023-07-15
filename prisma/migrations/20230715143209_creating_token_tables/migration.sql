/*
  Warnings:

  - You are about to drop the column `access_token` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `access_token_expiry` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token_expiry` on the `tokens` table. All the data in the column will be lost.
  - Added the required column `token` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_user_id_fkey";

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "access_token",
DROP COLUMN "access_token_expiry",
DROP COLUMN "refresh_token",
DROP COLUMN "refresh_token_expiry",
ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "revoked_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "revoked_tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
