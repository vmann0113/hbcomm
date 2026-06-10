// ── HANBEAM LIFE · 관리자 관리 화면들 ────────────────────────
const {
  useState: xS
} = React;
const selStyle = {
  padding: '6px 9px',
  border: '1px solid var(--line)',
  borderRadius: '8px',
  fontFamily: 'var(--font)',
  fontSize: '12.5px',
  fontWeight: 700,
  color: 'var(--ink)',
  background: 'var(--surface)',
  cursor: 'pointer',
  outline: 'none'
};
function BizCell({
  biz
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cell-biz"
  }, /*#__PURE__*/React.createElement(BizLogo, {
    biz: biz,
    size: 34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, biz.name), /*#__PURE__*/React.createElement("div", {
    className: "cell-sub"
  }, topicOf(biz.topic).label)));
}
const toggleSet = setter => id => setter(prev => {
  const n = new Set(prev);
  n.has(id) ? n.delete(id) : n.add(id);
  return n;
});

// ════════ 입점 업체 ════════
function AdminBusinesses({
  admin
}) {
  const [q, setQ] = xS('');
  const [tf, setTf] = xS('all');
  const [adding, setAdding] = xS(false);
  const subOf = id => admin.subs.find(s => s.bizId === id);
  const list = BUSINESSES.filter(b => (tf === 'all' || b.topic === tf) && (!q || b.name.includes(q)));
  const cycleExposure = id => admin.setExposure(e => ({
    ...e,
    [id]: e[id] === '우대' ? '기본' : '우대'
  }));
  const toggleSuspend = id => admin.setSubs(subs => subs.map(s => s.bizId === id ? {
    ...s,
    status: s.status === 'expired' ? 'active' : 'expired'
  } : s));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toolbar",
    style: {
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    stroke: 2
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "\uC5C5\uCCB4\uBA85 \uAC80\uC0C9",
    value: q,
    onChange: e => setQ(e.target.value)
  })), [['all', '전체'], ...TOPICS.map(t => [t.key, t.label])].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "fchip",
    "data-on": tf === k,
    onClick: () => setTf(k)
  }, l))), /*#__PURE__*/React.createElement("button", {
    className: "abtn abtn-primary",
    onClick: () => setAdding(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15,
    stroke: 2.2
  }), " \uC5C5\uCCB4 \uC785\uC810"))), /*#__PURE__*/React.createElement("div", {
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\uC5C5\uCCB4"), /*#__PURE__*/React.createElement("th", null, "\uAD6C\uB3C5 \uC0C1\uD0DC"), /*#__PURE__*/React.createElement("th", null, "\uC694\uAE08\uC81C"), /*#__PURE__*/React.createElement("th", null, "\uB178\uCD9C \uB4F1\uAE09"), /*#__PURE__*/React.createElement("th", null, "\uD314\uB85C\uC6CC"), /*#__PURE__*/React.createElement("th", null, "\uB9CC\uB8CC\uC77C"), /*#__PURE__*/React.createElement("th", null, "\uAD00\uB9AC"))), /*#__PURE__*/React.createElement("tbody", null, list.map(b => {
    const s = subOf(b.id);
    return /*#__PURE__*/React.createElement("tr", {
      key: b.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(BizCell, {
      biz: b
    })), /*#__PURE__*/React.createElement("td", null, statusPill(s.status)), /*#__PURE__*/React.createElement("td", null, planById(s.plan).name), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm",
      onClick: () => cycleExposure(b.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: `pill ${admin.exposure[b.id] === '우대' ? 'accent' : 'muted'}`
    }, admin.exposure[b.id]))), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, b.followers.toLocaleString()), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, s.end), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "row-actions"
    }, /*#__PURE__*/React.createElement("a", {
      className: "abtn abtn-sm",
      href: `한빔커뮤니티.html`,
      title: "\uBBF8\uB2C8\uD648 \uBCF4\uAE30"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "link",
      size: 13,
      stroke: 2
    })), /*#__PURE__*/React.createElement("button", {
      className: `abtn abtn-sm ${s.status !== 'expired' ? 'abtn-danger' : ''}`,
      onClick: () => toggleSuspend(b.id)
    }, s.status === 'expired' ? '활성화' : '정지'))));
  }))))), adding && /*#__PURE__*/React.createElement(AddBizModal, {
    admin: admin,
    onClose: () => setAdding(false)
  }));
}
function AddBizModal({
  admin,
  onClose
}) {
  const [name, setName] = xS('');
  const [topic, setTopic] = xS('wedding');
  const [intro, setIntro] = xS('');
  const submit = () => {
    if (!name.trim()) {
      admin.toast('업체명을 입력하세요');
      return;
    }
    const id = 'b' + Date.now();
    BUSINESSES.push({
      id,
      name: name.trim(),
      topic,
      intro: intro.trim() || '한 줄 소개',
      official: 'example.kr',
      followers: 0,
      cover: name.trim() + ' 커버',
      logo: name.trim().slice(0, 2)
    });
    admin.setExposure(e => ({
      ...e,
      [id]: '기본'
    }));
    admin.setSubs(subs => [...subs, {
      bizId: id,
      plan: 'trial',
      status: 'trial',
      start: '2026-06-03',
      end: '2026-06-17',
      pg: '—',
      auto: false
    }]);
    admin.toast(`${name.trim()} 입점 완료 (14일 체험)`);
    onClose();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-modal-bg",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-modal-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-modal-t"
  }, "\uC5C5\uCCB4 \uC785\uC810"), /*#__PURE__*/React.createElement("button", {
    className: "abtn abtn-sm",
    onClick: onClose
  }, "\uB2EB\uAE30")), /*#__PURE__*/React.createElement("div", {
    className: "adm-modal-b"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", null, "\uC5C5\uCCB4\uBA85"), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "\uC608: \uBD04\uB0A0 \uC6E8\uB529\uD640"
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", null, "\uC8FC\uC81C"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, TOPICS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.key,
    className: "fchip",
    "data-on": topic === t.key,
    onClick: () => setTopic(t.key)
  }, t.label)))), /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", null, "\uD55C \uC904 \uC18C\uAC1C"), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: intro,
    onChange: e => setIntro(e.target.value),
    placeholder: "\uC5C5\uCCB4\uB97C \uD55C \uBB38\uC7A5\uC73C\uB85C"
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-field",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "\uAD6C\uB3C5"), /*#__PURE__*/React.createElement("div", {
    className: "pill trial",
    style: {
      background: 'var(--persimmon-tint)',
      color: 'var(--persimmon)'
    }
  }, "\uBB34\uB8CC \uCCB4\uD5D8 14\uC77C\uB85C \uC2DC\uC791"))), /*#__PURE__*/React.createElement("div", {
    className: "adm-modal-f"
  }, /*#__PURE__*/React.createElement("button", {
    className: "abtn",
    onClick: onClose
  }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement("button", {
    className: "abtn abtn-primary",
    onClick: submit
  }, "\uC785\uC810 \uB4F1\uB85D"))));
}

