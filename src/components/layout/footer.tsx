import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#e5e5e5]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="font-serif text-xl tracking-[2px] text-[#212121]">
              BARUN WEDDING
            </span>
            <p className="text-[13px] text-[#999] leading-relaxed mt-4">
              바른카드 50년 신뢰를 기반으로 한
              <br />
              프리미엄 웨딩 컨설팅 플랫폼
            </p>
          </div>

          <div>
            <h3 className="text-[13px] font-medium text-[#212121] tracking-[1px] mb-4">
              서비스
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/wedding-halls", label: "웨딩홀 검색" },
                { href: "/wedding-collection", label: "웨딩컬렉션" },
                { href: "/simulator", label: "비용 시뮬레이터" },
                { href: "/checklist", label: "D-Day 체크리스트" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#999] hover:text-sage transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-medium text-[#212121] tracking-[1px] mb-4">
              고객지원
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/consultation", label: "상담 신청" },
                { href: "/community", label: "커뮤니티" },
                { href: "/events", label: "이벤트" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#999] hover:text-sage transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-medium text-[#212121] tracking-[1px] mb-4">
              연락처
            </h3>
            <ul className="space-y-2.5 text-[13px] text-[#999]">
              <li>전화: 02-1234-5678</li>
              <li>이메일: hello@barun-wedding.kr</li>
              <li>카카오톡: @바른웨딩</li>
              <li>운영시간: 평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#e5e5e5] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#999]">
            &copy; 2026 바른웨딩. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-[12px] text-[#999] hover:text-[#6b6b6b] transition-colors duration-300"
            >
              개인정보처리방침
            </Link>
            <Link
              href="#"
              className="text-[12px] text-[#999] hover:text-[#6b6b6b] transition-colors duration-300"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
