"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    weddingDate: "",
    needConsult: [] as string[],
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16">
        <div className="text-center max-w-md px-4">
          <CheckCircle className="h-12 w-12 text-sage mx-auto mb-5" />
          <h1 className="font-serif text-2xl text-[#212121] mb-3">회원가입이 완료되었습니다</h1>
          <p className="text-[13px] text-[#6b6b6b] mb-8">
            바른웨딩의 다양한 서비스를 이용하실 수 있습니다.
          </p>
          <Link href="/login">
            <Button className="bg-sage hover:bg-sage-dark text-white px-10 h-11 text-[14px]">
              로그인하기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-10">
          <Link href="/">
            <span className="font-serif text-3xl tracking-[2px] text-[#212121]">
              BARUN WEDDING
            </span>
          </Link>
          <p className="text-[13px] text-[#999] mt-3">회원가입하고 맞춤 웨딩 서비스를 시작하세요</p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await apiFetch("/api/data/members", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: Date.now().toString(),
                name: form.name,
                email: form.email,
                phone: form.phone,
                weddingDate: form.weddingDate || "",
                needConsult: form.needConsult,
                date: new Date().toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
                status: "활성",
              }),
            });
            setSubmitted(true);
          }}
          className="space-y-4"
        >
          <div>
            <Label className="text-[13px]">이름 *</Label>
            <Input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="이름을 입력하세요"
              required
              className="mt-1 h-11"
            />
          </div>
          <div>
            <Label className="text-[13px]">이메일 *</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="email@example.com"
              required
              className="mt-1 h-11"
            />
          </div>
          <div>
            <Label className="text-[13px]">비밀번호 *</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="8자 이상 입력하세요"
              required
              minLength={8}
              className="mt-1 h-11"
            />
          </div>
          <div>
            <Label className="text-[13px]">비밀번호 확인 *</Label>
            <Input
              type="password"
              value={form.passwordConfirm}
              onChange={(e) => update("passwordConfirm", e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              required
              className="mt-1 h-11"
            />
            {form.passwordConfirm && form.password !== form.passwordConfirm && (
              <p className="text-[11px] text-red-400 mt-1">비밀번호가 일치하지 않습니다</p>
            )}
          </div>
          <div>
            <Label className="text-[13px]">연락처 *</Label>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="010-0000-0000"
              required
              className="mt-1 h-11"
            />
          </div>

          <div className="h-px bg-[#e5e5e5] my-2" />

          <div>
            <Label className="text-[13px]">예식 예정일</Label>
            <Input
              type="date"
              value={form.weddingDate}
              onChange={(e) => update("weddingDate", e.target.value)}
              className="mt-1 h-11"
            />
          </div>
          <div>
            <Label className="text-[13px]">플래너 상담 필요 항목</Label>
            <p className="text-[11px] text-[#bbb] mt-0.5 mb-2">해당하는 항목을 모두 선택해주세요</p>
            <div className="grid grid-cols-2 gap-2">
              {["웨딩홀", "스드메", "비용 상담", "패키지", "스몰웨딩", "허니문", "예물/예단", "기타"].map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-2 px-3 py-2.5 border cursor-pointer text-[13px] transition-colors duration-200 ${
                    form.needConsult.includes(item)
                      ? "border-sage bg-sage-muted text-[#212121]"
                      : "border-[#e5e5e5] text-[#6b6b6b] hover:border-sage/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.needConsult.includes(item)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm((p) => ({ ...p, needConsult: [...p.needConsult, item] }));
                      } else {
                        setForm((p) => ({ ...p, needConsult: p.needConsult.filter((i) => i !== item) }));
                      }
                    }}
                    className="accent-sage w-3.5 h-3.5"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <label className="flex items-start gap-2 cursor-pointer text-[12px] text-[#6b6b6b]">
              <input type="checkbox" required className="accent-sage mt-0.5" />
              <span>[필수] 이용약관 및 개인정보처리방침에 동의합니다</span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer text-[12px] text-[#6b6b6b]">
              <input type="checkbox" className="accent-sage mt-0.5" />
              <span>[선택] 마케팅 정보 수신에 동의합니다</span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-sage hover:bg-sage-dark text-white h-11 text-[14px] tracking-[0.5px] mt-4"
            disabled={form.password !== form.passwordConfirm && form.passwordConfirm.length > 0}
          >
            회원가입
          </Button>
        </form>

        <Separator className="my-8" />

        <p className="text-center text-[13px] text-[#999]">
          이미 회원이신가요?{" "}
          <Link href="/login" className="text-sage hover:text-sage-dark font-medium transition-colors">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
