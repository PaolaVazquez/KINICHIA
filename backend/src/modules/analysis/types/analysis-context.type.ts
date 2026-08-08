export type AnalysisContext = {
  source: string;
  contactName: string | null;
  contactIdentifier: string;
  messages: {
    sender: string;
    content: string;
    sentAt: Date;
  }[];
};
