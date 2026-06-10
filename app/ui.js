function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ── 한빔커뮤니티 · UI primitives & icons ─────────────────────
const {
  useState,
  useEffect,
  useRef
} = React;

// ── inline icon set (stroke, currentColor) ──────────────────
function Icon({
  name,
  size = 22,
  fill = false,
  stroke = 1.8,
  style
}) {
  const p = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style
  };
  switch (name) {
    case 'home':
      return /*#__PURE__*/React.createElement("svg", _extends({}, p, {
        fill: fill ? 'currentColor' : 'none',
        stroke: fill ? 'none' : 'currentColor'
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 10.5 12 3l9 7.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"
      }));
    case 'plaza':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "8.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3.5 12h17M12 3.5c2.4 2.3 2.4 14.7 0 17M12 3.5c-2.4 2.3-2.4 14.7 0 17"
      }));
    case 'store':
      return /*#__PURE__*/React.createElement("svg", _extends({}, p, {
        fill: fill ? 'currentColor' : 'none',
        stroke: fill ? 'none' : 'currentColor'
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4 9h16l-1-5H5L4 9Z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 9v11h14V9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9.5 20v-5h5v5"
      }));
    case 'bell':
      return /*#__PURE__*/React.createElement("svg", _extends({}, p, {
        fill: fill ? 'currentColor' : 'none',
        stroke: fill ? 'none' : 'currentColor'
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M10 20a2 2 0 0 0 4 0"
      }));
    case 'user':
      return /*#__PURE__*/React.createElement("svg", _extends({}, p, {
        fill: fill ? 'currentColor' : 'none',
        stroke: fill ? 'none' : 'currentColor'
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "8",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4.5 20a7.5 7.5 0 0 1 15 0"
      }));
    case 'search':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("circle", {
        cx: "11",
        cy: "11",
        r: "7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m20 20-3.5-3.5"
      }));
    case 'back':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M15 5l-7 7 7 7"
      }));
    case 'heart':
      return /*#__PURE__*/React.createElement("svg", _extends({}, p, {
        fill: fill ? 'currentColor' : 'none',
        stroke: fill ? 'none' : 'currentColor'
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 20s-7-4.6-9.2-9C1.3 8 2.8 4.7 6 4.7c2 0 3.2 1.4 4 2.6.8-1.2 2-2.6 4-2.6 3.2 0 4.7 3.3 3.2 6.3C19 15.4 12 20 12 20Z"
      }));
    case 'chat':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M4 5h16v11H8l-4 3V5Z"
      }));
    case 'scrap':
      return /*#__PURE__*/React.createElement("svg", _extends({}, p, {
        fill: fill ? 'currentColor' : 'none',
        stroke: fill ? 'none' : 'currentColor'
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6 3h12v18l-6-4-6 4V3Z"
      }));
    case 'link':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M9 15l6-6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M11 6l1-1a4 4 0 0 1 6 6l-1 1"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M13 18l-1 1a4 4 0 0 1-6-6l1-1"
      }));
    case 'plus':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M12 5v14M5 12h14"
      }));
    case 'pen':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M14 4l6 6L9 21l-6 1 1-6L14 4Z"
      }));
    case 'tag':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M3 12V4h8l9 9-8 8-9-9Z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "7.5",
        cy: "7.5",
        r: "1.4",
        fill: "currentColor",
        stroke: "none"
      }));
    case 'check':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M4 12l5 5 11-11"
      }));
    case 'chevron':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M9 5l7 7-7 7"
      }));
    case 'spark':
      return /*#__PURE__*/React.createElement("svg", _extends({}, p, {
        fill: "currentColor",
        stroke: "none"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 2l1.8 5.6L19 9l-4.2 2.4L13 17l-1-5.6L7 9l5.2-1.4L12 2Z"
      }));
    case 'flame':
      return /*#__PURE__*/React.createElement("svg", _extends({}, p, {
        fill: fill ? 'currentColor' : 'none',
        stroke: fill ? 'none' : 'currentColor'
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 3c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.4-2-1-3 .3 2-1 3-1 3 .6-3-2-5-4-7Z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 21a6 6 0 0 0 6-6c0-1.5-.6-3-1.6-4.2C16 13 14 13 14 13c1-3-2-7-2-7"
      }));
    case 'dots':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("circle", {
        cx: "5",
        cy: "12",
        r: "1.4",
        fill: "currentColor"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "1.4",
        fill: "currentColor"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "19",
        cy: "12",
        r: "1.4",
        fill: "currentColor"
      }));
    case 'send':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("path", {
        d: "M4 12l16-7-7 16-2-7-7-2Z"
      }));
    case 'people':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("circle", {
        cx: "9",
        cy: "9",
        r: "3.2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3.5 19a5.5 5.5 0 0 1 11 0"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 6.5a3 3 0 0 1 0 5.8M17.5 19a5.5 5.5 0 0 0-2.5-4.6"
      }));
    case 'image':
      return /*#__PURE__*/React.createElement("svg", p, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "4.5",
        width: "18",
        height: "15",
        rx: "2.5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "8.5",
        cy: "10",
        r: "1.7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M21 15.5 16 11 5.5 19.5"
      }));
    default:
      return null;
  }
}

