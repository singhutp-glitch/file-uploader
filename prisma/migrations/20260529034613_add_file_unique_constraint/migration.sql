/*
  Warnings:

  - A unique constraint covering the columns `[folderId,originalName]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_folderId_originalName_key" ON "File"("folderId", "originalName");
