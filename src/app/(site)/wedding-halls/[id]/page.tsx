"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Users,
  Phone,
  Heart,
  Share2,
  ChevronLeft,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { WeddingHall } from "@/data/mock";
import Link from "next/link";

export default function WeddingHallDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [hall, setHall] = useState<WeddingHall | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/data/wedding-halls/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setHall(data))
      .catch(() => setHall(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  if (!hall) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] bg-[#f2f0ed]">
        <Image
          src={hall.imageUrl}
          alt={hall.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute top-4 left-4 z-10">
          <Link href="/wedding-halls">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/80 backdrop-blur-sm hover:bg-white gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> 목록으로
            </Button>
          </Link>
        </div>
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#212121] text-white">{hall.type}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-sage fill-sage" />
                  <span className="font-medium">{hall.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({hall.reviewCount}개 리뷰)
                  </span>
                </div>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold font-serif text-[#212121]">
                {hall.name}
              </h1>
              <div className="flex items-center gap-1.5 text-muted-foreground mt-2">
                <MapPin className="h-4 w-4" />
                {hall.address}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-semibold font-serif text-[#212121] mb-3">소개</h2>
              <p className="text-muted-foreground leading-relaxed">
                {hall.description}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold font-serif text-[#212121] mb-3">
                시설 및 서비스
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hall.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sage" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold font-serif text-[#212121] mb-3">
                버추얼 투어
              </h2>
              <div className="aspect-video bg-gradient-to-br from-sage-muted to-sage-muted rounded-sm flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl block mb-2">🏛️</span>
                  <p className="text-muted-foreground text-sm">
                    360도 파노라마 뷰 (준비중)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="border-0 shadow-md sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-[#212121] text-lg">핵심 정보</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      식대 (1인)
                    </span>
                    <span className="text-lg font-bold text-[#212121]">
                      {hall.mealCostPerPerson.toLocaleString()}원
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      수용 인원
                    </span>
                    <span className="font-medium">
                      {hall.minGuests}~{hall.maxGuests}명
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">위치</span>
                    <span className="font-medium text-sm">{hall.region}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">타입</span>
                    <Badge variant="secondary">{hall.type}</Badge>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Link href="/consultation" className="block">
                    <Button className="w-full bg-sage hover:bg-sage-dark text-white h-12 text-base">
                      상담 신청하기
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-[#212121] text-[#212121] h-12 text-base gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    전화 문의
                  </Button>
                  <Link href="/simulator" className="block">
                    <Button
                      variant="ghost"
                      className="w-full text-sage hover:text-sage-dark"
                    >
                      비용 시뮬레이터로 계산해보기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
