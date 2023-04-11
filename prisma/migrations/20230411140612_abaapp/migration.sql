/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todo";

-- CreateTable
CREATE TABLE "users" (
    "_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "entry_sheets" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stimuli" TEXT[],
    "numAttempts" INTEGER NOT NULL,
    "responses" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),

    CONSTRAINT "entry_sheets_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ResponseType" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResponseType_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResponseType_name_key" ON "ResponseType"("name");

-- AddForeignKey
ALTER TABLE "entry_sheets" ADD CONSTRAINT "entry_sheets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
