"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Save,
  ImagePlus,
  Plus,
  Trash2,
  Globe,
  ChevronDown,
  ChevronUp,
  FileText,
  MapPin,
  Users,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { uploadImage } from "@/lib/admin-api";
import { apiFetch } from "@/lib/api";

interface PageData {
  about: {
    hero: { image: string; title: string };
    intro: { heading: string; body: string };
    guarantee: { heading: string; body: string; body2: string; items: string[] };
    freebie: { image: string; heading: string; body: string; items: string[] };
  };
  services: {
    hero: { image: string; title: string };
    items: { title: string; description: string; image: string; link: string }[];
  };
  planners: {
    hero: { image: string; title: string };
    items: { name: string; title: string; career: string; specialty: string; description: string; image: string; instagram?: string; kakao?: string }[];
  };
  location: {
    address: string;
    addressDetail: string;
    phone: string;
    email: string;
    hours: string[];
    subway: string[];
    parking: string[];
  };
  familySites?: { name: string; url: string; visible: boolean }[];
}

type Section = "about" | "services" | "planners" | "location" | "family";

const sectionLabels: Record<Section, { label: string; icon: typeof FileText }> = {
  about: { label: "바른웨딩 소개", icon: FileText },
  services: { label: "웨딩 서비스", icon: Building2 },
  planners: { label: "웨딩 플래너", icon: Users },
  location: { label: "찾아오시는 길", icon: MapPin },
  family: { label: "패밀리 사이트", icon: Globe },
};

