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

// ── 로그인 모달 (이메일 매직링크 + 카카오) ─────────────────────
function LoginModal({
  app,
  onClose
}) {
  const [email, setEmail] = uA('');
  const [code, setCode] = uA('');
  const [step, setStep] = uA('email'); // email → code
  const [busy, setBusy] = uA(false);
  const [err, setErr] = uA('');
  const submitEmail = async () => {
    if (!/.+@.+\..+/.test(email)) {
      setErr('이메일 형식을 확인해주세요');
      return;
    }
    setBusy(true);
    setErr('');
    const res = await window.hbAuth.loginEmail(email);
    setBusy(false);
    if (res && res.error) {
      setErr(res.error.message || '잠시 후 다시 시도해주세요');
      return;
    }
    setStep('code');
  };
  const submitCode = async () => {
    const c = (code || '').replace(/\D/g, '');
    if (c.length < 6) {
      setErr('메일로 받은 6자리 코드를 입력해주세요');
      return;
    }
    setBusy(true);
    setErr('');
    const res = await window.hbAuth.verifyEmailCode(email, c);
    setBusy(false);
    if (res && res.error) {
      setErr('코드가 올바르지 않거나 만료됐어요. 다시 확인해주세요');
      return;
    }
    location.reload(); // 세션 적용
  };
  const kakao = () => {
    app.toast('카카오 로그인은 준비 중이에요 · 이메일로 시작해주세요 🙂');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sheet-wrap",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet login-sheet",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "login-x",
    onClick: onClose,
    "aria-label": "\uB2EB\uAE30"
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    className: "login-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-emoji"
  }, "\uD83C\uDF88"), /*#__PURE__*/React.createElement("div", {
    className: "login-title"
  }, "\uD55C\uBE54\uCEE4\uBBA4\uB2C8\uD2F0 \uC2DC\uC791\uD558\uAE30"), /*#__PURE__*/React.createElement("div", {
    className: "login-sub"
  }, "\uB85C\uADF8\uC778\uD558\uBA74 \uAE00\xB7\uD6C4\uAE30\xB7\uC18C\uBAA8\uC784\uC744 \uD568\uAED8\uD560 \uC218 \uC788\uC5B4\uC694")), step === 'email' ? /*#__PURE__*/React.createElement("div", {
    className: "login-body"
  }, /*#__PURE__*/React.createElement("button", {
    className: "kakao-btn soon",
    onClick: kakao
  }, /*#__PURE__*/React.createElement("span", {
    className: "kakao-ic"
  }, "\uD83D\uDCAC"), " \uCE74\uCE74\uC624\uB85C \uC2DC\uC791\uD558\uAE30 ", /*#__PURE__*/React.createElement("span", {
    className: "soon-tag"
  }, "\uC900\uBE44 \uC911")), /*#__PURE__*/React.createElement("div", {
    className: "login-or"
  }, /*#__PURE__*/React.createElement("span", null, "\uB610\uB294 \uC774\uBA54\uC77C\uB85C")), /*#__PURE__*/React.createElement("input", {
    className: "sheet-input login-input",
    type: "email",
    inputMode: "email",
    placeholder: "\uC774\uBA54\uC77C \uC8FC\uC18C",
    value: email,
    onChange: e => setEmail(e.target.value),
    onKeyDown: e => e.key === 'Enter' && submitEmail()
  }), err && /*#__PURE__*/React.createElement("div", {
    className: "login-err"
  }, err), /*#__PURE__*/React.createElement("button", {
    className: "login-go",
    disabled: busy,
    onClick: submitEmail
  }, busy ? '보내는 중…' : '인증 코드 받기'), /*#__PURE__*/React.createElement("div", {
    className: "login-hint"
  }, "\uC785\uB825\uD55C \uC774\uBA54\uC77C\uB85C ", /*#__PURE__*/React.createElement("b", null, "6\uC790\uB9AC \uCF54\uB4DC"), "\uB97C \uBCF4\uB0B4\uB4DC\uB824\uC694. \uBE44\uBC00\uBC88\uD638\uAC00 \uC5C6\uC5B4\uC694.")) : /*#__PURE__*/React.createElement("div", {
    className: "login-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-code-to"
  }, "\uD83D\uDCEC ", /*#__PURE__*/React.createElement("b", null, email), " \uB85C \uBCF4\uB0B8", /*#__PURE__*/React.createElement("br", null), "6\uC790\uB9AC \uCF54\uB4DC\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694"), /*#__PURE__*/React.createElement("input", {
    className: "sheet-input login-input login-code",
    type: "text",
    inputMode: "numeric",
    maxLength: 6,
    placeholder: "\u25CF \u25CF \u25CF \u25CF \u25CF \u25CF",
    value: code,
    onChange: e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6)),
    onKeyDown: e => e.key === 'Enter' && submitCode(),
    autoFocus: true
  }), err && /*#__PURE__*/React.createElement("div", {
    className: "login-err"
  }, err), /*#__PURE__*/React.createElement("button", {
    className: "login-go",
    disabled: busy,
    onClick: submitCode
  }, busy ? '확인 중…' : '로그인'), /*#__PURE__*/React.createElement("button", {
    className: "login-link-btn",
    onClick: () => {
      setStep('email');
      setCode('');
      setErr('');
    }
  }, "\u2190 \uC774\uBA54\uC77C \uB2E4\uC2DC \uC785\uB825"), /*#__PURE__*/React.createElement("div", {
    className: "login-hint"
  }, "\uBA54\uC77C\uC774 \uC548 \uBCF4\uC774\uBA74 \uC2A4\uD338\uD568\uB3C4 \uD655\uC778\uD574\uC8FC\uC138\uC694. \uCF54\uB4DC \uB300\uC2E0 \uBA54\uC77C \uC18D \uB9C1\uD06C\uB97C \uB20C\uB7EC\uB3C4 \uB85C\uADF8\uC778\uB3FC\uC694."))));
}

