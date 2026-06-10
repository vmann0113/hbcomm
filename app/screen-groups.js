// ── HANBEAM LIFE · 소모임 (목록 + 개별 모임 방) ──────────────
const {
  useState: uG
} = React;
const GROUP_EMOJIS = ['💐', '🍼', '🌴', '🎒', '🍵', '🧺', '🎀', '🐣', '📚', '🏕️', '🎨', '🍰'];
const topicToCls = {
  wedding: 'rose',
  parenting: 'mint',
  travel: 'sky'
};

// ── 모임 만들기 모달 ─────────────────────────────────────────
function CreateGroupModal({
  app,
  onClose
}) {
  const [name, setName] = uG('');
  const [emoji, setEmoji] = uG('💐');
  const [topic, setTopic] = uG('wedding');
  const [desc, setDesc] = uG('');
  const [about, setAbout] = uG('');
  const [busy, setBusy] = uG(false);
  const submit = async () => {
    if (!name.trim()) {
      app.toast('모임 이름을 입력해주세요');
      return;
    }
    if (busy) return;
    if (app.isGuest) {
      onClose();
      app.login();
      app.toast('로그인하고 모임을 만들어요 🎈');
      return;
    }
    setBusy(true);
    const id = 'ug' + Date.now();
    const cls = topicToCls[topic] || 'grape';
    const res = await app.saveGroup({
      id,
      name: name.trim(),
      emoji,
      topic,
      cls,
      desc: desc.trim() || '새로 만든 모임이에요',
      about: about.trim() || `${name.trim()} 모임이에요. 함께 이야기 나눠요!`
    });
    setBusy(false);
    const saved = res && res.data;
    app.addGroup({
      id: saved ? saved.id : id,
      name: name.trim(),
      emoji,
      members: 1,
      cls,
      topic,
      desc: desc.trim() || '새로 만든 모임이에요',
      about: about.trim() || `${name.trim()} 모임이에요. 함께 이야기 나눠요!`,
      notice: '',
      owner: true,
      status: 'pending',
      ownerName: ME.name
    });
    app.toast(res && res.error ? '화면엔 보이지만 저장은 실패했어요' : '모임 신청 완료! 운영자 승인 후 공개돼요 🎉');
    onClose();
    app.openGroup(saved ? saved.id : id);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sheet-wrap",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet",
    onClick: e => e.stopPropagation(),
    style: {
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-head"
  }, /*#__PURE__*/React.createElement("button", {
    className: "sheet-x",
    onClick: onClose
  }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement("div", {
    className: "sheet-title"
  }, "\uBAA8\uC784 \uB9CC\uB4E4\uAE30"), /*#__PURE__*/React.createElement("button", {
    className: "sheet-ok",
    onClick: submit
  }, "\uB9CC\uB4E4\uAE30")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, "\uB300\uD45C \uC774\uBAA8\uC9C0"), /*#__PURE__*/React.createElement("div", {
    className: "emoji-pick"
  }, GROUP_EMOJIS.map(e => /*#__PURE__*/React.createElement("button", {
    key: e,
    className: `emoji-opt ${emoji === e ? 'on' : ''}`,
    onClick: () => setEmoji(e)
  }, e))), /*#__PURE__*/React.createElement("div", {
    className: "field-label",
    style: {
      marginTop: 16
    }
  }, "\uBAA8\uC784 \uC774\uB984"), /*#__PURE__*/React.createElement("input", {
    className: "sheet-input",
    placeholder: "\uC608) \uBD04\uB0A0\uC758 \uC2E0\uBD80 \uBAA8\uC784",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, "\uCE74\uD14C\uACE0\uB9AC"), /*#__PURE__*/React.createElement("div", {
    className: "topictabs",
    style: {
      marginBottom: 14
    }
  }, TOPICS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.key,
    className: `topictab ${topic === t.key ? 'active' : ''}`,
    onClick: () => setTopic(t.key)
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, "\uD55C \uC904 \uC18C\uAC1C"), /*#__PURE__*/React.createElement("input", {
    className: "sheet-input",
    placeholder: "\uBAA8\uC784\uC744 \uD55C \uBB38\uC7A5\uC73C\uB85C",
    value: desc,
    onChange: e => setDesc(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, "\uC18C\uAC1C\uAE00"), /*#__PURE__*/React.createElement("textarea", {
    className: "sheet-textarea",
    rows: 3,
    placeholder: "\uC5B4\uB5A4 \uC0AC\uB78C\uB4E4\uACFC \uBB34\uC5C7\uC744 \uB098\uB204\uB294 \uBAA8\uC784\uC778\uAC00\uC694?",
    value: about,
    onChange: e => setAbout(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "sheet-hint"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "people",
    size: 13,
    stroke: 2
  }), " \uB9CC\uB4E4\uBA74 \uC790\uB3D9\uC73C\uB85C \uAC00\uC785\uB3FC\uC694. \uBAA8\uC784 \uBC29\uC5D0\uC11C \uACF5\uC9C0\xB7\uAE00\uC744 \uB0A8\uAE38 \uC218 \uC788\uC5B4\uC694."))));
}

// ── 소모임 카드 ──────────────────────────────────────────────
function GroupCard({
  group,
  joined,
  onOpen,
  onToggle
}) {
  const pending = group.status === 'pending';
  return /*#__PURE__*/React.createElement("button", {
    className: "group-card pop",
    onClick: onOpen
  }, /*#__PURE__*/React.createElement("span", {
    className: `group-card-ic ${group.cls}`
  }, group.emoji), /*#__PURE__*/React.createElement("div", {
    className: "group-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "group-card-name"
  }, group.name, pending && /*#__PURE__*/React.createElement("span", {
    className: "pending-badge"
  }, "\uC2B9\uC778 \uB300\uAE30")), /*#__PURE__*/React.createElement("div", {
    className: "group-card-desc"
  }, group.desc), /*#__PURE__*/React.createElement("div", {
    className: "group-card-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "group-card-mem"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "people",
    size: 13,
    stroke: 2
  }), " ", group.members.toLocaleString(), "\uBA85"), /*#__PURE__*/React.createElement(TopicChip, {
    topic: group.topic
  }))), pending ? /*#__PURE__*/React.createElement("span", {
    className: "group-join-btn in"
  }, "\uAC80\uD1A0\uC911") : /*#__PURE__*/React.createElement("span", {
    className: `group-join-btn ${joined ? 'in' : ''}`,
    onClick: e => {
      e.stopPropagation();
      onToggle(group.id);
    }
  }, joined ? '✓ 가입됨' : '+ 가입'));
}

