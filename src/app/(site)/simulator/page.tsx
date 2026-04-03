"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  Building2,
  Camera,
  Sparkles,
  Gift,
  TrendingUp,
  Send,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { submitConsultation } from "@/lib/submit-consultation";

const set = (fn: (v: string) => void) => (v: string | null) => {
  if (v !== null) fn(v);
};

export default function SimulatorPage() {
  const [guests, setGuests] = useState([200]);
  const [hallType, setHallType] = useState("호텔");
  const [mealGrade, setMealGrade] = useState("standard");
  const [studioGrade, setStudioGrade] = useState("standard");
  const [dressGrade, setDressGrade] = useState("standard");
  const [makeupGrade, setMakeupGrade] = useState("standard");
  const [snapIncluded, setSnapIncluded] = useState(true);
  const [giftAmount, setGiftAmount] = useState("100000");
  const [bouquet, setBouquet] = useState(true);
  const [invitation, setInvitation] = useState(true);

  const costs = useMemo(() => {
    const guestCount = guests[0];

    const mealPrices = { economy: 55000, standard: 80000, premium: 110000 };
    const hallBase = { 호텔: 3000000, 하우스: 2000000, 컨벤션: 1500000 };
    const studioPrices = { economy: 800000, standard: 1200000, premium: 2000000 };
    const dressPrices = { economy: 500000, standard: 800000, premium: 1500000 };
    const makeupPrices = { economy: 300000, standard: 600000, premium: 1000000 };

    const meal =
      guestCount *
      mealPrices[mealGrade as keyof typeof mealPrices];
    const hall = hallBase[hallType as keyof typeof hallBase];
    const studio =
      studioPrices[studioGrade as keyof typeof studioPrices];
    const dress =
      dressPrices[dressGrade as keyof typeof dressPrices];
    const makeup =
      makeupPrices[makeupGrade as keyof typeof makeupPrices];
    const snap = snapIncluded ? 500000 : 0;
    const bouquetCost = bouquet ? 200000 : 0;
    const invitationCost = invitation ? 300000 : 0;

    const weddingHall = hall + meal;
    const sdme = studio + dress + makeup + snap;
    const extras = bouquetCost + invitationCost;
    const total = weddingHall + sdme + extras;

    return { weddingHall, meal, hall, sdme, studio, dress, makeup, snap, extras, total };
  }, [
    guests,
    hallType,
    mealGrade,
    studioGrade,
    dressGrade,
    makeupGrade,
    snapIncluded,
    bouquet,
    invitation,
  ]);

  const formatWon = (n: number) => {
    const abs = Math.abs(n);
    const sign = n < 0 ? "-" : "";
    return abs >= 10000
      ? `${sign}${(abs / 10000).toLocaleString()}만원`
      : `${n.toLocaleString()}원`;
  };

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-sage-muted text-sage-dark px-4 py-1.5 rounded-[3px] text-sm font-medium mb-4">
            <Calculator className="h-4 w-4" />
            AI 비용 시뮬레이터
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold font-serif text-[#212121]">
            나의 웨딩 비용을 실시간으로 계산해보세요
          </h1>
          <p className="text-muted-foreground mt-2">
            슬라이더와 옵션을 조절하면 즉시 예상 비용이 업데이트됩니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wedding Hall */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Building2 className="h-5 w-5 text-[#212121]" />
                  <h2 className="font-semibold text-[#212121] text-lg">웨딩홀</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-[#212121] mb-3 block">
                      예상 하객 수: <span className="text-sage">{guests[0]}명</span>
                    </label>
                    <Slider
                      value={guests}
                      onValueChange={(v) => setGuests(Array.isArray(v) ? v : [v])}
                      min={50}
                      max={1000}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>50명</span>
                      <span>1,000명</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#212121] mb-2 block">
                        웨딩홀 타입
                      </label>
                      <Select value={hallType} onValueChange={set(setHallType)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="호텔">호텔</SelectItem>
                          <SelectItem value="하우스">하우스</SelectItem>
                          <SelectItem value="컨벤션">컨벤션</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#212121] mb-2 block">
                        식사 등급
                      </label>
                      <Select value={mealGrade} onValueChange={set(setMealGrade)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">
                            이코노미 (~5.5만원)
                          </SelectItem>
                          <SelectItem value="standard">
                            스탠다드 (~8만원)
                          </SelectItem>
                          <SelectItem value="premium">
                            프리미엄 (~11만원)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* S/D/M */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Camera className="h-5 w-5 text-[#212121]" />
                  <h2 className="font-semibold text-[#212121] text-lg">스드메</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#212121] mb-2 block">
                      스튜디오
                    </label>
                    <Select
                      value={studioGrade}
                      onValueChange={set(setStudioGrade)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">이코노미</SelectItem>
                        <SelectItem value="standard">스탠다드</SelectItem>
                        <SelectItem value="premium">프리미엄</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#212121] mb-2 block">
                      드레스
                    </label>
                    <Select value={dressGrade} onValueChange={set(setDressGrade)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">이코노미</SelectItem>
                        <SelectItem value="standard">스탠다드</SelectItem>
                        <SelectItem value="premium">프리미엄</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#212121] mb-2 block">
                      헤어메이크업
                    </label>
                    <Select value={makeupGrade} onValueChange={set(setMakeupGrade)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">이코노미</SelectItem>
                        <SelectItem value="standard">스탠다드</SelectItem>
                        <SelectItem value="premium">프리미엄</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Extras */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Gift className="h-5 w-5 text-[#212121]" />
                  <h2 className="font-semibold text-[#212121] text-lg">
                    부가 서비스
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: "본식스냅",
                      checked: snapIncluded,
                      onChange: setSnapIncluded,
                      price: "50만원",
                    },
                    {
                      label: "부케",
                      checked: bouquet,
                      onChange: setBouquet,
                      price: "20만원",
                    },
                    {
                      label: "청첩장",
                      checked: invitation,
                      onChange: setInvitation,
                      price: "30만원",
                    },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className={`flex items-center gap-3 p-4 rounded-sm border cursor-pointer transition-colors ${
                        item.checked
                          ? "border-sage bg-sage-muted"
                          : "border-border hover:border-sage/30"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => item.onChange(e.target.checked)}
                        className="accent-sage w-4 h-4"
                      />
                      <div>
                        <span className="text-sm font-medium text-[#212121]">
                          {item.label}
                        </span>
                        <span className="text-xs text-muted-foreground block">
                          {item.price}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 축의금 */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="h-5 w-5 text-[#212121]" />
                  <h2 className="font-semibold text-[#212121] text-lg">축의금 설정</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-[#212121] mb-3 block">
                      1인당 축의금: <span className="text-sage">{formatWon(Number(giftAmount))}</span>
                    </label>
                    <Slider
                      value={[Number(giftAmount)]}
                      onValueChange={(v) => setGiftAmount(String(Array.isArray(v) ? v[0] : v))}
                      min={50000}
                      max={500000}
                      step={50000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5만원</span>
                      <span>50만원</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#212121] mb-3 block">
                      예상 하객 수: <span className="text-sage">{guests[0]}명</span>
                    </label>
                    <Slider
                      value={guests}
                      onValueChange={(v) => setGuests(Array.isArray(v) ? v : [v])}
                      min={50}
                      max={1000}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>50명</span>
                      <span>1,000명</span>
                    </div>
                    <p className="text-[11px] text-[#bbb] mt-1">위 웨딩홀 하객 수와 연동됩니다</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consultation Form with Simulation Summary */}
            <ConsultationFromSimulator
              hallType={hallType}
              mealGrade={mealGrade}
              guests={guests[0]}
              studioGrade={studioGrade}
              dressGrade={dressGrade}
              makeupGrade={makeupGrade}
              snapIncluded={snapIncluded}
              bouquet={bouquet}
              invitation={invitation}
              totalCost={costs.total}
              formatWon={formatWon}
            />
          </div>

          {/* Right: Dashboard */}
          <div>
            <Card className="border-0 shadow-md sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="h-5 w-5 text-sage" />
                  <h2 className="font-semibold text-[#212121] text-lg">
                    예상 총 비용
                  </h2>
                </div>

                <div className="text-center py-4">
                  <p className="text-3xl lg:text-4xl font-bold text-[#212121]">
                    {formatWon(costs.total)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    예상 총 웨딩 비용
                  </p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" /> 웨딩홀
                      </span>
                      <span className="font-medium text-[#212121]">
                        {formatWon(costs.weddingHall)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-[#212121] rounded-full h-2 transition-all"
                        style={{
                          width: `${(costs.weddingHall / costs.total) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>홀 대관: {formatWon(costs.hall)}</span>
                      <span>식사: {formatWon(costs.meal)}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Camera className="h-3.5 w-3.5" /> 스드메
                      </span>
                      <span className="font-medium text-[#212121]">
                        {formatWon(costs.sdme)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-sage rounded-full h-2 transition-all"
                        style={{
                          width: `${(costs.sdme / costs.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Gift className="h-3.5 w-3.5" /> 부가서비스
                      </span>
                      <span className="font-medium text-[#212121]">
                        {formatWon(costs.extras)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-[#6b6b6b] rounded-full h-2 transition-all"
                        style={{
                          width: `${(costs.extras / costs.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">1인당 평균</span>
                    <span className="font-medium">
                      {formatWon(Math.round(costs.total / guests[0]))}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      예상 축의금 ({(Number(giftAmount) / 10000).toFixed(0)}만원 × {guests[0]}명)
                    </span>
                    <span className="font-medium text-sage-dark">
                      {formatWon(guests[0] * Number(giftAmount))}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">예상 차액</span>
                    <span
                      className={`font-medium ${
                        guests[0] * Number(giftAmount) - costs.total >= 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {guests[0] * Number(giftAmount) - costs.total >= 0 ? "+" : ""}
                      {formatWon(guests[0] * Number(giftAmount) - costs.total)}
                    </span>
                  </div>
                </div>

                <Badge className="w-full justify-center mt-4 bg-[#f6f6f6] text-[#6b6b6b] py-2">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  AI 기반 실시간 비용 산출
                </Badge>
                <p className="text-[11px] text-[#bbb] text-center mt-2">
                  상세 옵션에 따라 비용 변동이 있을 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsultationFromSimulator({
  hallType,
  mealGrade,
  guests,
  studioGrade,
  dressGrade,
  makeupGrade,
  snapIncluded,
  bouquet,
  invitation,
  totalCost,
  formatWon,
}: {
  hallType: string;
  mealGrade: string;
  guests: number;
  studioGrade: string;
  dressGrade: string;
  makeupGrade: string;
  snapIncluded: boolean;
  bouquet: boolean;
  invitation: boolean;
  totalCost: number;
  formatWon: (n: number) => string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [message, setMessage] = useState("");

  const gradeLabel = (g: string) =>
    g === "economy" ? "이코노미" : g === "standard" ? "스탠다드" : "프리미엄";

  const extras = [
    snapIncluded && "본식스냅",
    bouquet && "부케",
    invitation && "청첩장",
  ].filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitConsultation({
      name,
      phone,
      email: email || undefined,
      weddingDate: weddingDate || undefined,
      guestCount: `${guests}명`,
      message: message || undefined,
      source: "시뮬레이터",
      meta: {
        hallType,
        mealGrade: gradeLabel(mealGrade),
        studioGrade: gradeLabel(studioGrade),
        dressGrade: gradeLabel(dressGrade),
        makeupGrade: gradeLabel(makeupGrade),
        snapIncluded,
        bouquet,
        invitation,
        totalCost: formatWon(totalCost),
        extras: extras.join(", "),
      },
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="w-14 h-14 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-7 w-7 text-sage" />
          </div>
          <h3 className="font-serif text-xl text-[#212121] mb-2">
            상담 신청이 완료되었습니다
          </h3>
          <p className="text-[13px] text-[#6b6b6b]">
            시뮬레이션 결과와 함께 접수되었습니다.
            <br />
            담당 플래너가 영업일 1일 이내 연락드리겠습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Send className="h-5 w-5 text-sage" />
          <h2 className="font-semibold text-[#212121] text-lg">
            이 견적으로 상담 신청하기
          </h2>
        </div>

        {/* Simulation Summary */}
        <div className="bg-[#f7f6f3] p-5 mb-6">
          <p className="text-[12px] text-[#999] tracking-[1px] uppercase mb-3">
            시뮬레이션 요약
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-[13px]">
            <div className="flex justify-between">
              <span className="text-[#999]">웨딩홀</span>
              <span className="text-[#212121]">{hallType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999]">하객 수</span>
              <span className="text-[#212121]">{guests}명</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999]">식사</span>
              <span className="text-[#212121]">{gradeLabel(mealGrade)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999]">스튜디오</span>
              <span className="text-[#212121]">{gradeLabel(studioGrade)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999]">드레스</span>
              <span className="text-[#212121]">{gradeLabel(dressGrade)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999]">메이크업</span>
              <span className="text-[#212121]">{gradeLabel(makeupGrade)}</span>
            </div>
            {extras.length > 0 && (
              <div className="flex justify-between col-span-2 sm:col-span-3">
                <span className="text-[#999]">부가서비스</span>
                <span className="text-[#212121]">{extras.join(", ")}</span>
              </div>
            )}
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-medium text-[#212121]">예상 총 비용</span>
            <span className="text-[18px] font-bold text-sage">{formatWon(totalCost)}</span>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-[13px]">이름 *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-[13px]">연락처 *</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                type="tel"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-[13px]">이메일</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                type="email"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-[13px]">예식 예정일</Label>
              <Input
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                type="date"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label className="text-[13px]">추가 문의 사항</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="궁금한 점이나 원하시는 조건을 자유롭게 작성해주세요"
              rows={3}
              className="mt-1"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-sage hover:bg-sage-dark text-white h-12 text-[14px] tracking-[0.5px] gap-2"
          >
            <Send className="h-4 w-4" />
            이 견적으로 상담 접수하기
          </Button>
          <p className="text-[11px] text-[#bbb] text-center">
            위 시뮬레이션 결과가 상담 내용에 자동으로 포함됩니다
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
