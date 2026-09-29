ALTER TABLE "Category" ADD COLUMN "imagePublicId" TEXT;
CREATE TABLE "ApiCost" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'XAF',
    "description" TEXT,
    "incurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ApiCost_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "ApiCost_incurredAt_idx" ON "ApiCost"("incurredAt");
CREATE INDEX "ApiCost_provider_idx" ON "ApiCost"("provider");
