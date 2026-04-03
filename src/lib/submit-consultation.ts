export interface ConsultationPayload {
  name: string;
  phone: string;
  email?: string;
  weddingDate?: string;
  guestCount?: string;
  services?: string[];
  message?: string;
  source: string; // 어디서 신청했는지: "상담페이지" | "시뮬레이터" | "체크리스트" | "웨딩홀상세"
  meta?: Record<string, unknown>; // 시뮬레이션 결과, 체크리스트 상태 등
}

import { apiFetch } from "@/lib/api";

export async function submitConsultation(
  payload: ConsultationPayload
): Promise<boolean> {
  try {
    const res = await apiFetch("/api/data/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Date.now().toString(),
        ...payload,
        date: new Date().toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "대기",
        note: "",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
