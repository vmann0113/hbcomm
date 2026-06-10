// ── 한빔커뮤니티 · 광장(Plaza) + 글 상세 (web) ──────────────
const {
  useState: uP
} = React;
const TYPE_FILTERS = [{
  key: 'all',
  label: '전체'
}, {
  key: 'review',
  label: '후기'
}, {
  key: 'question',
  label: '질문'
}, {
  key: 'info',
  label: '정보'
}];
function PlazaScreen({
  app
}) {
  const [topic, setTopic] = uP('wedding');
  const [tf, setTf] = uP('all');
  const all = app.posts.filter(p => p.topic === topic);
  const feat = (FEATURED[topic] || []).map(id => app.posts.find(p => p.id === id)).filter(Boolean);
  const list = all.filter(p => tf === 'all' || p.type === tf);
  const bestReview = all.filter(p => p.type === 'review').slice().sort((a, b) => b.likes - a.likes)[0];
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap page-pad screen-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-h1"
  }, "\uAD11\uC7A5"), /*#__PURE__*/React.createElement("div", {
    className: "page-sub"
  }, "\uAD11\uACE0 \uC5C6\uB294 \uAE68\uB057\uD55C \uC815\uBCF4. \uC5C5\uCCB4\uC640\uC758 \uC5F0\uACB0\uC740 \uC624\uC9C1 \u2018\uD0DC\uADF8\u2019\uB85C\uB9CC.")), /*#__PURE__*/React.createElement("button", {
    className: "review-reward",
    onClick: app.openCompose
  }, /*#__PURE__*/React.createElement("span", {
    className: "rr-emoji bob"
  }, "\uD83C\uDF81"), /*#__PURE__*/React.createElement("div", {
    className: "rr-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rr-title"
  }, "\uD6C4\uAE30\uB97C \uB0A8\uAE30\uBA74 ", /*#__PURE__*/React.createElement("b", null, "\uC2A4\uD0EC\uD504 + \uD55C\uBE54\uD55C\uBCF5 \uCD94\uAC00 \uD560\uC778")), /*#__PURE__*/React.createElement("div", {
    className: "rr-sub"
  }, "\uB0B4 \uACBD\uD5D8\uC774 \uB204\uAD70\uAC00\uC758 \uC900\uBE44\uB97C \uB3C4\uC640\uC694 \xB7 \uAD11\uACE0 \uC544\uB2CC \uC9C4\uC9DC \uD6C4\uAE30")), /*#__PURE__*/React.createElement("span", {
    className: "rr-cta"
  }, "\uD6C4\uAE30 \uC4F0\uAE30 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "topictabs",
    style: {
      marginBottom: 6
    }
  }, TOPICS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.key,
    className: `topictab ${topic === t.key ? 'active' : ''}`,
    onClick: () => setTopic(t.key)
  }, t.label))), bestReview && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "section-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "\uD83C\uDFC6 \uC774\uBC88 \uC8FC \uBCA0\uC2A4\uD2B8 \uD6C4\uAE30"), /*#__PURE__*/React.createElement("span", {
    className: "section-cap"
  }, "\uAC00\uC7A5 \uB9CE\uC774 \uACF5\uAC10\uBC1B\uC740 \uAE00")), /*#__PURE__*/React.createElement("button", {
    className: "best-review",
    onClick: () => app.openPost(bestReview.id)
  }, /*#__PURE__*/React.createElement(Ph, {
    label: bestReview.thumb,
    topic: bestReview.topic,
    src: IMG.post[bestReview.id] && imgUrl(IMG.post[bestReview.id], 300),
    className: "br-thumb"
  }), /*#__PURE__*/React.createElement("div", {
    className: "br-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "br-tag"
  }, "\uD83D\uDC51 BEST \xB7 ", topicOf(bestReview.topic).label), /*#__PURE__*/React.createElement("div", {
    className: "br-title"
  }, bestReview.title), /*#__PURE__*/React.createElement("div", {
    className: "br-ex"
  }, bestReview.excerpt), /*#__PURE__*/React.createElement("div", {
    className: "br-foot"
  }, bestReview.author, " \xB7 \u2665 ", bestReview.likes, " \xB7 \uD83D\uDCAC ", bestReview.comments)))), /*#__PURE__*/React.createElement("div", {
    className: "section-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "spark",
    size: 17,
    style: {
      color: 'var(--persimmon)'
    }
  }), " \uC624\uB298\uC758 \uCD94\uCC9C"), /*#__PURE__*/React.createElement("span", {
    className: "section-cap"
  }, "\uC6B4\uC601\uC9C4 \uD050\uB808\uC774\uC158")), /*#__PURE__*/React.createElement("div", {
    className: "feat-grid"
  }, feat.map(p => /*#__PURE__*/React.createElement(FeaturedCard, {
    key: p.id,
    post: p,
    onOpen: () => app.openPost(p.id)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "section-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, topicOf(topic).label, " \uAC8C\uC2DC\uD310"), /*#__PURE__*/React.createElement("span", {
    className: "section-cap"
  }, all.length, "\uAC1C\uC758 \uAE00")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 14,
      flexWrap: 'wrap'
    }
  }, TYPE_FILTERS.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.key,
    onClick: () => setTf(f.key),
    className: "filter-chip",
    "data-on": tf === f.key
  }, f.label))), /*#__PURE__*/React.createElement("div", {
    className: "board"
  }, list.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "faint",
    style: {
      padding: '34px 18px',
      textAlign: 'center',
      fontSize: 14
    }
  }, "\uC544\uC9C1 \uC774 \uBD84\uB958\uC758 \uAE00\uC774 \uC5C6\uC5B4\uC694."), list.map(p => /*#__PURE__*/React.createElement(PostRow, {
    key: p.id,
    post: p,
    onOpen: () => app.openPost(p.id)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "board-note"
  }, "\uC5C5\uCCB4 \uD64D\uBCF4\uAE00\uC740 \uBCF8\uBB38\uC5D0 \uC62C\uB77C\uC624\uC9C0 \uC54A\uC544\uC694 \xB7 \uC5F0\uACB0\uC740 ", /*#__PURE__*/React.createElement("b", null, "\uD0DC\uADF8"), "\uB85C\uB9CC \uC774\uB8E8\uC5B4\uC838 \uC815\uBCF4\uC758 \uCCAD\uACB0\uC744 \uC720\uC9C0\uD574\uC694."));
}

