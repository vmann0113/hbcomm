// ── HANBEAM LIFE · 관리자 셸 + 대시보드 ──────────────────────
const {
  useState: aS
} = React;
const TODAY = new Date('2026-06-03T00:00:00');
const daysTo = d => Math.round((new Date(d + 'T00:00:00') - TODAY) / 86400000);
const ADM_NAV = [{
  key: 'dash',
  label: '대시보드',
  icon: 'home'
}, {
  key: 'biz',
  label: '입점 업체',
  icon: 'store'
}, {
  key: 'subs',
  label: '구독 결제',
  icon: 'spark'
}, {
  key: 'posts',
  label: '게시글 관리',
  icon: 'plaza'
}, {
  key: 'signal',
  label: '소식·신호층',
  icon: 'flame'
}, {
  key: 'groups',
  label: '소모임',
  icon: 'people'
}, {
  key: 'users',
  label: '사용자',
  icon: 'people'
}];
function statusPill(status) {
  const map = {
    active: ['ok', '구독중'],
    trial: ['accent', '체험중'],
    expired: ['bad', '만료'],
    완료: ['ok', '완료'],
    실패: ['bad', '실패'],
    정상: ['ok', '정상'],
    휴면: ['muted', '휴면']
  };
  const [cls, label] = map[status] || ['muted', status];
  return /*#__PURE__*/React.createElement("span", {
    className: `pill ${cls}`
  }, label);
}
function AdminApp() {
  const [section, setSection] = aS('dash');
  const [subs, setSubs] = aS(() => SUBS.map(s => ({
    ...s
  })));
  const [exposure, setExposure] = aS(() => ({
    ...EXPOSURE
  }));
  const [signals, setSignals] = aS(() => Object.fromEntries(NEWS.map(n => [n.id, n.signal])));
  const [hidden, setHidden] = aS(() => new Set());
  const [featured, setFeatured] = aS(() => new Set(['p1', 'p4', 'p6']));
  const [groupHidden, setGroupHidden] = aS(() => new Set());
  const [groupFeat, setGroupFeat] = aS(() => new Set(['g1', 'g2']));
  const [showToast, toastNode] = useToast();
  const admin = {
    subs,
    setSubs,
    exposure,
    setExposure,
    signals,
    setSignals,
    hidden,
    setHidden,
    featured,
    setFeatured,
    groupHidden,
    setGroupHidden,
    groupFeat,
    setGroupFeat,
    toast: showToast,
    go: setSection
  };
  const reports = REPORTS.length;
  const cur = ADM_NAV.find(n => n.key === section);
  return /*#__PURE__*/React.createElement("div", {
    className: "adm"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "adm-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-brand"
  }, "HANBEAM", /*#__PURE__*/React.createElement("span", {
    className: "brand-light"
  }, "LIFE"), /*#__PURE__*/React.createElement("span", {
    className: "adm-brand-badge"
  }, "ADMIN")), /*#__PURE__*/React.createElement("nav", {
    className: "adm-nav"
  }, ADM_NAV.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.key,
    className: `adm-nav-item ${section === n.key ? 'active' : ''}`,
    onClick: () => setSection(n.key)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n.icon,
    size: 19,
    stroke: 1.9
  }), " ", n.label, n.key === 'posts' && reports > 0 && /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, reports)))), /*#__PURE__*/React.createElement("div", {
    className: "adm-side-foot"
  }, /*#__PURE__*/React.createElement("a", {
    className: "adm-back",
    href: "\uD55C\uBE54\uCEE4\uBBA4\uB2C8\uD2F0.html"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " \uC0AC\uC774\uD2B8\uB85C \uB3CC\uC544\uAC00\uAE30"), /*#__PURE__*/React.createElement("div", {
    className: "adm-admin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av"
  }, "\uAD00"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "\uD55C\uBE54 \uC6B4\uC601\uC790"), /*#__PURE__*/React.createElement("div", {
    className: "rl"
  }, "\uCD5C\uACE0 \uAD00\uB9AC\uC790"))))), /*#__PURE__*/React.createElement("main", {
    className: "adm-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, cur.label), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, {
    dash: '플랫폼 핵심 지표 한눈에 보기',
    biz: '미니홈 입점 업체 운영',
    subs: '입점 구독 결제와 요금제 관리',
    posts: '광장 게시글 모더레이션',
    signal: '업체 소식과 신호층(불 켜짐) 제어',
    groups: '소모임 운영·모더레이션',
    users: '가입 사용자 관리'
  }[section])), /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "abtn",
    onClick: () => admin.toast('데이터를 내보냈어요 (CSV)')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link",
    size: 15,
    stroke: 2
  }), " \uB0B4\uBCF4\uB0B4\uAE30"), /*#__PURE__*/React.createElement("button", {
    className: "abtn abtn-primary",
    onClick: () => admin.go(section === 'dash' ? 'biz' : section) || admin.toast('새 항목 추가')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15,
    stroke: 2.2
  }), " \uC0C8\uB85C \uCD94\uAC00"))), /*#__PURE__*/React.createElement("div", {
    className: "adm-body"
  }, section === 'dash' && /*#__PURE__*/React.createElement(AdminDashboard, {
    admin: admin
  }), section === 'biz' && /*#__PURE__*/React.createElement(AdminBusinesses, {
    admin: admin
  }), section === 'subs' && /*#__PURE__*/React.createElement(AdminSubs, {
    admin: admin
  }), section === 'posts' && /*#__PURE__*/React.createElement(AdminPosts, {
    admin: admin
  }), section === 'signal' && /*#__PURE__*/React.createElement(AdminSignals, {
    admin: admin
  }), section === 'groups' && /*#__PURE__*/React.createElement(AdminGroups, {
    admin: admin
  }), section === 'users' && /*#__PURE__*/React.createElement(AdminUsers, {
    admin: admin
  }))), toastNode);
}

