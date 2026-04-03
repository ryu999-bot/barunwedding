"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { SdmeItem } from "@/data/mock";
import { apiFetch } from "@/lib/api";

export function SdmeShowcase() {
  const [sdmeItems, setSdmeItems] = useState<SdmeItem[]>([]);

  useEffect(() => {
    apiFetch("/api/data/collections")
      .then((res) => res.json())
      .then((data: SdmeItem[]) => setSdmeItems(data))
      .catch(console.error);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-[#f7f6f3]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">
            Wedding Collection
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-[#212121] tracking-[1px]">
            베스트 웨딩컬렉션
          </h2>
          <div className="w-12 h-[1px] bg-sage mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {sdmeItems.map((item, i) => (
            <div
              key={item.id}
              className={`group cursor-pointer ${
                i === 0 ? "col-span-2 lg:col-span-1 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`bg-[#eae7e2] relative overflow-hidden ${
                  i === 0
                    ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[480px]"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                <span className="absolute top-4 left-4 text-[10px] tracking-[2px] uppercase bg-white/90 text-[#4f4f4f] px-3 py-1.5 font-medium">
                  {item.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-[11px] text-white/70 tracking-[1px] uppercase">
                    {item.brand}
                  </p>
                  <p className="text-[14px] text-white mt-1">{item.title}</p>
                  <p className="text-[13px] text-white/80 mt-1">
                    {(item.price / 10000).toLocaleString()}만원
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/wedding-collection"
            className="inline-flex items-center gap-2 text-[13px] text-sage hover:text-sage-dark tracking-[1px] transition-colors duration-300 border-b border-sage/30 pb-1"
          >
            전체 컬렉션 보기 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