// ── striped placeholder image (renders real image when src given) ──
function Ph({
  label,
  topic,
  style,
  className = '',
  children,
  src
}) {
  const cls = topic ? topicOf(topic)?.cls : '';
  return /*#__PURE__*/React.createElement("div", {
    className: `ph ${cls} ${className}`,
    style: style
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: label || '',
    loading: "lazy",
    className: "ph-img"
  }) : label && /*#__PURE__*/React.createElement("span", {
    className: "ph-label"
  }, label), children);
}

// ── topic chip ──────────────────────────────────────────────
function TopicChip({
  topic
}) {
  const t = topicOf(topic);
  if (!t) return null;
  return /*#__PURE__*/React.createElement("span", {
    className: `tchip ${t.cls}`
  }, t.label);
}
const TYPE_LABEL = {
  review: '후기',
  question: '질문',
  info: '정보'
};
function TypeTag({
  type
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `ttag ${type === 'review' ? 'review' : ''}`
  }, TYPE_LABEL[type]);
}

// ── business logo avatar ────────────────────────────────────
function BizLogo({
  biz,
  size = 52,
  ring = 'none'
}) {
  const t = topicOf(biz.topic);
  const inner = /*#__PURE__*/React.createElement(Ph, {
    topic: biz.topic,
    style: {
      width: size,
      height: size,
      borderRadius: '50%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      fontWeight: 800,
      fontSize: size * 0.3,
      color: `var(--t-${t.cls})`,
      letterSpacing: '-0.5px',
      whiteSpace: 'nowrap'
    }
  }, biz.logo));
  if (ring === 'none') return inner;
  return /*#__PURE__*/React.createElement("div", {
    className: `ring ${ring === 'on' ? 'on' : 'off'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "ring-inner"
  }, inner));
}

// ── follow button (controlled) ──────────────────────────────
function FollowBtn({
  following,
  onToggle,
  size = 'md'
}) {
  const pad = size === 'sm' ? '7px 14px' : '10px 20px';
  const fs = size === 'sm' ? 13 : 14;
  return /*#__PURE__*/React.createElement("button", {
    className: `btn ${following ? 'btn-ghost following' : 'btn-primary'}`,
    style: {
      padding: pad,
      fontSize: fs
    },
    onClick: e => {
      e.stopPropagation();
      onToggle();
    }
  }, following ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    stroke: 2.4
  }), " \uD314\uB85C\uC789") : '+ 팔로우');
}

// ── signal layer story-ring rail ────────────────────────────
// items: [{biz, news}] — '불 켜진' 업체
function SignalRail({
  items,
  onOpen,
  emptyText
}) {
  if (!items.length) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '2px 2px 16px',
        color: 'var(--ink-faint)',
        fontSize: 13.5
      }
    }, emptyText);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "rail no-sb"
  }, items.map(({
    biz,
    news
  }) => /*#__PURE__*/React.createElement("button", {
    key: biz.id,
    onClick: () => onOpen(biz, news),
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 7,
      width: 68,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(BizLogo, {
    biz: biz,
    size: 60,
    ring: "on"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: 'var(--ink-soft)',
      maxWidth: 68,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, biz.name))));
}

// ── toast hook ──────────────────────────────────────────────
function useToast() {
  const [msg, setMsg] = useState(null);
  const tRef = useRef();
  const show = m => {
    setMsg(m);
    clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setMsg(null), 1900);
  };
  const node = /*#__PURE__*/React.createElement("div", {
    className: `toast ${msg ? 'show' : ''}`
  }, msg);
  return [show, node];
}
Object.assign(window, {
  Icon,
  Ph,
  TopicChip,
  TypeTag,
  TYPE_LABEL,
  BizLogo,
  FollowBtn,
  SignalRail,
  useToast
});