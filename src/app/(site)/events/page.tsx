import { Calendar, Gift, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: 1,
    title: "봄 웨딩 특별 프로모션",
    description:
      "3~5월 예식 예약 시 스드메 패키지 15% 할인! 바른웨딩에서만 만날 수 있는 특별한 혜택.",
    period: "2026.03.01 ~ 2026.05.31",
    badge: "진행중",
    badgeColor: "bg-green-500",
  },
  {
    id: 2,
    title: "신규 가입 이벤트",
    description:
      "바른웨딩 회원 가입 시 웨딩 체크리스트 프리미엄 기능 3개월 무료 제공.",
    period: "2026.04.01 ~ 2026.06.30",
    badge: "진행중",
    badgeColor: "bg-green-500",
  },
  {
    id: 3,
    title: "2026 서울 웨딩 박람회",
    description:
      "코엑스에서 열리는 대한민국 최대 웨딩 박람회. 바른웨딩 부스에서 현장 상담과 특별 할인을 만나보세요.",
    period: "2026.05.15 ~ 2026.05.17",
    badge: "예정",
    badgeColor: "bg-sage",
  },
  {
    id: 4,
    title: "후기 작성 이벤트",
    description:
      "바른웨딩을 통해 결혼 준비를 하신 분! 후기 작성 시 스타벅스 기프트카드를 드립니다.",
    period: "상시 진행",
    badge: "상시",
    badgeColor: "bg-[#212121]",
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sage font-medium text-sm tracking-[2px] uppercase mb-2">
            Events & Promotions
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold font-serif text-[#212121]">
            이벤트 &middot; 프로모션
          </h1>
          <p className="text-muted-foreground mt-2">
            바른웨딩의 특별한 혜택을 놓치지 마세요
          </p>
        </div>

        <div className="space-y-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 lg:w-64 bg-gradient-to-br from-[#f6f6f6] to-sage-muted flex items-center justify-center p-8">
                    <Gift className="h-12 w-12 text-[#212121]/20" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${event.badgeColor} text-white text-xs`}>
                        {event.badge}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.period}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#212121] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="text-sage hover:text-sage-dark mt-3 px-0 gap-1"
                    >
                      자세히 보기 <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
