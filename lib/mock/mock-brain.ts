export const MOCK_BRAIN = {
  coveragePct: 34,
  documentsCount: 7,
  knowledgeItemsCount: 43,
  categories: [
    { id: "products", count: 18, pct: 42 },
    { id: "sales", count: 12, pct: 28 },
    { id: "marketing", count: 8, pct: 19 },
    { id: "team", count: 5, pct: 11 },
  ],
  recentItems: [
    {
      id: "catalog",
      type: "document",
      date: "2026-06-01",
      categoryId: "products",
    },
    {
      id: "ads",
      type: "report",
      date: "2026-05-28",
      categoryId: "marketing",
    },
    {
      id: "pricing",
      type: "document",
      date: "2026-05-20",
      categoryId: "sales",
    },
    {
      id: "onboarding",
      type: "process",
      date: "2026-05-10",
      categoryId: "team",
    },
  ],
  missingAreas: ["feedback", "financials", "suppliers", "history"],
};
