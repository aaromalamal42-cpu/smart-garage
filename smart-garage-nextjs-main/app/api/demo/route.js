/* POST /api/demo - homepage "try it" box (no login needed).
   Text only, max 300 characters, rate-limited per IP address.
   The Gemini key still stays on the server. */
import { NextResponse } from "next/server";
import { handle, readJson } from "@/lib/server/http";
import { cleanString, normalizeAnalysis } from "@/lib/server/validate";
import { checkDemoLimit } from "@/lib/server/rate-limit";
import { callGemini } from "@/lib/server/gemini";
import { ApiError } from "@/lib/server/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export const POST = handle(async (request) => {
  const ip = (request.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  const body = await readJson(request);
  const problem = cleanString(body?.problem, 300);
  if (problem.length < 10) {
    throw new ApiError(400, "invalid_input", "Describe the problem in at least 10 characters.");
  }
  checkDemoLimit(ip);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new ApiError(500, "not_configured", "GEMINI_API_KEY is not set on the server.");
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const input = {
    brand: "Not specified", model: "Not specified", year: "Not specified",
    fuelType: "Not specified", mileage: "", problem, image: null
  };
  const analysis = normalizeAnalysis(await callGemini(input, { apiKey, modelName }), modelName);
  return NextResponse.json({ analysis });
});