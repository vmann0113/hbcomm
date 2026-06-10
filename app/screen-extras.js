// ── 한빔커뮤니티 · 가입 유치 세트 (쿠폰·체크리스트·환영·입점) ──
const {
  useState: uX
} = React;
function dformat(s) {
  const [y, m, d] = s.split('-');
  return `${y}.${m}.${d}`;
}

// ════════════ 가입 환영 모달 ════════════
function WelcomeModal({
  app,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sheet-wrap",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "welcome",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "wel-confetti",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("span", null, "\u2728"), /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF8A"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC9C")), /*#__PURE__*/React.createElement("div", {
    className: "wel-badge bob"
  }, "\uD83C\uDF81"), /*#__PURE__*/React.createElement("div", {
    className: "wel-title"
  }, "\uD55C\uBE54\uD55C\uBCF5 \uACE0\uAC1D\uB2D8,", /*#__PURE__*/React.createElement("br", null), "\uD658\uC601\uD574\uC694!"), /*#__PURE__*/React.createElement("div", {
    className: "wel-note"
  }, "\uAC00\uC785 \uC120\uBB3C\uB85C ", /*#__PURE__*/React.createElement("b", null, "\uD560\uC778 \uCFE0\uD3F0 3\uC7A5"), "\uACFC", /*#__PURE__*/React.createElement("br", null), "\uACB0\uD63C \uC900\uBE44 \uB3C4\uAD6C\uB97C \uBAA8\uB450 \uB4DC\uB824\uC694"), /*#__PURE__*/React.createElement("div", {
    className: "wel-gifts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wel-gift"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wel-gift-ic rose"
  }, "\uD83C\uDF9F\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "wel-gift-t"
  }, "\uD55C\uBE54\uD55C\uBCF5 \uD560\uC778 \uCFE0\uD3F0 3\uC7A5"), /*#__PURE__*/React.createElement("div", {
    className: "wel-gift-s"
  }, "\uCCAB \uB300\uC5EC 20% \uD3EC\uD568"))), /*#__PURE__*/React.createElement("div", {
    className: "wel-gift"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wel-gift-ic sky"
  }, "\u2705"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "wel-gift-t"
  }, "\uACB0\uD63C \uC900\uBE44 \uCCB4\uD06C\uB9AC\uC2A4\uD2B8"), /*#__PURE__*/React.createElement("div", {
    className: "wel-gift-s"
  }, "D-day \uB9DE\uCDA4 \uD560 \uC77C"))), /*#__PURE__*/React.createElement("div", {
    className: "wel-gift"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wel-gift-ic sun"
  }, "\uD83E\uDD47"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "wel-gift-t"
  }, "1\uAE30 \uD30C\uC6B4\uB529 \uBA64\uBC84 \uBC30\uC9C0"), /*#__PURE__*/React.createElement("div", {
    className: "wel-gift-s"
  }, "\uC9C0\uAE08 \uAC00\uC785\uD55C \uBD84\uB9CC")))), /*#__PURE__*/React.createElement("button", {
    className: "wel-cta",
    onClick: () => {
      onClose();
      app.openWallet();
    }
  }, "\uC120\uBB3C \uBC1B\uACE0 \uC2DC\uC791\uD558\uAE30 \uD83C\uDF88"), /*#__PURE__*/React.createElement("button", {
    className: "wel-skip",
    onClick: onClose
  }, "\uB098\uC911\uC5D0 \uBCFC\uAC8C\uC694")));
}

