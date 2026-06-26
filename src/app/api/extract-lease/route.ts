import { NextResponse } from "next/server";

import { leaseToExtractionRaw } from "@/lib/mock-data";
import { normalizeExtraction } from "@/lib/lease-utils";
import type { LeaseExtractionRaw } from "@/lib/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT =
  'You are a UAE tenancy contract parser. Extract the following fields from this document and return ONLY valid JSON, no markdown, no explanation: { tenantName, annualRentAED, ejariExpiryDate (YYYY-MM-DD), paymentTerms (e.g. \'4 cheques\'), landlordName, propertyAddress, contractStartDate (YYYY-MM-DD), specialClauses (array of strings, max 3) }';

type ExtractRequestBody = {
  pdfBase64?: string;
};

function isLeaseExtractionRaw(value: unknown): value is LeaseExtractionRaw {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.tenantName === "string" &&
    typeof record.annualRentAED === "number" &&
    typeof record.ejariExpiryDate === "string" &&
    typeof record.paymentTerms === "string" &&
    typeof record.landlordName === "string" &&
    typeof record.propertyAddress === "string" &&
    typeof record.contractStartDate === "string" &&
    Array.isArray(record.specialClauses) &&
    record.specialClauses.every((clause) => typeof clause === "string")
  );
}

function parseJsonFromText(text: string): LeaseExtractionRaw | null {
  const trimmed = text.trim();
  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (isLeaseExtractionRaw(parsed)) return parsed;
  } catch {
    // fall through to fenced block extraction
  }

  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch?.[1]) {
    try {
      const parsed: unknown = JSON.parse(fenceMatch[1].trim());
      if (isLeaseExtractionRaw(parsed)) return parsed;
    } catch {
      return null;
    }
  }

  return null;
}

async function extractWithAnthropic(
  pdfBase64: string
): Promise<LeaseExtractionRaw> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: "application/pdf",
                data: pdfBase64,
              },
            },
            {
              type: "text",
              text: "Extract all lease fields from this UAE tenancy contract PDF.",
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${errorBody}`);
  }

  const payload = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };

  const textBlock = payload.content?.find((block) => block.type === "text");
  if (!textBlock?.text) {
    throw new Error("No text content in Anthropic response");
  }

  const parsed = parseJsonFromText(textBlock.text);
  if (!parsed) {
    throw new Error("Could not parse JSON from model response");
  }

  return {
    ...parsed,
    specialClauses: parsed.specialClauses.slice(0, 3),
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ExtractRequestBody;
    const pdfBase64 = body.pdfBase64;

    if (!pdfBase64 || typeof pdfBase64 !== "string") {
      return NextResponse.json(
        { error: "pdfBase64 is required" },
        { status: 400 }
      );
    }

    const raw = await extractWithAnthropic(pdfBase64);
    const extraction = normalizeExtraction(raw);

    return NextResponse.json({ extraction, mode: "anthropic" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Extraction failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    fallback: normalizeExtraction(leaseToExtractionRaw()),
  });
}
