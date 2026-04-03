"use client";

import { useState } from "react";
import {
  Check,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Heart,
  Send,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { submitConsultation } from "@/lib/submit-consultation";
import { defaultChecklist, type ChecklistItem } from "@/data/mock";

const phases = [
  { label: "12~10개월 전", range: [10, 12], color: "bg-[#212121]" },
  { label: "8~6개월 전", range: [6, 8], color: "bg-sage-dark" },
  { label: "4~3개월 전", range: [3, 4], color: "bg-sage" },
  { label: "2~1개월 전", range: [1, 2], color: "bg-sage-light border border-sage/30 !text-[#212121]" },
];

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(defaultChecklist);
  const [weddingDate, setWeddingDate] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleComplete = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const progress = Math.round((completed / total) * 100);

  const getDDay = () => {
    if (!weddingDate) return null;
    return Math.ceil(
      (new Date(weddingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
  };
  const dDay = getDDay();

  const getPhaseItems = (range: number[]) =>
    items.filter((i) => i.dueMonths >= range[0] && i.dueMonths <= range[1]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#f7f6f3] py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Title */}
            <div>
              <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">
                Checklist
              </p>
              <h1 className="font-serif text-3xl lg:text-4xl text-[#212121] tracking-[1px]">
                D-Day 체크리스트
              </h1>
              <div className="w-12 h-[1px] bg-sage mt-6 mb-4" />
              <p className="text-[13px] text-[#6b6b6b] leading-[1.8]">
                결혼 준비 타임라인을 한눈에 관리하세요.
                <br />체계적으로 준비하면 놓치는 것이 없습니다.
              </p>
            </div>

            {/* D-Day */}
            <div className="bg-white p-8 text-center">
              <Calendar className="h-5 w-5 text-sage mx-auto mb-3" />
              <input
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="w-full border border-[#e5e5e5] px-3 py-2 text-[13px] text-center mb-4"
              />
              {dDay !== null ? (
                <>
                  <p className="font-serif text-5xl text-[#212121]">
                    {dDay > 0 ? `D-${dDay}` : dDay === 0 ? "D-Day!" : `D+${Math.abs(dDay)}`}
                  </p>
                  <p className="text-[12px] text-[#999] mt-2">결혼식까지</p>
                </>
              ) : (
                <p className="text-[13px] text-[#999]">결혼 날짜를 설정해주세요</p>
              )}
            </div>

            {/* Progress */}
            <div className="bg-white p-8 text-center">
              <Clock className="h-5 w-5 text-sage mx-auto mb-3" />
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#778374"
                    strokeWidth="2.5"
                    strokeDasharray={`${progress}, 100`}
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-3xl text-[#212121]">{progress}%</span>
                </div>
              </div>
              <p className="text-[12px] text-[#999]">
                {completed}/{total} 완료
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {phases.map((phase) => {
            const phaseItems = getPhaseItems(phase.range);
            const phaseCompleted = phaseItems.filter((i) => i.completed).length;

            return (
              <div key={phase.label}>
                {/* Phase Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${phase.color}`} />
                    <h3 className="text-[14px] font-medium text-[#212121]">
                      {phase.label}
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#999]">
                    {phaseCompleted}/{phaseItems.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {phaseItems.map((item) => (
                    <div
                      key={item.id}
                      className={`bg-white border border-[#ebebeb] p-4 transition-all duration-300 hover:border-sage/30 ${
                        item.completed ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleComplete(item.id)}
                          className={`mt-0.5 w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                            item.completed
                              ? "bg-sage text-white"
                              : "border border-[#d5d5d5] hover:border-sage"
                          }`}
                        >
                          {item.completed && <Check className="h-3 w-3" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <h4
                            className={`text-[13px] leading-snug ${
                              item.completed
                                ? "line-through text-[#bbb]"
                                : "text-[#212121] font-medium"
                            }`}
                          >
                            {item.title}
                          </h4>

                          <div className="flex items-center gap-1.5 mt-2">
                            <Badge
                              variant="secondary"
                              className="text-[10px] bg-[#f6f6f6] text-[#999] px-1.5 py-0"
                            >
                              {item.category}
                            </Badge>
                          </div>

                          {expandedId === item.id && (
                            <p className="text-[12px] text-[#999] leading-[1.7] mt-2">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() =>
                            setExpandedId(
                              expandedId === item.id ? null : item.id
                            )
                          }
                          className="text-[#ccc] hover:text-[#999] transition-colors flex-shrink-0"
                        >
                          {expandedId === item.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  {phaseItems.length === 0 && (
                    <div className="text-center py-8 text-[12px] text-[#ccc] border border-dashed border-[#e5e5e5]">
                      항목 없음
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Consultation with checklist status */}
      <ChecklistConsultation
        items={items}
        phases={phases}
        weddingDate={weddingDate}
        progress={progress}
        completed={completed}
        total={total}
      />
    </div>
  );
}

function ChecklistConsultation({
  items,
  phases,
  weddingDate,
  progress,
  completed,
  total,
}: {
  items: ChecklistItem[];
  phases: { label: string; range: number[]; color: string }[];
  weddingDate: string;
  progress: number;
  completed: number;
  total: number;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const completedItems = items.filter((i) => i.completed);
  const pendingItems = items.filter((i) => !i.completed);

  const getPhaseStatus = (range: number[]) => {
    const phaseItems = items.filter((i) => i.dueMonths >= range[0] && i.dueMonths <= range[1]);
    const done = phaseItems.filter((i) => i.completed).length;
    return { total: phaseItems.length, done };
  };

  if (submitted) {
    return (
      <div className="bg-[#f7f6f3] py-16">
        <div className="max-w-lg mx-auto text-center px-4">
          <CheckCircle className="h-10 w-10 text-sage mx-auto mb-4" />
          <h3 className="font-serif text-2xl text-[#212121] mb-2">상담 신청이 완료되었습니다</h3>
          <p className="text-[13px] text-[#6b6b6b]">
            체크리스트 진행 상황과 함께 접수되었습니다.
            <br />담당 플래너가 미완료 항목을 중심으로 맞춤 상담을 준비하겠습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f6f3] py-16 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">
            Consultation
          </p>
          <h2 className="font-serif text-2xl lg:text-3xl text-[#212121]">
            체크리스트 기반 맞춤 상담 신청
          </h2>
          <div className="w-12 h-[1px] bg-sage mx-auto mt-6 mb-4" />
          <p className="text-[13px] text-[#6b6b6b]">
            현재 진행 상황을 바탕으로 전문 플래너가 남은 준비를 도와드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Status Summary */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="bg-white p-6">
              <h3 className="text-[14px] font-medium text-[#212121] mb-4">나의 준비 현황</h3>
              <div className="flex items-center gap-6 mb-5">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e5e5" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#778374" strokeWidth="3" strokeDasharray={`${progress}, 100`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-xl text-[#212121]">{progress}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[24px] font-serif text-[#212121]">{completed}<span className="text-[14px] text-[#999]">/{total}</span></p>
                  <p className="text-[12px] text-[#999]">항목 완료</p>
                  {weddingDate && (
                    <p className="text-[12px] text-sage mt-1">예식일: {weddingDate}</p>
                  )}
                </div>
              </div>

              {/* Phase Progress Bars */}
              <div className="space-y-2.5">
                {phases.map((phase) => {
                  const status = getPhaseStatus(phase.range);
                  const pct = status.total > 0 ? Math.round((status.done / status.total) * 100) : 0;
                  return (
                    <div key={phase.label}>
                      <div className="flex items-center justify-between text-[12px] mb-1">
                        <span className="text-[#6b6b6b]">{phase.label}</span>
                        <span className="text-[#999]">{status.done}/{status.total}</span>
                      </div>
                      <div className="w-full bg-[#ebebeb] h-1.5">
                        <div className="bg-sage h-1.5 transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Completed Items */}
            {completedItems.length > 0 && (
              <div className="bg-white p-6">
                <h3 className="text-[14px] font-medium text-[#212121] mb-3">
                  완료된 항목 <span className="text-sage">({completedItems.length})</span>
                </h3>
                <div className="space-y-1.5">
                  {completedItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-[12px] text-[#999]">
                      <Check className="h-3 w-3 text-sage" />
                      <span className="line-through">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending Items */}
            {pendingItems.length > 0 && (
              <div className="bg-white p-6">
                <h3 className="text-[14px] font-medium text-[#212121] mb-3">
                  미완료 항목 <span className="text-red-400">({pendingItems.length})</span>
                </h3>
                <div className="space-y-1.5">
                  {pendingItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-[12px] text-[#4f4f4f]">
                      <div className="w-3 h-3 border border-[#d5d5d5]" />
                      <span>{item.title}</span>
                      <Badge variant="secondary" className="text-[9px] bg-[#f6f6f6] text-[#bbb] px-1 py-0 ml-auto">
                        D-{item.dueMonths}개월
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Consultation Form */}
          <div className="bg-white p-8">
            <div className="flex items-center gap-2 mb-6">
              <Send className="h-5 w-5 text-sage" />
              <h3 className="text-[16px] font-medium text-[#212121]">이 현황으로 상담 신청하기</h3>
            </div>

            <div className="bg-[#f7f6f3] p-4 mb-6">
              <p className="text-[11px] text-[#999] tracking-[1px] uppercase mb-2">접수 시 포함되는 정보</p>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-[#999]">진행률</span>
                  <span className="text-[#212121] font-medium">{progress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#999]">완료</span>
                  <span className="text-[#212121] font-medium">{completed}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#999]">미완료</span>
                  <span className="text-red-400 font-medium">{pendingItems.length}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#999]">예식일</span>
                  <span className="text-[#212121] font-medium">{weddingDate || "미정"}</span>
                </div>
              </div>
              <Separator className="my-3" />
              <p className="text-[11px] text-[#999]">
                미완료: {pendingItems.map((i) => i.title).join(", ") || "없음"}
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await submitConsultation({
                  name,
                  phone,
                  weddingDate: weddingDate || undefined,
                  message: message || undefined,
                  source: "체크리스트",
                  meta: {
                    progress: `${progress}%`,
                    completed: `${completed}/${total}`,
                    completedItems: completedItems.map((i) => i.title),
                    pendingItems: pendingItems.map((i) => i.title),
                  },
                });
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[13px]">이름 *</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" required className="mt-1" />
                </div>
                <div>
                  <Label className="text-[13px]">연락처 *</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000" type="tel" required className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-[13px]">추가 문의 사항</Label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="특별히 도움이 필요한 부분이 있으면 작성해주세요" rows={3} className="mt-1" />
              </div>
              <Button type="submit" className="w-full bg-sage hover:bg-sage-dark text-white h-12 text-[14px] tracking-[0.5px] gap-2">
                <Send className="h-4 w-4" />
                체크리스트 현황과 함께 상담 접수하기
              </Button>
              <p className="text-[11px] text-[#bbb] text-center">
                위 체크리스트 상태가 상담 내용에 자동 포함됩니다
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
