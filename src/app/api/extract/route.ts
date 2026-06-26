import { NextResponse } from "next/server";

import { PORTFOLIO, leaseToExtraction } from "@/lib/mock-data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return NextResponse.json(
        { error: "Only PDF tenancy contracts are supported" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File must be under 10 MB" },
        { status: 400 }
      );
    }

    // Simulated AI processing — replace with real LLM call when OPENAI_API_KEY is set
    await new Promise((resolve) => setTimeout(resolve, 2200));

    const hasAiKey = Boolean(process.env.OPENAI_API_KEY);

    return NextResponse.json({
      extraction: leaseToExtraction(),
      communityInsight: PORTFOLIO.communityInsight,
      fileName: file.name,
      mode: hasAiKey ? "demo-with-key" : "demo",
      message: hasAiKey
        ? "Demo extraction returned — wire OpenAI vision in production"
        : "Demo extraction from portfolio sample (LST-00002)",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process contract" },
      { status: 500 }
    );
  }
}