// ── 첫 로그인 온보딩 (고객 정보 수집 → profiles 저장) ────────────
function OnboardingModal({
  app,
  onDone
}) {
  const prof = window.hbAuth && window.hbAuth.profile || {};
  const authUser = window.hbAuth && window.hbAuth.user || {};
  const [name, setName] = uA(prof.name && prof.name !== '회원' ? prof.name : '');
  const [phone, setPhone] = uA(prof.phone || '');
  const [email, setEmail] = uA(prof.email || authUser.email || '');
  const [dateType, setDateType] = uA(prof.date_type || 'wedding');
  const [date, setDate] = uA(prof.wedding_date || '');
  const [busy, setBusy] = uA(false);
  const [err, setErr] = uA('');
  const save = async skip => {
    if (!skip && !name.trim()) {
      setErr('이름(또는 닉네임)을 입력해주세요');
      return;
    }
    setBusy(true);
    setErr('');
    const fields = skip ? {} : {
      name: name.trim() || prof.name || '회원',
      phone: phone.trim() || null,
      email: email.trim() || null,
      date_type: dateType,
      wedding_date: date || null
    };
    const res = await window.hbAuth.saveProfile(fields);
    setBusy(false);
    if (res && res.error) {
      setErr('저장에 실패했어요. 잠시 후 다시 시도해주세요');
      return;
    }
    app.toast(skip ? '환영해요! 🎈' : '환영해요! 정보가 저장됐어요 🎉');
    onDone();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sheet-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet onb-sheet",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-emoji"
  }, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
    className: "login-title"
  }, "\uBC18\uAC00\uC6CC\uC694! \uAC70\uC758 \uB2E4 \uB410\uC5B4\uC694"), /*#__PURE__*/React.createElement("div", {
    className: "login-sub"
  }, "\uB9DE\uCDA4 \uC815\uBCF4\uB97C \uC704\uD574 \uBA87 \uAC00\uC9C0\uB9CC \uC54C\uB824\uC8FC\uC138\uC694")), /*#__PURE__*/React.createElement("div", {
    className: "onb-body"
  }, /*#__PURE__*/React.createElement("label", {
    className: "onb-label"
  }, "\uC774\uB984 \uB610\uB294 \uB2C9\uB124\uC784 ", /*#__PURE__*/React.createElement("span", {
    className: "onb-req"
  }, "\uD544\uC218")), /*#__PURE__*/React.createElement("input", {
    className: "sheet-input",
    placeholder: "\uC608) \uAE40\uD0DC\uD604",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    className: "onb-label"
  }, "\uC5F0\uB77D\uCC98"), /*#__PURE__*/React.createElement("input", {
    className: "sheet-input",
    type: "tel",
    inputMode: "tel",
    placeholder: "010-0000-0000",
    value: phone,
    onChange: e => setPhone(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    className: "onb-label"
  }, "\uC774\uBA54\uC77C"), /*#__PURE__*/React.createElement("input", {
    className: "sheet-input",
    type: "email",
    inputMode: "email",
    placeholder: "\uC774\uBA54\uC77C \uC8FC\uC18C",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement("label", {
    className: "onb-label"
  }, "\uAE30\uB150\uC77C"), /*#__PURE__*/React.createElement("div", {
    className: "onb-seg"
  }, /*#__PURE__*/React.createElement("button", {
    className: `onb-seg-btn ${dateType === 'wedding' ? 'on' : ''}`,
    onClick: () => setDateType('wedding')
  }, "\uACB0\uD63C \uC608\uC815\uC77C"), /*#__PURE__*/React.createElement("button", {
    className: `onb-seg-btn ${dateType === 'anniversary' ? 'on' : ''}`,
    onClick: () => setDateType('anniversary')
  }, "\uAE30\uB150\uC77C")), /*#__PURE__*/React.createElement("input", {
    className: "sheet-input",
    type: "date",
    value: date,
    onChange: e => setDate(e.target.value)
  }), err && /*#__PURE__*/React.createElement("div", {
    className: "login-err"
  }, err), /*#__PURE__*/React.createElement("button", {
    className: "login-go",
    disabled: busy,
    onClick: () => save(false),
    style: {
      marginTop: 16
    }
  }, busy ? '저장 중…' : '시작하기'), /*#__PURE__*/React.createElement("button", {
    className: "login-link-btn",
    onClick: () => save(true),
    disabled: busy
  }, "\uB098\uC911\uC5D0 \uC785\uB825\uD560\uAC8C\uC694"))));
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
  const [loginOpen, setLoginOpen] = uA(false);
  const [onboard, setOnboard] = uA(() => !!(window.hbAuth && window.hbAuth.needsOnboarding && window.hbAuth.needsOnboarding()));
  const [showToast, toastNode] = useToast();
  const isGuest = !(window.hbAuth && window.hbAuth.isLoggedIn());
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
    isGuest,
    login: () => setLoginOpen(true),
    logout: () => window.hbAuth && window.hbAuth.logout(),
    requireLogin: () => {
      if (!isGuest) return true;
      setLoginOpen(true);
      showToast('로그인하고 함께해요 🎈');
      return false;
    },
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
    openCompose: () => {
      if (!isGuest) setCompose(true);else {
        setLoginOpen(true);
        showToast('로그인하고 글을 남겨요 🎈');
      }
    },
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
  })), isGuest ? /*#__PURE__*/React.createElement("button", {
    className: "login-btn",
    onClick: app.login
  }, "\uB85C\uADF8\uC778") : /*#__PURE__*/React.createElement("button", {
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
  }), loginOpen && /*#__PURE__*/React.createElement(LoginModal, {
    app: app,
    onClose: () => setLoginOpen(false)
  }), onboard && /*#__PURE__*/React.createElement(OnboardingModal, {
    app: app,
    onDone: () => setOnboard(false)
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
(window.__hbReady || Promise.resolve()).then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
});