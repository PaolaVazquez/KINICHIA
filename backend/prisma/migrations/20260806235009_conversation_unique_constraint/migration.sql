-- DropIndex
DROP INDEX "public"."Conversation_contactIdentifier_idx";

-- CreateIndex
CREATE INDEX "Conversation_companyId_source_contactIdentifier_idx" ON "public"."Conversation"("companyId", "source", "contactIdentifier");