// ════════════ 쿠폰 카드 ════════════
function CouponCard({
  coupon,
  app,
  wide = false
}) {
  const biz = bizById(coupon.bizId);
  return /*#__PURE__*/React.createElement("div", {
    className: `coupon ${coupon.highlight ? 'hot' : ''} ${wide ? 'wide' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "coupon-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "coupon-tag"
  }, coupon.tag), /*#__PURE__*/React.createElement("div", {
    className: "coupon-title"
  }, coupon.title), /*#__PURE__*/React.createElement("div", {
    className: "coupon-biz"
  }, biz.name, " \xB7 ~", dformat(coupon.expire))), /*#__PURE__*/React.createElement("div", {
    className: "coupon-stub"
  }, /*#__PURE__*/React.createElement("button", {
    className: "coupon-use",
    onClick: () => app.toast(`쿠폰 코드 ${coupon.code} · 공식 사이트에서 사용`)
  }, "\uC0AC\uC6A9"), /*#__PURE__*/React.createElement("div", {
    className: "coupon-code"
  }, coupon.code)));
}

// ── 홈: 쿠폰 스트립 ──
function CouponStrip({
  app
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "panel coupon-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, "\uD83C\uDF9F\uFE0F \uB0B4 \uCFE0\uD3F0 \uC9C0\uAC11 ", /*#__PURE__*/React.createElement("span", {
    className: "faint",
    style: {
      fontFamily: 'var(--font)',
      fontWeight: 800,
      fontSize: 13
    }
  }, COUPONS.length)), /*#__PURE__*/React.createElement("span", {
    className: "section-cap link",
    onClick: () => app.openWallet()
  }, "\uC804\uCCB4 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "coupon-rail no-sb"
  }, COUPONS.map(c => /*#__PURE__*/React.createElement(CouponCard, {
    key: c.id,
    coupon: c,
    app: app
  }))));
}

// ── 쿠폰 지갑 (전체 화면) ──
function WalletScreen({
  app
}) {
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
  }), " \uB0B4 \uACF5\uAC04")), /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-h1"
  }, "\uB0B4 \uCFE0\uD3F0 \uC9C0\uAC11"), /*#__PURE__*/React.createElement("div", {
    className: "page-sub"
  }, "\uAC00\uC785 \uC120\uBB3C\uB85C \uBC1B\uC740 \uD560\uC778 \uCFE0\uD3F0\uC774\uC5D0\uC694. \uC0AC\uC6A9\uC740 \uAC01 \uC5C5\uCCB4 \uACF5\uC2DD \uC0AC\uC774\uD2B8\uC5D0\uC11C.")), /*#__PURE__*/React.createElement("div", {
    className: "wallet-list"
  }, COUPONS.map(c => /*#__PURE__*/React.createElement(CouponCard, {
    key: c.id,
    coupon: c,
    app: app,
    wide: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "board-note"
  }, "\uCFE0\uD3F0\uC740 \uD55C\uBE54\uD55C\uBCF5 \uACF5\uC2DD \uC0AC\uC774\uD2B8 \uACB0\uC81C \uC2DC \uCF54\uB4DC \uC785\uB825\uC73C\uB85C \uC801\uC6A9\uB3FC\uC694 \xB7 \uC911\uBCF5 \uC0AC\uC6A9 \uBD88\uAC00."));
}

// ════════════ 결혼 준비 체크리스트 ════════════
function ChecklistWidget({
  app
}) {
  const done = CHECKLIST.flatMap(g => g.items).filter(i => app.checked.has(i.id)).length;
  const pct = Math.round(done / CHECKLIST_TOTAL * 100);
  return /*#__PURE__*/React.createElement("button", {
    className: "check-widget pop",
    onClick: () => app.openChecklist()
  }, /*#__PURE__*/React.createElement("div", {
    className: "cw-ring",
    style: {
      background: `conic-gradient(var(--grape) ${pct * 3.6}deg, var(--surface-2) 0)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cw-ring-in"
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cw-title"
  }, "\uACB0\uD63C \uC900\uBE44 \uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \u2705"), /*#__PURE__*/React.createElement("div", {
    className: "cw-sub"
  }, CHECKLIST_TOTAL, "\uAC1C \uC911 ", /*#__PURE__*/React.createElement("b", null, done, "\uAC1C"), " \uC644\uB8CC \xB7 \uACC4\uC18D \uD574\uBCFC\uAE4C\uC694?")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 18,
    stroke: 2.4,
    style: {
      color: 'var(--ink-faint)',
      flexShrink: 0
    }
  }));
}
function ChecklistScreen({
  app
}) {
  const allItems = CHECKLIST.flatMap(g => g.items);
  const done = allItems.filter(i => app.checked.has(i.id)).length;
  const pct = Math.round(done / CHECKLIST_TOTAL * 100);
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
  }), " \uB0B4 \uACF5\uAC04")), /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-h1"
  }, "\uACB0\uD63C \uC900\uBE44 \uCCB4\uD06C\uB9AC\uC2A4\uD2B8"), /*#__PURE__*/React.createElement("div", {
    className: "page-sub"
  }, "D-day\uC5D0 \uB9DE\uCD98 \uD560 \uC77C\uC774\uC5D0\uC694. \uD558\uB098\uC529 \uCCB4\uD06C\uD558\uBA74 \uC2A4\uD0EC\uD504\uAC00 \uC313\uC5EC\uC694 \uD83C\uDFAF")), /*#__PURE__*/React.createElement("div", {
    className: "check-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp-top"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, done), " / ", CHECKLIST_TOTAL, " \uC644\uB8CC"), /*#__PURE__*/React.createElement("span", {
    className: "cp-pct"
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    className: "lv-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lv-bar-fill",
    style: {
      width: pct + '%'
    }
  }))), CHECKLIST.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi,
    className: "check-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "check-phase"
  }, /*#__PURE__*/React.createElement("span", {
    className: "check-phase-ic"
  }, g.emoji), " ", g.phase), /*#__PURE__*/React.createElement("div", {
    className: "check-items"
  }, g.items.map(it => {
    const on = app.checked.has(it.id);
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      className: `check-item ${on ? 'on' : ''}`,
      onClick: () => {
        app.toggleCheck(it.id);
        if (!on) app.toast('체크 완료! +10 XP 🎉');
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "check-box"
    }, on && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15,
      stroke: 3
    })), /*#__PURE__*/React.createElement("span", {
      className: "check-label"
    }, it.label));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "board-note"
  }, "\uD55C\uBE54\uD55C\uBCF5\uC774 \uC9C1\uC811 \uC815\uB9AC\uD55C \uB2E8\uACC4\uC608\uC694 \xB7 \uC5C5\uCCB4\uAC00 \uB298\uC5B4\uB098\uBA74 \uCD94\uCC9C \uD560 \uC77C\uB3C4 \uB354 \uD48D\uC131\uD574\uC838\uC694."));
}

