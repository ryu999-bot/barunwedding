"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  Save,
  X,
  ImagePlus,
  Video,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCollection, saveItem, deleteItem, uploadImage } from "@/lib/admin-api";

interface Banner {
  id: string;
  type: "video" | "image";
  src: string;
  title: string;
  subtitle: string;
  largeSubtitle: boolean;
  ctaLabel: string;
  ctaHref: string;
  ctaEnabled: boolean;
  cta2Label: string;
  cta2Href: string;
  cta2Enabled: boolean;
  visible: boolean;
  order: number;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [videoUploading, setVideoUploading] = useState(false);

  const [form, setForm] = useState<Omit<Banner, "id">>({
    type: "image",
    src: "",
    title: "",
    subtitle: "",
    largeSubtitle: false,
    ctaLabel: "",
    ctaHref: "",
    ctaEnabled: true,
    cta2Label: "",
    cta2Href: "",
    cta2Enabled: true,
    visible: true,
    order: 0,
  });
  const [imagePreview, setImagePreview] = useState("");

  const load = async () => {
    setLoading(true);
    const data = await fetchCollection<Banner>("banners");
    setBanners(data.sort((a, b) => a.order - b.order));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ type: "image", src: "", title: "", subtitle: "", largeSubtitle: false, ctaLabel: "", ctaHref: "", ctaEnabled: true, cta2Label: "", cta2Href: "", cta2Enabled: true, visible: true, order: banners.length + 1 });
    setImagePreview("");
    setEditingId(null);
    setShowNew(false);
  };

  const startEdit = (banner: Banner) => {
    setForm({
      type: banner.type,
      src: banner.src,
      title: banner.title,
      subtitle: banner.subtitle,
      largeSubtitle: banner.largeSubtitle,
      ctaLabel: banner.ctaLabel,
      ctaHref: banner.ctaHref,
      ctaEnabled: banner.ctaEnabled !== false,
      cta2Label: banner.cta2Label || "",
      cta2Href: banner.cta2Href || "",
      cta2Enabled: banner.cta2Enabled !== false,
      visible: banner.visible,
      order: banner.order,
    });
    setImagePreview(banner.type === "image" ? banner.src : "");
    setEditingId(banner.id);
    setShowNew(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    const result = await uploadImage(file, `banner-${Date.now()}.jpg`);
    setForm((prev) => ({ ...prev, src: result.url }));
  };

  const handleSave = async () => {
    const id = editingId || Date.now().toString();
    await saveItem("banners", { ...form, id });
    resetForm();
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 배너를 삭제하시겠습니까?")) return;
    await deleteItem("banners", id);
    load();
  };

  const toggleVisibility = async (banner: Banner) => {
    await saveItem("banners", { ...banner, visible: !banner.visible });
    load();
  };

  const moveOrder = async (banner: Banner, direction: "up" | "down") => {
    const sorted = [...banners].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((b) => b.id === banner.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const tempOrder = sorted[idx].order;
    sorted[idx].order = sorted[swapIdx].order;
    sorted[swapIdx].order = tempOrder;

    await saveItem("banners", sorted[idx]);
    await saveItem("banners", sorted[swapIdx]);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy">메인 배너 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            총 {banners.length}개 배너 | {banners.filter((b) => b.visible).length}개 공개 중
          </p>
        </div>
        <Button
          className="bg-navy hover:bg-navy-light text-white gap-2"
          onClick={() => { resetForm(); setShowNew(true); }}
        >
          <Plus className="h-4 w-4" />
          배너 추가
        </Button>
      </div>

      {/* Edit/New Form */}
      {showNew && (
        <Card className="border-2 border-sage/30 shadow-md">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-navy">
                {editingId ? "배너 수정" : "새 배너 추가"}
              </h3>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>배너 타입 *</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => { if (v) setForm((p) => ({ ...p, type: v as "video" | "image", src: "" })); setImagePreview(""); }}
                >
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">이미지</SelectItem>
                    <SelectItem value="video">영상 (URL)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>CTA 링크</Label>
                <Input
                  value={form.ctaHref}
                  onChange={(e) => setForm((p) => ({ ...p, ctaHref: e.target.value }))}
                  placeholder="/simulator"
                  className="mt-1.5"
                />
              </div>
            </div>

            {form.type === "video" ? (
              <div className="space-y-3">
                <Label>영상 파일 업로드 또는 URL 입력 *</Label>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setVideoUploading(true);
                    const result = await uploadImage(file, `banner-video-${Date.now()}.mp4`);
                    setForm((p) => ({ ...p, src: result.url }));
                    setVideoUploading(false);
                  }}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => videoInputRef.current?.click()}
                    disabled={videoUploading}
                  >
                    <Video className="h-4 w-4" />
                    {videoUploading ? "업로드 중..." : "영상 파일 선택"}
                  </Button>
                  {form.src && form.src.startsWith("/") && (
                    <Badge className="bg-green-100 text-green-700 text-xs self-center">
                      업로드 완료: {form.src.split("/").pop()}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-[#e5e5e5]" />
                  <span className="text-xs text-[#999]">또는</span>
                  <div className="h-px flex-1 bg-[#e5e5e5]" />
                </div>
                <Input
                  value={form.src.startsWith("/") ? "" : form.src}
                  onChange={(e) => setForm((p) => ({ ...p, src: e.target.value }))}
                  placeholder="https://videos.pexels.com/... 외부 URL 입력"
                  className="mt-1.5"
                />
                {form.src && (
                  <video
                    src={form.src}
                    className="w-full aspect-[21/9] object-cover rounded-lg bg-black"
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                )}
              </div>
            ) : (
              <div>
                <Label>배너 이미지 *</Label>
                {imagePreview && (
                  <div className="relative w-full aspect-[21/9] bg-[#f2f0ed] rounded-lg overflow-hidden mt-1.5 mb-3">
                    <Image src={imagePreview} alt="미리보기" fill className="object-cover" sizes="800px" />
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-sage/50 cursor-pointer mt-1.5"
                >
                  <ImagePlus className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-navy">{imagePreview ? "이미지 교체" : "이미지 업로드"}</p>
                </div>
              </div>
            )}

            <div>
              <Label>제목 *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="최저가 보장!"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label>부제목 *</Label>
              <Textarea
                value={form.subtitle}
                onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                placeholder="단, 다음달 웨딩해야합니다."
                rows={2}
                className="mt-1.5"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Switch
                checked={form.largeSubtitle}
                onCheckedChange={(v) => setForm((p) => ({ ...p, largeSubtitle: v }))}
              />
              <Label>부제목 큰 글씨</Label>
            </div>

            <div className={`p-4 rounded-lg border ${form.ctaEnabled ? "bg-[#f6f6f6] border-[#e5e5e5]" : "bg-[#fafafa] border-dashed border-[#e5e5e5] opacity-50"}`}>
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={form.ctaEnabled}
                  onChange={(e) => setForm((p) => ({ ...p, ctaEnabled: e.target.checked }))}
                  className="accent-sage w-4 h-4"
                />
                <span className="text-sm font-medium text-navy">버튼 1 활성화</span>
                <span className="text-xs text-[#999]">(흰색 배경)</span>
              </label>
              {form.ctaEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>버튼 텍스트</Label>
                    <Input
                      value={form.ctaLabel}
                      onChange={(e) => setForm((p) => ({ ...p, ctaLabel: e.target.value }))}
                      placeholder="비용 시뮬레이터"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>링크</Label>
                    <Input
                      value={form.ctaHref}
                      onChange={(e) => setForm((p) => ({ ...p, ctaHref: e.target.value }))}
                      placeholder="/simulator"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={`p-4 rounded-lg border ${form.cta2Enabled ? "bg-[#f6f6f6] border-[#e5e5e5]" : "bg-[#fafafa] border-dashed border-[#e5e5e5] opacity-50"}`}>
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={form.cta2Enabled}
                  onChange={(e) => setForm((p) => ({ ...p, cta2Enabled: e.target.checked }))}
                  className="accent-sage w-4 h-4"
                />
                <span className="text-sm font-medium text-navy">버튼 2 활성화</span>
                <span className="text-xs text-[#999]">(세이지 그린 배경)</span>
              </label>
              {form.cta2Enabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>버튼 텍스트</Label>
                    <Input
                      value={form.cta2Label}
                      onChange={(e) => setForm((p) => ({ ...p, cta2Label: e.target.value }))}
                      placeholder="상담 신청"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>링크</Label>
                    <Input
                      value={form.cta2Href}
                      onChange={(e) => setForm((p) => ({ ...p, cta2Href: e.target.value }))}
                      placeholder="/consultation"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>취소</Button>
              <Button className="bg-navy hover:bg-navy-light text-white gap-2" onClick={handleSave}>
                <Save className="h-4 w-4" />
                {editingId ? "수정 완료" : "추가하기"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Banner List */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">로딩 중...</div>
      ) : (
        <div className="space-y-3">
          {banners.map((banner, idx) => (
            <Card
              key={banner.id}
              className={`border-0 shadow-sm transition-opacity ${!banner.visible ? "opacity-50" : ""}`}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-full sm:w-40 h-20 relative rounded-lg overflow-hidden flex-shrink-0 bg-[#212121]">
                    {banner.type === "image" ? (
                      <Image src={banner.src} alt={banner.title} fill className="object-cover" sizes="160px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="h-6 w-6 text-white/50" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-navy text-sm">
                        {banner.title.replace("\n", " ")}
                      </h3>
                      <Badge className={banner.type === "video" ? "bg-purple-100 text-purple-700 text-[10px]" : "bg-blue-100 text-blue-700 text-[10px]"}>
                        {banner.type === "video" ? "영상" : "이미지"}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-600 text-[10px]">
                        순서 {banner.order}
                      </Badge>
                      {!banner.visible && (
                        <Badge className="bg-red-100 text-red-600 text-[10px]">비공개</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {banner.subtitle.replace("\n", " ")}
                    </p>
                    {banner.ctaLabel && (
                      <p className="text-xs text-sage mt-1">
                        [{banner.ctaLabel}] → {banner.ctaHref}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveOrder(banner, "up")} disabled={idx === 0}>
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveOrder(banner, "down")} disabled={idx === banners.length - 1}>
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleVisibility(banner)}>
                      {banner.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => startEdit(banner)}>
                      <Pencil className="h-3 w-3" />수정
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => handleDelete(banner.id)}>
                      <Trash2 className="h-3 w-3" />삭제
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {banners.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              등록된 배너가 없습니다. 배너를 추가해주세요.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
