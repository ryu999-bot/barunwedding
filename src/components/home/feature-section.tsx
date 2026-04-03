import { Calculator, CheckSquare, Search, MessageCircle } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Search,
    title: "스마트 검색",
    description:
      "지역, 예산, 인원, 날짜 등 다양한 조건으로 나에게 맞는 웨딩홀을 찾고, 최대 3곳까지 나란히 비교하세요.",
    href: "/wedding-halls",
  },
  {
    icon: Calculator,
    title: "비용 시뮬레이터",
    description:
      "웨딩홀, 스드메, 부가서비스까지 실시간으로 총 비용을 계산하세요. 투명한 비용으로 현명한 선택을.",
    href: "/simulator",
  },
  {
    icon: CheckSquare,
    title: "D-Day 체크리스트",
    description:
      "결혼 준비 타임라인을 한눈에. 진행 상황을 관리하고, 놓치는 것 없이 준비하세요.",
    href: "/checklist",
  },
  {
    icon: MessageCircle,
    title: "전문 상담",
    description:
      "카카오톡 또는 온라인 폼으로 전문 플래너와 바로 상담하세요. 빠르고 편리한 맞춤 상담.",
    href: "/consultation",
  },
];

export function FeatureSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">
            Services
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-[#212121] tracking-[1px]">
            바른웨딩만의 특별한 기능
          </h2>
          <div className="w-12 h-[1px] bg-sage mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e5e5e5]">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <div className="group bg-white p-10 h-full hover:bg-[#fafaf8] transition-all duration-500">
                <feature.icon className="h-5 w-5 text-sage mb-6 group-hover:text-sage-dark transition-colors duration-300" />
                <h3 className="text-[14px] font-medium text-[#212121] mb-4 group-hover:text-sage transition-colors duration-300 tracking-[0.5px]">
                  {feature.title}
                </h3>
                <p className="text-[12px] text-[#999] leading-[1.8]">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
