import {
  Building2,
  Camera,
  Star,
  MessageCircle,
  Users,
  TrendingUp,
  Eye,
  ArrowUpRight,
  ImageIcon,
  Handshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const stats = [
  {
    label: "등록 웨딩홀",
    value: "6",
    change: "+2 이번 달",
    icon: Building2,
    href: "/admin/wedding-halls",
    color: "bg-navy/5 text-navy",
  },
  {
    label: "웨딩컬렉션",
    value: "6",
    change: "+3 이번 달",
    icon: Camera,
    href: "/admin/collections",
    color: "bg-gold/10 text-gold-dark",
  },
  {
    label: "리뷰",
    value: "4",
    change: "+1 이번 주",
    icon: Star,
    href: "/admin/reviews",
    color: "bg-navy/5 text-navy",
  },
  {
    label: "상담 신청",
    value: "12",
    change: "+5 이번 주",
    icon: MessageCircle,
    href: "/admin/consultations",
    color: "bg-gold/10 text-gold-dark",
  },
  {
    label: "상품 사진",
    value: "13",
    change: "+2 이번 주",
    icon: ImageIcon,
    href: "/admin/photos",
    color: "bg-navy/5 text-navy",
  },
  {
    label: "제휴 문의",
    value: "6",
    change: "+2 이번 주",
    icon: Handshake,
    href: "/admin/partnerships",
    color: "bg-gold/10 text-gold-dark",
  },
];

const siteStats = [
  { label: "오늘 방문자", value: "1,234", icon: Users },
  { label: "페이지 뷰", value: "4,567", icon: Eye },
  { label: "전환율", value: "3.2%", icon: TrendingUp },
];

const recentConsultations = [
  {
    id: 1,
    name: "김*영",
    phone: "010-****-1234",
    service: "웨딩홀",
    date: "2026-04-02",
    status: "대기",
  },
  {
    id: 2,
    name: "이*준",
    phone: "010-****-5678",
    service: "스드메",
    date: "2026-04-02",
    status: "대기",
  },
  {
    id: 3,
    name: "박*현",
    phone: "010-****-9012",
    service: "패키지",
    date: "2026-04-01",
    status: "처리중",
  },
  {
    id: 4,
    name: "최*은",
    phone: "010-****-3456",
    service: "비용 상담",
    date: "2026-04-01",
    status: "완료",
  },
];

const statusColors: Record<string, string> = {
  대기: "bg-yellow-100 text-yellow-700",
  처리중: "bg-blue-100 text-blue-700",
  완료: "bg-green-100 text-green-700",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-2xl font-bold text-navy mt-3">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-gold-dark mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Site Stats */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5">
          <h2 className="font-semibold text-navy mb-4">사이트 현황</h2>
          <div className="grid grid-cols-3 gap-4">
            {siteStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                <p className="text-xl font-bold text-navy">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Consultations */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy">최근 상담 신청</h2>
            <Link
              href="/admin/consultations"
              className="text-sm text-gold hover:text-gold-dark transition-colors"
            >
              전체보기 &rarr;
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-gray-100">
                  <th className="pb-3 font-medium">이름</th>
                  <th className="pb-3 font-medium">연락처</th>
                  <th className="pb-3 font-medium">관심 서비스</th>
                  <th className="pb-3 font-medium">신청일</th>
                  <th className="pb-3 font-medium">상태</th>
                </tr>
              </thead>
              <tbody>
                {recentConsultations.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-3 font-medium text-navy">{c.name}</td>
                    <td className="py-3 text-muted-foreground">{c.phone}</td>
                    <td className="py-3">{c.service}</td>
                    <td className="py-3 text-muted-foreground">{c.date}</td>
                    <td className="py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
