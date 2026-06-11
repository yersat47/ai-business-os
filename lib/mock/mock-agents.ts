import type { Agent } from "@/lib/types/agents.types";

export const MOCK_AGENTS: Agent[] = [
  {
    id: "ceo",
    name: "AI CEO",
    role: "Strategic Advisor",
    description:
      "Synthesizes all business intelligence into executive decisions",
    icon: "⬡",
    color: "#C9923A",
    status: "active",
    lastActivity: "2 min ago",
    specialty: ["Strategy", "Risk", "Opportunities"],
    currentTask: "Preparing monthly executive briefing",
  },
  {
    id: "analyst",
    name: "AI Analyst",
    role: "Business Intelligence",
    description:
      "Monitors KPIs, detects anomalies, surfaces insights from data",
    icon: "◈",
    color: "#3498DB",
    status: "active",
    lastActivity: "5 min ago",
    specialty: ["KPIs", "Trends", "Forecasting"],
    currentTask: "Analyzing dead stock patterns",
  },
  {
    id: "marketer",
    name: "AI Marketer",
    role: "Marketing & Growth",
    description:
      "Plans campaigns, optimizes CAC, manages acquisition funnels",
    icon: "◎",
    color: "#E74C3C",
    status: "active",
    lastActivity: "12 min ago",
    specialty: ["Instagram", "CAC", "Campaigns"],
    currentTask: "Building clearance campaign plan",
  },
  {
    id: "accountant",
    name: "AI Accountant",
    role: "Financial Control",
    description:
      "Tracks margins, cash flow, expenses, and financial health",
    icon: "◇",
    color: "#2ECC71",
    status: "active",
    lastActivity: "1 hr ago",
    specialty: ["Margins", "Cash Flow", "Expenses"],
    currentTask: "Monthly expense analysis",
  },
  {
    id: "manager",
    name: "AI Manager",
    role: "Operations & Team",
    description:
      "Coordinates tasks, tracks team performance, manages processes",
    icon: "◉",
    color: "#9B59B6",
    status: "active",
    lastActivity: "3 hr ago",
    specialty: ["Tasks", "Team", "SOP"],
    currentTask: "Reviewing team targets for June",
  },
  {
    id: "smm",
    name: "AI SMM",
    role: "Social Media & Content",
    description:
      "Plans content calendar, analyzes engagement, drives organic reach",
    icon: "◫",
    color: "#F39C12",
    status: "active",
    lastActivity: "30 min ago",
    specialty: ["Instagram", "Content", "Engagement"],
    currentTask: "Creating June content calendar",
  },
];
