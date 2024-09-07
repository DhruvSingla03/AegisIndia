-- DropForeignKey
ALTER TABLE "Key" DROP CONSTRAINT "Key_userId_fkey";

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
