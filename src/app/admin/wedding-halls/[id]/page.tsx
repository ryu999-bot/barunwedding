"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Save, ImagePlus, X } from "lucide-react";
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
import { fetchItem, updateItem, uploadImage } from "@/lib/admin-api";
import type { WeddingHall } from "@/data/mock";

export default function EditWeddingHallPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    type: "호텔",
    region: "",
    address: "",
    mealCostPerPerson: 0,
    minGuests: 0,
    maxGuests: 0,
    description: "",
    features: "",
    imageUrl: "",
    rating: 0,
    reviewCount: 0,
  });

  useEffect(() => {
    fetchItem<WeddingHall>("wedding-halls", id).then((hall) => {
      setForm({
        name: hall.name,
        type: hall.type,
        region: hall.region,
        address: hall.address,
        mealCostPerPerson: hall.mealCostPerPerson,
        minGuests: hall.minGuests,
        maxGuests: hall.maxGuests,
        description: hall.description,
        features: hall.features.join(", "),
        imageUrl: hall.imageUrl,
        rating: hall.rating,
        reviewCount: hall.reviewCount,
      });
      setImagePreview(hall.imageUrl);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const update = (field: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview immediately
    setImagePreview(URL.createObjectURL(file));

    // Upload
    const result = await uploadImage(file, `hall-${id}-${Date.now()}.jpg`);
    setForm((prev) => ({ ...prev, imageUrl: result.url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const hallData: WeddingHall = {
      id,
      name: form.name,
      type: form.type as WeddingHall["type"],
      region: form.region,
      address: form.address,
      mealCostPerPerson: form.mealCostPerPerson,
      minGuests: form.minGuests,
      maxGuests: form.maxGuests,
      description: form.description,
      features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
      imageUrl: form.imageUrl,
      images: [form.imageUrl],
      rating: form.rating,
      reviewCount: form.reviewCount,
    };

    await updateItem("wedding-halls", id, hallData);
    setSaving(false);
    router.push("/admin/wedding-halls");
  };

  if (loading) {
    return <div className="text-center py-20 text-muted-foreground">로딩 중...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/wedding-halls">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-navy">웨딩홀 수정</h2>
          <p className="text-sm text-muted-foreground">&ldquo;{form.name}&rdquo; 정보를 수정합니다</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-semibold text-navy">기본 정보</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="name">웨딩홀 이름 *</Label>
                <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} required className="mt-1.5" />
              </div>
              <div>
                <Label>타입 *</Label>
                <Select value={form.type} onValueChange={(v) => { if (v) update("type", v); }}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="호텔">호텔</SelectItem>
                    <SelectItem value="하우스">하우스</SelectItem>
                    <SelectItem value="컨벤션">컨벤션</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>지역 *</Label>
                <Input value={form.region} onChange={(e) => update("region", e.target.value)} required className="mt-1.5" />
              </div>
              <div className="sm:col-span-2">
                <Label>주소 *</Label>
                <Input value={form.address} onChange={(e) => update("address", e.target.value)} required className="mt-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-semibold text-navy">요금 및 수용 인원</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label>식대 (1인, 원) *</Label>
                <Input type="number" value={form.mealCostPerPerson} onChange={(e) => update("mealCostPerPerson", Number(e.target.value))} required className="mt-1.5" />
              </div>
              <div>
                <Label>최소 인원 *</Label>
                <Input type="number" value={form.minGuests} onChange={(e) => update("minGuests", Number(e.target.value))} required className="mt-1.5" />
              </div>
              <div>
                <Label>최대 인원 *</Label>
                <Input type="number" value={form.maxGuests} onChange={(e) => update("maxGuests", Number(e.target.value))} required className="mt-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-semibold text-navy">소개 및 시설</h3>
            <div>
              <Label>소개 *</Label>
              <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={4} required className="mt-1.5" />
            </div>
            <div>
              <Label>시설/서비스 (쉼표로 구분)</Label>
              <Input value={form.features} onChange={(e) => update("features", e.target.value)} className="mt-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-semibold text-navy">대표 이미지</h3>

            {imagePreview && (
              <div className="relative w-full aspect-[16/9] bg-[#f2f0ed] rounded-lg overflow-hidden">
                <Image src={imagePreview} alt="미리보기" fill className="object-cover" sizes="600px" />
                <button
                  type="button"
                  onClick={() => { setImagePreview(""); setForm((p) => ({ ...p, imageUrl: "" })); }}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-sage/50 transition-colors cursor-pointer"
            >
              <ImagePlus className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-navy">
                {imagePreview ? "다른 이미지로 교체하기" : "이미지를 클릭하여 업로드"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP / 최대 10MB</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/wedding-halls">
            <Button variant="outline" type="button">취소</Button>
          </Link>
          <Button type="submit" className="bg-navy hover:bg-navy-light text-white gap-2" disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? "저장 중..." : "수정 완료"}
          </Button>
        </div>
      </form>
    </div>
  );
}
