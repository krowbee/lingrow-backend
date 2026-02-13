/*
  Warnings:

  - Changed the type of `theory` on the `Lesson` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "theory",
ADD COLUMN     "theory" JSONB NOT NULL;
