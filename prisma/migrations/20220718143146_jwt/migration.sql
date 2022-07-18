-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "blacklistedTokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "blacklistedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "blacklistedTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blacklistedTokens" ADD CONSTRAINT "blacklistedTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
