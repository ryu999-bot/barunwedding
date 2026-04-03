"use client";

import { useState } from "react";
import { MessageCircle, Phone, Send, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitConsultation } from "@/lib/submit-consultation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-sage-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-sage" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-[#212121] mb-3">
            상담 신청이 완료되었습니다!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            담당 플래너가 영업일 기준 1일 이내에 연락드리겠습니다.
            <br />
            빠른 상담을 원하시면 카카오톡으로 문의해주세요.
          </p>
          <Button
            className="mt-6 bg-[#FEE500] text-[#3C1E1E] hover:bg-[#FDD800]"
            size="lg"
          >
            카카오톡 상담
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-sage-muted text-sage-dark px-4 py-1.5 rounded-[3px] text-sm font-medium mb-4">
            <MessageCircle className="h-4 w-4" />
            무료 상담
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold font-serif text-[#212121]">
            전문 웨딩 플래너 상담
          </h1>
          <p className="text-muted-foreground mt-2">
            간편하게 정보를 입력하시면 전담 플래너가 맞춤 상담을 드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-sm text-center">
            <CardContent className="p-5">
              <Phone className="h-6 w-6 text-[#212121] mx-auto mb-2" />
              <h3 className="font-medium text-[#212121] text-sm">전화 상담</h3>
              <p className="text-xs text-muted-foreground mt-1">
                02-1234-5678
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm text-center">
            <CardContent className="p-5">
              <MessageCircle className="h-6 w-6 text-[#212121] mx-auto mb-2" />
              <h3 className="font-medium text-[#212121] text-sm">카카오톡</h3>
              <p className="text-xs text-muted-foreground mt-1">@바른웨딩</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm text-center">
            <CardContent className="p-5">
              <Send className="h-6 w-6 text-[#212121] mx-auto mb-2" />
              <h3 className="font-medium text-[#212121] text-sm">이메일</h3>
              <p className="text-xs text-muted-foreground mt-1">
                hello@barun-wedding.kr
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6 lg:p-8">
            <h2 className="text-lg font-semibold font-serif text-[#212121] mb-6">
              온라인 상담 신청
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                await submitConsultation({
                  name: formData.get("name") as string,
                  phone: formData.get("phone") as string,
                  weddingDate: formData.get("weddingDate") as string,
                  guestCount: formData.get("guestCount") as string,
                  message: formData.get("message") as string,
                  source: "상담페이지",
                });
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#212121] mb-2 block">
                    이름 *
                  </label>
                  <Input name="name" placeholder="이름을 입력하세요" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#212121] mb-2 block">
                    연락처 *
                  </label>
                  <Input
                    name="phone"
                    placeholder="010-0000-0000"
                    type="tel"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#212121] mb-2 block">
                    예식 예정일
                  </label>
                  <Input name="weddingDate" type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#212121] mb-2 block">
                    예상 하객 수
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50명 이하</SelectItem>
                      <SelectItem value="100">50~100명</SelectItem>
                      <SelectItem value="200">100~200명</SelectItem>
                      <SelectItem value="300">200~300명</SelectItem>
                      <SelectItem value="500">300명 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#212121] mb-2 block">
                  관심 서비스
                </label>
                <div className="flex flex-wrap gap-2">
                  {["웨딩홀", "스드메", "비용 상담", "패키지", "기타"].map(
                    (service) => (
                      <label
                        key={service}
                        className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg cursor-pointer hover:border-sage/30 text-sm"
                      >
                        <input type="checkbox" className="accent-sage" />
                        {service}
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#212121] mb-2 block">
                  문의 내용
                </label>
                <textarea
                  rows={4}
                  placeholder="궁금한 점이나 원하시는 내용을 자유롭게 작성해주세요"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sage/50"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-sage hover:bg-sage-dark text-white h-12 text-base"
              >
                상담 신청하기
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                개인정보는 상담 목적으로만 사용되며, 상담 완료 후 안전하게
                폐기됩니다.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
