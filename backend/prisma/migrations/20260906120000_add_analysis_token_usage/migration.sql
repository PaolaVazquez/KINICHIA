-- Create optional token usage fields for Gemini cost tracking
ALTER TABLE "Analysis"
ADD COLUMN "promptTokenCount" INTEGER,
ADD COLUMN "candidatesTokenCount" INTEGER,
ADD COLUMN "thoughtsTokenCount" INTEGER,
ADD COLUMN "totalTokenCount" INTEGER;
