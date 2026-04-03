import { NextResponse } from "next/server";
import { weddingHalls } from "@/data/mock";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const hall = weddingHalls.find((h) => h.id === id);

  if (!hall) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(hall);
}