// ── 소모임 목록 화면 ─────────────────────────────────────────
const GROUP_TABS = [{
  key: 'mine',
  label: '내 모임'
}, {
  key: 'reco',
  label: '추천'
}, {
  key: 'all',
  label: '둘러보기'
}];
function GroupsScreen({
  app
}) {
  const [tab, setTab] = uG('mine');
  const [cat, setCat] = uG('all');
  const [creating, setCreating] = uG(false);
  const joinedIds = app.groups;
  const mine = GROUPS.filter(g => joinedIds.has(g.id));
  const reco = GROUPS.filter(g => !joinedIds.has(g.id) && g.status !== 'pending' && (ME.favTopics.includes(g.topic) || g.topic === 'wedding'));
  const browse = GROUPS.filter(g => g.status !== 'pending' && (cat === 'all' || g.topic === cat));
  const list = tab === 'mine' ? mine : tab === 'reco' ? reco : browse;
  const open = id => app.openGroup(id);
  const toggle = id => {
    const was = joinedIds.has(id);
    app.toggleGroup(id);
    app.toast(was ? '모임에서 나왔어요' : `‘${groupById(id).name}’ 가입 완료! 🎈`);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap-narrow page-pad screen-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head groups-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "page-h1"
  }, "\uC18C\uBAA8\uC784 \uD83C\uDF88"), /*#__PURE__*/React.createElement("div", {
    className: "page-sub"
  }, "\uAC19\uC740 \uC2DC\uAE30, \uAC19\uC740 \uAD00\uC2EC\uC0AC\uB97C \uAC00\uC9C4 \uC0AC\uB78C\uB4E4\uACFC \uD568\uAED8\uD574\uC694.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary groups-make",
    onClick: () => setCreating(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16,
    stroke: 2.4
  }), " \uBAA8\uC784 \uB9CC\uB4E4\uAE30")), /*#__PURE__*/React.createElement("div", {
    className: "topictabs",
    style: {
      marginBottom: 16
    }
  }, GROUP_TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.key,
    className: `topictab ${tab === t.key ? 'active' : ''}`,
    onClick: () => setTab(t.key)
  }, t.label, t.key === 'mine' && mine.length > 0 ? ` ${mine.length}` : ''))), tab === 'all' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 14,
      flexWrap: 'wrap'
    }
  }, [['all', '전체'], ...TOPICS.map(t => [t.key, t.label])].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "filter-chip",
    "data-on": cat === k,
    onClick: () => setCat(k)
  }, l))), tab === 'mine' && mine.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "group-empty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "group-empty-emoji"
  }, "\uD83E\uDEE7"), /*#__PURE__*/React.createElement("div", {
    className: "group-empty-t"
  }, "\uC544\uC9C1 \uAC00\uC785\uD55C \uBAA8\uC784\uC774 \uC5C6\uC5B4\uC694"), /*#__PURE__*/React.createElement("div", {
    className: "group-empty-s"
  }, "\u2018\uCD94\uCC9C\u2019 \uD0ED\uC5D0\uC11C \uCC3E\uC544\uBCF4\uAC70\uB098, \uC9C1\uC811 \uB9CC\uB4E4\uC5B4\uBCF4\uC138\uC694."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      padding: '11px 20px'
    },
    onClick: () => setTab('reco')
  }, "\uCD94\uCC9C \uBAA8\uC784 \uBCF4\uAE30"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      padding: '11px 20px'
    },
    onClick: () => setCreating(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16,
    stroke: 2.4
  }), " \uBAA8\uC784 \uB9CC\uB4E4\uAE30"))), /*#__PURE__*/React.createElement("div", {
    className: "group-grid"
  }, list.map(g => /*#__PURE__*/React.createElement(GroupCard, {
    key: g.id,
    group: g,
    joined: joinedIds.has(g.id),
    onOpen: () => open(g.id),
    onToggle: toggle
  }))), tab === 'reco' && /*#__PURE__*/React.createElement("div", {
    className: "board-note"
  }, "\uB098\uC758 \uB2E8\uACC4(\uACB0\uD63C\uC900\uBE44)\uC640 \uAD00\uC2EC \uC8FC\uC81C\uC5D0 \uB9DE\uCDB0 \uCD94\uCC9C\uD588\uC5B4\uC694 \xB7 \uAC00\uC785\uD558\uBA74 \u2018\uB0B4 \uBAA8\uC784\u2019\uC5D0 \uB2F4\uACA8\uC694."), creating && /*#__PURE__*/React.createElement(CreateGroupModal, {
    app: app,
    onClose: () => setCreating(false)
  }));
}

