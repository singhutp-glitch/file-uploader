/*
  Warnings:

  - You are about to drop the column `filename` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `filepath` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `File` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storedName` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "filename",
DROP COLUMN "filepath",
DROP COLUMN "mimetype",
ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "originalName" TEXT NOT NULL,
ADD COLUMN     "storedName" TEXT NOT NULL;
