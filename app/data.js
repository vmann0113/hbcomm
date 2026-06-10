// ── 한빔커뮤니티 · mock data ─────────────────────────────────
// topics: wedding(결혼준비) / parenting(육아) / travel(여행)

const TOPICS = [{
  key: 'wedding',
  label: '결혼준비',
  cls: 'wed'
}, {
  key: 'parenting',
  label: '육아',
  cls: 'par'
}, {
  key: 'travel',
  label: '여행',
  cls: 'trv'
}];
const topicOf = k => TOPICS.find(t => t.key === k);

// ── 입점 업체 (businesses) ───────────────────────────────────
const BUSINESSES = [{
  id: 'hanbeam',
  name: '한빔한복',
  topic: 'wedding',
  intro: '경사의 시작을 함께하는 한복 — 대여·맞춤',
  official: 'hanbeam-hanbok.co.kr',
  followers: 2840,
  joined: '입점사',
  cover: '한복 컬렉션 커버',
  logo: '한빔'
}, {
  id: 'maru',
  name: '마루스튜디오',
  topic: 'wedding',
  intro: '담백한 본식 스냅 & 웨딩 화보',
  official: 'marustudio.kr',
  followers: 1620,
  cover: '웨딩 스냅 커버',
  logo: '마루'
}, {
  id: 'seoyeon',
  name: '서연 헤어메이크업',
  topic: 'wedding',
  intro: '신부의 하루를 완성하는 헤어·메이크업',
  official: 'seoyeon-beauty.kr',
  followers: 980,
  cover: '메이크업 룩 커버',
  logo: '서연'
}, {
  id: 'aidam',
  name: '아이담 스튜디오',
  topic: 'parenting',
  intro: '돌·가족사진 전문 · 자연광 스튜디오',
  official: 'aidam-studio.kr',
  followers: 1340,
  cover: '가족사진 커버',
  logo: '아이담'
}, {
  id: 'pogeun',
  name: '포근 베이비',
  topic: 'parenting',
  intro: '신생아·유아용품 큐레이션 셀렉트숍',
  official: 'pogeun-baby.kr',
  followers: 720,
  cover: '유아용품 커버',
  logo: '포근'
}, {
  id: 'jeju',
  name: '제주 한달살이 하우스',
  topic: 'travel',
  intro: '아이와 함께 머무는 제주 가족 스테이',
  official: 'jeju-monthstay.kr',
  followers: 1110,
  cover: '제주 스테이 커버',
  logo: '제주'
}, {
  id: 'gaon',
  name: '가온 가족여행',
  topic: 'travel',
  intro: '아이 동반 맞춤 일정 여행사',
  official: 'gaon-travel.kr',
  followers: 560,
  cover: '가족여행 커버',
  logo: '가온'
}];
const bizById = id => BUSINESSES.find(b => b.id === id);

