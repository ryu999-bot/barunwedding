"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Award, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Planner {
  name: string;
  title: string;
  career: string;
  specialty: string;
  description: string;
  image: string;
  instagram?: string;
  kakao?: string;
}

interface PageData {
  planners: {
    hero: { image: string; title: string };
    items: Planner[];
  };
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3c-5.076 0-9.192 3.272-9.192 7.31 0 2.596 1.733 4.877 4.34 6.163-.192.713-.694 2.585-.794 2.985-.123.488.18.482.378.35.156-.103 2.479-1.685 3.484-2.372.58.086 1.173.13 1.784.13 5.076 0 9.192-3.272 9.192-7.31 0-4.039-4.116-7.31-9.192-7.31" />
    </svg>
  );
}

export default function PlannersPage() {
  const [data, setData] = useState<PageData | null>(null);

  useEffect(() => {
    fetch("/api/pages")
      .then((r) => r.json())
      .then((d) => setData(d));
  }, []);

  const hero = data?.planners?.hero || { image: "/images/banner-couple.jpg", title: "웨딩 플래너" };
  const planners = data?.planners?.items || [];

  return (
    <div className="min-h-screen">
      <div className="relative h-[350px] lg:h-[450px] bg-[#212121] overflow-hidden">
        <Image src={hero.image} alt={hero.title} fill className="object-cover opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-serif text-white/60 text-[14px] tracking-[4px] uppercase mb-4">Planners</p>
            <h1 className="font-serif text-4xl lg:text-6xl text-white tracking-[1px]">{hero.title}</h1>
            <div className="w-12 h-[1px] bg-sage mx-auto mt-6" />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">Our Team</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-[#212121] mb-4">전문 웨딩 플래너를 소개합니다</h2>
          <p className="text-[13px] text-[#6b6b6b] leading-[1.8]">
            바른웨딩의 플래너는 모두 5년 이상 경력의 검증된 전문가입니다.
            <br />당신의 스타일에 맞는 플래너를 만나보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {planners.map((planner) => (
            <div key={planner.name} className="group">
              <div className="aspect-[3/4] relative bg-[#f2f0ed] overflow-hidden mb-5">
                <Image
                  src={planner.image}
                  alt={planner.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-sage" />
                    <span className="text-[12px] text-white/80">경력 {planner.career}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[16px] font-medium text-[#212121]">{planner.name}</h3>
                  <span className="text-[11px] text-sage tracking-[1px]">{planner.title}</span>
                </div>
                <p className="text-[12px] text-[#999] mb-2">{planner.specialty}</p>
                <p className="text-[12px] text-[#6b6b6b] leading-[1.8] mb-4 line-clamp-2">
                  {planner.description}
                </p>
                <div className="flex items-center gap-2">
                  {planner.instagram && (
                    <a href={planner.instagram} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-[#e5e5e5] hover:border-[#E1306C] hover:text-[#E1306C]">
                        <InstagramIcon className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                  )}
                  {planner.kakao && (
                    <a href={planner.kakao} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-[#e5e5e5] hover:border-[#FEE500] hover:bg-[#FEE500] hover:text-[#3C1E1E]">
                        <KakaoIcon className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                  )}
                  <Link href="/consultation" className="ml-auto">
                    <Button variant="outline" size="sm" className="text-[11px] gap-1 h-8 border-[#e5e5e5] hover:border-sage hover:text-sage">
                      <MessageCircle className="h-3 w-3" />
                      상담
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
