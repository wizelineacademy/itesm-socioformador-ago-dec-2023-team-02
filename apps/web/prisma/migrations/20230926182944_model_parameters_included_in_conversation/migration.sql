/*
  Warnings:

  - You are about to drop the `ConversationParameters` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `parameters` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `globalParameters` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConversationParameters" DROP CONSTRAINT "ConversationParameters_idConversation_fkey";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "parameters" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "globalParameters" JSONB NOT NULL;

-- DropTable
DROP TABLE "ConversationParameters";