// ── 업체 소식 (news) · type: newproduct / event / daily ──────
// signal=true 인 항목만 '불 켜짐'
const NEWS = [{
  id: 'n1',
  bizId: 'hanbeam',
  type: 'event',
  signal: true,
  time: '2시간 전',
  title: '초여름 한복 렌탈 20% — 6월 한정',
  body: '상견례·약혼식 시즌을 맞아 6월 한 달간 대여 전 품목 20% 할인을 진행해요. 예약은 공식 사이트에서.',
  image: '이벤트 배너'
}, {
  id: 'n2',
  bizId: 'hanbeam',
  type: 'newproduct',
  signal: true,
  time: '1일 전',
  title: '2026 단아 라인 신상 입고',
  body: '은은한 미색 저고리에 먹색 깃을 더한 신작 5종이 들어왔습니다.',
  image: '신상 한복'
}, {
  id: 'n3',
  bizId: 'hanbeam',
  type: 'daily',
  signal: false,
  time: '4일 전',
  title: '매장 정기 휴무 안내',
  body: '매주 화요일은 정기 휴무입니다. 방문 전 예약 부탁드려요.',
  image: null
}, {
  id: 'n4',
  bizId: 'maru',
  type: 'newproduct',
  signal: true,
  time: '5시간 전',
  title: '2026 본식 스냅 신규 패키지 공개',
  body: '원판+스냅 통합 패키지를 새로 구성했어요. 6월 예약 시 앨범 업그레이드.',
  image: '스냅 패키지'
}, {
  id: 'n5',
  bizId: 'maru',
  type: 'daily',
  signal: false,
  time: '1주 전',
  title: '5월 본식 후기 모음',
  body: '지난달 함께한 부부들의 사진을 모아봤어요.',
  image: '후기 모음'
}, {
  id: 'n6',
  bizId: 'aidam',
  type: 'event',
  signal: true,
  time: '3시간 전',
  title: '돌사진 얼리버드 예약 오픈',
  body: '가을 돌 촬영 예약을 미리 받습니다. 선착순 10팀 헤어 소품 증정.',
  image: '돌사진 이벤트'
}, {
  id: 'n7',
  bizId: 'aidam',
  type: 'daily',
  signal: false,
  time: '6일 전',
  title: '자연광 스튜디오 리뉴얼',
  body: '촬영실을 넓히고 채광을 보강했어요.',
  image: '스튜디오'
}, {
  id: 'n8',
  bizId: 'jeju',
  type: 'newproduct',
  signal: true,
  time: '1시간 전',
  title: '여름 성수기 객실 예약 오픈',
  body: '7~8월 가족실 예약을 시작합니다. 2주 이상 장기 머무름 특가 있어요.',
  image: '제주 객실'
}, {
  id: 'n9',
  bizId: 'seoyeon',
  type: 'daily',
  signal: false,
  time: '2일 전',
  title: '6월 예약 마감 임박',
  body: '주말 시간대가 빠르게 마감되고 있어요.',
  image: null
}, {
  id: 'n10',
  bizId: 'pogeun',
  type: 'newproduct',
  signal: false,
  time: '3일 전',
  title: '여름 신생아 거즈 라인 입고',
  body: '땀 많은 여름 아기를 위한 얇은 거즈 제품.',
  image: '거즈 라인'
}];
const newsOf = bizId => NEWS.filter(n => n.bizId === bizId);
const signalNews = () => NEWS.filter(n => n.signal);

