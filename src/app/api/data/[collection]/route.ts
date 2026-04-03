import { NextRequest, NextResponse } from "next/server";
import { readCollection, upsert } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const data = readCollection(collection);
  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const body = await req.json();

  if (!body.id) {
    body.id = Date.now().toString();
  }

  const saved = upsert(collection, body);
  return NextResponse.json(saved);
}
