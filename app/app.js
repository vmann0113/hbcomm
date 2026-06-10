// ── 한빔커뮤니티 · Web shell, navigation, tweaks ─────────────
const {
  useState: uA,
  useEffect: eA
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#7C5CFC",
  "contentWidth": "표준",
  "corner": "둥글게",
  "playful": "높게"
} /*EDITMODE-END*/;
const NAV = [{
  key: 'home',
  label: '내 공간'
}, {
  key: 'plaza',
  label: '광장'
}, {
  key: 'street',
  label: '미니홈 거리'
}, {
  key: 'groups',
  label: '소모임'
}];
const MOBILE_TABS = [{
  key: 'home',
  label: '내 공간',
  icon: 'home'
}, {
  key: 'plaza',
  label: '광장',
  icon: 'plaza'
}, {
  key: 'street',
  label: '미니홈',
  icon: 'store'
}, {
  key: 'groups',
  label: '소모임',
  icon: 'people'
}, {
  key: 'me',
  label: '나',
  icon: 'user'
}];
function loadSet(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return new Set(v || fallback);
  } catch {
    return new Set(fallback);
  }
}
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [tab, setTab] = uA(() => localStorage.getItem('hb_tab') || 'home');
  const [nav, setNav] = uA([]);
  const [following, setFollowing] = uA(() => loadSet('hb_follow', ME.following));
  const [liked, setLiked] = uA(() => loadSet('hb_like', []));
  const [scraps, setScraps] = uA(() => loadSet('hb_scrap', ME.scraps));
  const [checked, setChecked] = uA(() => loadSet('hb_check', ['k1', 'k2', 'k3']));
  const [groups, setGroups] = uA(() => loadSet('hb_groups', ME.groups));
  const [posts, setPosts] = uA([...POSTS]);
  const [compose, setCompose] = uA(false);
  const [welcome, setWelcome] = uA(() => !localStorage.getItem('hb_welcomed'));
  const [joinOpen, setJoinOpen] = uA(false);
  const [showToast, toastNode] = useToast();
  eA(() => {
    localStorage.setItem('hb_tab', tab);
  }, [tab]);
  eA(() => {
    localStorage.setItem('hb_follow', JSON.stringify([...following]));
  }, [following]);
  eA(() => {
    localStorage.setItem('hb_like', JSON.stringify([...liked]));
  }, [liked]);
  eA(() => {
    localStorage.setItem('hb_scrap', JSON.stringify([...scraps]));
  }, [scraps]);
  eA(() => {
    localStorage.setItem('hb_check', JSON.stringify([...checked]));
  }, [checked]);
  eA(() => {
    localStorage.setItem('hb_groups', JSON.stringify([...groups]));
  }, [groups]);
  eA(() => {
    window.scrollTo({
      top: 0
    });
  }, [tab, nav.length]);

  // apply tweaks → CSS vars
  eA(() => {
    const r = document.documentElement.style;
    const a = t.accent;
    r.setProperty('--persimmon', a);
    r.setProperty('--persimmon-d', `color-mix(in oklch, ${a} 80%, black)`);
    r.setProperty('--persimmon-tint', `color-mix(in oklch, ${a} 13%, white)`);
    r.setProperty('--maxw', t.contentWidth === '넓게' ? '1200px' : '1080px');
    r.setProperty('--r-card', t.corner === '각지게' ? '8px' : '22px');
  }, [t.accent, t.contentWidth, t.corner]);

  // playful intensity → toggle motion
  eA(() => {
    document.documentElement.dataset.playful = t.playful === '낮게' ? 'low' : 'high';
  }, [t.playful]);
  const toggleIn = setter => id => setter(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const app = {
    posts,
    following,
    liked,
    scraps,
    checked,
    groups,
    switchTab: x => {
      setNav([]);
      setTab(x);
    },
    openPost: id => setNav(s => [...s, {
      kind: 'post',
      id
    }]),
    openBiz: id => setNav(s => [...s, {
      kind: 'biz',
      id
    }]),
    openGroup: id => setNav(s => [...s, {
      kind: 'group',
      id
    }]),
    openChecklist: () => setNav(s => [...s, {
      kind: 'checklist'
    }]),
    openWallet: () => setNav(s => [...s, {
      kind: 'wallet'
    }]),
    openJoin: () => setJoinOpen(true),
    back: () => setNav(s => s.slice(0, -1)),
    toggleFollow: toggleIn(setFollowing),
    toggleLike: toggleIn(setLiked),
    toggleScrap: toggleIn(setScraps),
    toggleCheck: toggleIn(setChecked),
    toggleGroup: toggleIn(setGroups),
    addGroup: g => {
      GROUPS.unshift(g);
      GROUP_POSTS[g.id] = [];
      setGroups(prev => new Set([...prev, g.id]));
    },
    addPost: p => setPosts(prev => [p, ...prev]),
    openCompose: () => setCompose(true),
    toast: showToast
  };
  const overlay = nav[nav.length - 1];
  const renderTab = () => {
    switch (tab) {
      case 'home':
        return /*#__PURE__*/React.createElement(HomeScreen, {
          app: app
        });
      case 'plaza':
        return /*#__PURE__*/React.createElement(PlazaScreen, {
          app: app
        });
      case 'street':
        return /*#__PURE__*/React.createElement(StreetScreen, {
          app: app
        });
      case 'groups':
        return /*#__PURE__*/React.createElement(GroupsScreen, {
          app: app
        });
      case 'noti':
        return /*#__PURE__*/React.createElement(NotiScreen, {
          app: app
        });
      case 'me':
        return /*#__PURE__*/React.createElement(ProfileScreen, {
          app: app
        });
      default:
        return null;
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "site"
  }, /*#__PURE__*/React.createElement("header", {
    className: "site-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-header-in"
  }, /*#__PURE__*/React.createElement("button", {
    className: "brand-mark",
    onClick: () => app.switchTab('home')
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-dot"
  }), "HANBEAM", /*#__PURE__*/React.createElement("span", {
    className: "brand-light"
  }, "LIFE")), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, NAV.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.key,
    className: `nav-link ${tab === n.key && !overlay ? 'active' : ''}`,
    onClick: () => app.switchTab(n.key)
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    className: "header-spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18,
    stroke: 2
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "\uAC80\uC0C9",
    onFocus: () => app.toast('검색은 준비 중이에요'),
    readOnly: true
  })), /*#__PURE__*/React.createElement("button", {
    className: "write-btn",
    onClick: app.openCompose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pen",
    size: 17,
    stroke: 2
  }), " ", /*#__PURE__*/React.createElement("span", null, "\uAE00\uC4F0\uAE30")), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: () => app.switchTab('noti')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  })), /*#__PURE__*/React.createElement("button", {
    className: "avatar-btn",
    onClick: () => app.switchTab('me')
  }, ME.name[0])))), /*#__PURE__*/React.createElement("main", {
    className: "site-body"
  }, overlay && overlay.kind === 'post' ? /*#__PURE__*/React.createElement(PostDetail, {
    app: app,
    postId: overlay.id
  }) : overlay && overlay.kind === 'biz' ? /*#__PURE__*/React.createElement(MiniHome, {
    app: app,
    bizId: overlay.id
  }) : overlay && overlay.kind === 'group' ? /*#__PURE__*/React.createElement(GroupRoom, {
    app: app,
    groupId: overlay.id
  }) : overlay && overlay.kind === 'checklist' ? /*#__PURE__*/React.createElement(ChecklistScreen, {
    app: app
  }) : overlay && overlay.kind === 'wallet' ? /*#__PURE__*/React.createElement(WalletScreen, {
    app: app
  }) : /*#__PURE__*/React.createElement("div", {
    key: tab
  }, renderTab())), /*#__PURE__*/React.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-footer-in"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ad-slot footer",
    onClick: () => app.toast('광고 영역 · 푸터 배너')
  }, /*#__PURE__*/React.createElement("span", {
    className: "ad-tag"
  }, "AD"), /*#__PURE__*/React.createElement("span", {
    className: "ad-text"
  }, "\uD478\uD130 \uBC30\uB108 \uAD11\uACE0 \xB7 970 \xD7 100")), /*#__PURE__*/React.createElement("div", {
    className: "footer-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "brand-mini"
  }, "HANBEAM LIFE"), " \xB7 \uAC00\uC871 \uB77C\uC774\uD504\uC2A4\uD0C0\uC77C \uC815\uBCF4 \uCEE4\uBBA4\uB2C8\uD2F0 + \uBBF8\uB2C8\uD648 \uD50C\uB7AB\uD3FC"), /*#__PURE__*/React.createElement("a", {
    className: "admin-link",
    href: "admin.html"
  }, "\uAD00\uB9AC\uC790 \uCF58\uC194 \u2192")))), /*#__PURE__*/React.createElement("nav", {
    className: "tabbar"
  }, MOBILE_TABS.map(m => {
    const active = tab === m.key && !overlay;
    return /*#__PURE__*/React.createElement("button", {
      key: m.key,
      className: `tab ${active ? 'active' : ''}`,
      onClick: () => app.switchTab(m.key)
    }, /*#__PURE__*/React.createElement("span", {
      className: "ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: m.icon,
      size: 23,
      fill: active,
      stroke: active ? 0 : 1.9
    }), m.key === 'noti' && /*#__PURE__*/React.createElement("span", {
      className: "tdot"
    })), m.label);
  })), compose && /*#__PURE__*/React.createElement(ComposeSheet, {
    app: app,
    onClose: () => setCompose(false)
  }), joinOpen && /*#__PURE__*/React.createElement(JoinBizModal, {
    app: app,
    onClose: () => setJoinOpen(false)
  }), welcome && /*#__PURE__*/React.createElement(WelcomeModal, {
    app: app,
    onClose: () => {
      setWelcome(false);
      localStorage.setItem('hb_welcomed', '1');
    }
  }), toastNode, /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "\uC0C9\uC0C1"
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "\uAC15\uC870\uC0C9",
    value: t.accent,
    options: ['#7C5CFC', '#FF7AA8', '#36CFE8', '#2ED3A7', '#FF8A3D'],
    onChange: v => setTweak('accent', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "\uBD84\uC704\uAE30"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\uC990\uAC70\uC6C0",
    value: t.playful,
    options: ['높게', '낮게'],
    onChange: v => setTweak('playful', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "\uB808\uC774\uC544\uC6C3"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\uBCF8\uBB38 \uD3ED",
    value: t.contentWidth,
    options: ['표준', '넓게'],
    onChange: v => setTweak('contentWidth', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\uCE74\uB4DC \uBAA8\uC11C\uB9AC",
    value: t.corner,
    options: ['둥글게', '각지게'],
    onChange: v => setTweak('corner', v)
  })));
}
Object.assign(window, {
  App
});
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));