// ════════════ 입점 신청 모달 ════════════
function JoinBizModal({
  app,
  onClose
}) {
  const [name, setName] = uX('');
  const [cat, setCat] = uX('wedding');
  const submit = () => {
    if (!name.trim()) {
      app.toast('업체명을 입력해주세요');
      return;
    }
    app.toast('1호 입점 신청이 접수됐어요. 곧 연락드릴게요 🎉');
    onClose();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sheet-wrap",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet",
    onClick: e => e.stopPropagation(),
    style: {
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-head"
  }, /*#__PURE__*/React.createElement("button", {
    className: "sheet-x",
    onClick: onClose
  }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement("div", {
    className: "sheet-title"
  }, "1\uD638 \uC785\uC810 \uC2E0\uCCAD"), /*#__PURE__*/React.createElement("button", {
    className: "sheet-ok",
    onClick: submit
  }, "\uC2E0\uCCAD")), /*#__PURE__*/React.createElement("div", {
    className: "sheet-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-hero"
  }, "\uD83E\uDEA7 \uD55C\uBE54\uCEE4\uBBA4\uB2C8\uD2F0 ", /*#__PURE__*/React.createElement("b", null, "1\uD638 \uC785\uC810"), ", \uC774\uB807\uAC8C \uB3C4\uC640\uB4DC\uB824\uC694"), /*#__PURE__*/React.createElement("div", {
    className: "join-perks"
  }, /*#__PURE__*/React.createElement("div", {
    className: "join-perk"
  }, /*#__PURE__*/React.createElement("span", {
    className: "jp-ic rose"
  }, "\uD83C\uDFA8"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\uBBF8\uB2C8\uD648 \uBB34\uB8CC \uC81C\uC791"), /*#__PURE__*/React.createElement("div", {
    className: "jp-s"
  }, "\uC0AC\uC9C4\xB7\uC18C\uAC1C\uB9CC \uC8FC\uC2DC\uBA74 \uC800\uD76C\uAC00 \uAFB8\uBA70\uB4DC\uB824\uC694"))), /*#__PURE__*/React.createElement("div", {
    className: "join-perk"
  }, /*#__PURE__*/React.createElement("span", {
    className: "jp-ic sky"
  }, "\u270D\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\uCF58\uD150\uCE20 \uC791\uC131 \uB300\uD589"), /*#__PURE__*/React.createElement("div", {
    className: "jp-s"
  }, "\uAC00\uC774\uB4DC\xB7\uC18C\uC2DD\uC744 \uB300\uC2E0 \uC62C\uB824\uB4DC\uB824\uC694"))), /*#__PURE__*/React.createElement("div", {
    className: "join-perk"
  }, /*#__PURE__*/React.createElement("span", {
    className: "jp-ic sun"
  }, "\uD83D\uDCB8"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\uAD11\uACE0\uBE44 0\uC6D0"), /*#__PURE__*/React.createElement("div", {
    className: "jp-s"
  }, "\uC2E4\uC81C \uACE0\uAC1D \uD6C4\uAE30\uAC00 \uBBF8\uB2C8\uD648 \uC790\uC0B0\uC73C\uB85C \uC313\uC5EC\uC694")))), /*#__PURE__*/React.createElement("div", {
    className: "field-label",
    style: {
      marginTop: 18
    }
  }, "\uC5C5\uCCB4\uBA85"), /*#__PURE__*/React.createElement("input", {
    className: "sheet-input",
    placeholder: "\uC608) \uD55C\uBE54\uD55C\uBCF5",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, "\uCE74\uD14C\uACE0\uB9AC"), /*#__PURE__*/React.createElement("div", {
    className: "topictabs"
  }, TOPICS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.key,
    className: `topictab ${cat === t.key ? 'active' : ''}`,
    onClick: () => setCat(t.key)
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    className: "sheet-hint"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "store",
    size: 13,
    stroke: 2
  }), " \uC2E0\uCCAD\uD558\uBA74 \uB2F4\uB2F9\uC790\uAC00 \uC5F0\uB77D\uB4DC\uB824 \uBBF8\uB2C8\uD648\uC744 \uD568\uAED8 \uB9CC\uB4E4\uC5B4\uC694. \uC608\uC57D\xB7\uACB0\uC81C\uB294 \uACF5\uC2DD \uC0AC\uC774\uD2B8 \uC5F0\uACB0."))));
}

