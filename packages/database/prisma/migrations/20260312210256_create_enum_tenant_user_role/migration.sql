/*
  Warnings:

  - The `role` column on the `TenantUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[tenantId,clerkUserId]` on the table `TenantUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TenantUserRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'GUEST');

-- DropIndex
DROP INDEX "TenantUser_clerkUserId_key";

-- AlterTable
ALTER TABLE "TenantUser" DROP COLUMN "role",
ADD COLUMN     "role" "TenantUserRole" NOT NULL DEFAULT 'MEMBER';

-- CreateIndex
CREATE UNIQUE INDEX "TenantUser_tenantId_clerkUserId_key" ON "TenantUser"("tenantId", "clerkUserId");
