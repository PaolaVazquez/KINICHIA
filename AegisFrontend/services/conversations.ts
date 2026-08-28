import { apiFetch } from "./api";

export interface UrlAnalysis {
  url: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  score: number;
  signals: string[];
  recommendations: string[];
  domain: string | null;
  protocol: string | null;
}

export interface SearchMatch {
  id: string;
  content: string;
  sender: string;
  sentAt: string;
}

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
  searchMatches: SearchMatch[];
}

export interface ConversationStats {
  all: number;
  active: number;
  threats: number;
  resolved: number;
}

export async function getConversationStats(): Promise<ConversationStats> {
  return apiFetch<ConversationStats>("/conversations/stats");
}

export interface Message {
  id: string;
  sender: "CLIENT" | "COMPANY";
  content: string;
  sentAt: string;
  urls: string[];
  urlAnalysis: UrlAnalysis[];
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
  filter?: string,
): Promise<Conversation[]> {
  const params = new URLSearchParams();

  if (search?.trim()) {
    params.append("search", search.trim());
  }

  if (filter && filter !== "all") {
    params.append("filter", filter);
  }

  const query = params.toString();

  return apiFetch<Conversation[]>(`/conversations${query ? `?${query}` : ""}`);
}

export async function getConversation(id: string): Promise<ConversationDetail> {
  return apiFetch<ConversationDetail>(`/conversations/${id}`);
}
