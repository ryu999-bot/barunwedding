import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

// Allow up to 100MB uploads for video files
export const maxDuration = 60;

const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "images");

const ALLOWED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".mp4",
  ".webm",
];

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const filename = formData.get("filename") as string | null;

  if (!file) {
    return NextResponse.json({ error: "파일이 없습니다" }, { status: 400 });
  }

  const finalName = path.basename(filename || file.name);

  const ext = path.extname(finalName).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json(
      { error: `허용되지 않는 파일 형식입니다: ${ext}` },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (buffer.length > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "파일 크기가 100MB를 초과합니다" },
      { status: 400 }
    );
  }

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const filePath = path.join(UPLOAD_DIR, finalName);

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

  const safeName = path.basename(filename);
  const filePath = path.join(UPLOAD_DIR, safeName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "파일을 찾을 수 없습니다" }, { status: 404 });
}
