import { NextRequest, NextResponse } from "next/server";
import {
  anthropic,
  CLAUDE_MODEL,
  MAX_TOKENS,
  hasAnthropicKey,
} from "@/lib/ai/claude.client";
import { buildSystemPrompt } from "@/lib/ai/agents.prompts";

export async function POST(req: NextRequest) {
  if (!hasAnthropicKey()) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const {
      agentId,
      messages,
      companyData,
    }: {
      agentId: string;
      messages: { role: string; content: string }[];
      companyData?: Record<string, string | number>;
    } = body;

    if (!agentId || !messages?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(agentId, companyData ?? {});

    const stream = anthropic.messages.stream({
      model: CLAUDE_MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(
                new TextEncoder().encode(chunk.delta.text)
              );
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("AI Chat error:", error);
    const status =
      error instanceof Error && error.message.includes("529") ? 529 : 500;
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status }
    );
  }
}
