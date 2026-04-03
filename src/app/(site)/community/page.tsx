"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  Camera,
  ChevronRight,
  User,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type TabType = "customer" | "wedding-story";

interface CustomerReview {
  id: string;
  author: string;
  authorType: "고객" | "플래너";
  profileImage?: string;
  hallName: string;
  rating: number;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  date: string;
  likes: number;
  comments: number;
}

interface WeddingStory {
  id: string;
  author: string;
  authorType: "고객" | "플래너";
  title: string;
  excerpt: string;
  coverImage: string;
  hallName: string;
  weddingDate: string;
  category: string;
  readTime: string;
  likes: number;
  comments: number;
  sections: { subtitle: string; content: string; image?: string }[];
}

const customerReviews: CustomerReview[] = [
  {
    id: "cr1",
    author: "김민지",
    authorType: "고객",
    hallName: "그랜드 하얏트 서울",
    rating: 5,
    title: "인생 최고의 날이었어요! 하얏트 웨딩 강력 추천",
    content:
      "6개월 전부터 준비했는데, 웨딩 플래너님이 정말 꼼꼼하게 도와주셔서 하나도 빠짐없이 완벽한 결혼식이었습니다. 남산 뷰가 환상적이었고, 하객분들 모두 음식이 최고였다고 하셨어요. 특히 디저트 뷔페가 정말 다양하고 맛있었습니다.",
    images: ["/images/hall-1.jpg", "/images/snap-1.jpg"],
    tags: ["뷰맛집", "음식최고", "서비스굿", "남산뷰"],
    date: "2026.03.28",
    likes: 47,
    comments: 12,
  },
  {
    id: "cr2",
    author: "박서연 플래너",
    authorType: "플래너",
    hallName: "더 라움",
    rating: 5,
    title: "[플래너 추천] 더 라움 가든 예식, 이렇게 준비하세요",
    content:
      "10년차 웨딩 플래너로서 더 라움 가든 예식을 50회 이상 진행했습니다. 봄/가을 시즌 예약은 최소 8개월 전에 하시는 걸 추천드립니다. 가든 예식 시 우천 대비 플랜B는 필수! 실내 전환 시 추가 비용 없이 진행 가능합니다.",
    images: ["/images/hall-2.jpg"],
    tags: ["가든예식", "플래너팁", "더라움", "봄웨딩"],
    date: "2026.03.25",
    likes: 89,
    comments: 23,
  },
  {
    id: "cr3",
    author: "이수진",
    authorType: "고객",
    hallName: "아펠가모 반포",
    rating: 5,
    title: "50명 소규모 웨딩, 아펠가모에서 완벽했어요",
    content:
      "처음엔 소규모라 웨딩홀 잡기 어려울까 걱정했는데, 아펠가모 반포가 딱이었어요. 한강뷰에 프라이빗한 공간, 하객 한 분 한 분 인사도 드릴 수 있었고, 정말 따뜻한 결혼식이었습니다. 스몰웨딩 고민하시는 분들 강추합니다!",
    images: ["/images/hall-4.jpg", "/images/dress-1.jpg"],
    tags: ["스몰웨딩", "한강뷰", "프라이빗", "소규모"],
    date: "2026.03.20",
    likes: 62,
    comments: 18,
  },
  {
    id: "cr4",
    author: "최유나 플래너",
    authorType: "플래너",
    hallName: "롯데호텔 서울",
    rating: 5,
    title: "[플래너 후기] 롯데호텔 크리스탈 볼룸 200명 웨딩",
    content:
      "롯데호텔 크리스탈 볼룸에서 200명 규모의 웨딩을 진행했습니다. 볼룸의 샹들리에와 조명 연출이 정말 화려하고, 격식 있는 예식을 원하시는 분들께 안성맞춤입니다. 식대는 11만원대로 높은 편이지만, 퀄리티는 보장합니다.",
    images: ["/images/hall-3.jpg"],
    tags: ["럭셔리", "격식웨딩", "크리스탈볼룸", "대형웨딩"],
    date: "2026.03.15",
    likes: 34,
    comments: 8,
  },
  {
    id: "cr5",
    author: "정하늘",
    authorType: "고객",
    hallName: "코엑스 인터컨티넨탈",
    rating: 4,
    title: "교통 접근성 최고! 코엑스 인터컨티넨탈 후기",
    content:
      "강남 한복판이라 하객분들 교통이 정말 편했습니다. 지하철에서 바로 연결되고, 주차도 넉넉해서 좋았어요. 다만 주말 예식은 다른 행사와 겹칠 수 있으니 확인 필수입니다.",
    images: ["/images/hall-5.jpg"],
    tags: ["교통편리", "강남", "접근성", "주차"],
    date: "2026.03.10",
    likes: 28,
    comments: 6,
  },
];

