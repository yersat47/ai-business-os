import { NextRequest, NextResponse } from "next/server";
import {
  anthropic,
  CLAUDE_MODEL,
  hasAnthropicKey,
} from "@/lib/ai/claude.client";
import {
  mapAIProfitToProfitData,
  parseAIJson,
  type AIProfitResponse,
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
    const monthlyRevenue = Number(companyData?.monthlyRevenue ?? 0);

    const prompt = `Ты — Profit Engine для малого и среднего бизнеса в Казахстане.

Данные компании:
${JSON.stringify(companyData, null, 2)}

Оцени прибыльный потенциал при оптимизации.
Верни ТОЛЬКО JSON без markdown:

{
  "totalRecoverable": number,
  "growthPotentialPct": number,
  "potentialRevenue": number,
  "breakdown": [
    { "category": "string", "categoryKey": "deadStock|cacOptimization|marginImprovement|repeatPurchase", "amount": number, "confidence": number }
  ]
}`;

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      response.content[0]?.type === "text" ? response.content[0].text : "";

    const aiData = parseAIJson<AIProfitResponse>(text);
    const profit = mapAIProfitToProfitData(aiData, monthlyRevenue);

    return NextResponse.json({ profit, raw: aiData });
  } catch (error) {
    console.error("Profit calculation error:", error);
    return NextResponse.json(
      { error: "Failed to calculate profit potential" },
      { status: 500 }
    );
  }
}
