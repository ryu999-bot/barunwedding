"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Camera,
  Star,
  Gift,
  MessageCircle,
  Heart,
  ChevronLeft,
  Menu,
  X,
  ImageIcon,
  Handshake,
  SlidersHorizontal,
  FileText,
  Users2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "대시보드", icon: LayoutDashboard },
  { href: "/admin/banners", label: "메인 배너", icon: SlidersHorizontal },
  { href: "/admin/pages", label: "페이지 관리", icon: FileText },
  { href: "/admin/wedding-halls", label: "웨딩홀 관리", icon: Building2 },
  { href: "/admin/collections", label: "웨딩컬렉션 관리", icon: Camera },
  { href: "/admin/reviews", label: "리뷰 관리", icon: Star },
  { href: "/admin/events", label: "이벤트 관리", icon: Gift },
  { href: "/admin/consultations", label: "상담 관리", icon: MessageCircle },
  { href: "/admin/members", label: "회원 관리", icon: Users2 },
  { href: "/admin/photos", label: "사진 관리", icon: ImageIcon },
  { href: "/admin/partnerships", label: "제휴 문의", icon: Handshake },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebar = (
    <nav className="flex flex-col gap-1 p-4">
      <Link
        href="/"
        className="flex items-center gap-2 px-3 py-2 mb-4 text-sm text-white/60 hover:text-white transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        사이트로 돌아가기
      </Link>
      <div className="flex items-center gap-2 px-3 mb-6">
        <Heart className="h-5 w-5 text-gold fill-gold" />
        <span className="text-lg font-bold text-white">관리자</span>
      </div>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setSidebarOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive(item.href)
              ? "bg-white/15 text-white"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <item.icon className="h-4.5 w-4.5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col bg-navy fixed inset-y-0 left-0 z-50">
        {sidebar}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-navy z-50 transform transition-transform lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        {sidebar}
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-navy">
            {navItems.find((item) => isActive(item.href))?.label || "관리자"}
          </h1>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
