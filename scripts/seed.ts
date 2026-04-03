import fs from "fs";
import path from "path";
import { weddingHalls, sdmeItems, reviews, defaultChecklist } from "../src/data/mock";

const DATA_DIR = path.join(process.cwd(), "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function write(name: string, data: unknown) {
  fs.writeFileSync(path.join(DATA_DIR, `${name}.json`), JSON.stringify(data, null, 2), "utf-8");
  console.log(`✓ ${name}.json created`);
}

write("wedding-halls", weddingHalls);
write("collections", sdmeItems);
write("reviews", reviews);
write("checklist", defaultChecklist);

const events = [
  { id: "1", title: "봄 웨딩 특별 프로모션", description: "3~5월 예식 예약 시 스드메 패키지 15% 할인! 바른웨딩에서만 만날 수 있는 특별한 혜택.", startDate: "2026-03-01", endDate: "2026-05-31", status: "진행중", visible: true },
  { id: "2", title: "신규 가입 이벤트", description: "바른웨딩 회원 가입 시 웨딩 체크리스트 프리미엄 기능 3개월 무료 제공.", startDate: "2026-04-01", endDate: "2026-06-30", status: "진행중", visible: true },
  { id: "3", title: "2026 서울 웨딩 박람회", description: "코엑스에서 열리는 대한민국 최대 웨딩 박람회.", startDate: "2026-05-15", endDate: "2026-05-17", status: "예정", visible: true },
  { id: "4", title: "후기 작성 이벤트", description: "바른웨딩을 통해 결혼 준비를 하신 분! 후기 작성 시 스타벅스 기프트카드.", startDate: "2026-01-01", endDate: "2026-12-31", status: "진행중", visible: true },
];
write("events", events);

const partnerships = [
  { id: "1", companyName: "노블발렌티 대치", category: "웨딩홀", contactName: "이상민", phone: "02-555-1234", email: "noble@wedding.kr", message: "노블발렌티 대치점입니다. 바른웨딩 플랫폼에 입점 및 제휴를 원합니다.", date: "2026-04-02 10:30", status: "대기", note: "", region: "서울 강남구" },
  { id: "2", companyName: "르씨엘 스튜디오", category: "스튜디오", contactName: "김예진", phone: "010-9876-5432", email: "leciel@studio.kr", message: "웨딩 스튜디오 제휴 문의드립니다.", date: "2026-04-01 16:20", status: "검토중", note: "포트폴리오 확인 완료.", region: "서울 강남구" },
  { id: "3", companyName: "라포엠 드레스", category: "드레스", contactName: "박서연", phone: "010-1111-2222", email: "lapoem@dress.kr", message: "프리미엄 웨딩드레스 브랜드 라포엠입니다.", date: "2026-03-30 11:00", status: "승인", note: "계약 완료. 수수료 8% 합의.", region: "서울 서초구" },
];
write("partnerships", partnerships);

const consultations = [
  { id: "1", name: "김민영", phone: "010-1234-5678", email: "min@email.com", weddingDate: "2026-10-15", guestCount: "200~300명", services: ["웨딩홀", "스드메"], message: "강남 근처 호텔 웨딩홀을 찾고 있습니다.", date: "2026-04-02 14:30", status: "대기", note: "" },
  { id: "2", name: "이준호", phone: "010-2345-6789", email: "junho@email.com", weddingDate: "2026-11-20", guestCount: "100~200명", services: ["스드메"], message: "스드메 패키지 상담 원합니다.", date: "2026-04-02 11:15", status: "대기", note: "" },
  { id: "3", name: "박서현", phone: "010-3456-7890", email: "seo@email.com", weddingDate: "2026-09-05", guestCount: "50~100명", services: ["웨딩홀"], message: "소규모 하우스 웨딩 준비 중입니다.", date: "2026-04-01 16:45", status: "처리중", note: "아펠가모 반포 추천." },
];
write("consultations", consultations);

console.log("\n✅ Seed complete!");
