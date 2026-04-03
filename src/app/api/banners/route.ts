import { NextResponse } from "next/server";
import { readCollection } from "@/lib/db";

interface Banner {
  id: string;
  type: "video" | "image";
  src: string;
  title: string;
  subtitle: string;
  largeSubtitle: boolean;
  ctaLabel: string;
  ctaHref: string;
  visible: boolean;
  order: number;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const banners = readCollection<Banner>("banners")
    .filter((b) => b.visible)
    .sort((a, b) => a.order - b.order);
  return NextResponse.json(banners);
}