// ════════════ 미니홈 거리 빈 상태 (곧 입점) ════════════
const COMING_SOON = [{
  emoji: '🎂',
  label: '돌상·파티'
}, {
  emoji: '🏫',
  label: '교육·학원'
}, {
  emoji: '🍼',
  label: '산후조리'
}, {
  emoji: '📷',
  label: '성장앨범'
}];
function StreetComingSoon({
  app
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "coming-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "coming-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "coming-title"
  }, "\uD83E\uDEA7 \uACE7 \uBB38 \uC5EC\uB294 \uBBF8\uB2C8\uD648"), /*#__PURE__*/React.createElement("div", {
    className: "coming-sub"
  }, "\uC785\uC810 \uC900\uBE44 \uC911\uC778 \uCE74\uD14C\uACE0\uB9AC\uC608\uC694. 1\uD638 \uC5C5\uCCB4\uB97C \uBAA8\uC9D1\uD558\uACE0 \uC788\uC5B4\uC694.")), /*#__PURE__*/React.createElement("div", {
    className: "coming-grid"
  }, COMING_SOON.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "coming-tile"
  }, /*#__PURE__*/React.createElement("span", {
    className: "coming-emoji"
  }, c.emoji), /*#__PURE__*/React.createElement("span", {
    className: "coming-label"
  }, c.label), /*#__PURE__*/React.createElement("span", {
    className: "coming-flag"
  }, "\uC900\uBE44\uC911")))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary coming-cta",
    onClick: () => app.openJoin()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "store",
    size: 17,
    stroke: 2
  }), " \uC6B0\uB9AC \uAC00\uAC8C 1\uD638\uB85C \uC785\uC810 \uC2E0\uCCAD"));
}
Object.assign(window, {
  WelcomeModal,
  CouponCard,
  CouponStrip,
  WalletScreen,
  ChecklistWidget,
  ChecklistScreen,
  JoinBizModal,
  StreetComingSoon
});