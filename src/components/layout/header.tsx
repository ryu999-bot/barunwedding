"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const aboutSubItems = [
  { href: "/about", label: "바른웨딩 소개" },
  { href: "/about/services", label: "웨딩 서비스" },
  { href: "/about/planners", label: "웨딩 플래너" },
  { href: "/about/location", label: "찾아오시는 길" },
];

const navItems = [
  { href: "/wedding-halls", label: "웨딩홀" },
  { href: "/wedding-collection", label: "웨딩컬렉션" },
  { href: "/simulator", label: "비용 시뮬레이터" },
  { href: "/checklist", label: "체크리스트" },
  { href: "/magazine", label: "매거진" },
  { href: "/community", label: "커뮤니티" },
  { href: "/events", label: "이벤트" },
];

interface FamilySite {
  name: string;
  url: string;
  visible: boolean;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [familyOpen, setFamilyOpen] = useState(false);
  const [familySites, setFamilySites] = useState<FamilySite[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const familyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
      if (familyRef.current && !familyRef.current.contains(e.target as Node)) {
        setFamilyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch("/api/pages")
      .then((r) => r.json())
      .then((d) => {
        if (d.familySites) setFamilySites(d.familySites.filter((s: FamilySite) => s.visible));
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-sm border-b border-[#e5e5e5]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[93px]">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <span className="font-serif text-2xl tracking-[2px] text-[#212121]">
                BARUN WEDDING
              </span>
            </Link>
            {familySites.length > 0 && (
              <div ref={familyRef} className="relative hidden lg:block">
                <button
                  onClick={() => setFamilyOpen(!familyOpen)}
                  className="flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-[0.5px] text-[#bbb] hover:text-[#999] border border-[#e5e5e5] rounded-[3px] transition-colors duration-300"
                >
                  패밀리 사이트
                  <ChevronDown className={`h-2.5 w-2.5 transition-transform duration-200 ${familyOpen ? "rotate-180" : ""}`} />
                </button>
                {familyOpen && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-[#e5e5e5] shadow-sm py-1 z-50">
                    {familySites.map((site) => (
                      <a
                        key={site.name}
                        href={site.url}
                        target={site.url.startsWith("/") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        onClick={() => setFamilyOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-[12px] text-[#6b6b6b] hover:text-sage hover:bg-[#fafafa] transition-colors duration-200"
                      >
                        {site.name}
                        {!site.url.startsWith("/") && <ExternalLink className="h-3 w-3 text-[#ccc]" />}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <nav className="hidden lg:flex items-center gap-0">
            {/* BARUN 웨딩 dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex items-center gap-1 px-4 py-2 text-[13px] tracking-[1px] text-[#6b6b6b] hover:text-sage transition-colors duration-300"
              >
                BARUN 웨딩
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
              </button>
              {aboutOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#e5e5e5] shadow-sm py-1 z-50">
                  {aboutSubItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setAboutOpen(false)}
                      className="block px-4 py-2.5 text-[13px] text-[#6b6b6b] hover:text-sage hover:bg-[#fafafa] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-[13px] tracking-[1px] text-[#6b6b6b] hover:text-sage transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="border-[#e5e5e5] text-[#4f4f4f] hover:border-sage hover:text-sage rounded-[3px] text-[13px] tracking-[1px] transition-colors duration-300"
              >
                로그인
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="outline"
                size="sm"
                className="border-[#e5e5e5] text-[#4f4f4f] hover:border-sage hover:text-sage rounded-[3px] text-[13px] tracking-[1px] transition-colors duration-300"
              >
                회원가입
              </Button>
            </Link>
            <Link href="/consultation">
              <Button
                size="sm"
                className="bg-sage hover:bg-sage-dark text-white rounded-[3px] text-[13px] tracking-[1px] transition-colors duration-300"
              >
                상담 신청
              </Button>
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="lg:hidden inline-flex items-center justify-center p-2 text-[#212121] hover:text-sage transition-colors duration-300">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white">
              <nav className="flex flex-col gap-0 mt-8">
                {/* Mobile: BARUN 웨딩 accordion */}
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="flex items-center justify-between px-4 py-3 text-[14px] tracking-[1px] text-[#6b6b6b] border-b border-[#e5e5e5]"
                >
                  BARUN 웨딩
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileAboutOpen && (
                  <div className="bg-[#fafafa]">
                    {aboutSubItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block px-8 py-2.5 text-[13px] text-[#999] hover:text-sage border-b border-[#f0f0f0] transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-[14px] tracking-[1px] text-[#6b6b6b] hover:text-sage border-b border-[#e5e5e5] transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-6 flex flex-col gap-2 px-4">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      className="border-[#e5e5e5] text-[#4f4f4f] rounded-[3px] w-full"
                    >
                      로그인
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      className="border-[#e5e5e5] text-[#4f4f4f] rounded-[3px] w-full"
                    >
                      회원가입
                    </Button>
                  </Link>
                  <Link href="/consultation" onClick={() => setOpen(false)}>
                    <Button className="bg-sage hover:bg-sage-dark text-white rounded-[3px] w-full">
                      상담 신청
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
