export interface WeddingHall {
  id: string;
  name: string;
  type: "호텔" | "하우스" | "컨벤션";
  region: string;
  address: string;
  minGuests: number;
  maxGuests: number;
  mealCostPerPerson: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  images: string[];
  features: string[];
  description: string;
}

export interface SdmeItem {
  id: string;
  category: "스튜디오" | "드레스" | "헤어메이크업" | "본식스냅" | "패키지";
  brand: string;
  title: string;
  imageUrl: string;
  price: number;
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  author: string;
  hallName: string;
  rating: number;
  content: string;
  imageUrl: string;
  date: string;
  tags: string[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  dueMonths: number;
  completed: boolean;
  description: string;
}

export const weddingHalls: WeddingHall[] = [
  {
    id: "1",
    name: "그랜드 하얏트 서울",
    type: "호텔",
    region: "서울 용산구",
    address: "서울 용산구 소월로 322",
    minGuests: 100,
    maxGuests: 500,
    mealCostPerPerson: 95000,
    rating: 4.8,
    reviewCount: 324,
    imageUrl: "/images/hall-1.jpg",
    images: ["/images/hall-1.jpg", "/images/hall-1-2.jpg"],
    features: ["발렛파킹", "신부대기실", "야외정원", "피로연장"],
    description:
      "남산이 내려다보이는 프리미엄 호텔 웨딩. 전통과 현대가 어우러진 품격 있는 예식을 경험하세요.",
  },
  {
    id: "2",
    name: "더 라움",
    type: "하우스",
    region: "서울 역삼동",
    address: "서울 강남구 역삼로 542",
    minGuests: 50,
    maxGuests: 300,
    mealCostPerPerson: 85000,
    rating: 4.7,
    reviewCount: 256,
    imageUrl: "/images/hall-2.jpg",
    images: ["/images/hall-2.jpg"],
    features: ["독립 홀", "가든", "뷔페", "주차"],
    description:
      "도심 속 자연을 느낄 수 있는 하우스 웨딩. 프라이빗한 공간에서 특별한 하루를 만들어 보세요.",
  },
  {
    id: "3",
    name: "롯데호텔 서울",
    type: "호텔",
    region: "서울 중구",
    address: "서울 중구 을지로 30",
    minGuests: 150,
    maxGuests: 800,
    mealCostPerPerson: 110000,
    rating: 4.9,
    reviewCount: 512,
    imageUrl: "/images/hall-3.jpg",
    images: ["/images/hall-3.jpg"],
    features: ["발렛파킹", "VIP라운지", "크리스탈볼룸", "피로연장"],
    description:
      "대한민국 대표 럭셔리 호텔 웨딩. 크리스탈 볼룸에서 잊지 못할 순간을 만드세요.",
  },
  {
    id: "4",
    name: "아펠가모 반포",
    type: "하우스",
    region: "서울 서초구",
    address: "서울 서초구 반포대로 235",
    minGuests: 80,
    maxGuests: 250,
    mealCostPerPerson: 78000,
    rating: 4.6,
    reviewCount: 189,
    imageUrl: "/images/hall-4.jpg",
    images: ["/images/hall-4.jpg"],
    features: ["가든예식", "독립홀", "스몰웨딩", "뷔페"],
    description:
      "한강이 보이는 프렌치 감성 하우스 웨딩. 소규모 프라이빗 웨딩에 완벽한 공간입니다.",
  },
  {
    id: "5",
    name: "코엑스 인터컨티넨탈",
    type: "호텔",
    region: "서울 강남구",
    address: "서울 강남구 봉은사로 524",
    minGuests: 100,
    maxGuests: 600,
    mealCostPerPerson: 100000,
    rating: 4.7,
    reviewCount: 298,
    imageUrl: "/images/hall-5.jpg",
    images: ["/images/hall-5.jpg"],
    features: ["그랜드볼룸", "발렛파킹", "신부대기실", "연회장"],
    description:
      "강남 중심의 럭셔리 호텔 웨딩. 세련된 도시 감성과 격식 있는 예식을 동시에.",
  },
  {
    id: "6",
    name: "수원컨벤션센터",
    type: "컨벤션",
    region: "경기 수원시",
    address: "경기도 수원시 영통구 월드컵로 164",
    minGuests: 200,
    maxGuests: 1000,
    mealCostPerPerson: 65000,
    rating: 4.3,
    reviewCount: 145,
    imageUrl: "/images/hall-6.jpg",
    images: ["/images/hall-6.jpg"],
    features: ["대형홀", "넓은주차장", "뷔페", "접근성"],
    description:
      "넓은 공간과 합리적인 가격의 컨벤션 웨딩. 많은 하객을 초대할 수 있습니다.",
  },
];

export const sdmeItems: SdmeItem[] = [
  {
    id: "s1",
    category: "스튜디오",
    brand: "아이디 스튜디오",
    title: "내추럴 웨딩 촬영 패키지",
    imageUrl: "/images/studio-1.jpg",
    price: 1200000,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "s2",
    category: "드레스",
    brand: "모니카블랑",
    title: "클래식 A라인 웨딩드레스",
    imageUrl: "/images/dress-1.jpg",
    price: 800000,
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "s3",
    category: "헤어메이크업",
    brand: "제니하우스",
    title: "프리미엄 신부 메이크업",
    imageUrl: "/images/makeup-1.jpg",
    price: 600000,
    rating: 4.7,
    reviewCount: 112,
  },
  {
    id: "s4",
    category: "본식스냅",
    brand: "온뜰에피움",
    title: "본식 스냅 촬영",
    imageUrl: "/images/snap-1.jpg",
    price: 500000,
    rating: 4.6,
    reviewCount: 78,
  },
  {
    id: "s5",
    category: "패키지",
    brand: "바른웨딩",
    title: "올인원 스드메 패키지",
    imageUrl: "/images/package-1.jpg",
    price: 2500000,
    rating: 4.8,
    reviewCount: 203,
  },
  {
    id: "s6",
    category: "스튜디오",
    brand: "루벨리",
    title: "시네마틱 웨딩 영상",
    imageUrl: "/images/studio-2.jpg",
    price: 1500000,
    rating: 4.7,
    reviewCount: 67,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    author: "김*영",
    hallName: "그랜드 하얏트 서울",
    rating: 5,
    content:
      "남산 뷰가 정말 환상적이었어요. 하객분들도 모두 만족하셨고, 식사도 최고였습니다!",
    imageUrl: "/images/review-1.jpg",
    date: "2026-03-15",
    tags: ["뷰맛집", "음식최고", "서비스굿"],
  },
  {
    id: "r2",
    author: "이*진",
    hallName: "더 라움",
    rating: 5,
    content:
      "프라이빗한 분위기에서 소중한 사람들과 함께할 수 있어서 정말 좋았어요. 가든 예식 추천!",
    imageUrl: "/images/review-2.jpg",
    date: "2026-03-10",
    tags: ["가든예식", "프라이빗", "분위기좋음"],
  },
  {
    id: "r3",
    author: "박*현",
    hallName: "롯데호텔 서울",
    rating: 5,
    content:
      "크리스탈 볼룸의 샹들리에가 정말 아름다웠습니다. 격식 있는 예식을 원하시면 강추합니다.",
    imageUrl: "/images/review-3.jpg",
    date: "2026-02-28",
    tags: ["럭셔리", "격식있는", "대형홀"],
  },
  {
    id: "r4",
    author: "최*은",
    hallName: "아펠가모 반포",
    rating: 4,
    content:
      "한강뷰 하우스웨딩 너무 예뻤어요! 스몰웨딩으로 진행했는데 딱 좋았습니다.",
    imageUrl: "/images/review-4.jpg",
    date: "2026-02-20",
    tags: ["한강뷰", "스몰웨딩", "하우스"],
  },
];

export const defaultChecklist: ChecklistItem[] = [
  {
    id: "c1",
    title: "예식 날짜 확정",
    category: "필수",
    dueMonths: 12,
    completed: false,
    description: "양가 상의 후 예식 날짜를 결정합니다.",
  },
  {
    id: "c2",
    title: "웨딩홀 답사 및 계약",
    category: "필수",
    dueMonths: 10,
    completed: false,
    description: "최소 3~5곳 이상 답사 후 계약합니다.",
  },
  {
    id: "c3",
    title: "스드메 업체 선정",
    category: "필수",
    dueMonths: 8,
    completed: false,
    description: "스튜디오, 드레스, 메이크업 업체를 선정합니다.",
  },
  {
    id: "c4",
    title: "청첩장 제작",
    category: "필수",
    dueMonths: 3,
    completed: false,
    description: "디자인 선택 후 인쇄 및 모바일 청첩장을 제작합니다.",
  },
  {
    id: "c5",
    title: "예물/예단 준비",
    category: "전통",
    dueMonths: 6,
    completed: false,
    description: "양가 협의 후 예물과 예단을 준비합니다.",
  },
  {
    id: "c6",
    title: "혼수 준비",
    category: "생활",
    dueMonths: 4,
    completed: false,
    description: "가전, 가구, 생활용품 등을 준비합니다.",
  },
  {
    id: "c7",
    title: "신혼집 계약",
    category: "생활",
    dueMonths: 6,
    completed: false,
    description: "신혼집을 구하고 인테리어를 계획합니다.",
  },
  {
    id: "c8",
    title: "신혼여행 예약",
    category: "여행",
    dueMonths: 3,
    completed: false,
    description: "여행지 선정 후 항공권과 숙소를 예약합니다.",
  },
  {
    id: "c9",
    title: "주례/사회자 섭외",
    category: "예식",
    dueMonths: 4,
    completed: false,
    description: "주례 또는 사회자를 섭외합니다.",
  },
  {
    id: "c10",
    title: "축가/영상 준비",
    category: "예식",
    dueMonths: 2,
    completed: false,
    description: "축가자 섭외 또는 축하 영상을 제작합니다.",
  },
  {
    id: "c11",
    title: "최종 피팅",
    category: "필수",
    dueMonths: 1,
    completed: false,
    description: "드레스/턱시도 최종 피팅 및 수선을 완료합니다.",
  },
  {
    id: "c12",
    title: "하객 명단 확정",
    category: "필수",
    dueMonths: 1,
    completed: false,
    description: "최종 하객 인원을 확정하고 식장에 알립니다.",
  },
];
