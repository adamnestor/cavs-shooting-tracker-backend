/*
  Warnings:

  - You are about to drop the column `zoneStats` on the `ZoneStat` table. All the data in the column will be lost.
  - Added the required column `zone` to the `ZoneStat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ZoneStat" DROP COLUMN "zoneStats",
ADD COLUMN     "zone" TEXT NOT NULL;
