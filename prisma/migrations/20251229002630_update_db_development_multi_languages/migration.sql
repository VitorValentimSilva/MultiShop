/*
  Warnings:

  - You are about to drop the column `description` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `priceCents` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Plan` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Plan_key_idx";

-- DropIndex
DROP INDEX "Review_planId_idx";

-- DropIndex
DROP INDEX "Review_rating_idx";

-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "description",
DROP COLUMN "name",
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Permission" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "currency",
DROP COLUMN "description",
DROP COLUMN "priceCents",
DROP COLUMN "stripePriceId",
DROP COLUMN "subtitle",
DROP COLUMN "title",
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "locale" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "PermissionTranslation" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "PermissionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleTranslation" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "RoleTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanPrice" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "stripePriceId" TEXT,

    CONSTRAINT "PlanPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanTranslation" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "planId" TEXT NOT NULL,

    CONSTRAINT "PlanTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureTranslation" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "featureId" TEXT NOT NULL,

    CONSTRAINT "FeatureTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PermissionTranslation_permissionId_locale_key" ON "PermissionTranslation"("permissionId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "RoleTranslation_roleId_locale_key" ON "RoleTranslation"("roleId", "locale");

-- CreateIndex
CREATE INDEX "PlanPrice_planId_idx" ON "PlanPrice"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanPrice_planId_currency_key" ON "PlanPrice"("planId", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "PlanTranslation_planId_locale_key" ON "PlanTranslation"("planId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureTranslation_featureId_locale_key" ON "FeatureTranslation"("featureId", "locale");

-- AddForeignKey
ALTER TABLE "PermissionTranslation" ADD CONSTRAINT "PermissionTranslation_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleTranslation" ADD CONSTRAINT "RoleTranslation_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanPrice" ADD CONSTRAINT "PlanPrice_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanTranslation" ADD CONSTRAINT "PlanTranslation_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureTranslation" ADD CONSTRAINT "FeatureTranslation_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
