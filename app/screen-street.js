// ── 한빔커뮤니티 · 미니홈 거리(Street) + 개별 미니홈 (web) ───
const {
  useState: uS
} = React;
const STREET_FILTERS = [{
  key: 'all',
  label: '전체'
}, ...TOPICS];
function StreetScreen({
  app
}) {
  const [topic, setTopic] = uS('all');
  const biz = topic === 'all' ? BUSINESSES : BUSINESSES.filter(b => b.topic === topic);
  const signals = signalNews().filter(n => topic === 'all' || bizById(n.bizId).topic === topic).map(n => ({
    biz: bizById(n.bizId),
    news: n
  }));
  const seen = new Set();
  const signalItems = signals.filter(s => !seen.has(s.biz.id) && seen.add(s.biz.id));
  const signalBizIds = new Set(signalItems.map(s => s.biz.id));
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap page-pad screen-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-h1"
  }, "\uBBF8\uB2C8\uD648 \uAC70\uB9AC"), /*#__PURE__*/React.createElement("div", {
    className: "page-sub"
  }, "\uC5C5\uCCB4\uB4E4\uC758 \uBBF8\uB2C8\uD648. \uC608\uC57D\xB7\uAD6C\uB9E4\uB294 \uAC01 \uC5C5\uCCB4 \uACF5\uC2DD \uC0AC\uC774\uD2B8\uC5D0\uC11C.")), /*#__PURE__*/React.createElement("button", {
    className: "ad-slot banner",
    onClick: () => app.toast('광고 영역 · 상단 배너')
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-tag"
  }, "AD"), /*#__PURE__*/React.createElement("span", {
    className: "ad-text"
  }, "\uC0C1\uB2E8 \uBC30\uB108 \uAD11\uACE0 \xB7 970 \xD7 90")), /*#__PURE__*/React.createElement("div", {
    className: "topictabs",
    style: {
      marginBottom: 6
    }
  }, STREET_FILTERS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.key,
    className: `topictab ${topic === t.key ? 'active' : ''}`,
    onClick: () => setTopic(t.key)
  }, t.label))), /*#__PURE__*/React.createElement("div", {
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
  })), " \uBD88 \uCF1C\uC9C4 \uC5C5\uCCB4"), /*#__PURE__*/React.createElement("span", {
    className: "section-cap"
  }, "\uC0C8 \uC18C\uC2DD")), /*#__PURE__*/React.createElement(SignalRail, {
    items: signalItems,
    onOpen: b => app.openBiz(b.id),
    emptyText: "\uC9C0\uAE08\uC740 \uC0C8 \uC18C\uC2DD\uC774 \uC5C6\uC5B4\uC694."
  }), /*#__PURE__*/React.createElement("div", {
    className: "section-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "\uC804\uCCB4 \uC5C5\uCCB4"), /*#__PURE__*/React.createElement("span", {
    className: "section-cap"
  }, biz.length, "\uAC1C \uC5C5\uCCB4")), /*#__PURE__*/React.createElement("div", {
    className: "biz-grid"
  }, biz.map(b => /*#__PURE__*/React.createElement(BizCard, {
    key: b.id,
    biz: b,
    hasSignal: signalBizIds.has(b.id),
    following: app.following.has(b.id),
    onOpen: () => app.openBiz(b.id)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "board-note"
  }, "\uC18C\uC2DD \uC5C6\uB294 \uC5C5\uCCB4\uB3C4 \uD56D\uC0C1 \uAC70\uB9AC\uC5D0 \uC788\uC5B4\uC694. \uC2E0\uD638\uCE35\uC5D4 \uBD88 \uCF1C\uC9C4 \uACF3\uB9CC, \uADF8\uB9AC\uB4DC\uC5D4 \uC804\uCCB4\uAC00 \uB178\uCD9C\uB3FC\uC694."), /*#__PURE__*/React.createElement(StreetComingSoon, {
    app: app
  }));
}

