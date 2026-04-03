"use client";

import { useState } from "react";
import { Star, Quote, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { reviews } from "@/data/mock";

const allTags = Array.from(new Set(reviews.flatMap((r) => r.tags)));

export default function ReviewsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = selectedTag
    ? reviews.filter((r) => r.tags.includes(selectedTag))
    : reviews;

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sage font-medium text-sm tracking-[2px] uppercase mb-2">
            Real Reviews
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold font-serif text-[#212121]">
            리뷰 &middot; 후기
          </h1>
          <p className="text-muted-foreground mt-2">
            실제 예비부부들의 생생한 웨딩 후기를 확인하세요
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            className={
              selectedTag === null ? "bg-[#212121] text-white" : ""
            }
            onClick={() => setSelectedTag(null)}
          >
            전체
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              className={
                selectedTag === tag ? "bg-[#212121] text-white" : ""
              }
              onClick={() => setSelectedTag(tag)}
            >
              #{tag}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((review) => (
            <Card
              key={review.id}
              className="border-0 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-[#212121]">
                      {review.hallName}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {review.date}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-sage fill-sage"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="aspect-[16/9] bg-gradient-to-br from-[#f6f6f6] to-sage-muted rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl opacity-20">&#x1F4F7;</span>
                </div>

                <div className="flex items-start gap-2 mb-3">
                  <Quote className="h-4 w-4 text-sage flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#212121] leading-relaxed">
                    {review.content}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {review.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-[#f6f6f6] text-[#6b6b6b] cursor-pointer hover:bg-sage-muted"
                      onClick={() => setSelectedTag(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-3 border-t border-border">
                  <span className="text-sm font-medium text-[#212121]">
                    {review.author}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
