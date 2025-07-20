/*
  Warnings:

  - You are about to drop the column `answers` on the `Response` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "successText" TEXT,
ADD COLUMN     "theme" TEXT;

-- AlterTable
ALTER TABLE "FormBlock" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "placeholder" TEXT,
ALTER COLUMN "required" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "answers";

-- CreateTable
CREATE TABLE "ResponseItem" (
    "id" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,
    "blockId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ResponseItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResponseItem" ADD CONSTRAINT "ResponseItem_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponseItem" ADD CONSTRAINT "ResponseItem_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "FormBlock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
