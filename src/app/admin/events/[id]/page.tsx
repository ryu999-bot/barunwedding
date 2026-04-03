"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, ImagePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    router.push("/admin/events");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-navy">이벤트 수정</h2>
          <p className="text-sm text-muted-foreground">
            이벤트 #{id} 정보를 수정합니다
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-semibold text-navy">이벤트 정보</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="title">이벤트 제목 *</Label>
                <Input
                  id="title"
                  defaultValue="봄 웨딩 특별 프로모션"
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="startDate">시작일 *</Label>
                <Input
                  id="startDate"
                  type="date"
                  defaultValue="2026-03-01"
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="endDate">종료일 *</Label>
                <Input
                  id="endDate"
                  type="date"
                  defaultValue="2026-05-31"
                  required
                  className="mt-1.5"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="description">이벤트 설명 *</Label>
                <Textarea
                  id="description"
                  defaultValue="3~5월 예식 예약 시 스드메 패키지 15% 할인! 바른웨딩에서만 만날 수 있는 특별한 혜택."
                  rows={5}
                  required
                  className="mt-1.5"
                />
              </div>
              <div className="sm:col-span-2 flex items-center justify-between">
                <div>
                  <Label>공개 여부</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    비공개 시 사이트에 노출되지 않습니다
                  </p>
                </div>
                <Switch
                  checked={visible}
                  onCheckedChange={setVisible}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-semibold text-navy">배너 이미지</h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
              <ImagePlus className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-navy">
                배너 이미지를 업로드하세요
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                권장 사이즈: 1200x400 / JPG, PNG, WebP
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/events">
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
            {saving ? "저장 중..." : "수정 완료"}
          </Button>
        </div>
      </form>
    </div>
  );
}
