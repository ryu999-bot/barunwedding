"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SdmeItem } from "@/data/mock";

const categories = ["전체", "스튜디오", "드레스", "헤어메이크업", "본식스냅", "패키지"];

export default function WeddingCollectionPage() {
  const [sdmeItems, setSdmeItems] = useState<SdmeItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("전체");

  useEffect(() => {
    fetch("/api/data/collections")
      .then((res) => res.json())
      .then((data) => setSdmeItems(data));
  }, []);

  const filtered =
    activeCategory === "전체"
      ? sdmeItems
      : sdmeItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sage font-medium text-sm tracking-[2px] uppercase mb-2">
            Wedding Collection
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold font-serif text-[#212121]">
            웨딩컬렉션
          </h1>
          <p className="text-muted-foreground mt-2">
            스튜디오, 드레스, 헤어메이크업 등 최고의 웨딩 브랜드를 만나보세요
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={(v) => { if (v !== null) setActiveCategory(v); }} className="mb-8">
          <TabsList className="bg-white border border-border w-full sm:w-auto flex flex-wrap h-auto gap-1 p-1">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="data-[state=active]:bg-[#212121] data-[state=active]:text-white rounded-lg text-sm"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#f2f0ed] relative overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <Badge className="absolute top-3 left-3 bg-[#212121]/80 text-white text-xs">
                  {item.category}
                </Badge>
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-[#212121]" />
                </button>
              </div>
              <CardContent className="p-5">
                <p className="text-xs text-sage font-semibold uppercase tracking-[1px]">
                  {item.brand}
                </p>
                <h3 className="font-semibold text-[#212121] mt-1 group-hover:text-sage transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-sage fill-sage" />
                    <span className="text-sm font-medium">{item.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({item.reviewCount})
                    </span>
                  </div>
                  <span className="text-lg font-bold text-[#212121]">
                    {(item.price / 10000).toLocaleString()}만원
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              해당 카테고리에 등록된 상품이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
