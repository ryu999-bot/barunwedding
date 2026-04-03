"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { fetchCollection, deleteItem } from "@/lib/admin-api";
import type { WeddingHall } from "@/data/mock";

export default function AdminWeddingHallsPage() {
  const [halls, setHalls] = useState<WeddingHall[]>([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchCollection<WeddingHall>("wedding-halls");
    setHalls(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = halls.filter(
    (h) => h.name.includes(search) || h.region.includes(search)
  );

  const handleDelete = async (id: string) => {
    await deleteItem("wedding-halls", id);
    setDeleteId(null);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy">웨딩홀 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            총 {halls.length}개의 웨딩홀이 등록되어 있습니다
          </p>
        </div>
        <Link href="/admin/wedding-halls/new">
          <Button className="bg-navy hover:bg-navy-light text-white gap-2">
            <Plus className="h-4 w-4" />
            웨딩홀 등록
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="웨딩홀 이름 또는 지역으로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-navy">웨딩홀 삭제</h3>
            <p className="text-sm text-muted-foreground mt-2">
              &ldquo;{halls.find((h) => h.id === deleteId)?.name}&rdquo;을(를)
              정말 삭제하시겠습니까?
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setDeleteId(null)}>취소</Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteId)}>삭제</Button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((hall) => (
            <Card key={hall.id} className="border-0 shadow-sm">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-full sm:w-24 h-20 sm:h-16 relative rounded-lg overflow-hidden flex-shrink-0 bg-[#f2f0ed]">
                    <Image src={hall.imageUrl} alt={hall.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-navy">{hall.name}</h3>
                      <Badge variant="secondary" className="text-xs">{hall.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{hall.region}</span>
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-sage fill-sage" />{hall.rating} ({hall.reviewCount})</span>
                      <span>식대 {(hall.mealCostPerPerson / 10000).toFixed(1)}만원</span>
                      <span>{hall.minGuests}~{hall.maxGuests}명</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link href={`/admin/wedding-halls/${hall.id}`}>
                      <Button variant="outline" size="sm" className="gap-1.5"><Pencil className="h-3.5 w-3.5" />수정</Button>
                    </Link>
                    <Button variant="outline" size="sm" className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => setDeleteId(hall.id)}>
                      <Trash2 className="h-3.5 w-3.5" />삭제
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
