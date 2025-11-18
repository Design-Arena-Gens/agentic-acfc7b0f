import { NextResponse } from "next/server";
import { generateAnswer } from "@/lib/retrieval";

export const runtime = "edge";

export async function POST(request: Request) {
  const { question } = await request.json().catch(() => ({ question: "" }));

  if (!question || typeof question !== "string") {
    return NextResponse.json(
      {
        error: "Pregunta inválida",
        answer: "No encontré esa información en la documentación de familiarización.",
        status: "not_found"
      },
      { status: 400 }
    );
  }

  const result = generateAnswer(question);

  return NextResponse.json(result, { status: 200 });
}
