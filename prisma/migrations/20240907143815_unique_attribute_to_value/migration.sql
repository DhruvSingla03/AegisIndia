/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Key` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Key_value_key" ON "Key"("value");
