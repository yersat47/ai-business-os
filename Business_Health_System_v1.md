# Business Health System v1

Date: 2026-06-26

## Scope (v1)

The Business Health System (BHS) calculates a **master health score** as a weighted sum of 7 pillars.

**Important:** BHS is about *business health* (sales, cash, inventory, etc.). It does **not** include AI Readiness as a pillar. Data availability is handled separately via the **Data Completeness widget**.

## Pillars and weights (canonical)

| # | Pillar | Weight | Key question |
|---|---|---:|---|
| 1 | Financial Health | 30% | Are the numbers healthy? |
| 2 | Sales Health | 25% | Is revenue growing? |
| 3 | Customer Health | 15% | Are customers staying? |
| 4 | Marketing Health | 10% | Is acquisition efficient? |
| 5 | Inventory Health | 10% | Is stock working? |
| 6 | Team Health | 7% | Is the team productive? |
| 7 | Operations Health | 3% | Are operations stable? |
| — | **Total** | **100%** | — |

## Master score

Master Score \(0–100\) is computed as:

\[
\text{Master} = \sum_{i=1}^{7} (\text{pillarScore}_i \times \text{weight}_i)
\]

Optional confidence multiplier may be applied based on data completeness (product-level accuracy hint), but **it does not add a pillar**.

## Data Completeness widget (replaces AI Readiness pillar)

### Goal

Break the circular loop: low data → weak advice → disengagement → even lower data.

### What it is

A small, action-oriented widget that shows:

- Overall data completeness percent
- Top missing fields that most improve advice quality (**quick wins**)
- A single CTA to add data (micro-form style; implemented as a route to Data Center in v1)

### What it is not

- No “AI Readiness 45/100” score
- No blame / warning tone when completeness is low
- No red “you are doing bad” visuals

### Visibility rules (v1)

- Hidden when completeness ≥ 90%
- Intended visibility: Owner + Administrator (backend enforcement later)

