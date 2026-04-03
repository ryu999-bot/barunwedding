"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  UserCheck,
  UserX,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { fetchCollection, saveItem, deleteItem } from "@/lib/admin-api";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  weddingDate?: string;
  needConsult?: string[];
  date: string;
  status: "활성" | "정지";
}

const statusColors: Record<string, string> = {
  활성: "bg-green-100 text-green-700",
  정지: "bg-red-100 text-red-700",
};

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchCollection<Member>("members");
    setMembers(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = members.filter(
    (m) =>
      m.name.includes(search) ||
      m.email.includes(search) ||
      m.phone.includes(search)
  );

  const toggleStatus = async (member: Member) => {
    const newStatus = member.status === "활성" ? "정지" : "활성";
    await saveItem("members", { ...member, status: newStatus });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 회원을 삭제하시겠습니까?")) return;
    await deleteItem("members", id);
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy">회원 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          총 {members.length}명의 회원 | 활성 {members.filter((m) => m.status === "활성").length}명
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="이름, 이메일, 연락처로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((member) => (
            <Card key={member.id} className="border-0 shadow-sm">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-10 h-10 bg-sage-muted rounded-full flex items-center justify-center flex-shrink-0 text-sage font-medium text-sm">
                    {member.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-navy">{member.name}</h3>
                      <Badge className={`text-xs ${statusColors[member.status]}`}>
                        {member.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />{member.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />{member.phone}
                      </span>
                      {member.weddingDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-sage" />예식일: {member.weddingDate}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-[#bbb]">
                        가입: {member.date}
                      </span>
                    </div>
                    {member.needConsult && member.needConsult.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span className="text-xs text-[#bbb]">상담 필요:</span>
                        {member.needConsult.map((item) => (
                          <Badge key={item} variant="secondary" className="text-[10px] bg-sage-muted text-sage px-1.5 py-0">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`gap-1.5 ${
                        member.status === "활성"
                          ? "text-red-500 border-red-200 hover:bg-red-50"
                          : "text-green-600 border-green-200 hover:bg-green-50"
                      }`}
                      onClick={() => toggleStatus(member)}
                    >
                      {member.status === "활성" ? (
                        <><UserX className="h-3.5 w-3.5" />정지</>
                      ) : (
                        <><UserCheck className="h-3.5 w-3.5" />활성화</>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />삭제
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              {members.length === 0 ? "가입된 회원이 없습니다." : "검색 결과가 없습니다."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
