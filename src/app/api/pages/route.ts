import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "pages.json");

export const dynamic = "force-dynamic";

export async function GET() {
  if (!fs.existsSync(FILE)) {
    return NextResponse.json({});
  }
  const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  fs.writeFileSync(FILE, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
