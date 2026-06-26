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
