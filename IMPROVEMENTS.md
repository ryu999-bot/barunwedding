# 코드 리뷰 및 개선 보고서

## 1. 프로젝트 개요
- **프로젝트 유형**: Next.js 풀스택 (App Router)
- **언어**: TypeScript
- **프레임워크**: Next.js 16.2.2, React 19, Tailwind CSS, shadcn/ui
- **DB**: 없음 (JSON 파일 기반 저장 — `data/*.json`)
- **진입점**: `package.json` → `next start`
- **주요 파일**:
  - `src/lib/db.ts` — JSON 파일 CRUD 유틸리티
  - `src/lib/api.ts` — basePath 적용 fetch 유틸리티
  - `src/lib/admin-api.ts` — 어드민 API 클라이언트
  - `src/app/api/` — API 라우트 (데이터 CRUD, 업로드, 배너, 페이지)
  - `src/app/(site)/` — 사이트 프론트엔드
  - `src/app/admin/` — 어드민 대시보드
- **Docker Manager 배포 준비 상태**: 추가 조치 필요 (인증 미구현)
- **원본 커밋**: `9cb8832`

## 2. Docker Manager 호환성 결과

| 항목 | 상태 | 비고 |
|------|------|------|
| 프로젝트 유형 감지 | ✅ Next.js | `next.config.ts` 존재 |
| start 스크립트 | ✅ 정상 | `"start": "next start"` |
| 포트 설정 | ✅ 정상 | 기본 3000, .env.example에 PORT 기재 |
| 헬스체크 (GET /) | ✅ 정상 | 홈페이지 200 응답 |
| 0.0.0.0 바인딩 | ✅ 정상 | Next.js standalone 자동 처리 |
| 절대경로 → 상대경로 | ✅ 수정 완료 | apiFetch 유틸리티 도입, 25건 교체 |
| .env.example | ✅ 생성 완료 | DATA_DIR, UPLOAD_DIR, PORT, NEXT_PUBLIC_BASE_PATH |
| output: standalone | ✅ 설정 완료 | next.config.ts |
| Dockerfile/deploy.yml | ✅ 없음 | Docker Manager 자동 생성 |
| 파일 데이터 영속성 | ✅ 환경변수 적용 | DATA_DIR, UPLOAD_DIR → /app/data/ |

## 3. 우선순위별 발견 사항 및 수정 내용

### 높음 (배포 필수/보안/안정성)

| # | 에이전트 | 문제 | 파일 | 수정 내용 | 상태 |
|---|---------|------|------|----------|------|
| 1 | C | fetch 절대 경로 25건 | 18개 파일 | `apiFetch()` 유틸리티 생성 및 전수 교체 | ✅ 완료 |
| 2 | C | output: standalone 미설정 | next.config.ts | `output: "standalone"` 추가 | ✅ 완료 |
| 3 | D+E | 업로드 Path Traversal | api/upload/route.ts | `path.basename()` 적용 | ✅ 완료 |
| 4 | D+E | 업로드 크기/타입 무제한 | api/upload/route.ts | 100MB 제한 + 확장자 화이트리스트 | ✅ 완료 |
| 5 | D+E | 컬렉션 API Path Traversal | lib/db.ts | 9개 컬렉션 화이트리스트 검증 | ✅ 완료 |
| 6 | D+E | Stored XSS (dangerouslySetInnerHTML) | about/page.tsx | 텍스트 렌더링(whitespace-pre-line)으로 교체 | ✅ 완료 |
| 7 | B | 환경변수 체계 부재 | db.ts, upload/route.ts, pages/route.ts | DATA_DIR, UPLOAD_DIR 환경변수 도입 | ✅ 완료 |
| 8 | B | .env.example 부재 | 프로젝트 루트 | 생성 완료 | ✅ 완료 |
| 9 | D+E | 어드민/API 인증 부재 | 전체 API 라우트 | — | ⚠️ 미해결 |

### 중간 (성능/운영)