// ── 글 상세 (태그 다리 포함) ────────────────────────────────
function PostDetail({
  app,
  postId
}) {
  const post = app.posts.find(p => p.id === postId);
  const [cmt, setCmt] = uP('');
  const [localComments, setLocal] = uP(() => commentsOf(postId));
  if (!post) return null;
  const liked = app.liked.has(postId);
  const scrapped = app.scraps.has(postId);
  const taggedBiz = post.tags.map(bizById).filter(Boolean);
  const submit = () => {
    if (!cmt.trim()) return;
    setLocal([...localComments, {
      user: ME.name,
      time: '방금',
      body: cmt.trim()
    }]);
    setCmt('');
    app.toast('댓글을 남겼어요');
  };
  const renderBody = text => text.split(/(#[^\s#]+)/g).map((seg, i) => {
    if (seg.startsWith('#')) {
      const biz = BUSINESSES.find(b => b.name.replace(/\s/g, '') === seg.slice(1));
      if (biz) return /*#__PURE__*/React.createElement("button", {
        key: i,
        className: "inline-tag",
        onClick: () => app.openBiz(biz.id)
      }, "#", biz.name);
    }
    return /*#__PURE__*/React.createElement("span", {
      key: i
    }, seg);
  });
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
  }), " ", topicOf(post.topic).label, " \uAC8C\uC2DC\uD310")), /*#__PURE__*/React.createElement("article", {
    className: "article"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-row-meta",
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(TypeTag, {
    type: post.type
  }), /*#__PURE__*/React.createElement(TopicChip, {
    topic: post.topic
  })), /*#__PURE__*/React.createElement("h1", {
    className: "detail-title"
  }, post.title), /*#__PURE__*/React.createElement("div", {
    className: "detail-author"
  }, /*#__PURE__*/React.createElement(Ph, {
    topic: post.topic,
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      fontWeight: 800,
      fontSize: 14,
      color: `var(--t-${topicOf(post.topic).cls})`
    }
  }, post.author[0])), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, post.author), /*#__PURE__*/React.createElement("div", {
    className: "faint",
    style: {
      fontSize: 12.5
    }
  }, post.time))), post.thumb && /*#__PURE__*/React.createElement(Ph, {
    label: post.thumb,
    topic: post.topic,
    src: IMG.post[post.id] && imgUrl(IMG.post[post.id], 800),
    style: {
      width: '100%',
      height: 260,
      borderRadius: 14,
      margin: '4px 0 18px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "detail-body"
  }, renderBody(post.body)), taggedBiz.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "tagbridge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tagbridge-head"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "tag",
    size: 14,
    stroke: 2
  }), " \uC774 \uAE00\uC5D0 \uD0DC\uADF8\uB41C \uC785\uC810 \uC5C5\uCCB4"), taggedBiz.map(biz => /*#__PURE__*/React.createElement("button", {
    key: biz.id,
    className: "tagbridge-card",
    onClick: () => app.openBiz(biz.id)
  }, /*#__PURE__*/React.createElement(BizLogo, {
    biz: biz,
    size: 46
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tb-name"
  }, biz.name), /*#__PURE__*/React.createElement("div", {
    className: "tb-intro"
  }, biz.intro)), /*#__PURE__*/React.createElement("div", {
    className: "tb-go"
  }, "\uBBF8\uB2C8\uD648 ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 15,
    stroke: 2.4
  })))), /*#__PURE__*/React.createElement("div", {
    className: "tagbridge-note"
  }, "\uAD11\uACE0\uAC00 \uC544\uB2C8\uB77C, \uAE00\uC4F4\uC774\uAC00 \uC2E4\uC81C\uB85C \uC774\uC6A9\uD55C \uC5C5\uCCB4\uC608\uC694.")), /*#__PURE__*/React.createElement("div", {
    className: "detail-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: `act ${liked ? 'on' : ''}`,
    onClick: () => app.toggleLike(postId)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 19,
    fill: liked
  }), " ", post.likes + (liked ? 1 : 0)), /*#__PURE__*/React.createElement("button", {
    className: "act"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 19
  }), " ", localComments.length), /*#__PURE__*/React.createElement("button", {
    className: `act ${scrapped ? 'on' : ''}`,
    onClick: () => {
      app.toggleScrap(postId);
      app.toast(scrapped ? '스크랩을 해제했어요' : '스크랩했어요');
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "scrap",
    size: 19,
    fill: scrapped
  }), " \uC2A4\uD06C\uB7A9"))), /*#__PURE__*/React.createElement("div", {
    className: "article",
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cmt-count"
  }, "\uB313\uAE00 ", localComments.length), localComments.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cmt-item fade-in"
  }, /*#__PURE__*/React.createElement(Ph, {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      fontWeight: 800,
      fontSize: 13,
      color: 'var(--ink-soft)'
    }
  }, c.user[0])), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cmt-meta"
  }, /*#__PURE__*/React.createElement("b", null, c.user), " ", /*#__PURE__*/React.createElement("span", {
    className: "faint"
  }, c.time)), /*#__PURE__*/React.createElement("div", {
    className: "cmt-body"
  }, c.body)))), localComments.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "faint",
    style: {
      padding: '10px 0',
      fontSize: 13.5
    }
  }, "\uCCAB \uB313\uAE00\uC744 \uB0A8\uACA8\uBCF4\uC138\uC694."), /*#__PURE__*/React.createElement("div", {
    className: "cmt-bar"
  }, /*#__PURE__*/React.createElement("input", {
    className: "cmt-input",
    placeholder: "\uB530\uB73B\uD55C \uB313\uAE00\uC744 \uB0A8\uACA8\uC8FC\uC138\uC694",
    value: cmt,
    onChange: e => setCmt(e.target.value),
    onKeyDown: e => e.key === 'Enter' && submit()
  }), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    style: {
      color: 'var(--persimmon)'
    },
    onClick: submit
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 21
  })))));
}
Object.assign(window, {
  PlazaScreen,
  PostDetail
});