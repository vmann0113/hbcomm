// ── 한빔커뮤니티 · 내 공간 + 알림 + 내 활동 + 글쓰기 (web) ────
const {
  useState: uH
} = React;
function dday(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const now = new Date('2026-06-03T00:00:00');
  return Math.round((d - now) / 86400000);
}

// ── 내 공간 (포털형 홈) ─────────────────────────────────────
const HOT_KEYWORDS = ['스드메 견적', '돌잔치 준비', '제주 한달살이', '상견례 한복', '백일상 대여'];
const SHORTCUTS = [{
  key: 'wedding',
  label: '결혼준비',
  icon: 'heart',
  cls: 'rose',
  act: 'plaza'
}, {
  key: 'check',
  label: '체크리스트',
  icon: 'check',
  cls: 'mint',
  act: 'checklist'
}, {
  key: 'coupon',
  label: '쿠폰함',
  icon: 'tag',
  cls: 'sun',
  act: 'wallet'
}, {
  key: 'street',
  label: '미니홈',
  icon: 'store',
  cls: 'grape',
  act: 'street'
}, {
  key: 'parenting',
  label: '육아',
  icon: 'people',
  cls: 'mint',
  act: 'plaza'
}, {
  key: 'write',
  label: '글쓰기',
  icon: 'pen',
  cls: 'sky',
  act: 'compose'
}, {
  key: 'groups',
  label: '소모임',
  icon: 'people',
  cls: 'rose',
  act: 'groups'
}, {
  key: 'me',
  label: '내 활동',
  icon: 'user',
  cls: 'grape',
  act: 'me'
}];

// ── 라이프 여정 히어로 (내 단계) ─────────────────────────────
function JourneyHero({
  app
}) {
  const dd = dday(ME.weddingDate);
  const cur = stageIdx(ME.stage);
  return /*#__PURE__*/React.createElement("div", {
    className: "journey-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "jh-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "jh-greet"
  }, /*#__PURE__*/React.createElement("div", {
    className: "jh-hi"
  }, "\uC548\uB155\uD558\uC138\uC694, ", /*#__PURE__*/React.createElement("b", null, ME.name), "\uB2D8! ", /*#__PURE__*/React.createElement("span", {
    className: "jh-wave"
  }, "\uD83D\uDC4B")), /*#__PURE__*/React.createElement("div", {
    className: "jh-note"
  }, "\uACB0\uD63C\uAE4C\uC9C0 \uB531 ", dd, "\uC77C \uB0A8\uC558\uC5B4\uC694 \uD83C\uDF38")), dd > 0 && /*#__PURE__*/React.createElement("div", {
    className: "jh-dday"
  }, /*#__PURE__*/React.createElement("div", {
    className: "jh-dday-num"
  }, "D-", dd), /*#__PURE__*/React.createElement("div", {
    className: "jh-dday-lab"
  }, "\uC6B0\uB9AC \uACB0\uD63C\uC2DD"))), /*#__PURE__*/React.createElement("div", {
    className: "jh-track no-sb"
  }, STAGES.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    className: `jh-stage ${i === cur ? 'now' : ''} ${i < cur ? 'done' : ''}`,
    onClick: () => s.topic ? app.switchTab('plaza') : app.toast(`‘${s.label}’ 단계 정보는 준비 중이에요`)
  }, i === cur && /*#__PURE__*/React.createElement("div", {
    className: "jh-bubble"
  }, "\uC9C0\uAE08 \uC5EC\uAE30!"), /*#__PURE__*/React.createElement("span", {
    className: `jh-node ${s.cls}`
  }, s.emoji), /*#__PURE__*/React.createElement("span", {
    className: "jh-label"
  }, s.label)))));
}

// ── 레벨 위젯 ────────────────────────────────────────────────
function LevelWidget() {
  const pct = Math.round(ME.xp / ME.xpMax * 100);
  return /*#__PURE__*/React.createElement("div", {
    className: "side-card level-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lv-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lv-badge"
  }, "Lv.", ME.level), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lv-name"
  }, ME.levelName), /*#__PURE__*/React.createElement("div", {
    className: "lv-xp"
  }, ME.xp, " / ", ME.xpMax, " XP"))), /*#__PURE__*/React.createElement("div", {
    className: "lv-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lv-bar-fill",
    style: {
      width: pct + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "lv-note"
  }, "\uB2E4\uC74C \uB808\uBCA8\uAE4C\uC9C0 ", /*#__PURE__*/React.createElement("b", null, ME.xpMax - ME.xp, " XP"), " \uB0A8\uC558\uC5B4\uC694"));
}

