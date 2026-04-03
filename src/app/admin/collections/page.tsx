"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { type SdmeItem } from "@/data/mock";
import { fetchCollection, deleteItem } from "@/lib/admin-api";

const categoryColors: Record<string, string> = {
  스튜디오: "bg-blue-100 text-blue-700",
  드레스: "bg-pink-100 text-pink-700",
  헤어메이크업: "bg-purple-100 text-purple-700",
  본식스냅: "bg-orange-100 text-orange-700",
  패키지: "bg-green-100 text-green-700",
};

export default function AdminCollectionsPage() {
  const [items, setItems] = useState<SdmeItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await fetchCollection<SdmeItem>("collections");
      setItems(data);
    } catch (err) {
      console.error("Failed to load collections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filtered = items.filter(
    (item) =>
      item.brand.includes(search) ||
      item.title.includes(search) ||
      item.category.includes(search)
  );

  const handleDelete = async (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteItem("collections", id);
        await loadItems();
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy">웨딩컬렉션 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            총 {items.length}개의 상품이 등록되어 있습니다
          </p>
        </div>
        <Link href="/admin/collections/new">
          <Button className="bg-navy hover:bg-navy-light text-white gap-2">
            <Plus className="h-4 w-4" />
            상품 등록
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="브랜드, 상품명, 카테고리로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <Card key={item.id} className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-full sm:w-20 h-16 sm:h-14 bg-gradient-to-br from-ivory to-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl opacity-30">
                    {item.category === "스튜디오"
                      ? "📷"
                      : item.category === "드레스"
                        ? "👗"
                        : item.category === "헤어메이크업"
                          ? "💄"
                          : item.category === "본식스냅"
                            ? "📸"
                            : "🎁"}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-navy">{item.title}</h3>
                    <Badge
                      className={`text-xs ${categoryColors[item.category] || "bg-gray-100"}`}
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="font-medium text-gold-dark">
                      {item.brand}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                      {item.rating} ({item.reviewCount})
                    </span>
                    <span className="font-medium text-navy">
                      {(item.price / 10000).toLocaleString()}만원
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/admin/collections/${item.id}`}>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Pencil className="h-3.5 w-3.5" />
                      수정
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    삭제
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
