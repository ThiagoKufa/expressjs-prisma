/*
  Warnings:

  - The primary key for the `ResponseType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `ResponseType` table. All the data in the column will be lost.
  - The primary key for the `entry_sheets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `entry_sheets` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `users` table. All the data in the column will be lost.
  - The required column `id` was added to the `ResponseType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `entry_sheets` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "entry_sheets" DROP CONSTRAINT "entry_sheets_userId_fkey";

-- AlterTable
ALTER TABLE "ResponseType" DROP CONSTRAINT "ResponseType_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ResponseType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "entry_sheets" DROP CONSTRAINT "entry_sheets_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "entry_sheets_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "entry_sheets" ADD CONSTRAINT "entry_sheets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
