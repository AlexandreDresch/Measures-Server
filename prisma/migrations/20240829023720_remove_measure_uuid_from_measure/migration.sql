/*
  Warnings:

  - You are about to drop the column `measureUUID` on the `Measure` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Measure_measureUUID_key";

-- AlterTable
ALTER TABLE "Measure" DROP COLUMN "measureUUID";