// ── 광장 게시글 (posts) · type: review(후기)/question(질문)/info(정보)
const POSTS = [{
  id: 'p1',
  topic: 'wedding',
  type: 'review',
  author: '예신_민지',
  time: '1시간 전',
  title: '한복 대여 vs 맞춤, 6개월 준비 끝 솔직 후기',
  excerpt: '상견례부터 본식 폐백까지 한복만 세 번 입었어요. 결론부터 말하면…',
  body: `상견례부터 본식 폐백까지 한복을 세 번 입었어요. 처음엔 맞춤만 생각했는데, 한 번 입고 말 옷에 큰돈 쓰기가 아깝더라고요.

결론부터 말하면 저는 대여 2 : 맞춤 1로 정리했어요. 폐백 한복만 오래 두고 입을 생각으로 맞췄고, 상견례·약혼식은 대여로 충분했습니다.

대여는 #한빔한복 에서 했는데 미색 저고리 핏이 사진으로 본 것보다 훨씬 단아했어요. 직원분이 체형 보고 깃 너비까지 조정해주셔서 만족.`,
  thumb: '한복 후기',
  likes: 128,
  comments: 34,
  scrap: true,
  tags: ['hanbeam']
}, {
  id: 'p2',
  topic: 'wedding',
  type: 'info',
  author: '결준_요정',
  time: '5시간 전',
  title: '스드메 견적 엑셀로 정리하는 법 (양식 공유)',
  excerpt: '업체별 견적을 한 장에 모으니 비교가 훨씬 쉬웠어요. 항목 구성은…',
  body: `업체 다섯 곳 견적을 한 장에 모으니 비교가 훨씬 쉬웠어요.

항목은 (1) 기본가 (2) 추가 인원 (3) 원본 제공 (4) 수정 횟수 (5) 주말 할증 다섯 가지로 나눴습니다. 특히 '원본 제공' 여부가 가격 차이를 가장 크게 만들더라고요.`,
  thumb: null,
  likes: 96,
  comments: 21,
  scrap: false,
  tags: []
}, {
  id: 'p3',
  topic: 'wedding',
  type: 'question',
  author: '7월의신부',
  time: '어제',
  title: '상견례 때 한복 꼭 입어야 할까요?',
  excerpt: '양가 분위기가 캐주얼한 편인데 저만 한복 입으면 붕 뜰까요?',
  body: `양가 분위기가 캐주얼한 편이에요. 어머님들은 정장 입으신다는데 저만 한복 입으면 붕 뜰까 걱정됩니다. 다들 어떻게 하셨나요?`,
  thumb: null,
  likes: 18,
  comments: 42,
  scrap: false,
  tags: []
}, {
  id: 'p4',
  topic: 'parenting',
  type: 'review',
  author: '단오맘',
  time: '3시간 전',
  title: '첫 돌잔치 셀프 준비 총정리 (대여 + 촬영)',
  excerpt: '돌상 대여, 촬영, 답례품까지 한 달 안에 준비한 기록이에요.',
  body: `돌상 대여, 촬영, 답례품까지 한 달 안에 준비했어요.

촬영은 #아이담스튜디오 에서 했는데 아기 컨디션 안 좋을 때 기다려주시는 게 정말 컸어요. 자연광이라 보정이 과하지 않아 더 좋았습니다.`,
  thumb: '돌잔치 후기',
  likes: 204,
  comments: 58,
  scrap: true,
  tags: ['aidam']
}, {
  id: 'p5',
  topic: 'parenting',
  type: 'question',
  author: '초보아빠',
  time: '7시간 전',
  title: '신생아 백일상 대여 어디서 하셨어요?',
  excerpt: '집이 좁아서 큰 상은 부담이고, 미니멀한 백일상 찾고 있어요.',
  body: `집이 좁아서 큰 상은 부담이에요. 깔끔하고 미니멀한 백일상 대여 추천 부탁드립니다.`,
  thumb: null,
  likes: 11,
  comments: 16,
  scrap: false,
  tags: []
}, {
  id: 'p6',
  topic: 'travel',
  type: 'review',
  author: '제주두번째',
  time: '2시간 전',
  title: '아이랑 제주 5박 6일, 진짜 좋았던 곳만',
  excerpt: '성수기 피해 6월 초에 다녀왔어요. 동선과 숙소 위주로 정리했어요.',
  body: `성수기를 피해 6월 초에 다녀왔어요.

숙소는 #제주한달살이하우스 에서 묵었는데 아기 침대랑 이유식 도구가 다 있어서 짐이 확 줄었어요. 마당이 있어서 아이가 뛰어놀기 좋았습니다.`,
  thumb: '제주 후기',
  likes: 152,
  comments: 29,
  scrap: false,
  tags: ['jeju']
}, {
  id: 'p7',
  topic: 'travel',
  type: 'info',
  author: '카시트박사',
  time: '어제',
  title: '가족여행 렌터카 카시트, 이것만 확인하세요',
  excerpt: '현장에서 카시트 빌릴 때 체크할 3가지를 정리했어요.',
  body: `현장 대여 카시트는 (1) 연령·체중 범위 (2) 청결 상태 (3) 설치 가능 여부를 꼭 확인하세요. 미리 사진 요청하면 대부분 보내줍니다.`,
  thumb: null,
  likes: 74,
  comments: 12,
  scrap: false,
  tags: []
}];
const postsByTopic = t => POSTS.filter(p => p.topic === t);
const postById = id => POSTS.find(p => p.id === id);
// 특정 업체가 태그된 후기 (태그 다리 역방향)
const postsTagging = bizId => POSTS.filter(p => p.tags.includes(bizId));

