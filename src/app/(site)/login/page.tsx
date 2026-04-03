"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-10">
          <Link href="/">
            <span className="font-serif text-3xl tracking-[2px] text-[#212121]">
              BARUN WEDDING
            </span>
          </Link>
          <p className="text-[13px] text-[#999] mt-3">로그인하고 맞춤 웨딩 서비스를 이용하세요</p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); alert("로그인 기능은 준비 중입니다."); }}
          className="space-y-4"
        >
          <div>
            <Label className="text-[13px]">이메일</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
              className="mt-1 h-11"
            />
          </div>
          <div>
            <Label className="text-[13px]">비밀번호</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              className="mt-1 h-11"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-sage hover:bg-sage-dark text-white h-11 text-[14px] tracking-[0.5px]"
          >
            로그인
          </Button>
        </form>

        <div className="flex items-center justify-between mt-4 text-[12px] text-[#999]">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" className="accent-sage" />
            로그인 상태 유지
          </label>
          <button className="hover:text-sage transition-colors">비밀번호 찾기</button>
        </div>

        <div className="flex items-center gap-3 my-8">
          <div className="h-px flex-1 bg-[#e5e5e5]" />
          <span className="text-[11px] text-[#bbb]">간편 로그인</span>
          <div className="h-px flex-1 bg-[#e5e5e5]" />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-11 border-[#e5e5e5] text-[13px] gap-2 hover:bg-[#FEE500] hover:border-[#FEE500] hover:text-[#3C1E1E]"
            onClick={() => alert("카카오 로그인은 준비 중입니다.")}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 3c-5.076 0-9.192 3.272-9.192 7.31 0 2.596 1.733 4.877 4.34 6.163-.192.713-.694 2.585-.794 2.985-.123.488.18.482.378.35.156-.103 2.479-1.685 3.484-2.372.58.086 1.173.13 1.784.13 5.076 0 9.192-3.272 9.192-7.31 0-4.039-4.116-7.31-9.192-7.31" />
            </svg>
            카카오
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-11 border-[#e5e5e5] text-[13px] gap-2 hover:bg-[#03C75A] hover:border-[#03C75A] hover:text-white"
            onClick={() => alert("네이버 로그인은 준비 중입니다.")}
          >
            <span className="font-bold text-[14px]">N</span>
            네이버
          </Button>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-[13px] text-[#999]">
          아직 회원이 아니신가요?{" "}
          <Link href="/signup" className="text-sage hover:text-sage-dark font-medium transition-colors">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