// ── 스탬프 수집판 ────────────────────────────────────────────
function StampCard({
  app
}) {
  const got = STAMPS.filter(s => s.got).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "side-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "side-title"
  }, "\uC2A4\uD0EC\uD504 \uC218\uC9D1\uD310 ", /*#__PURE__*/React.createElement("span", {
    className: "faint",
    style: {
      fontWeight: 700
    }
  }, got, "/", STAMPS.length)), /*#__PURE__*/React.createElement("div", {
    className: "stamp-grid"
  }, STAMPS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    className: `stamp ${s.got ? 'got' : 'locked'}`,
    onClick: () => app.toast(s.got ? `‘${s.label}’ 스탬프 획득 완료! 🎉` : `‘${s.label}’ 스탬프는 아직 잠겨 있어요`)
  }, /*#__PURE__*/React.createElement("span", {
    className: "stamp-emoji"
  }, s.got ? s.emoji : '🔒'), /*#__PURE__*/React.createElement("span", {
    className: "stamp-label"
  }, s.label)))));
}

// ── 추천 소모임 ──────────────────────────────────────────────
function GroupWidget({
  app
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, "\uD83C\uDF88 \uCD94\uCC9C \uC18C\uBAA8\uC784"), /*#__PURE__*/React.createElement("span", {
    className: "section-cap link",
    onClick: () => app.switchTab('groups')
  }, "\uC804\uCCB4 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "group-list"
  }, GROUPS.slice(0, 4).map(g => {
    const joined = app.groups.has(g.id);
    return /*#__PURE__*/React.createElement("button", {
      key: g.id,
      className: "group-row",
      onClick: () => app.openGroup(g.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: `group-ic ${g.cls}`
    }, g.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "group-name"
    }, g.name), /*#__PURE__*/React.createElement("div", {
      className: "group-sub"
    }, "\uBA64\uBC84 ", g.members.toLocaleString(), "\uBA85 \xB7 ", g.desc)), /*#__PURE__*/React.createElement("span", {
      className: `group-join ${joined ? 'in' : ''}`,
      onClick: e => {
        e.stopPropagation();
        const was = app.groups.has(g.id);
        app.toggleGroup(g.id);
        app.toast(was ? '모임에서 나왔어요' : `‘${g.name}’ 가입 완료! 🎈`);
      }
    }, joined ? '가입됨' : '+ 가입'));
  })));
}
function HomeScreen({
  app
}) {
  const [q, setQ] = uH('');
  const [rankTopic, setRankTopic] = uH('wedding');
  const signalItems = signalNews().filter(n => app.following.has(n.bizId)).map(n => ({
    biz: bizById(n.bizId),
    news: n
  }));
  const seen = new Set();
  const sigUnique = signalItems.filter(s => !seen.has(s.biz.id) && seen.add(s.biz.id));

  // 통합 피드
  const feedNews = NEWS.filter(n => app.following.has(n.bizId)).map(n => ({
    kind: 'news',
    data: n
  }));
  const feedPosts = app.posts.filter(p => ME.favTopics.includes(p.topic)).map(p => ({
    kind: 'post',
    data: p
  }));
  const mixed = [];
  for (let i = 0; i < Math.max(feedNews.length, feedPosts.length); i++) {
    if (feedPosts[i]) mixed.push(feedPosts[i]);
    if (feedNews[i]) mixed.push(feedNews[i]);
  }

  // 광장 인기글 랭킹
  const ranked = app.posts.filter(p => p.topic === rankTopic).slice().sort((a, b) => b.likes - a.likes).slice(0, 5);
  // 미니홈 새 소식 (불 켜진 곳)
  const sigAll = [];
  const s2 = new Set();
  signalNews().forEach(n => {
    if (!s2.has(n.bizId)) {
      s2.add(n.bizId);
      sigAll.push(n);
    }
  });
  const dd = dday(ME.weddingDate);
  const followingBiz = BUSINESSES.filter(b => app.following.has(b.id));
  const doSearch = () => app.toast(q.trim() ? `‘${q.trim()}’ 검색 (준비 중)` : '검색어를 입력해보세요');
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap page-pad screen-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-row"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "ad-side"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ad-slot tall",
    onClick: () => app.toast('광고 영역 · 입점 업체 노출 자리')
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-tag"
  }, "AD"), /*#__PURE__*/React.createElement("span", {
    className: "ad-text"
  }, "\uAD11\uACE0"))), /*#__PURE__*/React.createElement("section", {
    className: "portal-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-big"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 22,
    stroke: 2,
    style: {
      color: 'var(--grape)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "\uACB0\uD63C\uC900\uBE44 \xB7 \uC721\uC544 \xB7 \uC5EC\uD589 \uC815\uBCF4\uB97C \uAC80\uC0C9\uD574\uBCF4\uC138\uC694",
    value: q,
    onChange: e => setQ(e.target.value),
    onKeyDown: e => e.key === 'Enter' && doSearch()
  }), /*#__PURE__*/React.createElement("button", {
    className: "search-go",
    onClick: doSearch
  }, "\uAC80\uC0C9")), /*#__PURE__*/React.createElement("div", {
    className: "hot-keywords"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hot-label"
  }, "\uC778\uAE30"), HOT_KEYWORDS.map((k, i) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "hot-kw",
    onClick: () => {
      setQ(k);
      app.toast(`‘${k}’ 검색 (준비 중)`);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "r"
  }, i + 1), k)))), /*#__PURE__*/React.createElement("aside", {
    className: "ad-side"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ad-slot tall",
    onClick: () => app.toast('광고 영역 · 입점 업체 노출 자리')
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-tag"
  }, "AD"), /*#__PURE__*/React.createElement("span", {
    className: "ad-text"
  }, "\uAD11\uACE0")))), /*#__PURE__*/React.createElement(JourneyHero, {
    app: app
  }), /*#__PURE__*/React.createElement(CouponStrip, {
    app: app
  }), /*#__PURE__*/React.createElement("div", {
    className: "value-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "value-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vi-ic rose"
  }, "\uD83D\uDEAB"), /*#__PURE__*/React.createElement("div", {
    className: "vi-t"
  }, /*#__PURE__*/React.createElement("b", null, "\uAD11\uACE0 \uC5C6\uB294 \uC815\uBCF4"), /*#__PURE__*/React.createElement("span", null, "\uB300\uAC00\uC131 \uD6C4\uAE30 \uAE08\uC9C0 \xB7 \uD0DC\uADF8\uB85C\uB9CC \uC5F0\uACB0"))), /*#__PURE__*/React.createElement("div", {
    className: "value-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vi-ic grape"
  }, "\uD83C\uDFAF"), /*#__PURE__*/React.createElement("div", {
    className: "vi-t"
  }, /*#__PURE__*/React.createElement("b", null, "\uB0B4 \uB2E8\uACC4 \uB9DE\uCDA4"), /*#__PURE__*/React.createElement("span", null, "\uC9C0\uAE08 \uC900\uBE44 \uB2E8\uACC4\uC5D0 \uB9DE\uB294 \uC815\uBCF4\uBD80\uD130"))), /*#__PURE__*/React.createElement("div", {
    className: "value-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vi-ic mint"
  }, "\uD83C\uDF31"), /*#__PURE__*/React.createElement("div", {
    className: "vi-t"
  }, /*#__PURE__*/React.createElement("b", null, "\uC0DD\uC560\uC8FC\uAE30 \uD55C \uACF3"), /*#__PURE__*/React.createElement("span", null, "\uACB0\uD63C \u2192 \uC721\uC544 \u2192 \uAD50\uC721\uAE4C\uC9C0 \uCB49")))), /*#__PURE__*/React.createElement("button", {
    className: "ad-slot leader",
    onClick: () => app.toast('광고 영역 · 가로형 배너 자리')
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-tag"
  }, "AD"), /*#__PURE__*/React.createElement("span", {
    className: "ad-text"
  }, "\uAC00\uB85C\uD615 \uBC30\uB108 \uAD11\uACE0 \xB7 970 \xD7 90")), /*#__PURE__*/React.createElement("div", {
    className: "shortcut-grid"
  }, SHORTCUTS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    className: "shortcut-tile",
    onClick: () => {
      if (s.act === 'compose') app.openCompose();else if (s.act === 'checklist') app.openChecklist();else if (s.act === 'wallet') app.openWallet();else app.switchTab(s.act);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `sc-ic ${s.cls}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 24,
    stroke: 2
  })), /*#__PURE__*/React.createElement("span", {
    className: "sc-label"
  }, s.label)))), /*#__PURE__*/React.createElement("div", {
    className: "cols"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feed-col"
  }, /*#__PURE__*/React.createElement(ChecklistWidget, {
    app: app
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--persimmon)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 18,
    fill: true
  })), "\uC0C8 \uC18C\uC2DD"), /*#__PURE__*/React.createElement("span", {
    className: "section-cap link",
    onClick: () => app.switchTab('street')
  }, "\uBBF8\uB2C8\uD648 \uAC70\uB9AC \u2192")), /*#__PURE__*/React.createElement(SignalRail, {
    items: sigUnique,
    onOpen: b => app.openBiz(b.id),
    emptyText: "\uD314\uB85C\uC6B0\uD55C \uC5C5\uCCB4\uC758 \uC0C8 \uC18C\uC2DD\uC774 \uC5EC\uAE30 \uB5A0\uC694."
  })), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, "\uAD11\uC7A5 \uC778\uAE30\uAE00"), /*#__PURE__*/React.createElement("span", {
    className: "section-cap link",
    onClick: () => app.switchTab('plaza')
  }, "\uAD11\uC7A5 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "rank-tabs"
  }, TOPICS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.key,
    className: `rank-tab ${rankTopic === t.key ? 'active' : ''}`,
    onClick: () => setRankTopic(t.key)
  }, t.label))), /*#__PURE__*/React.createElement("div", null, ranked.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    className: "rank-row",
    onClick: () => app.openPost(p.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: `rank-num ${i < 3 ? 'top' : ''}`
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    className: "rank-title"
  }, p.title), /*#__PURE__*/React.createElement("span", {
    className: "rank-meta"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 12,
    stroke: 2,
    style: {
      verticalAlign: '-1px'
    }
  }), " ", p.comments))))), /*#__PURE__*/React.createElement("div", {
    className: "section-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "\uB0B4 \uD53C\uB4DC"), /*#__PURE__*/React.createElement("span", {
    className: "section-cap"
  }, "\uC5C5\uCCB4 \uC18C\uC2DD + \uAD00\uC2EC \uC8FC\uC81C")), /*#__PURE__*/React.createElement("div", {
    className: "feed-col"
  }, mixed.map((item, idx) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: item.kind + item.data.id
  }, item.kind === 'news' ? /*#__PURE__*/React.createElement(NewsCard, {
    news: item.data,
    biz: bizById(item.data.bizId),
    onOpenBiz: b => app.openBiz(b.id)
  }) : /*#__PURE__*/React.createElement("div", {
    className: "card feed-post"
  }, /*#__PURE__*/React.createElement("div", {
    className: "feed-post-flag"
  }, "\uAD11\uC7A5 \xB7 ", topicOf(item.data.topic).label), /*#__PURE__*/React.createElement(PostRow, {
    post: item.data,
    showTopic: true,
    onOpen: () => app.openPost(item.data.id)
  })), idx === 1 && /*#__PURE__*/React.createElement("button", {
    className: "ad-slot feed",
    onClick: () => app.toast('광고 영역 · 피드 네이티브 광고')
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-tag"
  }, "AD"), /*#__PURE__*/React.createElement("span", {
    className: "ad-text"
  }, "\uD53C\uB4DC \uB124\uC774\uD2F0\uBE0C \uAD11\uACE0 \xB7 \uC2A4\uD3F0\uC11C")))))), /*#__PURE__*/React.createElement("aside", {
    className: "col-side"
  }, /*#__PURE__*/React.createElement(LevelWidget, null), dd > 0 && /*#__PURE__*/React.createElement("div", {
    className: "side-dday"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "D-", dd), /*#__PURE__*/React.createElement("div", {
    className: "lab"
  }, "\uC608\uC2DD\uAE4C\uC9C0")), /*#__PURE__*/React.createElement("div", {
    className: "who"
  }, "\uACB0\uD63C\uC900\uBE44 \uB2E8\uACC4\uC5D0 \uB9DE\uCDB0", /*#__PURE__*/React.createElement("br", null), "\uCD94\uCC9C\uC744 \uBC1B\uACE0 \uC788\uC5B4\uC694")), /*#__PURE__*/React.createElement(GroupWidget, {
    app: app
  }), /*#__PURE__*/React.createElement(StampCard, {
    app: app
  }), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, "\uBBF8\uB2C8\uD648 \uC0C8 \uC18C\uC2DD")), /*#__PURE__*/React.createElement("div", null, sigAll.map(n => {
    const b = bizById(n.bizId);
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      className: "mhnews-row",
      onClick: () => app.openBiz(b.id)
    }, /*#__PURE__*/React.createElement(BizLogo, {
      biz: b,
      size: 36,
      ring: "on"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mhnews-title"
    }, n.title), /*#__PURE__*/React.createElement("div", {
      className: "mhnews-sub"
    }, b.name, " \xB7 ", n.time)));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "side-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "side-title"
  }, "\uD314\uB85C\uC6B0\uD55C \uC5C5\uCCB4 ", /*#__PURE__*/React.createElement("span", {
    className: "faint",
    style: {
      fontWeight: 700
    }
  }, followingBiz.length)), followingBiz.map(b => /*#__PURE__*/React.createElement("button", {
    key: b.id,
    className: "side-follow",
    onClick: () => app.openBiz(b.id)
  }, /*#__PURE__*/React.createElement(BizLogo, {
    biz: b,
    size: 38,
    ring: signalNews().some(n => n.bizId === b.id) ? 'on' : 'none'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sf-name"
  }, b.name), /*#__PURE__*/React.createElement("div", {
    className: "sf-sub"
  }, topicOf(b.topic).label)))), followingBiz.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "faint",
    style: {
      fontSize: 13
    }
  }, "\uC544\uC9C1 \uD314\uB85C\uC6B0\uD55C \uC5C5\uCCB4\uAC00 \uC5C6\uC5B4\uC694.")), /*#__PURE__*/React.createElement("button", {
    className: "ad-slot rect",
    onClick: () => app.toast('광고 영역 · 사이드 배너')
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-tag"
  }, "AD"), /*#__PURE__*/React.createElement("span", {
    className: "ad-text"
  }, "\uC0AC\uC774\uB4DC \uBC30\uB108", /*#__PURE__*/React.createElement("br", null), "300 \xD7 250")))));
}

// ── 알림 ────────────────────────────────────────────────────
function NotiScreen({
  app
}) {
  const today = [{
    icon: 'flame',
    text: '돌사진 얼리버드 예약 오픈',
    sub: '아이담 스튜디오 · 이벤트',
    time: '3시간 전',
    signal: true,
    bizId: 'aidam'
  }, {
    icon: 'flame',
    text: '2026 본식 스냅 신규 패키지 공개',
    sub: '마루스튜디오 · 신제품',
    time: '5시간 전',
    signal: true,
    bizId: 'maru'
  }, {
    icon: 'chat',
    text: '봄날의신부님이 회원님의 글에 댓글을 남겼어요',
    sub: '"스드메 견적 엑셀로…"',
    time: '6시간 전',
    postId: 'p2'
  }];
  const week = [{
    icon: 'flame',
    text: '초여름 한복 렌탈 20% — 6월 한정',
    sub: '한빔한복 · 이벤트',
    time: '어제',
    signal: true,
    bizId: 'hanbeam'
  }, {
    icon: 'heart',
    text: '회원님의 글이 100 좋아요를 받았어요',
    sub: '"스드메 견적 엑셀로…"',
    time: '2일 전',
    postId: 'p2'
  }, {
    icon: 'user',
    text: '관심 주제(여행) 인기글이 올라왔어요',
    sub: '"아이랑 제주 5박 6일…"',
    time: '3일 전',
    postId: 'p6'
  }];
  const Row = (n, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "noti-row",
    onClick: () => {
      if (n.bizId) app.openBiz(n.bizId);else if (n.postId) app.openPost(n.postId);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `noti-ic ${n.signal ? 'sig' : ''}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n.icon,
    size: 18,
    fill: n.icon === 'flame' || n.icon === 'heart'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "noti-text"
  }, n.text), /*#__PURE__*/React.createElement("div", {
    className: "noti-sub"
  }, n.sub, " \xB7 ", n.time)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 16,
    stroke: 2,
    style: {
      color: 'var(--ink-faint)',
      flexShrink: 0
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap-narrow page-pad screen-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-h1"
  }, "\uC54C\uB9BC"), /*#__PURE__*/React.createElement("div", {
    className: "page-sub"
  }, "\uACB0\uC815\uC801 \uC18C\uC2DD\uC740 \uC54C\uB9BC\uC73C\uB85C, \uD3C9\uC18C\uC5D4 \uC870\uC6A9\uD558\uAC8C.")), /*#__PURE__*/React.createElement("div", {
    className: "noti-group"
  }, "\uC624\uB298"), /*#__PURE__*/React.createElement("div", {
    className: "board"
  }, today.map(Row)), /*#__PURE__*/React.createElement("div", {
    className: "noti-group"
  }, "\uC774\uBC88 \uC8FC"), /*#__PURE__*/React.createElement("div", {
    className: "board"
  }, week.map(Row)));
}