// ── 대시보드 ────────────────────────────────────────────────
function AdminDashboard({
  admin
}) {
  const active = admin.subs.filter(s => s.status === 'active');
  const trial = admin.subs.filter(s => s.status === 'trial');
  const expired = admin.subs.filter(s => s.status === 'expired');
  const mrr = active.reduce((s, x) => s + planById(x.plan).price, 0);
  const expiring = admin.subs.filter(s => s.status !== 'expired' && daysTo(s.end) <= 14).sort((a, b) => daysTo(a.end) - daysTo(b.end));
  const maxRev = Math.max(...REVENUE.map(r => r.v));
  const Kpi = (label, icon, value, sub) => /*#__PURE__*/React.createElement("div", {
    className: "kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kpi-ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 15,
    stroke: 2
  })), label), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value"
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, sub));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi-grid"
  }, Kpi('입점 업체', 'store', BUSINESSES.length, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "kpi-delta"
  }, "\uD65C\uC131 ", active.length), " \xB7 \uCCB4\uD5D8 ", trial.length, " \xB7 \uB9CC\uB8CC ", expired.length)), Kpi('월 구독 매출 (MRR)', 'spark', WON(mrr), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "kpi-delta"
  }, "+14.5%"), " \uC804\uC6D4 \uB300\uBE44")), Kpi('가입 사용자', 'people', STATS.users.toLocaleString(), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "kpi-delta"
  }, STATS.usersDelta), " \xB7 \uC2DC\uB4DC ", STATS.seedUsers)), Kpi('누적 게시글', 'plaza', POSTS.length * 18 + 4, '이번 주 +37'), Kpi('총 팔로우', 'heart', STATS.followsTotal.toLocaleString(), '무료 구독'), Kpi('방문(주간)', 'home', STATS.pageviews, '재방문율 41%'))), /*#__PURE__*/React.createElement("div", {
    className: "adm-cols"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec-t"
  }, "\uC6D4 \uAD6C\uB3C5 \uB9E4\uCD9C \uCD94\uC774"), /*#__PURE__*/React.createElement("div", {
    className: "adm-sec-c"
  }, "\uB2E8\uC704: \uC6D0")), /*#__PURE__*/React.createElement("div", {
    className: "chart"
  }, REVENUE.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.m,
    className: `bar-col ${i === REVENUE.length - 1 ? 'cur' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar-v"
  }, (r.v / 10000).toFixed(0), "\uB9CC"), /*#__PURE__*/React.createElement("div", {
    className: "bar",
    style: {
      height: `${Math.round(r.v / maxRev * 130)}px`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "bar-m"
  }, r.m))))), REPORTS.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "block",
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-title"
  }, "\uCC98\uB9AC \uB300\uAE30 \xB7 \uC2E0\uACE0"), /*#__PURE__*/React.createElement("button", {
    className: "abtn abtn-sm",
    onClick: () => admin.go('posts')
  }, "\uBAA8\uB354\uB808\uC774\uC158 \u2192")), REPORTS.map(r => {
    const p = postById(r.postId);
    return /*#__PURE__*/React.createElement("div", {
      key: r.postId,
      style: {
        padding: '13px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pill bad"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "flame",
      size: 12,
      fill: true
    }), " \uC2E0\uACE0"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 700,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, p.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--ink-faint)',
        marginTop: 2
      }
    }, r.reason, " \xB7 ", r.by, " \xB7 ", r.date)), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm",
      onClick: () => admin.go('posts')
    }, "\uAC80\uD1A0"));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-title"
  }, "\uAD6C\uB3C5 \uB9CC\uB8CC \uC784\uBC15"), /*#__PURE__*/React.createElement("span", {
    className: "pill warn"
  }, expiring.length, "\uAC74")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 18px 12px'
    }
  }, expiring.map(s => {
    const b = bizById(s.bizId);
    const d = daysTo(s.end);
    return /*#__PURE__*/React.createElement("div", {
      key: s.bizId,
      className: "mini-row"
    }, /*#__PURE__*/React.createElement(BizLogo, {
      biz: b,
      size: 36
    }), /*#__PURE__*/React.createElement("div", {
      className: "grow"
    }, /*#__PURE__*/React.createElement("div", {
      className: "t"
    }, b.name), /*#__PURE__*/React.createElement("div", {
      className: "s"
    }, planById(s.plan).name, " \xB7 ", s.end)), /*#__PURE__*/React.createElement("span", {
      className: `pill ${d <= 7 ? 'bad' : 'warn'}`
    }, "D-", d));
  }), expiring.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "s",
    style: {
      padding: '10px 0'
    }
  }, "\uC784\uBC15\uD55C \uB9CC\uB8CC\uAC00 \uC5C6\uC5B4\uC694."))), /*#__PURE__*/React.createElement("div", {
    className: "block",
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-title"
  }, "\uCD5C\uADFC \uACB0\uC81C"), /*#__PURE__*/React.createElement("button", {
    className: "abtn abtn-sm",
    onClick: () => admin.go('subs')
  }, "\uC804\uCCB4 \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 18px 12px'
    }
  }, PAYMENTS.slice(0, 5).map((p, i) => {
    const b = bizById(p.bizId);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "mini-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "grow"
    }, /*#__PURE__*/React.createElement("div", {
      className: "t"
    }, b.name, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-faint)',
        fontWeight: 600
      }
    }, "\xB7 ", planById(p.plan).name)), /*#__PURE__*/React.createElement("div", {
      className: "s"
    }, p.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 800
      }
    }, WON(p.amount)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 3
      }
    }, statusPill(p.status))));
  }))))));
}
Object.assign(window, {
  AdminApp,
  statusPill,
  daysTo
});
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(AdminApp, null));