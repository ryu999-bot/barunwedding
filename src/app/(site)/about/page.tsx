"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Award, Users, Shield, ShieldCheck, Gift } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "안심 보장 제도",
    description: "제휴 업체 부도 시에도 고객의 계약금과 서비스를 100% 보장합니다. 바른손그룹의 안정적 자금력이 뒷받침하는, 타사가 절대 따라할 수 없는 바른웨딩만의 핵심 차별점입니다.",
    highlight: true,
  },
  {
    icon: Gift,
    title: "스드메 계약 시 5종 무료 제공",
    description: "바른웨딩 스드메 패키지 계약 시, 청첩장·봉투·스티커·식권·식전영상까지 모두 무료! 바른카드 50년 품질 그대로.",
    highlight: true,
  },
  { icon: Heart, title: "진심을 담은 컨설팅", description: "예비 부부의 취향과 예산을 존중하며, 한 쌍 한 쌍에 맞춘 맞춤형 웨딩을 설계합니다." },
  { icon: Shield, title: "투명한 비용 공개", description: "숨겨진 비용 없이 모든 견적을 투명하게 공개합니다. 비용 시뮬레이터로 직접 확인하세요." },
  { icon: Award, title: "50년 신뢰의 바른카드", description: "바른카드 50년 브랜드 헤리티지를 기반으로 품격 있는 웨딩 서비스를 제공합니다." },
  { icon: Users, title: "전문 플래너 동행", description: "경력 10년 이상의 전문 웨딩 플래너가 처음부터 끝까지 함께합니다." },
];

interface AboutData {
  hero: { image: string; title: string };
  intro: { heading: string; body: string };
  guarantee: { heading: string; body: string; body2: string; items: string[] };
  freebie: { image: string; heading: string; body: string; items: string[] };
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((json) => setData(json.about))
      .catch(console.error);
  }, []);

  if (!data) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[400px] lg:h-[500px] bg-[#212121] overflow-hidden">
        <Image src={data.hero.image} alt="바른웨딩" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-serif text-white/60 text-[14px] tracking-[4px] uppercase mb-4">About Us</p>
            <h1 className="font-serif text-4xl lg:text-6xl text-white tracking-[1px]">{data.hero.title}</h1>
            <div className="w-12 h-[1px] bg-sage mx-auto mt-6" />
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-4">Our Story</p>
          <h2
            className="font-serif text-3xl lg:text-4xl text-[#212121] leading-snug mb-8"
            dangerouslySetInnerHTML={{ __html: data.intro.heading }}
          />
          <p
            className="text-[14px] text-[#6b6b6b] leading-[2]"
            dangerouslySetInnerHTML={{ __html: data.intro.body }}
          />
        </div>
      </div>

      {/* 안심 보장 제도 - Featured */}
      <div className="bg-[#212121] py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-sage/20 text-sage px-4 py-1.5 text-[12px] tracking-[2px] uppercase mb-6">
                <ShieldCheck className="h-4 w-4" />
                바른웨딩만의 차별점
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl text-white leading-snug mb-6">
                {data.guarantee.heading}
              </h2>
              <p className="text-[15px] text-white/70 leading-[2] mb-6">
                {data.guarantee.body}
              </p>
              <p
                className="text-[15px] text-white/90 leading-[2] mb-8"
                dangerouslySetInnerHTML={{ __html: data.guarantee.body2 }}
              />
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="font-serif text-3xl text-sage">100%</p>
                  <p className="text-[12px] text-white/50 mt-1">계약금 보장</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl text-sage">100%</p>
                  <p className="text-[12px] text-white/50 mt-1">서비스 보장</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl text-sage">50년</p>
                  <p className="text-[12px] text-white/50 mt-1">바른손그룹 신뢰</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-white/5 p-10 lg:p-14 flex flex-col justify-center">
                <ShieldCheck className="h-12 w-12 text-sage mb-6" />
                <h3 className="font-serif text-2xl text-white mb-4">안심 보장 제도란?</h3>
                <ul className="space-y-3">
                  {data.guarantee.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[13px] text-white/70">
                      <span className="text-sage mt-0.5">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 스드메 청첩장 무료 - Featured */}
      <div className="py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[400px] relative bg-[#f2f0ed] overflow-hidden">
              <Image src={data.freebie.image} alt="청첩장 무료" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="bg-[#f7f6f3] p-10 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-sage/10 text-sage px-4 py-1.5 text-[12px] tracking-[2px] uppercase mb-6 self-start">
                <Gift className="h-4 w-4" />
                Special Benefit
              </div>
              <h2
                className="font-serif text-2xl lg:text-3xl text-[#212121] leading-snug mb-4"
                dangerouslySetInnerHTML={{ __html: data.freebie.heading }}
              />
              <p className="text-[14px] text-[#6b6b6b] leading-[2] mb-6">
                {data.freebie.body}
              </p>
              <ul className="space-y-2 mb-8">
                {data.freebie.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#4f4f4f]">
                    <span className="text-sage">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/wedding-collection"
                className="inline-flex items-center gap-2 text-[13px] text-sage hover:text-sage-dark tracking-[1px] transition-colors duration-300 border-b border-sage/30 pb-1 self-start"
              >
                스드메 패키지 보기 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[#f7f6f3] py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">Our Values</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-[#212121]">바른웨딩의 가치</h2>
            <div className="w-12 h-[1px] bg-sage mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e5e5e5]">
            {values.map((v) => (
              <div key={v.title} className={`p-10 text-center ${"highlight" in v && v.highlight ? "bg-[#fdfcfa]" : "bg-white"}`}>
                <v.icon className={`h-6 w-6 mx-auto mb-5 ${"highlight" in v && v.highlight ? "text-sage" : "text-[#999]"}`} />
                <h3 className="text-[15px] font-medium text-[#212121] mb-3">{v.title}</h3>
                <p className="text-[13px] text-[#999] leading-[1.8]">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 lg:py-28 text-center">
        <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">Get Started</p>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#212121] mb-8">바른웨딩과 함께 시작하세요</h2>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/simulator" className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white px-8 py-3 text-[13px] tracking-[1px] transition-colors duration-300">
            비용 시뮬레이터 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/consultation" className="inline-flex items-center gap-2 border border-[#e5e5e5] text-[#4f4f4f] hover:border-sage hover:text-sage px-8 py-3 text-[13px] tracking-[1px] transition-colors duration-300">
            상담 신청 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
