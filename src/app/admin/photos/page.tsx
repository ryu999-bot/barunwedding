"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Trash2,
  ImagePlus,
  Eye,
  Download,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteImage } from "@/lib/admin-api";

interface PhotoItem {
  id: string;
  src: string;
  name: string;
  category: "웨딩홀" | "스튜디오" | "드레스" | "헤어메이크업" | "본식스냅" | "패키지" | "배너";
  linkedTo: string;
  uploadDate: string;
  size: string;
  visible: boolean;
}

const categoryColors: Record<string, string> = {
  웨딩홀: "bg-blue-100 text-blue-700",
  스튜디오: "bg-purple-100 text-purple-700",
  드레스: "bg-pink-100 text-pink-700",
  헤어메이크업: "bg-orange-100 text-orange-700",
  본식스냅: "bg-teal-100 text-teal-700",
  패키지: "bg-green-100 text-green-700",
  배너: "bg-yellow-100 text-yellow-700",
};

const collectionCategoryMap: Record<string, PhotoItem["category"]> = {
  스튜디오: "스튜디오",
  드레스: "드레스",
  헤어메이크업: "헤어메이크업",
  본식스냅: "본식스냅",
  패키지: "패키지",
};

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const [hallsRes, collectionsRes] = await Promise.all([
        fetch("/api/data/wedding-halls"),
        fetch("/api/data/collections"),
      ]);

      const photoList: PhotoItem[] = [];
      let idx = 0;

      if (hallsRes.ok) {
        const halls = await hallsRes.json();
        for (const hall of halls) {
          if (hall.imageUrl) {
            const filename = hall.imageUrl.split("/").pop() || hall.imageUrl;
            idx++;
            photoList.push({
              id: `hall-${hall.id || idx}`,
              src: hall.imageUrl,
              name: filename,
              category: "웨딩홀",
              linkedTo: hall.name || hall.title || filename,
              uploadDate: hall.updatedAt?.split("T")[0] || "",
              size: "",
              visible: true,
            });
          }
        }
      }

      if (collectionsRes.ok) {
        const collections = await collectionsRes.json();
        for (const item of collections) {
          if (item.imageUrl) {
            const filename = item.imageUrl.split("/").pop() || item.imageUrl;
            idx++;
            const category = collectionCategoryMap[item.category] || "패키지";
            photoList.push({
              id: `col-${item.id || idx}`,
              src: item.imageUrl,
              name: filename,
              category,
              linkedTo: item.title || item.brand || filename,
              uploadDate: item.updatedAt?.split("T")[0] || "",
              size: "",
              visible: true,
            });
          }
        }
      }

      setPhotos(photoList);
    } catch (err) {
      console.error("Failed to load photos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const filtered = photos.filter((p) => {
    if (filterCategory !== "all" && p.category !== filterCategory) return false;
    if (search && !p.name.includes(search) && !p.linkedTo.includes(search))
      return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleVisibility = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p))
    );
  };

  const deleteSelected = async () => {
    if (confirm(`${selectedIds.size}개 사진을 삭제하시겠습니까?`)) {
      try {
        const toDelete = photos.filter((p) => selectedIds.has(p.id));
        await Promise.all(toDelete.map((p) => deleteImage(p.name)));
        setSelectedIds(new Set());
        await loadPhotos();
      } catch (err) {
        console.error("Failed to delete photos:", err);
      }
    }
  };

  const deleteOne = async (id: string) => {
    if (confirm("이 사진을 삭제하시겠습니까?")) {
      const photo = photos.find((p) => p.id === id);
      if (!photo) return;
      try {
        await deleteImage(photo.name);
        await loadPhotos();
      } catch (err) {
        console.error("Failed to delete photo:", err);
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
          <h2 className="text-xl font-bold text-navy">상품 사진 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            총 {photos.length}개의 사진 | {photos.filter((p) => p.visible).length}개 공개
          </p>
        </div>
        <Button className="bg-navy hover:bg-navy-light text-white gap-2">
          <ImagePlus className="h-4 w-4" />
          사진 업로드
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="파일명 또는 연결 상품으로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={filterCategory}
          onValueChange={(v) => { if (v) setFilterCategory(v); }}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="웨딩홀">웨딩홀</SelectItem>
            <SelectItem value="스튜디오">스튜디오</SelectItem>
            <SelectItem value="드레스">드레스</SelectItem>
            <SelectItem value="헤어메이크업">헤어메이크업</SelectItem>
            <SelectItem value="본식스냅">본식스냅</SelectItem>
            <SelectItem value="패키지">패키지</SelectItem>
            <SelectItem value="배너">배너</SelectItem>
          </SelectContent>
        </Select>
        {selectedIds.size > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="gap-1.5"
            onClick={deleteSelected}
          >
            <Trash2 className="h-3.5 w-3.5" />
            {selectedIds.size}개 삭제
          </Button>
        )}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((photo) => (
          <Card
            key={photo.id}
            className={`border-0 shadow-sm overflow-hidden group transition-all ${
              !photo.visible ? "opacity-50" : ""
            } ${selectedIds.has(photo.id) ? "ring-2 ring-sage" : ""}`}
          >
            <div className="aspect-square relative bg-[#f6f6f6]">
              <Image
                src={photo.src}
                alt={photo.linkedTo}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => setPreviewSrc(photo.src)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                >
                  <Eye className="h-4 w-4 text-[#212121]" />
                </button>
                <button
                  onClick={() => toggleVisibility(photo.id)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                >
                  <RotateCcw className="h-4 w-4 text-[#212121]" />
                </button>
                <button
                  onClick={() => deleteOne(photo.id)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
              {/* Checkbox */}
              <label className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedIds.has(photo.id)}
                  onChange={() => toggleSelect(photo.id)}
                  className="accent-sage w-4 h-4"
                />
              </label>
              {!photo.visible && (
                <Badge className="absolute top-2 right-2 bg-gray-800 text-white text-[10px]">
                  비공개
                </Badge>
              )}
            </div>
            <CardContent className="p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Badge
                  className={`text-[10px] ${categoryColors[photo.category] || "bg-gray-100"}`}
                >
                  {photo.category}
                </Badge>
              </div>
              <p className="text-[12px] font-medium text-[#212121] truncate">
                {photo.linkedTo}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] text-[#999]">{photo.name}</span>
                <span className="text-[11px] text-[#999]">{photo.size}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          검색 결과가 없습니다.
        </div>
      )}

      {/* Preview Modal */}
      {previewSrc && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewSrc(null)}
        >
          <div className="relative max-w-4xl max-h-[80vh] w-full">
            <Image
              src={previewSrc}
              alt="미리보기"
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded"
            />
            <button
              onClick={() => setPreviewSrc(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#212121] hover:bg-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
