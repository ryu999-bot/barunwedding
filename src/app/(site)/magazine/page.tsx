"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, ArrowRight, Bookmark } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const categories = ["전체", "웨딩 준비", "웨딩홀", "스드메", "트렌드", "비용·절약", "신혼"];

const articles: Article[] = [
  {
    id: "1",
    title: "2026 웨딩 트렌드: 올해 가장 인기 있는 웨딩 스타일 5가지",
    excerpt:
      "미니멀 웨딩부터 가든 웨딩까지, 2026년 예비 부부들이 가장 주목하는 웨딩 트렌드를 정리했습니다. 나에게 맞는 스타일을 찾아보세요.",
    category: "트렌드",
    imageUrl: "/images/hall-5.jpg",
    date: "2026.04.01",
    readTime: "5분",
    featured: true,
  },
  {
    id: "2",
    title: "웨딩홀 계약 전 꼭 확인해야 할 체크리스트 10가지",
    excerpt:
      "웨딩홀 답사 시 놓치기 쉬운 항목들을 정리했습니다. 식대 포함 여부, 홀 대관료, 주차 지원, 추가 비용까지 꼼꼼하게 확인하세요.",
    category: "웨딩홀",
    imageUrl: "/images/hall-1.jpg",
    date: "2026.03.28",
    readTime: "7분",
  },
  {
    id: "3",
    title: "스드메 고를 때 실수하지 않는 법: 현직 플래너가 알려주는 팁",
    excerpt:
      "스튜디오, 드레스, 메이크업 선택 시 예비 부부들이 자주 하는 실수와 현명한 선택법을 현직 웨딩 플래너가 직접 알려드립니다.",
    category: "스드메",
    imageUrl: "/images/dress-1.jpg",
    date: "2026.03.25",
    readTime: "6분",
  },
  {
    id: "4",
    title: "결혼 비용 3,000만원으로 가능할까? 현실적인 예산 짜기",
    excerpt:
      "웨딩홀, 스드메, 예물, 혼수까지 전체 결혼 비용을 3,000만원 안에서 해결하는 현실적인 방법을 안내합니다.",
    category: "비용·절약",
    imageUrl: "/images/package-1.jpg",
    date: "2026.03.22",
    readTime: "8분",
    featured: true,
  },
  {
    id: "5",
    title: "결혼 준비 12개월 타임라인: 월별로 해야 할 일 총정리",
    excerpt:
      "결혼 1년 전부터 D-Day까지 매달 해야 할 일을 타임라인으로 정리했습니다. 이 순서대로만 하면 놓치는 것 없이 준비할 수 있어요.",
    category: "웨딩 준비",
    imageUrl: "/images/snap-1.jpg",
    date: "2026.03.18",
    readTime: "10분",
  },
  {
    id: "6",
    title: "청첩장, 언제 어떻게 보내야 할까? 모바일·종이 청첩장 가이드",
    excerpt:
      "모바일 청첩장과 종이 청첩장의 장단점, 발송 시기, 문구 작성법까지 한번에 정리해드립니다.",
    category: "웨딩 준비",
    imageUrl: "/images/studio-1.jpg",
    date: "2026.03.15",
    readTime: "5분",
  },
  {
    id: "7",
    title: "소규모 웨딩 트렌드: 50명 이하 스몰 웨딩 장소 추천",
    excerpt:
      "가까운 사람들과 함께하는 소규모 웨딩이 늘고 있습니다. 서울·경기 지역 스몰 웨딩에 적합한 장소를 추천합니다.",
    category: "웨딩홀",
    imageUrl: "/images/hall-4.jpg",
    date: "2026.03.12",
    readTime: "6분",
  },
  {
    id: "8",
    title: "신혼집 인테리어, 예산별 추천 스타일과 꿀팁",
    excerpt:
      "1,000만원부터 3,000만원까지 예산별 신혼집 인테리어 스타일과 비용을 아끼는 실용적인 팁을 소개합니다.",
    category: "신혼",
    imageUrl: "/images/hall-2.jpg",
    date: "2026.03.08",
    readTime: "7분",
  },
  {
    id: "9",
    title: "웨딩 메이크업 리허설, 꼭 해야 할까? 준비 방법 A to Z",
    excerpt:
      "메이크업 리허설 시 주의할 점, 준비물, 아티스트와 소통하는 법까지. 본식 당일 완벽한 메이크업을 위한 가이드.",
    category: "스드메",
    imageUrl: "/images/makeup-1.jpg",
    date: "2026.03.05",
    readTime: "5분",
  },
];

export default function MagazinePage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered =
    activeCategory === "전체"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featuredArticle = articles.find((a) => a.featured);
  const restArticles =
    activeCategory === "전체"
      ? filtered.filter((a) => a.id !== featuredArticle?.id)
      : filtered;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#f7f6f3] py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">
            Wedding Magazine
          </p>
          <h1 className="font-serif text-3xl lg:text-5xl text-[#212121] tracking-[1px]">
            웨딩 매거진
          </h1>
          <div className="w-12 h-[1px] bg-sage mx-auto mt-6 mb-6" />
          <p className="text-[14px] text-[#6b6b6b] max-w-lg mx-auto">
            결혼 준비에 필요한 모든 정보와 트렌드를 한곳에서 만나보세요
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[13px] tracking-[0.5px] transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-sage text-white"
                  : "bg-transparent text-[#6b6b6b] hover:text-sage border border-[#e5e5e5] hover:border-sage/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {activeCategory === "전체" && featuredArticle && (
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 group cursor-pointer">
              <div className="aspect-[16/10] lg:aspect-auto relative bg-[#f2f0ed] overflow-hidden">
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="bg-[#f7f6f3] p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-[11px] text-sage tracking-[2px] uppercase font-medium">
                  {featuredArticle.category}
                </span>
                <h2 className="font-serif text-2xl lg:text-3xl text-[#212121] mt-3 leading-snug group-hover:text-sage transition-colors duration-300">
                  {featuredArticle.title}
                </h2>
                <p className="text-[13px] text-[#6b6b6b] mt-4 leading-[1.8] line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-6 text-[12px] text-[#999]">
                  <span>{featuredArticle.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {featuredArticle.readTime} 읽기
                  </span>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 text-[13px] text-sage hover:text-sage-dark tracking-[1px] transition-colors duration-300 border-b border-sage/30 pb-1">
                    자세히 읽기 <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
          {restArticles.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              <div className="aspect-[16/10] relative bg-[#f2f0ed] overflow-hidden mb-5">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                  <Bookmark className="h-4 w-4 text-[#212121]" />
                </button>
              </div>
              <span className="text-[11px] text-sage tracking-[2px] uppercase font-medium">
                {article.category}
              </span>
              <h3 className="font-serif text-[17px] text-[#212121] mt-2 leading-snug group-hover:text-sage transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-[12px] text-[#999] mt-2 leading-[1.8] line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 mt-3 text-[11px] text-[#bbb]">
                <span>{article.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#6b6b6b]">
            해당 카테고리에 등록된 콘텐츠가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
