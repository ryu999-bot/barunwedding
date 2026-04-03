"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Star, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WeddingHall } from "@/data/mock";

const set = (fn: (v: string) => void) => (v: string | null) => {
  if (v !== null) fn(v);
};

export default function WeddingHallsPage() {
  const [weddingHalls, setWeddingHalls] = useState<WeddingHall[]>([]);
  const [region, setRegion] = useState<string>("all");
  const [hallType, setHallType] = useState<string>("all");
  const [budget, setBudget] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/data/wedding-halls")
      .then((res) => res.json())
      .then((data) => setWeddingHalls(data));
  }, []);

  const filtered = useMemo(() => {
    return weddingHalls.filter((hall) => {
      if (region !== "all" && !hall.region.includes(region)) return false;
      if (hallType !== "all" && hall.type !== hallType) return false;
      if (budget !== "all") {
        const cost = hall.mealCostPerPerson;
        if (budget === "low" && cost > 70000) return false;
        if (budget === "mid" && (cost < 70000 || cost > 100000)) return false;
        if (budget === "high" && cost < 100000) return false;
      }
      if (
        searchQuery &&
        !hall.name.includes(searchQuery) &&
        !hall.region.includes(searchQuery)
      )
        return false;
      return true;
    });
  }, [region, hallType, budget, searchQuery]);

  return (
    <div className="min-h-screen">
      <div className="bg-white border-b border-[#e5e5e5] sticky top-16 lg:top-[93px] z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#999]" />
              <Input
                placeholder="웨딩홀 이름 또는 지역으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-[3px] border-[#e5e5e5] text-[13px]"
              />
            </div>
            <Select value={region} onValueChange={set(setRegion)}>
              <SelectTrigger className="w-full sm:w-36 rounded-[3px] text-[13px]">
                <SelectValue placeholder="지역" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 지역</SelectItem>
                <SelectItem value="서울">서울</SelectItem>
                <SelectItem value="경기">경기</SelectItem>
              </SelectContent>
            </Select>
            <Select value={hallType} onValueChange={set(setHallType)}>
              <SelectTrigger className="w-full sm:w-36 rounded-[3px] text-[13px]">
                <SelectValue placeholder="타입" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 타입</SelectItem>
                <SelectItem value="호텔">호텔</SelectItem>
                <SelectItem value="하우스">하우스</SelectItem>
                <SelectItem value="컨벤션">컨벤션</SelectItem>
              </SelectContent>
            </Select>
            <Select value={budget} onValueChange={set(setBudget)}>
              <SelectTrigger className="w-full sm:w-36 rounded-[3px] text-[13px]">
                <SelectValue placeholder="예산" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 예산</SelectItem>
                <SelectItem value="low">~7만원</SelectItem>
                <SelectItem value="mid">7~10만원</SelectItem>
                <SelectItem value="high">10만원~</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[13px] text-[#6b6b6b]">
            <span className="text-[#212121]">{filtered.length}개</span>의 웨딩홀
          </p>
          <Button variant="ghost" size="sm" className="gap-1.5 text-[13px] text-[#6b6b6b]">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            정렬
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
          {filtered.map((hall) => (
            <Link key={hall.id} href={`/wedding-halls/${hall.id}`}>
              <div className="group cursor-pointer">
                <div className="aspect-[16/10] bg-[#f2f0ed] relative overflow-hidden">
                  <Image
                    src={hall.imageUrl}
                    alt={hall.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  <span className="absolute top-3 left-3 text-[11px] tracking-[1px] bg-white/90 text-[#4f4f4f] px-2.5 py-1">
                    {hall.type}
                  </span>
                </div>
                <div className="pt-4 pb-6">
                  <h3 className="text-[15px] font-medium text-[#212121] group-hover:text-sage transition-colors duration-300">
                    {hall.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#999] mt-1">
                    <MapPin className="h-3 w-3" />
                    {hall.address}
                  </div>
                  <p className="text-[12px] text-[#6b6b6b] mt-2 line-clamp-2 leading-relaxed">
                    {hall.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {hall.features.slice(0, 3).map((f) => (
                      <span key={f} className="text-[11px] text-[#999] border border-[#e5e5e5] px-2 py-0.5">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e5e5e5]">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3 w-3 text-sage fill-sage" />
                      <span className="text-[13px] text-[#4f4f4f]">{hall.rating}</span>
                      <span className="text-[11px] text-[#999]">({hall.reviewCount})</span>
                    </div>
                    <span className="text-[14px] text-[#212121]">
                      식대 {(hall.mealCostPerPerson / 10000).toFixed(1)}만원
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[14px] text-[#6b6b6b]">조건에 맞는 웨딩홀이 없습니다.</p>
            <Button
              variant="outline"
              className="mt-4 rounded-[3px] text-[13px]"
              onClick={() => { setRegion("all"); setHallType("all"); setBudget("all"); setSearchQuery(""); }}
            >
              필터 초기화
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
