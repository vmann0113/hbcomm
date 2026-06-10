// ── 한빔커뮤니티 · Supabase 연동 (콘텐츠 읽기) ──────────────────
// 이 파일은 data.js 다음, app.js 이전에 로드됩니다.
// 키는 anon public 키만 사용합니다 (RLS가 데이터를 보호 — 프론트 노출 안전).
// service_role 키는 절대 여기 넣지 마세요.

const HB_SUPABASE_URL = 'https://byecgsjjuqvwjrppcwwo.supabase.co';
const HB_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZWNnc2pqdXF2d2pycHBjd3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwODgzNTIsImV4cCI6MjA5NjY2NDM1Mn0.zSACEsBfzvyu526aXBZs5f4JjPfFhvarubQIpZVsy4U';

// supabase-js UMD가 로드돼 있으면 클라이언트 생성
const hbSb = (window.supabase && typeof window.supabase.createClient === 'function')
  ? window.supabase.createClient(HB_SUPABASE_URL, HB_SUPABASE_ANON_KEY)
  : null;
window.hbSb = hbSb;

// created_at(ISO) → "방금 / N분 전 / N시간 전 / N일 전"
function hbTimeAgo(iso) {
  if (!iso) return '방금';
  const t = new Date(iso).getTime();
  if (isNaN(t)) return '방금';
  const sec = Math.max(0, (Date.now() - t) / 1000);
  if (sec < 60) return '방금';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}일 전`;
  return new Date(t).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
}

// 배열을 제자리에서 교체 (전역 const 참조 유지)
function hbReplaceArray(arr, items) {
  if (!Array.isArray(arr)) return;
  arr.length = 0;
  items.forEach((it) => arr.push(it));
}

async function hbLoadContent() {
  if (!hbSb) {
    console.warn('[supabase] 라이브러리 미로드 — 데모 데이터로 표시합니다.');
    return;
  }
  try {
    const [postsRes, groupsRes, bizRes, newsRes, guidesRes, couponsRes] = await Promise.all([
      hbSb.from('posts').select('*').eq('hidden', false).order('created_at', { ascending: false }),
      hbSb.from('groups').select('*'),
      hbSb.from('businesses').select('*'),
      hbSb.from('news').select('*').order('created_at', { ascending: false }),
      hbSb.from('guides').select('*'),
      hbSb.from('coupons').select('*'),
    ]);

    // ── 광장 글 ──
    if (postsRes.error) console.warn('[supabase] posts:', postsRes.error.message);
    if (postsRes.data && postsRes.data.length) {
      const mapped = postsRes.data.map((r) => ({
        id: r.id, topic: r.topic, type: r.type, author: r.author || '익명',
        time: hbTimeAgo(r.created_at), title: r.title, excerpt: r.excerpt || '',
        body: r.body || '', thumb: r.thumb || null,
        likes: r.likes || 0, comments: r.comments || 0,
        scrap: false, tags: r.tags || [], featured: !!r.featured,
      }));
      hbReplaceArray(window.POSTS, mapped);

      // '오늘의 추천'을 featured 플래그로 재구성 (데모 id 매칭 대신)
      if (window.FEATURED) {
        Object.keys(window.FEATURED).forEach((k) => { window.FEATURED[k] = []; });
        mapped.filter((p) => p.featured).forEach((p) => {
          if (!window.FEATURED[p.topic]) window.FEATURED[p.topic] = [];
          window.FEATURED[p.topic].push(p.id);
        });
      }
    }

    // ── 소모임 (승인된 것만 공개로 읽힘 — RLS) ──
    if (groupsRes.error) console.warn('[supabase] groups:', groupsRes.error.message);
    if (groupsRes.data && groupsRes.data.length) {
      const mapped = groupsRes.data.map((r) => ({
        id: r.id, name: r.name, emoji: r.emoji || '🎈', members: r.members || 1,
        cls: r.cls || 'grape', topic: r.topic, desc: r.descr || '',
        about: r.about || '', notice: r.notice || '',
        status: r.status || 'active', ownerName: r.owner_name || '',
      }));
      hbReplaceArray(window.GROUPS, mapped);
    }

    // ── 입점 업체 ──
    if (bizRes.error) console.warn('[supabase] businesses:', bizRes.error.message);
    if (bizRes.data && bizRes.data.length) {
      const mapped = bizRes.data.map((r) => ({
        id: r.id, name: r.name, topic: r.topic, intro: r.intro || '',
        official: r.official || '', followers: r.followers || 0,
        joined: r.joined || '', cover: r.cover || (r.name + ' 커버'), logo: r.logo || (r.name || '').slice(0, 2),
      }));
      hbReplaceArray(window.BUSINESSES, mapped);
      // 업체 대표 이미지(Unsplash photo id)가 있으면 IMG 맵에 반영
      if (window.IMG && window.IMG.biz) bizRes.data.forEach((r) => { if (r.image) window.IMG.biz[r.id] = r.image; });
    }

    // ── 업체 소식 ──
    if (newsRes.error) console.warn('[supabase] news:', newsRes.error.message);
    if (newsRes.data && newsRes.data.length) {
      const mapped = newsRes.data.map((r) => ({
        id: r.id, bizId: r.biz_id, type: r.type || 'daily', signal: !!r.signal,
        time: hbTimeAgo(r.created_at), title: r.title, body: r.body || '',
        image: r.image ? '소식 이미지' : null,
      }));
      hbReplaceArray(window.NEWS, mapped);
      if (window.IMG && window.IMG.news) newsRes.data.forEach((r) => { if (r.image) window.IMG.news[r.id] = r.image; });
    }

    // ── 업체 가이드 (biz_id로 묶음) ──
    if (guidesRes.error) console.warn('[supabase] guides:', guidesRes.error.message);
    if (guidesRes.data && guidesRes.data.length && window.GUIDES) {
      Object.keys(window.GUIDES).forEach((k) => { delete window.GUIDES[k]; });
      guidesRes.data.forEach((r) => {
        if (!window.GUIDES[r.biz_id]) window.GUIDES[r.biz_id] = [];
        window.GUIDES[r.biz_id].push({ id: r.id, emoji: r.emoji || '📄', title: r.title, summary: r.summary || '', read: r.read_time || '2분' });
      });
    }

    // ── 할인 쿠폰 ──
    if (couponsRes.error) console.warn('[supabase] coupons:', couponsRes.error.message);
    if (couponsRes.data && couponsRes.data.length) {
      const mapped = couponsRes.data.map((r) => ({
        id: r.id, bizId: r.biz_id, title: r.title, tag: r.tag || '',
        code: r.code || '', expire: r.expire || '', highlight: !!r.highlight,
      }));
      hbReplaceArray(window.COUPONS, mapped);
    }

    // ── 정합성 보정: 존재하지 않는 업체를 참조하는 소식/쿠폰/가이드 제거 (화면 깨짐 방지) ──
    if (window.BUSINESSES && window.BUSINESSES.length) {
      const ids = new Set(window.BUSINESSES.map((b) => b.id));
      if (window.NEWS) hbReplaceArray(window.NEWS, window.NEWS.filter((n) => ids.has(n.bizId)));
      if (window.COUPONS) hbReplaceArray(window.COUPONS, window.COUPONS.filter((c) => ids.has(c.bizId)));
      if (window.GUIDES) Object.keys(window.GUIDES).forEach((k) => { if (!ids.has(k)) delete window.GUIDES[k]; });
      // 팔로우 목록 / 글 태그 / 저장된 팔로우(localStorage)도 사라진 업체 참조를 정리
      if (window.ME && Array.isArray(window.ME.following)) window.ME.following = window.ME.following.filter((id) => ids.has(id));
      if (window.POSTS) window.POSTS.forEach((p) => { if (Array.isArray(p.tags)) p.tags = p.tags.filter((t) => ids.has(t)); });
      try {
        const saved = JSON.parse(localStorage.getItem('hb_follow') || 'null');
        if (Array.isArray(saved)) localStorage.setItem('hb_follow', JSON.stringify(saved.filter((id) => ids.has(id))));
      } catch (e) { /* noop */ }
    }

    console.info('[supabase] 콘텐츠 로드 완료 · posts:', (postsRes.data || []).length, 'groups:', (groupsRes.data || []).length, 'biz:', (bizRes.data || []).length, 'news:', (newsRes.data || []).length, 'guides:', (guidesRes.data || []).length, 'coupons:', (couponsRes.data || []).length);
  } catch (e) {
    console.warn('[supabase] 로드 실패 — 데모 데이터로 표시합니다.', e);
  }
}

// app.js가 이 Promise를 기다린 뒤 렌더합니다.

// ── 인증 (이메일 매직링크 + 카카오 OAuth) ─────────────────────
const hbAuthCleanRedirect = () => location.href.split('#')[0].split('?')[0];
window.hbAuth = {
  user: null,
  profile: null,
  ready: false,
  isLoggedIn() { return !!window.hbAuth.user; },
  displayName() {
    const a = window.hbAuth;
    return (a.profile && a.profile.name) || (a.user && a.user.email ? a.user.email.split('@')[0] : '게스트');
  },
  async loginEmail(email) {
    if (!hbSb) return { error: { message: '서버에 연결되어 있지 않아요' } };
    return hbSb.auth.signInWithOtp({ email: (email || '').trim(), options: { emailRedirectTo: hbAuthCleanRedirect() } });
  },
  async verifyEmailCode(email, token) {
    if (!hbSb) return { error: { message: '서버에 연결되어 있지 않아요' } };
    return hbSb.auth.verifyOtp({ email: (email || '').trim(), token: (token || '').trim(), type: 'email' });
  },
  async loginKakao() {
    if (!hbSb) return { error: { message: '서버에 연결되어 있지 않아요' } };
    // 카카오 이메일(account_email)은 비즈앱 검수 전 요청 불가 → 닉네임·프로필사진만 요청
    return hbSb.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: hbAuthCleanRedirect(), scopes: 'profile_nickname profile_image' },
    });
  },
  async logout() { if (hbSb) await hbSb.auth.signOut(); location.reload(); },
  needsOnboarding() {
    const a = window.hbAuth;
    return a.isLoggedIn() && a.profile && !a.profile.onboarded;
  },
  async saveProfile(fields) {
    if (!hbSb || !window.hbAuth.user) return { error: { message: '로그인이 필요해요' } };
    const res = await hbSb.from('profiles').update({ ...fields, onboarded: true })
      .eq('id', window.hbAuth.user.id).select('*').maybeSingle();
    if (!res.error && res.data) { window.hbAuth.profile = res.data; hbApplyUserToME(res.data, window.hbAuth.user); }
    return res;
  },
};

async function hbFetchOrCreateProfile(user) {
  if (!hbSb || !user) return null;
  const sel = await hbSb.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (sel.error) { console.warn('[auth] profile:', sel.error.message); return null; }
  if (sel.data) return sel.data;
  // 첫 로그인 → 프로필 생성
  const meta = user.user_metadata || {};
  const name = meta.name || meta.full_name || meta.nickname || (user.email ? user.email.split('@')[0] : '회원');
  const ins = await hbSb.from('profiles').insert({ id: user.id, name }).select('*').maybeSingle();
  if (ins.error) { console.warn('[auth] profile insert:', ins.error.message); return { id: user.id, name }; }
  return ins.data;
}

function hbApplyUserToME(profile, user) {
  if (!window.ME) return;
  if (profile && user) {
    window.ME.id = user.id;
    window.ME.name = profile.name || window.ME.name;
    window.ME.handle = user.email ? '@' + user.email.split('@')[0] : window.ME.handle;
    if (profile.wedding_date) window.ME.weddingDate = profile.wedding_date;
    if (profile.stage) window.ME.stage = profile.stage;
    if (Array.isArray(profile.fav_topics) && profile.fav_topics.length) window.ME.favTopics = profile.fav_topics;
    if (typeof profile.xp === 'number') window.ME.xp = profile.xp;
    window.ME.isGuest = false;
  } else {
    window.ME.isGuest = true;
  }
}

async function hbBootstrapAuth() {
  if (!hbSb) { if (window.ME) window.ME.isGuest = true; return; }
  try {
    const { data } = await hbSb.auth.getSession();
    const user = data && data.session ? data.session.user : null;
    window.hbAuth.user = user;
    if (user) {
      window.hbAuth.profile = await hbFetchOrCreateProfile(user);
      hbApplyUserToME(window.hbAuth.profile, user);
    } else if (window.ME) {
      window.ME.isGuest = true;
    }
  } catch (e) {
    console.warn('[auth] 세션 부트스트랩 실패', e);
    if (window.ME) window.ME.isGuest = true;
  }
  window.hbAuth.ready = true;
}

// 콘텐츠 + 인증 둘 다 준비된 뒤 렌더
window.__hbReady = Promise.all([hbLoadContent(), hbBootstrapAuth()]);
