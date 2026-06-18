export const MOCK_BRAIN = {
  coveragePct: 34,
  documentsCount: 7,
  knowledgeItemsCount: 43,
  categories: [
    { name: "Products & Inventory", count: 18, pct: 42 },
    { name: "Sales & Pricing", count: 12, pct: 28 },
    { name: "Marketing & Campaigns", count: 8, pct: 19 },
    { name: "Team & Processes", count: 5, pct: 11 },
  ],
  recentItems: [
    {
      title: "Product Catalogue Spring 2026",
      type: "document",
      date: "2026-06-01",
      category: "Products",
    },
    {
      title: "Instagram Ads Performance Q1",
      type: "report",
      date: "2026-05-28",
      category: "Marketing",
    },
    {
      title: "Pricing Rules 2026",
      type: "document",
      date: "2026-05-20",
      category: "Sales",
    },
    {
      title: "Staff Onboarding SOP",
      type: "process",
      date: "2026-05-10",
      category: "Team",
    },
  ],
  missingAreas: [
    "Customer feedback / reviews",
    "Financial statements",
    "Supplier contracts",
    "Historical sales data",
  ],
};
