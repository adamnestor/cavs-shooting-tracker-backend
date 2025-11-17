-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "testType" TEXT NOT NULL DEFAULT 'standard';

-- CreateTable
CREATE TABLE "ZoneStat" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "zoneStats" TEXT NOT NULL,
    "made" INTEGER NOT NULL,
    "shots" INTEGER NOT NULL,

    CONSTRAINT "ZoneStat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ZoneStat" ADD CONSTRAINT "ZoneStat_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