export default function AdminPagesPage() {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("about");
  const [savedMsg, setSavedMsg] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<string>("");

  useEffect(() => {
    apiFetch("/api/pages")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); });
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await apiFetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !data) return;
    const result = await uploadImage(file, `page-${Date.now()}.jpg`);
    // Update the target path
    const parts = uploadTarget.split(".");
    const updated = { ...data } as Record<string, unknown>;
    let obj = updated as Record<string, unknown>;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      if (Array.isArray(obj[key])) {
        obj = (obj[key] as Record<string, unknown>[])[Number(parts[i + 1])];
        parts.splice(i + 1, 1);
      } else {
        obj = obj[key] as Record<string, unknown>;
      }
    }
    obj[parts[parts.length - 1]] = result.url;
    setData(updated as unknown as PageData);
    setUploadTarget("");
  };

  const triggerUpload = (path: string) => {
    setUploadTarget(path);
    setTimeout(() => fileRef.current?.click(), 50);
  };

  if (loading || !data) {
    return <div className="text-center py-12 text-muted-foreground">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">페이지 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">BARUN 웨딩 하위 메뉴 페이지 내용을 관리합니다</p>
        </div>
        <div className="flex items-center gap-2">
          {savedMsg && <Badge className="bg-green-100 text-green-700">저장 완료!</Badge>}
          <Button className="bg-navy hover:bg-navy-light text-white gap-2" onClick={save} disabled={saving}>
            <Save className="h-4 w-4" />{saving ? "저장 중..." : "전체 저장"}
          </Button>
        </div>
      </div>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(sectionLabels) as Section[]).map((key) => {
          const s = sectionLabels[key];
          return (
            <Button
              key={key}
              variant={activeSection === key ? "default" : "outline"}
              className={activeSection === key ? "bg-navy text-white" : ""}
              onClick={() => setActiveSection(key)}
            >
              <s.icon className="h-4 w-4 mr-1.5" />{s.label}
            </Button>
          );
        })}
      </div>

      {/* About */}
      {activeSection === "about" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-navy">히어로 섹션</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>페이지 제목</Label>
                  <Input value={data.about.hero.title} onChange={(e) => setData({ ...data, about: { ...data.about, hero: { ...data.about.hero, title: e.target.value } } })} className="mt-1" />
                </div>
                <div>
                  <Label>배경 이미지</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-20 h-14 relative bg-[#f2f0ed] rounded overflow-hidden flex-shrink-0">
                      <Image src={data.about.hero.image} alt="" fill className="object-cover" sizes="80px" />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => triggerUpload("about.hero.image")}>
                      <ImagePlus className="h-3.5 w-3.5 mr-1" />변경
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-navy">소개 섹션</h3>
              <div>
                <Label>제목</Label>
                <Input value={data.about.intro.heading} onChange={(e) => setData({ ...data, about: { ...data.about, intro: { ...data.about.intro, heading: e.target.value } } })} className="mt-1" />
              </div>
              <div>
                <Label>본문</Label>
                <Textarea value={data.about.intro.body} onChange={(e) => setData({ ...data, about: { ...data.about, intro: { ...data.about.intro, body: e.target.value } } })} rows={5} className="mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-navy">안심 보장 제도</h3>
              <div>
                <Label>제목</Label>
                <Input value={data.about.guarantee.heading} onChange={(e) => setData({ ...data, about: { ...data.about, guarantee: { ...data.about.guarantee, heading: e.target.value } } })} className="mt-1" />
              </div>
              <div>
                <Label>서브 텍스트</Label>
                <Textarea value={data.about.guarantee.body} onChange={(e) => setData({ ...data, about: { ...data.about, guarantee: { ...data.about.guarantee, body: e.target.value } } })} rows={2} className="mt-1" />
              </div>
              <div>
                <Label>본문</Label>
                <Textarea value={data.about.guarantee.body2} onChange={(e) => setData({ ...data, about: { ...data.about, guarantee: { ...data.about.guarantee, body2: e.target.value } } })} rows={4} className="mt-1" />
              </div>
              <div>
                <Label>보장 항목 (줄바꿈으로 구분)</Label>
                <Textarea value={data.about.guarantee.items.join("\n")} onChange={(e) => setData({ ...data, about: { ...data.about, guarantee: { ...data.about.guarantee, items: e.target.value.split("\n").filter(Boolean) } } })} rows={4} className="mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-navy">무료 제공 혜택</h3>
              <div className="flex items-center gap-2">
                <Label>이미지</Label>
                <div className="w-20 h-14 relative bg-[#f2f0ed] rounded overflow-hidden flex-shrink-0">
                  <Image src={data.about.freebie.image} alt="" fill className="object-cover" sizes="80px" />
                </div>
                <Button variant="outline" size="sm" onClick={() => triggerUpload("about.freebie.image")}>
                  <ImagePlus className="h-3.5 w-3.5 mr-1" />변경
                </Button>
              </div>
              <div>
                <Label>제목</Label>
                <Input value={data.about.freebie.heading} onChange={(e) => setData({ ...data, about: { ...data.about, freebie: { ...data.about.freebie, heading: e.target.value } } })} className="mt-1" />
              </div>
              <div>
                <Label>본문</Label>
                <Textarea value={data.about.freebie.body} onChange={(e) => setData({ ...data, about: { ...data.about, freebie: { ...data.about.freebie, body: e.target.value } } })} rows={3} className="mt-1" />
              </div>
              <div>
                <Label>제공 항목 (줄바꿈으로 구분)</Label>
                <Textarea value={data.about.freebie.items.join("\n")} onChange={(e) => setData({ ...data, about: { ...data.about, freebie: { ...data.about.freebie, items: e.target.value.split("\n").filter(Boolean) } } })} rows={5} className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Services */}
      {activeSection === "services" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-navy">히어로 섹션</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>페이지 제목</Label>
                  <Input value={data.services.hero.title} onChange={(e) => setData({ ...data, services: { ...data.services, hero: { ...data.services.hero, title: e.target.value } } })} className="mt-1" />
                </div>
                <div>
                  <Label>배경 이미지</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-20 h-14 relative bg-[#f2f0ed] rounded overflow-hidden">
                      <Image src={data.services.hero.image} alt="" fill className="object-cover" sizes="80px" />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => triggerUpload("services.hero.image")}>
                      <ImagePlus className="h-3.5 w-3.5 mr-1" />변경
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {data.services.items.map((item, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-navy">서비스 {i + 1}</h3>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => {
                    const items = [...data.services.items];
                    items.splice(i, 1);
                    setData({ ...data, services: { ...data.services, items } });
                  }}>
                    <Trash2 className="h-3.5 w-3.5 mr-1" />삭제
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>서비스명</Label>
                    <Input value={item.title} onChange={(e) => { const items = [...data.services.items]; items[i] = { ...items[i], title: e.target.value }; setData({ ...data, services: { ...data.services, items } }); }} className="mt-1" />
                  </div>
                  <div>
                    <Label>링크</Label>
                    <Input value={item.link} onChange={(e) => { const items = [...data.services.items]; items[i] = { ...items[i], link: e.target.value }; setData({ ...data, services: { ...data.services, items } }); }} className="mt-1" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>설명</Label>
                    <Textarea value={item.description} onChange={(e) => { const items = [...data.services.items]; items[i] = { ...items[i], description: e.target.value }; setData({ ...data, services: { ...data.services, items } }); }} rows={2} className="mt-1" />
                  </div>
                  <div>
                    <Label>이미지</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-20 h-14 relative bg-[#f2f0ed] rounded overflow-hidden">
                        <Image src={item.image} alt="" fill className="object-cover" sizes="80px" />
                      </div>
                      <Button variant="outline" size="sm" onClick={() => triggerUpload(`services.items.${i}.image`)}>
                        <ImagePlus className="h-3.5 w-3.5 mr-1" />변경
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full gap-2" onClick={() => setData({ ...data, services: { ...data.services, items: [...data.services.items, { title: "", description: "", image: "/images/hall-1.jpg", link: "/" }] } })}>
            <Plus className="h-4 w-4" />서비스 추가
          </Button>
        </div>
      )}

      {/* Planners */}
      {activeSection === "planners" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-navy">히어로 섹션</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>페이지 제목</Label>
                  <Input value={data.planners.hero.title} onChange={(e) => setData({ ...data, planners: { ...data.planners, hero: { ...data.planners.hero, title: e.target.value } } })} className="mt-1" />
                </div>
                <div>
                  <Label>배경 이미지</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-20 h-14 relative bg-[#f2f0ed] rounded overflow-hidden">
                      <Image src={data.planners.hero.image} alt="" fill className="object-cover" sizes="80px" />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => triggerUpload("planners.hero.image")}>
                      <ImagePlus className="h-3.5 w-3.5 mr-1" />변경
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {data.planners.items.map((planner, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-navy">플래너 {i + 1}: {planner.name || "(이름 없음)"}</h3>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => {
                    const items = [...data.planners.items];
                    items.splice(i, 1);
                    setData({ ...data, planners: { ...data.planners, items } });
                  }}>
                    <Trash2 className="h-3.5 w-3.5 mr-1" />삭제
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label>이름</Label>
                    <Input value={planner.name} onChange={(e) => { const items = [...data.planners.items]; items[i] = { ...items[i], name: e.target.value }; setData({ ...data, planners: { ...data.planners, items } }); }} className="mt-1" />
                  </div>
                  <div>
                    <Label>직함</Label>
                    <Input value={planner.title} onChange={(e) => { const items = [...data.planners.items]; items[i] = { ...items[i], title: e.target.value }; setData({ ...data, planners: { ...data.planners, items } }); }} className="mt-1" />
                  </div>
                  <div>
                    <Label>경력</Label>
                    <Input value={planner.career} onChange={(e) => { const items = [...data.planners.items]; items[i] = { ...items[i], career: e.target.value }; setData({ ...data, planners: { ...data.planners, items } }); }} className="mt-1" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>전문 분야</Label>
                    <Input value={planner.specialty} onChange={(e) => { const items = [...data.planners.items]; items[i] = { ...items[i], specialty: e.target.value }; setData({ ...data, planners: { ...data.planners, items } }); }} className="mt-1" />
                  </div>
                  <div>
                    <Label>프로필 이미지</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-14 h-14 relative bg-[#f2f0ed] rounded overflow-hidden">
                        <Image src={planner.image} alt="" fill className="object-cover" sizes="56px" />
                      </div>
                      <Button variant="outline" size="sm" onClick={() => triggerUpload(`planners.items.${i}.image`)}>
                        <ImagePlus className="h-3.5 w-3.5 mr-1" />변경
                      </Button>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <Label>소개</Label>
                    <Textarea value={planner.description} onChange={(e) => { const items = [...data.planners.items]; items[i] = { ...items[i], description: e.target.value }; setData({ ...data, planners: { ...data.planners, items } }); }} rows={2} className="mt-1" />
                  </div>
                  <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#f0f0f0]">
                    <div>
                      <Label className="flex items-center gap-1.5"><span className="text-[#E1306C]">&#9679;</span> 인스타그램 URL</Label>
                      <Input value={(planner as Record<string, unknown>).instagram as string || ""} onChange={(e) => { const items = [...data.planners.items]; items[i] = { ...items[i], instagram: e.target.value } as typeof items[number]; setData({ ...data, planners: { ...data.planners, items } }); }} placeholder="https://instagram.com/..." className="mt-1" />
                    </div>
                    <div>
                      <Label className="flex items-center gap-1.5"><span className="text-[#FEE500]">&#9679;</span> 카카오톡 URL</Label>
                      <Input value={(planner as Record<string, unknown>).kakao as string || ""} onChange={(e) => { const items = [...data.planners.items]; items[i] = { ...items[i], kakao: e.target.value } as typeof items[number]; setData({ ...data, planners: { ...data.planners, items } }); }} placeholder="https://pf.kakao.com/..." className="mt-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full gap-2" onClick={() => setData({ ...data, planners: { ...data.planners, items: [...data.planners.items, { name: "", title: "플래너", career: "", specialty: "", description: "", image: "/images/hall-1.jpg", instagram: "", kakao: "" }] } })}>
            <Plus className="h-4 w-4" />플래너 추가
          </Button>
        </div>
      )}

      {/* Location */}
      {activeSection === "location" && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-navy">찾아오시는 길</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>주소</Label>
                <Input value={data.location.address} onChange={(e) => setData({ ...data, location: { ...data.location, address: e.target.value } })} className="mt-1" />
              </div>
              <div>
                <Label>상세 주소</Label>
                <Input value={data.location.addressDetail} onChange={(e) => setData({ ...data, location: { ...data.location, addressDetail: e.target.value } })} className="mt-1" />
              </div>
              <div>
                <Label>전화</Label>
                <Input value={data.location.phone} onChange={(e) => setData({ ...data, location: { ...data.location, phone: e.target.value } })} className="mt-1" />
              </div>
              <div>
                <Label>이메일</Label>
                <Input value={data.location.email} onChange={(e) => setData({ ...data, location: { ...data.location, email: e.target.value } })} className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label>운영시간 (줄바꿈으로 구분)</Label>
                <Textarea value={data.location.hours.join("\n")} onChange={(e) => setData({ ...data, location: { ...data.location, hours: e.target.value.split("\n") } })} rows={3} className="mt-1" />
              </div>
              <div>
                <Label>지하철 (줄바꿈으로 구분)</Label>
                <Textarea value={data.location.subway.join("\n")} onChange={(e) => setData({ ...data, location: { ...data.location, subway: e.target.value.split("\n") } })} rows={3} className="mt-1" />
              </div>
              <div>
                <Label>주차 (줄바꿈으로 구분)</Label>
                <Textarea value={data.location.parking.join("\n")} onChange={(e) => setData({ ...data, location: { ...data.location, parking: e.target.value.split("\n") } })} rows={3} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Family Sites */}
      {activeSection === "family" && (
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-navy">패밀리 사이트 관리</h3>
                  <p className="text-xs text-muted-foreground mt-1">최대 10개까지 등록 가능합니다. 홈페이지 우측 상단에 노출됩니다.</p>
                </div>
                <Badge className="bg-[#f6f6f6] text-[#6b6b6b]">{(data.familySites || []).length}/10</Badge>
              </div>
            </CardContent>
          </Card>

          {(data.familySites || []).map((site, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-navy text-sm">사이트 {i + 1}</h3>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={site.visible}
                        onChange={(e) => {
                          const sites = [...(data.familySites || [])];
                          sites[i] = { ...sites[i], visible: e.target.checked };
                          setData({ ...data, familySites: sites });
                        }}
                        className="accent-sage w-4 h-4"
                      />
                      <span className="text-xs text-[#6b6b6b]">공개</span>
                    </label>
                    <Button variant="ghost" size="sm" className="text-destructive h-7" onClick={() => {
                      const sites = [...(data.familySites || [])];
                      sites.splice(i, 1);
                      setData({ ...data, familySites: sites });
                    }}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>사이트 이름</Label>
                    <Input value={site.name} onChange={(e) => {
                      const sites = [...(data.familySites || [])];
                      sites[i] = { ...sites[i], name: e.target.value };
                      setData({ ...data, familySites: sites });
                    }} placeholder="바른카드" className="mt-1" />
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input value={site.url} onChange={(e) => {
                      const sites = [...(data.familySites || [])];
                      sites[i] = { ...sites[i], url: e.target.value };
                      setData({ ...data, familySites: sites });
                    }} placeholder="https://www.barunsoncard.com" className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {(data.familySites || []).length < 10 && (
            <Button variant="outline" className="w-full gap-2" onClick={() => {
              const sites = [...(data.familySites || [])];
              sites.push({ name: "", url: "", visible: true });
              setData({ ...data, familySites: sites });
            }}>
              <Plus className="h-4 w-4" />패밀리 사이트 추가
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
