export type AgentId =
  | "analyst"
  | "marketer"
  | "accountant"
  | "manager"
  | "smm"
  | "administrator";

export interface AgentMessage {
  id: string;
  agentId: AgentId;
  text: string;
  sourceCitations: string[];
  suggestedActions: string[];
  timestamp: string;
  priority: number;
}
