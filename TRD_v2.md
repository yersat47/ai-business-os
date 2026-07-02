# TRD v2 — Health Scoring & Data Completeness

Date: 2026-06-26

## 11.1 Score architecture (canonical)

### Pillars (7)

| Pillar | Weight |
|---|---:|
| Financial | 30% |
| Sales | 25% |
| Customer | 15% |
| Marketing | 10% |
| Inventory | 10% |
| Team | 7% |
| Operations | 3% |
| **Total** | **100%** |

### Master score formula

Master Score \(0–100\):

\[
\text{Master} = \sum (\text{pillarScore} \times \text{weight})
\]

### AI Readiness (removed)

AI Readiness is **not** part of BHS scoring. It is replaced by a **Data Completeness** widget that turns missing data into concrete actions.

## Data Completeness module

### Interface

```ts
interface DataCompletenessResult {
  overall_percent: number; // 0–100
  missing_fields: Array<{
    field_key: string;
    display_name: string;
    impact_on_advice_quality: "high" | "medium" | "low";
    integration_source?: "kaspi" | "instagram" | "manual";
  }>;
  quick_wins: Array<{
    field_key: string;
    display_name: string;
    estimated_time_to_add_minutes: number;
  }>;
}
```

### UI rules

- Shown as “Data Completeness” widget (action-oriented)
- Hidden when completeness ≥ 90%
- Copy adapts to completeness buckets (0–29, 30–59, 60–89, 90–100)