// ── 내 활동 (프로필) ────────────────────────────────────────
function ProfileScreen({
  app
}) {
  const dd = dday(ME.weddingDate);
  const followingBiz = BUSINESSES.filter(b => app.following.has(b.id));
  const myPosts = app.posts.filter(p => ME.myPosts.includes(p.id) || p._mine);
  const scrapPosts = app.posts.filter(p => app.scraps.has(p.id));
  const Stat = (n, label) => /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-n"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "stat-l"
  }, label));
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap-narrow page-pad screen-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prof-head"
  }, /*#__PURE__*/React.createElement(Ph, {
    topic: "wedding",
    style: {
      width: 68,
      height: 68,
      borderRadius: '50%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      fontWeight: 800,
      fontSize: 26,
      color: 'var(--t-wed)'
    }
  }, ME.name[0])), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "prof-name"
  }, ME.name), /*#__PURE__*/React.createElement("div", {
    className: "prof-handle"
  }, ME.handle))), dd > 0 && /*#__PURE__*/React.createElement("div", {
    className: "prof-life"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "spark",
    size: 15,
    style: {
      color: 'var(--grape)'
    }
  }), "\uC608\uC2DD ", /*#__PURE__*/React.createElement("b", null, "D-", dd), " \xB7 \uACB0\uD63C\uC900\uBE44 \uB2E8\uACC4\uC5D0 \uB9DE\uCDB0 \uCD94\uCC9C\uC744 \uBC1B\uACE0 \uC788\uC5B4\uC694"), /*#__PURE__*/React.createElement("div", {
    className: "prof-stats"
  }, Stat(followingBiz.length, '팔로잉'), Stat(myPosts.length, '내 글'), Stat(scrapPosts.length, '스크랩')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      margin: '14px 18px 0'
    }
  }, /*#__PURE__*/React.createElement(LevelWidget, null), /*#__PURE__*/React.createElement(StampCard, {
    app: app
  })), /*#__PURE__*/React.createElement("div", {
    className: "section-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "\uD314\uB85C\uC6B0\uD55C \uC5C5\uCCB4")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, followingBiz.map(b => /*#__PURE__*/React.createElement("button", {
    key: b.id,
    className: "follow-row",
    onClick: () => app.openBiz(b.id)
  }, /*#__PURE__*/React.createElement(BizLogo, {
    biz: b,
    size: 44,
    ring: signalNews().some(n => n.bizId === b.id) ? 'on' : 'none'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-name"
  }, b.name), /*#__PURE__*/React.createElement("div", {
    className: "fr-intro"
  }, b.intro)), /*#__PURE__*/React.createElement(FollowBtn, {
    following: true,
    onToggle: () => {
      app.toggleFollow(b.id);
      app.toast('팔로우를 해제했어요');
    },
    size: "sm"
  }))), followingBiz.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "faint",
    style: {
      fontSize: 13.5
    }
  }, "\uC544\uC9C1 \uD314\uB85C\uC6B0\uD55C \uC5C5\uCCB4\uAC00 \uC5C6\uC5B4\uC694.")), /*#__PURE__*/React.createElement("div", {
    className: "section-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "\uC2A4\uD06C\uB7A9")), /*#__PURE__*/React.createElement("div", {
    className: "board"
  }, scrapPosts.map(p => /*#__PURE__*/React.createElement(PostRow, {
    key: p.id,
    post: p,
    showTopic: true,
    onOpen: () => app.openPost(p.id)
  })), scrapPosts.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "faint",
    style: {
      padding: '16px 18px',
      fontSize: 13.5
    }
  }, "\uC2A4\uD06C\uB7A9\uD55C \uAE00\uC774 \uC5C6\uC5B4\uC694.")));
}

