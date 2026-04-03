"use client";

import { useState, useEffect } from "react";
import { fetchCollection, saveItem } from "@/lib/admin-api";
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface Consultation {
  id: number | string;
  name: string;
  phone: string;
  email?: string;
  weddingDate?: string;
  guestCount?: string;
  services?: string[];
  message?: string;
  date: string;
  status: "대기" | "처리중" | "완료" | "취소";
  note: string;
  source?: string;
  meta?: Record<string, unknown>;
}

const initialConsultations: Consultation[] = [
  {
    id: 1,
    name: "김민영",
    phone: "010-1234-5678",
    email: "min@email.com",
    weddingDate: "2026-10-15",
    guestCount: "200~300명",
    services: ["웨딩홀", "스드메"],
    message:
      "강남 근처 호텔 웨딩홀을 찾고 있습니다. 예산은 5000만원 정도이고 200명 이상 수용 가능한 곳으로 부탁드립니다.",
    date: "2026-04-02 14:30",
    status: "대기",
    note: "",
  },
  {
    id: 2,
    name: "이준호",
    phone: "010-2345-6789",
    email: "junho@email.com",
    weddingDate: "2026-11-20",
    guestCount: "100~200명",
    services: ["스드메", "비용 상담"],
    message:
      "스드메 패키지 상담 원합니다. 자연스러운 느낌의 스튜디오와 드레스를 찾고 있어요.",
    date: "2026-04-02 11:15",
    status: "대기",
    note: "",
  },
  {
    id: 3,
    name: "박서현",
    phone: "010-3456-7890",
    email: "seo@email.com",
    weddingDate: "2026-09-05",
    guestCount: "50~100명",
    services: ["웨딩홀", "패키지"],
    message:
      "소규모 하우스 웨딩 준비 중입니다. 서초/강남 지역 하우스 웨딩홀 추천해주세요.",
    date: "2026-04-01 16:45",
    status: "처리중",
    note: "아펠가모 반포, 더 라움 추천 완료. 답사 일정 조율 중.",
  },
  {
    id: 4,
    name: "최지은",
    phone: "010-4567-8901",
    email: "jieun@email.com",
    weddingDate: "2026-12-25",
    guestCount: "200~300명",
    services: ["비용 상담", "기타"],
    message:
      "전체 웨딩 비용이 어느 정도인지 알고 싶습니다. 호텔 웨딩 기준으로 상담 부탁드려요.",
    date: "2026-04-01 09:20",
    status: "완료",
    note: "비용 시뮬레이터 안내 완료. 그랜드 하얏트, 롯데호텔 견적서 발송.",
  },
];

const statusColors: Record<string, string> = {
  대기: "bg-yellow-100 text-yellow-700",
  처리중: "bg-blue-100 text-blue-700",
  완료: "bg-green-100 text-green-700",
  취소: "bg-gray-100 text-gray-500",
};

