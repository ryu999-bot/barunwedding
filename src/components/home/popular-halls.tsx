"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ArrowRight } from "lucide-react";
import type { WeddingHall } from "@/data/mock";
import { apiFetch } from "@/lib/api";

export function PopularHalls() {
  const [popular, setPopular] = useState<WeddingHall[]>([]);

  useEffect(() => {
    apiFetch("/api/data/wedding-halls")
      .then((res) => res.json())
      .then((data: WeddingHall[]) => setPopular(data.slice(0, 4)))
      .catch(console.error);
  }, []);

  return (
    <section className="pt-8 pb-24 lg:pb-32">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">
            Popular Venues
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-[#212121] tracking-[1px]">
            인기 웨딩홀
          </h2>
          <div className="w-12 h-[1px] bg-sage mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {popular.map((hall) => (
            <Link key={hall.id} href={`/wedding-halls/${hall.id}`}>
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] bg-[#f2f0ed] relative overflow-hidden">
                  <Image
                    src={hall.imageUrl}
                    alt={hall.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  <span className="absolute top-4 left-4 text-[10px] tracking-[2px] uppercase bg-white/90 text-[#4f4f4f] px-3 py-1.5 font-medium">
                    {hall.type}
                  </span>
                </div>
                <div className="pt-5 pb-2">
                  <h3 className="text-[15px] font-medium text-[#212121] group-hover:text-sage transition-colors duration-300 tracking-[0.3px]">
                    {hall.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-[#999] mt-1.5 tracking-[0.5px]">
                    <MapPin className="h-3 w-3" />
                    {hall.region}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#ebebeb]">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-sage fill-sage" />
                      <span className="text-[12px] text-[#4f4f4f]">
                        {hall.rating}
                      </span>
                      <span className="text-[11px] text-[#bbb]">
                        ({hall.reviewCount})
                      </span>
                    </div>
                    <span className="text-[12px] text-[#4f4f4f] tracking-[0.3px]">
                      식대 {(hall.mealCostPerPerson / 10000).toFixed(1)}만원
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/wedding-halls"
            className="inline-flex items-center gap-2 text-[13px] text-sage hover:text-sage-dark tracking-[1px] transition-colors duration-300 border-b border-sage/30 pb-1"
          >
            전체 웨딩홀 보기 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
