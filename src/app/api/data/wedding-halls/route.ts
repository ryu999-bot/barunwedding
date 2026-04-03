import { NextResponse } from "next/server";
import { weddingHalls } from "@/data/mock";

export async function GET() {
  return NextResponse.json(weddingHalls);
}
