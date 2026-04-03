"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Building2,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { fetchCollection, saveItem } from "@/lib/admin-api";

interface Partnership {
  id: number;
  companyName: string;
  category: "웨딩홀" | "스튜디오" | "드레스" | "헤어메이크업" | "본식스냅" | "패키지" | "기타";
  contactName: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  status: "대기" | "검토중" | "승인" | "거절";
  note: string;
  region: string;
}

const statusColors: Record<string, string> = {
  대기: "bg-yellow-100 text-yellow-700",
  검토중: "bg-blue-100 text-blue-700",
  승인: "bg-green-100 text-green-700",
  거절: "bg-red-100 text-red-700",
};

const categoryColors: Record<string, string> = {
  웨딩홀: "bg-blue-50 text-blue-600",
  스튜디오: "bg-purple-50 text-purple-600",
  드레스: "bg-pink-50 text-pink-600",
  헤어메이크업: "bg-orange-50 text-orange-600",
  본식스냅: "bg-teal-50 text-teal-600",
  패키지: "bg-green-50 text-green-600",
  기타: "bg-gray-50 text-gray-600",
};

const statusIcons: Record<string, typeof Clock> = {
  대기: Clock,
  검토중: MessageCircle,
  승인: CheckCircle,
  거절: XCircle,
};

export default function AdminPartnershipsPage() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const loadPartnerships = async () => {
    try {
      setLoading(true);
      const data = await fetchCollection<Partnership>("partnerships");
      setPartnerships(data);
    } catch (err) {
      console.error("Failed to load partnerships:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPartnerships();
  }, []);

  const filtered = partnerships.filter((p) => {
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    if (
      search &&
      !p.companyName.includes(search) &&
      !p.contactName.includes(search) &&
      !p.category.includes(search)
    )
      return false;
    return true;
  });

  const updateStatus = async (id: number, status: Partnership["status"]) => {
    const partnership = partnerships.find((p) => p.id === id);
    if (!partnership) return;
    try {
      await saveItem("partnerships", { ...partnership, status });
      await loadPartnerships();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const updateNote = (id: number, note: string) => {
    setPartnerships((prev) =>
      prev.map((p) => (p.id === id ? { ...p, note } : p))
    );
  };

  const saveNote = async (id: number) => {
    const partnership = partnerships.find((p) => p.id === id);
    if (!partnership) return;
    try {
      await saveItem("partnerships", partnership);
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  const counts = {
    all: partnerships.length,
    대기: partnerships.filter((p) => p.status === "대기").length,
    검토중: partnerships.filter((p) => p.status === "검토중").length,
    승인: partnerships.filter((p) => p.status === "승인").length,
    거절: partnerships.filter((p) => p.status === "거절").length,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-muted-foreground">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy">제휴 문의 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          총 {counts.all}개 | 대기 {counts.대기} | 검토중 {counts.검토중} | 승인{" "}
          {counts.승인} | 거절 {counts.거절}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="업체명, 담당자, 카테고리로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "대기", "검토중", "승인", "거절"] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              className={filterStatus === status ? "bg-navy text-white" : ""}
              onClick={() => setFilterStatus(status)}
            >
              {status === "all" ? "전체" : status} (
              {status === "all"
                ? counts.all
                : counts[status as keyof typeof counts]}
              )
            </Button>
          ))}
        </div>
      </div>

      {/* Partnership List */}
      <div className="space-y-3">
        {filtered.map((partnership) => {
          const StatusIcon = statusIcons[partnership.status];
          const isExpanded = expandedId === partnership.id;

          return (
            <Card key={partnership.id} className="border-0 shadow-sm">
              <CardContent className="p-5">
                {/* Header */}
                <div
                  className="flex items-start gap-4 cursor-pointer"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : partnership.id)
                  }
                >
                  <div className="w-10 h-10 bg-sage-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 text-sage" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-navy">
                        {partnership.companyName}
                      </h3>
                      <Badge
                        className={`text-xs ${categoryColors[partnership.category]}`}
                      >
                        {partnership.category}
                      </Badge>
                      <Badge
                        className={`text-xs gap-1 ${statusColors[partnership.status]}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {partnership.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {partnership.message}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{partnership.contactName}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {partnership.date}
                      </span>
                      <span>{partnership.region}</span>
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
                        <span className="text-muted-foreground">업체명:</span>{" "}
                        <span className="font-medium">
                          {partnership.companyName}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">담당자:</span>{" "}
                        <span className="font-medium">
                          {partnership.contactName}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">연락처:</span>{" "}
                        <span className="font-medium">
                          {partnership.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">이메일:</span>{" "}
                        <span className="font-medium">
                          {partnership.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">카테고리:</span>{" "}
                        <span className="font-medium">
                          {partnership.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">지역:</span>{" "}
                        <span className="font-medium">
                          {partnership.region}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">
                        제휴 문의 내용:
                      </span>
                      <p className="text-sm mt-1 bg-[#f6f6f6] rounded-lg p-3">
                        {partnership.message}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">
                        관리자 메모:
                      </span>
                      <Textarea
                        value={partnership.note}
                        onChange={(e) =>
                          updateNote(partnership.id, e.target.value)
                        }
                        onBlur={() => saveNote(partnership.id)}
                        placeholder="검토 내용이나 협의 사항을 메모하세요..."
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
                        onClick={() => updateStatus(partnership.id, "대기")}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        대기
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => updateStatus(partnership.id, "검토중")}
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        검토중
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => updateStatus(partnership.id, "승인")}
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        승인
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => updateStatus(partnership.id, "거절")}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        거절
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-navy hover:bg-navy-light text-white gap-1.5"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        전화하기
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                      >
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
