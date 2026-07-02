# Architecture Decisions — AI Business OS

This document records significant product and technical decisions.

⸻

Decision #011

Pixel ornament policy.

Reason:

Decision #007 forbade ethnic ornaments. After UX research,
8-bit pixelated shanyrak is acceptable as background-only decoration
because it reads as digital/modern, not folkloric.

Rules:

* Only via single `<KazakhPixelOrnament />` component
* Opacity max 8%
* Allowed: card corners, section dividers, empty states, hero/auth backgrounds
* Forbidden: dashboard body background, sidebar, over data, over forms

Status:

Approved (supersedes ornament-clause of #007)

⸻

Decision #012

Remove AI Readiness as Business Health System pillar.
Convert to Data Completeness widget.

Reason:

AI Readiness measured product engagement, not business health.
Circular logic: low data → poor AI advice → user disengagement → even lower data.

Rules:

* AI Readiness pillar removed from BHS scoring
* Marketing pillar weight increased 8% → 10%
* AI Readiness metrics moved to Data Completeness widget
* Widget shows missing fields as actions, not scores
* Widget hidden when completeness ≥ 90%
* Widget visible only to Owner + Administrator roles (backend to enforce later)

Status:

Approved. Supersedes AI Readiness pillar sections in Business_Health_System_v1.md and TRD_v2.md.
