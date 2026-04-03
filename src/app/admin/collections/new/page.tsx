"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, ImagePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function NewCollectionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    router.push("/admin/collections");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/collections">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-navy">웨딩컬렉션 상품 등록</h2>
          <p className="text-sm text-muted-foreground">
            새로운 스드메 상품을 등록하세요
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-semibold text-navy">상품 정보</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="title">상품명 *</Label>
                <Input
                  id="title"
                  placeholder="상품명을 입력하세요"
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="category">카테고리 *</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="스튜디오">스튜디오</SelectItem>
                    <SelectItem value="드레스">드레스</SelectItem>
                    <SelectItem value="헤어메이크업">헤어메이크업</SelectItem>
                    <SelectItem value="본식스냅">본식스냅</SelectItem>
                    <SelectItem value="패키지">패키지</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="brand">브랜드 *</Label>
                <Input
                  id="brand"
                  placeholder="브랜드명"
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="price">가격 (원) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="1200000"
                  required
                  className="mt-1.5"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-semibold text-navy">상세 설명</h3>
            <Textarea
              placeholder="상품에 대한 상세 설명을 작성하세요"
              rows={6}
              className="mt-1.5"
            />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-semibold text-navy">이미지</h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
              <ImagePlus className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-navy">
                이미지를 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG, WebP / 최대 10MB / 최대 10장
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/collections">
            <Button variant="outline" type="button">
              취소
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-navy hover:bg-navy-light text-white gap-2"
            disabled={saving}
          >
            <Save className="h-4 w-4" />
            {saving ? "저장 중..." : "등록하기"}
          </Button>
        </div>
      </form>
    </div>
  );
}