// ── 개별 미니홈 ─────────────────────────────────────────────
function MiniHome({
  app,
  bizId
}) {
  const biz = bizById(bizId);
  const [tab, setTab] = uS('news');
  if (!biz) return null;
  const following = app.following.has(bizId);
  const news = newsOf(bizId).slice().sort((a, b) => (b.signal ? 1 : 0) - (a.signal ? 1 : 0));
  const reviews = postsTagging(bizId);
  const guides = guidesOf(bizId);
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap-narrow page-pad push-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-back"
  }, /*#__PURE__*/React.createElement("button", {
    className: "back-link",
    onClick: app.back
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 18
  }), " \uBBF8\uB2C8\uD648 \uAC70\uB9AC")), /*#__PURE__*/React.createElement("div", {
    className: "mh-card"
  }, /*#__PURE__*/React.createElement(Ph, {
    label: biz.cover,
    topic: biz.topic,
    className: "mh-cover",
    src: IMG.biz[biz.id] && imgUrl(IMG.biz[biz.id], 900)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mh-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh-logo"
  }, /*#__PURE__*/React.createElement(BizLogo, {
    biz: biz,
    size: 80
  })), /*#__PURE__*/React.createElement("div", {
    className: "mh-name"
  }, biz.name), /*#__PURE__*/React.createElement("div", {
    className: "mh-meta"
  }, /*#__PURE__*/React.createElement(TopicChip, {
    topic: biz.topic
  }), /*#__PURE__*/React.createElement("span", {
    className: "faint",
    style: {
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "people",
    size: 14,
    stroke: 2,
    style: {
      verticalAlign: '-2px'
    }
  }), " \uD314\uB85C\uC6CC ", (biz.followers + (following ? 1 : 0)).toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "mh-intro"
  }, biz.intro), /*#__PURE__*/React.createElement("div", {
    className: "mh-actions"
  }, /*#__PURE__*/React.createElement(FollowBtn, {
    following: following,
    onToggle: () => {
      app.toggleFollow(bizId);
      app.toast(following ? '팔로우를 해제했어요' : `${biz.name} 팔로우`);
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost mh-official",
    disabled: !biz.official,
    onClick: () => {
      if (!biz.official) {
        app.toast('공식 사이트가 등록되지 않았어요');
        return;
      }
      const url = /^https?:\/\//.test(biz.official) ? biz.official : `https://${biz.official}`;
      window.open(url, '_blank', 'noopener');
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link",
    size: 16,
    stroke: 2
  }), " \uACF5\uC2DD \uC0AC\uC774\uD2B8 \uAC00\uAE30")), /*#__PURE__*/React.createElement("div", {
    className: "mh-extlink"
  }, "\uC608\uC57D\xB7\uAD6C\uB9E4\uB294 ", /*#__PURE__*/React.createElement("b", null, biz.official), " \uC5D0\uC11C \uC9C4\uD589\uB3FC\uC694")), /*#__PURE__*/React.createElement("div", {
    className: "mh-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: `mh-tab ${tab === 'news' ? 'active' : ''}`,
    onClick: () => setTab('news')
  }, "\uC18C\uC2DD ", /*#__PURE__*/React.createElement("span", {
    className: "cnt"
  }, news.length)), guides.length > 0 && /*#__PURE__*/React.createElement("button", {
    className: `mh-tab ${tab === 'guide' ? 'active' : ''}`,
    onClick: () => setTab('guide')
  }, "\uAC00\uC774\uB4DC ", /*#__PURE__*/React.createElement("span", {
    className: "cnt"
  }, guides.length)), /*#__PURE__*/React.createElement("button", {
    className: `mh-tab ${tab === 'reviews' ? 'active' : ''}`,
    onClick: () => setTab('reviews')
  }, "\uD0DC\uADF8\uB41C \uD6C4\uAE30 ", /*#__PURE__*/React.createElement("span", {
    className: "cnt"
  }, reviews.length))), tab === 'news' ? /*#__PURE__*/React.createElement("div", {
    className: "mh-feed"
  }, news.map(n => /*#__PURE__*/React.createElement(NewsCard, {
    key: n.id,
    news: n,
    biz: biz
  }))) : tab === 'guide' ? /*#__PURE__*/React.createElement("div", {
    className: "mh-feed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh-review-note"
  }, "\uD55C\uBE54\uD55C\uBCF5\uC774 \uC9C1\uC811 \uC815\uB9AC\uD55C ", /*#__PURE__*/React.createElement("b", null, "\uC900\uBE44 \uAC00\uC774\uB4DC"), "\uC608\uC694. \uAC00\uC785\uD558\uBA74 \uBAA8\uB450 \uBCFC \uC218 \uC788\uC5B4\uC694."), guides.map(g => /*#__PURE__*/React.createElement("button", {
    key: g.id,
    className: "guide-card pop",
    onClick: () => app.toast(`‘${g.title}’ 가이드 열기 (준비 중)`)
  }, /*#__PURE__*/React.createElement("span", {
    className: "guide-emoji"
  }, g.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "guide-title"
  }, g.title), /*#__PURE__*/React.createElement("div", {
    className: "guide-summary"
  }, g.summary), /*#__PURE__*/React.createElement("div", {
    className: "guide-read"
  }, "\uD83D\uDCD6 ", g.read, " \uC77D\uAE30"))))) : /*#__PURE__*/React.createElement("div", {
    className: "mh-feed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh-review-note"
  }, "\uAD11\uC7A5\uC5D0\uC11C \uC774 \uC5C5\uCCB4\uB97C \uD0DC\uADF8\uD55C ", /*#__PURE__*/React.createElement("b", null, "\uC2E4\uC81C \uC0AC\uC6A9\uC790 \uD6C4\uAE30"), "\uC608\uC694. (\uD0DC\uADF8 \uB2E4\uB9AC\uC758 \uC5ED\uBC29\uD5A5)"), reviews.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "faint",
    style: {
      padding: '24px 0',
      textAlign: 'center',
      fontSize: 13.5
    }
  }, "\uC544\uC9C1 \uD0DC\uADF8\uB41C \uD6C4\uAE30\uAC00 \uC5C6\uC5B4\uC694."), reviews.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: "board"
  }, /*#__PURE__*/React.createElement(PostRow, {
    post: p,
    showTopic: true,
    onOpen: () => app.openPost(p.id)
  }))))));
}
Object.assign(window, {
  StreetScreen,
  MiniHome
});