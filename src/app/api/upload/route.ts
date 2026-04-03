import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

// Allow up to 100MB uploads for video files
export const maxDuration = 60;

const UPLOAD_DIR = path.join(process.cwd(), "public", "images");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const filename = formData.get("filename") as string | null;

  if (!file) {
    return NextResponse.json({ error: "파일이 없습니다" }, { status: 400 });
  }

  const finalName = filename || file.name;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(UPLOAD_DIR, finalName);

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({
    success: true,
    url: `/images/${finalName}`,
    name: finalName,
    size: buffer.length,
  });
}

export async function DELETE(req: NextRequest) {
  const { filename } = await req.json();

  if (!filename) {
    return NextResponse.json(
      { error: "파일명이 없습니다" },
      { status: 400 }
    );
  }

  const filePath = path.join(UPLOAD_DIR, filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "파일을 찾을 수 없습니다" }, { status: 404 });
}
