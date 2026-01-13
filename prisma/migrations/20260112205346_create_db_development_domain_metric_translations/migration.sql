/*
  Warnings:

  - Added the required column `updatedAt` to the `DomainMetric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DomainMetric" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "DomainMetricTranslation" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "metricId" TEXT NOT NULL,

    CONSTRAINT "DomainMetricTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DomainMetricTranslation_metricId_idx" ON "DomainMetricTranslation"("metricId");

-- CreateIndex
CREATE UNIQUE INDEX "DomainMetricTranslation_metricId_locale_key" ON "DomainMetricTranslation"("metricId", "locale");

-- AddForeignKey
ALTER TABLE "DomainMetricTranslation" ADD CONSTRAINT "DomainMetricTranslation_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "DomainMetric"("id") ON DELETE CASCADE ON UPDATE CASCADE;