| # | 에이전트 | 문제 | 파일 | 수정 내용 | 상태 |
|---|---------|------|------|----------|------|
| 10 | B | NEXT_PUBLIC_BASE_PATH .env.example 누락 | .env.example | 변수 추가 | ✅ 완료 |
| 11 | C | video src basePath 미적용 | hero-section.tsx | `apiUrl()` 적용 | ✅ 완료 |
| 12 | B | seed.ts DATA_DIR 하드코딩 | scripts/seed.ts | 환경변수 사용으로 변경 | ✅ 완료 |
| 13 | D+E | Rate limiting 부재 | 전체 API | — | ⚠️ 미해결 (Nginx 레벨 처리 권장) |
| 14 | D+E | CSRF 보호 부재 | 전체 API | — | ⚠️ 미해결 (인증 구현 시 함께 처리) |

### 낮음 (품질/관리)

| # | 에이전트 | 문제 | 파일 | 수정 내용 | 상태 |
|---|---------|------|------|----------|------|
| 15 | D | 거대 파일 (500줄+) | simulator, admin/pages, community | — | ℹ️ 참고 (기능상 문제 없음) |
| 16 | D | 빈 catch 블록 3곳 | header, hero-section, submit-consultation | — | ℹ️ 참고 |
| 17 | D+E | 업로드 MIME type 미검증 | api/upload/route.ts | — | ℹ️ 참고 (확장자 검증으로 1차 방어) |

## 4. 에이전트별 분석 요약

| 에이전트 | 영역 | 상태 | 발견 문제 수 | 수정 완료 수 |
|---------|------|------|------------|------------|
| A | DB 커넥션/쿼리 | 해당 없음 | 0 | 0 |
| B | 환경변수/설정 | 수정 완료 | 6 | 5 |
| C | 경로 호환성 | 수정 완료 | 3 | 3 |
| D | 코드 품질 | 참고 | 3 | 0 |
| E | 보안 | 일부 수정 | 7 | 4 |

## 5. 생성된 파일
- `.env.example` — 환경변수 목록 (DATA_DIR, UPLOAD_DIR, PORT, NEXT_PUBLIC_BASE_PATH)
- `src/lib/api.ts` — basePath 적용 fetch 유틸리티 (apiUrl, apiFetch)

## 6. 수동 조치 필요 항목

1. **어드민/API 인증 구현 (필수 — 퍼블릭 배포 전)**
   - `middleware.ts`를 생성하여 `/admin/*` 경로 및 쓰기 API(POST/PUT/DELETE)에 인증 적용
   - 최소 기본 인증(Basic Auth) 또는 세션 기반 인증 필요
   - 현재 상태로 배포하면 누구나 데이터 수정/삭제 가능

2. **Docker Manager 프로젝트 등록 시**
   - 유형: Next.js 선택
   - 볼륨 설정: `{"dm-barunwedding-data": "/app/data"}` 추가
   - UPLOAD_DIR을 `/app/data/uploads`로 설정 시, Nginx에서 해당 경로를 정적 서빙하도록 추가 설정 필요

3. **Rate Limiting**
   - Nginx 레벨에서 `limit_req` 설정 권장
   - 특히 파일 업로드, 상담 신청 API

## 7. 검증 결과
- **DB 접속 환경**: 해당 없음 (JSON 파일 기반)
- **빌드 검증**: ✅ PASS (`npm run build` 성공)
- **실행 검증**: ✅ PASS (localhost:3001 정상 응답)
  - 의존성 설치: 성공
  - 앱 실행: 성공
  - 헬스체크: HTTP 200
  - 실행 오류 수정 횟수: 0회
- **Docker Manager 호환성**: ✅ PASS
- **절대 경로 잔존 검사**: ✅ PASS (fetch 0건 잔존)
- **미해결 오류**: 인증 미구현 (로컬 개발 환경에서는 문제 없으나 퍼블릭 배포 전 필수)
