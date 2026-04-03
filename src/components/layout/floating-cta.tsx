"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <Link href="/consultation">
        <Button
          size="lg"
          className="bg-sage hover:bg-sage-dark text-white rounded-[3px] shadow-md h-12 px-5 gap-2 text-[13px] tracking-[1px] transition-colors duration-300"
        >
          <MessageCircle className="h-4 w-4" />
          상담 신청
        </Button>
      </Link>
    </div>
  );
}
