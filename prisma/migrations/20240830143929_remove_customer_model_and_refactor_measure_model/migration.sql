/*
  Warnings:

  - The primary key for the `Measure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customerId` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `hasConfirmed` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `measureDatetime` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `measureType` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `measureValue` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customer_code` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure_datetime` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure_type` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - The required column `measure_uuid` was added to the `Measure` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Measure" DROP CONSTRAINT "Measure_customerId_fkey";

-- AlterTable
ALTER TABLE "Measure" DROP CONSTRAINT "Measure_pkey",
DROP COLUMN "customerId",
DROP COLUMN "hasConfirmed",
DROP COLUMN "id",
DROP COLUMN "imageUrl",
DROP COLUMN "measureDatetime",
DROP COLUMN "measureType",
DROP COLUMN "measureValue",
ADD COLUMN     "customer_code" TEXT NOT NULL,
ADD COLUMN     "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "measure_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "measure_type" "MeasureType" NOT NULL,
ADD COLUMN     "measure_uuid" TEXT NOT NULL,
ADD COLUMN     "measure_value" INTEGER,
ADD CONSTRAINT "Measure_pkey" PRIMARY KEY ("measure_uuid");

-- DropTable
DROP TABLE "Customer";