// ── 광장 '오늘의 추천' (큐레이션) ────────────────────────────
const FEATURED = {
  wedding: ['p1', 'p2'],
  parenting: ['p4', 'p5'],
  travel: ['p6', 'p7']
};

// ── 댓글 (post / news 공용 데모) ─────────────────────────────
const COMMENTS = {
  p1: [{
    user: '봄날의신부',
    time: '40분 전',
    body: '폐백만 맞춤 완전 공감해요. 저도 그렇게 했어요!'
  }, {
    user: '하루',
    time: '25분 전',
    body: '한빔한복 미색 저고리 진짜 예쁘던데 정보 감사해요 🙏'
  }],
  p4: [{
    user: '율무맘',
    time: '1시간 전',
    body: '아이담 자연광 후기 많네요. 저장해둡니다.'
  }],
  p6: [{
    user: '여행가는중',
    time: '1시간 전',
    body: '마당 있는 숙소 정보 너무 좋아요!'
  }]
};
const commentsOf = id => COMMENTS[id] || [];

// ── 이미지 (Unsplash) ────────────────────────────────────────
const imgUrl = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;
const IMG = {
  biz: {
    hanbeam: '1610030469983-98e550d6193c',
    // 전통 의상
    maru: '1519741497674-611481863552',
    // 웨딩 커플
    seoyeon: '1487412947147-5cebf100ffc2',
    // 메이크업
    aidam: '1476703993599-0035a21b17a9',
    // 가족
    pogeun: '1515488042361-ee00e0ddd4e4',
    // 아기·용품
    jeju: '1600596542815-ffad4c1539a9',
    // 스테이 하우스
    gaon: '1469854523086-cc02fe5d8800' // 로드트립
  },
  news: {
    n1: '1465495976277-4387d4b0b4c6',
    // 한복 이벤트(부케·반지)
    n2: '1610030469983-98e550d6193c',
    // 신상 한복
    n4: '1606216794074-735e91aa2c92',
    // 스냅 패키지
    n5: '1519225421980-715cb0215aed',
    // 본식 후기 모음
    n6: '1555252333-9f8e92e65df9',
    // 돌사진(아기)
    n7: '1556909114-f6e7ad7d3136',
    // 스튜디오
    n8: '1600596542815-ffad4c1539a9',
    // 제주 객실
    n10: '1518895949257-7621c3c786d7' // 거즈 라인
  },
  post: {
    p1: '1610030469983-98e550d6193c',
    // 한복 후기
    p4: '1515488042361-ee00e0ddd4e4',
    // 돌잔치 후기
    p6: '1502086223501-7ea6ecd79368' // 제주 후기
  }
};

// ── 현재 사용자 ──────────────────────────────────────────────
const ME = {
  name: '김서연',
  handle: '@seoyeon',
  weddingDate: '2026-10-17',
  following: ['hanbeam', 'maru', 'aidam'],
  // 팔로우한 업체
  favTopics: ['wedding', 'parenting'],
  myPosts: ['p2'],
  scraps: ['p1', 'p4'],
  // ── 게임화 ──
  stage: 'wedding-prep',
  level: 4,
  levelName: '활발한 이웃',
  xp: 320,
  xpMax: 500,
  groups: ['g1']
};

// ── 라이프 여정 단계 ─────────────────────────────────────────
const STAGES = [{
  key: 'wedding-prep',
  label: '결혼준비',
  emoji: '💍',
  cls: 'rose',
  topic: 'wedding'
}, {
  key: 'newlywed',
  label: '신혼',
  emoji: '🏡',
  cls: 'sun'
}, {
  key: 'pregnancy',
  label: '임신·출산',
  emoji: '🤰',
  cls: 'mint'
}, {
  key: 'parenting',
  label: '육아',
  emoji: '🍼',
  cls: 'mint',
  topic: 'parenting'
}, {
  key: 'education',
  label: '교육·학교',
  emoji: '🎒',
  cls: 'sky'
}, {
  key: 'group',
  label: '소모임',
  emoji: '🎈',
  cls: 'grape'
}];
const stageIdx = k => STAGES.findIndex(s => s.key === k);

