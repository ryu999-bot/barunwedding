"use client";

import { useState } from "react";
import { Search, Star, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { reviews as initialReviews, type Review } from "@/data/mock";

type ReviewWithStatus = Review & { status: "승인" | "대기" | "거절" };

export default function AdminReviewsPage() {
  const [reviewList, setReviewList] = useState<ReviewWithStatus[]>(
    initialReviews.map((r) => ({ ...r, status: "승인" as const }))
  );
  const [search, setSearch] = useState("");

  const filtered = reviewList.filter(
    (r) =>
      r.author.includes(search) ||
      r.hallName.includes(search) ||
      r.content.includes(search)
  );

  const updateStatus = (id: string, status: "승인" | "거절") => {
    setReviewList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("이 리뷰를 삭제하시겠습니까?")) {
      setReviewList((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const statusColors: Record<string, string> = {
    승인: "bg-green-100 text-green-700",
    대기: "bg-yellow-100 text-yellow-700",
    거절: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-navy">리뷰 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          총 {reviewList.length}개의 리뷰 | 대기{" "}
          {reviewList.filter((r) => r.status === "대기").length}개
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="작성자, 웨딩홀, 내용으로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((review) => (
          <Card key={review.id} className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="font-semibold text-navy">
                      {review.author}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {review.hallName}
                    </span>
                    <Badge
                      className={`text-xs ${statusColors[review.status]}`}
                    >
                      {review.status}
                    </Badge>
                    <div className="flex gap-0.5 ml-auto">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < review.rating
                              ? "text-gold fill-gold"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.content}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {review.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-ivory"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {review.date}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-green-600 border-green-200 hover:bg-green-50"
                    onClick={() => updateStatus(review.id, "승인")}
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    승인
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => updateStatus(review.id, "거절")}
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    거절
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5"
                    onClick={() => handleDelete(review.id)}
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
