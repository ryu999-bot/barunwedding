"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface Slide {
  id: string;
  type: "video" | "image";
  src: string;
  title: string;
  subtitle: string;
  largeSubtitle?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  ctaEnabled?: boolean;
  cta2Label?: string;
  cta2Href?: string;
  cta2Enabled?: boolean;
}

const fallbackSlides: Slide[] = [
  {
    id: "fallback",
    type: "video",
    src: "https://videos.pexels.com/video-files/3587444/3587444-uhd_2560_1440_25fps.mp4",
    title: "결혼 준비의\n모든 순간을",
    subtitle: "바른카드 50년 신뢰를 기반으로 한 프리미엄 웨딩 컨설팅.",
    ctaLabel: "비용 시뮬레이터",
    ctaHref: "/simulator",
  },
];

export function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    apiFetch("/api/banners")
      .then((r) => r.json())
      .then((data: Slide[]) => {
        if (data.length > 0) setSlides(data);
      })
      .catch(() => {});
  }, []);

  const goTo = useCallback(
    (index: number, dir: "left" | "right") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "right");
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "left");
  }, [current, slides.length, goTo]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  const slide = slides[current] || slides[0];

  return (
    <section className="relative min-h-[600px] lg:min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            i === current
              ? "opacity-100 translate-x-0"
              : direction === "right"
                ? i < current
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
                : i > current
                  ? "opacity-0 translate-x-full"
                  : "opacity-0 -translate-x-full"
          }`}
        >
          {s.type === "video" ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              autoPlay
              loop
              src={s.src}
            />
          ) : (
            <Image
              src={s.src}
              alt={s.title}
              fill
              className="object-cover"
              priority={i === 0}
            />
          )}
        </div>
      ))}

      <div className="absolute inset-0 bg-black/40" />

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
            aria-label="이전"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
            aria-label="다음"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      <div
        key={current}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center animate-fade-in"
      >
        <p className="font-serif text-white/60 text-sm sm:text-base tracking-[4px] uppercase mb-8">
          Barun Wedding
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white leading-tight mb-8 tracking-[1px] whitespace-pre-line">
          {slide.title}
        </h1>
        <p
          className={`mx-auto mb-14 leading-relaxed tracking-wide whitespace-pre-line ${
            slide.largeSubtitle
              ? "font-serif text-2xl sm:text-3xl lg:text-5xl text-white max-w-2xl"
              : "text-white/50 text-[14px] sm:text-[15px] max-w-lg"
          }`}
        >
          {slide.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {slide.ctaEnabled !== false && slide.ctaLabel && slide.ctaHref && (
            <Link href={slide.ctaHref}>
              <Button
                size="lg"
                className="bg-white/90 hover:bg-white text-[#212121] rounded-[3px] px-10 h-12 text-[13px] tracking-[1px] transition-all duration-300 backdrop-blur-sm"
              >
                {slide.ctaLabel}
              </Button>
            </Link>
          )}
          {slide.cta2Enabled !== false && slide.cta2Label && slide.cta2Href && (
            <Link href={slide.cta2Href}>
              <Button
                size="lg"
                className="bg-sage hover:bg-sage-dark text-white rounded-[3px] px-10 h-12 text-[13px] tracking-[1px] transition-all duration-300"
              >
                {slide.cta2Label}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-white w-8"
                  : "bg-white/40 w-2 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
