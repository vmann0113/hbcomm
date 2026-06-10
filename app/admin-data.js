// ── HANBEAM LIFE · 관리자 데이터 ─────────────────────────────
// (BUSINESSES / POSTS / NEWS 는 data.jsx 에서 로드됨)

const WON = n => '₩' + n.toLocaleString();

// 요금제
const PLANS = [{
  id: 'standard',
  name: '스탠다드',
  price: 99000,
  color: 'par',
  desc: '미니홈 운영 · 기본 노출 · 소식 발신',
  perks: ['미니홈 1개 운영', '소식·신호층 발신', '태그 다리 연결', '거리 그리드 노출']
}, {
  id: 'premium',
  name: '프리미엄',
  price: 199000,
  color: 'wed',
  desc: '상단 우대 노출 · 신호층 우선 · 추천 가산',
  perks: ['스탠다드 전체', '거리 상단 우대 노출', '신호층 우선 배치', '오늘의 추천 가산점', '통계 리포트']
}, {
  id: 'trial',
  name: '무료 체험',
  price: 0,
  color: 'trv',
  desc: '14일 무료 · 결제수단 등록 시 자동 전환',
  perks: ['스탠다드 기능 14일', '언제든 해지']
}];
const planById = id => PLANS.find(p => p.id === id);

// 구독 (업체별 1건)
let SUBS = [{
  bizId: 'hanbeam',
  plan: 'premium',
  status: 'active',
  start: '2026-01-05',
  end: '2026-07-05',
  pg: 'toss_8a21f',
  auto: true
}, {
  bizId: 'maru',
  plan: 'standard',
  status: 'active',
  start: '2026-02-18',
  end: '2026-06-20',
  pg: 'toss_3c90d',
  auto: true
}, {
  bizId: 'seoyeon',
  plan: 'standard',
  status: 'active',
  start: '2026-03-02',
  end: '2026-08-02',
  pg: 'toss_1f77b',
  auto: true
}, {
  bizId: 'aidam',
  plan: 'premium',
  status: 'active',
  start: '2026-01-22',
  end: '2026-06-12',
  pg: 'toss_55e0a',
  auto: true
}, {
  bizId: 'pogeun',
  plan: 'trial',
  status: 'trial',
  start: '2026-05-30',
  end: '2026-06-13',
  pg: '—',
  auto: false
}, {
  bizId: 'jeju',
  plan: 'standard',
  status: 'active',
  start: '2026-04-10',
  end: '2026-09-10',
  pg: 'toss_9b34c',
  auto: true
}, {
  bizId: 'gaon',
  plan: 'standard',
  status: 'expired',
  start: '2025-11-28',
  end: '2026-05-28',
  pg: 'toss_2a18e',
  auto: false
}];

// 노출 등급 (업체별)
const EXPOSURE = {
  hanbeam: '우대',
  maru: '기본',
  seoyeon: '기본',
  aidam: '우대',
  pogeun: '기본',
  jeju: '기본',
  gaon: '기본'
};

// 결제 내역 (최근)
const PAYMENTS = [{
  date: '2026-06-02',
  bizId: 'jeju',
  plan: 'standard',
  amount: 99000,
  status: '완료',
  pg: 'toss_9b34c'
}, {
  date: '2026-06-01',
  bizId: 'hanbeam',
  plan: 'premium',
  amount: 199000,
  status: '완료',
  pg: 'toss_8a21f'
}, {
  date: '2026-05-22',
  bizId: 'seoyeon',
  plan: 'standard',
  amount: 99000,
  status: '완료',
  pg: 'toss_1f77b'
}, {
  date: '2026-05-18',
  bizId: 'maru',
  plan: 'standard',
  amount: 99000,
  status: '완료',
  pg: 'toss_3c90d'
}, {
  date: '2026-05-12',
  bizId: 'aidam',
  plan: 'premium',
  amount: 199000,
  status: '완료',
  pg: 'toss_55e0a'
}, {
  date: '2026-05-28',
  bizId: 'gaon',
  plan: 'standard',
  amount: 99000,
  status: '실패',
  pg: 'toss_2a18e'
}];

// 월 매출 추이 (원)
const REVENUE = [{
  m: '1월',
  v: 298000
}, {
  m: '2월',
  v: 397000
}, {
  m: '3월',
  v: 496000
}, {
  m: '4월',
  v: 595000
}, {
  m: '5월',
  v: 694000
}, {
  m: '6월',
  v: 695000
}];

// 사용자 (시드 + 오가닉)
const USERS = [{
  id: 'u1',
  name: '김서연',
  phone: '010-2841-77**',
  wedding: '2026-10-17',
  joined: '2026-01-08',
  source: '시드DB',
  status: '정상'
}, {
  id: 'u2',
  name: '이민지',
  phone: '010-3320-15**',
  wedding: '2026-09-05',
  joined: '2026-02-14',
  source: '시드DB',
  status: '정상'
}, {
  id: 'u3',
  name: '박지훈',
  phone: '010-9981-30**',
  wedding: '—',
  joined: '2026-03-21',
  source: '오가닉',
  status: '정상'
}, {
  id: 'u4',
  name: '최유나',
  phone: '010-4417-88**',
  wedding: '2026-12-12',
  joined: '2026-04-02',
  source: '시드DB',
  status: '정상'
}, {
  id: 'u5',
  name: '정해린',
  phone: '010-7725-41**',
  wedding: '—',
  joined: '2026-04-19',
  source: '오가닉',
  status: '정상'
}, {
  id: 'u6',
  name: '한도윤',
  phone: '010-1102-66**',
  wedding: '2027-03-08',
  joined: '2026-05-03',
  source: '오가닉',
  status: '정상'
}, {
  id: 'u7',
  name: '오세아',
  phone: '010-6638-92**',
  wedding: '2026-11-21',
  joined: '2026-05-20',
  source: '시드DB',
  status: '휴면'
}, {
  id: 'u8',
  name: '서가람',
  phone: '010-8850-04**',
  wedding: '—',
  joined: '2026-05-29',
  source: '오가닉',
  status: '정상'
}];

// 신고 (게시글 모더레이션)
const REPORTS = [{
  postId: 'p3',
  reason: '광고성 의심',
  by: '사용자 신고 2건',
  date: '2026-06-02'
}];

// KPI (집계값 — 데모용 상수)
const STATS = {
  users: 1240,
  usersDelta: '+86',
  seedUsers: 320,
  followsTotal: 9170,
  pageviews: '18.4K'
};
Object.assign(window, {
  WON,
  PLANS,
  planById,
  SUBS,
  EXPOSURE,
  PAYMENTS,
  REVENUE,
  USERS,
  REPORTS,
  STATS
});