// ── 스탬프 수집판 ────────────────────────────────────────────
const STAMPS = [{
  id: 'first-post',
  emoji: '✍️',
  label: '첫 글',
  got: true
}, {
  id: 'scrapper',
  emoji: '🔖',
  label: '스크랩 5',
  got: true
}, {
  id: 'warm',
  emoji: '💬',
  label: '따뜻한 댓글',
  got: true
}, {
  id: 'group-join',
  emoji: '🎈',
  label: '소모임 가입',
  got: true
}, {
  id: 'reviewer',
  emoji: '👑',
  label: '후기왕',
  got: false
}, {
  id: 'streak',
  emoji: '📅',
  label: '30일 출석',
  got: false
}];

// ── 소모임 ───────────────────────────────────────────────────
const GROUPS = [{
  id: 'g1',
  name: '10월의 신부 모임',
  emoji: '💐',
  members: 284,
  cls: 'rose',
  topic: 'wedding',
  desc: '가을 결혼 준비 동기들',
  about: '2026년 10월 결혼을 앞둔 예비 신부들의 모임이에요. 같은 시기 준비하며 견적·일정·꿀팁을 나눠요.',
  notice: '이번 주 토요일 저녁 8시, 스드메 견적 공유 라이브 채팅 열려요!'
}, {
  id: 'g2',
  name: '초보맘 수다방',
  emoji: '🍼',
  members: 512,
  cls: 'mint',
  topic: 'parenting',
  desc: '신생아 육아 정보 나눔',
  about: '처음 아이를 키우는 엄마·아빠들이 밤낮으로 묻고 답하는 공간이에요. 수유·수면·이유식 무엇이든.',
  notice: '육아용품 공동구매 신청은 고정글을 확인해주세요.'
}, {
  id: 'g3',
  name: '제주 한달살이 클럽',
  emoji: '🌴',
  members: 176,
  cls: 'sky',
  topic: 'travel',
  about: '아이와 함께 제주에서 한 달 살아본 / 살아볼 가족들의 정보 모임이에요. 숙소·동선·날씨까지.',
  desc: '아이와 제주에서 살기',
  notice: '7~8월 성수기 숙소 후기 모으는 중이에요.'
}, {
  id: 'g4',
  name: '예비 초등 학부모',
  emoji: '🎒',
  members: 198,
  cls: 'grape',
  topic: 'parenting',
  about: '예비 초등학생 부모들이 입학 준비·학교 정보·학습 습관을 나누는 모임이에요.',
  desc: '학교 입학 준비 모임',
  notice: '학군·돌봄교실 Q&A 정리본 업데이트했어요.'
}, {
  id: 'g5',
  name: '상견례 준비방',
  emoji: '🍵',
  members: 143,
  cls: 'rose',
  topic: 'wedding',
  about: '상견례를 앞둔 분들이 장소·복장·예절·대화 팁을 나누는 모임이에요.',
  desc: '상견례 D-day 함께 준비',
  notice: '한복 vs 정장 투표 진행 중!'
}, {
  id: 'g6',
  name: '주말 가족 나들이',
  emoji: '🧺',
  members: 367,
  cls: 'sun',
  topic: 'travel',
  about: '아이와 갈 만한 주말 나들이 장소를 매주 공유하는 모임이에요. 키즈카페부터 캠핑까지.',
  desc: '아이와 갈 곳 추천',
  notice: '이번 주 추천: 비 와도 좋은 실내 놀이터 5곳.'
},
// 승인 대기 (운영자 검토 전 — 공개 목록엔 안 보이고 어드민에만 노출)
{
  id: 'g7',
  name: '겨울 신부 모임',
  emoji: '❄️',
  members: 0,
  cls: 'rose',
  topic: 'wedding',
  about: '12~2월 결혼을 앞둔 예비 신부들의 모임이에요.',
  desc: '겨울 결혼 준비 동기들',
  notice: '',
  status: 'pending',
  ownerName: '예신_수아'
}, {
  id: 'g8',
  name: '쌍둥이 육아 모임',
  emoji: '👶',
  members: 0,
  cls: 'mint',
  topic: 'parenting',
  about: '쌍둥이를 키우는 부모들이 정보와 위로를 나누는 모임이에요.',
  desc: '쌍둥이 부모 정보방',
  notice: '',
  status: 'pending',
  ownerName: '두배로맘'
}];
const groupById = id => GROUPS.find(g => g.id === id);

