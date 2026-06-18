import { NextRequest, NextResponse } from "next/server";
import {
  anthropic,
  CLAUDE_MODEL,
  hasAnthropicKey,
} from "@/lib/ai/claude.client";
import {
  mapAIHealthToHealthData,
  parseAIJson,
  type AIHealthResponse,
} from "@/lib/ai/health.calculator";

export async function POST(req: NextRequest) {
  if (!hasAnthropicKey()) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 503 }
    );
  }

  try {
    const { companyData } = await req.json();

    const prompt = `Ты — аналитическая система Business Health для малого и среднего бизнеса.

Данные компании:
${JSON.stringify(companyData, null, 2)}

Рассчитай Business Health Score по 8 направлениям.
Верни ТОЛЬКО JSON без markdown, без пояснений:

{
  "masterScore": number (0-100),
  "pillars": {
    "financial": { "score": number, "status": "excellent|good|warning|critical", "insight": "string" },
    "sales": { "score": number, "status": "excellent|good|warning|critical", "insight": "string" },
    "marketing": { "score": number, "status": "excellent|good|warning|critical", "insight": "string" },
    "customer": { "score": number, "status": "excellent|good|warning|critical", "insight": "string" },
    "inventory": { "score": number, "status": "excellent|good|warning|critical", "insight": "string" },
    "team": { "score": number, "status": "excellent|good|warning|critical", "insight": "string" },
    "operations": { "score": number, "status": "excellent|good|warning|critical", "insight": "string" },
    "aiReadiness": { "score": number, "status": "excellent|good|warning|critical", "insight": "string" }
  },
  "topRecommendations": ["string", "string", "string"],
  "profitPotential": number
}`;

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      response.content[0]?.type === "text" ? response.content[0].text : "";

    const aiData = parseAIJson<AIHealthResponse>(text);
    const healthData = mapAIHealthToHealthData(aiData);

    return NextResponse.json({
      health: healthData,
      profitPotential: aiData.profitPotential,
      raw: aiData,
    });
  } catch (error) {
    console.error("Health calculation error:", error);
    return NextResponse.json(
      { error: "Failed to calculate health" },
      { status: 500 }
    );
  }
}
