// ── 한빔커뮤니티 · feed cards ────────────────────────────────
const {
  useState: useS2
} = React;

// ── 광장 일반 게시판: 썸네일 리스트 row ──────────────────────
function PostRow({
  post,
  onOpen,
  showTopic = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "post-row",
    onClick: () => onOpen(post)
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-row-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-row-meta"
  }, /*#__PURE__*/React.createElement(TypeTag, {
    type: post.type
  }), showTopic && /*#__PURE__*/React.createElement(TopicChip, {
    topic: post.topic
  }), post.tags.length > 0 && /*#__PURE__*/React.createElement("span", {
    className: "meta-tag"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "tag",
    size: 12,
    stroke: 2
  }), " ", bizById(post.tags[0]).name)), /*#__PURE__*/React.createElement("div", {
    className: "post-row-title"
  }, post.title), /*#__PURE__*/React.createElement("div", {
    className: "post-row-ex"
  }, post.excerpt), /*#__PURE__*/React.createElement("div", {
    className: "post-row-foot"
  }, /*#__PURE__*/React.createElement("span", null, post.author), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, post.time), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 13,
    stroke: 2
  }), " ", post.likes), /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 13,
    stroke: 2
  }), " ", post.comments))), post.thumb && /*#__PURE__*/React.createElement(Ph, {
    label: post.thumb,
    topic: post.topic,
    src: IMG.post[post.id] && imgUrl(IMG.post[post.id], 220),
    style: {
      width: 84,
      height: 84,
      borderRadius: 12,
      flexShrink: 0
    }
  }));
}

// ── 광장 오늘의 추천: 큰 가로 카드 ───────────────────────────
function FeaturedCard({
  post,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "feat-card",
    onClick: () => onOpen(post)
  }, /*#__PURE__*/React.createElement(Ph, {
    label: post.thumb || '추천 콘텐츠',
    topic: post.topic,
    src: IMG.post[post.id] && imgUrl(IMG.post[post.id], 600),
    style: {
      width: '100%',
      height: 158,
      borderRadius: '16px 16px 0 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "feat-pick"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "spark",
    size: 12
  }), " \uCD94\uCC9C")), /*#__PURE__*/React.createElement("div", {
    className: "feat-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-row-meta"
  }, /*#__PURE__*/React.createElement(TypeTag, {
    type: post.type
  }), post.tags.length > 0 && /*#__PURE__*/React.createElement("span", {
    className: "meta-tag"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "tag",
    size: 12,
    stroke: 2
  }), " ", bizById(post.tags[0]).name)), /*#__PURE__*/React.createElement("div", {
    className: "feat-title"
  }, post.title), /*#__PURE__*/React.createElement("div", {
    className: "feat-foot"
  }, /*#__PURE__*/React.createElement("span", null, post.author), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 13,
    stroke: 2
  }), " ", post.likes), /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 13,
    stroke: 2
  }), " ", post.comments))));
}

// ── 미니홈 거리: 업체 카드 (2열 그리드) ──────────────────────
function BizCard({
  biz,
  hasSignal,
  following,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "biz-card",
    onClick: () => onOpen(biz)
  }, /*#__PURE__*/React.createElement(Ph, {
    label: biz.cover,
    topic: biz.topic,
    src: IMG.biz[biz.id] && imgUrl(IMG.biz[biz.id], 500),
    style: {
      width: '100%',
      height: 104,
      borderRadius: '16px 16px 0 0'
    }
  }, hasSignal && /*#__PURE__*/React.createElement("span", {
    className: "biz-new"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 11,
    fill: true
  }), " NEW")), /*#__PURE__*/React.createElement("div", {
    className: "biz-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "biz-card-head"
  }, /*#__PURE__*/React.createElement(BizLogo, {
    biz: biz,
    size: 34
  }), /*#__PURE__*/React.createElement("div", {
    className: "biz-card-name"
  }, biz.name)), /*#__PURE__*/React.createElement("div", {
    className: "biz-card-intro"
  }, biz.intro), /*#__PURE__*/React.createElement("div", {
    className: "biz-card-foot"
  }, /*#__PURE__*/React.createElement(TopicChip, {
    topic: biz.topic
  }), following && /*#__PURE__*/React.createElement("span", {
    className: "following-pill"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12,
    stroke: 2.5
  }), " \uD314\uB85C\uC789"))));
}

// ── 업체 소식 피드 카드 (미니홈 내부 / 내 공간 통합피드) ─────
function NewsCard({
  news,
  biz,
  compact = false,
  onOpenBiz
}) {
  const signal = news.signal;
  const typeLabel = {
    newproduct: '신제품',
    event: '이벤트',
    daily: '소식'
  }[news.type];
  return /*#__PURE__*/React.createElement("div", {
    className: `news-card ${signal ? 'signal' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-head"
  }, onOpenBiz ? /*#__PURE__*/React.createElement("button", {
    className: "news-biz",
    onClick: () => onOpenBiz(biz)
  }, /*#__PURE__*/React.createElement(BizLogo, {
    biz: biz,
    size: 38,
    ring: signal ? 'on' : 'none'
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "news-biz-name"
  }, biz.name), /*#__PURE__*/React.createElement("div", {
    className: "news-time"
  }, news.time))) : /*#__PURE__*/React.createElement("div", {
    className: "news-biz",
    style: {
      cursor: 'default'
    }
  }, /*#__PURE__*/React.createElement(BizLogo, {
    biz: biz,
    size: 38,
    ring: signal ? 'on' : 'none'
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "news-biz-name"
  }, biz.name), /*#__PURE__*/React.createElement("div", {
    className: "news-time"
  }, news.time))), signal && /*#__PURE__*/React.createElement("span", {
    className: `news-flag ${news.type}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 12,
    fill: true
  }), " ", typeLabel)), /*#__PURE__*/React.createElement("div", {
    className: "news-title"
  }, news.title), /*#__PURE__*/React.createElement("div", {
    className: "news-body"
  }, news.body), news.image && !compact && /*#__PURE__*/React.createElement(Ph, {
    label: news.image,
    topic: biz.topic,
    src: IMG.news[news.id] && imgUrl(IMG.news[news.id], 600),
    style: {
      width: '100%',
      height: 150,
      borderRadius: 12,
      marginTop: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "news-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 15,
    stroke: 1.9
  }), " \uC88B\uC544\uC694"), /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 15,
    stroke: 1.9
  }), " \uB313\uAE00")));
}
Object.assign(window, {
  PostRow,
  FeaturedCard,
  BizCard,
  NewsCard
});