// ── 소모임 게시판 글 ─────────────────────────────────────────
const GROUP_POSTS = {
  g1: [{
    id: 'gp1',
    author: '예신_민지',
    time: '1시간 전',
    body: '스드메 계약 드디어 끝냈어요! 견적 비교표 공유할게요. 궁금하신 분 댓글 주세요 🙌',
    likes: 24,
    comments: 8,
    pin: true
  }, {
    id: 'gp2',
    author: '10월의기적',
    time: '3시간 전',
    body: '상견례 한복 대여 같이 보러 가실 분 계세요? 주말에 인사동 갈 예정이에요.',
    likes: 11,
    comments: 5
  }, {
    id: 'gp3',
    author: '가을신부',
    time: '어제',
    body: '청첩장 시안 두 개 중에 고민이에요. 다들 어떤 스타일로 하셨나요?',
    likes: 9,
    comments: 14
  }],
  g2: [{
    id: 'gp4',
    author: '율무맘',
    time: '30분 전',
    body: '밤수유 끊는 시기 다들 언제였어요? 9개월인데 아직도 2번씩 깨네요 ㅠㅠ',
    likes: 18,
    comments: 22,
    pin: true
  }, {
    id: 'gp5',
    author: '초보아빠',
    time: '2시간 전',
    body: '이유식 시작했는데 거부가 심해요. 비슷한 경험 있으신 분?',
    likes: 13,
    comments: 9
  }],
  g3: [{
    id: 'gp6',
    author: '제주두번째',
    time: '4시간 전',
    body: '6월 초 제주 날씨 정말 좋았어요. 마당 있는 숙소 강추합니다!',
    likes: 16,
    comments: 6,
    pin: true
  }],
  g4: [{
    id: 'gp7',
    author: '예비초1맘',
    time: '5시간 전',
    body: '입학 전에 한글 어디까지 떼고 가야 할까요? 너무 조급한가 싶기도 하고...',
    likes: 21,
    comments: 17,
    pin: true
  }],
  g5: [{
    id: 'gp8',
    author: '7월의신부',
    time: '2시간 전',
    body: '상견례 장소 한정식집으로 정했어요. 분위기 좋고 룸 있는 곳 추천드려요.',
    likes: 8,
    comments: 4,
    pin: true
  }],
  g6: [{
    id: 'gp9',
    author: '주말마다',
    time: '1시간 전',
    body: '비 오는 주말, 실내 키즈카페 다녀왔어요. 후기 사진 올려요 📷',
    likes: 14,
    comments: 7,
    pin: true
  }]
};
const groupPostsOf = gid => GROUP_POSTS[gid] || [];