const weddingStories: WeddingStory[] = [
  {
    id: "ws1",
    author: "김민지 & 박준혁",
    authorType: "고객",
    title: "그랜드 하얏트에서의 클래식 웨딩",
    excerpt:
      "남산이 내려다보이는 그랜드 하얏트에서 300명 하객과 함께한 우리의 결혼식. 6개월간의 준비 과정과 당일 이야기를 상세히 공유합니다.",
    coverImage: "/images/hall-1.jpg",
    hallName: "그랜드 하얏트 서울",
    weddingDate: "2026.03.15",
    category: "호텔 웨딩",
    readTime: "8분",
    likes: 124,
    comments: 32,
    sections: [],
  },
  {
    id: "ws2",
    author: "이수진 & 강도윤",
    authorType: "고객",
    title: "50명과 함께한 아펠가모 소규모 웨딩",
    excerpt:
      "대규모 결혼식 대신 가까운 사람들만 초대한 프라이빗 웨딩. 한강뷰 아펠가모에서의 따뜻한 하루를 소개합니다.",
    coverImage: "/images/hall-4.jpg",
    hallName: "아펠가모 반포",
    weddingDate: "2026.02.22",
    category: "스몰 웨딩",
    readTime: "6분",
    likes: 98,
    comments: 27,
    sections: [],
  },
  {
    id: "ws3",
    author: "박서연 플래너",
    authorType: "플래너",
    title: "더 라움 봄 가든 웨딩 A to Z",
    excerpt:
      "10년차 플래너가 알려주는 더 라움 가든 예식의 모든 것. 답사 포인트, 우천 대비, 데코레이션 팁까지 총정리.",
    coverImage: "/images/hall-2.jpg",
    hallName: "더 라움",
    weddingDate: "2026.04.05",
    category: "가든 웨딩",
    readTime: "10분",
    likes: 156,
    comments: 41,
    sections: [],
  },
  {
    id: "ws4",
    author: "최유나 플래너",
    authorType: "플래너",
    title: "롯데호텔 크리스탈 볼룸 200명 웨딩 리포트",
    excerpt:
      "격식 있는 호텔 웨딩의 정석. 롯데호텔 크리스탈 볼룸에서 진행한 웨딩의 타임라인, 비용, 후기를 상세히 정리했습니다.",
    coverImage: "/images/hall-3.jpg",
    hallName: "롯데호텔 서울",
    weddingDate: "2026.03.08",
    category: "호텔 웨딩",
    readTime: "12분",
    likes: 87,
    comments: 19,
    sections: [],
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("customer");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#f7f6f3] py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">
            Community
          </p>
          <h1 className="font-serif text-3xl lg:text-5xl text-[#212121] tracking-[1px]">
            커뮤니티
          </h1>
          <div className="w-12 h-[1px] bg-sage mx-auto mt-6 mb-6" />
          <p className="text-[14px] text-[#6b6b6b] max-w-lg mx-auto">
            고객과 플래너가 함께 만드는 진짜 웨딩 이야기
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
        {/* Tabs */}
        <div className="flex gap-0 border-b border-[#e5e5e5] mb-10">
          <button
            onClick={() => setActiveTab("customer")}
            className={`px-6 py-3 text-[14px] tracking-[0.5px] transition-colors duration-300 border-b-2 -mb-px ${
              activeTab === "customer"
                ? "border-sage text-sage font-medium"
                : "border-transparent text-[#999] hover:text-[#6b6b6b]"
            }`}
          >
            고객 후기
          </button>
          <button
            onClick={() => setActiveTab("wedding-story")}
            className={`px-6 py-3 text-[14px] tracking-[0.5px] transition-colors duration-300 border-b-2 -mb-px ${
              activeTab === "wedding-story"
                ? "border-sage text-sage font-medium"
                : "border-transparent text-[#999] hover:text-[#6b6b6b]"
            }`}
          >
            웨딩 후기 상세
          </button>
        </div>

        {/* Customer Reviews */}
        {activeTab === "customer" && (
          <div className="space-y-6">
            {/* Write button */}
            <div className="flex justify-end">
              <Button className="bg-sage hover:bg-sage-dark text-white rounded-[3px] text-[13px] tracking-[0.5px] gap-2">
                <Camera className="h-4 w-4" />
                후기 작성하기
              </Button>
            </div>

            {customerReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-[#ebebeb] p-6 lg:p-8 hover:border-sage/30 transition-colors duration-300"
              >
                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f2f0ed] flex items-center justify-center">
                    {review.authorType === "플래너" ? (
                      <Award className="h-5 w-5 text-sage" />
                    ) : (
                      <User className="h-5 w-5 text-[#999]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium text-[#212121]">
                        {review.author}
                      </span>
                      <Badge
                        className={`text-[10px] ${
                          review.authorType === "플래너"
                            ? "bg-sage/10 text-sage"
                            : "bg-[#f6f6f6] text-[#999]"
                        }`}
                      >
                        {review.authorType}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#bbb]">
                      <span>{review.hallName}</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < review.rating ? "text-sage fill-sage" : "text-[#e5e5e5]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-medium text-[#212121] mb-3">
                  {review.title}
                </h3>

                {/* Content */}
                <p className="text-[13px] text-[#6b6b6b] leading-[1.8] mb-4">
                  {review.content}
                </p>

                {/* Images */}
                {review.images.length > 0 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto">
                    {review.images.map((img, i) => (
                      <div
                        key={i}
                        className="w-32 h-32 lg:w-40 lg:h-40 relative flex-shrink-0 bg-[#f2f0ed] overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`후기 이미지 ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="160px"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-sage tracking-[0.5px]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-5 pt-4 border-t border-[#ebebeb]">
                  <button
                    onClick={() => toggleLike(review.id)}
                    className={`flex items-center gap-1.5 text-[12px] transition-colors duration-300 ${
                      likedIds.has(review.id) ? "text-red-400" : "text-[#bbb] hover:text-red-400"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedIds.has(review.id) ? "fill-red-400" : ""}`} />
                    {review.likes + (likedIds.has(review.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-[12px] text-[#bbb] hover:text-[#6b6b6b] transition-colors duration-300">
                    <MessageCircle className="h-4 w-4" />
                    {review.comments}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wedding Stories */}
        {activeTab === "wedding-story" && (
          <div className="space-y-8">
            <div className="flex justify-end">
              <Button className="bg-sage hover:bg-sage-dark text-white rounded-[3px] text-[13px] tracking-[0.5px] gap-2">
                <Camera className="h-4 w-4" />
                웨딩 스토리 작성하기
              </Button>
            </div>

            {/* Featured Story */}
            {weddingStories[0] && (
              <div className="group cursor-pointer mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[400px] relative bg-[#f2f0ed] overflow-hidden">
                    <Image
                      src={weddingStories[0].coverImage}
                      alt={weddingStories[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="bg-[#f7f6f3] p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        className={`text-[10px] ${
                          weddingStories[0].authorType === "플래너"
                            ? "bg-sage/10 text-sage"
                            : "bg-[#f6f6f6] text-[#999]"
                        }`}
                      >
                        {weddingStories[0].authorType}
                      </Badge>
                      <span className="text-[11px] text-sage tracking-[2px] uppercase">
                        {weddingStories[0].category}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl lg:text-3xl text-[#212121] leading-snug group-hover:text-sage transition-colors duration-300">
                      {weddingStories[0].title}
                    </h2>
                    <p className="text-[13px] text-[#6b6b6b] mt-4 leading-[1.8]">
                      {weddingStories[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-6 text-[12px] text-[#bbb]">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {weddingStories[0].author}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {weddingStories[0].hallName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {weddingStories[0].weddingDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="flex items-center gap-1 text-[12px] text-[#bbb]">
                        <Heart className="h-3.5 w-3.5" /> {weddingStories[0].likes}
                      </span>
                      <span className="flex items-center gap-1 text-[12px] text-[#bbb]">
                        <MessageCircle className="h-3.5 w-3.5" /> {weddingStories[0].comments}
                      </span>
                    </div>
                    <div className="mt-6">
                      <span className="inline-flex items-center gap-1 text-[13px] text-sage border-b border-sage/30 pb-0.5 tracking-[0.5px]">
                        자세히 읽기 <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Story Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {weddingStories.slice(1).map((story) => (
                <article key={story.id} className="group cursor-pointer">
                  <div className="aspect-[16/10] relative bg-[#f2f0ed] overflow-hidden mb-5">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <Badge
                        className={`text-[10px] ${
                          story.authorType === "플래너"
                            ? "bg-sage text-white"
                            : "bg-white/90 text-[#4f4f4f]"
                        }`}
                      >
                        {story.authorType}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-[11px] text-sage tracking-[2px] uppercase">
                    {story.category}
                  </span>
                  <h3 className="font-serif text-[17px] text-[#212121] mt-2 leading-snug group-hover:text-sage transition-colors duration-300 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-[12px] text-[#999] mt-2 leading-[1.8] line-clamp-2">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-[11px] text-[#bbb]">
                    <span>{story.author}</span>
                    <span>{story.hallName}</span>
                    <span>{story.readTime} 읽기</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[11px] text-[#bbb]">
                      <Heart className="h-3 w-3" /> {story.likes}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#bbb]">
                      <MessageCircle className="h-3 w-3" /> {story.comments}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
