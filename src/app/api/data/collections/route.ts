import { NextResponse } from "next/server";
import { sdmeItems } from "@/data/mock";

export async function GET() {
  return NextResponse.json(sdmeItems);
}
