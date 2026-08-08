-- DropIndex
DROP INDEX "public"."Analysis_conversationId_key";

-- CreateIndex
CREATE INDEX "Analysis_conversationId_idx" ON "public"."Analysis"("conversationId");