// ── 개별 모임 방 ─────────────────────────────────────────────
function GroupRoom({
  app,
  groupId
}) {
  const group = groupById(groupId);
  const [posts, setPosts] = uG(() => groupPostsOf(groupId));
  const [draft, setDraft] = uG('');
  const [img, setImg] = uG(null);
  const fileRef = React.useRef();

  // Supabase에서 이 모임의 게시글 불러오기 (있으면 데모 대체)
  React.useEffect(() => {
    let alive = true;
    if (group && window.hbData && window.hbData.loadGroupPosts) {
      window.hbData.loadGroupPosts(groupId).then(rows => {
        if (alive && rows) setPosts(rows);
      });
    }
    return () => {
      alive = false;
    };
  }, [groupId]);
  if (!group) return null;
  const joined = app.groups.has(groupId);
  const pending = group.status === 'pending';
  const memberCount = group.members + (joined && !group.owner ? 1 : 0);
  const pickPhoto = e => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImg(r.result);
    r.readAsDataURL(f);
  };
  const submit = async () => {
    if (!joined) {
      app.toast('먼저 모임에 가입해주세요');
      return;
    }
    if (!draft.trim() && !img) return;
    if (!app.requireLogin()) return;
    const body = draft.trim();
    const res = window.hbData ? await window.hbData.addGroupPost(groupId, body, null) : {
      error: {
        message: 'no server'
      }
    };
    const saved = res && res.data;
    setPosts([{
      id: saved ? saved.id : 'gpx' + Date.now(),
      author: ME.name,
      time: '방금',
      body,
      image: img,
      likes: 0,
      comments: 0
    }, ...posts]);
    setDraft('');
    setImg(null);
    app.toast(res && res.error ? '화면엔 보이지만 저장은 실패했어요' : '모임에 글을 남겼어요 ✏️');
  };
  const toggle = () => {
    app.toggleGroup(groupId);
    app.toast(joined ? '모임에서 나왔어요' : `‘${group.name}’ 가입 완료! 🎈`);
  };
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
  }), " \uC18C\uBAA8\uC784")), /*#__PURE__*/React.createElement("div", {
    className: "groom-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: `groom-cover ${group.cls}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "groom-emoji bob"
  }, group.emoji)), /*#__PURE__*/React.createElement("div", {
    className: "groom-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "groom-name"
  }, group.name), /*#__PURE__*/React.createElement("div", {
    className: "groom-meta"
  }, /*#__PURE__*/React.createElement(TopicChip, {
    topic: group.topic
  }), /*#__PURE__*/React.createElement("span", {
    className: "faint",
    style: {
      fontSize: 13,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "people",
    size: 14,
    stroke: 2,
    style: {
      verticalAlign: '-2px'
    }
  }), " \uBA64\uBC84 ", memberCount.toLocaleString(), "\uBA85")), /*#__PURE__*/React.createElement("div", {
    className: "groom-about"
  }, group.about), /*#__PURE__*/React.createElement("button", {
    className: `btn ${joined ? 'btn-ghost following' : 'btn-primary'} groom-join`,
    onClick: toggle
  }, joined ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    stroke: 2.4
  }), " \uAC00\uC785\uB428") : '+ 모임 가입')), pending && /*#__PURE__*/React.createElement("div", {
    className: "groom-notice pending"
  }, /*#__PURE__*/React.createElement("span", {
    className: "groom-notice-ic"
  }, "\u23F3"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\uC6B4\uC601\uC790 \uC2B9\uC778 \uB300\uAE30 \uC911"), " \uC2B9\uC778\uB418\uBA74 \uC18C\uBAA8\uC784 \uBAA9\uB85D\uC5D0 \uACF5\uAC1C\uB3FC\uC694. \uADF8\uB3D9\uC548 \uBC29\uC7A5\uB2D8\uB9CC \uC900\uBE44\uD560 \uC218 \uC788\uC5B4\uC694.")), group.notice && /*#__PURE__*/React.createElement("div", {
    className: "groom-notice"
  }, /*#__PURE__*/React.createElement("span", {
    className: "groom-notice-ic"
  }, "\uD83D\uDCCC"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\uACF5\uC9C0"), " ", group.notice)), /*#__PURE__*/React.createElement("div", {
    className: "groom-board"
  }, /*#__PURE__*/React.createElement("div", {
    className: "groom-board-h"
  }, "\uBAA8\uC784 \uAC8C\uC2DC\uD310 ", /*#__PURE__*/React.createElement("span", {
    className: "faint",
    style: {
      fontWeight: 700
    }
  }, posts.length)), /*#__PURE__*/React.createElement("div", {
    className: "groom-write"
  }, /*#__PURE__*/React.createElement(Ph, {
    topic: group.topic,
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      fontWeight: 800,
      fontSize: 14,
      color: `var(--t-${topicOf(group.topic).cls})`
    }
  }, ME.name[0])), /*#__PURE__*/React.createElement("input", {
    className: "groom-input",
    placeholder: joined ? '모임에 글을 남겨보세요' : '가입하면 글을 남길 수 있어요',
    value: draft,
    onChange: e => setDraft(e.target.value),
    onKeyDown: e => e.key === 'Enter' && submit()
  }), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    ref: fileRef,
    onChange: pickPhoto,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    title: "\uC0AC\uC9C4 \uCCA8\uBD80",
    style: {
      color: 'var(--ink-soft)'
    },
    onClick: () => fileRef.current && fileRef.current.click()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image",
    size: 20,
    stroke: 2
  })), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    style: {
      color: 'var(--grape)'
    },
    onClick: submit
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 20
  }))), img && /*#__PURE__*/React.createElement("div", {
    className: "groom-preview"
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "\uCCA8\uBD80 \uC774\uBBF8\uC9C0"
  }), /*#__PURE__*/React.createElement("button", {
    className: "groom-preview-x",
    onClick: () => setImg(null)
  }, "\u2715")), posts.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: `groom-post ${p.pin ? 'pin' : ''}`
  }, p.pin && /*#__PURE__*/React.createElement("div", {
    className: "groom-pin"
  }, "\uD83D\uDCCC \uACE0\uC815\uB428"), /*#__PURE__*/React.createElement("div", {
    className: "groom-post-head"
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
  }, p.author[0])), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "groom-post-author"
  }, p.author), /*#__PURE__*/React.createElement("div", {
    className: "groom-post-time"
  }, p.time))), /*#__PURE__*/React.createElement("div", {
    className: "groom-post-body"
  }, p.body), p.image && /*#__PURE__*/React.createElement("img", {
    className: "groom-post-img",
    src: p.image,
    alt: "\uBAA8\uC784 \uC0AC\uC9C4"
  }), /*#__PURE__*/React.createElement("div", {
    className: "groom-post-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 14,
    stroke: 1.9
  }), " ", p.likes), /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 14,
    stroke: 1.9
  }), " ", p.comments)))))));
}
Object.assign(window, {
  GroupCard,
  GroupsScreen,
  GroupRoom,
  CreateGroupModal
});