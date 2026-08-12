import { apiFetch } from "./api";

export interface Conversation {
  id: string;
  companyId: string;
  source: string;
  contactName: string;
  contactIdentifier: string;
  status: string;
  lastMessageAt: string | null;
  lastAnalyzedAt: string | null;
}

export async function getConversations(): Promise<Conversation[]> {
  return apiFetch("/conversations");
}