// ── 글쓰기 시트 (centered modal) ────────────────────────────
function ComposeSheet({
  app,
  onClose
}) {
  const [topic, setTopic] = uH('wedding');
  const [type, setType] = uH('review');
  const [title, setTitle] = uH('');
  const [body, setBody] = uH('');
  const submit = () => {
    if (!title.trim()) {
      app.toast('제목을 입력해주세요');
      return;
    }
    app.addPost({
      id: 'np' + Date.now(),
      topic,
      type,
      author: ME.name,
      time: '방금',
      title: title.trim(),
      excerpt: (body.trim() || '방금 올린 글이에요').slice(0, 60),
      body: body.trim() || title.trim(),
      thumb: null,
      likes: 0,
      comments: 0,
      scrap: false,
      tags: [],
      _mine: true
    });
    app.toast(type === 'review' ? '후기 등록 완료! +30 XP · 스탬프 획득 🎉' : '글을 등록했어요');
    onClose();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sheet-wrap",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-head"
  }, /*#__PURE__*/React.createElement("button", {
    className: "sheet-x",
    onClick: onClose
  }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement("div", {
    className: "sheet-title"
  }, "\uAE00\uC4F0\uAE30"), /*#__PURE__*/React.createElement("button", {
    className: "sheet-ok",
    onClick: submit
  }, "\uB4F1\uB85D")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, "\uC8FC\uC81C"), /*#__PURE__*/React.createElement("div", {
    className: "topictabs",
    style: {
      marginBottom: 16
    }
  }, TOPICS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.key,
    className: `topictab ${topic === t.key ? 'active' : ''}`,
    onClick: () => setTopic(t.key)
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, "\uBD84\uB958"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 18
    }
  }, [['review', '후기'], ['question', '질문'], ['info', '정보']].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setType(k),
    className: "topictab",
    style: {
      background: type === k ? 'var(--persimmon)' : 'var(--surface)',
      color: type === k ? '#fff' : 'var(--ink-soft)',
      borderColor: type === k ? 'var(--persimmon)' : 'var(--line)'
    }
  }, l))), /*#__PURE__*/React.createElement("input", {
    className: "sheet-input",
    placeholder: "\uC81C\uBAA9",
    value: title,
    onChange: e => setTitle(e.target.value)
  }), /*#__PURE__*/React.createElement("textarea", {
    className: "sheet-textarea",
    placeholder: "\uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694. \uC5C5\uCCB4\uB294 \uBCF8\uBB38\uC5D0 #\uC5C5\uCCB4\uBA85 \uC73C\uB85C \uD0DC\uADF8\uD560 \uC218 \uC788\uC5B4\uC694.",
    value: body,
    onChange: e => setBody(e.target.value),
    rows: 5
  }), /*#__PURE__*/React.createElement("div", {
    className: "sheet-hint"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "tag",
    size: 13,
    stroke: 2
  }), " \uC785\uC810 \uC5C5\uCCB4\uB9CC \uD0DC\uADF8\uB85C \uC5F0\uACB0\uB3FC\uC694. \uB300\uAC00\uC131 \uD6C4\uAE30\uB294 \uAE08\uC9C0\uC608\uC694."))));
}
Object.assign(window, {
  HomeScreen,
  NotiScreen,
  ProfileScreen,
  ComposeSheet,
  JourneyHero,
  LevelWidget,
  StampCard,
  GroupWidget
});