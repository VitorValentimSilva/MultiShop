/*
  Warnings:

  - You are about to drop the column `interval` on the `Plan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripePriceId]` on the table `PlanPrice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[planId,currency,interval]` on the table `PlanPrice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PlanPrice_planId_currency_key";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "interval";

-- AlterTable
ALTER TABLE "PlanFeature" ADD COLUMN     "limitUnit" TEXT,
ADD COLUMN     "limitValue" INTEGER;

-- AlterTable
ALTER TABLE "PlanPrice" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "interval" "BillingInterval" NOT NULL DEFAULT 'MONTH';

-- CreateIndex
CREATE UNIQUE INDEX "PlanPrice_stripePriceId_key" ON "PlanPrice"("stripePriceId");

-- CreateIndex
CREATE INDEX "PlanPrice_stripePriceId_idx" ON "PlanPrice"("stripePriceId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanPrice_planId_currency_interval_key" ON "PlanPrice"("planId", "currency", "interval");