// ════════ 구독 결제 ════════
function AdminSubs({
  admin
}) {
  const active = admin.subs.filter(s => s.status === 'active');
  const trial = admin.subs.filter(s => s.status === 'trial');
  const expired = admin.subs.filter(s => s.status === 'expired');
  const mrr = active.reduce((s, x) => s + planById(x.plan).price, 0);
  const setPlan = (id, plan) => admin.setSubs(subs => subs.map(s => s.bizId === id ? {
    ...s,
    plan
  } : s));
  const toggleAuto = id => admin.setSubs(subs => subs.map(s => s.bizId === id ? {
    ...s,
    auto: !s.auto
  } : s));
  const renew = id => {
    admin.setSubs(subs => subs.map(s => {
      if (s.bizId !== id) return s;
      const d = new Date(s.end + 'T00:00:00');
      d.setMonth(d.getMonth() + 1);
      return {
        ...s,
        status: 'active',
        end: d.toISOString().slice(0, 10)
      };
    }));
    admin.toast('1개월 갱신 · 결제 완료');
  };
  const charge = id => admin.toast(`${bizById(id).name} 정기결제 완료`);
  const cancel = id => {
    admin.setSubs(subs => subs.map(s => s.bizId === id ? {
      ...s,
      status: 'expired',
      auto: false
    } : s));
    admin.toast('구독을 해지했어요');
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uC6D4 \uB9E4\uCD9C (MRR)"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, WON(mrr))), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uD65C\uC131 \uAD6C\uB3C5"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, active.length, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ink-faint)'
    }
  }, " \uACF3"))), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uCCB4\uD5D8 \uC911"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, trial.length, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ink-faint)'
    }
  }, " \uACF3"))), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uB9CC\uB8CC\xB7\uBBF8\uACB0\uC81C"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, expired.length, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ink-faint)'
    }
  }, " \uACF3"))))), /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec-t"
  }, "\uC694\uAE08\uC81C"), /*#__PURE__*/React.createElement("div", {
    className: "adm-sec-c"
  }, "\uC785\uC810 \uAD6C\uB3C5 \uB4F1\uAE09 \xB7 \uCD08\uAE30 \uB2E8\uC77C \u2192 \uB178\uCD9C \uB4F1\uAE09 \uBD84\uD654")), /*#__PURE__*/React.createElement("div", {
    className: "plan-grid"
  }, PLANS.map(p => {
    const cnt = admin.subs.filter(s => s.plan === p.id).length;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: `plan ${p.id === 'premium' ? 'featured' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "plan-name"
    }, /*#__PURE__*/React.createElement("span", {
      className: `tchip ${p.color}`
    }, p.name), p.id === 'premium' && /*#__PURE__*/React.createElement("span", {
      className: "pill accent"
    }, "\uCD94\uCC9C")), /*#__PURE__*/React.createElement("div", {
      className: "plan-price"
    }, p.price ? WON(p.price) : '무료', /*#__PURE__*/React.createElement("span", null, p.price ? ' / 월' : '')), /*#__PURE__*/React.createElement("div", {
      className: "plan-desc"
    }, p.desc), /*#__PURE__*/React.createElement("ul", {
      className: "plan-perks"
    }, p.perks.map((k, i) => /*#__PURE__*/React.createElement("li", {
      key: i
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      stroke: 2.4
    }), " ", k))), /*#__PURE__*/React.createElement("div", {
      className: "plan-count"
    }, "\uD604\uC7AC ", cnt, "\uAC1C \uC5C5\uCCB4"));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-title"
  }, "\uC5C5\uCCB4\uBCC4 \uAD6C\uB3C5"), /*#__PURE__*/React.createElement("div", {
    className: "adm-sec-c"
  }, admin.subs.length, "\uAC74")), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\uC5C5\uCCB4"), /*#__PURE__*/React.createElement("th", null, "\uC694\uAE08\uC81C"), /*#__PURE__*/React.createElement("th", null, "\uC0C1\uD0DC"), /*#__PURE__*/React.createElement("th", null, "\uC2DC\uC791\uC77C"), /*#__PURE__*/React.createElement("th", null, "\uB9CC\uB8CC\uC77C"), /*#__PURE__*/React.createElement("th", null, "\uC790\uB3D9\uACB0\uC81C"), /*#__PURE__*/React.createElement("th", null, "PG \uCC38\uC870"), /*#__PURE__*/React.createElement("th", null, "\uAD00\uB9AC"))), /*#__PURE__*/React.createElement("tbody", null, admin.subs.map(s => {
    const b = bizById(s.bizId);
    const d = daysTo(s.end);
    return /*#__PURE__*/React.createElement("tr", {
      key: s.bizId
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(BizCell, {
      biz: b
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("select", {
      style: selStyle,
      value: s.plan,
      onChange: e => setPlan(s.bizId, e.target.value)
    }, PLANS.map(p => /*#__PURE__*/React.createElement("option", {
      key: p.id,
      value: p.id
    }, p.name)))), /*#__PURE__*/React.createElement("td", null, statusPill(s.status), s.status !== 'expired' && d <= 14 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: `pill ${d <= 7 ? 'bad' : 'warn'}`
    }, "D-", d))), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, s.start), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, s.end), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: `sw ${s.auto ? 'on' : ''}`,
      onClick: () => toggleAuto(s.bizId)
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "mono"
    }, s.pg)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "row-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm",
      onClick: () => charge(s.bizId)
    }, "\uACB0\uC81C"), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm",
      onClick: () => renew(s.bizId)
    }, "\uAC31\uC2E0"), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm abtn-danger",
      onClick: () => cancel(s.bizId)
    }, "\uD574\uC9C0"))));
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-title"
  }, "\uCD5C\uADFC \uACB0\uC81C \uB0B4\uC5ED")), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\uACB0\uC81C\uC77C"), /*#__PURE__*/React.createElement("th", null, "\uC5C5\uCCB4"), /*#__PURE__*/React.createElement("th", null, "\uC694\uAE08\uC81C"), /*#__PURE__*/React.createElement("th", null, "\uAE08\uC561"), /*#__PURE__*/React.createElement("th", null, "\uC0C1\uD0DC"), /*#__PURE__*/React.createElement("th", null, "PG \uCC38\uC870"))), /*#__PURE__*/React.createElement("tbody", null, PAYMENTS.map((p, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, p.date), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(BizCell, {
    biz: bizById(p.bizId)
  })), /*#__PURE__*/React.createElement("td", null, planById(p.plan).name), /*#__PURE__*/React.createElement("td", {
    className: "num",
    style: {
      fontWeight: 800
    }
  }, WON(p.amount)), /*#__PURE__*/React.createElement("td", null, statusPill(p.status)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, p.pg))))))))));
}

// ════════ 게시글 관리 ════════
function AdminPosts({
  admin
}) {
  const [q, setQ] = xS('');
  const [tf, setTf] = xS('all');
  const toggleFeat = toggleSet(admin.setFeatured);
  const toggleHide = toggleSet(admin.setHidden);
  const reported = new Set(REPORTS.map(r => r.postId));
  const list = POSTS.filter(p => (tf === 'all' || p.topic === tf) && (!q || p.title.includes(q)));
  const TYPE = {
    review: '후기',
    question: '질문',
    info: '정보'
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    stroke: 2
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "\uC81C\uBAA9 \uAC80\uC0C9",
    value: q,
    onChange: e => setQ(e.target.value)
  })), [['all', '전체'], ...TOPICS.map(t => [t.key, t.label])].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "fchip",
    "data-on": tf === k,
    onClick: () => setTf(k)
  }, l)))), /*#__PURE__*/React.createElement("div", {
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\uC81C\uBAA9"), /*#__PURE__*/React.createElement("th", null, "\uC791\uC131\uC790"), /*#__PURE__*/React.createElement("th", null, "\uC8FC\uC81C"), /*#__PURE__*/React.createElement("th", null, "\uBD84\uB958"), /*#__PURE__*/React.createElement("th", null, "\uBC18\uC751"), /*#__PURE__*/React.createElement("th", null, "\uC0C1\uD0DC"), /*#__PURE__*/React.createElement("th", null, "\uAD00\uB9AC"))), /*#__PURE__*/React.createElement("tbody", null, list.map(p => {
    const hidden = admin.hidden.has(p.id);
    const feat = admin.featured.has(p.id);
    const rep = reported.has(p.id);
    return /*#__PURE__*/React.createElement("tr", {
      key: p.id
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        maxWidth: 280
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, p.title), rep && /*#__PURE__*/React.createElement("span", {
      className: "pill bad",
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "flame",
      size: 11,
      fill: true
    }), " \uC2E0\uACE0 ", REPORTS.find(r => r.postId === p.id).by)), /*#__PURE__*/React.createElement("td", null, p.author), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: `tchip ${topicOf(p.topic).cls}`
    }, topicOf(p.topic).label)), /*#__PURE__*/React.createElement("td", null, TYPE[p.type]), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 12,
      stroke: 2,
      style: {
        verticalAlign: '-1px'
      }
    }), " ", p.likes, " \xB7 ", /*#__PURE__*/React.createElement(Icon, {
      name: "chat",
      size: 12,
      stroke: 2,
      style: {
        verticalAlign: '-1px'
      }
    }), " ", p.comments), /*#__PURE__*/React.createElement("td", null, hidden ? /*#__PURE__*/React.createElement("span", {
      className: "pill muted"
    }, "\uC228\uAE40") : /*#__PURE__*/React.createElement("span", {
      className: "pill ok"
    }, "\uB178\uCD9C"), feat && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pill accent"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "spark",
      size: 11
    }), " \uCD94\uCC9C"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "row-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm",
      onClick: () => {
        toggleFeat(p.id);
        admin.toast(feat ? '추천 해제' : '오늘의 추천 등록');
      }
    }, feat ? '추천 해제' : '추천'), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm",
      onClick: () => {
        toggleHide(p.id);
        admin.toast(hidden ? '다시 노출' : '숨김 처리');
      }
    }, hidden ? '노출' : '숨김'), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm abtn-danger",
      onClick: () => admin.toast('삭제했어요 (데모)')
    }, "\uC0AD\uC81C"))));
  }))))));
}

// ════════ 소식·신호층 ════════
function AdminSignals({
  admin
}) {
  const TYPE = {
    newproduct: '신제품',
    event: '이벤트',
    daily: '소식'
  };
  const onCount = Object.values(admin.signals).filter(Boolean).length;
  const toggleSig = id => admin.setSignals(s => ({
    ...s,
    [id]: !s[id]
  }));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-row",
    style: {
      gridTemplateColumns: 'repeat(3,1fr)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uC804\uCCB4 \uC18C\uC2DD"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, NEWS.length)), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uBD88 \uCF1C\uC9D0 (\uC2E0\uD638)"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v",
    style: {
      color: 'var(--persimmon)'
    }
  }, onCount)), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uC2E0\uD638 \uADDC\uCE59"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v",
    style: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.4
    }
  }, "\uC2E0\uC81C\uD488\xB7\uC774\uBCA4\uD2B8\uB9CC", /*#__PURE__*/React.createElement("br", null), "\uC2E0\uD638 \uB300\uC0C1")))), /*#__PURE__*/React.createElement("div", {
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-title"
  }, "\uC5C5\uCCB4 \uC18C\uC2DD \xB7 \uC2E0\uD638\uCE35 \uC81C\uC5B4"), /*#__PURE__*/React.createElement("div", {
    className: "adm-sec-c"
  }, "\uBD88\uC744 \uB044\uBA74 \uC0C1\uC2DC\uCE35\uC73C\uB85C \uAC00\uB77C\uC549\uC544\uC694")), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\uC5C5\uCCB4"), /*#__PURE__*/React.createElement("th", null, "\uC18C\uC2DD \uC81C\uBAA9"), /*#__PURE__*/React.createElement("th", null, "\uC720\uD615"), /*#__PURE__*/React.createElement("th", null, "\uB4F1\uB85D"), /*#__PURE__*/React.createElement("th", null, "\uC2E0\uD638(\uBD88)"))), /*#__PURE__*/React.createElement("tbody", null, NEWS.map(n => {
    const b = bizById(n.bizId);
    const on = admin.signals[n.id];
    const can = n.type !== 'daily';
    return /*#__PURE__*/React.createElement("tr", {
      key: n.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(BizCell, {
      biz: b
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        maxWidth: 300
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: 600
      }
    }, n.title)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: `pill ${n.type === 'daily' ? 'muted' : 'accent'}`
    }, TYPE[n.type])), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, n.time), /*#__PURE__*/React.createElement("td", null, can ? /*#__PURE__*/React.createElement("button", {
      className: `sw ${on ? 'on' : ''}`,
      onClick: () => toggleSig(n.id)
    }) : /*#__PURE__*/React.createElement("span", {
      className: "cell-sub"
    }, "\uB300\uC0C1 \uC544\uB2D8")));
  }))))));
}

// ════════ 사용자 ════════
function AdminUsers({
  admin
}) {
  const [q, setQ] = xS('');
  const seed = USERS.filter(u => u.source === '시드DB').length;
  const dormant = USERS.filter(u => u.status === '휴면').length;
  const list = USERS.filter(u => !q || u.name.includes(q) || u.phone.includes(q));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uCD1D \uC0AC\uC6A9\uC790"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, STATS.users.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uC2DC\uB4DC DB"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, STATS.seedUsers)), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uC774\uBC88 \uC8FC \uC2E0\uADDC"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v",
    style: {
      color: 'var(--ok)'
    }
  }, STATS.usersDelta)), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uD734\uBA74(\uD45C\uBCF8)"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, dormant)))), /*#__PURE__*/React.createElement("div", {
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-title"
  }, "\uC0AC\uC6A9\uC790 (\uD45C\uBCF8)"), /*#__PURE__*/React.createElement("div", {
    className: "adm-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    stroke: 2
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "\uC774\uB984\xB7\uC5F0\uB77D\uCC98",
    value: q,
    onChange: e => setQ(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\uC774\uB984"), /*#__PURE__*/React.createElement("th", null, "\uC5F0\uB77D\uCC98"), /*#__PURE__*/React.createElement("th", null, "\uC608\uC2DD\uC77C"), /*#__PURE__*/React.createElement("th", null, "\uAC00\uC785 \uACBD\uB85C"), /*#__PURE__*/React.createElement("th", null, "\uAC00\uC785\uC77C"), /*#__PURE__*/React.createElement("th", null, "\uC0C1\uD0DC"), /*#__PURE__*/React.createElement("th", null, "\uAD00\uB9AC"))), /*#__PURE__*/React.createElement("tbody", null, list.map(u => /*#__PURE__*/React.createElement("tr", {
    key: u.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 700
    }
  }, u.name), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, u.phone)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, u.wedding), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `pill ${u.source === '시드DB' ? 'accent' : 'muted'}`
  }, u.source)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, u.joined), /*#__PURE__*/React.createElement("td", null, statusPill(u.status)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "abtn abtn-sm",
    onClick: () => admin.toast(`${u.name} 상세 (데모)`)
  }, "\uC0C1\uC138"), /*#__PURE__*/React.createElement("button", {
    className: "abtn abtn-sm abtn-danger",
    onClick: () => admin.toast('정지 처리 (데모)')
  }, "\uC815\uC9C0"))))))))));
}

// ════════ 소모임 ════════
function AdminGroups({
  admin
}) {
  const [q, setQ] = xS('');
  const [gstatus, setGstatus] = xS(() => Object.fromEntries(GROUPS.map(g => [g.id, g.status || 'active'])));
  const approve = id => {
    setGstatus(s => ({
      ...s,
      [id]: 'active'
    }));
    admin.toast('모임을 승인했어요 — 이제 공개돼요');
  };
  const reject = id => {
    setGstatus(s => ({
      ...s,
      [id]: 'rejected'
    }));
    admin.toast('모임 신청을 반려했어요');
  };
  const pendingList = GROUPS.filter(g => gstatus[g.id] === 'pending');
  const totalMembers = GROUPS.reduce((s, g) => s + g.members, 0);
  const totalPosts = GROUPS.reduce((s, g) => s + groupPostsOf(g.id).length, 0);
  const toggleHide = toggleSet(admin.setGroupHidden);
  const toggleFeat = toggleSet(admin.setGroupFeat);
  const list = GROUPS.filter(g => gstatus[g.id] !== 'pending' && (!q || g.name.includes(q)));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uC804\uCCB4 \uBAA8\uC784"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, GROUPS.length)), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uCD1D \uBA64\uBC84"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, totalMembers.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uAC8C\uC2DC\uAE00"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v"
  }, totalPosts)), /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-l"
  }, "\uC2B9\uC778 \uB300\uAE30"), /*#__PURE__*/React.createElement("div", {
    className: "metric-v",
    style: {
      color: pendingList.length ? 'var(--bad)' : 'var(--ink)'
    }
  }, pendingList.length)))), pendingList.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "block",
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-title"
  }, "\uC2B9\uC778 \uB300\uAE30 \xB7 \uC0C8 \uBAA8\uC784"), /*#__PURE__*/React.createElement("span", {
    className: "pill warn"
  }, pendingList.length, "\uAC74")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 18px 14px'
    }
  }, pendingList.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.id,
    className: "mini-row"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      background: 'var(--surface-2)',
      flexShrink: 0
    }
  }, g.emoji), /*#__PURE__*/React.createElement("div", {
    className: "grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, g.name, " ", /*#__PURE__*/React.createElement("span", {
    className: `tchip ${topicOf(g.topic).cls}`,
    style: {
      marginLeft: 4
    }
  }, topicOf(g.topic).label)), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, g.desc, " \xB7 \uC2E0\uCCAD\uC790 ", g.ownerName || '사용자')), /*#__PURE__*/React.createElement("div", {
    className: "row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "abtn abtn-sm abtn-primary",
    onClick: () => approve(g.id)
  }, "\uC2B9\uC778"), /*#__PURE__*/React.createElement("button", {
    className: "abtn abtn-sm abtn-danger",
    onClick: () => reject(g.id)
  }, "\uBC18\uB824")))))), /*#__PURE__*/React.createElement("div", {
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-title"
  }, "\uC18C\uBAA8\uC784 \uBAA9\uB85D"), /*#__PURE__*/React.createElement("div", {
    className: "adm-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    stroke: 2
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "\uBAA8\uC784\uBA85 \uAC80\uC0C9",
    value: q,
    onChange: e => setQ(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tbl-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\uBAA8\uC784"), /*#__PURE__*/React.createElement("th", null, "\uCE74\uD14C\uACE0\uB9AC"), /*#__PURE__*/React.createElement("th", null, "\uBA64\uBC84"), /*#__PURE__*/React.createElement("th", null, "\uAC8C\uC2DC\uAE00"), /*#__PURE__*/React.createElement("th", null, "\uC0C1\uD0DC"), /*#__PURE__*/React.createElement("th", null, "\uAD00\uB9AC"))), /*#__PURE__*/React.createElement("tbody", null, list.map(g => {
    const hidden = admin.groupHidden.has(g.id);
    const feat = admin.groupFeat.has(g.id);
    return /*#__PURE__*/React.createElement("tr", {
      key: g.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "cell-biz"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        background: 'var(--surface-2)',
        flexShrink: 0
      }
    }, g.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "nm"
    }, g.name), /*#__PURE__*/React.createElement("div", {
      className: "cell-sub"
    }, g.desc)))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: `tchip ${topicOf(g.topic).cls}`
    }, topicOf(g.topic).label)), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, g.members.toLocaleString()), /*#__PURE__*/React.createElement("td", {
      className: "num"
    }, groupPostsOf(g.id).length), /*#__PURE__*/React.createElement("td", null, hidden ? /*#__PURE__*/React.createElement("span", {
      className: "pill muted"
    }, "\uC228\uAE40") : /*#__PURE__*/React.createElement("span", {
      className: "pill ok"
    }, "\uB178\uCD9C"), feat && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pill accent"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "spark",
      size: 11
    }), " \uCD94\uCC9C"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "row-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm",
      onClick: () => {
        toggleFeat(g.id);
        admin.toast(feat ? '추천 해제' : '추천 모임 등록');
      }
    }, feat ? '추천 해제' : '추천'), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm",
      onClick: () => {
        toggleHide(g.id);
        admin.toast(hidden ? '다시 노출' : '숨김 처리');
      }
    }, hidden ? '노출' : '숨김'), /*#__PURE__*/React.createElement("button", {
      className: "abtn abtn-sm abtn-danger",
      onClick: () => admin.toast('모임 폐쇄 (데모)')
    }, "\uD3D0\uC1C4"))));
  }))))));
}
Object.assign(window, {
  AdminBusinesses,
  AdminSubs,
  AdminPosts,
  AdminSignals,
  AdminUsers,
  AdminGroups
});