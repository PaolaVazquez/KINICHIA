import { apiFetch } from "./api";

export interface Conversation {
  id: string;
  companyId: string;
  source: string;
  contactName: string;
  contactIdentifier: string;
  status: string;
  lastMessage: string | null;
  lastMessageAt: string | null;
  lastAnalyzedAt: string | null;
}

export interface Message {
  id: string;
  sender: "CLIENT" | "COMPANY";
  content: string;
  sentAt: string;
}

export interface AnalysisSignal {
  type: string;
  severity: string;
  score: number;
  evidence: string;
  recommendation: string;
}

export interface Analysis {
  id: string;
  conversationId: string;
  riskLevel: string;
  score: number;
  summary: string;
  reasons: string[];
  recommendations: string[];
  provider: string;
  modelName: string;
  engineVersion: string;
  analyzedAt: string;
}

export interface ConversationDetail extends Conversation {
  messages: Message[];
  analysis: Analysis[];
}

export async function getConversations(
  search?: string,
): Promise<Conversation[]> {
  const query = search?.trim()
    ? `?search=${encodeURIComponent(search.trim())}`
    : "";

  return apiFetch<Conversation[]>(`/conversations${query}`);
}

export async function getConversation(id: string): Promise<ConversationDetail> {
  return apiFetch<ConversationDetail>(`/conversations/${id}`);
}
