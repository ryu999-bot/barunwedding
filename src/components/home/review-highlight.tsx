"use client";

import { useState, useEffect } from "react";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Review } from "@/data/mock";

export function ReviewHighlight() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/api/data/reviews")
      .then((res) => res.json())
      .then((data: Review[]) => setReviews(data))
      .catch(console.error);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-[#f7f6f3]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">
            Reviews
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl text-[#212121] tracking-[1px]">
            실제 후기
          </h2>
          <div className="w-12 h-[1px] bg-sage mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-7 group hover:shadow-sm transition-all duration-500"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < review.rating
                        ? "text-sage fill-sage"
                        : "text-[#e5e5e5]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[13px] text-[#4f4f4f] leading-[1.8] mb-5 line-clamp-4">
                &ldquo;{review.content}&rdquo;
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {review.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-sage tracking-[1px] uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="pt-5 border-t border-[#ebebeb] flex items-center justify-between">
                <span className="text-[12px] text-[#212121] tracking-[0.5px]">
                  {review.author}
                </span>
                <span className="text-[11px] text-[#bbb]">
                  {review.hallName}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-[13px] text-sage hover:text-sage-dark tracking-[1px] transition-colors duration-300 border-b border-sage/30 pb-1"
          >
            전체 후기 보기 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
