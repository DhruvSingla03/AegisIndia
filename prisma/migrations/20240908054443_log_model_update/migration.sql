/*
  Warnings:

  - You are about to drop the column `data` on the `Log` table. All the data in the column will be lost.
  - Added the required column `requestData` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseData` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `success` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "data",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "requestData" JSONB NOT NULL,
ADD COLUMN     "responseData" JSONB NOT NULL,
ADD COLUMN     "success" BOOLEAN NOT NULL;