const statusIcons: Record<string, typeof Clock> = {
  대기: Clock,
  처리중: MessageCircle,
  완료: CheckCircle,
  취소: XCircle,
};

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await fetchCollection<Consultation>("consultations");
    setConsultations(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = consultations.filter((c) => {
    if (filterStatus !== "all" && c.status !== filterStatus) return false;
    if (
      search &&
      !c.name.includes(search) &&
      !c.phone.includes(search) &&
      !(c.message || "").includes(search)
    )
      return false;
    return true;
  });

  const updateStatus = async (id: number | string, status: Consultation["status"]) => {
    const item = consultations.find((c) => c.id === id);
    if (!item) return;
    await saveItem("consultations", { ...item, status });
    load();
  };

  const updateNote = (id: number | string, note: string) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, note } : c))
    );
  };

  const saveNote = async (id: number | string) => {
    const item = consultations.find((c) => c.id === id);
    if (item) await saveItem("consultations", item);
  };

  const counts = {
    all: consultations.length,
    대기: consultations.filter((c) => c.status === "대기").length,
    처리중: consultations.filter((c) => c.status === "처리중").length,
    완료: consultations.filter((c) => c.status === "완료").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy">상담 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          총 {counts.all}개 | 대기 {counts.대기}개 | 처리중 {counts.처리중}개 |
          완료 {counts.완료}개
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="이름, 연락처, 내용으로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "대기", "처리중", "완료"] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              className={
                filterStatus === status ? "bg-navy text-white" : ""
              }
              onClick={() => setFilterStatus(status)}
            >
              {status === "all" ? "전체" : status} (
              {status === "all" ? counts.all : counts[status as keyof typeof counts]}
              )
            </Button>
          ))}
        </div>
      </div>

      {/* Consultation List */}
      <div className="space-y-3">
        {filtered.map((consultation) => {
          const StatusIcon = statusIcons[consultation.status];
          const isExpanded = expandedId === consultation.id;

          return (
            <Card key={consultation.id} className="border-0 shadow-sm">
              <CardContent className="p-5">
                {/* Header */}
                <div
                  className="flex items-start gap-4 cursor-pointer"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : consultation.id)
                  }
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-navy">
                        {consultation.name}
                      </h3>
                      <Badge
                        className={`text-xs gap-1 ${statusColors[consultation.status]}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {consultation.status}
                      </Badge>
                      {consultation.source && (
                        <Badge className="text-xs bg-sage/10 text-sage">
                          {consultation.source}
                        </Badge>
                      )}
                      {consultation.services?.map((s) => (
                        <Badge
                          key={s}
                          variant="secondary"
                          className="text-xs bg-[#f6f6f6]"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {consultation.message}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {consultation.phone}
                      </span>
                      <span>{consultation.date}</span>
                      <span>예식일: {consultation.weddingDate}</span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">연락처:</span>{" "}
                        <span className="font-medium">
                          {consultation.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">이메일:</span>{" "}
                        <span className="font-medium">
                          {consultation.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          예식 예정일:
                        </span>{" "}
                        <span className="font-medium">
                          {consultation.weddingDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          예상 하객:
                        </span>{" "}
                        <span className="font-medium">
                          {consultation.guestCount}
                        </span>
                      </div>
                    </div>

                    {consultation.message && (
                      <div>
                        <span className="text-sm text-muted-foreground">문의 내용:</span>
                        <p className="text-sm mt-1 bg-[#f6f6f6] rounded-lg p-3">{consultation.message}</p>
                      </div>
                    )}

                    {consultation.meta && Object.keys(consultation.meta).length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">
                          {consultation.source === "시뮬레이터" ? "시뮬레이션 결과:" : consultation.source === "체크리스트" ? "체크리스트 현황:" : "부가 정보:"}
                        </span>
                        <div className="mt-1 bg-sage/5 border border-sage/10 rounded-lg p-3 space-y-1">
                          {Object.entries(consultation.meta).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{key}</span>
                              <span className="text-[#212121] font-medium text-right max-w-[60%]">
                                {Array.isArray(value) ? value.join(", ") : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-sm text-muted-foreground">
                        관리자 메모:
                      </span>
                      <Textarea
                        value={consultation.note}
                        onChange={(e) =>
                          updateNote(consultation.id, e.target.value)
                        }
                        onBlur={() => saveNote(consultation.id)}
                        placeholder="상담 내용이나 진행 상황을 메모하세요..."
                        rows={3}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-muted-foreground mr-2">
                        상태 변경:
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                        onClick={() =>
                          updateStatus(consultation.id, "대기")
                        }
                      >
                        <Clock className="h-3.5 w-3.5" />
                        대기
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() =>
                          updateStatus(consultation.id, "처리중")
                        }
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        처리중
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() =>
                          updateStatus(consultation.id, "완료")
                        }
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        완료
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-gray-500 border-gray-200 hover:bg-gray-50"
                        onClick={() =>
                          updateStatus(consultation.id, "취소")
                        }
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        취소
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-navy hover:bg-navy-light text-white gap-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        전화하기
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5">
                        <Mail className="h-3.5 w-3.5" />
                        이메일 보내기
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