// ── 할인 쿠폰 (가입 웰컴 + 단골) ─────────────────────────────
const COUPONS = [{
  id: 'cp1',
  bizId: 'hanbeam',
  title: '첫 대여 20% 할인',
  tag: '🎁 웰컴 쿠폰',
  code: 'WELCOME20',
  expire: '2026-09-30',
  highlight: true
}, {
  id: 'cp2',
  bizId: 'hanbeam',
  title: '폐백 한복 맞춤 5만원 할인',
  tag: '단골 전용',
  code: 'PYEBAEK5',
  expire: '2026-12-31'
}, {
  id: 'cp3',
  bizId: 'hanbeam',
  title: '상견례 한복 평일 10% 추가',
  tag: '주중 예약',
  code: 'WEEKDAY10',
  expire: '2026-08-31'
}];
const couponsOf = bizId => COUPONS.filter(c => c.bizId === bizId);

// ── 결혼 준비 체크리스트 (D-day 단계별) ──────────────────────
const CHECKLIST = [{
  phase: '지금 ~ D-150',
  emoji: '📋',
  items: [{
    id: 'k1',
    label: '예식장 투어·예약'
  }, {
    id: 'k2',
    label: '전체 예산 큰 틀 잡기'
  }, {
    id: 'k3',
    label: '상견례 일정 정하기'
  }]
}, {
  phase: 'D-150 ~ D-90',
  emoji: '💍',
  items: [{
    id: 'k4',
    label: '스드메 업체 비교·계약'
  }, {
    id: 'k5',
    label: '상견례 한복 준비'
  }, {
    id: 'k6',
    label: '청첩장 디자인 고르기'
  }]
}, {
  phase: 'D-90 ~ D-30',
  emoji: '📸',
  items: [{
    id: 'k7',
    label: '웨딩 촬영'
  }, {
    id: 'k8',
    label: '예복·한복 가봉'
  }, {
    id: 'k9',
    label: '청첩장 발송'
  }, {
    id: 'k10',
    label: '신혼여행 예약'
  }]
}, {
  phase: 'D-30 ~ 예식',
  emoji: '🎉',
  items: [{
    id: 'k11',
    label: '본식 헤어·메이크업 리허설'
  }, {
    id: 'k12',
    label: '폐백·예단 준비'
  }, {
    id: 'k13',
    label: '최종 하객 명단 정리'
  }]
}];
const CHECKLIST_TOTAL = CHECKLIST.reduce((n, g) => n + g.items.length, 0);

// ── 업체 가이드 콘텐츠 (운영진 시드) ─────────────────────────
const GUIDES = {
  hanbeam: [{
    id: 'gd1',
    emoji: '👰',
    title: '상견례 한복, 실패 없이 고르는 법',
    summary: '양가 분위기·계절·체형에 맞춘 색과 깃 너비 고르는 요령을 정리했어요.',
    read: '3분'
  }, {
    id: 'gd2',
    emoji: '💸',
    title: '대여 vs 맞춤, 뭐가 이득일까?',
    summary: '착용 횟수·보관·수선 비용까지 따져본 솔직 비교표.',
    read: '4분'
  }, {
    id: 'gd3',
    emoji: '📏',
    title: '집에서 한복 치수 재는 법',
    summary: '어깨·가슴둘레·기장 3곳만 재면 끝. 사진과 함께 설명해요.',
    read: '2분'
  }, {
    id: 'gd4',
    emoji: '🧺',
    title: '한복 대여 전 체크리스트',
    summary: '얼룩·소품 구성·반납일 — 빌리기 전 꼭 확인할 것들.',
    read: '2분'
  }]
};
const guidesOf = bizId => GUIDES[bizId] || [];
Object.assign(window, {
  TOPICS,
  topicOf,
  BUSINESSES,
  bizById,
  NEWS,
  newsOf,
  signalNews,
  POSTS,
  postsByTopic,
  postById,
  postsTagging,
  FEATURED,
  COMMENTS,
  commentsOf,
  ME,
  imgUrl,
  IMG,
  STAGES,
  stageIdx,
  STAMPS,
  GROUPS,
  groupById,
  GROUP_POSTS,
  groupPostsOf,
  COUPONS,
  couponsOf,
  CHECKLIST,
  CHECKLIST_TOTAL,
  GUIDES,
  guidesOf
});