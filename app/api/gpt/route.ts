// app/api/gemini/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

type RateLimitMap = {
  [ip: string]: { count: number; lastReset: number };
};

const rateLimit: RateLimitMap = {};
const MAX_MESSAGES_PER_DAY = 5;
const DAY_MS = 1000 * 60 * 60 * 24;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();

  // Reset count if a day has passed
  if (!rateLimit[ip] || now - rateLimit[ip].lastReset > DAY_MS) {
    rateLimit[ip] = { count: 0, lastReset: now };
  }

  if (rateLimit[ip].count >= MAX_MESSAGES_PER_DAY) {
    return NextResponse.json(
      { error: "❌ Message limit reached (5/day). Come back tomorrow." },
      { status: 429 }
    );
  }

  const { message } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(message);
    const response = result.response.text();

    rateLimit[ip].count += 1;

    let alert = null;
    if (rateLimit[ip].count === 3) {
      alert = "⚠️ You have 2 messages left today. Upgrade for unlimited access.";
    }

    return NextResponse.json({ reply: response, alert });
  } catch (err: any) {
    console.error("Gemini error:", err.message);
    return NextResponse.json({ error: "Gemini API failed." }, { status: 500 });
  }
}
