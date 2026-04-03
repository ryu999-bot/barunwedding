import type { Metadata } from "next";
import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "바른웨딩 | 결혼 준비의 모든 순간을, 당신의 속도와 맞춰",
  description:
    "바른카드 50년 신뢰를 기반으로 한 프리미엄 웨딩 컨설팅 플랫폼. 웨딩홀 비교, AI 비용 시뮬레이터, D-Day 체크리스트까지.",
  keywords: ["웨딩", "결혼준비", "웨딩홀", "스드메", "바른웨딩"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
