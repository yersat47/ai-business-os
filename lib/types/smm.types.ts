export type SmmContentType = "product" | "story" | "reel" | "promo";

export interface SmmScheduledPost {
  date: string;
  type: SmmContentType;
  label: string;
  recommendation: string;
}

export interface SmmAgentOutput {
  content_recommendations: string[];
  posting_schedule: SmmScheduledPost[];
}
