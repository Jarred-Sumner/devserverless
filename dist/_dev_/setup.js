var __create = Object.create, __defProp = Object.defineProperty, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __getOwnPropNames = Object.getOwnPropertyNames, __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: !0});
var __commonJS = (callback, module) => () => (module || (module = {exports: {}}, callback(module.exports, module)), module.exports), __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: !0});
}, __exportStar = (target, module, desc) => {
  if (module && typeof module == "object" || typeof module == "function")
    for (let key of __getOwnPropNames(module))
      !__hasOwnProp.call(target, key) && key !== "default" && __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  return target;
}, __toModule = (module) => __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: !0} : {value: module, enumerable: !0})), module);

// node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js
var require_object_assign = __commonJS((exports, module) => {
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  "use strict";
  var getOwnPropertySymbols = Object.getOwnPropertySymbols, hasOwnProperty11 = Object.prototype.hasOwnProperty, propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign)
        return !1;
      var test1 = new String("abc");
      if (test1[5] = "de", Object.getOwnPropertyNames(test1)[0] === "5")
        return !1;
      for (var test2 = {}, i = 0; i < 10; i++)
        test2["_" + String.fromCharCode(i)] = i;
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789")
        return !1;
      var test3 = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      }), Object.keys(Object.assign({}, test3)).join("") === "abcdefghijklmnopqrst";
    } catch (err) {
      return !1;
    }
  }
  module.exports = shouldUseNative() ? Object.assign : function(target, source) {
    for (var from, to = toObject(target), symbols, s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from)
        hasOwnProperty11.call(from, key) && (to[key] = from[key]);
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++)
          propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]]);
      }
    }
    return to;
  };
});

// node_modules/.pnpm/react@17.0.1/node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS((exports) => {
  /** @license React v17.0.1
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  "use strict";
  var l = require_object_assign(), n = 60103, p = 60106;
  exports.Fragment = 60107;
  exports.StrictMode = 60108;
  exports.Profiler = 60114;
  var q = 60109, r = 60110, t = 60112;
  exports.Suspense = 60113;
  var u = 60115, v = 60116;
  typeof Symbol == "function" && Symbol.for && (w = Symbol.for, n = w("react.element"), p = w("react.portal"), exports.Fragment = w("react.fragment"), exports.StrictMode = w("react.strict_mode"), exports.Profiler = w("react.profiler"), q = w("react.provider"), r = w("react.context"), t = w("react.forward_ref"), exports.Suspense = w("react.suspense"), u = w("react.memo"), v = w("react.lazy"));
  var w, x = typeof Symbol == "function" && Symbol.iterator;
  function y(a) {
    return a === null || typeof a != "object" ? null : (a = x && a[x] || a["@@iterator"], typeof a == "function" ? a : null);
  }
  function z(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
      b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var A = {isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  }}, B = {};
  function C(a, b, c) {
    this.props = a, this.context = b, this.refs = B, this.updater = c || A;
  }
  C.prototype.isReactComponent = {};
  C.prototype.setState = function(a, b) {
    if (typeof a != "object" && typeof a != "function" && a != null)
      throw Error(z(85));
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  C.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function D() {
  }
  D.prototype = C.prototype;
  function E(a, b, c) {
    this.props = a, this.context = b, this.refs = B, this.updater = c || A;
  }
  var F = E.prototype = new D();
  F.constructor = E;
  l(F, C.prototype);
  F.isPureReactComponent = !0;
  var G = {current: null}, H = Object.prototype.hasOwnProperty, I = {key: !0, ref: !0, __self: !0, __source: !0};
  function J(a, b, c) {
    var e, d = {}, k = null, h = null;
    if (b != null)
      for (e in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k = "" + b.key), b)
        H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
    var g = arguments.length - 2;
    if (g === 1)
      d.children = c;
    else if (1 < g) {
      for (var f = Array(g), m = 0; m < g; m++)
        f[m] = arguments[m + 2];
      d.children = f;
    }
    if (a && a.defaultProps)
      for (e in g = a.defaultProps, g)
        d[e] === void 0 && (d[e] = g[e]);
    return {$$typeof: n, type: a, key: k, ref: h, props: d, _owner: G.current};
  }
  function K(a, b) {
    return {$$typeof: n, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner};
  }
  function L(a) {
    return typeof a == "object" && a !== null && a.$$typeof === n;
  }
  function escape(a) {
    var b = {"=": "=0", ":": "=2"};
    return "$" + a.replace(/[=:]/g, function(a2) {
      return b[a2];
    });
  }
  var M = /\/+/g;
  function N(a, b) {
    return typeof a == "object" && a !== null && a.key != null ? escape("" + a.key) : b.toString(36);
  }
  function O(a, b, c, e, d) {
    var k = typeof a;
    (k === "undefined" || k === "boolean") && (a = null);
    var h = !1;
    if (a === null)
      h = !0;
    else
      switch (k) {
        case "string":
        case "number":
          h = !0;
          break;
        case "object":
          switch (a.$$typeof) {
            case n:
            case p:
              h = !0;
          }
      }
    if (h)
      return h = a, d = d(h), a = e === "" ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", a != null && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function(a2) {
        return a2;
      })) : d != null && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
    if (h = 0, e = e === "" ? "." : e + ":", Array.isArray(a))
      for (var g = 0; g < a.length; g++) {
        k = a[g];
        var f = e + N(k, g);
        h += O(k, b, c, f, d);
      }
    else if (f = y(a), typeof f == "function")
      for (a = f.call(a), g = 0; !(k = a.next()).done; )
        k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
    else if (k === "object")
      throw b = "" + a, Error(z(31, b === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
    return h;
  }
  function P(a, b, c) {
    if (a == null)
      return a;
    var e = [], d = 0;
    return O(a, e, "", "", function(a2) {
      return b.call(c, a2, d++);
    }), e;
  }
  function Q(a) {
    if (a._status === -1) {
      var b = a._result;
      b = b(), a._status = 0, a._result = b, b.then(function(b2) {
        a._status === 0 && (b2 = b2.default, a._status = 1, a._result = b2);
      }, function(b2) {
        a._status === 0 && (a._status = 2, a._result = b2);
      });
    }
    if (a._status === 1)
      return a._result;
    throw a._result;
  }
  var R = {current: null};
  function S() {
    var a = R.current;
    if (a === null)
      throw Error(z(321));
    return a;
  }
  var T = {ReactCurrentDispatcher: R, ReactCurrentBatchConfig: {transition: 0}, ReactCurrentOwner: G, IsSomeRendererActing: {current: !1}, assign: l};
  exports.Children = {map: P, forEach: function(a, b, c) {
    P(a, function() {
      b.apply(this, arguments);
    }, c);
  }, count: function(a) {
    var b = 0;
    return P(a, function() {
      b++;
    }), b;
  }, toArray: function(a) {
    return P(a, function(a2) {
      return a2;
    }) || [];
  }, only: function(a) {
    if (!L(a))
      throw Error(z(143));
    return a;
  }};
  exports.Component = C;
  exports.PureComponent = E;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
  exports.cloneElement = function(a, b, c) {
    if (a == null)
      throw Error(z(267, a));
    var e = l({}, a.props), d = a.key, k = a.ref, h = a._owner;
    if (b != null) {
      if (b.ref !== void 0 && (k = b.ref, h = G.current), b.key !== void 0 && (d = "" + b.key), a.type && a.type.defaultProps)
        var g = a.type.defaultProps;
      for (f in b)
        H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = b[f] === void 0 && g !== void 0 ? g[f] : b[f]);
    }
    var f = arguments.length - 2;
    if (f === 1)
      e.children = c;
    else if (1 < f) {
      g = Array(f);
      for (var m = 0; m < f; m++)
        g[m] = arguments[m + 2];
      e.children = g;
    }
    return {
      $$typeof: n,
      type: a.type,
      key: d,
      ref: k,
      props: e,
      _owner: h
    };
  };
  exports.createContext = function(a, b) {
    return b === void 0 && (b = null), a = {$$typeof: r, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null}, a.Provider = {$$typeof: q, _context: a}, a.Consumer = a;
  };
  exports.createElement = J;
  exports.createFactory = function(a) {
    var b = J.bind(null, a);
    return b.type = a, b;
  };
  exports.createRef = function() {
    return {current: null};
  };
  exports.forwardRef = function(a) {
    return {$$typeof: t, render: a};
  };
  exports.isValidElement = L;
  exports.lazy = function(a) {
    return {$$typeof: v, _payload: {_status: -1, _result: a}, _init: Q};
  };
  exports.memo = function(a, b) {
    return {$$typeof: u, type: a, compare: b === void 0 ? null : b};
  };
  exports.useCallback = function(a, b) {
    return S().useCallback(a, b);
  };
  exports.useContext = function(a, b) {
    return S().useContext(a, b);
  };
  exports.useDebugValue = function() {
  };
  exports.useEffect = function(a, b) {
    return S().useEffect(a, b);
  };
  exports.useImperativeHandle = function(a, b, c) {
    return S().useImperativeHandle(a, b, c);
  };
  exports.useLayoutEffect = function(a, b) {
    return S().useLayoutEffect(a, b);
  };
  exports.useMemo = function(a, b) {
    return S().useMemo(a, b);
  };
  exports.useReducer = function(a, b, c) {
    return S().useReducer(a, b, c);
  };
  exports.useRef = function(a) {
    return S().useRef(a);
  };
  exports.useState = function(a) {
    return S().useState(a);
  };
  exports.version = "17.0.1";
});

// node_modules/.pnpm/react@17.0.1/node_modules/react/index.js
var require_react = __commonJS((exports, module) => {
  "use strict";
  module.exports = require_react_production_min();
});

// node_modules/.pnpm/scheduler@0.20.1/node_modules/scheduler/cjs/scheduler.production.min.js
var require_scheduler_production_min = __commonJS((exports) => {
  /** @license React v0.20.1
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  "use strict";
  var f, g, h, k;
  typeof performance == "object" && typeof performance.now == "function" ? (l = performance, exports.unstable_now = function() {
    return l.now();
  }) : (p = Date, q = p.now(), exports.unstable_now = function() {
    return p.now() - q;
  });
  var l, p, q;
  typeof window == "undefined" || typeof MessageChannel != "function" ? (t = null, u = null, w = function() {
    if (t !== null)
      try {
        var a = exports.unstable_now();
        t(!0, a), t = null;
      } catch (b) {
        throw setTimeout(w, 0), b;
      }
  }, f = function(a) {
    t !== null ? setTimeout(f, 0, a) : (t = a, setTimeout(w, 0));
  }, g = function(a, b) {
    u = setTimeout(a, b);
  }, h = function() {
    clearTimeout(u);
  }, exports.unstable_shouldYield = function() {
    return !1;
  }, k = exports.unstable_forceFrameRate = function() {
  }) : (x = window.setTimeout, y = window.clearTimeout, typeof console != "undefined" && (z = window.cancelAnimationFrame, typeof window.requestAnimationFrame != "function" && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), typeof z != "function" && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")), A = !1, B = null, C = -1, D = 5, E = 0, exports.unstable_shouldYield = function() {
    return exports.unstable_now() >= E;
  }, k = function() {
  }, exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a ? Math.floor(1e3 / a) : 5;
  }, F = new MessageChannel(), G = F.port2, F.port1.onmessage = function() {
    if (B !== null) {
      var a = exports.unstable_now();
      E = a + D;
      try {
        B(!0, a) ? G.postMessage(null) : (A = !1, B = null);
      } catch (b) {
        throw G.postMessage(null), b;
      }
    } else
      A = !1;
  }, f = function(a) {
    B = a, A || (A = !0, G.postMessage(null));
  }, g = function(a, b) {
    C = x(function() {
      a(exports.unstable_now());
    }, b);
  }, h = function() {
    y(C), C = -1;
  });
  var t, u, w, x, y, z, A, B, C, D, E, F, G;
  function H(a, b) {
    var c = a.length;
    a.push(b);
    a:
      for (; ; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (e !== void 0 && 0 < I(e, b))
          a[d] = b, a[c] = e, c = d;
        else
          break a;
      }
  }
  function J(a) {
    return a = a[0], a === void 0 ? null : a;
  }
  function K(a) {
    var b = a[0];
    if (b !== void 0) {
      var c = a.pop();
      if (c !== b) {
        a[0] = c;
        a:
          for (var d = 0, e = a.length; d < e; ) {
            var m = 2 * (d + 1) - 1, n = a[m], v = m + 1, r = a[v];
            if (n !== void 0 && 0 > I(n, c))
              r !== void 0 && 0 > I(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);
            else if (r !== void 0 && 0 > I(r, c))
              a[d] = r, a[v] = c, d = v;
            else
              break a;
          }
      }
      return b;
    }
    return null;
  }
  function I(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return c !== 0 ? c : a.id - b.id;
  }
  var L = [], M = [], N = 1, O = null, P = 3, Q = !1, R = !1, S = !1;
  function T(a) {
    for (var b = J(M); b !== null; ) {
      if (b.callback === null)
        K(M);
      else if (b.startTime <= a)
        K(M), b.sortIndex = b.expirationTime, H(L, b);
      else
        break;
      b = J(M);
    }
  }
  function U(a) {
    if (S = !1, T(a), !R)
      if (J(L) !== null)
        R = !0, f(V);
      else {
        var b = J(M);
        b !== null && g(U, b.startTime - a);
      }
  }
  function V(a, b) {
    R = !1, S && (S = !1, h()), Q = !0;
    var c = P;
    try {
      for (T(b), O = J(L); O !== null && (!(O.expirationTime > b) || a && !exports.unstable_shouldYield()); ) {
        var d = O.callback;
        if (typeof d == "function") {
          O.callback = null, P = O.priorityLevel;
          var e = d(O.expirationTime <= b);
          b = exports.unstable_now(), typeof e == "function" ? O.callback = e : O === J(L) && K(L), T(b);
        } else
          K(L);
        O = J(L);
      }
      if (O !== null)
        var m = !0;
      else {
        var n = J(M);
        n !== null && g(U, n.startTime - b), m = !1;
      }
      return m;
    } finally {
      O = null, P = c, Q = !1;
    }
  }
  var W = k;
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    R || Q || (R = !0, f(V));
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return P;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return J(L);
  };
  exports.unstable_next = function(a) {
    switch (P) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = P;
    }
    var c = P;
    P = b;
    try {
      return a();
    } finally {
      P = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = W;
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = P;
    P = a;
    try {
      return b();
    } finally {
      P = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    switch (typeof c == "object" && c !== null ? (c = c.delay, c = typeof c == "number" && 0 < c ? d + c : d) : c = d, a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    return e = c + e, a = {id: N++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1}, c > d ? (a.sortIndex = c, H(M, a), J(L) === null && a === J(M) && (S ? h() : S = !0, g(U, c - d))) : (a.sortIndex = e, H(L, a), R || Q || (R = !0, f(V))), a;
  };
  exports.unstable_wrapCallback = function(a) {
    var b = P;
    return function() {
      var c = P;
      P = b;
      try {
        return a.apply(this, arguments);
      } finally {
        P = c;
      }
    };
  };
});

// node_modules/.pnpm/scheduler@0.20.1/node_modules/scheduler/index.js
var require_scheduler = __commonJS((exports, module) => {
  "use strict";
  module.exports = require_scheduler_production_min();
});

// node_modules/.pnpm/react-dom@17.0.1_react@17.0.1/node_modules/react-dom/cjs/react-dom.production.min.js
var require_react_dom_production_min = __commonJS((exports) => {
  /** @license React v17.0.1
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  "use strict";
  var aa = require_react(), m = require_object_assign(), r = require_scheduler();
  function y(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
      b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  if (!aa)
    throw Error(y(227));
  var ba = new Set(), ca = {};
  function da(a, b) {
    ea(a, b), ea(a + "Capture", b);
  }
  function ea(a, b) {
    for (ca[a] = b, a = 0; a < b.length; a++)
      ba.add(b[a]);
  }
  var fa = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ia = Object.prototype.hasOwnProperty, ja = {}, ka = {};
  function la(a) {
    return ia.call(ka, a) ? !0 : ia.call(ja, a) ? !1 : ha.test(a) ? ka[a] = !0 : (ja[a] = !0, !1);
  }
  function ma(a, b, c, d) {
    if (c !== null && c.type === 0)
      return !1;
    switch (typeof b) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return d ? !1 : c !== null ? !c.acceptsBooleans : (a = a.toLowerCase().slice(0, 5), a !== "data-" && a !== "aria-");
      default:
        return !1;
    }
  }
  function na(a, b, c, d) {
    if (b === null || typeof b == "undefined" || ma(a, b, c, d))
      return !0;
    if (d)
      return !1;
    if (c !== null)
      switch (c.type) {
        case 3:
          return !b;
        case 4:
          return b === !1;
        case 5:
          return isNaN(b);
        case 6:
          return isNaN(b) || 1 > b;
      }
    return !1;
  }
  function B(a, b, c, d, e, f, g) {
    this.acceptsBooleans = b === 2 || b === 3 || b === 4, this.attributeName = d, this.attributeNamespace = e, this.mustUseProperty = c, this.propertyName = a, this.type = b, this.sanitizeURL = f, this.removeEmptyString = g;
  }
  var D = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    D[a] = new B(a, 0, !1, a, null, !1, !1);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
    var b = a[0];
    D[b] = new B(b, 1, !1, a[1], null, !1, !1);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
    D[a] = new B(a, 2, !1, a.toLowerCase(), null, !1, !1);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
    D[a] = new B(a, 2, !1, a, null, !1, !1);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    D[a] = new B(a, 3, !1, a.toLowerCase(), null, !1, !1);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a) {
    D[a] = new B(a, 3, !0, a, null, !1, !1);
  });
  ["capture", "download"].forEach(function(a) {
    D[a] = new B(a, 4, !1, a, null, !1, !1);
  });
  ["cols", "rows", "size", "span"].forEach(function(a) {
    D[a] = new B(a, 6, !1, a, null, !1, !1);
  });
  ["rowSpan", "start"].forEach(function(a) {
    D[a] = new B(a, 5, !1, a.toLowerCase(), null, !1, !1);
  });
  var oa = /[\-:]([a-z])/g;
  function pa(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var b = a.replace(oa, pa);
    D[b] = new B(b, 1, !1, a, null, !1, !1);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var b = a.replace(oa, pa);
    D[b] = new B(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
    var b = a.replace(oa, pa);
    D[b] = new B(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a) {
    D[a] = new B(a, 1, !1, a.toLowerCase(), null, !1, !1);
  });
  D.xlinkHref = new B("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
  ["src", "href", "action", "formAction"].forEach(function(a) {
    D[a] = new B(a, 1, !1, a.toLowerCase(), null, !0, !0);
  });
  function qa(a, b, c, d) {
    var e = D.hasOwnProperty(b) ? D[b] : null, f = e !== null ? e.type === 0 : d ? !1 : !(!(2 < b.length) || b[0] !== "o" && b[0] !== "O" || b[1] !== "n" && b[1] !== "N");
    f || (na(b, c, e, d) && (c = null), d || e === null ? la(b) && (c === null ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = c === null ? e.type === 3 ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, c === null ? a.removeAttribute(b) : (e = e.type, c = e === 3 || e === 4 && c === !0 ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
  }
  var ra = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sa = 60103, ta = 60106, ua = 60107, wa = 60108, xa = 60114, ya = 60109, za = 60110, Aa = 60112, Ba = 60113, Ca = 60120, Da = 60115, Ea = 60116, Fa = 60121, Ga = 60128, Ha = 60129, Ia = 60130, Ja = 60131;
  typeof Symbol == "function" && Symbol.for && (E = Symbol.for, sa = E("react.element"), ta = E("react.portal"), ua = E("react.fragment"), wa = E("react.strict_mode"), xa = E("react.profiler"), ya = E("react.provider"), za = E("react.context"), Aa = E("react.forward_ref"), Ba = E("react.suspense"), Ca = E("react.suspense_list"), Da = E("react.memo"), Ea = E("react.lazy"), Fa = E("react.block"), E("react.scope"), Ga = E("react.opaque.id"), Ha = E("react.debug_trace_mode"), Ia = E("react.offscreen"), Ja = E("react.legacy_hidden"));
  var E, Ka = typeof Symbol == "function" && Symbol.iterator;
  function La(a) {
    return a === null || typeof a != "object" ? null : (a = Ka && a[Ka] || a["@@iterator"], typeof a == "function" ? a : null);
  }
  var Ma;
  function Na(a) {
    if (Ma === void 0)
      try {
        throw Error();
      } catch (c) {
        var b = c.stack.trim().match(/\n( *(at )?)/);
        Ma = b && b[1] || "";
      }
    return `
` + Ma + a;
  }
  var Oa = !1;
  function Pa(a, b) {
    if (!a || Oa)
      return "";
    Oa = !0;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b)
        if (b = function() {
          throw Error();
        }, Object.defineProperty(b.prototype, "props", {set: function() {
          throw Error();
        }}), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(b, []);
          } catch (k) {
            var d = k;
          }
          Reflect.construct(a, [], b);
        } else {
          try {
            b.call();
          } catch (k) {
            d = k;
          }
          a.call(b.prototype);
        }
      else {
        try {
          throw Error();
        } catch (k) {
          d = k;
        }
        a();
      }
    } catch (k) {
      if (k && d && typeof k.stack == "string") {
        for (var e = k.stack.split(`
`), f = d.stack.split(`
`), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
          h--;
        for (; 1 <= g && 0 <= h; g--, h--)
          if (e[g] !== f[h]) {
            if (g !== 1 || h !== 1)
              do
                if (g--, h--, 0 > h || e[g] !== f[h])
                  return `
` + e[g].replace(" at new ", " at ");
              while (1 <= g && 0 <= h);
            break;
          }
      }
    } finally {
      Oa = !1, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? Na(a) : "";
  }
  function Qa(a) {
    switch (a.tag) {
      case 5:
        return Na(a.type);
      case 16:
        return Na("Lazy");
      case 13:
        return Na("Suspense");
      case 19:
        return Na("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = Pa(a.type, !1), a;
      case 11:
        return a = Pa(a.type.render, !1), a;
      case 22:
        return a = Pa(a.type._render, !1), a;
      case 1:
        return a = Pa(a.type, !0), a;
      default:
        return "";
    }
  }
  function Ra(a) {
    if (a == null)
      return null;
    if (typeof a == "function")
      return a.displayName || a.name || null;
    if (typeof a == "string")
      return a;
    switch (a) {
      case ua:
        return "Fragment";
      case ta:
        return "Portal";
      case xa:
        return "Profiler";
      case wa:
        return "StrictMode";
      case Ba:
        return "Suspense";
      case Ca:
        return "SuspenseList";
    }
    if (typeof a == "object")
      switch (a.$$typeof) {
        case za:
          return (a.displayName || "Context") + ".Consumer";
        case ya:
          return (a._context.displayName || "Context") + ".Provider";
        case Aa:
          var b = a.render;
          return b = b.displayName || b.name || "", a.displayName || (b !== "" ? "ForwardRef(" + b + ")" : "ForwardRef");
        case Da:
          return Ra(a.type);
        case Fa:
          return Ra(a._render);
        case Ea:
          b = a._payload, a = a._init;
          try {
            return Ra(a(b));
          } catch (c) {
          }
      }
    return null;
  }
  function Sa(a) {
    switch (typeof a) {
      case "boolean":
      case "number":
      case "object":
      case "string":
      case "undefined":
        return a;
      default:
        return "";
    }
  }
  function Ta(a) {
    var b = a.type;
    return (a = a.nodeName) && a.toLowerCase() === "input" && (b === "checkbox" || b === "radio");
  }
  function Ua(a) {
    var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
    if (!a.hasOwnProperty(b) && typeof c != "undefined" && typeof c.get == "function" && typeof c.set == "function") {
      var e = c.get, f = c.set;
      return Object.defineProperty(a, b, {configurable: !0, get: function() {
        return e.call(this);
      }, set: function(a2) {
        d = "" + a2, f.call(this, a2);
      }}), Object.defineProperty(a, b, {enumerable: c.enumerable}), {getValue: function() {
        return d;
      }, setValue: function(a2) {
        d = "" + a2;
      }, stopTracking: function() {
        a._valueTracker = null, delete a[b];
      }};
    }
  }
  function Va(a) {
    a._valueTracker || (a._valueTracker = Ua(a));
  }
  function Wa(a) {
    if (!a)
      return !1;
    var b = a._valueTracker;
    if (!b)
      return !0;
    var c = b.getValue(), d = "";
    return a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value), a = d, a !== c ? (b.setValue(a), !0) : !1;
  }
  function Xa(a) {
    if (a = a || (typeof document != "undefined" ? document : void 0), typeof a == "undefined")
      return null;
    try {
      return a.activeElement || a.body;
    } catch (b) {
      return a.body;
    }
  }
  function Ya(a, b) {
    var c = b.checked;
    return m({}, b, {defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: c ?? a._wrapperState.initialChecked});
  }
  function Za(a, b) {
    var c = b.defaultValue == null ? "" : b.defaultValue, d = b.checked != null ? b.checked : b.defaultChecked;
    c = Sa(b.value != null ? b.value : c), a._wrapperState = {initialChecked: d, initialValue: c, controlled: b.type === "checkbox" || b.type === "radio" ? b.checked != null : b.value != null};
  }
  function $a(a, b) {
    b = b.checked, b != null && qa(a, "checked", b, !1);
  }
  function ab(a, b) {
    $a(a, b);
    var c = Sa(b.value), d = b.type;
    if (c != null)
      d === "number" ? (c === 0 && a.value === "" || a.value != c) && (a.value = "" + c) : a.value !== "" + c && (a.value = "" + c);
    else if (d === "submit" || d === "reset") {
      a.removeAttribute("value");
      return;
    }
    b.hasOwnProperty("value") ? bb(a, b.type, c) : b.hasOwnProperty("defaultValue") && bb(a, b.type, Sa(b.defaultValue)), b.checked == null && b.defaultChecked != null && (a.defaultChecked = !!b.defaultChecked);
  }
  function cb(a, b, c) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
      var d = b.type;
      if (!(d !== "submit" && d !== "reset" || b.value !== void 0 && b.value !== null))
        return;
      b = "" + a._wrapperState.initialValue, c || b === a.value || (a.value = b), a.defaultValue = b;
    }
    c = a.name, c !== "" && (a.name = ""), a.defaultChecked = !!a._wrapperState.initialChecked, c !== "" && (a.name = c);
  }
  function bb(a, b, c) {
    (b !== "number" || Xa(a.ownerDocument) !== a) && (c == null ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c));
  }
  function db(a) {
    var b = "";
    return aa.Children.forEach(a, function(a2) {
      a2 != null && (b += a2);
    }), b;
  }
  function eb(a, b) {
    return a = m({children: void 0}, b), (b = db(b.children)) && (a.children = b), a;
  }
  function fb(a, b, c, d) {
    if (a = a.options, b) {
      b = {};
      for (var e = 0; e < c.length; e++)
        b["$" + c[e]] = !0;
      for (c = 0; c < a.length; c++)
        e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
    } else {
      for (c = "" + Sa(c), b = null, e = 0; e < a.length; e++) {
        if (a[e].value === c) {
          a[e].selected = !0, d && (a[e].defaultSelected = !0);
          return;
        }
        b !== null || a[e].disabled || (b = a[e]);
      }
      b !== null && (b.selected = !0);
    }
  }
  function gb(a, b) {
    if (b.dangerouslySetInnerHTML != null)
      throw Error(y(91));
    return m({}, b, {value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue});
  }
  function hb(a, b) {
    var c = b.value;
    if (c == null) {
      if (c = b.children, b = b.defaultValue, c != null) {
        if (b != null)
          throw Error(y(92));
        if (Array.isArray(c)) {
          if (!(1 >= c.length))
            throw Error(y(93));
          c = c[0];
        }
        b = c;
      }
      b == null && (b = ""), c = b;
    }
    a._wrapperState = {initialValue: Sa(c)};
  }
  function ib(a, b) {
    var c = Sa(b.value), d = Sa(b.defaultValue);
    c != null && (c = "" + c, c !== a.value && (a.value = c), b.defaultValue == null && a.defaultValue !== c && (a.defaultValue = c)), d != null && (a.defaultValue = "" + d);
  }
  function jb(a) {
    var b = a.textContent;
    b === a._wrapperState.initialValue && b !== "" && b !== null && (a.value = b);
  }
  var kb = {html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg"};
  function lb(a) {
    switch (a) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function mb(a, b) {
    return a == null || a === "http://www.w3.org/1999/xhtml" ? lb(b) : a === "http://www.w3.org/2000/svg" && b === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a;
  }
  var nb, ob = function(a) {
    return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
      MSApp.execUnsafeLocalFunction(function() {
        return a(b, c, d, e);
      });
    } : a;
  }(function(a, b) {
    if (a.namespaceURI !== kb.svg || "innerHTML" in a)
      a.innerHTML = b;
    else {
      for (nb = nb || document.createElement("div"), nb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>", b = nb.firstChild; a.firstChild; )
        a.removeChild(a.firstChild);
      for (; b.firstChild; )
        a.appendChild(b.firstChild);
    }
  });
  function pb(a, b) {
    if (b) {
      var c = a.firstChild;
      if (c && c === a.lastChild && c.nodeType === 3) {
        c.nodeValue = b;
        return;
      }
    }
    a.textContent = b;
  }
  var qb = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, rb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(qb).forEach(function(a) {
    rb.forEach(function(b) {
      b = b + a.charAt(0).toUpperCase() + a.substring(1), qb[b] = qb[a];
    });
  });
  function sb(a, b, c) {
    return b == null || typeof b == "boolean" || b === "" ? "" : c || typeof b != "number" || b === 0 || qb.hasOwnProperty(a) && qb[a] ? ("" + b).trim() : b + "px";
  }
  function tb(a, b) {
    a = a.style;
    for (var c in b)
      if (b.hasOwnProperty(c)) {
        var d = c.indexOf("--") === 0, e = sb(c, b[c], d);
        c === "float" && (c = "cssFloat"), d ? a.setProperty(c, e) : a[c] = e;
      }
  }
  var ub = m({menuitem: !0}, {area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0});
  function vb(a, b) {
    if (b) {
      if (ub[a] && (b.children != null || b.dangerouslySetInnerHTML != null))
        throw Error(y(137, a));
      if (b.dangerouslySetInnerHTML != null) {
        if (b.children != null)
          throw Error(y(60));
        if (!(typeof b.dangerouslySetInnerHTML == "object" && "__html" in b.dangerouslySetInnerHTML))
          throw Error(y(61));
      }
      if (b.style != null && typeof b.style != "object")
        throw Error(y(62));
    }
  }
  function wb(a, b) {
    if (a.indexOf("-") === -1)
      return typeof b.is == "string";
    switch (a) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  function xb(a) {
    return a = a.target || a.srcElement || window, a.correspondingUseElement && (a = a.correspondingUseElement), a.nodeType === 3 ? a.parentNode : a;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a) {
    if (a = Cb(a)) {
      if (typeof yb != "function")
        throw Error(y(280));
      var b = a.stateNode;
      b && (b = Db(b), yb(a.stateNode, a.type, b));
    }
  }
  function Eb(a) {
    zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
  }
  function Fb() {
    if (zb) {
      var a = zb, b = Ab;
      if (Ab = zb = null, Bb(a), b)
        for (a = 0; a < b.length; a++)
          Bb(b[a]);
    }
  }
  function Gb(a, b) {
    return a(b);
  }
  function Hb(a, b, c, d, e) {
    return a(b, c, d, e);
  }
  function Ib() {
  }
  var Jb = Gb, Kb = !1, Lb = !1;
  function Mb() {
    (zb !== null || Ab !== null) && (Ib(), Fb());
  }
  function Nb(a, b, c) {
    if (Lb)
      return a(b, c);
    Lb = !0;
    try {
      return Jb(a, b, c);
    } finally {
      Lb = !1, Mb();
    }
  }
  function Ob(a, b) {
    var c = a.stateNode;
    if (c === null)
      return null;
    var d = Db(c);
    if (d === null)
      return null;
    c = d[b];
    a:
      switch (b) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (d = !d.disabled) || (a = a.type, d = !(a === "button" || a === "input" || a === "select" || a === "textarea")), a = !d;
          break a;
        default:
          a = !1;
      }
    if (a)
      return null;
    if (c && typeof c != "function")
      throw Error(y(231, b, typeof c));
    return c;
  }
  var Pb = !1;
  if (fa)
    try {
      Qb = {}, Object.defineProperty(Qb, "passive", {get: function() {
        Pb = !0;
      }}), window.addEventListener("test", Qb, Qb), window.removeEventListener("test", Qb, Qb);
    } catch (a) {
      Pb = !1;
    }
  var Qb;
  function Rb(a, b, c, d, e, f, g, h, k) {
    var l = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c, l);
    } catch (n) {
      this.onError(n);
    }
  }
  var Sb = !1, Tb = null, Ub = !1, Vb = null, Wb = {onError: function(a) {
    Sb = !0, Tb = a;
  }};
  function Xb(a, b, c, d, e, f, g, h, k) {
    Sb = !1, Tb = null, Rb.apply(Wb, arguments);
  }
  function Yb(a, b, c, d, e, f, g, h, k) {
    if (Xb.apply(this, arguments), Sb) {
      if (Sb) {
        var l = Tb;
        Sb = !1, Tb = null;
      } else
        throw Error(y(198));
      Ub || (Ub = !0, Vb = l);
    }
  }
  function Zb(a) {
    var b = a, c = a;
    if (a.alternate)
      for (; b.return; )
        b = b.return;
    else {
      a = b;
      do
        b = a, (b.flags & 1026) != 0 && (c = b.return), a = b.return;
      while (a);
    }
    return b.tag === 3 ? c : null;
  }
  function $b(a) {
    if (a.tag === 13) {
      var b = a.memoizedState;
      if (b === null && (a = a.alternate, a !== null && (b = a.memoizedState)), b !== null)
        return b.dehydrated;
    }
    return null;
  }
  function ac(a) {
    if (Zb(a) !== a)
      throw Error(y(188));
  }
  function bc(a) {
    var b = a.alternate;
    if (!b) {
      if (b = Zb(a), b === null)
        throw Error(y(188));
      return b !== a ? null : a;
    }
    for (var c = a, d = b; ; ) {
      var e = c.return;
      if (e === null)
        break;
      var f = e.alternate;
      if (f === null) {
        if (d = e.return, d !== null) {
          c = d;
          continue;
        }
        break;
      }
      if (e.child === f.child) {
        for (f = e.child; f; ) {
          if (f === c)
            return ac(e), a;
          if (f === d)
            return ac(e), b;
          f = f.sibling;
        }
        throw Error(y(188));
      }
      if (c.return !== d.return)
        c = e, d = f;
      else {
        for (var g = !1, h = e.child; h; ) {
          if (h === c) {
            g = !0, c = e, d = f;
            break;
          }
          if (h === d) {
            g = !0, d = e, c = f;
            break;
          }
          h = h.sibling;
        }
        if (!g) {
          for (h = f.child; h; ) {
            if (h === c) {
              g = !0, c = f, d = e;
              break;
            }
            if (h === d) {
              g = !0, d = f, c = e;
              break;
            }
            h = h.sibling;
          }
          if (!g)
            throw Error(y(189));
        }
      }
      if (c.alternate !== d)
        throw Error(y(190));
    }
    if (c.tag !== 3)
      throw Error(y(188));
    return c.stateNode.current === c ? a : b;
  }
  function cc(a) {
    if (a = bc(a), !a)
      return null;
    for (var b = a; ; ) {
      if (b.tag === 5 || b.tag === 6)
        return b;
      if (b.child)
        b.child.return = b, b = b.child;
      else {
        if (b === a)
          break;
        for (; !b.sibling; ) {
          if (!b.return || b.return === a)
            return null;
          b = b.return;
        }
        b.sibling.return = b.return, b = b.sibling;
      }
    }
    return null;
  }
  function dc(a, b) {
    for (var c = a.alternate; b !== null; ) {
      if (b === a || b === c)
        return !0;
      b = b.return;
    }
    return !1;
  }
  var ec, fc, gc, hc, ic = !1, jc = [], kc = null, lc = null, mc = null, nc = new Map(), oc = new Map(), pc = [], qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function rc(a, b, c, d, e) {
    return {blockedOn: a, domEventName: b, eventSystemFlags: c | 16, nativeEvent: e, targetContainers: [d]};
  }
  function sc(a, b) {
    switch (a) {
      case "focusin":
      case "focusout":
        kc = null;
        break;
      case "dragenter":
      case "dragleave":
        lc = null;
        break;
      case "mouseover":
      case "mouseout":
        mc = null;
        break;
      case "pointerover":
      case "pointerout":
        nc.delete(b.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        oc.delete(b.pointerId);
    }
  }
  function tc(a, b, c, d, e, f) {
    return a === null || a.nativeEvent !== f ? (a = rc(b, c, d, e, f), b !== null && (b = Cb(b), b !== null && fc(b)), a) : (a.eventSystemFlags |= d, b = a.targetContainers, e !== null && b.indexOf(e) === -1 && b.push(e), a);
  }
  function uc(a, b, c, d, e) {
    switch (b) {
      case "focusin":
        return kc = tc(kc, a, b, c, d, e), !0;
      case "dragenter":
        return lc = tc(lc, a, b, c, d, e), !0;
      case "mouseover":
        return mc = tc(mc, a, b, c, d, e), !0;
      case "pointerover":
        var f = e.pointerId;
        return nc.set(f, tc(nc.get(f) || null, a, b, c, d, e)), !0;
      case "gotpointercapture":
        return f = e.pointerId, oc.set(f, tc(oc.get(f) || null, a, b, c, d, e)), !0;
    }
    return !1;
  }
  function vc(a) {
    var b = wc(a.target);
    if (b !== null) {
      var c = Zb(b);
      if (c !== null) {
        if (b = c.tag, b === 13) {
          if (b = $b(c), b !== null) {
            a.blockedOn = b, hc(a.lanePriority, function() {
              r.unstable_runWithPriority(a.priority, function() {
                gc(c);
              });
            });
            return;
          }
        } else if (b === 3 && c.stateNode.hydrate) {
          a.blockedOn = c.tag === 3 ? c.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a.blockedOn = null;
  }
  function xc(a) {
    if (a.blockedOn !== null)
      return !1;
    for (var b = a.targetContainers; 0 < b.length; ) {
      var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
      if (c !== null)
        return b = Cb(c), b !== null && fc(b), a.blockedOn = c, !1;
      b.shift();
    }
    return !0;
  }
  function zc(a, b, c) {
    xc(a) && c.delete(b);
  }
  function Ac() {
    for (ic = !1; 0 < jc.length; ) {
      var a = jc[0];
      if (a.blockedOn !== null) {
        a = Cb(a.blockedOn), a !== null && ec(a);
        break;
      }
      for (var b = a.targetContainers; 0 < b.length; ) {
        var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
        if (c !== null) {
          a.blockedOn = c;
          break;
        }
        b.shift();
      }
      a.blockedOn === null && jc.shift();
    }
    kc !== null && xc(kc) && (kc = null), lc !== null && xc(lc) && (lc = null), mc !== null && xc(mc) && (mc = null), nc.forEach(zc), oc.forEach(zc);
  }
  function Bc(a, b) {
    a.blockedOn === b && (a.blockedOn = null, ic || (ic = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, Ac)));
  }
  function Cc(a) {
    function b(b2) {
      return Bc(b2, a);
    }
    if (0 < jc.length) {
      Bc(jc[0], a);
      for (var c = 1; c < jc.length; c++) {
        var d = jc[c];
        d.blockedOn === a && (d.blockedOn = null);
      }
    }
    for (kc !== null && Bc(kc, a), lc !== null && Bc(lc, a), mc !== null && Bc(mc, a), nc.forEach(b), oc.forEach(b), c = 0; c < pc.length; c++)
      d = pc[c], d.blockedOn === a && (d.blockedOn = null);
    for (; 0 < pc.length && (c = pc[0], c.blockedOn === null); )
      vc(c), c.blockedOn === null && pc.shift();
  }
  function Dc(a, b) {
    var c = {};
    return c[a.toLowerCase()] = b.toLowerCase(), c["Webkit" + a] = "webkit" + b, c["Moz" + a] = "moz" + b, c;
  }
  var Ec = {animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd")}, Fc = {}, Gc = {};
  fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
  function Hc(a) {
    if (Fc[a])
      return Fc[a];
    if (!Ec[a])
      return a;
    var b = Ec[a], c;
    for (c in b)
      if (b.hasOwnProperty(c) && c in Gc)
        return Fc[a] = b[c];
    return a;
  }
  var Ic = Hc("animationend"), Jc = Hc("animationiteration"), Kc = Hc("animationstart"), Lc = Hc("transitionend"), Mc = new Map(), Nc = new Map(), Oc = [
    "abort",
    "abort",
    Ic,
    "animationEnd",
    Jc,
    "animationIteration",
    Kc,
    "animationStart",
    "canplay",
    "canPlay",
    "canplaythrough",
    "canPlayThrough",
    "durationchange",
    "durationChange",
    "emptied",
    "emptied",
    "encrypted",
    "encrypted",
    "ended",
    "ended",
    "error",
    "error",
    "gotpointercapture",
    "gotPointerCapture",
    "load",
    "load",
    "loadeddata",
    "loadedData",
    "loadedmetadata",
    "loadedMetadata",
    "loadstart",
    "loadStart",
    "lostpointercapture",
    "lostPointerCapture",
    "playing",
    "playing",
    "progress",
    "progress",
    "seeking",
    "seeking",
    "stalled",
    "stalled",
    "suspend",
    "suspend",
    "timeupdate",
    "timeUpdate",
    Lc,
    "transitionEnd",
    "waiting",
    "waiting"
  ];
  function Pc(a, b) {
    for (var c = 0; c < a.length; c += 2) {
      var d = a[c], e = a[c + 1];
      e = "on" + (e[0].toUpperCase() + e.slice(1)), Nc.set(d, b), Mc.set(d, e), da(e, [d]);
    }
  }
  var Qc = r.unstable_now;
  Qc();
  var F = 8;
  function Rc(a) {
    if ((1 & a) != 0)
      return F = 15, 1;
    if ((2 & a) != 0)
      return F = 14, 2;
    if ((4 & a) != 0)
      return F = 13, 4;
    var b = 24 & a;
    return b !== 0 ? (F = 12, b) : (a & 32) != 0 ? (F = 11, 32) : (b = 192 & a, b !== 0 ? (F = 10, b) : (a & 256) != 0 ? (F = 9, 256) : (b = 3584 & a, b !== 0 ? (F = 8, b) : (a & 4096) != 0 ? (F = 7, 4096) : (b = 4186112 & a, b !== 0 ? (F = 6, b) : (b = 62914560 & a, b !== 0 ? (F = 5, b) : a & 67108864 ? (F = 4, 67108864) : (a & 134217728) != 0 ? (F = 3, 134217728) : (b = 805306368 & a, b !== 0 ? (F = 2, b) : (1073741824 & a) != 0 ? (F = 1, 1073741824) : (F = 8, a))))));
  }
  function Sc(a) {
    switch (a) {
      case 99:
        return 15;
      case 98:
        return 10;
      case 97:
      case 96:
        return 8;
      case 95:
        return 2;
      default:
        return 0;
    }
  }
  function Tc(a) {
    switch (a) {
      case 15:
      case 14:
        return 99;
      case 13:
      case 12:
      case 11:
      case 10:
        return 98;
      case 9:
      case 8:
      case 7:
      case 6:
      case 4:
      case 5:
        return 97;
      case 3:
      case 2:
      case 1:
        return 95;
      case 0:
        return 90;
      default:
        throw Error(y(358, a));
    }
  }
  function Uc(a, b) {
    var c = a.pendingLanes;
    if (c === 0)
      return F = 0;
    var d = 0, e = 0, f = a.expiredLanes, g = a.suspendedLanes, h = a.pingedLanes;
    if (f !== 0)
      d = f, e = F = 15;
    else if (f = c & 134217727, f !== 0) {
      var k = f & ~g;
      k !== 0 ? (d = Rc(k), e = F) : (h &= f, h !== 0 && (d = Rc(h), e = F));
    } else
      f = c & ~g, f !== 0 ? (d = Rc(f), e = F) : h !== 0 && (d = Rc(h), e = F);
    if (d === 0)
      return 0;
    if (d = 31 - Vc(d), d = c & ((0 > d ? 0 : 1 << d) << 1) - 1, b !== 0 && b !== d && (b & g) == 0) {
      if (Rc(b), e <= F)
        return b;
      F = e;
    }
    if (b = a.entangledLanes, b !== 0)
      for (a = a.entanglements, b &= d; 0 < b; )
        c = 31 - Vc(b), e = 1 << c, d |= a[c], b &= ~e;
    return d;
  }
  function Wc(a) {
    return a = a.pendingLanes & -1073741825, a !== 0 ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function Xc(a, b) {
    switch (a) {
      case 15:
        return 1;
      case 14:
        return 2;
      case 12:
        return a = Yc(24 & ~b), a === 0 ? Xc(10, b) : a;
      case 10:
        return a = Yc(192 & ~b), a === 0 ? Xc(8, b) : a;
      case 8:
        return a = Yc(3584 & ~b), a === 0 && (a = Yc(4186112 & ~b), a === 0 && (a = 512)), a;
      case 2:
        return b = Yc(805306368 & ~b), b === 0 && (b = 268435456), b;
    }
    throw Error(y(358, a));
  }
  function Yc(a) {
    return a & -a;
  }
  function Zc(a) {
    for (var b = [], c = 0; 31 > c; c++)
      b.push(a);
    return b;
  }
  function $c(a, b, c) {
    a.pendingLanes |= b;
    var d = b - 1;
    a.suspendedLanes &= d, a.pingedLanes &= d, a = a.eventTimes, b = 31 - Vc(b), a[b] = c;
  }
  var Vc = Math.clz32 ? Math.clz32 : ad, bd = Math.log, cd = Math.LN2;
  function ad(a) {
    return a === 0 ? 32 : 31 - (bd(a) / cd | 0) | 0;
  }
  var dd = r.unstable_UserBlockingPriority, ed = r.unstable_runWithPriority, fd = !0;
  function gd(a, b, c, d) {
    Kb || Ib();
    var e = hd, f = Kb;
    Kb = !0;
    try {
      Hb(e, a, b, c, d);
    } finally {
      (Kb = f) || Mb();
    }
  }
  function id(a, b, c, d) {
    ed(dd, hd.bind(null, a, b, c, d));
  }
  function hd(a, b, c, d) {
    if (fd) {
      var e;
      if ((e = (b & 4) == 0) && 0 < jc.length && -1 < qc.indexOf(a))
        a = rc(null, a, b, c, d), jc.push(a);
      else {
        var f = yc(a, b, c, d);
        if (f === null)
          e && sc(a, d);
        else {
          if (e) {
            if (-1 < qc.indexOf(a)) {
              a = rc(f, a, b, c, d), jc.push(a);
              return;
            }
            if (uc(f, a, b, c, d))
              return;
            sc(a, d);
          }
          jd(a, b, d, null, c);
        }
      }
    }
  }
  function yc(a, b, c, d) {
    var e = xb(d);
    if (e = wc(e), e !== null) {
      var f = Zb(e);
      if (f === null)
        e = null;
      else {
        var g = f.tag;
        if (g === 13) {
          if (e = $b(f), e !== null)
            return e;
          e = null;
        } else if (g === 3) {
          if (f.stateNode.hydrate)
            return f.tag === 3 ? f.stateNode.containerInfo : null;
          e = null;
        } else
          f !== e && (e = null);
      }
    }
    return jd(a, b, d, e, c), null;
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md)
      return md;
    var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
    for (a = 0; a < c && b[a] === e[a]; a++)
      ;
    var g = c - a;
    for (d = 1; d <= g && b[c - d] === e[f - d]; d++)
      ;
    return md = e.slice(a, 1 < d ? 1 - d : void 0);
  }
  function od(a) {
    var b = a.keyCode;
    return "charCode" in a ? (a = a.charCode, a === 0 && b === 13 && (a = 13)) : a = b, a === 10 && (a = 13), 32 <= a || a === 13 ? a : 0;
  }
  function pd() {
    return !0;
  }
  function qd() {
    return !1;
  }
  function rd(a) {
    function b(b2, d, e, f, g) {
      this._reactName = b2, this._targetInst = e, this.type = d, this.nativeEvent = f, this.target = g, this.currentTarget = null;
      for (var c in a)
        a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? pd : qd, this.isPropagationStopped = qd, this;
    }
    return m(b.prototype, {preventDefault: function() {
      this.defaultPrevented = !0;
      var a2 = this.nativeEvent;
      a2 && (a2.preventDefault ? a2.preventDefault() : typeof a2.returnValue != "unknown" && (a2.returnValue = !1), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a2 = this.nativeEvent;
      a2 && (a2.stopPropagation ? a2.stopPropagation() : typeof a2.cancelBubble != "unknown" && (a2.cancelBubble = !0), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd}), b;
  }
  var sd = {eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0}, td = rd(sd), ud = m({}, sd, {view: 0, detail: 0}), vd = rd(ud), wd, xd, yd, Ad = m({}, ud, {screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
    return a.relatedTarget === void 0 ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
  }, movementX: function(a) {
    return "movementX" in a ? a.movementX : (a !== yd && (yd && a.type === "mousemove" ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a), wd);
  }, movementY: function(a) {
    return "movementY" in a ? a.movementY : xd;
  }}), Bd = rd(Ad), Cd = m({}, Ad, {dataTransfer: 0}), Dd = rd(Cd), Ed = m({}, ud, {relatedTarget: 0}), Fd = rd(Ed), Gd = m({}, sd, {animationName: 0, elapsedTime: 0, pseudoElement: 0}), Hd = rd(Gd), Id = m({}, sd, {clipboardData: function(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  }}), Jd = rd(Id), Kd = m({}, sd, {data: 0}), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = {Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey"};
  function Pd(a) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : !1;
  }
  function zd() {
    return Pd;
  }
  var Qd = m({}, ud, {key: function(a) {
    if (a.key) {
      var b = Md[a.key] || a.key;
      if (b !== "Unidentified")
        return b;
    }
    return a.type === "keypress" ? (a = od(a), a === 13 ? "Enter" : String.fromCharCode(a)) : a.type === "keydown" || a.type === "keyup" ? Nd[a.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
    return a.type === "keypress" ? od(a) : 0;
  }, keyCode: function(a) {
    return a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
  }, which: function(a) {
    return a.type === "keypress" ? od(a) : a.type === "keydown" || a.type === "keyup" ? a.keyCode : 0;
  }}), Rd = rd(Qd), Sd = m({}, Ad, {pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0}), Td = rd(Sd), Ud = m({}, ud, {touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd}), Vd = rd(Ud), Wd = m({}, sd, {propertyName: 0, elapsedTime: 0, pseudoElement: 0}), Xd = rd(Wd), Yd = m({}, Ad, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = fa && "CompositionEvent" in window, be = null;
  fa && "documentMode" in document && (be = document.documentMode);
  var ce = fa && "TextEvent" in window && !be, de = fa && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = !1;
  function ge(a, b) {
    switch (a) {
      case "keyup":
        return $d.indexOf(b.keyCode) !== -1;
      case "keydown":
        return b.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function he(a) {
    return a = a.detail, typeof a == "object" && "data" in a ? a.data : null;
  }
  var ie = !1;
  function je(a, b) {
    switch (a) {
      case "compositionend":
        return he(b);
      case "keypress":
        return b.which !== 32 ? null : (fe = !0, ee);
      case "textInput":
        return a = b.data, a === ee && fe ? null : a;
      default:
        return null;
    }
  }
  function ke(a, b) {
    if (ie)
      return a === "compositionend" || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = !1, a) : null;
    switch (a) {
      case "paste":
        return null;
      case "keypress":
        if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
          if (b.char && 1 < b.char.length)
            return b.char;
          if (b.which)
            return String.fromCharCode(b.which);
        }
        return null;
      case "compositionend":
        return de && b.locale !== "ko" ? null : b.data;
      default:
        return null;
    }
  }
  var le = {color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0};
  function me(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return b === "input" ? !!le[a.type] : b === "textarea";
  }
  function ne(a, b, c, d) {
    Eb(d), b = oe(b, "onChange"), 0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({event: c, listeners: b}));
  }
  var pe = null, qe = null;
  function re(a) {
    se(a, 0);
  }
  function te(a) {
    var b = ue(a);
    if (Wa(b))
      return a;
  }
  function ve(a, b) {
    if (a === "change")
      return b;
  }
  var we = !1;
  fa && (fa ? (ye = "oninput" in document, ye || (ze = document.createElement("div"), ze.setAttribute("oninput", "return;"), ye = typeof ze.oninput == "function"), xe = ye) : xe = !1, we = xe && (!document.documentMode || 9 < document.documentMode));
  var xe, ye, ze;
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a) {
    if (a.propertyName === "value" && te(qe)) {
      var b = [];
      if (ne(b, qe, a, xb(a)), a = re, Kb)
        a(b);
      else {
        Kb = !0;
        try {
          Gb(a, b);
        } finally {
          Kb = !1, Mb();
        }
      }
    }
  }
  function Ce(a, b, c) {
    a === "focusin" ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : a === "focusout" && Ae();
  }
  function De(a) {
    if (a === "selectionchange" || a === "keyup" || a === "keydown")
      return te(qe);
  }
  function Ee(a, b) {
    if (a === "click")
      return te(b);
  }
  function Fe(a, b) {
    if (a === "input" || a === "change")
      return te(b);
  }
  function Ge(a, b) {
    return a === b && (a !== 0 || 1 / a == 1 / b) || a !== a && b !== b;
  }
  var He = typeof Object.is == "function" ? Object.is : Ge, Ie = Object.prototype.hasOwnProperty;
  function Je(a, b) {
    if (He(a, b))
      return !0;
    if (typeof a != "object" || a === null || typeof b != "object" || b === null)
      return !1;
    var c = Object.keys(a), d = Object.keys(b);
    if (c.length !== d.length)
      return !1;
    for (d = 0; d < c.length; d++)
      if (!Ie.call(b, c[d]) || !He(a[c[d]], b[c[d]]))
        return !1;
    return !0;
  }
  function Ke(a) {
    for (; a && a.firstChild; )
      a = a.firstChild;
    return a;
  }
  function Le(a, b) {
    var c = Ke(a);
    a = 0;
    for (var d; c; ) {
      if (c.nodeType === 3) {
        if (d = a + c.textContent.length, a <= b && d >= b)
          return {node: c, offset: b - a};
        a = d;
      }
      a: {
        for (; c; ) {
          if (c.nextSibling) {
            c = c.nextSibling;
            break a;
          }
          c = c.parentNode;
        }
        c = void 0;
      }
      c = Ke(c);
    }
  }
  function Me(a, b) {
    return a && b ? a === b ? !0 : a && a.nodeType === 3 ? !1 : b && b.nodeType === 3 ? Me(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
  }
  function Ne() {
    for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
      try {
        var c = typeof b.contentWindow.location.href == "string";
      } catch (d) {
        c = !1;
      }
      if (c)
        a = b.contentWindow;
      else
        break;
      b = Xa(a.document);
    }
    return b;
  }
  function Oe(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return b && (b === "input" && (a.type === "text" || a.type === "search" || a.type === "tel" || a.type === "url" || a.type === "password") || b === "textarea" || a.contentEditable === "true");
  }
  var Pe = fa && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = !1;
  function Ue(a, b, c) {
    var d = c.window === c ? c.document : c.nodeType === 9 ? c : c.ownerDocument;
    Te || Qe == null || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Oe(d) ? d = {start: d.selectionStart, end: d.selectionEnd} : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = {anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset}), Se && Je(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({event: b, listeners: d}), b.target = Qe)));
  }
  Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
  Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
  Pc(Oc, 2);
  for (var Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++)
    Nc.set(Ve[We], 0);
  ea("onMouseEnter", ["mouseout", "mouseover"]);
  ea("onMouseLeave", ["mouseout", "mouseover"]);
  ea("onPointerEnter", ["pointerout", "pointerover"]);
  ea("onPointerLeave", ["pointerout", "pointerover"]);
  da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
  function Ze(a, b, c) {
    var d = a.type || "unknown-event";
    a.currentTarget = c, Yb(d, b, void 0, a), a.currentTarget = null;
  }
  function se(a, b) {
    b = (b & 4) != 0;
    for (var c = 0; c < a.length; c++) {
      var d = a[c], e = d.event;
      d = d.listeners;
      a: {
        var f = void 0;
        if (b)
          for (var g = d.length - 1; 0 <= g; g--) {
            var h = d[g], k = h.instance, l = h.currentTarget;
            if (h = h.listener, k !== f && e.isPropagationStopped())
              break a;
            Ze(e, h, l), f = k;
          }
        else
          for (g = 0; g < d.length; g++) {
            if (h = d[g], k = h.instance, l = h.currentTarget, h = h.listener, k !== f && e.isPropagationStopped())
              break a;
            Ze(e, h, l), f = k;
          }
      }
    }
    if (Ub)
      throw a = Vb, Ub = !1, Vb = null, a;
  }
  function G(a, b) {
    var c = $e(b), d = a + "__bubble";
    c.has(d) || (af(b, a, 2, !1), c.add(d));
  }
  var bf = "_reactListening" + Math.random().toString(36).slice(2);
  function cf(a) {
    a[bf] || (a[bf] = !0, ba.forEach(function(b) {
      Ye.has(b) || df(b, !1, a, null), df(b, !0, a, null);
    }));
  }
  function df(a, b, c, d) {
    var e = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0, f = c;
    if (a === "selectionchange" && c.nodeType !== 9 && (f = c.ownerDocument), d !== null && !b && Ye.has(a)) {
      if (a !== "scroll")
        return;
      e |= 2, f = d;
    }
    var g = $e(f), h = a + "__" + (b ? "capture" : "bubble");
    g.has(h) || (b && (e |= 4), af(f, a, e, b), g.add(h));
  }
  function af(a, b, c, d) {
    var e = Nc.get(b);
    switch (e === void 0 ? 2 : e) {
      case 0:
        e = gd;
        break;
      case 1:
        e = id;
        break;
      default:
        e = hd;
    }
    c = e.bind(null, b, c, a), e = void 0, !Pb || b !== "touchstart" && b !== "touchmove" && b !== "wheel" || (e = !0), d ? e !== void 0 ? a.addEventListener(b, c, {capture: !0, passive: e}) : a.addEventListener(b, c, !0) : e !== void 0 ? a.addEventListener(b, c, {passive: e}) : a.addEventListener(b, c, !1);
  }
  function jd(a, b, c, d, e) {
    var f = d;
    if ((b & 1) == 0 && (b & 2) == 0 && d !== null)
      a:
        for (; ; ) {
          if (d === null)
            return;
          var g = d.tag;
          if (g === 3 || g === 4) {
            var h = d.stateNode.containerInfo;
            if (h === e || h.nodeType === 8 && h.parentNode === e)
              break;
            if (g === 4)
              for (g = d.return; g !== null; ) {
                var k = g.tag;
                if ((k === 3 || k === 4) && (k = g.stateNode.containerInfo, k === e || k.nodeType === 8 && k.parentNode === e))
                  return;
                g = g.return;
              }
            for (; h !== null; ) {
              if (g = wc(h), g === null)
                return;
              if (k = g.tag, k === 5 || k === 6) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
    Nb(function() {
      var d2 = f, e2 = xb(c), g2 = [];
      a: {
        var h2 = Mc.get(a);
        if (h2 !== void 0) {
          var k2 = td, x = a;
          switch (a) {
            case "keypress":
              if (od(c) === 0)
                break a;
            case "keydown":
            case "keyup":
              k2 = Rd;
              break;
            case "focusin":
              x = "focus", k2 = Fd;
              break;
            case "focusout":
              x = "blur", k2 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k2 = Fd;
              break;
            case "click":
              if (c.button === 2)
                break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k2 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k2 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k2 = Vd;
              break;
            case Ic:
            case Jc:
            case Kc:
              k2 = Hd;
              break;
            case Lc:
              k2 = Xd;
              break;
            case "scroll":
              k2 = vd;
              break;
            case "wheel":
              k2 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k2 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k2 = Td;
          }
          var w = (b & 4) != 0, z = !w && a === "scroll", u = w ? h2 !== null ? h2 + "Capture" : null : h2;
          w = [];
          for (var t = d2, q; t !== null; ) {
            q = t;
            var v = q.stateNode;
            if (q.tag === 5 && v !== null && (q = v, u !== null && (v = Ob(t, u), v != null && w.push(ef(t, v, q)))), z)
              break;
            t = t.return;
          }
          0 < w.length && (h2 = new k2(h2, x, null, c, e2), g2.push({event: h2, listeners: w}));
        }
      }
      if ((b & 7) == 0) {
        a: {
          if (h2 = a === "mouseover" || a === "pointerover", k2 = a === "mouseout" || a === "pointerout", h2 && (b & 16) == 0 && (x = c.relatedTarget || c.fromElement) && (wc(x) || x[ff]))
            break a;
          if ((k2 || h2) && (h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window, k2 ? (x = c.relatedTarget || c.toElement, k2 = d2, x = x ? wc(x) : null, x !== null && (z = Zb(x), x !== z || x.tag !== 5 && x.tag !== 6) && (x = null)) : (k2 = null, x = d2), k2 !== x)) {
            if (w = Bd, v = "onMouseLeave", u = "onMouseEnter", t = "mouse", (a === "pointerout" || a === "pointerover") && (w = Td, v = "onPointerLeave", u = "onPointerEnter", t = "pointer"), z = k2 == null ? h2 : ue(k2), q = x == null ? h2 : ue(x), h2 = new w(v, t + "leave", k2, c, e2), h2.target = z, h2.relatedTarget = q, v = null, wc(e2) === d2 && (w = new w(u, t + "enter", x, c, e2), w.target = q, w.relatedTarget = z, v = w), z = v, k2 && x)
              b: {
                for (w = k2, u = x, t = 0, q = w; q; q = gf(q))
                  t++;
                for (q = 0, v = u; v; v = gf(v))
                  q++;
                for (; 0 < t - q; )
                  w = gf(w), t--;
                for (; 0 < q - t; )
                  u = gf(u), q--;
                for (; t--; ) {
                  if (w === u || u !== null && w === u.alternate)
                    break b;
                  w = gf(w), u = gf(u);
                }
                w = null;
              }
            else
              w = null;
            k2 !== null && hf(g2, h2, k2, w, !1), x !== null && z !== null && hf(g2, z, x, w, !0);
          }
        }
        a: {
          if (h2 = d2 ? ue(d2) : window, k2 = h2.nodeName && h2.nodeName.toLowerCase(), k2 === "select" || k2 === "input" && h2.type === "file")
            var J = ve;
          else if (me(h2))
            if (we)
              J = Fe;
            else {
              J = De;
              var K = Ce;
            }
          else
            (k2 = h2.nodeName) && k2.toLowerCase() === "input" && (h2.type === "checkbox" || h2.type === "radio") && (J = Ee);
          if (J && (J = J(a, d2))) {
            ne(g2, J, c, e2);
            break a;
          }
          K && K(a, h2, d2), a === "focusout" && (K = h2._wrapperState) && K.controlled && h2.type === "number" && bb(h2, "number", h2.value);
        }
        switch (K = d2 ? ue(d2) : window, a) {
          case "focusin":
            (me(K) || K.contentEditable === "true") && (Qe = K, Re = d2, Se = null);
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = !1, Ue(g2, c, e2);
            break;
          case "selectionchange":
            if (Pe)
              break;
          case "keydown":
          case "keyup":
            Ue(g2, c, e2);
        }
        var Q;
        if (ae)
          b: {
            switch (a) {
              case "compositionstart":
                var L = "onCompositionStart";
                break b;
              case "compositionend":
                L = "onCompositionEnd";
                break b;
              case "compositionupdate":
                L = "onCompositionUpdate";
                break b;
            }
            L = void 0;
          }
        else
          ie ? ge(a, c) && (L = "onCompositionEnd") : a === "keydown" && c.keyCode === 229 && (L = "onCompositionStart");
        L && (de && c.locale !== "ko" && (ie || L !== "onCompositionStart" ? L === "onCompositionEnd" && ie && (Q = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), K = oe(d2, L), 0 < K.length && (L = new Ld(L, a, null, c, e2), g2.push({event: L, listeners: K}), Q ? L.data = Q : (Q = he(c), Q !== null && (L.data = Q)))), (Q = ce ? je(a, c) : ke(a, c)) && (d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({event: e2, listeners: d2}), e2.data = Q));
      }
      se(g2, b);
    });
  }
  function ef(a, b, c) {
    return {instance: a, listener: b, currentTarget: c};
  }
  function oe(a, b) {
    for (var c = b + "Capture", d = []; a !== null; ) {
      var e = a, f = e.stateNode;
      e.tag === 5 && f !== null && (e = f, f = Ob(a, c), f != null && d.unshift(ef(a, f, e)), f = Ob(a, b), f != null && d.push(ef(a, f, e))), a = a.return;
    }
    return d;
  }
  function gf(a) {
    if (a === null)
      return null;
    do
      a = a.return;
    while (a && a.tag !== 5);
    return a || null;
  }
  function hf(a, b, c, d, e) {
    for (var f = b._reactName, g = []; c !== null && c !== d; ) {
      var h = c, k = h.alternate, l = h.stateNode;
      if (k !== null && k === d)
        break;
      h.tag === 5 && l !== null && (h = l, e ? (k = Ob(c, f), k != null && g.unshift(ef(c, k, h))) : e || (k = Ob(c, f), k != null && g.push(ef(c, k, h)))), c = c.return;
    }
    g.length !== 0 && a.push({event: b, listeners: g});
  }
  function jf() {
  }
  var kf = null, lf = null;
  function mf(a, b) {
    switch (a) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!b.autoFocus;
    }
    return !1;
  }
  function nf(a, b) {
    return a === "textarea" || a === "option" || a === "noscript" || typeof b.children == "string" || typeof b.children == "number" || typeof b.dangerouslySetInnerHTML == "object" && b.dangerouslySetInnerHTML !== null && b.dangerouslySetInnerHTML.__html != null;
  }
  var of = typeof setTimeout == "function" ? setTimeout : void 0, pf = typeof clearTimeout == "function" ? clearTimeout : void 0;
  function qf(a) {
    a.nodeType === 1 ? a.textContent = "" : a.nodeType === 9 && (a = a.body, a != null && (a.textContent = ""));
  }
  function rf(a) {
    for (; a != null; a = a.nextSibling) {
      var b = a.nodeType;
      if (b === 1 || b === 3)
        break;
    }
    return a;
  }
  function sf(a) {
    a = a.previousSibling;
    for (var b = 0; a; ) {
      if (a.nodeType === 8) {
        var c = a.data;
        if (c === "$" || c === "$!" || c === "$?") {
          if (b === 0)
            return a;
          b--;
        } else
          c === "/$" && b++;
      }
      a = a.previousSibling;
    }
    return null;
  }
  var tf = 0;
  function uf(a) {
    return {$$typeof: Ga, toString: a, valueOf: a};
  }
  var vf = Math.random().toString(36).slice(2), wf = "__reactFiber$" + vf, xf = "__reactProps$" + vf, ff = "__reactContainer$" + vf, yf = "__reactEvents$" + vf;
  function wc(a) {
    var b = a[wf];
    if (b)
      return b;
    for (var c = a.parentNode; c; ) {
      if (b = c[ff] || c[wf]) {
        if (c = b.alternate, b.child !== null || c !== null && c.child !== null)
          for (a = sf(a); a !== null; ) {
            if (c = a[wf])
              return c;
            a = sf(a);
          }
        return b;
      }
      a = c, c = a.parentNode;
    }
    return null;
  }
  function Cb(a) {
    return a = a[wf] || a[ff], !a || a.tag !== 5 && a.tag !== 6 && a.tag !== 13 && a.tag !== 3 ? null : a;
  }
  function ue(a) {
    if (a.tag === 5 || a.tag === 6)
      return a.stateNode;
    throw Error(y(33));
  }
  function Db(a) {
    return a[xf] || null;
  }
  function $e(a) {
    var b = a[yf];
    return b === void 0 && (b = a[yf] = new Set()), b;
  }
  var zf = [], Af = -1;
  function Bf(a) {
    return {current: a};
  }
  function H(a) {
    0 > Af || (a.current = zf[Af], zf[Af] = null, Af--);
  }
  function I(a, b) {
    Af++, zf[Af] = a.current, a.current = b;
  }
  var Cf = {}, M = Bf(Cf), N = Bf(!1), Df = Cf;
  function Ef(a, b) {
    var c = a.type.contextTypes;
    if (!c)
      return Cf;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
      return d.__reactInternalMemoizedMaskedChildContext;
    var e = {}, f;
    for (f in c)
      e[f] = b[f];
    return d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e), e;
  }
  function Ff(a) {
    return a = a.childContextTypes, a != null;
  }
  function Gf() {
    H(N), H(M);
  }
  function Hf(a, b, c) {
    if (M.current !== Cf)
      throw Error(y(168));
    I(M, b), I(N, c);
  }
  function If(a, b, c) {
    var d = a.stateNode;
    if (a = b.childContextTypes, typeof d.getChildContext != "function")
      return c;
    d = d.getChildContext();
    for (var e in d)
      if (!(e in a))
        throw Error(y(108, Ra(b) || "Unknown", e));
    return m({}, c, d);
  }
  function Jf(a) {
    return a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Cf, Df = M.current, I(M, a), I(N, N.current), !0;
  }
  function Kf(a, b, c) {
    var d = a.stateNode;
    if (!d)
      throw Error(y(169));
    c ? (a = If(a, b, Df), d.__reactInternalMemoizedMergedChildContext = a, H(N), H(M), I(M, a)) : H(N), I(N, c);
  }
  var Lf = null, Mf = null, Nf = r.unstable_runWithPriority, Of = r.unstable_scheduleCallback, Pf = r.unstable_cancelCallback, Qf = r.unstable_shouldYield, Rf = r.unstable_requestPaint, Sf = r.unstable_now, Tf = r.unstable_getCurrentPriorityLevel, Uf = r.unstable_ImmediatePriority, Vf = r.unstable_UserBlockingPriority, Wf = r.unstable_NormalPriority, Xf = r.unstable_LowPriority, Yf = r.unstable_IdlePriority, Zf = {}, $f = Rf !== void 0 ? Rf : function() {
  }, ag = null, bg = null, cg = !1, dg = Sf(), O = 1e4 > dg ? Sf : function() {
    return Sf() - dg;
  };
  function eg() {
    switch (Tf()) {
      case Uf:
        return 99;
      case Vf:
        return 98;
      case Wf:
        return 97;
      case Xf:
        return 96;
      case Yf:
        return 95;
      default:
        throw Error(y(332));
    }
  }
  function fg(a) {
    switch (a) {
      case 99:
        return Uf;
      case 98:
        return Vf;
      case 97:
        return Wf;
      case 96:
        return Xf;
      case 95:
        return Yf;
      default:
        throw Error(y(332));
    }
  }
  function gg(a, b) {
    return a = fg(a), Nf(a, b);
  }
  function hg(a, b, c) {
    return a = fg(a), Of(a, b, c);
  }
  function ig() {
    if (bg !== null) {
      var a = bg;
      bg = null, Pf(a);
    }
    jg();
  }
  function jg() {
    if (!cg && ag !== null) {
      cg = !0;
      var a = 0;
      try {
        var b = ag;
        gg(99, function() {
          for (; a < b.length; a++) {
            var c = b[a];
            do
              c = c(!0);
            while (c !== null);
          }
        }), ag = null;
      } catch (c) {
        throw ag !== null && (ag = ag.slice(a + 1)), Of(Uf, ig), c;
      } finally {
        cg = !1;
      }
    }
  }
  var kg = ra.ReactCurrentBatchConfig;
  function lg(a, b) {
    if (a && a.defaultProps) {
      b = m({}, b), a = a.defaultProps;
      for (var c in a)
        b[c] === void 0 && (b[c] = a[c]);
      return b;
    }
    return b;
  }
  var mg = Bf(null), ng = null, og = null, pg = null;
  function qg() {
    pg = og = ng = null;
  }
  function rg(a) {
    var b = mg.current;
    H(mg), a.type._context._currentValue = b;
  }
  function sg(a, b) {
    for (; a !== null; ) {
      var c = a.alternate;
      if ((a.childLanes & b) === b) {
        if (c === null || (c.childLanes & b) === b)
          break;
        c.childLanes |= b;
      } else
        a.childLanes |= b, c !== null && (c.childLanes |= b);
      a = a.return;
    }
  }
  function tg(a, b) {
    ng = a, pg = og = null, a = a.dependencies, a !== null && a.firstContext !== null && ((a.lanes & b) != 0 && (ug = !0), a.firstContext = null);
  }
  function vg(a, b) {
    if (pg !== a && b !== !1 && b !== 0)
      if ((typeof b != "number" || b === 1073741823) && (pg = a, b = 1073741823), b = {context: a, observedBits: b, next: null}, og === null) {
        if (ng === null)
          throw Error(y(308));
        og = b, ng.dependencies = {lanes: 0, firstContext: b, responders: null};
      } else
        og = og.next = b;
    return a._currentValue;
  }
  var wg = !1;
  function xg(a) {
    a.updateQueue = {baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: {pending: null}, effects: null};
  }
  function yg(a, b) {
    a = a.updateQueue, b.updateQueue === a && (b.updateQueue = {baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects});
  }
  function zg(a, b) {
    return {eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null};
  }
  function Ag(a, b) {
    if (a = a.updateQueue, a !== null) {
      a = a.shared;
      var c = a.pending;
      c === null ? b.next = b : (b.next = c.next, c.next = b), a.pending = b;
    }
  }
  function Bg(a, b) {
    var c = a.updateQueue, d = a.alternate;
    if (d !== null && (d = d.updateQueue, c === d)) {
      var e = null, f = null;
      if (c = c.firstBaseUpdate, c !== null) {
        do {
          var g = {eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null};
          f === null ? e = f = g : f = f.next = g, c = c.next;
        } while (c !== null);
        f === null ? e = f = b : f = f.next = b;
      } else
        e = f = b;
      c = {baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects}, a.updateQueue = c;
      return;
    }
    a = c.lastBaseUpdate, a === null ? c.firstBaseUpdate = b : a.next = b, c.lastBaseUpdate = b;
  }
  function Cg(a, b, c, d) {
    var e = a.updateQueue;
    wg = !1;
    var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
    if (h !== null) {
      e.shared.pending = null;
      var k = h, l = k.next;
      k.next = null, g === null ? f = l : g.next = l, g = k;
      var n = a.alternate;
      if (n !== null) {
        n = n.updateQueue;
        var A = n.lastBaseUpdate;
        A !== g && (A === null ? n.firstBaseUpdate = l : A.next = l, n.lastBaseUpdate = k);
      }
    }
    if (f !== null) {
      A = e.baseState, g = 0, n = l = k = null;
      do {
        h = f.lane;
        var p = f.eventTime;
        if ((d & h) === h) {
          n !== null && (n = n.next = {
            eventTime: p,
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          });
          a: {
            var C = a, x = f;
            switch (h = b, p = c, x.tag) {
              case 1:
                if (C = x.payload, typeof C == "function") {
                  A = C.call(p, A, h);
                  break a;
                }
                A = C;
                break a;
              case 3:
                C.flags = C.flags & -4097 | 64;
              case 0:
                if (C = x.payload, h = typeof C == "function" ? C.call(p, A, h) : C, h == null)
                  break a;
                A = m({}, A, h);
                break a;
              case 2:
                wg = !0;
            }
          }
          f.callback !== null && (a.flags |= 32, h = e.effects, h === null ? e.effects = [f] : h.push(f));
        } else
          p = {eventTime: p, lane: h, tag: f.tag, payload: f.payload, callback: f.callback, next: null}, n === null ? (l = n = p, k = A) : n = n.next = p, g |= h;
        if (f = f.next, f === null) {
          if (h = e.shared.pending, h === null)
            break;
          f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
        }
      } while (1);
      n === null && (k = A), e.baseState = k, e.firstBaseUpdate = l, e.lastBaseUpdate = n, Dg |= g, a.lanes = g, a.memoizedState = A;
    }
  }
  function Eg(a, b, c) {
    if (a = b.effects, b.effects = null, a !== null)
      for (b = 0; b < a.length; b++) {
        var d = a[b], e = d.callback;
        if (e !== null) {
          if (d.callback = null, d = c, typeof e != "function")
            throw Error(y(191, e));
          e.call(d);
        }
      }
  }
  var Fg = new aa.Component().refs;
  function Gg(a, b, c, d) {
    b = a.memoizedState, c = c(d, b), c = c == null ? b : m({}, b, c), a.memoizedState = c, a.lanes === 0 && (a.updateQueue.baseState = c);
  }
  var Kg = {isMounted: function(a) {
    return (a = a._reactInternals) ? Zb(a) === a : !1;
  }, enqueueSetState: function(a, b, c) {
    a = a._reactInternals;
    var d = Hg(), e = Ig(a), f = zg(d, e);
    f.payload = b, c != null && (f.callback = c), Ag(a, f), Jg(a, e, d);
  }, enqueueReplaceState: function(a, b, c) {
    a = a._reactInternals;
    var d = Hg(), e = Ig(a), f = zg(d, e);
    f.tag = 1, f.payload = b, c != null && (f.callback = c), Ag(a, f), Jg(a, e, d);
  }, enqueueForceUpdate: function(a, b) {
    a = a._reactInternals;
    var c = Hg(), d = Ig(a), e = zg(c, d);
    e.tag = 2, b != null && (e.callback = b), Ag(a, e), Jg(a, d, c);
  }};
  function Lg(a, b, c, d, e, f, g) {
    return a = a.stateNode, typeof a.shouldComponentUpdate == "function" ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Je(c, d) || !Je(e, f) : !0;
  }
  function Mg(a, b, c) {
    var d = !1, e = Cf, f = b.contextType;
    return typeof f == "object" && f !== null ? f = vg(f) : (e = Ff(b) ? Df : M.current, d = b.contextTypes, f = (d = d != null) ? Ef(a, e) : Cf), b = new b(c, f), a.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null, b.updater = Kg, a.stateNode = b, b._reactInternals = a, d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f), b;
  }
  function Ng(a, b, c, d) {
    a = b.state, typeof b.componentWillReceiveProps == "function" && b.componentWillReceiveProps(c, d), typeof b.UNSAFE_componentWillReceiveProps == "function" && b.UNSAFE_componentWillReceiveProps(c, d), b.state !== a && Kg.enqueueReplaceState(b, b.state, null);
  }
  function Og(a, b, c, d) {
    var e = a.stateNode;
    e.props = c, e.state = a.memoizedState, e.refs = Fg, xg(a);
    var f = b.contextType;
    typeof f == "object" && f !== null ? e.context = vg(f) : (f = Ff(b) ? Df : M.current, e.context = Ef(a, f)), Cg(a, c, e, d), e.state = a.memoizedState, f = b.getDerivedStateFromProps, typeof f == "function" && (Gg(a, b, f, c), e.state = a.memoizedState), typeof b.getDerivedStateFromProps == "function" || typeof e.getSnapshotBeforeUpdate == "function" || typeof e.UNSAFE_componentWillMount != "function" && typeof e.componentWillMount != "function" || (b = e.state, typeof e.componentWillMount == "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), b !== e.state && Kg.enqueueReplaceState(e, e.state, null), Cg(a, c, e, d), e.state = a.memoizedState), typeof e.componentDidMount == "function" && (a.flags |= 4);
  }
  var Pg = Array.isArray;
  function Qg(a, b, c) {
    if (a = c.ref, a !== null && typeof a != "function" && typeof a != "object") {
      if (c._owner) {
        if (c = c._owner, c) {
          if (c.tag !== 1)
            throw Error(y(309));
          var d = c.stateNode;
        }
        if (!d)
          throw Error(y(147, a));
        var e = "" + a;
        return b !== null && b.ref !== null && typeof b.ref == "function" && b.ref._stringRef === e ? b.ref : (b = function(a2) {
          var b2 = d.refs;
          b2 === Fg && (b2 = d.refs = {}), a2 === null ? delete b2[e] : b2[e] = a2;
        }, b._stringRef = e, b);
      }
      if (typeof a != "string")
        throw Error(y(284));
      if (!c._owner)
        throw Error(y(290, a));
    }
    return a;
  }
  function Rg(a, b) {
    if (a.type !== "textarea")
      throw Error(y(31, Object.prototype.toString.call(b) === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
  }
  function Sg(a) {
    function b(b2, c2) {
      if (a) {
        var d2 = b2.lastEffect;
        d2 !== null ? (d2.nextEffect = c2, b2.lastEffect = c2) : b2.firstEffect = b2.lastEffect = c2, c2.nextEffect = null, c2.flags = 8;
      }
    }
    function c(c2, d2) {
      if (!a)
        return null;
      for (; d2 !== null; )
        b(c2, d2), d2 = d2.sibling;
      return null;
    }
    function d(a2, b2) {
      for (a2 = new Map(); b2 !== null; )
        b2.key !== null ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
      return a2;
    }
    function e(a2, b2) {
      return a2 = Tg(a2, b2), a2.index = 0, a2.sibling = null, a2;
    }
    function f(b2, c2, d2) {
      return b2.index = d2, a ? (d2 = b2.alternate, d2 !== null ? (d2 = d2.index, d2 < c2 ? (b2.flags = 2, c2) : d2) : (b2.flags = 2, c2)) : c2;
    }
    function g(b2) {
      return a && b2.alternate === null && (b2.flags = 2), b2;
    }
    function h(a2, b2, c2, d2) {
      return b2 === null || b2.tag !== 6 ? (b2 = Ug(c2, a2.mode, d2), b2.return = a2, b2) : (b2 = e(b2, c2), b2.return = a2, b2);
    }
    function k(a2, b2, c2, d2) {
      return b2 !== null && b2.elementType === c2.type ? (d2 = e(b2, c2.props), d2.ref = Qg(a2, b2, c2), d2.return = a2, d2) : (d2 = Vg(c2.type, c2.key, c2.props, null, a2.mode, d2), d2.ref = Qg(a2, b2, c2), d2.return = a2, d2);
    }
    function l(a2, b2, c2, d2) {
      return b2 === null || b2.tag !== 4 || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation ? (b2 = Wg(c2, a2.mode, d2), b2.return = a2, b2) : (b2 = e(b2, c2.children || []), b2.return = a2, b2);
    }
    function n(a2, b2, c2, d2, f2) {
      return b2 === null || b2.tag !== 7 ? (b2 = Xg(c2, a2.mode, d2, f2), b2.return = a2, b2) : (b2 = e(b2, c2), b2.return = a2, b2);
    }
    function A(a2, b2, c2) {
      if (typeof b2 == "string" || typeof b2 == "number")
        return b2 = Ug("" + b2, a2.mode, c2), b2.return = a2, b2;
      if (typeof b2 == "object" && b2 !== null) {
        switch (b2.$$typeof) {
          case sa:
            return c2 = Vg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Qg(a2, null, b2), c2.return = a2, c2;
          case ta:
            return b2 = Wg(b2, a2.mode, c2), b2.return = a2, b2;
        }
        if (Pg(b2) || La(b2))
          return b2 = Xg(b2, a2.mode, c2, null), b2.return = a2, b2;
        Rg(a2, b2);
      }
      return null;
    }
    function p(a2, b2, c2, d2) {
      var e2 = b2 !== null ? b2.key : null;
      if (typeof c2 == "string" || typeof c2 == "number")
        return e2 !== null ? null : h(a2, b2, "" + c2, d2);
      if (typeof c2 == "object" && c2 !== null) {
        switch (c2.$$typeof) {
          case sa:
            return c2.key === e2 ? c2.type === ua ? n(a2, b2, c2.props.children, d2, e2) : k(a2, b2, c2, d2) : null;
          case ta:
            return c2.key === e2 ? l(a2, b2, c2, d2) : null;
        }
        if (Pg(c2) || La(c2))
          return e2 !== null ? null : n(a2, b2, c2, d2, null);
        Rg(a2, c2);
      }
      return null;
    }
    function C(a2, b2, c2, d2, e2) {
      if (typeof d2 == "string" || typeof d2 == "number")
        return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
      if (typeof d2 == "object" && d2 !== null) {
        switch (d2.$$typeof) {
          case sa:
            return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, d2.type === ua ? n(b2, a2, d2.props.children, e2, d2.key) : k(b2, a2, d2, e2);
          case ta:
            return a2 = a2.get(d2.key === null ? c2 : d2.key) || null, l(b2, a2, d2, e2);
        }
        if (Pg(d2) || La(d2))
          return a2 = a2.get(c2) || null, n(b2, a2, d2, e2, null);
        Rg(b2, d2);
      }
      return null;
    }
    function x(e2, g2, h2, k2) {
      for (var l2 = null, t = null, u = g2, z = g2 = 0, q = null; u !== null && z < h2.length; z++) {
        u.index > z ? (q = u, u = null) : q = u.sibling;
        var n2 = p(e2, u, h2[z], k2);
        if (n2 === null) {
          u === null && (u = q);
          break;
        }
        a && u && n2.alternate === null && b(e2, u), g2 = f(n2, g2, z), t === null ? l2 = n2 : t.sibling = n2, t = n2, u = q;
      }
      if (z === h2.length)
        return c(e2, u), l2;
      if (u === null) {
        for (; z < h2.length; z++)
          u = A(e2, h2[z], k2), u !== null && (g2 = f(u, g2, z), t === null ? l2 = u : t.sibling = u, t = u);
        return l2;
      }
      for (u = d(e2, u); z < h2.length; z++)
        q = C(u, e2, z, h2[z], k2), q !== null && (a && q.alternate !== null && u.delete(q.key === null ? z : q.key), g2 = f(q, g2, z), t === null ? l2 = q : t.sibling = q, t = q);
      return a && u.forEach(function(a2) {
        return b(e2, a2);
      }), l2;
    }
    function w(e2, g2, h2, k2) {
      var l2 = La(h2);
      if (typeof l2 != "function")
        throw Error(y(150));
      if (h2 = l2.call(h2), h2 == null)
        throw Error(y(151));
      for (var t = l2 = null, u = g2, z = g2 = 0, q = null, n2 = h2.next(); u !== null && !n2.done; z++, n2 = h2.next()) {
        u.index > z ? (q = u, u = null) : q = u.sibling;
        var w2 = p(e2, u, n2.value, k2);
        if (w2 === null) {
          u === null && (u = q);
          break;
        }
        a && u && w2.alternate === null && b(e2, u), g2 = f(w2, g2, z), t === null ? l2 = w2 : t.sibling = w2, t = w2, u = q;
      }
      if (n2.done)
        return c(e2, u), l2;
      if (u === null) {
        for (; !n2.done; z++, n2 = h2.next())
          n2 = A(e2, n2.value, k2), n2 !== null && (g2 = f(n2, g2, z), t === null ? l2 = n2 : t.sibling = n2, t = n2);
        return l2;
      }
      for (u = d(e2, u); !n2.done; z++, n2 = h2.next())
        n2 = C(u, e2, z, n2.value, k2), n2 !== null && (a && n2.alternate !== null && u.delete(n2.key === null ? z : n2.key), g2 = f(n2, g2, z), t === null ? l2 = n2 : t.sibling = n2, t = n2);
      return a && u.forEach(function(a2) {
        return b(e2, a2);
      }), l2;
    }
    return function(a2, d2, f2, h2) {
      var k2 = typeof f2 == "object" && f2 !== null && f2.type === ua && f2.key === null;
      k2 && (f2 = f2.props.children);
      var l2 = typeof f2 == "object" && f2 !== null;
      if (l2)
        switch (f2.$$typeof) {
          case sa:
            a: {
              for (l2 = f2.key, k2 = d2; k2 !== null; ) {
                if (k2.key === l2) {
                  switch (k2.tag) {
                    case 7:
                      if (f2.type === ua) {
                        c(a2, k2.sibling), d2 = e(k2, f2.props.children), d2.return = a2, a2 = d2;
                        break a;
                      }
                      break;
                    default:
                      if (k2.elementType === f2.type) {
                        c(a2, k2.sibling), d2 = e(k2, f2.props), d2.ref = Qg(a2, k2, f2), d2.return = a2, a2 = d2;
                        break a;
                      }
                  }
                  c(a2, k2);
                  break;
                } else
                  b(a2, k2);
                k2 = k2.sibling;
              }
              f2.type === ua ? (d2 = Xg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Vg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Qg(a2, d2, f2), h2.return = a2, a2 = h2);
            }
            return g(a2);
          case ta:
            a: {
              for (k2 = f2.key; d2 !== null; ) {
                if (d2.key === k2)
                  if (d2.tag === 4 && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                    c(a2, d2.sibling), d2 = e(d2, f2.children || []), d2.return = a2, a2 = d2;
                    break a;
                  } else {
                    c(a2, d2);
                    break;
                  }
                else
                  b(a2, d2);
                d2 = d2.sibling;
              }
              d2 = Wg(f2, a2.mode, h2), d2.return = a2, a2 = d2;
            }
            return g(a2);
        }
      if (typeof f2 == "string" || typeof f2 == "number")
        return f2 = "" + f2, d2 !== null && d2.tag === 6 ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Ug(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2);
      if (Pg(f2))
        return x(a2, d2, f2, h2);
      if (La(f2))
        return w(a2, d2, f2, h2);
      if (l2 && Rg(a2, f2), typeof f2 == "undefined" && !k2)
        switch (a2.tag) {
          case 1:
          case 22:
          case 0:
          case 11:
          case 15:
            throw Error(y(152, Ra(a2.type) || "Component"));
        }
      return c(a2, d2);
    };
  }
  var Yg = Sg(!0), Zg = Sg(!1), $g = {}, ah = Bf($g), bh = Bf($g), ch = Bf($g);
  function dh(a) {
    if (a === $g)
      throw Error(y(174));
    return a;
  }
  function eh(a, b) {
    switch (I(ch, b), I(bh, a), I(ah, $g), a = b.nodeType, a) {
      case 9:
      case 11:
        b = (b = b.documentElement) ? b.namespaceURI : mb(null, "");
        break;
      default:
        a = a === 8 ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = mb(b, a);
    }
    H(ah), I(ah, b);
  }
  function fh() {
    H(ah), H(bh), H(ch);
  }
  function gh(a) {
    dh(ch.current);
    var b = dh(ah.current), c = mb(b, a.type);
    b !== c && (I(bh, a), I(ah, c));
  }
  function hh(a) {
    bh.current === a && (H(ah), H(bh));
  }
  var P = Bf(0);
  function ih(a) {
    for (var b = a; b !== null; ) {
      if (b.tag === 13) {
        var c = b.memoizedState;
        if (c !== null && (c = c.dehydrated, c === null || c.data === "$?" || c.data === "$!"))
          return b;
      } else if (b.tag === 19 && b.memoizedProps.revealOrder !== void 0) {
        if ((b.flags & 64) != 0)
          return b;
      } else if (b.child !== null) {
        b.child.return = b, b = b.child;
        continue;
      }
      if (b === a)
        break;
      for (; b.sibling === null; ) {
        if (b.return === null || b.return === a)
          return null;
        b = b.return;
      }
      b.sibling.return = b.return, b = b.sibling;
    }
    return null;
  }
  var jh = null, kh = null, lh = !1;
  function mh(a, b) {
    var c = nh(5, null, null, 0);
    c.elementType = "DELETED", c.type = "DELETED", c.stateNode = b, c.return = a, c.flags = 8, a.lastEffect !== null ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
  }
  function oh(a, b) {
    switch (a.tag) {
      case 5:
        var c = a.type;
        return b = b.nodeType !== 1 || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b, b !== null ? (a.stateNode = b, !0) : !1;
      case 6:
        return b = a.pendingProps === "" || b.nodeType !== 3 ? null : b, b !== null ? (a.stateNode = b, !0) : !1;
      case 13:
        return !1;
      default:
        return !1;
    }
  }
  function ph(a) {
    if (lh) {
      var b = kh;
      if (b) {
        var c = b;
        if (!oh(a, b)) {
          if (b = rf(c.nextSibling), !b || !oh(a, b)) {
            a.flags = a.flags & -1025 | 2, lh = !1, jh = a;
            return;
          }
          mh(jh, c);
        }
        jh = a, kh = rf(b.firstChild);
      } else
        a.flags = a.flags & -1025 | 2, lh = !1, jh = a;
    }
  }
  function qh(a) {
    for (a = a.return; a !== null && a.tag !== 5 && a.tag !== 3 && a.tag !== 13; )
      a = a.return;
    jh = a;
  }
  function rh(a) {
    if (a !== jh)
      return !1;
    if (!lh)
      return qh(a), lh = !0, !1;
    var b = a.type;
    if (a.tag !== 5 || b !== "head" && b !== "body" && !nf(b, a.memoizedProps))
      for (b = kh; b; )
        mh(a, b), b = rf(b.nextSibling);
    if (qh(a), a.tag === 13) {
      if (a = a.memoizedState, a = a !== null ? a.dehydrated : null, !a)
        throw Error(y(317));
      a: {
        for (a = a.nextSibling, b = 0; a; ) {
          if (a.nodeType === 8) {
            var c = a.data;
            if (c === "/$") {
              if (b === 0) {
                kh = rf(a.nextSibling);
                break a;
              }
              b--;
            } else
              c !== "$" && c !== "$!" && c !== "$?" || b++;
          }
          a = a.nextSibling;
        }
        kh = null;
      }
    } else
      kh = jh ? rf(a.stateNode.nextSibling) : null;
    return !0;
  }
  function sh() {
    kh = jh = null, lh = !1;
  }
  var th = [];
  function uh() {
    for (var a = 0; a < th.length; a++)
      th[a]._workInProgressVersionPrimary = null;
    th.length = 0;
  }
  var vh = ra.ReactCurrentDispatcher, wh = ra.ReactCurrentBatchConfig, xh = 0, R = null, S = null, T = null, yh = !1, zh = !1;
  function Ah() {
    throw Error(y(321));
  }
  function Bh(a, b) {
    if (b === null)
      return !1;
    for (var c = 0; c < b.length && c < a.length; c++)
      if (!He(a[c], b[c]))
        return !1;
    return !0;
  }
  function Ch(a, b, c, d, e, f) {
    if (xh = f, R = b, b.memoizedState = null, b.updateQueue = null, b.lanes = 0, vh.current = a === null || a.memoizedState === null ? Dh : Eh, a = c(d, e), zh) {
      f = 0;
      do {
        if (zh = !1, !(25 > f))
          throw Error(y(301));
        f += 1, T = S = null, b.updateQueue = null, vh.current = Fh, a = c(d, e);
      } while (zh);
    }
    if (vh.current = Gh, b = S !== null && S.next !== null, xh = 0, T = S = R = null, yh = !1, b)
      throw Error(y(300));
    return a;
  }
  function Hh() {
    var a = {memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null};
    return T === null ? R.memoizedState = T = a : T = T.next = a, T;
  }
  function Ih() {
    if (S === null) {
      var a = R.alternate;
      a = a !== null ? a.memoizedState : null;
    } else
      a = S.next;
    var b = T === null ? R.memoizedState : T.next;
    if (b !== null)
      T = b, S = a;
    else {
      if (a === null)
        throw Error(y(310));
      S = a, a = {memoizedState: S.memoizedState, baseState: S.baseState, baseQueue: S.baseQueue, queue: S.queue, next: null}, T === null ? R.memoizedState = T = a : T = T.next = a;
    }
    return T;
  }
  function Jh(a, b) {
    return typeof b == "function" ? b(a) : b;
  }
  function Kh(a) {
    var b = Ih(), c = b.queue;
    if (c === null)
      throw Error(y(311));
    c.lastRenderedReducer = a;
    var d = S, e = d.baseQueue, f = c.pending;
    if (f !== null) {
      if (e !== null) {
        var g = e.next;
        e.next = f.next, f.next = g;
      }
      d.baseQueue = e = f, c.pending = null;
    }
    if (e !== null) {
      e = e.next, d = d.baseState;
      var h = g = f = null, k = e;
      do {
        var l = k.lane;
        if ((xh & l) === l)
          h !== null && (h = h.next = {lane: 0, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null}), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);
        else {
          var n = {
            lane: l,
            action: k.action,
            eagerReducer: k.eagerReducer,
            eagerState: k.eagerState,
            next: null
          };
          h === null ? (g = h = n, f = d) : h = h.next = n, R.lanes |= l, Dg |= l;
        }
        k = k.next;
      } while (k !== null && k !== e);
      h === null ? f = d : h.next = g, He(d, b.memoizedState) || (ug = !0), b.memoizedState = d, b.baseState = f, b.baseQueue = h, c.lastRenderedState = d;
    }
    return [b.memoizedState, c.dispatch];
  }
  function Lh(a) {
    var b = Ih(), c = b.queue;
    if (c === null)
      throw Error(y(311));
    c.lastRenderedReducer = a;
    var d = c.dispatch, e = c.pending, f = b.memoizedState;
    if (e !== null) {
      c.pending = null;
      var g = e = e.next;
      do
        f = a(f, g.action), g = g.next;
      while (g !== e);
      He(f, b.memoizedState) || (ug = !0), b.memoizedState = f, b.baseQueue === null && (b.baseState = f), c.lastRenderedState = f;
    }
    return [f, d];
  }
  function Mh(a, b, c) {
    var d = b._getVersion;
    d = d(b._source);
    var e = b._workInProgressVersionPrimary;
    if (e !== null ? a = e === d : (a = a.mutableReadLanes, (a = (xh & a) === a) && (b._workInProgressVersionPrimary = d, th.push(b))), a)
      return c(b._source);
    throw th.push(b), Error(y(350));
  }
  function Nh(a, b, c, d) {
    var e = U;
    if (e === null)
      throw Error(y(349));
    var f = b._getVersion, g = f(b._source), h = vh.current, k = h.useState(function() {
      return Mh(e, b, c);
    }), l = k[1], n = k[0];
    k = T;
    var A = a.memoizedState, p = A.refs, C = p.getSnapshot, x = A.source;
    A = A.subscribe;
    var w = R;
    return a.memoizedState = {refs: p, source: b, subscribe: d}, h.useEffect(function() {
      p.getSnapshot = c, p.setSnapshot = l;
      var a2 = f(b._source);
      if (!He(g, a2)) {
        a2 = c(b._source), He(n, a2) || (l(a2), a2 = Ig(w), e.mutableReadLanes |= a2 & e.pendingLanes), a2 = e.mutableReadLanes, e.entangledLanes |= a2;
        for (var d2 = e.entanglements, h2 = a2; 0 < h2; ) {
          var k2 = 31 - Vc(h2), v = 1 << k2;
          d2[k2] |= a2, h2 &= ~v;
        }
      }
    }, [c, b, d]), h.useEffect(function() {
      return d(b._source, function() {
        var a2 = p.getSnapshot, c2 = p.setSnapshot;
        try {
          c2(a2(b._source));
          var d2 = Ig(w);
          e.mutableReadLanes |= d2 & e.pendingLanes;
        } catch (q) {
          c2(function() {
            throw q;
          });
        }
      });
    }, [b, d]), He(C, c) && He(x, b) && He(A, d) || (a = {pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: n}, a.dispatch = l = Oh.bind(null, R, a), k.queue = a, k.baseQueue = null, n = Mh(e, b, c), k.memoizedState = k.baseState = n), n;
  }
  function Ph(a, b, c) {
    var d = Ih();
    return Nh(d, a, b, c);
  }
  function Qh(a) {
    var b = Hh();
    return typeof a == "function" && (a = a()), b.memoizedState = b.baseState = a, a = b.queue = {pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: a}, a = a.dispatch = Oh.bind(null, R, a), [b.memoizedState, a];
  }
  function Rh(a, b, c, d) {
    return a = {tag: a, create: b, destroy: c, deps: d, next: null}, b = R.updateQueue, b === null ? (b = {lastEffect: null}, R.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, c === null ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a)), a;
  }
  function Sh(a) {
    var b = Hh();
    return a = {current: a}, b.memoizedState = a;
  }
  function Th() {
    return Ih().memoizedState;
  }
  function Uh(a, b, c, d) {
    var e = Hh();
    R.flags |= a, e.memoizedState = Rh(1 | b, c, void 0, d === void 0 ? null : d);
  }
  function Vh(a, b, c, d) {
    var e = Ih();
    d = d === void 0 ? null : d;
    var f = void 0;
    if (S !== null) {
      var g = S.memoizedState;
      if (f = g.destroy, d !== null && Bh(d, g.deps)) {
        Rh(b, c, f, d);
        return;
      }
    }
    R.flags |= a, e.memoizedState = Rh(1 | b, c, f, d);
  }
  function Wh(a, b) {
    return Uh(516, 4, a, b);
  }
  function Xh(a, b) {
    return Vh(516, 4, a, b);
  }
  function Yh(a, b) {
    return Vh(4, 2, a, b);
  }
  function Zh(a, b) {
    if (typeof b == "function")
      return a = a(), b(a), function() {
        b(null);
      };
    if (b != null)
      return a = a(), b.current = a, function() {
        b.current = null;
      };
  }
  function $h(a, b, c) {
    return c = c != null ? c.concat([a]) : null, Vh(4, 2, Zh.bind(null, b, a), c);
  }
  function ai() {
  }
  function bi(a, b) {
    var c = Ih();
    b = b === void 0 ? null : b;
    var d = c.memoizedState;
    return d !== null && b !== null && Bh(b, d[1]) ? d[0] : (c.memoizedState = [a, b], a);
  }
  function ci(a, b) {
    var c = Ih();
    b = b === void 0 ? null : b;
    var d = c.memoizedState;
    return d !== null && b !== null && Bh(b, d[1]) ? d[0] : (a = a(), c.memoizedState = [a, b], a);
  }
  function di(a, b) {
    var c = eg();
    gg(98 > c ? 98 : c, function() {
      a(!0);
    }), gg(97 < c ? 97 : c, function() {
      var c2 = wh.transition;
      wh.transition = 1;
      try {
        a(!1), b();
      } finally {
        wh.transition = c2;
      }
    });
  }
  function Oh(a, b, c) {
    var d = Hg(), e = Ig(a), f = {lane: e, action: c, eagerReducer: null, eagerState: null, next: null}, g = b.pending;
    if (g === null ? f.next = f : (f.next = g.next, g.next = f), b.pending = f, g = a.alternate, a === R || g !== null && g === R)
      zh = yh = !0;
    else {
      if (a.lanes === 0 && (g === null || g.lanes === 0) && (g = b.lastRenderedReducer, g !== null))
        try {
          var h = b.lastRenderedState, k = g(h, c);
          if (f.eagerReducer = g, f.eagerState = k, He(k, h))
            return;
        } catch (l) {
        } finally {
        }
      Jg(a, e, d);
    }
  }
  var Gh = {readContext: vg, useCallback: Ah, useContext: Ah, useEffect: Ah, useImperativeHandle: Ah, useLayoutEffect: Ah, useMemo: Ah, useReducer: Ah, useRef: Ah, useState: Ah, useDebugValue: Ah, useDeferredValue: Ah, useTransition: Ah, useMutableSource: Ah, useOpaqueIdentifier: Ah, unstable_isNewReconciler: !1}, Dh = {readContext: vg, useCallback: function(a, b) {
    return Hh().memoizedState = [a, b === void 0 ? null : b], a;
  }, useContext: vg, useEffect: Wh, useImperativeHandle: function(a, b, c) {
    return c = c != null ? c.concat([a]) : null, Uh(4, 2, Zh.bind(null, b, a), c);
  }, useLayoutEffect: function(a, b) {
    return Uh(4, 2, a, b);
  }, useMemo: function(a, b) {
    var c = Hh();
    return b = b === void 0 ? null : b, a = a(), c.memoizedState = [a, b], a;
  }, useReducer: function(a, b, c) {
    var d = Hh();
    return b = c !== void 0 ? c(b) : b, d.memoizedState = d.baseState = b, a = d.queue = {pending: null, dispatch: null, lastRenderedReducer: a, lastRenderedState: b}, a = a.dispatch = Oh.bind(null, R, a), [d.memoizedState, a];
  }, useRef: Sh, useState: Qh, useDebugValue: ai, useDeferredValue: function(a) {
    var b = Qh(a), c = b[0], d = b[1];
    return Wh(function() {
      var b2 = wh.transition;
      wh.transition = 1;
      try {
        d(a);
      } finally {
        wh.transition = b2;
      }
    }, [a]), c;
  }, useTransition: function() {
    var a = Qh(!1), b = a[0];
    return a = di.bind(null, a[1]), Sh(a), [a, b];
  }, useMutableSource: function(a, b, c) {
    var d = Hh();
    return d.memoizedState = {refs: {getSnapshot: b, setSnapshot: null}, source: a, subscribe: c}, Nh(d, a, b, c);
  }, useOpaqueIdentifier: function() {
    if (lh) {
      var a = !1, b = uf(function() {
        throw a || (a = !0, c("r:" + (tf++).toString(36))), Error(y(355));
      }), c = Qh(b)[1];
      return (R.mode & 2) == 0 && (R.flags |= 516, Rh(5, function() {
        c("r:" + (tf++).toString(36));
      }, void 0, null)), b;
    }
    return b = "r:" + (tf++).toString(36), Qh(b), b;
  }, unstable_isNewReconciler: !1}, Eh = {readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Kh, useRef: Th, useState: function() {
    return Kh(Jh);
  }, useDebugValue: ai, useDeferredValue: function(a) {
    var b = Kh(Jh), c = b[0], d = b[1];
    return Xh(function() {
      var b2 = wh.transition;
      wh.transition = 1;
      try {
        d(a);
      } finally {
        wh.transition = b2;
      }
    }, [a]), c;
  }, useTransition: function() {
    var a = Kh(Jh)[0];
    return [
      Th().current,
      a
    ];
  }, useMutableSource: Ph, useOpaqueIdentifier: function() {
    return Kh(Jh)[0];
  }, unstable_isNewReconciler: !1}, Fh = {readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Lh, useRef: Th, useState: function() {
    return Lh(Jh);
  }, useDebugValue: ai, useDeferredValue: function(a) {
    var b = Lh(Jh), c = b[0], d = b[1];
    return Xh(function() {
      var b2 = wh.transition;
      wh.transition = 1;
      try {
        d(a);
      } finally {
        wh.transition = b2;
      }
    }, [a]), c;
  }, useTransition: function() {
    var a = Lh(Jh)[0];
    return [
      Th().current,
      a
    ];
  }, useMutableSource: Ph, useOpaqueIdentifier: function() {
    return Lh(Jh)[0];
  }, unstable_isNewReconciler: !1}, ei = ra.ReactCurrentOwner, ug = !1;
  function fi(a, b, c, d) {
    b.child = a === null ? Zg(b, null, c, d) : Yg(b, a.child, c, d);
  }
  function gi(a, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    return tg(b, e), d = Ch(a, b, c, d, f, e), a !== null && !ug ? (b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e)) : (b.flags |= 1, fi(a, b, d, e), b.child);
  }
  function ii(a, b, c, d, e, f) {
    if (a === null) {
      var g = c.type;
      return typeof g == "function" && !ji(g) && g.defaultProps === void 0 && c.compare === null && c.defaultProps === void 0 ? (b.tag = 15, b.type = g, ki(a, b, g, d, e, f)) : (a = Vg(c.type, null, d, b, b.mode, f), a.ref = b.ref, a.return = b, b.child = a);
    }
    return g = a.child, (e & f) == 0 && (e = g.memoizedProps, c = c.compare, c = c !== null ? c : Je, c(e, d) && a.ref === b.ref) ? hi(a, b, f) : (b.flags |= 1, a = Tg(g, d), a.ref = b.ref, a.return = b, b.child = a);
  }
  function ki(a, b, c, d, e, f) {
    if (a !== null && Je(a.memoizedProps, d) && a.ref === b.ref)
      if (ug = !1, (f & e) != 0)
        (a.flags & 16384) != 0 && (ug = !0);
      else
        return b.lanes = a.lanes, hi(a, b, f);
    return li(a, b, c, d, f);
  }
  function mi(a, b, c) {
    var d = b.pendingProps, e = d.children, f = a !== null ? a.memoizedState : null;
    if (d.mode === "hidden" || d.mode === "unstable-defer-without-hiding")
      if ((b.mode & 4) == 0)
        b.memoizedState = {baseLanes: 0}, ni(b, c);
      else if ((c & 1073741824) != 0)
        b.memoizedState = {baseLanes: 0}, ni(b, f !== null ? f.baseLanes : c);
      else
        return a = f !== null ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {baseLanes: a}, ni(b, a), null;
    else
      f !== null ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, ni(b, d);
    return fi(a, b, e, c), b.child;
  }
  function oi(a, b) {
    var c = b.ref;
    (a === null && c !== null || a !== null && a.ref !== c) && (b.flags |= 128);
  }
  function li(a, b, c, d, e) {
    var f = Ff(c) ? Df : M.current;
    return f = Ef(b, f), tg(b, e), c = Ch(a, b, c, d, f, e), a !== null && !ug ? (b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e)) : (b.flags |= 1, fi(a, b, c, e), b.child);
  }
  function pi(a, b, c, d, e) {
    if (Ff(c)) {
      var f = !0;
      Jf(b);
    } else
      f = !1;
    if (tg(b, e), b.stateNode === null)
      a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), Mg(b, c, d), Og(b, c, d, e), d = !0;
    else if (a === null) {
      var g = b.stateNode, h = b.memoizedProps;
      g.props = h;
      var k = g.context, l = c.contextType;
      typeof l == "object" && l !== null ? l = vg(l) : (l = Ff(c) ? Df : M.current, l = Ef(b, l));
      var n = c.getDerivedStateFromProps, A = typeof n == "function" || typeof g.getSnapshotBeforeUpdate == "function";
      A || typeof g.UNSAFE_componentWillReceiveProps != "function" && typeof g.componentWillReceiveProps != "function" || (h !== d || k !== l) && Ng(b, g, d, l), wg = !1;
      var p = b.memoizedState;
      g.state = p, Cg(b, d, g, e), k = b.memoizedState, h !== d || p !== k || N.current || wg ? (typeof n == "function" && (Gg(b, c, n, d), k = b.memoizedState), (h = wg || Lg(b, c, h, d, p, k, l)) ? (A || typeof g.UNSAFE_componentWillMount != "function" && typeof g.componentWillMount != "function" || (typeof g.componentWillMount == "function" && g.componentWillMount(), typeof g.UNSAFE_componentWillMount == "function" && g.UNSAFE_componentWillMount()), typeof g.componentDidMount == "function" && (b.flags |= 4)) : (typeof g.componentDidMount == "function" && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : (typeof g.componentDidMount == "function" && (b.flags |= 4), d = !1);
    } else {
      g = b.stateNode, yg(a, b), h = b.memoizedProps, l = b.type === b.elementType ? h : lg(b.type, h), g.props = l, A = b.pendingProps, p = g.context, k = c.contextType, typeof k == "object" && k !== null ? k = vg(k) : (k = Ff(c) ? Df : M.current, k = Ef(b, k));
      var C = c.getDerivedStateFromProps;
      (n = typeof C == "function" || typeof g.getSnapshotBeforeUpdate == "function") || typeof g.UNSAFE_componentWillReceiveProps != "function" && typeof g.componentWillReceiveProps != "function" || (h !== A || p !== k) && Ng(b, g, d, k), wg = !1, p = b.memoizedState, g.state = p, Cg(b, d, g, e);
      var x = b.memoizedState;
      h !== A || p !== x || N.current || wg ? (typeof C == "function" && (Gg(b, c, C, d), x = b.memoizedState), (l = wg || Lg(b, c, l, d, p, x, k)) ? (n || typeof g.UNSAFE_componentWillUpdate != "function" && typeof g.componentWillUpdate != "function" || (typeof g.componentWillUpdate == "function" && g.componentWillUpdate(d, x, k), typeof g.UNSAFE_componentWillUpdate == "function" && g.UNSAFE_componentWillUpdate(d, x, k)), typeof g.componentDidUpdate == "function" && (b.flags |= 4), typeof g.getSnapshotBeforeUpdate == "function" && (b.flags |= 256)) : (typeof g.componentDidUpdate != "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate != "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : (typeof g.componentDidUpdate != "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate != "function" || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), d = !1);
    }
    return qi(a, b, c, d, f, e);
  }
  function qi(a, b, c, d, e, f) {
    oi(a, b);
    var g = (b.flags & 64) != 0;
    if (!d && !g)
      return e && Kf(b, c, !1), hi(a, b, f);
    d = b.stateNode, ei.current = b;
    var h = g && typeof c.getDerivedStateFromError != "function" ? null : d.render();
    return b.flags |= 1, a !== null && g ? (b.child = Yg(b, a.child, null, f), b.child = Yg(b, null, h, f)) : fi(a, b, h, f), b.memoizedState = d.state, e && Kf(b, c, !0), b.child;
  }
  function ri(a) {
    var b = a.stateNode;
    b.pendingContext ? Hf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Hf(a, b.context, !1), eh(a, b.containerInfo);
  }
  var si = {dehydrated: null, retryLane: 0};
  function ti(a, b, c) {
    var d = b.pendingProps, e = P.current, f = !1, g;
    return (g = (b.flags & 64) != 0) || (g = a !== null && a.memoizedState === null ? !1 : (e & 2) != 0), g ? (f = !0, b.flags &= -65) : a !== null && a.memoizedState === null || d.fallback === void 0 || d.unstable_avoidThisFallback === !0 || (e |= 1), I(P, e & 1), a === null ? (d.fallback !== void 0 && ph(b), a = d.children, e = d.fallback, f ? (a = ui(b, a, e, c), b.child.memoizedState = {baseLanes: c}, b.memoizedState = si, a) : typeof d.unstable_expectedLoadTime == "number" ? (a = ui(b, a, e, c), b.child.memoizedState = {baseLanes: c}, b.memoizedState = si, b.lanes = 33554432, a) : (c = vi({mode: "visible", children: a}, b.mode, c, null), c.return = b, b.child = c)) : a.memoizedState !== null ? f ? (d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = e === null ? {baseLanes: c} : {baseLanes: e.baseLanes | c}, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d) : (c = xi(a, b, d.children, c), b.memoizedState = null, c) : f ? (d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = e === null ? {baseLanes: c} : {baseLanes: e.baseLanes | c}, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d) : (c = xi(a, b, d.children, c), b.memoizedState = null, c);
  }
  function ui(a, b, c, d) {
    var e = a.mode, f = a.child;
    return b = {mode: "hidden", children: b}, (e & 2) == 0 && f !== null ? (f.childLanes = 0, f.pendingProps = b) : f = vi(b, e, 0, null), c = Xg(c, e, d, null), f.return = a, c.return = a, f.sibling = c, a.child = f, c;
  }
  function xi(a, b, c, d) {
    var e = a.child;
    return a = e.sibling, c = Tg(e, {mode: "visible", children: c}), (b.mode & 2) == 0 && (c.lanes = d), c.return = b, c.sibling = null, a !== null && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a), b.child = c;
  }
  function wi(a, b, c, d, e) {
    var f = b.mode, g = a.child;
    a = g.sibling;
    var h = {mode: "hidden", children: c};
    return (f & 2) == 0 && b.child !== g ? (c = b.child, c.childLanes = 0, c.pendingProps = h, g = c.lastEffect, g !== null ? (b.firstEffect = c.firstEffect, b.lastEffect = g, g.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Tg(g, h), a !== null ? d = Tg(a, d) : (d = Xg(d, f, e, null), d.flags |= 2), d.return = b, c.return = b, c.sibling = d, b.child = c, d;
  }
  function yi(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    c !== null && (c.lanes |= b), sg(a.return, b);
  }
  function zi(a, b, c, d, e, f) {
    var g = a.memoizedState;
    g === null ? a.memoizedState = {isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e, lastEffect: f} : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailMode = e, g.lastEffect = f);
  }
  function Ai(a, b, c) {
    var d = b.pendingProps, e = d.revealOrder, f = d.tail;
    if (fi(a, b, d.children, c), d = P.current, (d & 2) != 0)
      d = d & 1 | 2, b.flags |= 64;
    else {
      if (a !== null && (a.flags & 64) != 0)
        a:
          for (a = b.child; a !== null; ) {
            if (a.tag === 13)
              a.memoizedState !== null && yi(a, c);
            else if (a.tag === 19)
              yi(a, c);
            else if (a.child !== null) {
              a.child.return = a, a = a.child;
              continue;
            }
            if (a === b)
              break a;
            for (; a.sibling === null; ) {
              if (a.return === null || a.return === b)
                break a;
              a = a.return;
            }
            a.sibling.return = a.return, a = a.sibling;
          }
      d &= 1;
    }
    if (I(P, d), (b.mode & 2) == 0)
      b.memoizedState = null;
    else
      switch (e) {
        case "forwards":
          for (c = b.child, e = null; c !== null; )
            a = c.alternate, a !== null && ih(a) === null && (e = c), c = c.sibling;
          c = e, c === null ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null), zi(b, !1, e, c, f, b.lastEffect);
          break;
        case "backwards":
          for (c = null, e = b.child, b.child = null; e !== null; ) {
            if (a = e.alternate, a !== null && ih(a) === null) {
              b.child = e;
              break;
            }
            a = e.sibling, e.sibling = c, c = e, e = a;
          }
          zi(b, !0, c, null, f, b.lastEffect);
          break;
        case "together":
          zi(b, !1, null, null, void 0, b.lastEffect);
          break;
        default:
          b.memoizedState = null;
      }
    return b.child;
  }
  function hi(a, b, c) {
    if (a !== null && (b.dependencies = a.dependencies), Dg |= b.lanes, (c & b.childLanes) != 0) {
      if (a !== null && b.child !== a.child)
        throw Error(y(153));
      if (b.child !== null) {
        for (a = b.child, c = Tg(a, a.pendingProps), b.child = c, c.return = b; a.sibling !== null; )
          a = a.sibling, c = c.sibling = Tg(a, a.pendingProps), c.return = b;
        c.sibling = null;
      }
      return b.child;
    }
    return null;
  }
  var Bi, Ci, Di, Ei;
  Bi = function(a, b) {
    for (var c = b.child; c !== null; ) {
      if (c.tag === 5 || c.tag === 6)
        a.appendChild(c.stateNode);
      else if (c.tag !== 4 && c.child !== null) {
        c.child.return = c, c = c.child;
        continue;
      }
      if (c === b)
        break;
      for (; c.sibling === null; ) {
        if (c.return === null || c.return === b)
          return;
        c = c.return;
      }
      c.sibling.return = c.return, c = c.sibling;
    }
  };
  Ci = function() {
  };
  Di = function(a, b, c, d) {
    var e = a.memoizedProps;
    if (e !== d) {
      a = b.stateNode, dh(ah.current);
      var f = null;
      switch (c) {
        case "input":
          e = Ya(a, e), d = Ya(a, d), f = [];
          break;
        case "option":
          e = eb(a, e), d = eb(a, d), f = [];
          break;
        case "select":
          e = m({}, e, {value: void 0}), d = m({}, d, {value: void 0}), f = [];
          break;
        case "textarea":
          e = gb(a, e), d = gb(a, d), f = [];
          break;
        default:
          typeof e.onClick != "function" && typeof d.onClick == "function" && (a.onclick = jf);
      }
      vb(c, d);
      var g;
      c = null;
      for (l in e)
        if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && e[l] != null)
          if (l === "style") {
            var h = e[l];
            for (g in h)
              h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else
            l !== "dangerouslySetInnerHTML" && l !== "children" && l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (ca.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
      for (l in d) {
        var k = d[l];
        if (h = e != null ? e[l] : void 0, d.hasOwnProperty(l) && k !== h && (k != null || h != null))
          if (l === "style")
            if (h) {
              for (g in h)
                !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k)
                k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else
              c || (f || (f = []), f.push(l, c)), c = k;
          else
            l === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, k != null && h !== k && (f = f || []).push(l, k)) : l === "children" ? typeof k != "string" && typeof k != "number" || (f = f || []).push(l, "" + k) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && (ca.hasOwnProperty(l) ? (k != null && l === "onScroll" && G("scroll", a), f || h === k || (f = [])) : typeof k == "object" && k !== null && k.$$typeof === Ga ? k.toString() : (f = f || []).push(l, k));
      }
      c && (f = f || []).push("style", c);
      var l = f;
      (b.updateQueue = l) && (b.flags |= 4);
    }
  };
  Ei = function(a, b, c, d) {
    c !== d && (b.flags |= 4);
  };
  function Fi(a, b) {
    if (!lh)
      switch (a.tailMode) {
        case "hidden":
          b = a.tail;
          for (var c = null; b !== null; )
            b.alternate !== null && (c = b), b = b.sibling;
          c === null ? a.tail = null : c.sibling = null;
          break;
        case "collapsed":
          c = a.tail;
          for (var d = null; c !== null; )
            c.alternate !== null && (d = c), c = c.sibling;
          d === null ? b || a.tail === null ? a.tail = null : a.tail.sibling = null : d.sibling = null;
      }
  }
  function Gi(a, b, c) {
    var d = b.pendingProps;
    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return null;
      case 1:
        return Ff(b.type) && Gf(), null;
      case 3:
        return fh(), H(N), H(M), uh(), d = b.stateNode, d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), (a === null || a.child === null) && (rh(b) ? b.flags |= 4 : d.hydrate || (b.flags |= 256)), Ci(b), null;
      case 5:
        hh(b);
        var e = dh(ch.current);
        if (c = b.type, a !== null && b.stateNode != null)
          Di(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);
        else {
          if (!d) {
            if (b.stateNode === null)
              throw Error(y(166));
            return null;
          }
          if (a = dh(ah.current), rh(b)) {
            d = b.stateNode, c = b.type;
            var f = b.memoizedProps;
            switch (d[wf] = b, d[xf] = f, c) {
              case "dialog":
                G("cancel", d), G("close", d);
                break;
              case "iframe":
              case "object":
              case "embed":
                G("load", d);
                break;
              case "video":
              case "audio":
                for (a = 0; a < Xe.length; a++)
                  G(Xe[a], d);
                break;
              case "source":
                G("error", d);
                break;
              case "img":
              case "image":
              case "link":
                G("error", d), G("load", d);
                break;
              case "details":
                G("toggle", d);
                break;
              case "input":
                Za(d, f), G("invalid", d);
                break;
              case "select":
                d._wrapperState = {wasMultiple: !!f.multiple}, G("invalid", d);
                break;
              case "textarea":
                hb(d, f), G("invalid", d);
            }
            vb(c, f), a = null;
            for (var g in f)
              f.hasOwnProperty(g) && (e = f[g], g === "children" ? typeof e == "string" ? d.textContent !== e && (a = ["children", e]) : typeof e == "number" && d.textContent !== "" + e && (a = ["children", "" + e]) : ca.hasOwnProperty(g) && e != null && g === "onScroll" && G("scroll", d));
            switch (c) {
              case "input":
                Va(d), cb(d, f, !0);
                break;
              case "textarea":
                Va(d), jb(d);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof f.onClick == "function" && (d.onclick = jf);
            }
            d = a, b.updateQueue = d, d !== null && (b.flags |= 4);
          } else {
            switch (g = e.nodeType === 9 ? e : e.ownerDocument, a === kb.html && (a = lb(c)), a === kb.html ? c === "script" ? (a = g.createElement("div"), a.innerHTML = "<script></script>", a = a.removeChild(a.firstChild)) : typeof d.is == "string" ? a = g.createElement(c, {is: d.is}) : (a = g.createElement(c), c === "select" && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, c), a[wf] = b, a[xf] = d, Bi(a, b, !1, !1), b.stateNode = a, g = wb(c, d), c) {
              case "dialog":
                G("cancel", a), G("close", a), e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                G("load", a), e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < Xe.length; e++)
                  G(Xe[e], a);
                e = d;
                break;
              case "source":
                G("error", a), e = d;
                break;
              case "img":
              case "image":
              case "link":
                G("error", a), G("load", a), e = d;
                break;
              case "details":
                G("toggle", a), e = d;
                break;
              case "input":
                Za(a, d), e = Ya(a, d), G("invalid", a);
                break;
              case "option":
                e = eb(a, d);
                break;
              case "select":
                a._wrapperState = {wasMultiple: !!d.multiple}, e = m({}, d, {value: void 0}), G("invalid", a);
                break;
              case "textarea":
                hb(a, d), e = gb(a, d), G("invalid", a);
                break;
              default:
                e = d;
            }
            vb(c, e);
            var h = e;
            for (f in h)
              if (h.hasOwnProperty(f)) {
                var k = h[f];
                f === "style" ? tb(a, k) : f === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0, k != null && ob(a, k)) : f === "children" ? typeof k == "string" ? (c !== "textarea" || k !== "") && pb(a, k) : typeof k == "number" && pb(a, "" + k) : f !== "suppressContentEditableWarning" && f !== "suppressHydrationWarning" && f !== "autoFocus" && (ca.hasOwnProperty(f) ? k != null && f === "onScroll" && G("scroll", a) : k != null && qa(a, f, k, g));
              }
            switch (c) {
              case "input":
                Va(a), cb(a, d, !1);
                break;
              case "textarea":
                Va(a), jb(a);
                break;
              case "option":
                d.value != null && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple, f = d.value, f != null ? fb(a, !!d.multiple, f, !1) : d.defaultValue != null && fb(a, !!d.multiple, d.defaultValue, !0);
                break;
              default:
                typeof e.onClick == "function" && (a.onclick = jf);
            }
            mf(c, d) && (b.flags |= 4);
          }
          b.ref !== null && (b.flags |= 128);
        }
        return null;
      case 6:
        if (a && b.stateNode != null)
          Ei(a, b, a.memoizedProps, d);
        else {
          if (typeof d != "string" && b.stateNode === null)
            throw Error(y(166));
          c = dh(ch.current), dh(ah.current), rh(b) ? (d = b.stateNode, c = b.memoizedProps, d[wf] = b, d.nodeValue !== c && (b.flags |= 4)) : (d = (c.nodeType === 9 ? c : c.ownerDocument).createTextNode(d), d[wf] = b, b.stateNode = d);
        }
        return null;
      case 13:
        return H(P), d = b.memoizedState, (b.flags & 64) != 0 ? (b.lanes = c, b) : (d = d !== null, c = !1, a === null ? b.memoizedProps.fallback !== void 0 && rh(b) : c = a.memoizedState !== null, d && !c && (b.mode & 2) != 0 && (a === null && b.memoizedProps.unstable_avoidThisFallback !== !0 || (P.current & 1) != 0 ? V === 0 && (V = 3) : ((V === 0 || V === 3) && (V = 4), U === null || (Dg & 134217727) == 0 && (Hi & 134217727) == 0 || Ii(U, W))), (d || c) && (b.flags |= 4), null);
      case 4:
        return fh(), Ci(b), a === null && cf(b.stateNode.containerInfo), null;
      case 10:
        return rg(b), null;
      case 17:
        return Ff(b.type) && Gf(), null;
      case 19:
        if (H(P), d = b.memoizedState, d === null)
          return null;
        if (f = (b.flags & 64) != 0, g = d.rendering, g === null)
          if (f)
            Fi(d, !1);
          else {
            if (V !== 0 || a !== null && (a.flags & 64) != 0)
              for (a = b.child; a !== null; ) {
                if (g = ih(a), g !== null) {
                  for (b.flags |= 64, Fi(d, !1), f = g.updateQueue, f !== null && (b.updateQueue = f, b.flags |= 4), d.lastEffect === null && (b.firstEffect = null), b.lastEffect = d.lastEffect, d = c, c = b.child; c !== null; )
                    f = c, a = d, f.flags &= 2, f.nextEffect = null, f.firstEffect = null, f.lastEffect = null, g = f.alternate, g === null ? (f.childLanes = 0, f.lanes = a, f.child = null, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = a === null ? null : {lanes: a.lanes, firstContext: a.firstContext}), c = c.sibling;
                  return I(P, P.current & 1 | 2), b.child;
                }
                a = a.sibling;
              }
            d.tail !== null && O() > Ji && (b.flags |= 64, f = !0, Fi(d, !1), b.lanes = 33554432);
          }
        else {
          if (!f)
            if (a = ih(g), a !== null) {
              if (b.flags |= 64, f = !0, c = a.updateQueue, c !== null && (b.updateQueue = c, b.flags |= 4), Fi(d, !0), d.tail === null && d.tailMode === "hidden" && !g.alternate && !lh)
                return b = b.lastEffect = d.lastEffect, b !== null && (b.nextEffect = null), null;
            } else
              2 * O() - d.renderingStartTime > Ji && c !== 1073741824 && (b.flags |= 64, f = !0, Fi(d, !1), b.lanes = 33554432);
          d.isBackwards ? (g.sibling = b.child, b.child = g) : (c = d.last, c !== null ? c.sibling = g : b.child = g, d.last = g);
        }
        return d.tail !== null ? (c = d.tail, d.rendering = c, d.tail = c.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = O(), c.sibling = null, b = P.current, I(P, f ? b & 1 | 2 : b & 1), c) : null;
      case 23:
      case 24:
        return Ki(), a !== null && a.memoizedState !== null != (b.memoizedState !== null) && d.mode !== "unstable-defer-without-hiding" && (b.flags |= 4), null;
    }
    throw Error(y(156, b.tag));
  }
  function Li(a) {
    switch (a.tag) {
      case 1:
        Ff(a.type) && Gf();
        var b = a.flags;
        return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
      case 3:
        if (fh(), H(N), H(M), uh(), b = a.flags, (b & 64) != 0)
          throw Error(y(285));
        return a.flags = b & -4097 | 64, a;
      case 5:
        return hh(a), null;
      case 13:
        return H(P), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
      case 19:
        return H(P), null;
      case 4:
        return fh(), null;
      case 10:
        return rg(a), null;
      case 23:
      case 24:
        return Ki(), null;
      default:
        return null;
    }
  }
  function Mi(a, b) {
    try {
      var c = "", d = b;
      do
        c += Qa(d), d = d.return;
      while (d);
      var e = c;
    } catch (f) {
      e = `
Error generating stack: ` + f.message + `
` + f.stack;
    }
    return {value: a, source: b, stack: e};
  }
  function Ni(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  var Oi = typeof WeakMap == "function" ? WeakMap : Map;
  function Pi(a, b, c) {
    c = zg(-1, c), c.tag = 3, c.payload = {element: null};
    var d = b.value;
    return c.callback = function() {
      Qi || (Qi = !0, Ri = d), Ni(a, b);
    }, c;
  }
  function Si(a, b, c) {
    c = zg(-1, c), c.tag = 3;
    var d = a.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var e = b.value;
      c.payload = function() {
        return Ni(a, b), d(e);
      };
    }
    var f = a.stateNode;
    return f !== null && typeof f.componentDidCatch == "function" && (c.callback = function() {
      typeof d != "function" && (Ti === null ? Ti = new Set([this]) : Ti.add(this), Ni(a, b));
      var c2 = b.stack;
      this.componentDidCatch(b.value, {componentStack: c2 !== null ? c2 : ""});
    }), c;
  }
  var Ui = typeof WeakSet == "function" ? WeakSet : Set;
  function Vi(a) {
    var b = a.ref;
    if (b !== null)
      if (typeof b == "function")
        try {
          b(null);
        } catch (c) {
          Wi(a, c);
        }
      else
        b.current = null;
  }
  function Xi(a, b) {
    switch (b.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        return;
      case 1:
        if (b.flags & 256 && a !== null) {
          var c = a.memoizedProps, d = a.memoizedState;
          a = b.stateNode, b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : lg(b.type, c), d), a.__reactInternalSnapshotBeforeUpdate = b;
        }
        return;
      case 3:
        b.flags & 256 && qf(b.stateNode.containerInfo);
        return;
      case 5:
      case 6:
      case 4:
      case 17:
        return;
    }
    throw Error(y(163));
  }
  function Yi(a, b, c) {
    switch (c.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        if (b = c.updateQueue, b = b !== null ? b.lastEffect : null, b !== null) {
          a = b = b.next;
          do {
            if ((a.tag & 3) == 3) {
              var d = a.create;
              a.destroy = d();
            }
            a = a.next;
          } while (a !== b);
        }
        if (b = c.updateQueue, b = b !== null ? b.lastEffect : null, b !== null) {
          a = b = b.next;
          do {
            var e = a;
            d = e.next, e = e.tag, (e & 4) != 0 && (e & 1) != 0 && (Zi(c, a), $i(c, a)), a = d;
          } while (a !== b);
        }
        return;
      case 1:
        a = c.stateNode, c.flags & 4 && (b === null ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : lg(c.type, b.memoizedProps), a.componentDidUpdate(d, b.memoizedState, a.__reactInternalSnapshotBeforeUpdate))), b = c.updateQueue, b !== null && Eg(c, b, a);
        return;
      case 3:
        if (b = c.updateQueue, b !== null) {
          if (a = null, c.child !== null)
            switch (c.child.tag) {
              case 5:
                a = c.child.stateNode;
                break;
              case 1:
                a = c.child.stateNode;
            }
          Eg(c, b, a);
        }
        return;
      case 5:
        a = c.stateNode, b === null && c.flags & 4 && mf(c.type, c.memoizedProps) && a.focus();
        return;
      case 6:
        return;
      case 4:
        return;
      case 12:
        return;
      case 13:
        c.memoizedState === null && (c = c.alternate, c !== null && (c = c.memoizedState, c !== null && (c = c.dehydrated, c !== null && Cc(c))));
        return;
      case 19:
      case 17:
      case 20:
      case 21:
      case 23:
      case 24:
        return;
    }
    throw Error(y(163));
  }
  function aj(a, b) {
    for (var c = a; ; ) {
      if (c.tag === 5) {
        var d = c.stateNode;
        if (b)
          d = d.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none";
        else {
          d = c.stateNode;
          var e = c.memoizedProps.style;
          e = e != null && e.hasOwnProperty("display") ? e.display : null, d.style.display = sb("display", e);
        }
      } else if (c.tag === 6)
        c.stateNode.nodeValue = b ? "" : c.memoizedProps;
      else if ((c.tag !== 23 && c.tag !== 24 || c.memoizedState === null || c === a) && c.child !== null) {
        c.child.return = c, c = c.child;
        continue;
      }
      if (c === a)
        break;
      for (; c.sibling === null; ) {
        if (c.return === null || c.return === a)
          return;
        c = c.return;
      }
      c.sibling.return = c.return, c = c.sibling;
    }
  }
  function bj(a, b) {
    if (Mf && typeof Mf.onCommitFiberUnmount == "function")
      try {
        Mf.onCommitFiberUnmount(Lf, b);
      } catch (f) {
      }
    switch (b.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        if (a = b.updateQueue, a !== null && (a = a.lastEffect, a !== null)) {
          var c = a = a.next;
          do {
            var d = c, e = d.destroy;
            if (d = d.tag, e !== void 0)
              if ((d & 4) != 0)
                Zi(b, c);
              else {
                d = b;
                try {
                  e();
                } catch (f) {
                  Wi(d, f);
                }
              }
            c = c.next;
          } while (c !== a);
        }
        break;
      case 1:
        if (Vi(b), a = b.stateNode, typeof a.componentWillUnmount == "function")
          try {
            a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
          } catch (f) {
            Wi(b, f);
          }
        break;
      case 5:
        Vi(b);
        break;
      case 4:
        cj(a, b);
    }
  }
  function dj(a) {
    a.alternate = null, a.child = null, a.dependencies = null, a.firstEffect = null, a.lastEffect = null, a.memoizedProps = null, a.memoizedState = null, a.pendingProps = null, a.return = null, a.updateQueue = null;
  }
  function ej(a) {
    return a.tag === 5 || a.tag === 3 || a.tag === 4;
  }
  function fj(a) {
    a: {
      for (var b = a.return; b !== null; ) {
        if (ej(b))
          break a;
        b = b.return;
      }
      throw Error(y(160));
    }
    var c = b;
    switch (b = c.stateNode, c.tag) {
      case 5:
        var d = !1;
        break;
      case 3:
        b = b.containerInfo, d = !0;
        break;
      case 4:
        b = b.containerInfo, d = !0;
        break;
      default:
        throw Error(y(161));
    }
    c.flags & 16 && (pb(b, ""), c.flags &= -17);
    a:
      b:
        for (c = a; ; ) {
          for (; c.sibling === null; ) {
            if (c.return === null || ej(c.return)) {
              c = null;
              break a;
            }
            c = c.return;
          }
          for (c.sibling.return = c.return, c = c.sibling; c.tag !== 5 && c.tag !== 6 && c.tag !== 18; ) {
            if (c.flags & 2 || c.child === null || c.tag === 4)
              continue b;
            c.child.return = c, c = c.child;
          }
          if (!(c.flags & 2)) {
            c = c.stateNode;
            break a;
          }
        }
    d ? gj(a, c, b) : hj(a, c, b);
  }
  function gj(a, b, c) {
    var d = a.tag, e = d === 5 || d === 6;
    if (e)
      a = e ? a.stateNode : a.stateNode.instance, b ? c.nodeType === 8 ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (c.nodeType === 8 ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, c != null || b.onclick !== null || (b.onclick = jf));
    else if (d !== 4 && (a = a.child, a !== null))
      for (gj(a, b, c), a = a.sibling; a !== null; )
        gj(a, b, c), a = a.sibling;
  }
  function hj(a, b, c) {
    var d = a.tag, e = d === 5 || d === 6;
    if (e)
      a = e ? a.stateNode : a.stateNode.instance, b ? c.insertBefore(a, b) : c.appendChild(a);
    else if (d !== 4 && (a = a.child, a !== null))
      for (hj(a, b, c), a = a.sibling; a !== null; )
        hj(a, b, c), a = a.sibling;
  }
  function cj(a, b) {
    for (var c = b, d = !1, e, f; ; ) {
      if (!d) {
        d = c.return;
        a:
          for (; ; ) {
            if (d === null)
              throw Error(y(160));
            switch (e = d.stateNode, d.tag) {
              case 5:
                f = !1;
                break a;
              case 3:
                e = e.containerInfo, f = !0;
                break a;
              case 4:
                e = e.containerInfo, f = !0;
                break a;
            }
            d = d.return;
          }
        d = !0;
      }
      if (c.tag === 5 || c.tag === 6) {
        a:
          for (var g = a, h = c, k = h; ; )
            if (bj(g, k), k.child !== null && k.tag !== 4)
              k.child.return = k, k = k.child;
            else {
              if (k === h)
                break a;
              for (; k.sibling === null; ) {
                if (k.return === null || k.return === h)
                  break a;
                k = k.return;
              }
              k.sibling.return = k.return, k = k.sibling;
            }
        f ? (g = e, h = c.stateNode, g.nodeType === 8 ? g.parentNode.removeChild(h) : g.removeChild(h)) : e.removeChild(c.stateNode);
      } else if (c.tag === 4) {
        if (c.child !== null) {
          e = c.stateNode.containerInfo, f = !0, c.child.return = c, c = c.child;
          continue;
        }
      } else if (bj(a, c), c.child !== null) {
        c.child.return = c, c = c.child;
        continue;
      }
      if (c === b)
        break;
      for (; c.sibling === null; ) {
        if (c.return === null || c.return === b)
          return;
        c = c.return, c.tag === 4 && (d = !1);
      }
      c.sibling.return = c.return, c = c.sibling;
    }
  }
  function ij(a, b) {
    switch (b.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        var c = b.updateQueue;
        if (c = c !== null ? c.lastEffect : null, c !== null) {
          var d = c = c.next;
          do
            (d.tag & 3) == 3 && (a = d.destroy, d.destroy = void 0, a !== void 0 && a()), d = d.next;
          while (d !== c);
        }
        return;
      case 1:
        return;
      case 5:
        if (c = b.stateNode, c != null) {
          d = b.memoizedProps;
          var e = a !== null ? a.memoizedProps : d;
          a = b.type;
          var f = b.updateQueue;
          if (b.updateQueue = null, f !== null) {
            for (c[xf] = d, a === "input" && d.type === "radio" && d.name != null && $a(c, d), wb(a, e), b = wb(a, d), e = 0; e < f.length; e += 2) {
              var g = f[e], h = f[e + 1];
              g === "style" ? tb(c, h) : g === "dangerouslySetInnerHTML" ? ob(c, h) : g === "children" ? pb(c, h) : qa(c, g, h, b);
            }
            switch (a) {
              case "input":
                ab(c, d);
                break;
              case "textarea":
                ib(c, d);
                break;
              case "select":
                a = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, f = d.value, f != null ? fb(c, !!d.multiple, f, !1) : a !== !!d.multiple && (d.defaultValue != null ? fb(c, !!d.multiple, d.defaultValue, !0) : fb(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
          }
        }
        return;
      case 6:
        if (b.stateNode === null)
          throw Error(y(162));
        b.stateNode.nodeValue = b.memoizedProps;
        return;
      case 3:
        c = b.stateNode, c.hydrate && (c.hydrate = !1, Cc(c.containerInfo));
        return;
      case 12:
        return;
      case 13:
        b.memoizedState !== null && (jj = O(), aj(b.child, !0)), kj(b);
        return;
      case 19:
        kj(b);
        return;
      case 17:
        return;
      case 23:
      case 24:
        aj(b, b.memoizedState !== null);
        return;
    }
    throw Error(y(163));
  }
  function kj(a) {
    var b = a.updateQueue;
    if (b !== null) {
      a.updateQueue = null;
      var c = a.stateNode;
      c === null && (c = a.stateNode = new Ui()), b.forEach(function(b2) {
        var d = lj.bind(null, a, b2);
        c.has(b2) || (c.add(b2), b2.then(d, d));
      });
    }
  }
  function mj(a, b) {
    return a !== null && (a = a.memoizedState, a === null || a.dehydrated !== null) ? (b = b.memoizedState, b !== null && b.dehydrated === null) : !1;
  }
  var nj = Math.ceil, oj = ra.ReactCurrentDispatcher, pj = ra.ReactCurrentOwner, X = 0, U = null, Y = null, W = 0, qj = 0, rj = Bf(0), V = 0, sj = null, tj = 0, Dg = 0, Hi = 0, uj = 0, vj = null, jj = 0, Ji = Infinity;
  function wj() {
    Ji = O() + 500;
  }
  var Z = null, Qi = !1, Ri = null, Ti = null, xj = !1, yj = null, zj = 90, Aj = [], Bj = [], Cj = null, Dj = 0, Ej = null, Fj = -1, Gj = 0, Hj = 0, Ij = null, Jj = !1;
  function Hg() {
    return (X & 48) != 0 ? O() : Fj !== -1 ? Fj : Fj = O();
  }
  function Ig(a) {
    if (a = a.mode, (a & 2) == 0)
      return 1;
    if ((a & 4) == 0)
      return eg() === 99 ? 1 : 2;
    if (Gj === 0 && (Gj = tj), kg.transition !== 0) {
      Hj !== 0 && (Hj = vj !== null ? vj.pendingLanes : 0), a = Gj;
      var b = 4186112 & ~Hj;
      return b &= -b, b === 0 && (a = 4186112 & ~a, b = a & -a, b === 0 && (b = 8192)), b;
    }
    return a = eg(), (X & 4) != 0 && a === 98 ? a = Xc(12, Gj) : (a = Sc(a), a = Xc(a, Gj)), a;
  }
  function Jg(a, b, c) {
    if (50 < Dj)
      throw Dj = 0, Ej = null, Error(y(185));
    if (a = Kj(a, b), a === null)
      return null;
    $c(a, b, c), a === U && (Hi |= b, V === 4 && Ii(a, W));
    var d = eg();
    b === 1 ? (X & 8) != 0 && (X & 48) == 0 ? Lj(a) : (Mj(a, c), X === 0 && (wj(), ig())) : ((X & 4) == 0 || d !== 98 && d !== 99 || (Cj === null ? Cj = new Set([a]) : Cj.add(a)), Mj(a, c)), vj = a;
  }
  function Kj(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    for (c !== null && (c.lanes |= b), c = a, a = a.return; a !== null; )
      a.childLanes |= b, c = a.alternate, c !== null && (c.childLanes |= b), c = a, a = a.return;
    return c.tag === 3 ? c.stateNode : null;
  }
  function Mj(a, b) {
    for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f = a.expirationTimes, g = a.pendingLanes; 0 < g; ) {
      var h = 31 - Vc(g), k = 1 << h, l = f[h];
      if (l === -1) {
        if ((k & d) == 0 || (k & e) != 0) {
          l = b, Rc(k);
          var n = F;
          f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5e3 : -1;
        }
      } else
        l <= b && (a.expiredLanes |= k);
      g &= ~k;
    }
    if (d = Uc(a, a === U ? W : 0), b = F, d === 0)
      c !== null && (c !== Zf && Pf(c), a.callbackNode = null, a.callbackPriority = 0);
    else {
      if (c !== null) {
        if (a.callbackPriority === b)
          return;
        c !== Zf && Pf(c);
      }
      b === 15 ? (c = Lj.bind(null, a), ag === null ? (ag = [c], bg = Of(Uf, jg)) : ag.push(c), c = Zf) : b === 14 ? c = hg(99, Lj.bind(null, a)) : (c = Tc(b), c = hg(c, Nj.bind(null, a))), a.callbackPriority = b, a.callbackNode = c;
    }
  }
  function Nj(a) {
    if (Fj = -1, Hj = Gj = 0, (X & 48) != 0)
      throw Error(y(327));
    var b = a.callbackNode;
    if (Oj() && a.callbackNode !== b)
      return null;
    var c = Uc(a, a === U ? W : 0);
    if (c === 0)
      return null;
    var d = c, e = X;
    X |= 16;
    var f = Pj();
    (U !== a || W !== d) && (wj(), Qj(a, d));
    do
      try {
        Rj();
        break;
      } catch (h) {
        Sj(a, h);
      }
    while (1);
    if (qg(), oj.current = f, X = e, Y !== null ? d = 0 : (U = null, W = 0, d = V), (tj & Hi) != 0)
      Qj(a, 0);
    else if (d !== 0) {
      if (d === 2 && (X |= 64, a.hydrate && (a.hydrate = !1, qf(a.containerInfo)), c = Wc(a), c !== 0 && (d = Tj(a, c))), d === 1)
        throw b = sj, Qj(a, 0), Ii(a, c), Mj(a, O()), b;
      switch (a.finishedWork = a.current.alternate, a.finishedLanes = c, d) {
        case 0:
        case 1:
          throw Error(y(345));
        case 2:
          Uj(a);
          break;
        case 3:
          if (Ii(a, c), (c & 62914560) === c && (d = jj + 500 - O(), 10 < d)) {
            if (Uc(a, 0) !== 0)
              break;
            if (e = a.suspendedLanes, (e & c) !== c) {
              Hg(), a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = of(Uj.bind(null, a), d);
            break;
          }
          Uj(a);
          break;
        case 4:
          if (Ii(a, c), (c & 4186112) === c)
            break;
          for (d = a.eventTimes, e = -1; 0 < c; ) {
            var g = 31 - Vc(c);
            f = 1 << g, g = d[g], g > e && (e = g), c &= ~f;
          }
          if (c = e, c = O() - c, c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * nj(c / 1960)) - c, 10 < c) {
            a.timeoutHandle = of(Uj.bind(null, a), c);
            break;
          }
          Uj(a);
          break;
        case 5:
          Uj(a);
          break;
        default:
          throw Error(y(329));
      }
    }
    return Mj(a, O()), a.callbackNode === b ? Nj.bind(null, a) : null;
  }
  function Ii(a, b) {
    for (b &= ~uj, b &= ~Hi, a.suspendedLanes |= b, a.pingedLanes &= ~b, a = a.expirationTimes; 0 < b; ) {
      var c = 31 - Vc(b), d = 1 << c;
      a[c] = -1, b &= ~d;
    }
  }
  function Lj(a) {
    if ((X & 48) != 0)
      throw Error(y(327));
    if (Oj(), a === U && (a.expiredLanes & W) != 0) {
      var b = W, c = Tj(a, b);
      (tj & Hi) != 0 && (b = Uc(a, b), c = Tj(a, b));
    } else
      b = Uc(a, 0), c = Tj(a, b);
    if (a.tag !== 0 && c === 2 && (X |= 64, a.hydrate && (a.hydrate = !1, qf(a.containerInfo)), b = Wc(a), b !== 0 && (c = Tj(a, b))), c === 1)
      throw c = sj, Qj(a, 0), Ii(a, b), Mj(a, O()), c;
    return a.finishedWork = a.current.alternate, a.finishedLanes = b, Uj(a), Mj(a, O()), null;
  }
  function Vj() {
    if (Cj !== null) {
      var a = Cj;
      Cj = null, a.forEach(function(a2) {
        a2.expiredLanes |= 24 & a2.pendingLanes, Mj(a2, O());
      });
    }
    ig();
  }
  function Wj(a, b) {
    var c = X;
    X |= 1;
    try {
      return a(b);
    } finally {
      X = c, X === 0 && (wj(), ig());
    }
  }
  function Xj(a, b) {
    var c = X;
    X &= -2, X |= 8;
    try {
      return a(b);
    } finally {
      X = c, X === 0 && (wj(), ig());
    }
  }
  function ni(a, b) {
    I(rj, qj), qj |= b, tj |= b;
  }
  function Ki() {
    qj = rj.current, H(rj);
  }
  function Qj(a, b) {
    a.finishedWork = null, a.finishedLanes = 0;
    var c = a.timeoutHandle;
    if (c !== -1 && (a.timeoutHandle = -1, pf(c)), Y !== null)
      for (c = Y.return; c !== null; ) {
        var d = c;
        switch (d.tag) {
          case 1:
            d = d.type.childContextTypes, d != null && Gf();
            break;
          case 3:
            fh(), H(N), H(M), uh();
            break;
          case 5:
            hh(d);
            break;
          case 4:
            fh();
            break;
          case 13:
            H(P);
            break;
          case 19:
            H(P);
            break;
          case 10:
            rg(d);
            break;
          case 23:
          case 24:
            Ki();
        }
        c = c.return;
      }
    U = a, Y = Tg(a.current, null), W = qj = tj = b, V = 0, sj = null, uj = Hi = Dg = 0;
  }
  function Sj(a, b) {
    do {
      var c = Y;
      try {
        if (qg(), vh.current = Gh, yh) {
          for (var d = R.memoizedState; d !== null; ) {
            var e = d.queue;
            e !== null && (e.pending = null), d = d.next;
          }
          yh = !1;
        }
        if (xh = 0, T = S = R = null, zh = !1, pj.current = null, c === null || c.return === null) {
          V = 1, sj = b, Y = null;
          break;
        }
        a: {
          var f = a, g = c.return, h = c, k = b;
          if (b = W, h.flags |= 2048, h.firstEffect = h.lastEffect = null, k !== null && typeof k == "object" && typeof k.then == "function") {
            var l = k;
            if ((h.mode & 2) == 0) {
              var n = h.alternate;
              n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
            }
            var A = (P.current & 1) != 0, p = g;
            do {
              var C;
              if (C = p.tag === 13) {
                var x = p.memoizedState;
                if (x !== null)
                  C = x.dehydrated !== null;
                else {
                  var w = p.memoizedProps;
                  C = w.fallback === void 0 ? !1 : w.unstable_avoidThisFallback !== !0 ? !0 : !A;
                }
              }
              if (C) {
                var z = p.updateQueue;
                if (z === null) {
                  var u = new Set();
                  u.add(l), p.updateQueue = u;
                } else
                  z.add(l);
                if ((p.mode & 2) == 0) {
                  if (p.flags |= 64, h.flags |= 16384, h.flags &= -2981, h.tag === 1)
                    if (h.alternate === null)
                      h.tag = 17;
                    else {
                      var t = zg(-1, 1);
                      t.tag = 2, Ag(h, t);
                    }
                  h.lanes |= 1;
                  break a;
                }
                k = void 0, h = b;
                var q = f.pingCache;
                if (q === null ? (q = f.pingCache = new Oi(), k = new Set(), q.set(l, k)) : (k = q.get(l), k === void 0 && (k = new Set(), q.set(l, k))), !k.has(h)) {
                  k.add(h);
                  var v = Yj.bind(null, f, l, h);
                  l.then(v, v);
                }
                p.flags |= 4096, p.lanes = b;
                break a;
              }
              p = p.return;
            } while (p !== null);
            k = Error((Ra(h.type) || "A React component") + ` suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`);
          }
          V !== 5 && (V = 2), k = Mi(k, h), p = g;
          do {
            switch (p.tag) {
              case 3:
                f = k, p.flags |= 4096, b &= -b, p.lanes |= b;
                var J = Pi(p, f, b);
                Bg(p, J);
                break a;
              case 1:
                f = k;
                var K = p.type, Q = p.stateNode;
                if ((p.flags & 64) == 0 && (typeof K.getDerivedStateFromError == "function" || Q !== null && typeof Q.componentDidCatch == "function" && (Ti === null || !Ti.has(Q)))) {
                  p.flags |= 4096, b &= -b, p.lanes |= b;
                  var L = Si(p, f, b);
                  Bg(p, L);
                  break a;
                }
            }
            p = p.return;
          } while (p !== null);
        }
        Zj(c);
      } catch (va) {
        b = va, Y === c && c !== null && (Y = c = c.return);
        continue;
      }
      break;
    } while (1);
  }
  function Pj() {
    var a = oj.current;
    return oj.current = Gh, a === null ? Gh : a;
  }
  function Tj(a, b) {
    var c = X;
    X |= 16;
    var d = Pj();
    U === a && W === b || Qj(a, b);
    do
      try {
        ak();
        break;
      } catch (e) {
        Sj(a, e);
      }
    while (1);
    if (qg(), X = c, oj.current = d, Y !== null)
      throw Error(y(261));
    return U = null, W = 0, V;
  }
  function ak() {
    for (; Y !== null; )
      bk(Y);
  }
  function Rj() {
    for (; Y !== null && !Qf(); )
      bk(Y);
  }
  function bk(a) {
    var b = ck(a.alternate, a, qj);
    a.memoizedProps = a.pendingProps, b === null ? Zj(a) : Y = b, pj.current = null;
  }
  function Zj(a) {
    var b = a;
    do {
      var c = b.alternate;
      if (a = b.return, (b.flags & 2048) == 0) {
        if (c = Gi(c, b, qj), c !== null) {
          Y = c;
          return;
        }
        if (c = b, c.tag !== 24 && c.tag !== 23 || c.memoizedState === null || (qj & 1073741824) != 0 || (c.mode & 4) == 0) {
          for (var d = 0, e = c.child; e !== null; )
            d |= e.lanes | e.childLanes, e = e.sibling;
          c.childLanes = d;
        }
        a !== null && (a.flags & 2048) == 0 && (a.firstEffect === null && (a.firstEffect = b.firstEffect), b.lastEffect !== null && (a.lastEffect !== null && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (a.lastEffect !== null ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
      } else {
        if (c = Li(b), c !== null) {
          c.flags &= 2047, Y = c;
          return;
        }
        a !== null && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
      }
      if (b = b.sibling, b !== null) {
        Y = b;
        return;
      }
      Y = b = a;
    } while (b !== null);
    V === 0 && (V = 5);
  }
  function Uj(a) {
    var b = eg();
    return gg(99, dk.bind(null, a, b)), null;
  }
  function dk(a, b) {
    do
      Oj();
    while (yj !== null);
    if ((X & 48) != 0)
      throw Error(y(327));
    var c = a.finishedWork;
    if (c === null)
      return null;
    if (a.finishedWork = null, a.finishedLanes = 0, c === a.current)
      throw Error(y(177));
    a.callbackNode = null;
    var d = c.lanes | c.childLanes, e = d, f = a.pendingLanes & ~e;
    a.pendingLanes = e, a.suspendedLanes = 0, a.pingedLanes = 0, a.expiredLanes &= e, a.mutableReadLanes &= e, a.entangledLanes &= e, e = a.entanglements;
    for (var g = a.eventTimes, h = a.expirationTimes; 0 < f; ) {
      var k = 31 - Vc(f), l = 1 << k;
      e[k] = 0, g[k] = -1, h[k] = -1, f &= ~l;
    }
    if (Cj !== null && (d & 24) == 0 && Cj.has(a) && Cj.delete(a), a === U && (Y = U = null, W = 0), 1 < c.flags ? c.lastEffect !== null ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect, d !== null) {
      if (e = X, X |= 32, pj.current = null, kf = fd, g = Ne(), Oe(g)) {
        if ("selectionStart" in g)
          h = {start: g.selectionStart, end: g.selectionEnd};
        else
          a:
            if (h = (h = g.ownerDocument) && h.defaultView || window, (l = h.getSelection && h.getSelection()) && l.rangeCount !== 0) {
              h = l.anchorNode, f = l.anchorOffset, k = l.focusNode, l = l.focusOffset;
              try {
                h.nodeType, k.nodeType;
              } catch (va) {
                h = null;
                break a;
              }
              var n = 0, A = -1, p = -1, C = 0, x = 0, w = g, z = null;
              b:
                for (; ; ) {
                  for (var u; w !== h || f !== 0 && w.nodeType !== 3 || (A = n + f), w !== k || l !== 0 && w.nodeType !== 3 || (p = n + l), w.nodeType === 3 && (n += w.nodeValue.length), (u = w.firstChild) !== null; )
                    z = w, w = u;
                  for (; ; ) {
                    if (w === g)
                      break b;
                    if (z === h && ++C === f && (A = n), z === k && ++x === l && (p = n), (u = w.nextSibling) !== null)
                      break;
                    w = z, z = w.parentNode;
                  }
                  w = u;
                }
              h = A === -1 || p === -1 ? null : {start: A, end: p};
            } else
              h = null;
        h = h || {start: 0, end: 0};
      } else
        h = null;
      lf = {focusedElem: g, selectionRange: h}, fd = !1, Ij = null, Jj = !1, Z = d;
      do
        try {
          ek();
        } catch (va) {
          if (Z === null)
            throw Error(y(330));
          Wi(Z, va), Z = Z.nextEffect;
        }
      while (Z !== null);
      Ij = null, Z = d;
      do
        try {
          for (g = a; Z !== null; ) {
            var t = Z.flags;
            if (t & 16 && pb(Z.stateNode, ""), t & 128) {
              var q = Z.alternate;
              if (q !== null) {
                var v = q.ref;
                v !== null && (typeof v == "function" ? v(null) : v.current = null);
              }
            }
            switch (t & 1038) {
              case 2:
                fj(Z), Z.flags &= -3;
                break;
              case 6:
                fj(Z), Z.flags &= -3, ij(Z.alternate, Z);
                break;
              case 1024:
                Z.flags &= -1025;
                break;
              case 1028:
                Z.flags &= -1025, ij(Z.alternate, Z);
                break;
              case 4:
                ij(Z.alternate, Z);
                break;
              case 8:
                h = Z, cj(g, h);
                var J = h.alternate;
                dj(h), J !== null && dj(J);
            }
            Z = Z.nextEffect;
          }
        } catch (va) {
          if (Z === null)
            throw Error(y(330));
          Wi(Z, va), Z = Z.nextEffect;
        }
      while (Z !== null);
      if (v = lf, q = Ne(), t = v.focusedElem, g = v.selectionRange, q !== t && t && t.ownerDocument && Me(t.ownerDocument.documentElement, t)) {
        for (g !== null && Oe(t) && (q = g.start, v = g.end, v === void 0 && (v = q), "selectionStart" in t ? (t.selectionStart = q, t.selectionEnd = Math.min(v, t.value.length)) : (v = (q = t.ownerDocument || document) && q.defaultView || window, v.getSelection && (v = v.getSelection(), h = t.textContent.length, J = Math.min(g.start, h), g = g.end === void 0 ? J : Math.min(g.end, h), !v.extend && J > g && (h = g, g = J, J = h), h = Le(t, J), f = Le(t, g), h && f && (v.rangeCount !== 1 || v.anchorNode !== h.node || v.anchorOffset !== h.offset || v.focusNode !== f.node || v.focusOffset !== f.offset) && (q = q.createRange(), q.setStart(h.node, h.offset), v.removeAllRanges(), J > g ? (v.addRange(q), v.extend(f.node, f.offset)) : (q.setEnd(f.node, f.offset), v.addRange(q)))))), q = [], v = t; v = v.parentNode; )
          v.nodeType === 1 && q.push({element: v, left: v.scrollLeft, top: v.scrollTop});
        for (typeof t.focus == "function" && t.focus(), t = 0; t < q.length; t++)
          v = q[t], v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
      }
      fd = !!kf, lf = kf = null, a.current = c, Z = d;
      do
        try {
          for (t = a; Z !== null; ) {
            var K = Z.flags;
            if (K & 36 && Yi(t, Z.alternate, Z), K & 128) {
              q = void 0;
              var Q = Z.ref;
              if (Q !== null) {
                var L = Z.stateNode;
                switch (Z.tag) {
                  case 5:
                    q = L;
                    break;
                  default:
                    q = L;
                }
                typeof Q == "function" ? Q(q) : Q.current = q;
              }
            }
            Z = Z.nextEffect;
          }
        } catch (va) {
          if (Z === null)
            throw Error(y(330));
          Wi(Z, va), Z = Z.nextEffect;
        }
      while (Z !== null);
      Z = null, $f(), X = e;
    } else
      a.current = c;
    if (xj)
      xj = !1, yj = a, zj = b;
    else
      for (Z = d; Z !== null; )
        b = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K = Z, K.sibling = null, K.stateNode = null), Z = b;
    if (d = a.pendingLanes, d === 0 && (Ti = null), d === 1 ? a === Ej ? Dj++ : (Dj = 0, Ej = a) : Dj = 0, c = c.stateNode, Mf && typeof Mf.onCommitFiberRoot == "function")
      try {
        Mf.onCommitFiberRoot(Lf, c, void 0, (c.current.flags & 64) == 64);
      } catch (va) {
      }
    if (Mj(a, O()), Qi)
      throw Qi = !1, a = Ri, Ri = null, a;
    return (X & 8) != 0 || ig(), null;
  }
  function ek() {
    for (; Z !== null; ) {
      var a = Z.alternate;
      Jj || Ij === null || ((Z.flags & 8) != 0 ? dc(Z, Ij) && (Jj = !0) : Z.tag === 13 && mj(a, Z) && dc(Z, Ij) && (Jj = !0));
      var b = Z.flags;
      (b & 256) != 0 && Xi(a, Z), (b & 512) == 0 || xj || (xj = !0, hg(97, function() {
        return Oj(), null;
      })), Z = Z.nextEffect;
    }
  }
  function Oj() {
    if (zj !== 90) {
      var a = 97 < zj ? 97 : zj;
      return zj = 90, gg(a, fk);
    }
    return !1;
  }
  function $i(a, b) {
    Aj.push(b, a), xj || (xj = !0, hg(97, function() {
      return Oj(), null;
    }));
  }
  function Zi(a, b) {
    Bj.push(b, a), xj || (xj = !0, hg(97, function() {
      return Oj(), null;
    }));
  }
  function fk() {
    if (yj === null)
      return !1;
    var a = yj;
    if (yj = null, (X & 48) != 0)
      throw Error(y(331));
    var b = X;
    X |= 32;
    var c = Bj;
    Bj = [];
    for (var d = 0; d < c.length; d += 2) {
      var e = c[d], f = c[d + 1], g = e.destroy;
      if (e.destroy = void 0, typeof g == "function")
        try {
          g();
        } catch (k) {
          if (f === null)
            throw Error(y(330));
          Wi(f, k);
        }
    }
    for (c = Aj, Aj = [], d = 0; d < c.length; d += 2) {
      e = c[d], f = c[d + 1];
      try {
        var h = e.create;
        e.destroy = h();
      } catch (k) {
        if (f === null)
          throw Error(y(330));
        Wi(f, k);
      }
    }
    for (h = a.current.firstEffect; h !== null; )
      a = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a;
    return X = b, ig(), !0;
  }
  function gk(a, b, c) {
    b = Mi(c, b), b = Pi(a, b, 1), Ag(a, b), b = Hg(), a = Kj(a, 1), a !== null && ($c(a, 1, b), Mj(a, b));
  }
  function Wi(a, b) {
    if (a.tag === 3)
      gk(a, a, b);
    else
      for (var c = a.return; c !== null; ) {
        if (c.tag === 3) {
          gk(c, a, b);
          break;
        } else if (c.tag === 1) {
          var d = c.stateNode;
          if (typeof c.type.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && (Ti === null || !Ti.has(d))) {
            a = Mi(b, a);
            var e = Si(c, a, 1);
            if (Ag(c, e), e = Hg(), c = Kj(c, 1), c !== null)
              $c(c, 1, e), Mj(c, e);
            else if (typeof d.componentDidCatch == "function" && (Ti === null || !Ti.has(d)))
              try {
                d.componentDidCatch(b, a);
              } catch (f) {
              }
            break;
          }
        }
        c = c.return;
      }
  }
  function Yj(a, b, c) {
    var d = a.pingCache;
    d !== null && d.delete(b), b = Hg(), a.pingedLanes |= a.suspendedLanes & c, U === a && (W & c) === c && (V === 4 || V === 3 && (W & 62914560) === W && 500 > O() - jj ? Qj(a, 0) : uj |= c), Mj(a, b);
  }
  function lj(a, b) {
    var c = a.stateNode;
    c !== null && c.delete(b), b = 0, b === 0 && (b = a.mode, (b & 2) == 0 ? b = 1 : (b & 4) == 0 ? b = eg() === 99 ? 1 : 2 : (Gj === 0 && (Gj = tj), b = Yc(62914560 & ~Gj), b === 0 && (b = 4194304))), c = Hg(), a = Kj(a, b), a !== null && ($c(a, b, c), Mj(a, c));
  }
  var ck;
  ck = function(a, b, c) {
    var d = b.lanes;
    if (a !== null)
      if (a.memoizedProps !== b.pendingProps || N.current)
        ug = !0;
      else if ((c & d) != 0)
        ug = (a.flags & 16384) != 0;
      else {
        switch (ug = !1, b.tag) {
          case 3:
            ri(b), sh();
            break;
          case 5:
            gh(b);
            break;
          case 1:
            Ff(b.type) && Jf(b);
            break;
          case 4:
            eh(b, b.stateNode.containerInfo);
            break;
          case 10:
            d = b.memoizedProps.value;
            var e = b.type._context;
            I(mg, e._currentValue), e._currentValue = d;
            break;
          case 13:
            if (b.memoizedState !== null)
              return (c & b.child.childLanes) != 0 ? ti(a, b, c) : (I(P, P.current & 1), b = hi(a, b, c), b !== null ? b.sibling : null);
            I(P, P.current & 1);
            break;
          case 19:
            if (d = (c & b.childLanes) != 0, (a.flags & 64) != 0) {
              if (d)
                return Ai(a, b, c);
              b.flags |= 64;
            }
            if (e = b.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), I(P, P.current), d)
              break;
            return null;
          case 23:
          case 24:
            return b.lanes = 0, mi(a, b, c);
        }
        return hi(a, b, c);
      }
    else
      ug = !1;
    switch (b.lanes = 0, b.tag) {
      case 2:
        if (d = b.type, a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), a = b.pendingProps, e = Ef(b, M.current), tg(b, c), e = Ch(null, b, d, a, e, c), b.flags |= 1, typeof e == "object" && e !== null && typeof e.render == "function" && e.$$typeof === void 0) {
          if (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Ff(d)) {
            var f = !0;
            Jf(b);
          } else
            f = !1;
          b.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, xg(b);
          var g = d.getDerivedStateFromProps;
          typeof g == "function" && Gg(b, d, g, a), e.updater = Kg, b.stateNode = e, e._reactInternals = b, Og(b, d, a, c), b = qi(null, b, d, !0, f, c);
        } else
          b.tag = 0, fi(null, b, e, c), b = b.child;
        return b;
      case 16:
        e = b.elementType;
        a: {
          switch (a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), a = b.pendingProps, f = e._init, e = f(e._payload), b.type = e, f = b.tag = hk(e), a = lg(e, a), f) {
            case 0:
              b = li(null, b, e, a, c);
              break a;
            case 1:
              b = pi(null, b, e, a, c);
              break a;
            case 11:
              b = gi(null, b, e, a, c);
              break a;
            case 14:
              b = ii(null, b, e, lg(e.type, a), d, c);
              break a;
          }
          throw Error(y(306, e, ""));
        }
        return b;
      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), li(a, b, d, e, c);
      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), pi(a, b, d, e, c);
      case 3:
        if (ri(b), d = b.updateQueue, a === null || d === null)
          throw Error(y(282));
        if (d = b.pendingProps, e = b.memoizedState, e = e !== null ? e.element : null, yg(a, b), Cg(b, d, null, c), d = b.memoizedState.element, d === e)
          sh(), b = hi(a, b, c);
        else {
          if (e = b.stateNode, (f = e.hydrate) && (kh = rf(b.stateNode.containerInfo.firstChild), jh = b, f = lh = !0), f) {
            if (a = e.mutableSourceEagerHydrationData, a != null)
              for (e = 0; e < a.length; e += 2)
                f = a[e], f._workInProgressVersionPrimary = a[e + 1], th.push(f);
            for (c = Zg(b, null, d, c), b.child = c; c; )
              c.flags = c.flags & -3 | 1024, c = c.sibling;
          } else
            fi(a, b, d, c), sh();
          b = b.child;
        }
        return b;
      case 5:
        return gh(b), a === null && ph(b), d = b.type, e = b.pendingProps, f = a !== null ? a.memoizedProps : null, g = e.children, nf(d, e) ? g = null : f !== null && nf(d, f) && (b.flags |= 16), oi(a, b), fi(a, b, g, c), b.child;
      case 6:
        return a === null && ph(b), null;
      case 13:
        return ti(a, b, c);
      case 4:
        return eh(b, b.stateNode.containerInfo), d = b.pendingProps, a === null ? b.child = Yg(b, null, d, c) : fi(a, b, d, c), b.child;
      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), gi(a, b, d, e, c);
      case 7:
        return fi(a, b, b.pendingProps, c), b.child;
      case 8:
        return fi(a, b, b.pendingProps.children, c), b.child;
      case 12:
        return fi(a, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context, e = b.pendingProps, g = b.memoizedProps, f = e.value;
          var h = b.type._context;
          if (I(mg, h._currentValue), h._currentValue = f, g !== null)
            if (h = g.value, f = He(h, f) ? 0 : (typeof d._calculateChangedBits == "function" ? d._calculateChangedBits(h, f) : 1073741823) | 0, f === 0) {
              if (g.children === e.children && !N.current) {
                b = hi(a, b, c);
                break a;
              }
            } else
              for (h = b.child, h !== null && (h.return = b); h !== null; ) {
                var k = h.dependencies;
                if (k !== null) {
                  g = h.child;
                  for (var l = k.firstContext; l !== null; ) {
                    if (l.context === d && (l.observedBits & f) != 0) {
                      h.tag === 1 && (l = zg(-1, c & -c), l.tag = 2, Ag(h, l)), h.lanes |= c, l = h.alternate, l !== null && (l.lanes |= c), sg(h.return, c), k.lanes |= c;
                      break;
                    }
                    l = l.next;
                  }
                } else
                  g = h.tag === 10 && h.type === b.type ? null : h.child;
                if (g !== null)
                  g.return = h;
                else
                  for (g = h; g !== null; ) {
                    if (g === b) {
                      g = null;
                      break;
                    }
                    if (h = g.sibling, h !== null) {
                      h.return = g.return, g = h;
                      break;
                    }
                    g = g.return;
                  }
                h = g;
              }
          fi(a, b, e.children, c), b = b.child;
        }
        return b;
      case 9:
        return e = b.type, f = b.pendingProps, d = f.children, tg(b, c), e = vg(e, f.unstable_observedBits), d = d(e), b.flags |= 1, fi(a, b, d, c), b.child;
      case 14:
        return e = b.type, f = lg(e, b.pendingProps), f = lg(e.type, f), ii(a, b, e, f, d, c);
      case 15:
        return ki(a, b, b.type, b.pendingProps, d, c);
      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), a !== null && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, Ff(d) ? (a = !0, Jf(b)) : a = !1, tg(b, c), Mg(b, d, e), Og(b, d, e, c), qi(null, b, d, !0, a, c);
      case 19:
        return Ai(a, b, c);
      case 23:
        return mi(a, b, c);
      case 24:
        return mi(a, b, c);
    }
    throw Error(y(156, b.tag));
  };
  function ik(a, b, c, d) {
    this.tag = a, this.key = c, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = b, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = d, this.flags = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function nh(a, b, c, d) {
    return new ik(a, b, c, d);
  }
  function ji(a) {
    return a = a.prototype, !(!a || !a.isReactComponent);
  }
  function hk(a) {
    if (typeof a == "function")
      return ji(a) ? 1 : 0;
    if (a != null) {
      if (a = a.$$typeof, a === Aa)
        return 11;
      if (a === Da)
        return 14;
    }
    return 2;
  }
  function Tg(a, b) {
    var c = a.alternate;
    return c === null ? (c = nh(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null), c.childLanes = a.childLanes, c.lanes = a.lanes, c.child = a.child, c.memoizedProps = a.memoizedProps, c.memoizedState = a.memoizedState, c.updateQueue = a.updateQueue, b = a.dependencies, c.dependencies = b === null ? null : {lanes: b.lanes, firstContext: b.firstContext}, c.sibling = a.sibling, c.index = a.index, c.ref = a.ref, c;
  }
  function Vg(a, b, c, d, e, f) {
    var g = 2;
    if (d = a, typeof a == "function")
      ji(a) && (g = 1);
    else if (typeof a == "string")
      g = 5;
    else
      a:
        switch (a) {
          case ua:
            return Xg(c.children, e, f, b);
          case Ha:
            g = 8, e |= 16;
            break;
          case wa:
            g = 8, e |= 1;
            break;
          case xa:
            return a = nh(12, c, b, e | 8), a.elementType = xa, a.type = xa, a.lanes = f, a;
          case Ba:
            return a = nh(13, c, b, e), a.type = Ba, a.elementType = Ba, a.lanes = f, a;
          case Ca:
            return a = nh(19, c, b, e), a.elementType = Ca, a.lanes = f, a;
          case Ia:
            return vi(c, e, f, b);
          case Ja:
            return a = nh(24, c, b, e), a.elementType = Ja, a.lanes = f, a;
          default:
            if (typeof a == "object" && a !== null)
              switch (a.$$typeof) {
                case ya:
                  g = 10;
                  break a;
                case za:
                  g = 9;
                  break a;
                case Aa:
                  g = 11;
                  break a;
                case Da:
                  g = 14;
                  break a;
                case Ea:
                  g = 16, d = null;
                  break a;
                case Fa:
                  g = 22;
                  break a;
              }
            throw Error(y(130, a == null ? a : typeof a, ""));
        }
    return b = nh(g, c, b, e), b.elementType = a, b.type = d, b.lanes = f, b;
  }
  function Xg(a, b, c, d) {
    return a = nh(7, a, d, b), a.lanes = c, a;
  }
  function vi(a, b, c, d) {
    return a = nh(23, a, d, b), a.elementType = Ia, a.lanes = c, a;
  }
  function Ug(a, b, c) {
    return a = nh(6, a, null, b), a.lanes = c, a;
  }
  function Wg(a, b, c) {
    return b = nh(4, a.children !== null ? a.children : [], a.key, b), b.lanes = c, b.stateNode = {containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation}, b;
  }
  function jk(a, b, c) {
    this.tag = b, this.containerInfo = a, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.pendingContext = this.context = null, this.hydrate = c, this.callbackNode = null, this.callbackPriority = 0, this.eventTimes = Zc(0), this.expirationTimes = Zc(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zc(0), this.mutableSourceEagerHydrationData = null;
  }
  function kk(a, b, c) {
    var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {$$typeof: ta, key: d == null ? null : "" + d, children: a, containerInfo: b, implementation: c};
  }
  function lk(a, b, c, d) {
    var e = b.current, f = Hg(), g = Ig(e);
    a:
      if (c) {
        c = c._reactInternals;
        b: {
          if (Zb(c) !== c || c.tag !== 1)
            throw Error(y(170));
          var h = c;
          do {
            switch (h.tag) {
              case 3:
                h = h.stateNode.context;
                break b;
              case 1:
                if (Ff(h.type)) {
                  h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                  break b;
                }
            }
            h = h.return;
          } while (h !== null);
          throw Error(y(171));
        }
        if (c.tag === 1) {
          var k = c.type;
          if (Ff(k)) {
            c = If(c, k, h);
            break a;
          }
        }
        c = h;
      } else
        c = Cf;
    return b.context === null ? b.context = c : b.pendingContext = c, b = zg(f, g), b.payload = {element: a}, d = d === void 0 ? null : d, d !== null && (b.callback = d), Ag(e, b), Jg(e, g, f), g;
  }
  function mk(a) {
    if (a = a.current, !a.child)
      return null;
    switch (a.child.tag) {
      case 5:
        return a.child.stateNode;
      default:
        return a.child.stateNode;
    }
  }
  function nk(a, b) {
    if (a = a.memoizedState, a !== null && a.dehydrated !== null) {
      var c = a.retryLane;
      a.retryLane = c !== 0 && c < b ? c : b;
    }
  }
  function ok(a, b) {
    nk(a, b), (a = a.alternate) && nk(a, b);
  }
  function pk() {
    return null;
  }
  function qk(a, b, c) {
    var d = c != null && c.hydrationOptions != null && c.hydrationOptions.mutableSources || null;
    if (c = new jk(a, b, c != null && c.hydrate === !0), b = nh(3, null, null, b === 2 ? 7 : b === 1 ? 3 : 0), c.current = b, b.stateNode = c, xg(b), a[ff] = c.current, cf(a.nodeType === 8 ? a.parentNode : a), d)
      for (a = 0; a < d.length; a++) {
        b = d[a];
        var e = b._getVersion;
        e = e(b._source), c.mutableSourceEagerHydrationData == null ? c.mutableSourceEagerHydrationData = [b, e] : c.mutableSourceEagerHydrationData.push(b, e);
      }
    this._internalRoot = c;
  }
  qk.prototype.render = function(a) {
    lk(a, this._internalRoot, null, null);
  };
  qk.prototype.unmount = function() {
    var a = this._internalRoot, b = a.containerInfo;
    lk(null, a, null, function() {
      b[ff] = null;
    });
  };
  function rk(a) {
    return !(!a || a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11 && (a.nodeType !== 8 || a.nodeValue !== " react-mount-point-unstable "));
  }
  function sk(a, b) {
    if (b || (b = a ? a.nodeType === 9 ? a.documentElement : a.firstChild : null, b = !(!b || b.nodeType !== 1 || !b.hasAttribute("data-reactroot"))), !b)
      for (var c; c = a.lastChild; )
        a.removeChild(c);
    return new qk(a, 0, b ? {hydrate: !0} : void 0);
  }
  function tk(a, b, c, d, e) {
    var f = c._reactRootContainer;
    if (f) {
      var g = f._internalRoot;
      if (typeof e == "function") {
        var h = e;
        e = function() {
          var a2 = mk(g);
          h.call(a2);
        };
      }
      lk(b, g, a, e);
    } else {
      if (f = c._reactRootContainer = sk(c, d), g = f._internalRoot, typeof e == "function") {
        var k = e;
        e = function() {
          var a2 = mk(g);
          k.call(a2);
        };
      }
      Xj(function() {
        lk(b, g, a, e);
      });
    }
    return mk(g);
  }
  ec = function(a) {
    if (a.tag === 13) {
      var b = Hg();
      Jg(a, 4, b), ok(a, 4);
    }
  };
  fc = function(a) {
    if (a.tag === 13) {
      var b = Hg();
      Jg(a, 67108864, b), ok(a, 67108864);
    }
  };
  gc = function(a) {
    if (a.tag === 13) {
      var b = Hg(), c = Ig(a);
      Jg(a, c, b), ok(a, c);
    }
  };
  hc = function(a, b) {
    return b();
  };
  yb = function(a, b, c) {
    switch (b) {
      case "input":
        if (ab(a, c), b = c.name, c.type === "radio" && b != null) {
          for (c = a; c.parentNode; )
            c = c.parentNode;
          for (c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]'), b = 0; b < c.length; b++) {
            var d = c[b];
            if (d !== a && d.form === a.form) {
              var e = Db(d);
              if (!e)
                throw Error(y(90));
              Wa(d), ab(d, e);
            }
          }
        }
        break;
      case "textarea":
        ib(a, c);
        break;
      case "select":
        b = c.value, b != null && fb(a, !!c.multiple, b, !1);
    }
  };
  Gb = Wj;
  Hb = function(a, b, c, d, e) {
    var f = X;
    X |= 4;
    try {
      return gg(98, a.bind(null, b, c, d, e));
    } finally {
      X = f, X === 0 && (wj(), ig());
    }
  };
  Ib = function() {
    (X & 49) == 0 && (Vj(), Oj());
  };
  Jb = function(a, b) {
    var c = X;
    X |= 2;
    try {
      return a(b);
    } finally {
      X = c, X === 0 && (wj(), ig());
    }
  };
  function uk(a, b) {
    var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!rk(b))
      throw Error(y(200));
    return kk(a, b, null, c);
  }
  var vk = {Events: [Cb, ue, Db, Eb, Fb, Oj, {current: !1}]}, wk = {findFiberByHostInstance: wc, bundleType: 0, version: "17.0.1", rendererPackageName: "react-dom"}, xk = {bundleType: wk.bundleType, version: wk.version, rendererPackageName: wk.rendererPackageName, rendererConfig: wk.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ra.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
    return a = cc(a), a === null ? null : a.stateNode;
  }, findFiberByHostInstance: wk.findFiberByHostInstance || pk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null};
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined" && (yk = __REACT_DEVTOOLS_GLOBAL_HOOK__, !yk.isDisabled && yk.supportsFiber))
    try {
      Lf = yk.inject(xk), Mf = yk;
    } catch (a) {
    }
  var yk;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
  exports.createPortal = uk;
  exports.findDOMNode = function(a) {
    if (a == null)
      return null;
    if (a.nodeType === 1)
      return a;
    var b = a._reactInternals;
    if (b === void 0)
      throw typeof a.render == "function" ? Error(y(188)) : Error(y(268, Object.keys(a)));
    return a = cc(b), a = a === null ? null : a.stateNode, a;
  };
  exports.flushSync = function(a, b) {
    var c = X;
    if ((c & 48) != 0)
      return a(b);
    X |= 1;
    try {
      if (a)
        return gg(99, a.bind(null, b));
    } finally {
      X = c, ig();
    }
  };
  exports.hydrate = function(a, b, c) {
    if (!rk(b))
      throw Error(y(200));
    return tk(null, a, b, !0, c);
  };
  exports.render = function(a, b, c) {
    if (!rk(b))
      throw Error(y(200));
    return tk(null, a, b, !1, c);
  };
  exports.unmountComponentAtNode = function(a) {
    if (!rk(a))
      throw Error(y(40));
    return a._reactRootContainer ? (Xj(function() {
      tk(null, null, a, !1, function() {
        a._reactRootContainer = null, a[ff] = null;
      });
    }), !0) : !1;
  };
  exports.unstable_batchedUpdates = Wj;
  exports.unstable_createPortal = function(a, b) {
    return uk(a, b, 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null);
  };
  exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
    if (!rk(c))
      throw Error(y(200));
    if (a == null || a._reactInternals === void 0)
      throw Error(y(38));
    return tk(a, b, c, !1, d);
  };
  exports.version = "17.0.1";
});

// node_modules/.pnpm/react-dom@17.0.1_react@17.0.1/node_modules/react-dom/index.js
var require_react_dom = __commonJS((exports, module) => {
  "use strict";
  function checkDCE() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
  }
  checkDCE(), module.exports = require_react_dom_production_min();
});

// node_modules/.pnpm/mime@2.5.2/node_modules/mime/Mime.js
var require_Mime = __commonJS((exports, module) => {
  "use strict";
  function Mime3() {
    this._types = Object.create(null), this._extensions = Object.create(null);
    for (let i = 0; i < arguments.length; i++)
      this.define(arguments[i]);
    this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
  }
  Mime3.prototype.define = function(typeMap, force) {
    for (let type in typeMap) {
      let extensions = typeMap[type].map(function(t) {
        return t.toLowerCase();
      });
      type = type.toLowerCase();
      for (let i = 0; i < extensions.length; i++) {
        let ext = extensions[i];
        if (ext[0] !== "*") {
          if (!force && ext in this._types)
            throw new Error('Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".');
          this._types[ext] = type;
        }
      }
      if (force || !this._extensions[type]) {
        let ext = extensions[0];
        this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
      }
    }
  };
  Mime3.prototype.getType = function(path7) {
    path7 = String(path7);
    let last = path7.replace(/^.*[/\\]/, "").toLowerCase(), ext = last.replace(/^.*\./, "").toLowerCase(), hasPath = last.length < path7.length;
    return (ext.length < last.length - 1 || !hasPath) && this._types[ext] || null;
  };
  Mime3.prototype.getExtension = function(type) {
    return type = /^\s*([^;\s]*)/.test(type) && RegExp.$1, type && this._extensions[type.toLowerCase()] || null;
  };
  module.exports = Mime3;
});

// node_modules/.pnpm/mime@2.5.2/node_modules/mime/types/standard.js
var require_standard = __commonJS((exports, module) => {
  module.exports = {"application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["ecma", "es"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/mrb-consumer+xml": ["*xdf"], "application/mrb-publish+xml": ["*xdf"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["*xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-error+xml": ["xer"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"]};
});

// node_modules/.pnpm/mime@2.5.2/node_modules/mime/lite.js
var require_lite = __commonJS((exports, module) => {
  "use strict";
  var Mime3 = require_Mime();
  module.exports = new Mime3(require_standard());
});

// node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js
var require_path_browserify = __commonJS((exports, module) => {
  "use strict";
  function assertPath(path7) {
    if (typeof path7 != "string")
      throw new TypeError("Path must be a string. Received " + JSON.stringify(path7));
  }
  function normalizeStringPosix(path7, allowAboveRoot) {
    for (var res = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, code, i = 0; i <= path7.length; ++i) {
      if (i < path7.length)
        code = path7.charCodeAt(i);
      else {
        if (code === 47)
          break;
        code = 47;
      }
      if (code === 47) {
        if (!(lastSlash === i - 1 || dots === 1))
          if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  lastSlashIndex === -1 ? (res = "", lastSegmentLength = 0) : (res = res.slice(0, lastSlashIndex), lastSegmentLength = res.length - 1 - res.lastIndexOf("/")), lastSlash = i, dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "", lastSegmentLength = 0, lastSlash = i, dots = 0;
                continue;
              }
            }
            allowAboveRoot && (res.length > 0 ? res += "/.." : res = "..", lastSegmentLength = 2);
          } else
            res.length > 0 ? res += "/" + path7.slice(lastSlash + 1, i) : res = path7.slice(lastSlash + 1, i), lastSegmentLength = i - lastSlash - 1;
        lastSlash = i, dots = 0;
      } else
        code === 46 && dots !== -1 ? ++dots : dots = -1;
    }
    return res;
  }
  function _format(sep, pathObject) {
    var dir = pathObject.dir || pathObject.root, base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    return dir ? dir === pathObject.root ? dir + base : dir + sep + base : base;
  }
  var posix = {
    resolve: function() {
      for (var resolvedPath = "", resolvedAbsolute = !1, cwd, i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path7;
        i >= 0 ? path7 = arguments[i] : (cwd === void 0 && (cwd = process.cwd()), path7 = cwd), assertPath(path7), path7.length !== 0 && (resolvedPath = path7 + "/" + resolvedPath, resolvedAbsolute = path7.charCodeAt(0) === 47);
      }
      return resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute), resolvedAbsolute ? resolvedPath.length > 0 ? "/" + resolvedPath : "/" : resolvedPath.length > 0 ? resolvedPath : ".";
    },
    normalize: function(path7) {
      if (assertPath(path7), path7.length === 0)
        return ".";
      var isAbsolute3 = path7.charCodeAt(0) === 47, trailingSeparator = path7.charCodeAt(path7.length - 1) === 47;
      return path7 = normalizeStringPosix(path7, !isAbsolute3), path7.length === 0 && !isAbsolute3 && (path7 = "."), path7.length > 0 && trailingSeparator && (path7 += "/"), isAbsolute3 ? "/" + path7 : path7;
    },
    isAbsolute: function(path7) {
      return assertPath(path7), path7.length > 0 && path7.charCodeAt(0) === 47;
    },
    join: function() {
      if (arguments.length === 0)
        return ".";
      for (var joined, i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        assertPath(arg), arg.length > 0 && (joined === void 0 ? joined = arg : joined += "/" + arg);
      }
      return joined === void 0 ? "." : posix.normalize(joined);
    },
    relative: function(from, to) {
      if (assertPath(from), assertPath(to), from === to || (from = posix.resolve(from), to = posix.resolve(to), from === to))
        return "";
      for (var fromStart = 1; fromStart < from.length && from.charCodeAt(fromStart) === 47; ++fromStart)
        ;
      for (var fromEnd = from.length, fromLen = fromEnd - fromStart, toStart = 1; toStart < to.length && to.charCodeAt(toStart) === 47; ++toStart)
        ;
      for (var toEnd = to.length, toLen = toEnd - toStart, length = fromLen < toLen ? fromLen : toLen, lastCommonSep = -1, i = 0; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47)
              return to.slice(toStart + i + 1);
            if (i === 0)
              return to.slice(toStart + i);
          } else
            fromLen > length && (from.charCodeAt(fromStart + i) === 47 ? lastCommonSep = i : i === 0 && (lastCommonSep = 0));
          break;
        }
        var fromCode = from.charCodeAt(fromStart + i), toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode)
          break;
        fromCode === 47 && (lastCommonSep = i);
      }
      var out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i)
        (i === fromEnd || from.charCodeAt(i) === 47) && (out.length === 0 ? out += ".." : out += "/..");
      return out.length > 0 ? out + to.slice(toStart + lastCommonSep) : (toStart += lastCommonSep, to.charCodeAt(toStart) === 47 && ++toStart, to.slice(toStart));
    },
    _makeLong: function(path7) {
      return path7;
    },
    dirname: function(path7) {
      if (assertPath(path7), path7.length === 0)
        return ".";
      for (var code = path7.charCodeAt(0), hasRoot = code === 47, end = -1, matchedSlash = !0, i = path7.length - 1; i >= 1; --i)
        if (code = path7.charCodeAt(i), code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else
          matchedSlash = !1;
      return end === -1 ? hasRoot ? "/" : "." : hasRoot && end === 1 ? "//" : path7.slice(0, end);
    },
    basename: function(path7, ext) {
      if (ext !== void 0 && typeof ext != "string")
        throw new TypeError('"ext" argument must be a string');
      assertPath(path7);
      var start = 0, end = -1, matchedSlash = !0, i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path7.length) {
        if (ext.length === path7.length && ext === path7)
          return "";
        var extIdx = ext.length - 1, firstNonSlashEnd = -1;
        for (i = path7.length - 1; i >= 0; --i) {
          var code = path7.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else
            firstNonSlashEnd === -1 && (matchedSlash = !1, firstNonSlashEnd = i + 1), extIdx >= 0 && (code === ext.charCodeAt(extIdx) ? --extIdx == -1 && (end = i) : (extIdx = -1, end = firstNonSlashEnd));
        }
        return start === end ? end = firstNonSlashEnd : end === -1 && (end = path7.length), path7.slice(start, end);
      } else {
        for (i = path7.length - 1; i >= 0; --i)
          if (path7.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else
            end === -1 && (matchedSlash = !1, end = i + 1);
        return end === -1 ? "" : path7.slice(start, end);
      }
    },
    extname: function(path7) {
      assertPath(path7);
      for (var startDot = -1, startPart = 0, end = -1, matchedSlash = !0, preDotState = 0, i = path7.length - 1; i >= 0; --i) {
        var code = path7.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        end === -1 && (matchedSlash = !1, end = i + 1), code === 46 ? startDot === -1 ? startDot = i : preDotState !== 1 && (preDotState = 1) : startDot !== -1 && (preDotState = -1);
      }
      return startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1 ? "" : path7.slice(startDot, end);
    },
    format: function(pathObject) {
      if (pathObject === null || typeof pathObject != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
      return _format("/", pathObject);
    },
    parse: function(path7) {
      assertPath(path7);
      var ret = {root: "", dir: "", base: "", ext: "", name: ""};
      if (path7.length === 0)
        return ret;
      var code = path7.charCodeAt(0), isAbsolute3 = code === 47, start;
      isAbsolute3 ? (ret.root = "/", start = 1) : start = 0;
      for (var startDot = -1, startPart = 0, end = -1, matchedSlash = !0, i = path7.length - 1, preDotState = 0; i >= start; --i) {
        if (code = path7.charCodeAt(i), code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        end === -1 && (matchedSlash = !1, end = i + 1), code === 46 ? startDot === -1 ? startDot = i : preDotState !== 1 && (preDotState = 1) : startDot !== -1 && (preDotState = -1);
      }
      return startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1 ? end !== -1 && (startPart === 0 && isAbsolute3 ? ret.base = ret.name = path7.slice(1, end) : ret.base = ret.name = path7.slice(startPart, end)) : (startPart === 0 && isAbsolute3 ? (ret.name = path7.slice(1, startDot), ret.base = path7.slice(1, end)) : (ret.name = path7.slice(startPart, startDot), ret.base = path7.slice(startPart, end)), ret.ext = path7.slice(startDot, end)), startPart > 0 ? ret.dir = path7.slice(0, startPart - 1) : isAbsolute3 && (ret.dir = "/"), ret;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  posix.posix = posix;
  module.exports = posix;
});

// node_modules/.pnpm/esbuild-wasm@0.9.0/node_modules/esbuild-wasm/lib/browser.js
var require_browser = __commonJS((exports) => {
  ((exports2) => {
    var __defProp2 = Object.defineProperty, __markAsModule2 = (target) => __defProp2(target, "__esModule", {value: !0}), __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, {get: all[name], enumerable: !0});
    }, __async = (__this, __arguments, generator) => new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }, rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }, step = (result) => result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
    __markAsModule2(exports2), __export2(exports2, {
      build: () => build2,
      buildSync: () => buildSync,
      initialize: () => initialize,
      serve: () => serve,
      transform: () => transform,
      transformSync: () => transformSync,
      version: () => version
    });
    function encodePacket(packet) {
      let visit = (value) => {
        if (value === null)
          bb.write8(0);
        else if (typeof value == "boolean")
          bb.write8(1), bb.write8(+value);
        else if (typeof value == "number")
          bb.write8(2), bb.write32(value | 0);
        else if (typeof value == "string")
          bb.write8(3), bb.write(encodeUTF8(value));
        else if (value instanceof Uint8Array)
          bb.write8(4), bb.write(value);
        else if (value instanceof Array) {
          bb.write8(5), bb.write32(value.length);
          for (let item of value)
            visit(item);
        } else {
          let keys2 = Object.keys(value);
          bb.write8(6), bb.write32(keys2.length);
          for (let key of keys2)
            bb.write(encodeUTF8(key)), visit(value[key]);
        }
      }, bb = new ByteBuffer();
      return bb.write32(0), bb.write32(packet.id << 1 | +!packet.isRequest), visit(packet.value), writeUInt32LE(bb.buf, bb.len - 4, 0), bb.buf.subarray(0, bb.len);
    }
    function decodePacket(bytes) {
      let visit = () => {
        switch (bb.read8()) {
          case 0:
            return null;
          case 1:
            return !!bb.read8();
          case 2:
            return bb.read32();
          case 3:
            return decodeUTF8(bb.read());
          case 4:
            return bb.read();
          case 5: {
            let count = bb.read32(), value2 = [];
            for (let i = 0; i < count; i++)
              value2.push(visit());
            return value2;
          }
          case 6: {
            let count = bb.read32(), value2 = {};
            for (let i = 0; i < count; i++)
              value2[decodeUTF8(bb.read())] = visit();
            return value2;
          }
          default:
            throw new Error("Invalid packet");
        }
      }, bb = new ByteBuffer(bytes), id = bb.read32(), isRequest = (id & 1) == 0;
      id >>>= 1;
      let value = visit();
      if (bb.ptr !== bytes.length)
        throw new Error("Invalid packet");
      return {id, isRequest, value};
    }
    var ByteBuffer = class {
      constructor(buf = new Uint8Array(1024)) {
        this.buf = buf, this.len = 0, this.ptr = 0;
      }
      _write(delta) {
        if (this.len + delta > this.buf.length) {
          let clone = new Uint8Array((this.len + delta) * 2);
          clone.set(this.buf), this.buf = clone;
        }
        return this.len += delta, this.len - delta;
      }
      write8(value) {
        let offset = this._write(1);
        this.buf[offset] = value;
      }
      write32(value) {
        let offset = this._write(4);
        writeUInt32LE(this.buf, value, offset);
      }
      write(bytes) {
        let offset = this._write(4 + bytes.length);
        writeUInt32LE(this.buf, bytes.length, offset), this.buf.set(bytes, offset + 4);
      }
      _read(delta) {
        if (this.ptr + delta > this.buf.length)
          throw new Error("Invalid packet");
        return this.ptr += delta, this.ptr - delta;
      }
      read8() {
        return this.buf[this._read(1)];
      }
      read32() {
        return readUInt32LE(this.buf, this._read(4));
      }
      read() {
        let length = this.read32(), bytes = new Uint8Array(length), ptr = this._read(bytes.length);
        return bytes.set(this.buf.subarray(ptr, ptr + length)), bytes;
      }
    }, encodeUTF8, decodeUTF8;
    if (typeof TextEncoder != "undefined" && typeof TextDecoder != "undefined") {
      let encoder = new TextEncoder(), decoder = new TextDecoder();
      encodeUTF8 = (text) => encoder.encode(text), decodeUTF8 = (bytes) => decoder.decode(bytes);
    } else if (typeof Buffer != "undefined")
      encodeUTF8 = (text) => {
        let buffer = Buffer.from(text);
        return buffer instanceof Uint8Array || (buffer = new Uint8Array(buffer)), buffer;
      }, decodeUTF8 = (bytes) => Buffer.from(bytes).toString();
    else
      throw new Error("No UTF-8 codec found");
    function readUInt32LE(buffer, offset) {
      return buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24;
    }
    function writeUInt32LE(buffer, value, offset) {
      buffer[offset++] = value, buffer[offset++] = value >> 8, buffer[offset++] = value >> 16, buffer[offset++] = value >> 24;
    }
    function validateTarget(target) {
      if (target += "", target.indexOf(",") >= 0)
        throw new Error(`Invalid target: ${target}`);
      return target;
    }
    var canBeAnything = () => null, mustBeBoolean = (value) => typeof value == "boolean" ? null : "a boolean", mustBeBooleanOrObject = (value) => typeof value == "boolean" || typeof value == "object" && !Array.isArray(value) ? null : "a boolean or an object", mustBeString = (value) => typeof value == "string" ? null : "a string", mustBeRegExp = (value) => value instanceof RegExp ? null : "a RegExp object", mustBeInteger = (value) => typeof value == "number" && value === (value | 0) ? null : "an integer", mustBeFunction = (value) => typeof value == "function" ? null : "a function", mustBeArray = (value) => Array.isArray(value) ? null : "an array", mustBeObject = (value) => typeof value == "object" && value !== null && !Array.isArray(value) ? null : "an object", mustBeObjectOrNull = (value) => typeof value == "object" && !Array.isArray(value) ? null : "an object or null", mustBeStringOrBoolean = (value) => typeof value == "string" || typeof value == "boolean" ? null : "a string or a boolean", mustBeStringOrObject = (value) => typeof value == "string" || typeof value == "object" && value !== null && !Array.isArray(value) ? null : "a string or an object", mustBeStringOrArray = (value) => typeof value == "string" || Array.isArray(value) ? null : "a string or an array", mustBeStringOrUint8Array = (value) => typeof value == "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array";
    function getFlag(object, keys2, key, mustBeFn) {
      let value = object[key];
      if (keys2[key + ""] = !0, value === void 0)
        return;
      let mustBe = mustBeFn(value);
      if (mustBe !== null)
        throw new Error(`"${key}" must be ${mustBe}`);
      return value;
    }
    function checkForInvalidFlags(object, keys2, where) {
      for (let key in object)
        if (!(key in keys2))
          throw new Error(`Invalid option ${where}: "${key}"`);
    }
    function validateInitializeOptions(options) {
      let keys2 = Object.create(null), wasmURL = getFlag(options, keys2, "wasmURL", mustBeString), worker = getFlag(options, keys2, "worker", mustBeBoolean);
      return checkForInvalidFlags(options, keys2, "in startService() call"), {
        wasmURL,
        worker
      };
    }
    function pushLogFlags(flags, options, keys2, isTTY, logLevelDefault) {
      let color = getFlag(options, keys2, "color", mustBeBoolean), logLevel = getFlag(options, keys2, "logLevel", mustBeString), logLimit = getFlag(options, keys2, "logLimit", mustBeInteger);
      color ? flags.push(`--color=${color}`) : isTTY && flags.push("--color=true"), flags.push(`--log-level=${logLevel || logLevelDefault}`), flags.push(`--log-limit=${logLimit || 0}`);
    }
    function pushCommonFlags(flags, options, keys2) {
      let sourcesContent = getFlag(options, keys2, "sourcesContent", mustBeBoolean), target = getFlag(options, keys2, "target", mustBeStringOrArray), format = getFlag(options, keys2, "format", mustBeString), globalName = getFlag(options, keys2, "globalName", mustBeString), minify = getFlag(options, keys2, "minify", mustBeBoolean), minifySyntax = getFlag(options, keys2, "minifySyntax", mustBeBoolean), minifyWhitespace = getFlag(options, keys2, "minifyWhitespace", mustBeBoolean), minifyIdentifiers = getFlag(options, keys2, "minifyIdentifiers", mustBeBoolean), charset = getFlag(options, keys2, "charset", mustBeString), treeShaking = getFlag(options, keys2, "treeShaking", mustBeStringOrBoolean), jsxFactory = getFlag(options, keys2, "jsxFactory", mustBeString), jsxFragment = getFlag(options, keys2, "jsxFragment", mustBeString), define = getFlag(options, keys2, "define", mustBeObject), pure = getFlag(options, keys2, "pure", mustBeArray), keepNames = getFlag(options, keys2, "keepNames", mustBeBoolean);
      if (sourcesContent !== void 0 && flags.push(`--sources-content=${sourcesContent}`), target && (Array.isArray(target) ? flags.push(`--target=${Array.from(target).map(validateTarget).join(",")}`) : flags.push(`--target=${validateTarget(target)}`)), format && flags.push(`--format=${format}`), globalName && flags.push(`--global-name=${globalName}`), minify && flags.push("--minify"), minifySyntax && flags.push("--minify-syntax"), minifyWhitespace && flags.push("--minify-whitespace"), minifyIdentifiers && flags.push("--minify-identifiers"), charset && flags.push(`--charset=${charset}`), treeShaking !== void 0 && treeShaking !== !0 && flags.push(`--tree-shaking=${treeShaking}`), jsxFactory && flags.push(`--jsx-factory=${jsxFactory}`), jsxFragment && flags.push(`--jsx-fragment=${jsxFragment}`), define)
        for (let key in define) {
          if (key.indexOf("=") >= 0)
            throw new Error(`Invalid define: ${key}`);
          flags.push(`--define:${key}=${define[key]}`);
        }
      if (pure)
        for (let fn of pure)
          flags.push(`--pure:${fn}`);
      keepNames && flags.push("--keep-names");
    }
    function flagsForBuildOptions(callName, options, isTTY, logLevelDefault, writeDefault) {
      var _a;
      let flags = [], keys2 = Object.create(null), stdinContents = null, stdinResolveDir = null, watchMode = null;
      pushLogFlags(flags, options, keys2, isTTY, logLevelDefault), pushCommonFlags(flags, options, keys2);
      let sourcemap = getFlag(options, keys2, "sourcemap", mustBeStringOrBoolean), bundle = getFlag(options, keys2, "bundle", mustBeBoolean), watch = getFlag(options, keys2, "watch", mustBeBooleanOrObject), splitting = getFlag(options, keys2, "splitting", mustBeBoolean), preserveSymlinks = getFlag(options, keys2, "preserveSymlinks", mustBeBoolean), metafile = getFlag(options, keys2, "metafile", mustBeBoolean), outfile = getFlag(options, keys2, "outfile", mustBeString), outdir = getFlag(options, keys2, "outdir", mustBeString), outbase = getFlag(options, keys2, "outbase", mustBeString), platform = getFlag(options, keys2, "platform", mustBeString), tsconfig = getFlag(options, keys2, "tsconfig", mustBeString), resolveExtensions = getFlag(options, keys2, "resolveExtensions", mustBeArray), nodePathsInput = getFlag(options, keys2, "nodePaths", mustBeArray), mainFields = getFlag(options, keys2, "mainFields", mustBeArray), conditions = getFlag(options, keys2, "conditions", mustBeArray), external = getFlag(options, keys2, "external", mustBeArray), loader = getFlag(options, keys2, "loader", mustBeObject), outExtension = getFlag(options, keys2, "outExtension", mustBeObject), publicPath = getFlag(options, keys2, "publicPath", mustBeString), chunkNames = getFlag(options, keys2, "chunkNames", mustBeString), assetNames = getFlag(options, keys2, "assetNames", mustBeString), inject = getFlag(options, keys2, "inject", mustBeArray), banner = getFlag(options, keys2, "banner", mustBeObject), footer = getFlag(options, keys2, "footer", mustBeObject), entryPoints = getFlag(options, keys2, "entryPoints", mustBeArray), absWorkingDir = getFlag(options, keys2, "absWorkingDir", mustBeString), stdin = getFlag(options, keys2, "stdin", mustBeObject), write = (_a = getFlag(options, keys2, "write", mustBeBoolean)) != null ? _a : writeDefault, incremental = getFlag(options, keys2, "incremental", mustBeBoolean) === !0, plugins = getFlag(options, keys2, "plugins", mustBeArray);
      if (checkForInvalidFlags(options, keys2, `in ${callName}() call`), sourcemap && flags.push(`--sourcemap${sourcemap === !0 ? "" : `=${sourcemap}`}`), bundle && flags.push("--bundle"), watch)
        if (flags.push("--watch"), typeof watch == "boolean")
          watchMode = {};
        else {
          let watchKeys = Object.create(null), onRebuild = getFlag(watch, watchKeys, "onRebuild", mustBeFunction);
          checkForInvalidFlags(watch, watchKeys, `on "watch" in ${callName}() call`), watchMode = {onRebuild};
        }
      if (splitting && flags.push("--splitting"), preserveSymlinks && flags.push("--preserve-symlinks"), metafile && flags.push("--metafile"), outfile && flags.push(`--outfile=${outfile}`), outdir && flags.push(`--outdir=${outdir}`), outbase && flags.push(`--outbase=${outbase}`), platform && flags.push(`--platform=${platform}`), tsconfig && flags.push(`--tsconfig=${tsconfig}`), resolveExtensions) {
        let values = [];
        for (let value of resolveExtensions) {
          if (value += "", value.indexOf(",") >= 0)
            throw new Error(`Invalid resolve extension: ${value}`);
          values.push(value);
        }
        flags.push(`--resolve-extensions=${values.join(",")}`);
      }
      if (publicPath && flags.push(`--public-path=${publicPath}`), chunkNames && flags.push(`--chunk-names=${chunkNames}`), assetNames && flags.push(`--asset-names=${assetNames}`), mainFields) {
        let values = [];
        for (let value of mainFields) {
          if (value += "", value.indexOf(",") >= 0)
            throw new Error(`Invalid main field: ${value}`);
          values.push(value);
        }
        flags.push(`--main-fields=${values.join(",")}`);
      }
      if (conditions) {
        let values = [];
        for (let value of conditions) {
          if (value += "", value.indexOf(",") >= 0)
            throw new Error(`Invalid condition: ${value}`);
          values.push(value);
        }
        flags.push(`--conditions=${values.join(",")}`);
      }
      if (external)
        for (let name of external)
          flags.push(`--external:${name}`);
      if (banner)
        for (let type in banner) {
          if (type.indexOf("=") >= 0)
            throw new Error(`Invalid banner file type: ${type}`);
          flags.push(`--banner:${type}=${banner[type]}`);
        }
      if (footer)
        for (let type in footer) {
          if (type.indexOf("=") >= 0)
            throw new Error(`Invalid footer file type: ${type}`);
          flags.push(`--footer:${type}=${footer[type]}`);
        }
      if (inject)
        for (let path7 of inject)
          flags.push(`--inject:${path7}`);
      if (loader)
        for (let ext in loader) {
          if (ext.indexOf("=") >= 0)
            throw new Error(`Invalid loader extension: ${ext}`);
          flags.push(`--loader:${ext}=${loader[ext]}`);
        }
      if (outExtension)
        for (let ext in outExtension) {
          if (ext.indexOf("=") >= 0)
            throw new Error(`Invalid out extension: ${ext}`);
          flags.push(`--out-extension:${ext}=${outExtension[ext]}`);
        }
      if (entryPoints)
        for (let entryPoint of entryPoints) {
          if (entryPoint += "", entryPoint.startsWith("-"))
            throw new Error(`Invalid entry point: ${entryPoint}`);
          flags.push(entryPoint);
        }
      if (stdin) {
        let stdinKeys = Object.create(null), contents = getFlag(stdin, stdinKeys, "contents", mustBeString), resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString), sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString), loader2 = getFlag(stdin, stdinKeys, "loader", mustBeString);
        checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object'), sourcefile && flags.push(`--sourcefile=${sourcefile}`), loader2 && flags.push(`--loader=${loader2}`), resolveDir && (stdinResolveDir = resolveDir + ""), stdinContents = contents ? contents + "" : "";
      }
      let nodePaths = [];
      if (nodePathsInput)
        for (let value of nodePathsInput)
          value += "", nodePaths.push(value);
      return {
        flags,
        write,
        plugins,
        stdinContents,
        stdinResolveDir,
        absWorkingDir,
        incremental,
        nodePaths,
        watch: watchMode
      };
    }
    function flagsForTransformOptions(callName, options, isTTY, logLevelDefault) {
      let flags = [], keys2 = Object.create(null);
      pushLogFlags(flags, options, keys2, isTTY, logLevelDefault), pushCommonFlags(flags, options, keys2);
      let sourcemap = getFlag(options, keys2, "sourcemap", mustBeStringOrBoolean), tsconfigRaw = getFlag(options, keys2, "tsconfigRaw", mustBeStringOrObject), sourcefile = getFlag(options, keys2, "sourcefile", mustBeString), loader = getFlag(options, keys2, "loader", mustBeString), banner = getFlag(options, keys2, "banner", mustBeString), footer = getFlag(options, keys2, "footer", mustBeString);
      return checkForInvalidFlags(options, keys2, `in ${callName}() call`), sourcemap && flags.push(`--sourcemap=${sourcemap === !0 ? "external" : sourcemap}`), tsconfigRaw && flags.push(`--tsconfig-raw=${typeof tsconfigRaw == "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`), sourcefile && flags.push(`--sourcefile=${sourcefile}`), loader && flags.push(`--loader=${loader}`), banner && flags.push(`--banner=${banner}`), footer && flags.push(`--footer=${footer}`), flags;
    }
    function createChannel(streamIn) {
      let responseCallbacks = new Map(), pluginCallbacks = new Map(), watchCallbacks = new Map(), serveCallbacks = new Map(), nextServeID = 0, isClosed = !1, nextRequestID = 0, nextBuildKey = 0, stdout = new Uint8Array(16 * 1024), stdoutUsed = 0, readFromStdout = (chunk) => {
        let limit = stdoutUsed + chunk.length;
        if (limit > stdout.length) {
          let swap = new Uint8Array(limit * 2);
          swap.set(stdout), stdout = swap;
        }
        stdout.set(chunk, stdoutUsed), stdoutUsed += chunk.length;
        let offset = 0;
        for (; offset + 4 <= stdoutUsed; ) {
          let length = readUInt32LE(stdout, offset);
          if (offset + 4 + length > stdoutUsed)
            break;
          offset += 4, handleIncomingPacket(stdout.slice(offset, offset + length)), offset += length;
        }
        offset > 0 && (stdout.set(stdout.slice(offset)), stdoutUsed -= offset);
      }, afterClose = () => {
        isClosed = !0;
        for (let callback of responseCallbacks.values())
          callback("The service was stopped", null);
        responseCallbacks.clear();
        for (let callbacks of serveCallbacks.values())
          callbacks.onWait("The service was stopped");
        serveCallbacks.clear();
        for (let callback of watchCallbacks.values())
          try {
            callback(new Error("The service was stopped"), null);
          } catch (e) {
            console.error(e);
          }
        watchCallbacks.clear();
      }, sendRequest = (refs, value, callback) => {
        if (isClosed)
          return callback("The service is no longer running", null);
        let id = nextRequestID++;
        responseCallbacks.set(id, (error, response) => {
          try {
            callback(error, response);
          } finally {
            refs && refs.unref();
          }
        }), refs && refs.ref(), streamIn.writeToStdin(encodePacket({id, isRequest: !0, value}));
      }, sendResponse = (id, value) => {
        if (isClosed)
          throw new Error("The service is no longer running");
        streamIn.writeToStdin(encodePacket({id, isRequest: !1, value}));
      }, handleRequest = (id, request) => __async(this, null, function* () {
        try {
          switch (request.command) {
            case "ping": {
              sendResponse(id, {});
              break;
            }
            case "resolve": {
              let callback = pluginCallbacks.get(request.key);
              callback ? sendResponse(id, yield callback(request)) : sendResponse(id, {});
              break;
            }
            case "load": {
              let callback = pluginCallbacks.get(request.key);
              callback ? sendResponse(id, yield callback(request)) : sendResponse(id, {});
              break;
            }
            case "serve-request": {
              let callbacks = serveCallbacks.get(request.serveID);
              callbacks && callbacks.onRequest && callbacks.onRequest(request.args), sendResponse(id, {});
              break;
            }
            case "serve-wait": {
              let callbacks = serveCallbacks.get(request.serveID);
              callbacks && callbacks.onWait(request.error), sendResponse(id, {});
              break;
            }
            case "watch-rebuild": {
              let callback = watchCallbacks.get(request.watchID);
              try {
                callback && callback(null, request.args);
              } catch (err) {
                console.error(err);
              }
              sendResponse(id, {});
              break;
            }
            default:
              throw new Error("Invalid command: " + request.command);
          }
        } catch (e) {
          sendResponse(id, {errors: [extractErrorMessageV8(e, streamIn, null, void 0)]});
        }
      }), isFirstPacket = !0, handleIncomingPacket = (bytes) => {
        if (isFirstPacket) {
          isFirstPacket = !1;
          let binaryVersion = String.fromCharCode(...bytes);
          if (binaryVersion !== "0.9.0")
            throw new Error(`Cannot start service: Host version "0.9.0" does not match binary version ${JSON.stringify(binaryVersion)}`);
          return;
        }
        let packet = decodePacket(bytes);
        if (packet.isRequest)
          handleRequest(packet.id, packet.value);
        else {
          let callback = responseCallbacks.get(packet.id);
          responseCallbacks.delete(packet.id), packet.value.error ? callback(packet.value.error, {}) : callback(null, packet.value);
        }
      }, handlePlugins = (plugins, request, buildKey, stash) => {
        if (streamIn.isSync)
          throw new Error("Cannot use plugins in synchronous API calls");
        let onResolveCallbacks = {}, onLoadCallbacks = {}, nextCallbackID = 0, i = 0;
        request.plugins = [];
        for (let item of plugins) {
          let keys2 = {};
          if (typeof item != "object")
            throw new Error(`Plugin at index ${i} must be an object`);
          let name = getFlag(item, keys2, "name", mustBeString), setup = getFlag(item, keys2, "setup", mustBeFunction);
          if (typeof name != "string" || name === "")
            throw new Error(`Plugin at index ${i} is missing a name`);
          if (typeof setup != "function")
            throw new Error(`[${name}] Plugin is missing a setup function`);
          checkForInvalidFlags(item, keys2, `on plugin ${JSON.stringify(name)}`);
          let plugin = {
            name,
            onResolve: [],
            onLoad: []
          };
          i++, setup({
            onResolve(options, callback2) {
              let registeredText = 'This error came from the "onResolve" callback registered here', registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve"), keys22 = {}, filter = getFlag(options, keys22, "filter", mustBeRegExp), namespace = getFlag(options, keys22, "namespace", mustBeString);
              if (checkForInvalidFlags(options, keys22, `in onResolve() call for plugin ${JSON.stringify(name)}`), filter == null)
                throw new Error(`[${plugin.name}] onResolve() call is missing a filter`);
              let id = nextCallbackID++;
              onResolveCallbacks[id] = {name, callback: callback2, note: registeredNote}, plugin.onResolve.push({id, filter: filter.source, namespace: namespace || ""});
            },
            onLoad(options, callback2) {
              let registeredText = 'This error came from the "onLoad" callback registered here', registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad"), keys22 = {}, filter = getFlag(options, keys22, "filter", mustBeRegExp), namespace = getFlag(options, keys22, "namespace", mustBeString);
              if (checkForInvalidFlags(options, keys22, `in onLoad() call for plugin ${JSON.stringify(name)}`), filter == null)
                throw new Error(`[${plugin.name}] onLoad() call is missing a filter`);
              let id = nextCallbackID++;
              onLoadCallbacks[id] = {name, callback: callback2, note: registeredNote}, plugin.onLoad.push({id, filter: filter.source, namespace: namespace || ""});
            }
          }), request.plugins.push(plugin);
        }
        let callback = (request2) => __async(this, null, function* () {
          switch (request2.command) {
            case "resolve": {
              let response = {}, name, callback2, note;
              for (let id of request2.ids)
                try {
                  ({name, callback: callback2, note} = onResolveCallbacks[id]);
                  let result = yield callback2({
                    path: request2.path,
                    importer: request2.importer,
                    namespace: request2.namespace,
                    resolveDir: request2.resolveDir,
                    kind: request2.kind,
                    pluginData: stash.load(request2.pluginData)
                  });
                  if (result != null) {
                    if (typeof result != "object")
                      throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(name)} to return an object`);
                    let keys2 = {}, pluginName = getFlag(result, keys2, "pluginName", mustBeString), path7 = getFlag(result, keys2, "path", mustBeString), namespace = getFlag(result, keys2, "namespace", mustBeString), external = getFlag(result, keys2, "external", mustBeBoolean), pluginData = getFlag(result, keys2, "pluginData", canBeAnything), errors = getFlag(result, keys2, "errors", mustBeArray), warnings = getFlag(result, keys2, "warnings", mustBeArray);
                    checkForInvalidFlags(result, keys2, `from onResolve() callback in plugin ${JSON.stringify(name)}`), response.id = id, pluginName != null && (response.pluginName = pluginName), path7 != null && (response.path = path7), namespace != null && (response.namespace = namespace), external != null && (response.external = external), pluginData != null && (response.pluginData = stash.store(pluginData)), errors != null && (response.errors = sanitizeMessages(errors, "errors", stash)), warnings != null && (response.warnings = sanitizeMessages(warnings, "warnings", stash));
                    break;
                  }
                } catch (e) {
                  return {id, errors: [extractErrorMessageV8(e, streamIn, stash, note)]};
                }
              return response;
            }
            case "load": {
              let response = {}, name, callback2, note;
              for (let id of request2.ids)
                try {
                  ({name, callback: callback2, note} = onLoadCallbacks[id]);
                  let result = yield callback2({
                    path: request2.path,
                    namespace: request2.namespace,
                    pluginData: stash.load(request2.pluginData)
                  });
                  if (result != null) {
                    if (typeof result != "object")
                      throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(name)} to return an object`);
                    let keys2 = {}, pluginName = getFlag(result, keys2, "pluginName", mustBeString), contents = getFlag(result, keys2, "contents", mustBeStringOrUint8Array), resolveDir = getFlag(result, keys2, "resolveDir", mustBeString), pluginData = getFlag(result, keys2, "pluginData", canBeAnything), loader = getFlag(result, keys2, "loader", mustBeString), errors = getFlag(result, keys2, "errors", mustBeArray), warnings = getFlag(result, keys2, "warnings", mustBeArray);
                    checkForInvalidFlags(result, keys2, `from onLoad() callback in plugin ${JSON.stringify(name)}`), response.id = id, pluginName != null && (response.pluginName = pluginName), contents instanceof Uint8Array ? response.contents = contents : contents != null && (response.contents = encodeUTF8(contents)), resolveDir != null && (response.resolveDir = resolveDir), pluginData != null && (response.pluginData = stash.store(pluginData)), loader != null && (response.loader = loader), errors != null && (response.errors = sanitizeMessages(errors, "errors", stash)), warnings != null && (response.warnings = sanitizeMessages(warnings, "warnings", stash));
                    break;
                  }
                } catch (e) {
                  return {id, errors: [extractErrorMessageV8(e, streamIn, stash, note)]};
                }
              return response;
            }
            default:
              throw new Error("Invalid command: " + request2.command);
          }
        }), refCount = 0;
        return {
          ref() {
            ++refCount == 1 && pluginCallbacks.set(buildKey, callback);
          },
          unref() {
            --refCount == 0 && pluginCallbacks.delete(buildKey);
          }
        };
      }, buildServeData = (refs, options, request) => {
        let keys2 = {}, port = getFlag(options, keys2, "port", mustBeInteger), host = getFlag(options, keys2, "host", mustBeString), servedir = getFlag(options, keys2, "servedir", mustBeString), onRequest = getFlag(options, keys2, "onRequest", mustBeFunction), serveID = nextServeID++, onWait, wait = new Promise((resolve, reject) => {
          onWait = (error) => {
            serveCallbacks.delete(serveID), error !== null ? reject(new Error(error)) : resolve();
          };
        });
        return request.serve = {serveID}, checkForInvalidFlags(options, keys2, "in serve() call"), port !== void 0 && (request.serve.port = port), host !== void 0 && (request.serve.host = host), servedir !== void 0 && (request.serve.servedir = servedir), serveCallbacks.set(serveID, {
          onRequest,
          onWait
        }), {
          wait,
          stop() {
            sendRequest(refs, {command: "serve-stop", serveID}, () => {
            });
          }
        };
      };
      return {
        readFromStdout,
        afterClose,
        service: {
          buildOrServe(callName, callerRefs, serveOptions, options, isTTY, defaultWD, callback) {
            let pluginRefs, details = createObjectStash(), logLevelDefault = "warning", refs = {
              ref() {
                pluginRefs && pluginRefs.ref(), callerRefs && callerRefs.ref();
              },
              unref() {
                pluginRefs && pluginRefs.unref(), callerRefs && callerRefs.unref();
              }
            };
            try {
              let key = nextBuildKey++, writeDefault = !streamIn.isBrowser, {
                flags,
                write,
                plugins,
                stdinContents,
                stdinResolveDir,
                absWorkingDir,
                incremental,
                nodePaths,
                watch
              } = flagsForBuildOptions(callName, options, isTTY, logLevelDefault, writeDefault), request = {
                command: "build",
                key,
                flags,
                write,
                stdinContents,
                stdinResolveDir,
                absWorkingDir: absWorkingDir || defaultWD,
                incremental,
                nodePaths,
                hasOnRebuild: !!(watch && watch.onRebuild)
              }, serve2 = serveOptions && buildServeData(refs, serveOptions, request);
              plugins && plugins.length > 0 && (pluginRefs = handlePlugins(plugins, request, key, details));
              let rebuild, stop, buildResponseToResult = (response, callback2) => {
                let errors = replaceDetailsInMessages(response.errors, details), warnings = replaceDetailsInMessages(response.warnings, details);
                if (errors.length > 0)
                  return callback2(failureErrorWithLog("Build failed", errors, warnings), null);
                let result = {warnings};
                if (response.outputFiles && (result.outputFiles = response.outputFiles.map(convertOutputFiles)), response.metafile && (result.metafile = JSON.parse(response.metafile)), response.writeToStdout !== void 0 && console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, "")), response.rebuildID !== void 0) {
                  if (!rebuild) {
                    let isDisposed = !1;
                    rebuild = () => new Promise((resolve, reject) => {
                      if (isDisposed || isClosed)
                        throw new Error("Cannot rebuild");
                      sendRequest(refs, {command: "rebuild", rebuildID: response.rebuildID}, (error2, response2) => {
                        if (error2)
                          return callback2(new Error(error2), null);
                        buildResponseToResult(response2, (error3, result3) => {
                          error3 ? reject(error3) : resolve(result3);
                        });
                      });
                    }), refs.ref(), rebuild.dispose = () => {
                      isDisposed || (isDisposed = !0, sendRequest(refs, {command: "rebuild-dispose", rebuildID: response.rebuildID}, () => {
                      }), refs.unref());
                    };
                  }
                  result.rebuild = rebuild;
                }
                if (response.watchID !== void 0) {
                  if (!stop) {
                    let isStopped = !1;
                    refs.ref(), stop = () => {
                      isStopped || (isStopped = !0, watchCallbacks.delete(response.watchID), sendRequest(refs, {command: "watch-stop", watchID: response.watchID}, () => {
                      }), refs.unref());
                    }, watch && watch.onRebuild && watchCallbacks.set(response.watchID, (serviceStopError, watchResponse) => {
                      if (serviceStopError)
                        return watch.onRebuild(serviceStopError, null);
                      let errors2 = replaceDetailsInMessages(watchResponse.errors, details), warnings2 = replaceDetailsInMessages(watchResponse.warnings, details);
                      if (errors2.length > 0)
                        return watch.onRebuild(failureErrorWithLog("Build failed", errors2, warnings2), null);
                      let result2 = {warnings: warnings2};
                      watchResponse.outputFiles && (result2.outputFiles = watchResponse.outputFiles.map(convertOutputFiles)), watchResponse.rebuildID !== void 0 && (result2.rebuild = rebuild), result2.stop = stop, watch.onRebuild(null, result2);
                    });
                  }
                  result.stop = stop;
                }
                return callback2(null, result);
              };
              if (write && streamIn.isBrowser)
                throw new Error('Cannot enable "write" in the browser');
              if (incremental && streamIn.isSync)
                throw new Error('Cannot use "incremental" with a synchronous build');
              sendRequest(refs, request, (error, response) => {
                if (error)
                  return callback(new Error(error), null);
                if (serve2) {
                  let serveResponse = response, isStopped = !1;
                  refs.ref();
                  let result = {
                    port: serveResponse.port,
                    host: serveResponse.host,
                    wait: serve2.wait,
                    stop() {
                      isStopped || (isStopped = !0, serve2.stop(), refs.unref());
                    }
                  };
                  return refs.ref(), serve2.wait.then(refs.unref, refs.unref), callback(null, result);
                }
                return buildResponseToResult(response, callback);
              });
            } catch (e) {
              let flags = [];
              try {
                pushLogFlags(flags, options, {}, isTTY, logLevelDefault);
              } catch (e2) {
              }
              let error = extractErrorMessageV8(e, streamIn, details, void 0);
              sendRequest(refs, {command: "error", flags, error}, () => {
                error.detail = details.load(error.detail), callback(failureErrorWithLog("Build failed", [error], []), null);
              });
            }
          },
          transform(callName, refs, input, options, isTTY, fs, callback) {
            let details = createObjectStash(), logLevelDefault = "silent", start = (inputPath) => {
              try {
                if (typeof input != "string")
                  throw new Error('The input to "transform" must be a string');
                let flags = flagsForTransformOptions(callName, options, isTTY, logLevelDefault);
                sendRequest(refs, {
                  command: "transform",
                  flags,
                  inputFS: inputPath !== null,
                  input: inputPath !== null ? inputPath : input
                }, (error, response) => {
                  if (error)
                    return callback(new Error(error), null);
                  let errors = replaceDetailsInMessages(response.errors, details), warnings = replaceDetailsInMessages(response.warnings, details), outstanding = 1, next = () => --outstanding == 0 && callback(null, {warnings, code: response.code, map: response.map});
                  if (errors.length > 0)
                    return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
                  response.codeFS && (outstanding++, fs.readFile(response.code, (err, contents) => {
                    err !== null ? callback(err, null) : (response.code = contents, next());
                  })), response.mapFS && (outstanding++, fs.readFile(response.map, (err, contents) => {
                    err !== null ? callback(err, null) : (response.map = contents, next());
                  })), next();
                });
              } catch (e) {
                let flags = [];
                try {
                  pushLogFlags(flags, options, {}, isTTY, logLevelDefault);
                } catch (e2) {
                }
                let error = extractErrorMessageV8(e, streamIn, details, void 0);
                sendRequest(refs, {command: "error", flags, error}, () => {
                  error.detail = details.load(error.detail), callback(failureErrorWithLog("Transform failed", [error], []), null);
                });
              }
            };
            if (typeof input == "string" && input.length > 1024 * 1024) {
              let next = start;
              start = () => fs.writeFile(input, next);
            }
            start(null);
          }
        }
      };
    }
    function createObjectStash() {
      let map = new Map(), nextID = 0;
      return {
        load(id) {
          return map.get(id);
        },
        store(value) {
          if (value === void 0)
            return -1;
          let id = nextID++;
          return map.set(id, value), id;
        }
      };
    }
    function extractCallerV8(e, streamIn, ident) {
      try {
        let lines = (e.stack + "").split(`
`);
        lines.splice(1, 1);
        let location2 = parseStackLinesV8(streamIn, lines, ident);
        if (location2)
          return {text: e.message, location: location2};
      } catch (e2) {
      }
    }
    function extractErrorMessageV8(e, streamIn, stash, note) {
      let text = "Internal error", location2 = null;
      try {
        text = (e && e.message || e) + "";
      } catch (e2) {
      }
      try {
        location2 = parseStackLinesV8(streamIn, (e.stack + "").split(`
`), "");
      } catch (e2) {
      }
      return {text, location: location2, notes: note ? [note] : [], detail: stash ? stash.store(e) : -1};
    }
    function parseStackLinesV8(streamIn, lines, ident) {
      let at = "    at ";
      if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at))
        for (let i = 1; i < lines.length; i++) {
          let line = lines[i];
          if (!!line.startsWith(at))
            for (line = line.slice(at.length); ; ) {
              let match = /^(?:new |async )?\S+ \((.*)\)$/.exec(line);
              if (match) {
                line = match[1];
                continue;
              }
              if (match = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line), match) {
                line = match[1];
                continue;
              }
              if (match = /^(\S+):(\d+):(\d+)$/.exec(line), match) {
                let lineText = streamIn.readFileSync(match[1], "utf8").split(/\r\n|\r|\n|\u2028|\u2029/)[+match[2] - 1] || "", column = +match[3] - 1, length = lineText.slice(column, column + ident.length) === ident ? ident.length : 0;
                return {
                  file: match[1],
                  namespace: "file",
                  line: +match[2],
                  column: encodeUTF8(lineText.slice(0, column)).length,
                  length: encodeUTF8(lineText.slice(column, column + length)).length,
                  lineText: lineText + `
` + lines.slice(1).join(`
`)
                };
              }
              break;
            }
        }
      return null;
    }
    function failureErrorWithLog(text, errors, warnings) {
      let limit = 5, summary = errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i) => {
        if (i === limit)
          return `
...`;
        if (!e.location)
          return `
error: ${e.text}`;
        let {file, line, column} = e.location;
        return `
${file}:${line}:${column}: error: ${e.text}`;
      }).join(""), error = new Error(`${text}${summary}`);
      return error.errors = errors, error.warnings = warnings, error;
    }
    function replaceDetailsInMessages(messages, stash) {
      for (let message of messages)
        message.detail = stash.load(message.detail);
      return messages;
    }
    function sanitizeLocation(location2, where) {
      if (location2 == null)
        return null;
      let keys2 = {}, file = getFlag(location2, keys2, "file", mustBeString), namespace = getFlag(location2, keys2, "namespace", mustBeString), line = getFlag(location2, keys2, "line", mustBeInteger), column = getFlag(location2, keys2, "column", mustBeInteger), length = getFlag(location2, keys2, "length", mustBeInteger), lineText = getFlag(location2, keys2, "lineText", mustBeString);
      return checkForInvalidFlags(location2, keys2, where), {
        file: file || "",
        namespace: namespace || "",
        line: line || 0,
        column: column || 0,
        length: length || 0,
        lineText: lineText || ""
      };
    }
    function sanitizeMessages(messages, property, stash) {
      let messagesClone = [], index = 0;
      for (let message of messages) {
        let keys2 = {}, text = getFlag(message, keys2, "text", mustBeString), location2 = getFlag(message, keys2, "location", mustBeObjectOrNull), notes = getFlag(message, keys2, "notes", mustBeArray), detail = getFlag(message, keys2, "detail", canBeAnything), where = `in element ${index} of "${property}"`;
        checkForInvalidFlags(message, keys2, where);
        let notesClone = [];
        if (notes)
          for (let note of notes) {
            let noteKeys = {}, noteText = getFlag(note, noteKeys, "text", mustBeString), noteLocation = getFlag(note, noteKeys, "location", mustBeObjectOrNull);
            checkForInvalidFlags(note, noteKeys, where), notesClone.push({
              text: noteText || "",
              location: sanitizeLocation(noteLocation, where)
            });
          }
        messagesClone.push({
          text: text || "",
          location: sanitizeLocation(location2, where),
          notes: notesClone,
          detail: stash.store(detail)
        }), index++;
      }
      return messagesClone;
    }
    function convertOutputFiles({path: path7, contents}) {
      let text = null;
      return {
        path: path7,
        contents,
        get text() {
          return text === null && (text = decodeUTF8(contents)), text;
        }
      };
    }
    var version = "0.9.0", build2 = (options) => ensureServiceIsRunning().build(options), serve = () => {
      throw new Error('The "serve" API only works in node');
    }, transform = (input, options) => ensureServiceIsRunning().transform(input, options), buildSync = () => {
      throw new Error('The "buildSync" API only works in node');
    }, transformSync = () => {
      throw new Error('The "transformSync" API only works in node');
    }, initializePromise, longLivedService, ensureServiceIsRunning = () => {
      if (longLivedService)
        return longLivedService;
      throw initializePromise ? new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this') : new Error('You need to call "initialize" before calling this');
    }, initialize = (options) => {
      options = validateInitializeOptions(options || {});
      let wasmURL = options.wasmURL, useWorker = options.worker !== !1;
      if (!wasmURL)
        throw new Error('Must provide the "wasmURL" option');
      if (wasmURL += "", initializePromise)
        throw new Error('Cannot call "initialize" more than once');
      return initializePromise = startRunningService(wasmURL, useWorker), initializePromise.catch(() => {
        initializePromise = void 0;
      }), initializePromise;
    }, startRunningService = (wasmURL, useWorker) => __async(void 0, null, function* () {
      let res = yield fetch(wasmURL);
      if (!res.ok)
        throw new Error(`Failed to download ${JSON.stringify(wasmURL)}`);
      let wasm = yield res.arrayBuffer(), code = `{let global={};for(let o=self;o;o=Object.getPrototypeOf(o))for(let k of Object.getOwnPropertyNames(o))if(!(k in global))Object.defineProperty(global,k,{get:()=>self[k]});// Copyright 2018 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

(() => {
	// Map multiple JavaScript environments to a single common API,
	// preferring web standards over Node.js API.
	//
	// Environments considered:
	// - Browsers
	// - Node.js
	// - Electron
	// - Parcel
	// - Webpack

	if (typeof global !== "undefined") {
		// global already exists
	} else if (typeof window !== "undefined") {
		window.global = window;
	} else if (typeof self !== "undefined") {
		self.global = self;
	} else {
		throw new Error("cannot export Go (neither global, window nor self is defined)");
	}

	if (!global.require && typeof require !== "undefined") {
		global.require = require;
	}

	if (!global.fs && global.require) {
		const fs = require("fs");
		if (typeof fs === "object" && fs !== null && Object.keys(fs).length !== 0) {
			
    global.fs = Object.assign({}, fs, {
      // Hack around a Unicode bug in node: https://github.com/nodejs/node/issues/24550
      write(fd, buf, offset, length, position, callback) {
        if (offset === 0 && length === buf.length && position === null) {
          if (fd === process.stdout.fd) {
            try {
              process.stdout.write(buf, err => err ? callback(err, 0, null) : callback(null, length, buf));
            } catch (err) {
              callback(err, 0, null);
            }
            return;
          }
          if (fd === process.stderr.fd) {
            try {
              process.stderr.write(buf, err => err ? callback(err, 0, null) : callback(null, length, buf));
            } catch (err) {
              callback(err, 0, null);
            }
            return;
          }
        }
        fs.write(fd, buf, offset, length, position, callback);
      },
    });
  
		}
	}

	const enosys = () => {
		const err = new Error("not implemented");
		err.code = "ENOSYS";
		return err;
	};

	if (!global.fs) {
		let outputBuf = "";
		global.fs = {
			constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 }, // unused
			writeSync(fd, buf) {
				outputBuf += decoder.decode(buf);
				const nl = outputBuf.lastIndexOf("\\n");
				if (nl != -1) {
					console.log(outputBuf.substr(0, nl));
					outputBuf = outputBuf.substr(nl + 1);
				}
				return buf.length;
			},
			write(fd, buf, offset, length, position, callback) {
				if (offset !== 0 || length !== buf.length || position !== null) {
					callback(enosys());
					return;
				}
				const n = this.writeSync(fd, buf);
				callback(null, n);
			},
			chmod(path, mode, callback) { callback(enosys()); },
			chown(path, uid, gid, callback) { callback(enosys()); },
			close(fd, callback) { callback(enosys()); },
			fchmod(fd, mode, callback) { callback(enosys()); },
			fchown(fd, uid, gid, callback) { callback(enosys()); },
			fstat(fd, callback) { callback(enosys()); },
			fsync(fd, callback) { callback(null); },
			ftruncate(fd, length, callback) { callback(enosys()); },
			lchown(path, uid, gid, callback) { callback(enosys()); },
			link(path, link, callback) { callback(enosys()); },
			lstat(path, callback) { callback(enosys()); },
			mkdir(path, perm, callback) { callback(enosys()); },
			open(path, flags, mode, callback) { callback(enosys()); },
			read(fd, buffer, offset, length, position, callback) { callback(enosys()); },
			readdir(path, callback) { callback(enosys()); },
			readlink(path, callback) { callback(enosys()); },
			rename(from, to, callback) { callback(enosys()); },
			rmdir(path, callback) { callback(enosys()); },
			stat(path, callback) { callback(enosys()); },
			symlink(path, link, callback) { callback(enosys()); },
			truncate(path, length, callback) { callback(enosys()); },
			unlink(path, callback) { callback(enosys()); },
			utimes(path, atime, mtime, callback) { callback(enosys()); },
		};
	}

	if (!global.process) {
		global.process = {
			getuid() { return -1; },
			getgid() { return -1; },
			geteuid() { return -1; },
			getegid() { return -1; },
			getgroups() { throw enosys(); },
			pid: -1,
			ppid: -1,
			umask() { throw enosys(); },
			cwd() { throw enosys(); },
			chdir() { throw enosys(); },
		}
	}

	if (!global.crypto && global.require) {
		const nodeCrypto = require("crypto");
		global.crypto = {
			getRandomValues(b) {
				nodeCrypto.randomFillSync(b);
			},
		};
	}
	if (!global.crypto) {
		throw new Error("global.crypto is not available, polyfill required (getRandomValues only)");
	}

	if (!global.performance) {
		global.performance = {
			now() {
				const [sec, nsec] = process.hrtime();
				return sec * 1000 + nsec / 1000000;
			},
		};
	}

	if (!global.TextEncoder && global.require) {
		global.TextEncoder = require("util").TextEncoder;
	}
	if (!global.TextEncoder) {
		throw new Error("global.TextEncoder is not available, polyfill required");
	}

	if (!global.TextDecoder && global.require) {
		global.TextDecoder = require("util").TextDecoder;
	}
	if (!global.TextDecoder) {
		throw new Error("global.TextDecoder is not available, polyfill required");
	}

	// End of polyfills for common API.

	const encoder = new TextEncoder("utf-8");
	const decoder = new TextDecoder("utf-8");

	global.Go = class {
		constructor() {
			this.argv = ["js"];
			this.env = {};
			this.exit = (code) => {
				if (code !== 0) {
					console.warn("exit code:", code);
				}
			};
			this._exitPromise = new Promise((resolve) => {
				this._resolveExitPromise = resolve;
			});
			this._pendingEvent = null;
			this._scheduledTimeouts = new Map();
			this._nextCallbackTimeoutID = 1;

			const setInt64 = (addr, v) => {
				this.mem.setUint32(addr + 0, v, true);
				this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
			}

			const getInt64 = (addr) => {
				const low = this.mem.getUint32(addr + 0, true);
				const high = this.mem.getInt32(addr + 4, true);
				return low + high * 4294967296;
			}

			const loadValue = (addr) => {
				const f = this.mem.getFloat64(addr, true);
				if (f === 0) {
					return undefined;
				}
				if (!isNaN(f)) {
					return f;
				}

				const id = this.mem.getUint32(addr, true);
				return this._values[id];
			}

			const storeValue = (addr, v) => {
				const nanHead = 0x7FF80000;

				if (typeof v === "number" && v !== 0) {
					if (isNaN(v)) {
						this.mem.setUint32(addr + 4, nanHead, true);
						this.mem.setUint32(addr, 0, true);
						return;
					}
					this.mem.setFloat64(addr, v, true);
					return;
				}

				if (v === undefined) {
					this.mem.setFloat64(addr, 0, true);
					return;
				}

				let id = this._ids.get(v);
				if (id === undefined) {
					id = this._idPool.pop();
					if (id === undefined) {
						id = this._values.length;
					}
					this._values[id] = v;
					this._goRefCounts[id] = 0;
					this._ids.set(v, id);
				}
				this._goRefCounts[id]++;
				let typeFlag = 0;
				switch (typeof v) {
					case "object":
						if (v !== null) {
							typeFlag = 1;
						}
						break;
					case "string":
						typeFlag = 2;
						break;
					case "symbol":
						typeFlag = 3;
						break;
					case "function":
						typeFlag = 4;
						break;
				}
				this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
				this.mem.setUint32(addr, id, true);
			}

			const loadSlice = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return new Uint8Array(this._inst.exports.mem.buffer, array, len);
			}

			const loadSliceOfValues = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				const a = new Array(len);
				for (let i = 0; i < len; i++) {
					a[i] = loadValue(array + i * 8);
				}
				return a;
			}

			const loadString = (addr) => {
				const saddr = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
			}

			const timeOrigin = Date.now() - performance.now();
			this.importObject = {
				go: {
					// Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
					// may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
					// function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
					// This changes the SP, thus we have to update the SP used by the imported function.

					// func wasmExit(code int32)
					"runtime.wasmExit": (sp) => {
						sp >>>= 0;
						const code = this.mem.getInt32(sp + 8, true);
						this.exited = true;
						delete this._inst;
						delete this._values;
						delete this._goRefCounts;
						delete this._ids;
						delete this._idPool;
						this.exit(code);
					},

					// func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
					"runtime.wasmWrite": (sp) => {
						sp >>>= 0;
						const fd = getInt64(sp + 8);
						const p = getInt64(sp + 16);
						const n = this.mem.getInt32(sp + 24, true);
						fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
					},

					// func resetMemoryDataView()
					"runtime.resetMemoryDataView": (sp) => {
						sp >>>= 0;
						this.mem = new DataView(this._inst.exports.mem.buffer);
					},

					// func nanotime1() int64
					"runtime.nanotime1": (sp) => {
						sp >>>= 0;
						setInt64(sp + 8, (timeOrigin + performance.now()) * 1000000);
					},

					// func walltime1() (sec int64, nsec int32)
					"runtime.walltime1": (sp) => {
						sp >>>= 0;
						const msec = (new Date).getTime();
						setInt64(sp + 8, msec / 1000);
						this.mem.setInt32(sp + 16, (msec % 1000) * 1000000, true);
					},

					// func scheduleTimeoutEvent(delay int64) int32
					"runtime.scheduleTimeoutEvent": (sp) => {
						sp >>>= 0;
						const id = this._nextCallbackTimeoutID;
						this._nextCallbackTimeoutID++;
						this._scheduledTimeouts.set(id, setTimeout(
							() => {
								this._resume();
								while (this._scheduledTimeouts.has(id)) {
									// for some reason Go failed to register the timeout event, log and try again
									// (temporary workaround for https://github.com/golang/go/issues/28975)
									console.warn("scheduleTimeoutEvent: missed timeout event");
									this._resume();
								}
							},
							getInt64(sp + 8) + 1, // setTimeout has been seen to fire up to 1 millisecond early
						));
						this.mem.setInt32(sp + 16, id, true);
					},

					// func clearTimeoutEvent(id int32)
					"runtime.clearTimeoutEvent": (sp) => {
						sp >>>= 0;
						const id = this.mem.getInt32(sp + 8, true);
						clearTimeout(this._scheduledTimeouts.get(id));
						this._scheduledTimeouts.delete(id);
					},

					// func getRandomData(r []byte)
					"runtime.getRandomData": (sp) => {
						sp >>>= 0;
						crypto.getRandomValues(loadSlice(sp + 8));
					},

					// func finalizeRef(v ref)
					"syscall/js.finalizeRef": (sp) => {
						sp >>>= 0;
						const id = this.mem.getUint32(sp + 8, true);
						this._goRefCounts[id]--;
						if (this._goRefCounts[id] === 0) {
							const v = this._values[id];
							this._values[id] = null;
							this._ids.delete(v);
							this._idPool.push(id);
						}
					},

					// func stringVal(value string) ref
					"syscall/js.stringVal": (sp) => {
						sp >>>= 0;
						storeValue(sp + 24, loadString(sp + 8));
					},

					// func valueGet(v ref, p string) ref
					"syscall/js.valueGet": (sp) => {
						sp >>>= 0;
						const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
						sp = this._inst.exports.getsp() >>> 0; // see comment above
						storeValue(sp + 32, result);
					},

					// func valueSet(v ref, p string, x ref)
					"syscall/js.valueSet": (sp) => {
						sp >>>= 0;
						Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
					},

					// func valueDelete(v ref, p string)
					"syscall/js.valueDelete": (sp) => {
						sp >>>= 0;
						Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
					},

					// func valueIndex(v ref, i int) ref
					"syscall/js.valueIndex": (sp) => {
						sp >>>= 0;
						storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
					},

					// valueSetIndex(v ref, i int, x ref)
					"syscall/js.valueSetIndex": (sp) => {
						sp >>>= 0;
						Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
					},

					// func valueCall(v ref, m string, args []ref) (ref, bool)
					"syscall/js.valueCall": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const m = Reflect.get(v, loadString(sp + 16));
							const args = loadSliceOfValues(sp + 32);
							const result = Reflect.apply(m, v, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 56, result);
							this.mem.setUint8(sp + 64, 1);
						} catch (err) {
							storeValue(sp + 56, err);
							this.mem.setUint8(sp + 64, 0);
						}
					},

					// func valueInvoke(v ref, args []ref) (ref, bool)
					"syscall/js.valueInvoke": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.apply(v, undefined, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueNew(v ref, args []ref) (ref, bool)
					"syscall/js.valueNew": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.construct(v, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueLength(v ref) int
					"syscall/js.valueLength": (sp) => {
						sp >>>= 0;
						setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
					},

					// valuePrepareString(v ref) (ref, int)
					"syscall/js.valuePrepareString": (sp) => {
						sp >>>= 0;
						const str = encoder.encode(String(loadValue(sp + 8)));
						storeValue(sp + 16, str);
						setInt64(sp + 24, str.length);
					},

					// valueLoadString(v ref, b []byte)
					"syscall/js.valueLoadString": (sp) => {
						sp >>>= 0;
						const str = loadValue(sp + 8);
						loadSlice(sp + 16).set(str);
					},

					// func valueInstanceOf(v ref, t ref) bool
					"syscall/js.valueInstanceOf": (sp) => {
						sp >>>= 0;
						this.mem.setUint8(sp + 24, (loadValue(sp + 8) instanceof loadValue(sp + 16)) ? 1 : 0);
					},

					// func copyBytesToGo(dst []byte, src ref) (int, bool)
					"syscall/js.copyBytesToGo": (sp) => {
						sp >>>= 0;
						const dst = loadSlice(sp + 8);
						const src = loadValue(sp + 32);
						if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
							this.mem.setUint8(sp + 48, 0);
							return;
						}
						const toCopy = src.subarray(0, dst.length);
						dst.set(toCopy);
						setInt64(sp + 40, toCopy.length);
						this.mem.setUint8(sp + 48, 1);
					},

					// func copyBytesToJS(dst ref, src []byte) (int, bool)
					"syscall/js.copyBytesToJS": (sp) => {
						sp >>>= 0;
						const dst = loadValue(sp + 8);
						const src = loadSlice(sp + 16);
						if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
							this.mem.setUint8(sp + 48, 0);
							return;
						}
						const toCopy = src.subarray(0, dst.length);
						dst.set(toCopy);
						setInt64(sp + 40, toCopy.length);
						this.mem.setUint8(sp + 48, 1);
					},

					"debug": (value) => {
						console.log(value);
					},
				}
			};
		}

		async run(instance) {
			if (!(instance instanceof WebAssembly.Instance)) {
				throw new Error("Go.run: WebAssembly.Instance expected");
			}
			this._inst = instance;
			this.mem = new DataView(this._inst.exports.mem.buffer);
			this._values = [ // JS values that Go currently has references to, indexed by reference id
				NaN,
				0,
				null,
				true,
				false,
				global,
				this,
			];
			this._goRefCounts = new Array(this._values.length).fill(Infinity); // number of references that Go has to a JS value, indexed by reference id
			this._ids = new Map([ // mapping from JS values to reference ids
				[0, 1],
				[null, 2],
				[true, 3],
				[false, 4],
				[global, 5],
				[this, 6],
			]);
			this._idPool = [];   // unused ids that have been garbage collected
			this.exited = false; // whether the Go program has exited

			// Pass command line arguments and environment variables to WebAssembly by writing them to the linear memory.
			let offset = 4096;

			const strPtr = (str) => {
				const ptr = offset;
				const bytes = encoder.encode(str + "\\0");
				new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
				offset += bytes.length;
				if (offset % 8 !== 0) {
					offset += 8 - (offset % 8);
				}
				return ptr;
			};

			const argc = this.argv.length;

			const argvPtrs = [];
			this.argv.forEach((arg) => {
				argvPtrs.push(strPtr(arg));
			});
			argvPtrs.push(0);

			const keys = Object.keys(this.env).sort();
			keys.forEach((key) => {
				argvPtrs.push(strPtr(\`\${key}=\${this.env[key]}\`));
			});
			argvPtrs.push(0);

			const argv = offset;
			argvPtrs.forEach((ptr) => {
				this.mem.setUint32(offset, ptr, true);
				this.mem.setUint32(offset + 4, 0, true);
				offset += 8;
			});

			this._inst.exports.run(argc, argv);
			if (this.exited) {
				this._resolveExitPromise();
			}
			await this._exitPromise;
		}

		_resume() {
			if (this.exited) {
				throw new Error("Go program has already exited");
			}
			this._inst.exports.resume();
			if (this.exited) {
				this._resolveExitPromise();
			}
		}

		_makeFuncWrapper(id) {
			const go = this;
			return function () {
				const event = { id: id, this: this, args: arguments };
				go._pendingEvent = event;
				go._resume();
				return event.result;
			};
		}
	}

	if (
		typeof module !== "undefined" &&
		global.require &&
		global.require.main === module &&
		global.process &&
		global.process.versions &&
		!global.process.versions.electron
	) {
		if (process.argv.length < 3) {
			console.error("usage: go_js_wasm_exec [wasm binary] [arguments]");
			process.exit(1);
		}

		const go = new Go();
		go.argv = process.argv.slice(2);
		go.env = Object.assign({ TMPDIR: require("os").tmpdir() }, process.env);
		go.exit = process.exit;
		WebAssembly.instantiate(fs.readFileSync(process.argv[2]), go.importObject).then((result) => {
			process.on("exit", (code) => { // Node.js exits if no event handler is pending
				if (code === 0 && !go.exited) {
					// deadlock, make Go print error and stack traces
					go._pendingEvent = { id: 0 };
					go._resume();
				}
			});
			return go.run(result.instance);
		}).catch((err) => {
			console.error(err);
			process.exit(1);
		});
	}
})();
onmessage = ({data: wasm}) => {
  let decoder = new TextDecoder();
  let fs = global.fs;
  let stderr = "";
  fs.writeSync = (fd, buffer) => {
    if (fd === 1) {
      postMessage(buffer);
    } else if (fd === 2) {
      stderr += decoder.decode(buffer);
      let parts = stderr.split("\\n");
      if (parts.length > 1)
        console.log(parts.slice(0, -1).join("\\n"));
      stderr = parts[parts.length - 1];
    } else {
      throw new Error("Bad write");
    }
    return buffer.length;
  };
  let stdin = [];
  let resumeStdin;
  let stdinPos = 0;
  onmessage = ({data}) => {
    if (data.length > 0) {
      stdin.push(data);
      if (resumeStdin)
        resumeStdin();
    }
  };
  fs.read = (fd, buffer, offset, length, position, callback) => {
    if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
      throw new Error("Bad read");
    }
    if (stdin.length === 0) {
      resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);
      return;
    }
    let first = stdin[0];
    let count = Math.max(0, Math.min(length, first.length - stdinPos));
    buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
    stdinPos += count;
    if (stdinPos === first.length) {
      stdin.shift();
      stdinPos = 0;
    }
    callback(null, count);
  };
  let go = new global.Go();
  go.argv = ["", \`--service=\${"0.9.0"}\`];
  WebAssembly.instantiate(wasm, go.importObject).then(({instance}) => go.run(instance));
};}`, worker;
      if (useWorker) {
        let blob = new Blob([code], {type: "text/javascript"});
        worker = new Worker(URL.createObjectURL(blob));
      } else {
        let onmessage = new Function("postMessage", code + "var onmessage; return m => onmessage(m)")((data) => worker.onmessage({data}));
        worker = {
          onmessage: null,
          postMessage: (data) => onmessage({data}),
          terminate() {
          }
        };
      }
      worker.postMessage(wasm), worker.onmessage = ({data}) => readFromStdout(data);
      let {readFromStdout, service} = createChannel({
        writeToStdin(bytes) {
          worker.postMessage(bytes);
        },
        isSync: !1,
        isBrowser: !0
      });
      longLivedService = {
        build: (options) => new Promise((resolve, reject) => service.buildOrServe("build", null, null, options, !1, "/", (err, res2) => err ? reject(err) : resolve(res2))),
        transform: (input, options) => new Promise((resolve, reject) => service.transform("transform", null, input, options || {}, !1, {
          readFile(_, callback) {
            callback(new Error("Internal error"), null);
          },
          writeFile(_, callback) {
            callback(null);
          }
        }, (err, res2) => err ? reject(err) : resolve(res2)))
      };
    });
  })(typeof exports == "object" ? exports : (typeof self != "undefined" ? self : exports).esbuild = {});
});

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isBuffer.js
var require_isBuffer = __commonJS((exports, module) => {
  __markAsModule(exports);
  __export(exports, {
    default: () => isBuffer_default
  });
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module, moduleExports = freeModule && freeModule.exports === freeExports, Buffer2 = moduleExports ? root_default.Buffer : void 0, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0, isBuffer3 = nativeIsBuffer || stubFalse_default, isBuffer_default = isBuffer3;
});

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_nodeUtil.js
var require_nodeUtil = __commonJS((exports, module) => {
  __markAsModule(exports);
  __export(exports, {
    default: () => nodeUtil_default
  });
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module, moduleExports = freeModule && freeModule.exports === freeExports, freeProcess = moduleExports && freeGlobal_default.process, nodeUtil4 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      return types || freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }(), nodeUtil_default = nodeUtil4;
});

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneBuffer.js
var require_cloneBuffer = __commonJS((exports, module) => {
  __markAsModule(exports);
  __export(exports, {
    default: () => cloneBuffer_default
  });
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module, moduleExports = freeModule && freeModule.exports === freeExports, Buffer2 = moduleExports ? root_default.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep)
      return buffer.slice();
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    return buffer.copy(result), result;
  }
  var cloneBuffer_default = cloneBuffer2;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/internal/constants.js
var require_constants = __commonJS((exports, module) => {
  var SEMVER_SPEC_VERSION = "2.0.0", MAX_LENGTH = 256, MAX_SAFE_INTEGER3 = Number.MAX_SAFE_INTEGER || 9007199254740991, MAX_SAFE_COMPONENT_LENGTH = 16;
  module.exports = {
    SEMVER_SPEC_VERSION,
    MAX_LENGTH,
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER3,
    MAX_SAFE_COMPONENT_LENGTH
  };
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/internal/debug.js
var require_debug = __commonJS((exports, module) => {
  var debug = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  module.exports = debug;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/internal/re.js
var require_re = __commonJS((exports, module) => {
  var {MAX_SAFE_COMPONENT_LENGTH} = require_constants(), debug = require_debug();
  exports = module.exports = {};
  var re = exports.re = [], src = exports.src = [], t = exports.t = {}, R = 0, createToken = (name, value, isGlobal) => {
    let index = R++;
    debug(index, value), t[name] = index, src[index] = value, re[index] = new RegExp(value, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
  createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
  createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
  createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
  createToken("FULL", `^${src[t.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
  createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
  createToken("COERCE", `(^|[^\\d])(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t.COERCE], !0);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, !0);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, !0);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, !0);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0.0.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$");
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS((exports, module) => {
  var opts = ["includePrerelease", "loose", "rtl"], parseOptions = (options) => options ? typeof options != "object" ? {loose: !0} : opts.filter((k) => options[k]).reduce((options2, k) => (options2[k] = !0, options2), {}) : {};
  module.exports = parseOptions;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS((exports, module) => {
  var numeric = /^[0-9]+$/, compareIdentifiers = (a, b) => {
    let anum = numeric.test(a), bnum = numeric.test(b);
    return anum && bnum && (a = +a, b = +b), a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  }, rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
  module.exports = {
    compareIdentifiers,
    rcompareIdentifiers
  };
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/classes/semver.js
var require_semver = __commonJS((exports, module) => {
  var debug = require_debug(), {MAX_LENGTH, MAX_SAFE_INTEGER: MAX_SAFE_INTEGER3} = require_constants(), {re, t} = require_re(), parseOptions = require_parse_options(), {compareIdentifiers} = require_identifiers(), SemVer = class {
    constructor(version, options) {
      if (options = parseOptions(options), version instanceof SemVer) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease)
          return version;
        version = version.version;
      } else if (typeof version != "string")
        throw new TypeError(`Invalid Version: ${version}`);
      if (version.length > MAX_LENGTH)
        throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
      debug("SemVer", version, options), this.options = options, this.loose = !!options.loose, this.includePrerelease = !!options.includePrerelease;
      let m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
      if (!m)
        throw new TypeError(`Invalid Version: ${version}`);
      if (this.raw = version, this.major = +m[1], this.minor = +m[2], this.patch = +m[3], this.major > MAX_SAFE_INTEGER3 || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > MAX_SAFE_INTEGER3 || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > MAX_SAFE_INTEGER3 || this.patch < 0)
        throw new TypeError("Invalid patch version");
      m[4] ? this.prerelease = m[4].split(".").map((id) => {
        if (/^[0-9]+$/.test(id)) {
          let num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER3)
            return num;
        }
        return id;
      }) : this.prerelease = [], this.build = m[5] ? m[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      if (debug("SemVer.compare", this.version, this.options, other), !(other instanceof SemVer)) {
        if (typeof other == "string" && other === this.version)
          return 0;
        other = new SemVer(other, this.options);
      }
      return other.version === this.version ? 0 : this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      return other instanceof SemVer || (other = new SemVer(other, this.options)), compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
      if (other instanceof SemVer || (other = new SemVer(other, this.options)), this.prerelease.length && !other.prerelease.length)
        return -1;
      if (!this.prerelease.length && other.prerelease.length)
        return 1;
      if (!this.prerelease.length && !other.prerelease.length)
        return 0;
      let i = 0;
      do {
        let a = this.prerelease[i], b = other.prerelease[i];
        if (debug("prerelease compare", i, a, b), a === void 0 && b === void 0)
          return 0;
        if (b === void 0)
          return 1;
        if (a === void 0)
          return -1;
        if (a === b)
          continue;
        return compareIdentifiers(a, b);
      } while (++i);
    }
    compareBuild(other) {
      other instanceof SemVer || (other = new SemVer(other, this.options));
      let i = 0;
      do {
        let a = this.build[i], b = other.build[i];
        if (debug("prerelease compare", i, a, b), a === void 0 && b === void 0)
          return 0;
        if (b === void 0)
          return 1;
        if (a === void 0)
          return -1;
        if (a === b)
          continue;
        return compareIdentifiers(a, b);
      } while (++i);
    }
    inc(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", identifier), this.inc("pre", identifier);
          break;
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", identifier), this.inc("pre", identifier);
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        case "pre":
          if (this.prerelease.length === 0)
            this.prerelease = [0];
          else {
            let i = this.prerelease.length;
            for (; --i >= 0; )
              typeof this.prerelease[i] == "number" && (this.prerelease[i]++, i = -2);
            i === -1 && this.prerelease.push(0);
          }
          identifier && (this.prerelease[0] === identifier ? isNaN(this.prerelease[1]) && (this.prerelease = [identifier, 0]) : this.prerelease = [identifier, 0]);
          break;
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      return this.format(), this.raw = this.version, this;
    }
  };
  module.exports = SemVer;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/parse.js
var require_parse = __commonJS((exports, module) => {
  var {MAX_LENGTH} = require_constants(), {re, t} = require_re(), SemVer = require_semver(), parseOptions = require_parse_options(), parse = (version, options) => {
    if (options = parseOptions(options), version instanceof SemVer)
      return version;
    if (typeof version != "string" || version.length > MAX_LENGTH || !(options.loose ? re[t.LOOSE] : re[t.FULL]).test(version))
      return null;
    try {
      return new SemVer(version, options);
    } catch (er) {
      return null;
    }
  };
  module.exports = parse;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/valid.js
var require_valid = __commonJS((exports, module) => {
  var parse = require_parse(), valid = (version, options) => {
    let v = parse(version, options);
    return v ? v.version : null;
  };
  module.exports = valid;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/clean.js
var require_clean = __commonJS((exports, module) => {
  var parse = require_parse(), clean2 = (version, options) => {
    let s = parse(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  };
  module.exports = clean2;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/inc.js
var require_inc = __commonJS((exports, module) => {
  var SemVer = require_semver(), inc = (version, release, options, identifier) => {
    typeof options == "string" && (identifier = options, options = void 0);
    try {
      return new SemVer(version, options).inc(release, identifier).version;
    } catch (er) {
      return null;
    }
  };
  module.exports = inc;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/compare.js
var require_compare = __commonJS((exports, module) => {
  var SemVer = require_semver(), compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
  module.exports = compare;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/eq.js
var require_eq = __commonJS((exports, module) => {
  var compare = require_compare(), eq2 = (a, b, loose) => compare(a, b, loose) === 0;
  module.exports = eq2;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/diff.js
var require_diff = __commonJS((exports, module) => {
  var parse = require_parse(), eq2 = require_eq(), diff = (version1, version2) => {
    if (eq2(version1, version2))
      return null;
    {
      let v1 = parse(version1), v2 = parse(version2), hasPre = v1.prerelease.length || v2.prerelease.length, prefix = hasPre ? "pre" : "", defaultResult = hasPre ? "prerelease" : "";
      for (let key in v1)
        if ((key === "major" || key === "minor" || key === "patch") && v1[key] !== v2[key])
          return prefix + key;
      return defaultResult;
    }
  };
  module.exports = diff;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/major.js
var require_major = __commonJS((exports, module) => {
  var SemVer = require_semver(), major = (a, loose) => new SemVer(a, loose).major;
  module.exports = major;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/minor.js
var require_minor = __commonJS((exports, module) => {
  var SemVer = require_semver(), minor = (a, loose) => new SemVer(a, loose).minor;
  module.exports = minor;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/patch.js
var require_patch = __commonJS((exports, module) => {
  var SemVer = require_semver(), patch = (a, loose) => new SemVer(a, loose).patch;
  module.exports = patch;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS((exports, module) => {
  var parse = require_parse(), prerelease = (version, options) => {
    let parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  };
  module.exports = prerelease;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS((exports, module) => {
  var compare = require_compare(), rcompare = (a, b, loose) => compare(b, a, loose);
  module.exports = rcompare;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS((exports, module) => {
  var compare = require_compare(), compareLoose = (a, b) => compare(a, b, !0);
  module.exports = compareLoose;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS((exports, module) => {
  var SemVer = require_semver(), compareBuild = (a, b, loose) => {
    let versionA = new SemVer(a, loose), versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
  };
  module.exports = compareBuild;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/sort.js
var require_sort = __commonJS((exports, module) => {
  var compareBuild = require_compare_build(), sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
  module.exports = sort;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/rsort.js
var require_rsort = __commonJS((exports, module) => {
  var compareBuild = require_compare_build(), rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
  module.exports = rsort;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/gt.js
var require_gt = __commonJS((exports, module) => {
  var compare = require_compare(), gt = (a, b, loose) => compare(a, b, loose) > 0;
  module.exports = gt;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/lt.js
var require_lt = __commonJS((exports, module) => {
  var compare = require_compare(), lt = (a, b, loose) => compare(a, b, loose) < 0;
  module.exports = lt;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/neq.js
var require_neq = __commonJS((exports, module) => {
  var compare = require_compare(), neq = (a, b, loose) => compare(a, b, loose) !== 0;
  module.exports = neq;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/gte.js
var require_gte = __commonJS((exports, module) => {
  var compare = require_compare(), gte = (a, b, loose) => compare(a, b, loose) >= 0;
  module.exports = gte;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/lte.js
var require_lte = __commonJS((exports, module) => {
  var compare = require_compare(), lte = (a, b, loose) => compare(a, b, loose) <= 0;
  module.exports = lte;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/cmp.js
var require_cmp = __commonJS((exports, module) => {
  var eq2 = require_eq(), neq = require_neq(), gt = require_gt(), gte = require_gte(), lt = require_lt(), lte = require_lte(), cmp = (a, op, b, loose) => {
    switch (op) {
      case "===":
        return typeof a == "object" && (a = a.version), typeof b == "object" && (b = b.version), a === b;
      case "!==":
        return typeof a == "object" && (a = a.version), typeof b == "object" && (b = b.version), a !== b;
      case "":
      case "=":
      case "==":
        return eq2(a, b, loose);
      case "!=":
        return neq(a, b, loose);
      case ">":
        return gt(a, b, loose);
      case ">=":
        return gte(a, b, loose);
      case "<":
        return lt(a, b, loose);
      case "<=":
        return lte(a, b, loose);
      default:
        throw new TypeError(`Invalid operator: ${op}`);
    }
  };
  module.exports = cmp;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/coerce.js
var require_coerce = __commonJS((exports, module) => {
  var SemVer = require_semver(), parse = require_parse(), {re, t} = require_re(), coerce = (version, options) => {
    if (version instanceof SemVer)
      return version;
    if (typeof version == "number" && (version = String(version)), typeof version != "string")
      return null;
    options = options || {};
    let match = null;
    if (!options.rtl)
      match = version.match(re[t.COERCE]);
    else {
      let next;
      for (; (next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length); )
        (!match || next.index + next[0].length !== match.index + match[0].length) && (match = next), re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
      re[t.COERCERTL].lastIndex = -1;
    }
    return match === null ? null : parse(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
  };
  module.exports = coerce;
});

// node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/iterator.js
var require_iterator = __commonJS((exports, module) => {
  "use strict";
  module.exports = function(Yallist) {
    Yallist.prototype[Symbol.iterator] = function* () {
      for (let walker = this.head; walker; walker = walker.next)
        yield walker.value;
    };
  };
});

// node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/yallist.js
var require_yallist = __commonJS((exports, module) => {
  "use strict";
  module.exports = Yallist;
  Yallist.Node = Node;
  Yallist.create = Yallist;
  function Yallist(list) {
    var self2 = this;
    if (self2 instanceof Yallist || (self2 = new Yallist()), self2.tail = null, self2.head = null, self2.length = 0, list && typeof list.forEach == "function")
      list.forEach(function(item) {
        self2.push(item);
      });
    else if (arguments.length > 0)
      for (var i = 0, l = arguments.length; i < l; i++)
        self2.push(arguments[i]);
    return self2;
  }
  Yallist.prototype.removeNode = function(node) {
    if (node.list !== this)
      throw new Error("removing node which does not belong to this list");
    var next = node.next, prev = node.prev;
    return next && (next.prev = prev), prev && (prev.next = next), node === this.head && (this.head = next), node === this.tail && (this.tail = prev), node.list.length--, node.next = null, node.prev = null, node.list = null, next;
  };
  Yallist.prototype.unshiftNode = function(node) {
    if (node !== this.head) {
      node.list && node.list.removeNode(node);
      var head = this.head;
      node.list = this, node.next = head, head && (head.prev = node), this.head = node, this.tail || (this.tail = node), this.length++;
    }
  };
  Yallist.prototype.pushNode = function(node) {
    if (node !== this.tail) {
      node.list && node.list.removeNode(node);
      var tail = this.tail;
      node.list = this, node.prev = tail, tail && (tail.next = node), this.tail = node, this.head || (this.head = node), this.length++;
    }
  };
  Yallist.prototype.push = function() {
    for (var i = 0, l = arguments.length; i < l; i++)
      push(this, arguments[i]);
    return this.length;
  };
  Yallist.prototype.unshift = function() {
    for (var i = 0, l = arguments.length; i < l; i++)
      unshift(this, arguments[i]);
    return this.length;
  };
  Yallist.prototype.pop = function() {
    if (!!this.tail) {
      var res = this.tail.value;
      return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, this.length--, res;
    }
  };
  Yallist.prototype.shift = function() {
    if (!!this.head) {
      var res = this.head.value;
      return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, this.length--, res;
    }
  };
  Yallist.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.head, i = 0; walker !== null; i++)
      fn.call(thisp, walker.value, i, this), walker = walker.next;
  };
  Yallist.prototype.forEachReverse = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.tail, i = this.length - 1; walker !== null; i--)
      fn.call(thisp, walker.value, i, this), walker = walker.prev;
  };
  Yallist.prototype.get = function(n) {
    for (var i = 0, walker = this.head; walker !== null && i < n; i++)
      walker = walker.next;
    if (i === n && walker !== null)
      return walker.value;
  };
  Yallist.prototype.getReverse = function(n) {
    for (var i = 0, walker = this.tail; walker !== null && i < n; i++)
      walker = walker.prev;
    if (i === n && walker !== null)
      return walker.value;
  };
  Yallist.prototype.map = function(fn, thisp) {
    thisp = thisp || this;
    for (var res = new Yallist(), walker = this.head; walker !== null; )
      res.push(fn.call(thisp, walker.value, this)), walker = walker.next;
    return res;
  };
  Yallist.prototype.mapReverse = function(fn, thisp) {
    thisp = thisp || this;
    for (var res = new Yallist(), walker = this.tail; walker !== null; )
      res.push(fn.call(thisp, walker.value, this)), walker = walker.prev;
    return res;
  };
  Yallist.prototype.reduce = function(fn, initial) {
    var acc, walker = this.head;
    if (arguments.length > 1)
      acc = initial;
    else if (this.head)
      walker = this.head.next, acc = this.head.value;
    else
      throw new TypeError("Reduce of empty list with no initial value");
    for (var i = 0; walker !== null; i++)
      acc = fn(acc, walker.value, i), walker = walker.next;
    return acc;
  };
  Yallist.prototype.reduceReverse = function(fn, initial) {
    var acc, walker = this.tail;
    if (arguments.length > 1)
      acc = initial;
    else if (this.tail)
      walker = this.tail.prev, acc = this.tail.value;
    else
      throw new TypeError("Reduce of empty list with no initial value");
    for (var i = this.length - 1; walker !== null; i--)
      acc = fn(acc, walker.value, i), walker = walker.prev;
    return acc;
  };
  Yallist.prototype.toArray = function() {
    for (var arr = new Array(this.length), i = 0, walker = this.head; walker !== null; i++)
      arr[i] = walker.value, walker = walker.next;
    return arr;
  };
  Yallist.prototype.toArrayReverse = function() {
    for (var arr = new Array(this.length), i = 0, walker = this.tail; walker !== null; i++)
      arr[i] = walker.value, walker = walker.prev;
    return arr;
  };
  Yallist.prototype.slice = function(from, to) {
    to = to || this.length, to < 0 && (to += this.length), from = from || 0, from < 0 && (from += this.length);
    var ret = new Yallist();
    if (to < from || to < 0)
      return ret;
    from < 0 && (from = 0), to > this.length && (to = this.length);
    for (var i = 0, walker = this.head; walker !== null && i < from; i++)
      walker = walker.next;
    for (; walker !== null && i < to; i++, walker = walker.next)
      ret.push(walker.value);
    return ret;
  };
  Yallist.prototype.sliceReverse = function(from, to) {
    to = to || this.length, to < 0 && (to += this.length), from = from || 0, from < 0 && (from += this.length);
    var ret = new Yallist();
    if (to < from || to < 0)
      return ret;
    from < 0 && (from = 0), to > this.length && (to = this.length);
    for (var i = this.length, walker = this.tail; walker !== null && i > to; i--)
      walker = walker.prev;
    for (; walker !== null && i > from; i--, walker = walker.prev)
      ret.push(walker.value);
    return ret;
  };
  Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
    start > this.length && (start = this.length - 1), start < 0 && (start = this.length + start);
    for (var i = 0, walker = this.head; walker !== null && i < start; i++)
      walker = walker.next;
    for (var ret = [], i = 0; walker && i < deleteCount; i++)
      ret.push(walker.value), walker = this.removeNode(walker);
    walker === null && (walker = this.tail), walker !== this.head && walker !== this.tail && (walker = walker.prev);
    for (var i = 0; i < nodes.length; i++)
      walker = insert(this, walker, nodes[i]);
    return ret;
  };
  Yallist.prototype.reverse = function() {
    for (var head = this.head, tail = this.tail, walker = head; walker !== null; walker = walker.prev) {
      var p = walker.prev;
      walker.prev = walker.next, walker.next = p;
    }
    return this.head = tail, this.tail = head, this;
  };
  function insert(self2, node, value) {
    var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2);
    return inserted.next === null && (self2.tail = inserted), inserted.prev === null && (self2.head = inserted), self2.length++, inserted;
  }
  function push(self2, item) {
    self2.tail = new Node(item, self2.tail, null, self2), self2.head || (self2.head = self2.tail), self2.length++;
  }
  function unshift(self2, item) {
    self2.head = new Node(item, null, self2.head, self2), self2.tail || (self2.tail = self2.head), self2.length++;
  }
  function Node(value, prev, next, list) {
    if (!(this instanceof Node))
      return new Node(value, prev, next, list);
    this.list = list, this.value = value, prev ? (prev.next = this, this.prev = prev) : this.prev = null, next ? (next.prev = this, this.next = next) : this.next = null;
  }
  try {
    require_iterator()(Yallist);
  } catch (er) {
  }
});

// node_modules/.pnpm/lru-cache@6.0.0/node_modules/lru-cache/index.js
var require_lru_cache = __commonJS((exports, module) => {
  "use strict";
  var Yallist = require_yallist(), MAX = Symbol("max"), LENGTH = Symbol("length"), LENGTH_CALCULATOR = Symbol("lengthCalculator"), ALLOW_STALE = Symbol("allowStale"), MAX_AGE = Symbol("maxAge"), DISPOSE = Symbol("dispose"), NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet"), LRU_LIST = Symbol("lruList"), CACHE = Symbol("cache"), UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet"), naiveLength = () => 1, LRUCache = class {
    constructor(options) {
      if (typeof options == "number" && (options = {max: options}), options || (options = {}), options.max && (typeof options.max != "number" || options.max < 0))
        throw new TypeError("max must be a non-negative number");
      let max = this[MAX] = options.max || Infinity, lc = options.length || naiveLength;
      if (this[LENGTH_CALCULATOR] = typeof lc != "function" ? naiveLength : lc, this[ALLOW_STALE] = options.stale || !1, options.maxAge && typeof options.maxAge != "number")
        throw new TypeError("maxAge must be a number");
      this[MAX_AGE] = options.maxAge || 0, this[DISPOSE] = options.dispose, this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || !1, this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || !1, this.reset();
    }
    set max(mL) {
      if (typeof mL != "number" || mL < 0)
        throw new TypeError("max must be a non-negative number");
      this[MAX] = mL || Infinity, trim(this);
    }
    get max() {
      return this[MAX];
    }
    set allowStale(allowStale) {
      this[ALLOW_STALE] = !!allowStale;
    }
    get allowStale() {
      return this[ALLOW_STALE];
    }
    set maxAge(mA) {
      if (typeof mA != "number")
        throw new TypeError("maxAge must be a non-negative number");
      this[MAX_AGE] = mA, trim(this);
    }
    get maxAge() {
      return this[MAX_AGE];
    }
    set lengthCalculator(lC) {
      typeof lC != "function" && (lC = naiveLength), lC !== this[LENGTH_CALCULATOR] && (this[LENGTH_CALCULATOR] = lC, this[LENGTH] = 0, this[LRU_LIST].forEach((hit) => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key), this[LENGTH] += hit.length;
      })), trim(this);
    }
    get lengthCalculator() {
      return this[LENGTH_CALCULATOR];
    }
    get length() {
      return this[LENGTH];
    }
    get itemCount() {
      return this[LRU_LIST].length;
    }
    rforEach(fn, thisp) {
      thisp = thisp || this;
      for (let walker = this[LRU_LIST].tail; walker !== null; ) {
        let prev = walker.prev;
        forEachStep(this, fn, walker, thisp), walker = prev;
      }
    }
    forEach(fn, thisp) {
      thisp = thisp || this;
      for (let walker = this[LRU_LIST].head; walker !== null; ) {
        let next = walker.next;
        forEachStep(this, fn, walker, thisp), walker = next;
      }
    }
    keys() {
      return this[LRU_LIST].toArray().map((k) => k.key);
    }
    values() {
      return this[LRU_LIST].toArray().map((k) => k.value);
    }
    reset() {
      this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length && this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value)), this[CACHE] = new Map(), this[LRU_LIST] = new Yallist(), this[LENGTH] = 0;
    }
    dump() {
      return this[LRU_LIST].map((hit) => isStale(this, hit) ? !1 : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter((h) => h);
    }
    dumpLru() {
      return this[LRU_LIST];
    }
    set(key, value, maxAge) {
      if (maxAge = maxAge || this[MAX_AGE], maxAge && typeof maxAge != "number")
        throw new TypeError("maxAge must be a number");
      let now = maxAge ? Date.now() : 0, len = this[LENGTH_CALCULATOR](value, key);
      if (this[CACHE].has(key)) {
        if (len > this[MAX])
          return del(this, this[CACHE].get(key)), !1;
        let item = this[CACHE].get(key).value;
        return this[DISPOSE] && (this[NO_DISPOSE_ON_SET] || this[DISPOSE](key, item.value)), item.now = now, item.maxAge = maxAge, item.value = value, this[LENGTH] += len - item.length, item.length = len, this.get(key), trim(this), !0;
      }
      let hit = new Entry(key, value, len, now, maxAge);
      return hit.length > this[MAX] ? (this[DISPOSE] && this[DISPOSE](key, value), !1) : (this[LENGTH] += hit.length, this[LRU_LIST].unshift(hit), this[CACHE].set(key, this[LRU_LIST].head), trim(this), !0);
    }
    has(key) {
      if (!this[CACHE].has(key))
        return !1;
      let hit = this[CACHE].get(key).value;
      return !isStale(this, hit);
    }
    get(key) {
      return get(this, key, !0);
    }
    peek(key) {
      return get(this, key, !1);
    }
    pop() {
      let node = this[LRU_LIST].tail;
      return node ? (del(this, node), node.value) : null;
    }
    del(key) {
      del(this, this[CACHE].get(key));
    }
    load(arr) {
      this.reset();
      let now = Date.now();
      for (let l = arr.length - 1; l >= 0; l--) {
        let hit = arr[l], expiresAt = hit.e || 0;
        if (expiresAt === 0)
          this.set(hit.k, hit.v);
        else {
          let maxAge = expiresAt - now;
          maxAge > 0 && this.set(hit.k, hit.v, maxAge);
        }
      }
    }
    prune() {
      this[CACHE].forEach((value, key) => get(this, key, !1));
    }
  }, get = (self2, key, doUse) => {
    let node = self2[CACHE].get(key);
    if (node) {
      let hit = node.value;
      if (isStale(self2, hit)) {
        if (del(self2, node), !self2[ALLOW_STALE])
          return;
      } else
        doUse && (self2[UPDATE_AGE_ON_GET] && (node.value.now = Date.now()), self2[LRU_LIST].unshiftNode(node));
      return hit.value;
    }
  }, isStale = (self2, hit) => {
    if (!hit || !hit.maxAge && !self2[MAX_AGE])
      return !1;
    let diff = Date.now() - hit.now;
    return hit.maxAge ? diff > hit.maxAge : self2[MAX_AGE] && diff > self2[MAX_AGE];
  }, trim = (self2) => {
    if (self2[LENGTH] > self2[MAX])
      for (let walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
        let prev = walker.prev;
        del(self2, walker), walker = prev;
      }
  }, del = (self2, node) => {
    if (node) {
      let hit = node.value;
      self2[DISPOSE] && self2[DISPOSE](hit.key, hit.value), self2[LENGTH] -= hit.length, self2[CACHE].delete(hit.key), self2[LRU_LIST].removeNode(node);
    }
  }, Entry = class {
    constructor(key, value, length, now, maxAge) {
      this.key = key, this.value = value, this.length = length, this.now = now, this.maxAge = maxAge || 0;
    }
  }, forEachStep = (self2, fn, node, thisp) => {
    let hit = node.value;
    isStale(self2, hit) && (del(self2, node), self2[ALLOW_STALE] || (hit = void 0)), hit && fn.call(thisp, hit.value, hit.key, self2);
  };
  module.exports = LRUCache;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/classes/range.js
var require_range = __commonJS((exports, module) => {
  var Range = class {
    constructor(range, options) {
      if (options = parseOptions(options), range instanceof Range)
        return range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease ? range : new Range(range.raw, options);
      if (range instanceof Comparator)
        return this.raw = range.value, this.set = [[range]], this.format(), this;
      if (this.options = options, this.loose = !!options.loose, this.includePrerelease = !!options.includePrerelease, this.raw = range, this.set = range.split(/\s*\|\|\s*/).map((range2) => this.parseRange(range2.trim())).filter((c) => c.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${range}`);
      if (this.set.length > 1) {
        let first = this.set[0];
        if (this.set = this.set.filter((c) => !isNullSet(c[0])), this.set.length === 0)
          this.set = [first];
        else if (this.set.length > 1) {
          for (let c of this.set)
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
        }
      }
      this.format();
    }
    format() {
      return this.range = this.set.map((comps) => comps.join(" ").trim()).join("||").trim(), this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range) {
      range = range.trim();
      let memoKey = `parseRange:${Object.keys(this.options).join(",")}:${range}`, cached = cache.get(memoKey);
      if (cached)
        return cached;
      let loose = this.options.loose, hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
      range = range.replace(hr, hyphenReplace(this.options.includePrerelease)), debug("hyphen replace", range), range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace), debug("comparator trim", range, re[t.COMPARATORTRIM]), range = range.replace(re[t.TILDETRIM], tildeTrimReplace), range = range.replace(re[t.CARETTRIM], caretTrimReplace), range = range.split(/\s+/).join(" ");
      let compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR], rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options)).filter(this.options.loose ? (comp) => !!comp.match(compRe) : () => !0).map((comp) => new Comparator(comp, this.options)), l = rangeList.length, rangeMap = new Map();
      for (let comp of rangeList) {
        if (isNullSet(comp))
          return [comp];
        rangeMap.set(comp.value, comp);
      }
      rangeMap.size > 1 && rangeMap.has("") && rangeMap.delete("");
      let result = [...rangeMap.values()];
      return cache.set(memoKey, result), result;
    }
    intersects(range, options) {
      if (!(range instanceof Range))
        throw new TypeError("a Range is required");
      return this.set.some((thisComparators) => isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => rangeComparators.every((rangeComparator) => thisComparator.intersects(rangeComparator, options)))));
    }
    test(version) {
      if (!version)
        return !1;
      if (typeof version == "string")
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return !1;
        }
      for (let i = 0; i < this.set.length; i++)
        if (testSet(this.set[i], version, this.options))
          return !0;
      return !1;
    }
  };
  module.exports = Range;
  var LRU = require_lru_cache(), cache = new LRU({max: 1e3}), parseOptions = require_parse_options(), Comparator = require_comparator(), debug = require_debug(), SemVer = require_semver(), {
    re,
    t,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = require_re(), isNullSet = (c) => c.value === "<0.0.0-0", isAny = (c) => c.value === "", isSatisfiable = (comparators, options) => {
    let result = !0, remainingComparators = comparators.slice(), testComparator = remainingComparators.pop();
    for (; result && remainingComparators.length; )
      result = remainingComparators.every((otherComparator) => testComparator.intersects(otherComparator, options)), testComparator = remainingComparators.pop();
    return result;
  }, parseComparator = (comp, options) => (debug("comp", comp, options), comp = replaceCarets(comp, options), debug("caret", comp), comp = replaceTildes(comp, options), debug("tildes", comp), comp = replaceXRanges(comp, options), debug("xrange", comp), comp = replaceStars(comp, options), debug("stars", comp), comp), isX = (id) => !id || id.toLowerCase() === "x" || id === "*", replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((comp2) => replaceTilde(comp2, options)).join(" "), replaceTilde = (comp, options) => {
    let r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug("tilde", comp, _, M, m, p, pr);
      let ret;
      return isX(M) ? ret = "" : isX(m) ? ret = `>=${M}.0.0 <${+M + 1}.0.0-0` : isX(p) ? ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0` : pr ? (debug("replaceTilde pr", pr), ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`) : ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`, debug("tilde return", ret), ret;
    });
  }, replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((comp2) => replaceCaret(comp2, options)).join(" "), replaceCaret = (comp, options) => {
    debug("caret", comp, options);
    let r = options.loose ? re[t.CARETLOOSE] : re[t.CARET], z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr) => {
      debug("caret", comp, _, M, m, p, pr);
      let ret;
      return isX(M) ? ret = "" : isX(m) ? ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0` : isX(p) ? M === "0" ? ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0` : ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0` : pr ? (debug("replaceCaret pr", pr), M === "0" ? m === "0" ? ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0` : ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0` : ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`) : (debug("no pr"), M === "0" ? m === "0" ? ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0` : ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0` : ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`), debug("caret return", ret), ret;
    });
  }, replaceXRanges = (comp, options) => (debug("replaceXRanges", comp, options), comp.split(/\s+/).map((comp2) => replaceXRange(comp2, options)).join(" ")), replaceXRange = (comp, options) => {
    comp = comp.trim();
    let r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug("xRange", comp, ret, gtlt, M, m, p, pr);
      let xM = isX(M), xm = xM || isX(m), xp = xm || isX(p), anyX = xp;
      return gtlt === "=" && anyX && (gtlt = ""), pr = options.includePrerelease ? "-0" : "", xM ? gtlt === ">" || gtlt === "<" ? ret = "<0.0.0-0" : ret = "*" : gtlt && anyX ? (xm && (m = 0), p = 0, gtlt === ">" ? (gtlt = ">=", xm ? (M = +M + 1, m = 0, p = 0) : (m = +m + 1, p = 0)) : gtlt === "<=" && (gtlt = "<", xm ? M = +M + 1 : m = +m + 1), gtlt === "<" && (pr = "-0"), ret = `${gtlt + M}.${m}.${p}${pr}`) : xm ? ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0` : xp && (ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`), debug("xRange return", ret), ret;
    });
  }, replaceStars = (comp, options) => (debug("replaceStars", comp, options), comp.trim().replace(re[t.STAR], "")), replaceGTE0 = (comp, options) => (debug("replaceGTE0", comp, options), comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "")), hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => (isX(fM) ? from = "" : isX(fm) ? from = `>=${fM}.0.0${incPr ? "-0" : ""}` : isX(fp) ? from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}` : fpr ? from = `>=${from}` : from = `>=${from}${incPr ? "-0" : ""}`, isX(tM) ? to = "" : isX(tm) ? to = `<${+tM + 1}.0.0-0` : isX(tp) ? to = `<${tM}.${+tm + 1}.0-0` : tpr ? to = `<=${tM}.${tm}.${tp}-${tpr}` : incPr ? to = `<${tM}.${tm}.${+tp + 1}-0` : to = `<=${to}`, `${from} ${to}`.trim()), testSet = (set, version, options) => {
    for (let i = 0; i < set.length; i++)
      if (!set[i].test(version))
        return !1;
    if (version.prerelease.length && !options.includePrerelease) {
      for (let i = 0; i < set.length; i++)
        if (debug(set[i].semver), set[i].semver !== Comparator.ANY && set[i].semver.prerelease.length > 0) {
          let allowed = set[i].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/classes/comparator.js
var require_comparator = __commonJS((exports, module) => {
  var ANY = Symbol("SemVer ANY"), Comparator = class {
    static get ANY() {
      return ANY;
    }
    constructor(comp, options) {
      if (options = parseOptions(options), comp instanceof Comparator) {
        if (comp.loose === !!options.loose)
          return comp;
        comp = comp.value;
      }
      debug("comparator", comp, options), this.options = options, this.loose = !!options.loose, this.parse(comp), this.semver === ANY ? this.value = "" : this.value = this.operator + this.semver.version, debug("comp", this);
    }
    parse(comp) {
      let r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR], m = comp.match(r);
      if (!m)
        throw new TypeError(`Invalid comparator: ${comp}`);
      this.operator = m[1] !== void 0 ? m[1] : "", this.operator === "=" && (this.operator = ""), m[2] ? this.semver = new SemVer(m[2], this.options.loose) : this.semver = ANY;
    }
    toString() {
      return this.value;
    }
    test(version) {
      if (debug("Comparator.test", version, this.options.loose), this.semver === ANY || version === ANY)
        return !0;
      if (typeof version == "string")
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return !1;
        }
      return cmp(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator))
        throw new TypeError("a Comparator is required");
      if ((!options || typeof options != "object") && (options = {
        loose: !!options,
        includePrerelease: !1
      }), this.operator === "")
        return this.value === "" ? !0 : new Range(comp.value, options).test(this.value);
      if (comp.operator === "")
        return comp.value === "" ? !0 : new Range(this.value, options).test(comp.semver);
      let sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">"), sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<"), sameSemVer = this.semver.version === comp.semver.version, differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<="), oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"), oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    }
  };
  module.exports = Comparator;
  var parseOptions = require_parse_options(), {re, t} = require_re(), cmp = require_cmp(), debug = require_debug(), SemVer = require_semver(), Range = require_range();
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS((exports, module) => {
  var Range = require_range(), satisfies = (version, range, options) => {
    try {
      range = new Range(range, options);
    } catch (er) {
      return !1;
    }
    return range.test(version);
  };
  module.exports = satisfies;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS((exports, module) => {
  var Range = require_range(), toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
  module.exports = toComparators;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS((exports, module) => {
  var SemVer = require_semver(), Range = require_range(), maxSatisfying = (versions, range, options) => {
    let max = null, maxSV = null, rangeObj = null;
    try {
      rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    return versions.forEach((v) => {
      rangeObj.test(v) && (!max || maxSV.compare(v) === -1) && (max = v, maxSV = new SemVer(max, options));
    }), max;
  };
  module.exports = maxSatisfying;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS((exports, module) => {
  var SemVer = require_semver(), Range = require_range(), minSatisfying = (versions, range, options) => {
    let min = null, minSV = null, rangeObj = null;
    try {
      rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    return versions.forEach((v) => {
      rangeObj.test(v) && (!min || minSV.compare(v) === 1) && (min = v, minSV = new SemVer(min, options));
    }), min;
  };
  module.exports = minSatisfying;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS((exports, module) => {
  var SemVer = require_semver(), Range = require_range(), gt = require_gt(), minVersion = (range, loose) => {
    range = new Range(range, loose);
    let minver = new SemVer("0.0.0");
    if (range.test(minver) || (minver = new SemVer("0.0.0-0"), range.test(minver)))
      return minver;
    minver = null;
    for (let i = 0; i < range.set.length; ++i) {
      let comparators = range.set[i], setMin = null;
      comparators.forEach((comparator) => {
        let compver = new SemVer(comparator.semver.version);
        switch (comparator.operator) {
          case ">":
            compver.prerelease.length === 0 ? compver.patch++ : compver.prerelease.push(0), compver.raw = compver.format();
          case "":
          case ">=":
            (!setMin || gt(compver, setMin)) && (setMin = compver);
            break;
          case "<":
          case "<=":
            break;
          default:
            throw new Error(`Unexpected operation: ${comparator.operator}`);
        }
      }), setMin && (!minver || gt(minver, setMin)) && (minver = setMin);
    }
    return minver && range.test(minver) ? minver : null;
  };
  module.exports = minVersion;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS((exports, module) => {
  var Range = require_range(), validRange = (range, options) => {
    try {
      return new Range(range, options).range || "*";
    } catch (er) {
      return null;
    }
  };
  module.exports = validRange;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/outside.js
var require_outside = __commonJS((exports, module) => {
  var SemVer = require_semver(), Comparator = require_comparator(), {ANY} = Comparator, Range = require_range(), satisfies = require_satisfies(), gt = require_gt(), lt = require_lt(), lte = require_lte(), gte = require_gte(), outside = (version, range, hilo, options) => {
    version = new SemVer(version, options), range = new Range(range, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case ">":
        gtfn = gt, ltefn = lte, ltfn = lt, comp = ">", ecomp = ">=";
        break;
      case "<":
        gtfn = lt, ltefn = gte, ltfn = gt, comp = "<", ecomp = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version, range, options))
      return !1;
    for (let i = 0; i < range.set.length; ++i) {
      let comparators = range.set[i], high = null, low = null;
      if (comparators.forEach((comparator) => {
        comparator.semver === ANY && (comparator = new Comparator(">=0.0.0")), high = high || comparator, low = low || comparator, gtfn(comparator.semver, high.semver, options) ? high = comparator : ltfn(comparator.semver, low.semver, options) && (low = comparator);
      }), high.operator === comp || high.operator === ecomp || (!low.operator || low.operator === comp) && ltefn(version, low.semver))
        return !1;
      if (low.operator === ecomp && ltfn(version, low.semver))
        return !1;
    }
    return !0;
  };
  module.exports = outside;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS((exports, module) => {
  var outside = require_outside(), gtr = (version, range, options) => outside(version, range, ">", options);
  module.exports = gtr;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS((exports, module) => {
  var outside = require_outside(), ltr = (version, range, options) => outside(version, range, "<", options);
  module.exports = ltr;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS((exports, module) => {
  var Range = require_range(), intersects = (r1, r2, options) => (r1 = new Range(r1, options), r2 = new Range(r2, options), r1.intersects(r2));
  module.exports = intersects;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS((exports, module) => {
  var satisfies = require_satisfies(), compare = require_compare();
  module.exports = (versions, range, options) => {
    let set = [], min = null, prev = null, v = versions.sort((a, b) => compare(a, b, options));
    for (let version of v)
      satisfies(version, range, options) ? (prev = version, min || (min = version)) : (prev && set.push([min, prev]), prev = null, min = null);
    min && set.push([min, null]);
    let ranges = [];
    for (let [min2, max] of set)
      min2 === max ? ranges.push(min2) : !max && min2 === v[0] ? ranges.push("*") : max ? min2 === v[0] ? ranges.push(`<=${max}`) : ranges.push(`${min2} - ${max}`) : ranges.push(`>=${min2}`);
    let simplified = ranges.join(" || "), original = typeof range.raw == "string" ? range.raw : String(range);
    return simplified.length < original.length ? simplified : range;
  };
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/ranges/subset.js
var require_subset = __commonJS((exports, module) => {
  var Range = require_range(), {ANY} = require_comparator(), satisfies = require_satisfies(), compare = require_compare(), subset = (sub, dom, options) => {
    if (sub === dom)
      return !0;
    sub = new Range(sub, options), dom = new Range(dom, options);
    let sawNonNull = !1;
    OUTER:
      for (let simpleSub of sub.set) {
        for (let simpleDom of dom.set) {
          let isSub = simpleSubset(simpleSub, simpleDom, options);
          if (sawNonNull = sawNonNull || isSub !== null, isSub)
            continue OUTER;
        }
        if (sawNonNull)
          return !1;
      }
    return !0;
  }, simpleSubset = (sub, dom, options) => {
    if (sub === dom)
      return !0;
    if (sub.length === 1 && sub[0].semver === ANY)
      return dom.length === 1 && dom[0].semver === ANY;
    let eqSet = new Set(), gt, lt;
    for (let c of sub)
      c.operator === ">" || c.operator === ">=" ? gt = higherGT(gt, c, options) : c.operator === "<" || c.operator === "<=" ? lt = lowerLT(lt, c, options) : eqSet.add(c.semver);
    if (eqSet.size > 1)
      return null;
    let gtltComp;
    if (gt && lt) {
      if (gtltComp = compare(gt.semver, lt.semver, options), gtltComp > 0)
        return null;
      if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<="))
        return null;
    }
    for (let eq2 of eqSet) {
      if (gt && !satisfies(eq2, String(gt), options) || lt && !satisfies(eq2, String(lt), options))
        return null;
      for (let c of dom)
        if (!satisfies(eq2, String(c), options))
          return !1;
      return !0;
    }
    let higher, lower, hasDomLT, hasDomGT;
    for (let c of dom) {
      if (hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=", hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=", gt) {
        if (c.operator === ">" || c.operator === ">=") {
          if (higher = higherGT(gt, c, options), higher === c && higher !== gt)
            return !1;
        } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options))
          return !1;
      }
      if (lt) {
        if (c.operator === "<" || c.operator === "<=") {
          if (lower = lowerLT(lt, c, options), lower === c && lower !== lt)
            return !1;
        } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options))
          return !1;
      }
      if (!c.operator && (lt || gt) && gtltComp !== 0)
        return !1;
    }
    return !(gt && hasDomLT && !lt && gtltComp !== 0 || lt && hasDomGT && !gt && gtltComp !== 0);
  }, higherGT = (a, b, options) => {
    if (!a)
      return b;
    let comp = compare(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 || b.operator === ">" && a.operator === ">=" ? b : a;
  }, lowerLT = (a, b, options) => {
    if (!a)
      return b;
    let comp = compare(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 || b.operator === "<" && a.operator === "<=" ? b : a;
  };
  module.exports = subset;
});

// node_modules/.pnpm/semver@7.3.4/node_modules/semver/index.js
var require_semver2 = __commonJS((exports, module) => {
  var internalRe = require_re();
  module.exports = {
    re: internalRe.re,
    src: internalRe.src,
    tokens: internalRe.t,
    SEMVER_SPEC_VERSION: require_constants().SEMVER_SPEC_VERSION,
    SemVer: require_semver(),
    compareIdentifiers: require_identifiers().compareIdentifiers,
    rcompareIdentifiers: require_identifiers().rcompareIdentifiers,
    parse: require_parse(),
    valid: require_valid(),
    clean: require_clean(),
    inc: require_inc(),
    diff: require_diff(),
    major: require_major(),
    minor: require_minor(),
    patch: require_patch(),
    prerelease: require_prerelease(),
    compare: require_compare(),
    rcompare: require_rcompare(),
    compareLoose: require_compare_loose(),
    compareBuild: require_compare_build(),
    sort: require_sort(),
    rsort: require_rsort(),
    gt: require_gt(),
    lt: require_lt(),
    eq: require_eq(),
    neq: require_neq(),
    gte: require_gte(),
    lte: require_lte(),
    cmp: require_cmp(),
    coerce: require_coerce(),
    Comparator: require_comparator(),
    Range: require_range(),
    satisfies: require_satisfies(),
    toComparators: require_to_comparators(),
    maxSatisfying: require_max_satisfying(),
    minSatisfying: require_min_satisfying(),
    minVersion: require_min_version(),
    validRange: require_valid2(),
    outside: require_outside(),
    gtr: require_gtr(),
    ltr: require_ltr(),
    intersects: require_intersects(),
    simplifyRange: require_simplify(),
    subset: require_subset()
  };
});

// node_modules/.pnpm/domelementtype@2.1.0/node_modules/domelementtype/lib/index.js
var require_lib = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = void 0;
  function isTag(elem) {
    return elem.type === "tag" || elem.type === "script" || elem.type === "style";
  }
  exports.isTag = isTag;
  exports.Root = "root";
  exports.Text = "text";
  exports.Directive = "directive";
  exports.Comment = "comment";
  exports.Script = "script";
  exports.Style = "style";
  exports.Tag = "tag";
  exports.CDATA = "cdata";
  exports.Doctype = "doctype";
});

// node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/entities.json
var require_entities = __commonJS((exports, module) => {
  module.exports = '{"Aacute":"\xC1","aacute":"\xE1","Abreve":"\u0102","abreve":"\u0103","ac":"\u223E","acd":"\u223F","acE":"\u223E\u0333","Acirc":"\xC2","acirc":"\xE2","acute":"\xB4","Acy":"\u0410","acy":"\u0430","AElig":"\xC6","aelig":"\xE6","af":"\u2061","Afr":"\u{1D504}","afr":"\u{1D51E}","Agrave":"\xC0","agrave":"\xE0","alefsym":"\u2135","aleph":"\u2135","Alpha":"\u0391","alpha":"\u03B1","Amacr":"\u0100","amacr":"\u0101","amalg":"\u2A3F","amp":"&","AMP":"&","andand":"\u2A55","And":"\u2A53","and":"\u2227","andd":"\u2A5C","andslope":"\u2A58","andv":"\u2A5A","ang":"\u2220","ange":"\u29A4","angle":"\u2220","angmsdaa":"\u29A8","angmsdab":"\u29A9","angmsdac":"\u29AA","angmsdad":"\u29AB","angmsdae":"\u29AC","angmsdaf":"\u29AD","angmsdag":"\u29AE","angmsdah":"\u29AF","angmsd":"\u2221","angrt":"\u221F","angrtvb":"\u22BE","angrtvbd":"\u299D","angsph":"\u2222","angst":"\xC5","angzarr":"\u237C","Aogon":"\u0104","aogon":"\u0105","Aopf":"\u{1D538}","aopf":"\u{1D552}","apacir":"\u2A6F","ap":"\u2248","apE":"\u2A70","ape":"\u224A","apid":"\u224B","apos":"\'","ApplyFunction":"\u2061","approx":"\u2248","approxeq":"\u224A","Aring":"\xC5","aring":"\xE5","Ascr":"\u{1D49C}","ascr":"\u{1D4B6}","Assign":"\u2254","ast":"*","asymp":"\u2248","asympeq":"\u224D","Atilde":"\xC3","atilde":"\xE3","Auml":"\xC4","auml":"\xE4","awconint":"\u2233","awint":"\u2A11","backcong":"\u224C","backepsilon":"\u03F6","backprime":"\u2035","backsim":"\u223D","backsimeq":"\u22CD","Backslash":"\u2216","Barv":"\u2AE7","barvee":"\u22BD","barwed":"\u2305","Barwed":"\u2306","barwedge":"\u2305","bbrk":"\u23B5","bbrktbrk":"\u23B6","bcong":"\u224C","Bcy":"\u0411","bcy":"\u0431","bdquo":"\u201E","becaus":"\u2235","because":"\u2235","Because":"\u2235","bemptyv":"\u29B0","bepsi":"\u03F6","bernou":"\u212C","Bernoullis":"\u212C","Beta":"\u0392","beta":"\u03B2","beth":"\u2136","between":"\u226C","Bfr":"\u{1D505}","bfr":"\u{1D51F}","bigcap":"\u22C2","bigcirc":"\u25EF","bigcup":"\u22C3","bigodot":"\u2A00","bigoplus":"\u2A01","bigotimes":"\u2A02","bigsqcup":"\u2A06","bigstar":"\u2605","bigtriangledown":"\u25BD","bigtriangleup":"\u25B3","biguplus":"\u2A04","bigvee":"\u22C1","bigwedge":"\u22C0","bkarow":"\u290D","blacklozenge":"\u29EB","blacksquare":"\u25AA","blacktriangle":"\u25B4","blacktriangledown":"\u25BE","blacktriangleleft":"\u25C2","blacktriangleright":"\u25B8","blank":"\u2423","blk12":"\u2592","blk14":"\u2591","blk34":"\u2593","block":"\u2588","bne":"=\u20E5","bnequiv":"\u2261\u20E5","bNot":"\u2AED","bnot":"\u2310","Bopf":"\u{1D539}","bopf":"\u{1D553}","bot":"\u22A5","bottom":"\u22A5","bowtie":"\u22C8","boxbox":"\u29C9","boxdl":"\u2510","boxdL":"\u2555","boxDl":"\u2556","boxDL":"\u2557","boxdr":"\u250C","boxdR":"\u2552","boxDr":"\u2553","boxDR":"\u2554","boxh":"\u2500","boxH":"\u2550","boxhd":"\u252C","boxHd":"\u2564","boxhD":"\u2565","boxHD":"\u2566","boxhu":"\u2534","boxHu":"\u2567","boxhU":"\u2568","boxHU":"\u2569","boxminus":"\u229F","boxplus":"\u229E","boxtimes":"\u22A0","boxul":"\u2518","boxuL":"\u255B","boxUl":"\u255C","boxUL":"\u255D","boxur":"\u2514","boxuR":"\u2558","boxUr":"\u2559","boxUR":"\u255A","boxv":"\u2502","boxV":"\u2551","boxvh":"\u253C","boxvH":"\u256A","boxVh":"\u256B","boxVH":"\u256C","boxvl":"\u2524","boxvL":"\u2561","boxVl":"\u2562","boxVL":"\u2563","boxvr":"\u251C","boxvR":"\u255E","boxVr":"\u255F","boxVR":"\u2560","bprime":"\u2035","breve":"\u02D8","Breve":"\u02D8","brvbar":"\xA6","bscr":"\u{1D4B7}","Bscr":"\u212C","bsemi":"\u204F","bsim":"\u223D","bsime":"\u22CD","bsolb":"\u29C5","bsol":"\\\\","bsolhsub":"\u27C8","bull":"\u2022","bullet":"\u2022","bump":"\u224E","bumpE":"\u2AAE","bumpe":"\u224F","Bumpeq":"\u224E","bumpeq":"\u224F","Cacute":"\u0106","cacute":"\u0107","capand":"\u2A44","capbrcup":"\u2A49","capcap":"\u2A4B","cap":"\u2229","Cap":"\u22D2","capcup":"\u2A47","capdot":"\u2A40","CapitalDifferentialD":"\u2145","caps":"\u2229\uFE00","caret":"\u2041","caron":"\u02C7","Cayleys":"\u212D","ccaps":"\u2A4D","Ccaron":"\u010C","ccaron":"\u010D","Ccedil":"\xC7","ccedil":"\xE7","Ccirc":"\u0108","ccirc":"\u0109","Cconint":"\u2230","ccups":"\u2A4C","ccupssm":"\u2A50","Cdot":"\u010A","cdot":"\u010B","cedil":"\xB8","Cedilla":"\xB8","cemptyv":"\u29B2","cent":"\xA2","centerdot":"\xB7","CenterDot":"\xB7","cfr":"\u{1D520}","Cfr":"\u212D","CHcy":"\u0427","chcy":"\u0447","check":"\u2713","checkmark":"\u2713","Chi":"\u03A7","chi":"\u03C7","circ":"\u02C6","circeq":"\u2257","circlearrowleft":"\u21BA","circlearrowright":"\u21BB","circledast":"\u229B","circledcirc":"\u229A","circleddash":"\u229D","CircleDot":"\u2299","circledR":"\xAE","circledS":"\u24C8","CircleMinus":"\u2296","CirclePlus":"\u2295","CircleTimes":"\u2297","cir":"\u25CB","cirE":"\u29C3","cire":"\u2257","cirfnint":"\u2A10","cirmid":"\u2AEF","cirscir":"\u29C2","ClockwiseContourIntegral":"\u2232","CloseCurlyDoubleQuote":"\u201D","CloseCurlyQuote":"\u2019","clubs":"\u2663","clubsuit":"\u2663","colon":":","Colon":"\u2237","Colone":"\u2A74","colone":"\u2254","coloneq":"\u2254","comma":",","commat":"@","comp":"\u2201","compfn":"\u2218","complement":"\u2201","complexes":"\u2102","cong":"\u2245","congdot":"\u2A6D","Congruent":"\u2261","conint":"\u222E","Conint":"\u222F","ContourIntegral":"\u222E","copf":"\u{1D554}","Copf":"\u2102","coprod":"\u2210","Coproduct":"\u2210","copy":"\xA9","COPY":"\xA9","copysr":"\u2117","CounterClockwiseContourIntegral":"\u2233","crarr":"\u21B5","cross":"\u2717","Cross":"\u2A2F","Cscr":"\u{1D49E}","cscr":"\u{1D4B8}","csub":"\u2ACF","csube":"\u2AD1","csup":"\u2AD0","csupe":"\u2AD2","ctdot":"\u22EF","cudarrl":"\u2938","cudarrr":"\u2935","cuepr":"\u22DE","cuesc":"\u22DF","cularr":"\u21B6","cularrp":"\u293D","cupbrcap":"\u2A48","cupcap":"\u2A46","CupCap":"\u224D","cup":"\u222A","Cup":"\u22D3","cupcup":"\u2A4A","cupdot":"\u228D","cupor":"\u2A45","cups":"\u222A\uFE00","curarr":"\u21B7","curarrm":"\u293C","curlyeqprec":"\u22DE","curlyeqsucc":"\u22DF","curlyvee":"\u22CE","curlywedge":"\u22CF","curren":"\xA4","curvearrowleft":"\u21B6","curvearrowright":"\u21B7","cuvee":"\u22CE","cuwed":"\u22CF","cwconint":"\u2232","cwint":"\u2231","cylcty":"\u232D","dagger":"\u2020","Dagger":"\u2021","daleth":"\u2138","darr":"\u2193","Darr":"\u21A1","dArr":"\u21D3","dash":"\u2010","Dashv":"\u2AE4","dashv":"\u22A3","dbkarow":"\u290F","dblac":"\u02DD","Dcaron":"\u010E","dcaron":"\u010F","Dcy":"\u0414","dcy":"\u0434","ddagger":"\u2021","ddarr":"\u21CA","DD":"\u2145","dd":"\u2146","DDotrahd":"\u2911","ddotseq":"\u2A77","deg":"\xB0","Del":"\u2207","Delta":"\u0394","delta":"\u03B4","demptyv":"\u29B1","dfisht":"\u297F","Dfr":"\u{1D507}","dfr":"\u{1D521}","dHar":"\u2965","dharl":"\u21C3","dharr":"\u21C2","DiacriticalAcute":"\xB4","DiacriticalDot":"\u02D9","DiacriticalDoubleAcute":"\u02DD","DiacriticalGrave":"`","DiacriticalTilde":"\u02DC","diam":"\u22C4","diamond":"\u22C4","Diamond":"\u22C4","diamondsuit":"\u2666","diams":"\u2666","die":"\xA8","DifferentialD":"\u2146","digamma":"\u03DD","disin":"\u22F2","div":"\xF7","divide":"\xF7","divideontimes":"\u22C7","divonx":"\u22C7","DJcy":"\u0402","djcy":"\u0452","dlcorn":"\u231E","dlcrop":"\u230D","dollar":"$","Dopf":"\u{1D53B}","dopf":"\u{1D555}","Dot":"\xA8","dot":"\u02D9","DotDot":"\u20DC","doteq":"\u2250","doteqdot":"\u2251","DotEqual":"\u2250","dotminus":"\u2238","dotplus":"\u2214","dotsquare":"\u22A1","doublebarwedge":"\u2306","DoubleContourIntegral":"\u222F","DoubleDot":"\xA8","DoubleDownArrow":"\u21D3","DoubleLeftArrow":"\u21D0","DoubleLeftRightArrow":"\u21D4","DoubleLeftTee":"\u2AE4","DoubleLongLeftArrow":"\u27F8","DoubleLongLeftRightArrow":"\u27FA","DoubleLongRightArrow":"\u27F9","DoubleRightArrow":"\u21D2","DoubleRightTee":"\u22A8","DoubleUpArrow":"\u21D1","DoubleUpDownArrow":"\u21D5","DoubleVerticalBar":"\u2225","DownArrowBar":"\u2913","downarrow":"\u2193","DownArrow":"\u2193","Downarrow":"\u21D3","DownArrowUpArrow":"\u21F5","DownBreve":"\u0311","downdownarrows":"\u21CA","downharpoonleft":"\u21C3","downharpoonright":"\u21C2","DownLeftRightVector":"\u2950","DownLeftTeeVector":"\u295E","DownLeftVectorBar":"\u2956","DownLeftVector":"\u21BD","DownRightTeeVector":"\u295F","DownRightVectorBar":"\u2957","DownRightVector":"\u21C1","DownTeeArrow":"\u21A7","DownTee":"\u22A4","drbkarow":"\u2910","drcorn":"\u231F","drcrop":"\u230C","Dscr":"\u{1D49F}","dscr":"\u{1D4B9}","DScy":"\u0405","dscy":"\u0455","dsol":"\u29F6","Dstrok":"\u0110","dstrok":"\u0111","dtdot":"\u22F1","dtri":"\u25BF","dtrif":"\u25BE","duarr":"\u21F5","duhar":"\u296F","dwangle":"\u29A6","DZcy":"\u040F","dzcy":"\u045F","dzigrarr":"\u27FF","Eacute":"\xC9","eacute":"\xE9","easter":"\u2A6E","Ecaron":"\u011A","ecaron":"\u011B","Ecirc":"\xCA","ecirc":"\xEA","ecir":"\u2256","ecolon":"\u2255","Ecy":"\u042D","ecy":"\u044D","eDDot":"\u2A77","Edot":"\u0116","edot":"\u0117","eDot":"\u2251","ee":"\u2147","efDot":"\u2252","Efr":"\u{1D508}","efr":"\u{1D522}","eg":"\u2A9A","Egrave":"\xC8","egrave":"\xE8","egs":"\u2A96","egsdot":"\u2A98","el":"\u2A99","Element":"\u2208","elinters":"\u23E7","ell":"\u2113","els":"\u2A95","elsdot":"\u2A97","Emacr":"\u0112","emacr":"\u0113","empty":"\u2205","emptyset":"\u2205","EmptySmallSquare":"\u25FB","emptyv":"\u2205","EmptyVerySmallSquare":"\u25AB","emsp13":"\u2004","emsp14":"\u2005","emsp":"\u2003","ENG":"\u014A","eng":"\u014B","ensp":"\u2002","Eogon":"\u0118","eogon":"\u0119","Eopf":"\u{1D53C}","eopf":"\u{1D556}","epar":"\u22D5","eparsl":"\u29E3","eplus":"\u2A71","epsi":"\u03B5","Epsilon":"\u0395","epsilon":"\u03B5","epsiv":"\u03F5","eqcirc":"\u2256","eqcolon":"\u2255","eqsim":"\u2242","eqslantgtr":"\u2A96","eqslantless":"\u2A95","Equal":"\u2A75","equals":"=","EqualTilde":"\u2242","equest":"\u225F","Equilibrium":"\u21CC","equiv":"\u2261","equivDD":"\u2A78","eqvparsl":"\u29E5","erarr":"\u2971","erDot":"\u2253","escr":"\u212F","Escr":"\u2130","esdot":"\u2250","Esim":"\u2A73","esim":"\u2242","Eta":"\u0397","eta":"\u03B7","ETH":"\xD0","eth":"\xF0","Euml":"\xCB","euml":"\xEB","euro":"\u20AC","excl":"!","exist":"\u2203","Exists":"\u2203","expectation":"\u2130","exponentiale":"\u2147","ExponentialE":"\u2147","fallingdotseq":"\u2252","Fcy":"\u0424","fcy":"\u0444","female":"\u2640","ffilig":"\uFB03","fflig":"\uFB00","ffllig":"\uFB04","Ffr":"\u{1D509}","ffr":"\u{1D523}","filig":"\uFB01","FilledSmallSquare":"\u25FC","FilledVerySmallSquare":"\u25AA","fjlig":"fj","flat":"\u266D","fllig":"\uFB02","fltns":"\u25B1","fnof":"\u0192","Fopf":"\u{1D53D}","fopf":"\u{1D557}","forall":"\u2200","ForAll":"\u2200","fork":"\u22D4","forkv":"\u2AD9","Fouriertrf":"\u2131","fpartint":"\u2A0D","frac12":"\xBD","frac13":"\u2153","frac14":"\xBC","frac15":"\u2155","frac16":"\u2159","frac18":"\u215B","frac23":"\u2154","frac25":"\u2156","frac34":"\xBE","frac35":"\u2157","frac38":"\u215C","frac45":"\u2158","frac56":"\u215A","frac58":"\u215D","frac78":"\u215E","frasl":"\u2044","frown":"\u2322","fscr":"\u{1D4BB}","Fscr":"\u2131","gacute":"\u01F5","Gamma":"\u0393","gamma":"\u03B3","Gammad":"\u03DC","gammad":"\u03DD","gap":"\u2A86","Gbreve":"\u011E","gbreve":"\u011F","Gcedil":"\u0122","Gcirc":"\u011C","gcirc":"\u011D","Gcy":"\u0413","gcy":"\u0433","Gdot":"\u0120","gdot":"\u0121","ge":"\u2265","gE":"\u2267","gEl":"\u2A8C","gel":"\u22DB","geq":"\u2265","geqq":"\u2267","geqslant":"\u2A7E","gescc":"\u2AA9","ges":"\u2A7E","gesdot":"\u2A80","gesdoto":"\u2A82","gesdotol":"\u2A84","gesl":"\u22DB\uFE00","gesles":"\u2A94","Gfr":"\u{1D50A}","gfr":"\u{1D524}","gg":"\u226B","Gg":"\u22D9","ggg":"\u22D9","gimel":"\u2137","GJcy":"\u0403","gjcy":"\u0453","gla":"\u2AA5","gl":"\u2277","glE":"\u2A92","glj":"\u2AA4","gnap":"\u2A8A","gnapprox":"\u2A8A","gne":"\u2A88","gnE":"\u2269","gneq":"\u2A88","gneqq":"\u2269","gnsim":"\u22E7","Gopf":"\u{1D53E}","gopf":"\u{1D558}","grave":"`","GreaterEqual":"\u2265","GreaterEqualLess":"\u22DB","GreaterFullEqual":"\u2267","GreaterGreater":"\u2AA2","GreaterLess":"\u2277","GreaterSlantEqual":"\u2A7E","GreaterTilde":"\u2273","Gscr":"\u{1D4A2}","gscr":"\u210A","gsim":"\u2273","gsime":"\u2A8E","gsiml":"\u2A90","gtcc":"\u2AA7","gtcir":"\u2A7A","gt":">","GT":">","Gt":"\u226B","gtdot":"\u22D7","gtlPar":"\u2995","gtquest":"\u2A7C","gtrapprox":"\u2A86","gtrarr":"\u2978","gtrdot":"\u22D7","gtreqless":"\u22DB","gtreqqless":"\u2A8C","gtrless":"\u2277","gtrsim":"\u2273","gvertneqq":"\u2269\uFE00","gvnE":"\u2269\uFE00","Hacek":"\u02C7","hairsp":"\u200A","half":"\xBD","hamilt":"\u210B","HARDcy":"\u042A","hardcy":"\u044A","harrcir":"\u2948","harr":"\u2194","hArr":"\u21D4","harrw":"\u21AD","Hat":"^","hbar":"\u210F","Hcirc":"\u0124","hcirc":"\u0125","hearts":"\u2665","heartsuit":"\u2665","hellip":"\u2026","hercon":"\u22B9","hfr":"\u{1D525}","Hfr":"\u210C","HilbertSpace":"\u210B","hksearow":"\u2925","hkswarow":"\u2926","hoarr":"\u21FF","homtht":"\u223B","hookleftarrow":"\u21A9","hookrightarrow":"\u21AA","hopf":"\u{1D559}","Hopf":"\u210D","horbar":"\u2015","HorizontalLine":"\u2500","hscr":"\u{1D4BD}","Hscr":"\u210B","hslash":"\u210F","Hstrok":"\u0126","hstrok":"\u0127","HumpDownHump":"\u224E","HumpEqual":"\u224F","hybull":"\u2043","hyphen":"\u2010","Iacute":"\xCD","iacute":"\xED","ic":"\u2063","Icirc":"\xCE","icirc":"\xEE","Icy":"\u0418","icy":"\u0438","Idot":"\u0130","IEcy":"\u0415","iecy":"\u0435","iexcl":"\xA1","iff":"\u21D4","ifr":"\u{1D526}","Ifr":"\u2111","Igrave":"\xCC","igrave":"\xEC","ii":"\u2148","iiiint":"\u2A0C","iiint":"\u222D","iinfin":"\u29DC","iiota":"\u2129","IJlig":"\u0132","ijlig":"\u0133","Imacr":"\u012A","imacr":"\u012B","image":"\u2111","ImaginaryI":"\u2148","imagline":"\u2110","imagpart":"\u2111","imath":"\u0131","Im":"\u2111","imof":"\u22B7","imped":"\u01B5","Implies":"\u21D2","incare":"\u2105","in":"\u2208","infin":"\u221E","infintie":"\u29DD","inodot":"\u0131","intcal":"\u22BA","int":"\u222B","Int":"\u222C","integers":"\u2124","Integral":"\u222B","intercal":"\u22BA","Intersection":"\u22C2","intlarhk":"\u2A17","intprod":"\u2A3C","InvisibleComma":"\u2063","InvisibleTimes":"\u2062","IOcy":"\u0401","iocy":"\u0451","Iogon":"\u012E","iogon":"\u012F","Iopf":"\u{1D540}","iopf":"\u{1D55A}","Iota":"\u0399","iota":"\u03B9","iprod":"\u2A3C","iquest":"\xBF","iscr":"\u{1D4BE}","Iscr":"\u2110","isin":"\u2208","isindot":"\u22F5","isinE":"\u22F9","isins":"\u22F4","isinsv":"\u22F3","isinv":"\u2208","it":"\u2062","Itilde":"\u0128","itilde":"\u0129","Iukcy":"\u0406","iukcy":"\u0456","Iuml":"\xCF","iuml":"\xEF","Jcirc":"\u0134","jcirc":"\u0135","Jcy":"\u0419","jcy":"\u0439","Jfr":"\u{1D50D}","jfr":"\u{1D527}","jmath":"\u0237","Jopf":"\u{1D541}","jopf":"\u{1D55B}","Jscr":"\u{1D4A5}","jscr":"\u{1D4BF}","Jsercy":"\u0408","jsercy":"\u0458","Jukcy":"\u0404","jukcy":"\u0454","Kappa":"\u039A","kappa":"\u03BA","kappav":"\u03F0","Kcedil":"\u0136","kcedil":"\u0137","Kcy":"\u041A","kcy":"\u043A","Kfr":"\u{1D50E}","kfr":"\u{1D528}","kgreen":"\u0138","KHcy":"\u0425","khcy":"\u0445","KJcy":"\u040C","kjcy":"\u045C","Kopf":"\u{1D542}","kopf":"\u{1D55C}","Kscr":"\u{1D4A6}","kscr":"\u{1D4C0}","lAarr":"\u21DA","Lacute":"\u0139","lacute":"\u013A","laemptyv":"\u29B4","lagran":"\u2112","Lambda":"\u039B","lambda":"\u03BB","lang":"\u27E8","Lang":"\u27EA","langd":"\u2991","langle":"\u27E8","lap":"\u2A85","Laplacetrf":"\u2112","laquo":"\xAB","larrb":"\u21E4","larrbfs":"\u291F","larr":"\u2190","Larr":"\u219E","lArr":"\u21D0","larrfs":"\u291D","larrhk":"\u21A9","larrlp":"\u21AB","larrpl":"\u2939","larrsim":"\u2973","larrtl":"\u21A2","latail":"\u2919","lAtail":"\u291B","lat":"\u2AAB","late":"\u2AAD","lates":"\u2AAD\uFE00","lbarr":"\u290C","lBarr":"\u290E","lbbrk":"\u2772","lbrace":"{","lbrack":"[","lbrke":"\u298B","lbrksld":"\u298F","lbrkslu":"\u298D","Lcaron":"\u013D","lcaron":"\u013E","Lcedil":"\u013B","lcedil":"\u013C","lceil":"\u2308","lcub":"{","Lcy":"\u041B","lcy":"\u043B","ldca":"\u2936","ldquo":"\u201C","ldquor":"\u201E","ldrdhar":"\u2967","ldrushar":"\u294B","ldsh":"\u21B2","le":"\u2264","lE":"\u2266","LeftAngleBracket":"\u27E8","LeftArrowBar":"\u21E4","leftarrow":"\u2190","LeftArrow":"\u2190","Leftarrow":"\u21D0","LeftArrowRightArrow":"\u21C6","leftarrowtail":"\u21A2","LeftCeiling":"\u2308","LeftDoubleBracket":"\u27E6","LeftDownTeeVector":"\u2961","LeftDownVectorBar":"\u2959","LeftDownVector":"\u21C3","LeftFloor":"\u230A","leftharpoondown":"\u21BD","leftharpoonup":"\u21BC","leftleftarrows":"\u21C7","leftrightarrow":"\u2194","LeftRightArrow":"\u2194","Leftrightarrow":"\u21D4","leftrightarrows":"\u21C6","leftrightharpoons":"\u21CB","leftrightsquigarrow":"\u21AD","LeftRightVector":"\u294E","LeftTeeArrow":"\u21A4","LeftTee":"\u22A3","LeftTeeVector":"\u295A","leftthreetimes":"\u22CB","LeftTriangleBar":"\u29CF","LeftTriangle":"\u22B2","LeftTriangleEqual":"\u22B4","LeftUpDownVector":"\u2951","LeftUpTeeVector":"\u2960","LeftUpVectorBar":"\u2958","LeftUpVector":"\u21BF","LeftVectorBar":"\u2952","LeftVector":"\u21BC","lEg":"\u2A8B","leg":"\u22DA","leq":"\u2264","leqq":"\u2266","leqslant":"\u2A7D","lescc":"\u2AA8","les":"\u2A7D","lesdot":"\u2A7F","lesdoto":"\u2A81","lesdotor":"\u2A83","lesg":"\u22DA\uFE00","lesges":"\u2A93","lessapprox":"\u2A85","lessdot":"\u22D6","lesseqgtr":"\u22DA","lesseqqgtr":"\u2A8B","LessEqualGreater":"\u22DA","LessFullEqual":"\u2266","LessGreater":"\u2276","lessgtr":"\u2276","LessLess":"\u2AA1","lesssim":"\u2272","LessSlantEqual":"\u2A7D","LessTilde":"\u2272","lfisht":"\u297C","lfloor":"\u230A","Lfr":"\u{1D50F}","lfr":"\u{1D529}","lg":"\u2276","lgE":"\u2A91","lHar":"\u2962","lhard":"\u21BD","lharu":"\u21BC","lharul":"\u296A","lhblk":"\u2584","LJcy":"\u0409","ljcy":"\u0459","llarr":"\u21C7","ll":"\u226A","Ll":"\u22D8","llcorner":"\u231E","Lleftarrow":"\u21DA","llhard":"\u296B","lltri":"\u25FA","Lmidot":"\u013F","lmidot":"\u0140","lmoustache":"\u23B0","lmoust":"\u23B0","lnap":"\u2A89","lnapprox":"\u2A89","lne":"\u2A87","lnE":"\u2268","lneq":"\u2A87","lneqq":"\u2268","lnsim":"\u22E6","loang":"\u27EC","loarr":"\u21FD","lobrk":"\u27E6","longleftarrow":"\u27F5","LongLeftArrow":"\u27F5","Longleftarrow":"\u27F8","longleftrightarrow":"\u27F7","LongLeftRightArrow":"\u27F7","Longleftrightarrow":"\u27FA","longmapsto":"\u27FC","longrightarrow":"\u27F6","LongRightArrow":"\u27F6","Longrightarrow":"\u27F9","looparrowleft":"\u21AB","looparrowright":"\u21AC","lopar":"\u2985","Lopf":"\u{1D543}","lopf":"\u{1D55D}","loplus":"\u2A2D","lotimes":"\u2A34","lowast":"\u2217","lowbar":"_","LowerLeftArrow":"\u2199","LowerRightArrow":"\u2198","loz":"\u25CA","lozenge":"\u25CA","lozf":"\u29EB","lpar":"(","lparlt":"\u2993","lrarr":"\u21C6","lrcorner":"\u231F","lrhar":"\u21CB","lrhard":"\u296D","lrm":"\u200E","lrtri":"\u22BF","lsaquo":"\u2039","lscr":"\u{1D4C1}","Lscr":"\u2112","lsh":"\u21B0","Lsh":"\u21B0","lsim":"\u2272","lsime":"\u2A8D","lsimg":"\u2A8F","lsqb":"[","lsquo":"\u2018","lsquor":"\u201A","Lstrok":"\u0141","lstrok":"\u0142","ltcc":"\u2AA6","ltcir":"\u2A79","lt":"<","LT":"<","Lt":"\u226A","ltdot":"\u22D6","lthree":"\u22CB","ltimes":"\u22C9","ltlarr":"\u2976","ltquest":"\u2A7B","ltri":"\u25C3","ltrie":"\u22B4","ltrif":"\u25C2","ltrPar":"\u2996","lurdshar":"\u294A","luruhar":"\u2966","lvertneqq":"\u2268\uFE00","lvnE":"\u2268\uFE00","macr":"\xAF","male":"\u2642","malt":"\u2720","maltese":"\u2720","Map":"\u2905","map":"\u21A6","mapsto":"\u21A6","mapstodown":"\u21A7","mapstoleft":"\u21A4","mapstoup":"\u21A5","marker":"\u25AE","mcomma":"\u2A29","Mcy":"\u041C","mcy":"\u043C","mdash":"\u2014","mDDot":"\u223A","measuredangle":"\u2221","MediumSpace":"\u205F","Mellintrf":"\u2133","Mfr":"\u{1D510}","mfr":"\u{1D52A}","mho":"\u2127","micro":"\xB5","midast":"*","midcir":"\u2AF0","mid":"\u2223","middot":"\xB7","minusb":"\u229F","minus":"\u2212","minusd":"\u2238","minusdu":"\u2A2A","MinusPlus":"\u2213","mlcp":"\u2ADB","mldr":"\u2026","mnplus":"\u2213","models":"\u22A7","Mopf":"\u{1D544}","mopf":"\u{1D55E}","mp":"\u2213","mscr":"\u{1D4C2}","Mscr":"\u2133","mstpos":"\u223E","Mu":"\u039C","mu":"\u03BC","multimap":"\u22B8","mumap":"\u22B8","nabla":"\u2207","Nacute":"\u0143","nacute":"\u0144","nang":"\u2220\u20D2","nap":"\u2249","napE":"\u2A70\u0338","napid":"\u224B\u0338","napos":"\u0149","napprox":"\u2249","natural":"\u266E","naturals":"\u2115","natur":"\u266E","nbsp":"\xA0","nbump":"\u224E\u0338","nbumpe":"\u224F\u0338","ncap":"\u2A43","Ncaron":"\u0147","ncaron":"\u0148","Ncedil":"\u0145","ncedil":"\u0146","ncong":"\u2247","ncongdot":"\u2A6D\u0338","ncup":"\u2A42","Ncy":"\u041D","ncy":"\u043D","ndash":"\u2013","nearhk":"\u2924","nearr":"\u2197","neArr":"\u21D7","nearrow":"\u2197","ne":"\u2260","nedot":"\u2250\u0338","NegativeMediumSpace":"\u200B","NegativeThickSpace":"\u200B","NegativeThinSpace":"\u200B","NegativeVeryThinSpace":"\u200B","nequiv":"\u2262","nesear":"\u2928","nesim":"\u2242\u0338","NestedGreaterGreater":"\u226B","NestedLessLess":"\u226A","NewLine":"\\n","nexist":"\u2204","nexists":"\u2204","Nfr":"\u{1D511}","nfr":"\u{1D52B}","ngE":"\u2267\u0338","nge":"\u2271","ngeq":"\u2271","ngeqq":"\u2267\u0338","ngeqslant":"\u2A7E\u0338","nges":"\u2A7E\u0338","nGg":"\u22D9\u0338","ngsim":"\u2275","nGt":"\u226B\u20D2","ngt":"\u226F","ngtr":"\u226F","nGtv":"\u226B\u0338","nharr":"\u21AE","nhArr":"\u21CE","nhpar":"\u2AF2","ni":"\u220B","nis":"\u22FC","nisd":"\u22FA","niv":"\u220B","NJcy":"\u040A","njcy":"\u045A","nlarr":"\u219A","nlArr":"\u21CD","nldr":"\u2025","nlE":"\u2266\u0338","nle":"\u2270","nleftarrow":"\u219A","nLeftarrow":"\u21CD","nleftrightarrow":"\u21AE","nLeftrightarrow":"\u21CE","nleq":"\u2270","nleqq":"\u2266\u0338","nleqslant":"\u2A7D\u0338","nles":"\u2A7D\u0338","nless":"\u226E","nLl":"\u22D8\u0338","nlsim":"\u2274","nLt":"\u226A\u20D2","nlt":"\u226E","nltri":"\u22EA","nltrie":"\u22EC","nLtv":"\u226A\u0338","nmid":"\u2224","NoBreak":"\u2060","NonBreakingSpace":"\xA0","nopf":"\u{1D55F}","Nopf":"\u2115","Not":"\u2AEC","not":"\xAC","NotCongruent":"\u2262","NotCupCap":"\u226D","NotDoubleVerticalBar":"\u2226","NotElement":"\u2209","NotEqual":"\u2260","NotEqualTilde":"\u2242\u0338","NotExists":"\u2204","NotGreater":"\u226F","NotGreaterEqual":"\u2271","NotGreaterFullEqual":"\u2267\u0338","NotGreaterGreater":"\u226B\u0338","NotGreaterLess":"\u2279","NotGreaterSlantEqual":"\u2A7E\u0338","NotGreaterTilde":"\u2275","NotHumpDownHump":"\u224E\u0338","NotHumpEqual":"\u224F\u0338","notin":"\u2209","notindot":"\u22F5\u0338","notinE":"\u22F9\u0338","notinva":"\u2209","notinvb":"\u22F7","notinvc":"\u22F6","NotLeftTriangleBar":"\u29CF\u0338","NotLeftTriangle":"\u22EA","NotLeftTriangleEqual":"\u22EC","NotLess":"\u226E","NotLessEqual":"\u2270","NotLessGreater":"\u2278","NotLessLess":"\u226A\u0338","NotLessSlantEqual":"\u2A7D\u0338","NotLessTilde":"\u2274","NotNestedGreaterGreater":"\u2AA2\u0338","NotNestedLessLess":"\u2AA1\u0338","notni":"\u220C","notniva":"\u220C","notnivb":"\u22FE","notnivc":"\u22FD","NotPrecedes":"\u2280","NotPrecedesEqual":"\u2AAF\u0338","NotPrecedesSlantEqual":"\u22E0","NotReverseElement":"\u220C","NotRightTriangleBar":"\u29D0\u0338","NotRightTriangle":"\u22EB","NotRightTriangleEqual":"\u22ED","NotSquareSubset":"\u228F\u0338","NotSquareSubsetEqual":"\u22E2","NotSquareSuperset":"\u2290\u0338","NotSquareSupersetEqual":"\u22E3","NotSubset":"\u2282\u20D2","NotSubsetEqual":"\u2288","NotSucceeds":"\u2281","NotSucceedsEqual":"\u2AB0\u0338","NotSucceedsSlantEqual":"\u22E1","NotSucceedsTilde":"\u227F\u0338","NotSuperset":"\u2283\u20D2","NotSupersetEqual":"\u2289","NotTilde":"\u2241","NotTildeEqual":"\u2244","NotTildeFullEqual":"\u2247","NotTildeTilde":"\u2249","NotVerticalBar":"\u2224","nparallel":"\u2226","npar":"\u2226","nparsl":"\u2AFD\u20E5","npart":"\u2202\u0338","npolint":"\u2A14","npr":"\u2280","nprcue":"\u22E0","nprec":"\u2280","npreceq":"\u2AAF\u0338","npre":"\u2AAF\u0338","nrarrc":"\u2933\u0338","nrarr":"\u219B","nrArr":"\u21CF","nrarrw":"\u219D\u0338","nrightarrow":"\u219B","nRightarrow":"\u21CF","nrtri":"\u22EB","nrtrie":"\u22ED","nsc":"\u2281","nsccue":"\u22E1","nsce":"\u2AB0\u0338","Nscr":"\u{1D4A9}","nscr":"\u{1D4C3}","nshortmid":"\u2224","nshortparallel":"\u2226","nsim":"\u2241","nsime":"\u2244","nsimeq":"\u2244","nsmid":"\u2224","nspar":"\u2226","nsqsube":"\u22E2","nsqsupe":"\u22E3","nsub":"\u2284","nsubE":"\u2AC5\u0338","nsube":"\u2288","nsubset":"\u2282\u20D2","nsubseteq":"\u2288","nsubseteqq":"\u2AC5\u0338","nsucc":"\u2281","nsucceq":"\u2AB0\u0338","nsup":"\u2285","nsupE":"\u2AC6\u0338","nsupe":"\u2289","nsupset":"\u2283\u20D2","nsupseteq":"\u2289","nsupseteqq":"\u2AC6\u0338","ntgl":"\u2279","Ntilde":"\xD1","ntilde":"\xF1","ntlg":"\u2278","ntriangleleft":"\u22EA","ntrianglelefteq":"\u22EC","ntriangleright":"\u22EB","ntrianglerighteq":"\u22ED","Nu":"\u039D","nu":"\u03BD","num":"#","numero":"\u2116","numsp":"\u2007","nvap":"\u224D\u20D2","nvdash":"\u22AC","nvDash":"\u22AD","nVdash":"\u22AE","nVDash":"\u22AF","nvge":"\u2265\u20D2","nvgt":">\u20D2","nvHarr":"\u2904","nvinfin":"\u29DE","nvlArr":"\u2902","nvle":"\u2264\u20D2","nvlt":"<\u20D2","nvltrie":"\u22B4\u20D2","nvrArr":"\u2903","nvrtrie":"\u22B5\u20D2","nvsim":"\u223C\u20D2","nwarhk":"\u2923","nwarr":"\u2196","nwArr":"\u21D6","nwarrow":"\u2196","nwnear":"\u2927","Oacute":"\xD3","oacute":"\xF3","oast":"\u229B","Ocirc":"\xD4","ocirc":"\xF4","ocir":"\u229A","Ocy":"\u041E","ocy":"\u043E","odash":"\u229D","Odblac":"\u0150","odblac":"\u0151","odiv":"\u2A38","odot":"\u2299","odsold":"\u29BC","OElig":"\u0152","oelig":"\u0153","ofcir":"\u29BF","Ofr":"\u{1D512}","ofr":"\u{1D52C}","ogon":"\u02DB","Ograve":"\xD2","ograve":"\xF2","ogt":"\u29C1","ohbar":"\u29B5","ohm":"\u03A9","oint":"\u222E","olarr":"\u21BA","olcir":"\u29BE","olcross":"\u29BB","oline":"\u203E","olt":"\u29C0","Omacr":"\u014C","omacr":"\u014D","Omega":"\u03A9","omega":"\u03C9","Omicron":"\u039F","omicron":"\u03BF","omid":"\u29B6","ominus":"\u2296","Oopf":"\u{1D546}","oopf":"\u{1D560}","opar":"\u29B7","OpenCurlyDoubleQuote":"\u201C","OpenCurlyQuote":"\u2018","operp":"\u29B9","oplus":"\u2295","orarr":"\u21BB","Or":"\u2A54","or":"\u2228","ord":"\u2A5D","order":"\u2134","orderof":"\u2134","ordf":"\xAA","ordm":"\xBA","origof":"\u22B6","oror":"\u2A56","orslope":"\u2A57","orv":"\u2A5B","oS":"\u24C8","Oscr":"\u{1D4AA}","oscr":"\u2134","Oslash":"\xD8","oslash":"\xF8","osol":"\u2298","Otilde":"\xD5","otilde":"\xF5","otimesas":"\u2A36","Otimes":"\u2A37","otimes":"\u2297","Ouml":"\xD6","ouml":"\xF6","ovbar":"\u233D","OverBar":"\u203E","OverBrace":"\u23DE","OverBracket":"\u23B4","OverParenthesis":"\u23DC","para":"\xB6","parallel":"\u2225","par":"\u2225","parsim":"\u2AF3","parsl":"\u2AFD","part":"\u2202","PartialD":"\u2202","Pcy":"\u041F","pcy":"\u043F","percnt":"%","period":".","permil":"\u2030","perp":"\u22A5","pertenk":"\u2031","Pfr":"\u{1D513}","pfr":"\u{1D52D}","Phi":"\u03A6","phi":"\u03C6","phiv":"\u03D5","phmmat":"\u2133","phone":"\u260E","Pi":"\u03A0","pi":"\u03C0","pitchfork":"\u22D4","piv":"\u03D6","planck":"\u210F","planckh":"\u210E","plankv":"\u210F","plusacir":"\u2A23","plusb":"\u229E","pluscir":"\u2A22","plus":"+","plusdo":"\u2214","plusdu":"\u2A25","pluse":"\u2A72","PlusMinus":"\xB1","plusmn":"\xB1","plussim":"\u2A26","plustwo":"\u2A27","pm":"\xB1","Poincareplane":"\u210C","pointint":"\u2A15","popf":"\u{1D561}","Popf":"\u2119","pound":"\xA3","prap":"\u2AB7","Pr":"\u2ABB","pr":"\u227A","prcue":"\u227C","precapprox":"\u2AB7","prec":"\u227A","preccurlyeq":"\u227C","Precedes":"\u227A","PrecedesEqual":"\u2AAF","PrecedesSlantEqual":"\u227C","PrecedesTilde":"\u227E","preceq":"\u2AAF","precnapprox":"\u2AB9","precneqq":"\u2AB5","precnsim":"\u22E8","pre":"\u2AAF","prE":"\u2AB3","precsim":"\u227E","prime":"\u2032","Prime":"\u2033","primes":"\u2119","prnap":"\u2AB9","prnE":"\u2AB5","prnsim":"\u22E8","prod":"\u220F","Product":"\u220F","profalar":"\u232E","profline":"\u2312","profsurf":"\u2313","prop":"\u221D","Proportional":"\u221D","Proportion":"\u2237","propto":"\u221D","prsim":"\u227E","prurel":"\u22B0","Pscr":"\u{1D4AB}","pscr":"\u{1D4C5}","Psi":"\u03A8","psi":"\u03C8","puncsp":"\u2008","Qfr":"\u{1D514}","qfr":"\u{1D52E}","qint":"\u2A0C","qopf":"\u{1D562}","Qopf":"\u211A","qprime":"\u2057","Qscr":"\u{1D4AC}","qscr":"\u{1D4C6}","quaternions":"\u210D","quatint":"\u2A16","quest":"?","questeq":"\u225F","quot":"\\"","QUOT":"\\"","rAarr":"\u21DB","race":"\u223D\u0331","Racute":"\u0154","racute":"\u0155","radic":"\u221A","raemptyv":"\u29B3","rang":"\u27E9","Rang":"\u27EB","rangd":"\u2992","range":"\u29A5","rangle":"\u27E9","raquo":"\xBB","rarrap":"\u2975","rarrb":"\u21E5","rarrbfs":"\u2920","rarrc":"\u2933","rarr":"\u2192","Rarr":"\u21A0","rArr":"\u21D2","rarrfs":"\u291E","rarrhk":"\u21AA","rarrlp":"\u21AC","rarrpl":"\u2945","rarrsim":"\u2974","Rarrtl":"\u2916","rarrtl":"\u21A3","rarrw":"\u219D","ratail":"\u291A","rAtail":"\u291C","ratio":"\u2236","rationals":"\u211A","rbarr":"\u290D","rBarr":"\u290F","RBarr":"\u2910","rbbrk":"\u2773","rbrace":"}","rbrack":"]","rbrke":"\u298C","rbrksld":"\u298E","rbrkslu":"\u2990","Rcaron":"\u0158","rcaron":"\u0159","Rcedil":"\u0156","rcedil":"\u0157","rceil":"\u2309","rcub":"}","Rcy":"\u0420","rcy":"\u0440","rdca":"\u2937","rdldhar":"\u2969","rdquo":"\u201D","rdquor":"\u201D","rdsh":"\u21B3","real":"\u211C","realine":"\u211B","realpart":"\u211C","reals":"\u211D","Re":"\u211C","rect":"\u25AD","reg":"\xAE","REG":"\xAE","ReverseElement":"\u220B","ReverseEquilibrium":"\u21CB","ReverseUpEquilibrium":"\u296F","rfisht":"\u297D","rfloor":"\u230B","rfr":"\u{1D52F}","Rfr":"\u211C","rHar":"\u2964","rhard":"\u21C1","rharu":"\u21C0","rharul":"\u296C","Rho":"\u03A1","rho":"\u03C1","rhov":"\u03F1","RightAngleBracket":"\u27E9","RightArrowBar":"\u21E5","rightarrow":"\u2192","RightArrow":"\u2192","Rightarrow":"\u21D2","RightArrowLeftArrow":"\u21C4","rightarrowtail":"\u21A3","RightCeiling":"\u2309","RightDoubleBracket":"\u27E7","RightDownTeeVector":"\u295D","RightDownVectorBar":"\u2955","RightDownVector":"\u21C2","RightFloor":"\u230B","rightharpoondown":"\u21C1","rightharpoonup":"\u21C0","rightleftarrows":"\u21C4","rightleftharpoons":"\u21CC","rightrightarrows":"\u21C9","rightsquigarrow":"\u219D","RightTeeArrow":"\u21A6","RightTee":"\u22A2","RightTeeVector":"\u295B","rightthreetimes":"\u22CC","RightTriangleBar":"\u29D0","RightTriangle":"\u22B3","RightTriangleEqual":"\u22B5","RightUpDownVector":"\u294F","RightUpTeeVector":"\u295C","RightUpVectorBar":"\u2954","RightUpVector":"\u21BE","RightVectorBar":"\u2953","RightVector":"\u21C0","ring":"\u02DA","risingdotseq":"\u2253","rlarr":"\u21C4","rlhar":"\u21CC","rlm":"\u200F","rmoustache":"\u23B1","rmoust":"\u23B1","rnmid":"\u2AEE","roang":"\u27ED","roarr":"\u21FE","robrk":"\u27E7","ropar":"\u2986","ropf":"\u{1D563}","Ropf":"\u211D","roplus":"\u2A2E","rotimes":"\u2A35","RoundImplies":"\u2970","rpar":")","rpargt":"\u2994","rppolint":"\u2A12","rrarr":"\u21C9","Rrightarrow":"\u21DB","rsaquo":"\u203A","rscr":"\u{1D4C7}","Rscr":"\u211B","rsh":"\u21B1","Rsh":"\u21B1","rsqb":"]","rsquo":"\u2019","rsquor":"\u2019","rthree":"\u22CC","rtimes":"\u22CA","rtri":"\u25B9","rtrie":"\u22B5","rtrif":"\u25B8","rtriltri":"\u29CE","RuleDelayed":"\u29F4","ruluhar":"\u2968","rx":"\u211E","Sacute":"\u015A","sacute":"\u015B","sbquo":"\u201A","scap":"\u2AB8","Scaron":"\u0160","scaron":"\u0161","Sc":"\u2ABC","sc":"\u227B","sccue":"\u227D","sce":"\u2AB0","scE":"\u2AB4","Scedil":"\u015E","scedil":"\u015F","Scirc":"\u015C","scirc":"\u015D","scnap":"\u2ABA","scnE":"\u2AB6","scnsim":"\u22E9","scpolint":"\u2A13","scsim":"\u227F","Scy":"\u0421","scy":"\u0441","sdotb":"\u22A1","sdot":"\u22C5","sdote":"\u2A66","searhk":"\u2925","searr":"\u2198","seArr":"\u21D8","searrow":"\u2198","sect":"\xA7","semi":";","seswar":"\u2929","setminus":"\u2216","setmn":"\u2216","sext":"\u2736","Sfr":"\u{1D516}","sfr":"\u{1D530}","sfrown":"\u2322","sharp":"\u266F","SHCHcy":"\u0429","shchcy":"\u0449","SHcy":"\u0428","shcy":"\u0448","ShortDownArrow":"\u2193","ShortLeftArrow":"\u2190","shortmid":"\u2223","shortparallel":"\u2225","ShortRightArrow":"\u2192","ShortUpArrow":"\u2191","shy":"\xAD","Sigma":"\u03A3","sigma":"\u03C3","sigmaf":"\u03C2","sigmav":"\u03C2","sim":"\u223C","simdot":"\u2A6A","sime":"\u2243","simeq":"\u2243","simg":"\u2A9E","simgE":"\u2AA0","siml":"\u2A9D","simlE":"\u2A9F","simne":"\u2246","simplus":"\u2A24","simrarr":"\u2972","slarr":"\u2190","SmallCircle":"\u2218","smallsetminus":"\u2216","smashp":"\u2A33","smeparsl":"\u29E4","smid":"\u2223","smile":"\u2323","smt":"\u2AAA","smte":"\u2AAC","smtes":"\u2AAC\uFE00","SOFTcy":"\u042C","softcy":"\u044C","solbar":"\u233F","solb":"\u29C4","sol":"/","Sopf":"\u{1D54A}","sopf":"\u{1D564}","spades":"\u2660","spadesuit":"\u2660","spar":"\u2225","sqcap":"\u2293","sqcaps":"\u2293\uFE00","sqcup":"\u2294","sqcups":"\u2294\uFE00","Sqrt":"\u221A","sqsub":"\u228F","sqsube":"\u2291","sqsubset":"\u228F","sqsubseteq":"\u2291","sqsup":"\u2290","sqsupe":"\u2292","sqsupset":"\u2290","sqsupseteq":"\u2292","square":"\u25A1","Square":"\u25A1","SquareIntersection":"\u2293","SquareSubset":"\u228F","SquareSubsetEqual":"\u2291","SquareSuperset":"\u2290","SquareSupersetEqual":"\u2292","SquareUnion":"\u2294","squarf":"\u25AA","squ":"\u25A1","squf":"\u25AA","srarr":"\u2192","Sscr":"\u{1D4AE}","sscr":"\u{1D4C8}","ssetmn":"\u2216","ssmile":"\u2323","sstarf":"\u22C6","Star":"\u22C6","star":"\u2606","starf":"\u2605","straightepsilon":"\u03F5","straightphi":"\u03D5","strns":"\xAF","sub":"\u2282","Sub":"\u22D0","subdot":"\u2ABD","subE":"\u2AC5","sube":"\u2286","subedot":"\u2AC3","submult":"\u2AC1","subnE":"\u2ACB","subne":"\u228A","subplus":"\u2ABF","subrarr":"\u2979","subset":"\u2282","Subset":"\u22D0","subseteq":"\u2286","subseteqq":"\u2AC5","SubsetEqual":"\u2286","subsetneq":"\u228A","subsetneqq":"\u2ACB","subsim":"\u2AC7","subsub":"\u2AD5","subsup":"\u2AD3","succapprox":"\u2AB8","succ":"\u227B","succcurlyeq":"\u227D","Succeeds":"\u227B","SucceedsEqual":"\u2AB0","SucceedsSlantEqual":"\u227D","SucceedsTilde":"\u227F","succeq":"\u2AB0","succnapprox":"\u2ABA","succneqq":"\u2AB6","succnsim":"\u22E9","succsim":"\u227F","SuchThat":"\u220B","sum":"\u2211","Sum":"\u2211","sung":"\u266A","sup1":"\xB9","sup2":"\xB2","sup3":"\xB3","sup":"\u2283","Sup":"\u22D1","supdot":"\u2ABE","supdsub":"\u2AD8","supE":"\u2AC6","supe":"\u2287","supedot":"\u2AC4","Superset":"\u2283","SupersetEqual":"\u2287","suphsol":"\u27C9","suphsub":"\u2AD7","suplarr":"\u297B","supmult":"\u2AC2","supnE":"\u2ACC","supne":"\u228B","supplus":"\u2AC0","supset":"\u2283","Supset":"\u22D1","supseteq":"\u2287","supseteqq":"\u2AC6","supsetneq":"\u228B","supsetneqq":"\u2ACC","supsim":"\u2AC8","supsub":"\u2AD4","supsup":"\u2AD6","swarhk":"\u2926","swarr":"\u2199","swArr":"\u21D9","swarrow":"\u2199","swnwar":"\u292A","szlig":"\xDF","Tab":"\\t","target":"\u2316","Tau":"\u03A4","tau":"\u03C4","tbrk":"\u23B4","Tcaron":"\u0164","tcaron":"\u0165","Tcedil":"\u0162","tcedil":"\u0163","Tcy":"\u0422","tcy":"\u0442","tdot":"\u20DB","telrec":"\u2315","Tfr":"\u{1D517}","tfr":"\u{1D531}","there4":"\u2234","therefore":"\u2234","Therefore":"\u2234","Theta":"\u0398","theta":"\u03B8","thetasym":"\u03D1","thetav":"\u03D1","thickapprox":"\u2248","thicksim":"\u223C","ThickSpace":"\u205F\u200A","ThinSpace":"\u2009","thinsp":"\u2009","thkap":"\u2248","thksim":"\u223C","THORN":"\xDE","thorn":"\xFE","tilde":"\u02DC","Tilde":"\u223C","TildeEqual":"\u2243","TildeFullEqual":"\u2245","TildeTilde":"\u2248","timesbar":"\u2A31","timesb":"\u22A0","times":"\xD7","timesd":"\u2A30","tint":"\u222D","toea":"\u2928","topbot":"\u2336","topcir":"\u2AF1","top":"\u22A4","Topf":"\u{1D54B}","topf":"\u{1D565}","topfork":"\u2ADA","tosa":"\u2929","tprime":"\u2034","trade":"\u2122","TRADE":"\u2122","triangle":"\u25B5","triangledown":"\u25BF","triangleleft":"\u25C3","trianglelefteq":"\u22B4","triangleq":"\u225C","triangleright":"\u25B9","trianglerighteq":"\u22B5","tridot":"\u25EC","trie":"\u225C","triminus":"\u2A3A","TripleDot":"\u20DB","triplus":"\u2A39","trisb":"\u29CD","tritime":"\u2A3B","trpezium":"\u23E2","Tscr":"\u{1D4AF}","tscr":"\u{1D4C9}","TScy":"\u0426","tscy":"\u0446","TSHcy":"\u040B","tshcy":"\u045B","Tstrok":"\u0166","tstrok":"\u0167","twixt":"\u226C","twoheadleftarrow":"\u219E","twoheadrightarrow":"\u21A0","Uacute":"\xDA","uacute":"\xFA","uarr":"\u2191","Uarr":"\u219F","uArr":"\u21D1","Uarrocir":"\u2949","Ubrcy":"\u040E","ubrcy":"\u045E","Ubreve":"\u016C","ubreve":"\u016D","Ucirc":"\xDB","ucirc":"\xFB","Ucy":"\u0423","ucy":"\u0443","udarr":"\u21C5","Udblac":"\u0170","udblac":"\u0171","udhar":"\u296E","ufisht":"\u297E","Ufr":"\u{1D518}","ufr":"\u{1D532}","Ugrave":"\xD9","ugrave":"\xF9","uHar":"\u2963","uharl":"\u21BF","uharr":"\u21BE","uhblk":"\u2580","ulcorn":"\u231C","ulcorner":"\u231C","ulcrop":"\u230F","ultri":"\u25F8","Umacr":"\u016A","umacr":"\u016B","uml":"\xA8","UnderBar":"_","UnderBrace":"\u23DF","UnderBracket":"\u23B5","UnderParenthesis":"\u23DD","Union":"\u22C3","UnionPlus":"\u228E","Uogon":"\u0172","uogon":"\u0173","Uopf":"\u{1D54C}","uopf":"\u{1D566}","UpArrowBar":"\u2912","uparrow":"\u2191","UpArrow":"\u2191","Uparrow":"\u21D1","UpArrowDownArrow":"\u21C5","updownarrow":"\u2195","UpDownArrow":"\u2195","Updownarrow":"\u21D5","UpEquilibrium":"\u296E","upharpoonleft":"\u21BF","upharpoonright":"\u21BE","uplus":"\u228E","UpperLeftArrow":"\u2196","UpperRightArrow":"\u2197","upsi":"\u03C5","Upsi":"\u03D2","upsih":"\u03D2","Upsilon":"\u03A5","upsilon":"\u03C5","UpTeeArrow":"\u21A5","UpTee":"\u22A5","upuparrows":"\u21C8","urcorn":"\u231D","urcorner":"\u231D","urcrop":"\u230E","Uring":"\u016E","uring":"\u016F","urtri":"\u25F9","Uscr":"\u{1D4B0}","uscr":"\u{1D4CA}","utdot":"\u22F0","Utilde":"\u0168","utilde":"\u0169","utri":"\u25B5","utrif":"\u25B4","uuarr":"\u21C8","Uuml":"\xDC","uuml":"\xFC","uwangle":"\u29A7","vangrt":"\u299C","varepsilon":"\u03F5","varkappa":"\u03F0","varnothing":"\u2205","varphi":"\u03D5","varpi":"\u03D6","varpropto":"\u221D","varr":"\u2195","vArr":"\u21D5","varrho":"\u03F1","varsigma":"\u03C2","varsubsetneq":"\u228A\uFE00","varsubsetneqq":"\u2ACB\uFE00","varsupsetneq":"\u228B\uFE00","varsupsetneqq":"\u2ACC\uFE00","vartheta":"\u03D1","vartriangleleft":"\u22B2","vartriangleright":"\u22B3","vBar":"\u2AE8","Vbar":"\u2AEB","vBarv":"\u2AE9","Vcy":"\u0412","vcy":"\u0432","vdash":"\u22A2","vDash":"\u22A8","Vdash":"\u22A9","VDash":"\u22AB","Vdashl":"\u2AE6","veebar":"\u22BB","vee":"\u2228","Vee":"\u22C1","veeeq":"\u225A","vellip":"\u22EE","verbar":"|","Verbar":"\u2016","vert":"|","Vert":"\u2016","VerticalBar":"\u2223","VerticalLine":"|","VerticalSeparator":"\u2758","VerticalTilde":"\u2240","VeryThinSpace":"\u200A","Vfr":"\u{1D519}","vfr":"\u{1D533}","vltri":"\u22B2","vnsub":"\u2282\u20D2","vnsup":"\u2283\u20D2","Vopf":"\u{1D54D}","vopf":"\u{1D567}","vprop":"\u221D","vrtri":"\u22B3","Vscr":"\u{1D4B1}","vscr":"\u{1D4CB}","vsubnE":"\u2ACB\uFE00","vsubne":"\u228A\uFE00","vsupnE":"\u2ACC\uFE00","vsupne":"\u228B\uFE00","Vvdash":"\u22AA","vzigzag":"\u299A","Wcirc":"\u0174","wcirc":"\u0175","wedbar":"\u2A5F","wedge":"\u2227","Wedge":"\u22C0","wedgeq":"\u2259","weierp":"\u2118","Wfr":"\u{1D51A}","wfr":"\u{1D534}","Wopf":"\u{1D54E}","wopf":"\u{1D568}","wp":"\u2118","wr":"\u2240","wreath":"\u2240","Wscr":"\u{1D4B2}","wscr":"\u{1D4CC}","xcap":"\u22C2","xcirc":"\u25EF","xcup":"\u22C3","xdtri":"\u25BD","Xfr":"\u{1D51B}","xfr":"\u{1D535}","xharr":"\u27F7","xhArr":"\u27FA","Xi":"\u039E","xi":"\u03BE","xlarr":"\u27F5","xlArr":"\u27F8","xmap":"\u27FC","xnis":"\u22FB","xodot":"\u2A00","Xopf":"\u{1D54F}","xopf":"\u{1D569}","xoplus":"\u2A01","xotime":"\u2A02","xrarr":"\u27F6","xrArr":"\u27F9","Xscr":"\u{1D4B3}","xscr":"\u{1D4CD}","xsqcup":"\u2A06","xuplus":"\u2A04","xutri":"\u25B3","xvee":"\u22C1","xwedge":"\u22C0","Yacute":"\xDD","yacute":"\xFD","YAcy":"\u042F","yacy":"\u044F","Ycirc":"\u0176","ycirc":"\u0177","Ycy":"\u042B","ycy":"\u044B","yen":"\xA5","Yfr":"\u{1D51C}","yfr":"\u{1D536}","YIcy":"\u0407","yicy":"\u0457","Yopf":"\u{1D550}","yopf":"\u{1D56A}","Yscr":"\u{1D4B4}","yscr":"\u{1D4CE}","YUcy":"\u042E","yucy":"\u044E","yuml":"\xFF","Yuml":"\u0178","Zacute":"\u0179","zacute":"\u017A","Zcaron":"\u017D","zcaron":"\u017E","Zcy":"\u0417","zcy":"\u0437","Zdot":"\u017B","zdot":"\u017C","zeetrf":"\u2128","ZeroWidthSpace":"\u200B","Zeta":"\u0396","zeta":"\u03B6","zfr":"\u{1D537}","Zfr":"\u2128","ZHcy":"\u0416","zhcy":"\u0436","zigrarr":"\u21DD","zopf":"\u{1D56B}","Zopf":"\u2124","Zscr":"\u{1D4B5}","zscr":"\u{1D4CF}","zwj":"\u200D","zwnj":"\u200C"}\n';
});

// node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/legacy.json
var require_legacy = __commonJS((exports, module) => {
  module.exports = `{"Aacute":"\xC1","aacute":"\xE1","Acirc":"\xC2","acirc":"\xE2","acute":"\xB4","AElig":"\xC6","aelig":"\xE6","Agrave":"\xC0","agrave":"\xE0","amp":"&","AMP":"&","Aring":"\xC5","aring":"\xE5","Atilde":"\xC3","atilde":"\xE3","Auml":"\xC4","auml":"\xE4","brvbar":"\xA6","Ccedil":"\xC7","ccedil":"\xE7","cedil":"\xB8","cent":"\xA2","copy":"\xA9","COPY":"\xA9","curren":"\xA4","deg":"\xB0","divide":"\xF7","Eacute":"\xC9","eacute":"\xE9","Ecirc":"\xCA","ecirc":"\xEA","Egrave":"\xC8","egrave":"\xE8","ETH":"\xD0","eth":"\xF0","Euml":"\xCB","euml":"\xEB","frac12":"\xBD","frac14":"\xBC","frac34":"\xBE","gt":">","GT":">","Iacute":"\xCD","iacute":"\xED","Icirc":"\xCE","icirc":"\xEE","iexcl":"\xA1","Igrave":"\xCC","igrave":"\xEC","iquest":"\xBF","Iuml":"\xCF","iuml":"\xEF","laquo":"\xAB","lt":"<","LT":"<","macr":"\xAF","micro":"\xB5","middot":"\xB7","nbsp":"\xA0","not":"\xAC","Ntilde":"\xD1","ntilde":"\xF1","Oacute":"\xD3","oacute":"\xF3","Ocirc":"\xD4","ocirc":"\xF4","Ograve":"\xD2","ograve":"\xF2","ordf":"\xAA","ordm":"\xBA","Oslash":"\xD8","oslash":"\xF8","Otilde":"\xD5","otilde":"\xF5","Ouml":"\xD6","ouml":"\xF6","para":"\xB6","plusmn":"\xB1","pound":"\xA3","quot":"\\"","QUOT":"\\"","raquo":"\xBB","reg":"\xAE","REG":"\xAE","sect":"\xA7","shy":"\xAD","sup1":"\xB9","sup2":"\xB2","sup3":"\xB3","szlig":"\xDF","THORN":"\xDE","thorn":"\xFE","times":"\xD7","Uacute":"\xDA","uacute":"\xFA","Ucirc":"\xDB","ucirc":"\xFB","Ugrave":"\xD9","ugrave":"\xF9","uml":"\xA8","Uuml":"\xDC","uuml":"\xFC","Yacute":"\xDD","yacute":"\xFD","yen":"\xA5","yuml":"\xFF"}
`;
});

// node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/xml.json
var require_xml = __commonJS((exports, module) => {
  module.exports = `{"amp":"&","apos":"'","gt":">","lt":"<","quot":"\\""}
`;
});

// node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/maps/decode.json
var require_decode = __commonJS((exports, module) => {
  module.exports = `{"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}
`;
});

// node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/decode_codepoint.js
var require_decode_codepoint = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  var decode_json_1 = __importDefault(require_decode()), fromCodePoint = String.fromCodePoint || function(codePoint) {
    var output = "";
    return codePoint > 65535 && (codePoint -= 65536, output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296), codePoint = 56320 | codePoint & 1023), output += String.fromCharCode(codePoint), output;
  };
  function decodeCodePoint(codePoint) {
    return codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111 ? "\uFFFD" : (codePoint in decode_json_1.default && (codePoint = decode_json_1.default[codePoint]), fromCodePoint(codePoint));
  }
  exports.default = decodeCodePoint;
});

// node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/decode.js
var require_decode2 = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.decodeHTML = exports.decodeHTMLStrict = exports.decodeXML = void 0;
  var entities_json_1 = __importDefault(require_entities()), legacy_json_1 = __importDefault(require_legacy()), xml_json_1 = __importDefault(require_xml()), decode_codepoint_1 = __importDefault(require_decode_codepoint()), strictEntityRe = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
  exports.decodeXML = getStrictDecoder(xml_json_1.default);
  exports.decodeHTMLStrict = getStrictDecoder(entities_json_1.default);
  function getStrictDecoder(map) {
    var replace = getReplacer(map);
    return function(str) {
      return String(str).replace(strictEntityRe, replace);
    };
  }
  var sorter = function(a, b) {
    return a < b ? 1 : -1;
  };
  exports.decodeHTML = function() {
    for (var legacy = Object.keys(legacy_json_1.default).sort(sorter), keys2 = Object.keys(entities_json_1.default).sort(sorter), i = 0, j = 0; i < keys2.length; i++)
      legacy[j] === keys2[i] ? (keys2[i] += ";?", j++) : keys2[i] += ";";
    var re = new RegExp("&(?:" + keys2.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), replace = getReplacer(entities_json_1.default);
    function replacer(str) {
      return str.substr(-1) !== ";" && (str += ";"), replace(str);
    }
    return function(str) {
      return String(str).replace(re, replacer);
    };
  }();
  function getReplacer(map) {
    return function(str) {
      if (str.charAt(1) === "#") {
        var secondChar = str.charAt(2);
        return secondChar === "X" || secondChar === "x" ? decode_codepoint_1.default(parseInt(str.substr(3), 16)) : decode_codepoint_1.default(parseInt(str.substr(2), 10));
      }
      return map[str.slice(1, -1)] || str;
    };
  }
});

// node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/encode.js
var require_encode = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = void 0;
  var xml_json_1 = __importDefault(require_xml()), inverseXML = getInverseObj(xml_json_1.default), xmlReplacer = getInverseReplacer(inverseXML);
  exports.encodeXML = getASCIIEncoder(inverseXML);
  var entities_json_1 = __importDefault(require_entities()), inverseHTML = getInverseObj(entities_json_1.default), htmlReplacer = getInverseReplacer(inverseHTML);
  exports.encodeHTML = getInverse(inverseHTML, htmlReplacer);
  exports.encodeNonAsciiHTML = getASCIIEncoder(inverseHTML);
  function getInverseObj(obj) {
    return Object.keys(obj).sort().reduce(function(inverse, name) {
      return inverse[obj[name]] = "&" + name + ";", inverse;
    }, {});
  }
  function getInverseReplacer(inverse) {
    for (var single = [], multiple = [], _i = 0, _a = Object.keys(inverse); _i < _a.length; _i++) {
      var k = _a[_i];
      k.length === 1 ? single.push("\\" + k) : multiple.push(k);
    }
    single.sort();
    for (var start = 0; start < single.length - 1; start++) {
      for (var end = start; end < single.length - 1 && single[end].charCodeAt(1) + 1 === single[end + 1].charCodeAt(1); )
        end += 1;
      var count = 1 + end - start;
      count < 3 || single.splice(start, count, single[start] + "-" + single[end]);
    }
    return multiple.unshift("[" + single.join("") + "]"), new RegExp(multiple.join("|"), "g");
  }
  var reNonASCII = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, getCodePoint = String.prototype.codePointAt != null ? function(str) {
    return str.codePointAt(0);
  } : function(c) {
    return (c.charCodeAt(0) - 55296) * 1024 + c.charCodeAt(1) - 56320 + 65536;
  };
  function singleCharReplacer(c) {
    return "&#x" + (c.length > 1 ? getCodePoint(c) : c.charCodeAt(0)).toString(16).toUpperCase() + ";";
  }
  function getInverse(inverse, re) {
    return function(data) {
      return data.replace(re, function(name) {
        return inverse[name];
      }).replace(reNonASCII, singleCharReplacer);
    };
  }
  var reEscapeChars = new RegExp(xmlReplacer.source + "|" + reNonASCII.source, "g");
  function escape(data) {
    return data.replace(reEscapeChars, singleCharReplacer);
  }
  exports.escape = escape;
  function escapeUTF8(data) {
    return data.replace(xmlReplacer, singleCharReplacer);
  }
  exports.escapeUTF8 = escapeUTF8;
  function getASCIIEncoder(obj) {
    return function(data) {
      return data.replace(reEscapeChars, function(c) {
        return obj[c] || singleCharReplacer(c);
      });
    };
  }
});

// node_modules/.pnpm/entities@2.2.0/node_modules/entities/lib/index.js
var require_lib2 = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.encodeHTML5 = exports.encodeHTML4 = exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = void 0;
  var decode_1 = require_decode2(), encode_1 = require_encode();
  function decode(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(data);
  }
  exports.decode = decode;
  function decodeStrict(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(data);
  }
  exports.decodeStrict = decodeStrict;
  function encode(data, level) {
    return (!level || level <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(data);
  }
  exports.encode = encode;
  var encode_2 = require_encode();
  Object.defineProperty(exports, "encodeXML", {enumerable: !0, get: function() {
    return encode_2.encodeXML;
  }});
  Object.defineProperty(exports, "encodeHTML", {enumerable: !0, get: function() {
    return encode_2.encodeHTML;
  }});
  Object.defineProperty(exports, "encodeNonAsciiHTML", {enumerable: !0, get: function() {
    return encode_2.encodeNonAsciiHTML;
  }});
  Object.defineProperty(exports, "escape", {enumerable: !0, get: function() {
    return encode_2.escape;
  }});
  Object.defineProperty(exports, "escapeUTF8", {enumerable: !0, get: function() {
    return encode_2.escapeUTF8;
  }});
  Object.defineProperty(exports, "encodeHTML4", {enumerable: !0, get: function() {
    return encode_2.encodeHTML;
  }});
  Object.defineProperty(exports, "encodeHTML5", {enumerable: !0, get: function() {
    return encode_2.encodeHTML;
  }});
  var decode_2 = require_decode2();
  Object.defineProperty(exports, "decodeXML", {enumerable: !0, get: function() {
    return decode_2.decodeXML;
  }});
  Object.defineProperty(exports, "decodeHTML", {enumerable: !0, get: function() {
    return decode_2.decodeHTML;
  }});
  Object.defineProperty(exports, "decodeHTMLStrict", {enumerable: !0, get: function() {
    return decode_2.decodeHTMLStrict;
  }});
  Object.defineProperty(exports, "decodeHTML4", {enumerable: !0, get: function() {
    return decode_2.decodeHTML;
  }});
  Object.defineProperty(exports, "decodeHTML5", {enumerable: !0, get: function() {
    return decode_2.decodeHTML;
  }});
  Object.defineProperty(exports, "decodeHTML4Strict", {enumerable: !0, get: function() {
    return decode_2.decodeHTMLStrict;
  }});
  Object.defineProperty(exports, "decodeHTML5Strict", {enumerable: !0, get: function() {
    return decode_2.decodeHTMLStrict;
  }});
  Object.defineProperty(exports, "decodeXMLStrict", {enumerable: !0, get: function() {
    return decode_2.decodeXML;
  }});
});

// node_modules/.pnpm/dom-serializer@1.2.0/node_modules/dom-serializer/lib/foreignNames.js
var require_foreignNames = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.attributeNames = exports.elementNames = void 0;
  exports.elementNames = new Map([
    ["altglyph", "altGlyph"],
    ["altglyphdef", "altGlyphDef"],
    ["altglyphitem", "altGlyphItem"],
    ["animatecolor", "animateColor"],
    ["animatemotion", "animateMotion"],
    ["animatetransform", "animateTransform"],
    ["clippath", "clipPath"],
    ["feblend", "feBlend"],
    ["fecolormatrix", "feColorMatrix"],
    ["fecomponenttransfer", "feComponentTransfer"],
    ["fecomposite", "feComposite"],
    ["feconvolvematrix", "feConvolveMatrix"],
    ["fediffuselighting", "feDiffuseLighting"],
    ["fedisplacementmap", "feDisplacementMap"],
    ["fedistantlight", "feDistantLight"],
    ["fedropshadow", "feDropShadow"],
    ["feflood", "feFlood"],
    ["fefunca", "feFuncA"],
    ["fefuncb", "feFuncB"],
    ["fefuncg", "feFuncG"],
    ["fefuncr", "feFuncR"],
    ["fegaussianblur", "feGaussianBlur"],
    ["feimage", "feImage"],
    ["femerge", "feMerge"],
    ["femergenode", "feMergeNode"],
    ["femorphology", "feMorphology"],
    ["feoffset", "feOffset"],
    ["fepointlight", "fePointLight"],
    ["fespecularlighting", "feSpecularLighting"],
    ["fespotlight", "feSpotLight"],
    ["fetile", "feTile"],
    ["feturbulence", "feTurbulence"],
    ["foreignobject", "foreignObject"],
    ["glyphref", "glyphRef"],
    ["lineargradient", "linearGradient"],
    ["radialgradient", "radialGradient"],
    ["textpath", "textPath"]
  ]);
  exports.attributeNames = new Map([
    ["definitionurl", "definitionURL"],
    ["attributename", "attributeName"],
    ["attributetype", "attributeType"],
    ["basefrequency", "baseFrequency"],
    ["baseprofile", "baseProfile"],
    ["calcmode", "calcMode"],
    ["clippathunits", "clipPathUnits"],
    ["diffuseconstant", "diffuseConstant"],
    ["edgemode", "edgeMode"],
    ["filterunits", "filterUnits"],
    ["glyphref", "glyphRef"],
    ["gradienttransform", "gradientTransform"],
    ["gradientunits", "gradientUnits"],
    ["kernelmatrix", "kernelMatrix"],
    ["kernelunitlength", "kernelUnitLength"],
    ["keypoints", "keyPoints"],
    ["keysplines", "keySplines"],
    ["keytimes", "keyTimes"],
    ["lengthadjust", "lengthAdjust"],
    ["limitingconeangle", "limitingConeAngle"],
    ["markerheight", "markerHeight"],
    ["markerunits", "markerUnits"],
    ["markerwidth", "markerWidth"],
    ["maskcontentunits", "maskContentUnits"],
    ["maskunits", "maskUnits"],
    ["numoctaves", "numOctaves"],
    ["pathlength", "pathLength"],
    ["patterncontentunits", "patternContentUnits"],
    ["patterntransform", "patternTransform"],
    ["patternunits", "patternUnits"],
    ["pointsatx", "pointsAtX"],
    ["pointsaty", "pointsAtY"],
    ["pointsatz", "pointsAtZ"],
    ["preservealpha", "preserveAlpha"],
    ["preserveaspectratio", "preserveAspectRatio"],
    ["primitiveunits", "primitiveUnits"],
    ["refx", "refX"],
    ["refy", "refY"],
    ["repeatcount", "repeatCount"],
    ["repeatdur", "repeatDur"],
    ["requiredextensions", "requiredExtensions"],
    ["requiredfeatures", "requiredFeatures"],
    ["specularconstant", "specularConstant"],
    ["specularexponent", "specularExponent"],
    ["spreadmethod", "spreadMethod"],
    ["startoffset", "startOffset"],
    ["stddeviation", "stdDeviation"],
    ["stitchtiles", "stitchTiles"],
    ["surfacescale", "surfaceScale"],
    ["systemlanguage", "systemLanguage"],
    ["tablevalues", "tableValues"],
    ["targetx", "targetX"],
    ["targety", "targetY"],
    ["textlength", "textLength"],
    ["viewbox", "viewBox"],
    ["viewtarget", "viewTarget"],
    ["xchannelselector", "xChannelSelector"],
    ["ychannelselector", "yChannelSelector"],
    ["zoomandpan", "zoomAndPan"]
  ]);
});

// node_modules/.pnpm/dom-serializer@1.2.0/node_modules/dom-serializer/lib/index.js
var require_lib3 = __commonJS((exports) => {
  "use strict";
  var __assign = exports && exports.__assign || function() {
    return __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
      }
      return t;
    }, __assign.apply(this, arguments);
  }, __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    k2 === void 0 && (k2 = k), Object.defineProperty(o, k2, {enumerable: !0, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    k2 === void 0 && (k2 = k), o[k2] = m[k];
  }), __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {enumerable: !0, value: v});
  } : function(o, v) {
    o.default = v;
  }), __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        k !== "default" && Object.prototype.hasOwnProperty.call(mod, k) && __createBinding(result, mod, k);
    return __setModuleDefault(result, mod), result;
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  var ElementType = __importStar(require_lib()), entities_1 = require_lib2(), foreignNames_1 = require_foreignNames(), unencodedElements = new Set([
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript"
  ]);
  function formatAttributes(attributes, opts) {
    if (!!attributes)
      return Object.keys(attributes).map(function(key) {
        var _a, _b, value = (_a = attributes[key]) !== null && _a !== void 0 ? _a : "";
        return opts.xmlMode === "foreign" && (key = (_b = foreignNames_1.attributeNames.get(key)) !== null && _b !== void 0 ? _b : key), !opts.emptyAttrs && !opts.xmlMode && value === "" ? key : key + '="' + (opts.decodeEntities ? entities_1.encodeXML(value) : value.replace(/"/g, "&quot;")) + '"';
      }).join(" ");
  }
  var singleTag = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  function render3(node, options) {
    options === void 0 && (options = {});
    for (var nodes = Array.isArray(node) || node.cheerio ? node : [node], output = "", i = 0; i < nodes.length; i++)
      output += renderNode(nodes[i], options);
    return output;
  }
  exports.default = render3;
  function renderNode(node, options) {
    switch (node.type) {
      case ElementType.Root:
        return render3(node.children, options);
      case ElementType.Directive:
      case ElementType.Doctype:
        return renderDirective(node);
      case ElementType.Comment:
        return renderComment(node);
      case ElementType.CDATA:
        return renderCdata(node);
      case ElementType.Script:
      case ElementType.Style:
      case ElementType.Tag:
        return renderTag(node, options);
      case ElementType.Text:
        return renderText(node, options);
    }
  }
  var foreignModeIntegrationPoints = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title"
  ]), foreignElements = new Set(["svg", "math"]);
  function renderTag(elem, opts) {
    var _a;
    opts.xmlMode === "foreign" && (elem.name = (_a = foreignNames_1.elementNames.get(elem.name)) !== null && _a !== void 0 ? _a : elem.name, elem.parent && foreignModeIntegrationPoints.has(elem.parent.name) && (opts = __assign(__assign({}, opts), {xmlMode: !1}))), !opts.xmlMode && foreignElements.has(elem.name) && (opts = __assign(__assign({}, opts), {xmlMode: "foreign"}));
    var tag = "<" + elem.name, attribs = formatAttributes(elem.attribs, opts);
    return attribs && (tag += " " + attribs), elem.children.length === 0 && (opts.xmlMode ? opts.selfClosingTags !== !1 : opts.selfClosingTags && singleTag.has(elem.name)) ? (opts.xmlMode || (tag += " "), tag += "/>") : (tag += ">", elem.children.length > 0 && (tag += render3(elem.children, opts)), (opts.xmlMode || !singleTag.has(elem.name)) && (tag += "</" + elem.name + ">")), tag;
  }
  function renderDirective(elem) {
    return "<" + elem.data + ">";
  }
  function renderText(elem, opts) {
    var data = elem.data || "";
    return opts.decodeEntities && !(elem.parent && unencodedElements.has(elem.parent.name)) && (data = entities_1.encodeXML(data)), data;
  }
  function renderCdata(elem) {
    return "<![CDATA[" + elem.children[0].data + "]]>";
  }
  function renderComment(elem) {
    return "<!--" + elem.data + "-->";
  }
});

// node_modules/.pnpm/htmlparser2@6.0.1/node_modules/htmlparser2/lib/Tokenizer.js
var require_Tokenizer = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  var decode_codepoint_1 = __importDefault(require_decode_codepoint()), entities_json_1 = __importDefault(require_entities()), legacy_json_1 = __importDefault(require_legacy()), xml_json_1 = __importDefault(require_xml());
  function whitespace(c) {
    return c === " " || c === `
` || c === "	" || c === "\f" || c === "\r";
  }
  function isASCIIAlpha(c) {
    return c >= "a" && c <= "z" || c >= "A" && c <= "Z";
  }
  function ifElseState(upper, SUCCESS, FAILURE) {
    var lower = upper.toLowerCase();
    return upper === lower ? function(t, c) {
      c === lower ? t._state = SUCCESS : (t._state = FAILURE, t._index--);
    } : function(t, c) {
      c === lower || c === upper ? t._state = SUCCESS : (t._state = FAILURE, t._index--);
    };
  }
  function consumeSpecialNameChar(upper, NEXT_STATE) {
    var lower = upper.toLowerCase();
    return function(t, c) {
      c === lower || c === upper ? t._state = NEXT_STATE : (t._state = 3, t._index--);
    };
  }
  var stateBeforeCdata1 = ifElseState("C", 24, 16), stateBeforeCdata2 = ifElseState("D", 25, 16), stateBeforeCdata3 = ifElseState("A", 26, 16), stateBeforeCdata4 = ifElseState("T", 27, 16), stateBeforeCdata5 = ifElseState("A", 28, 16), stateBeforeScript1 = consumeSpecialNameChar("R", 35), stateBeforeScript2 = consumeSpecialNameChar("I", 36), stateBeforeScript3 = consumeSpecialNameChar("P", 37), stateBeforeScript4 = consumeSpecialNameChar("T", 38), stateAfterScript1 = ifElseState("R", 40, 1), stateAfterScript2 = ifElseState("I", 41, 1), stateAfterScript3 = ifElseState("P", 42, 1), stateAfterScript4 = ifElseState("T", 43, 1), stateBeforeStyle1 = consumeSpecialNameChar("Y", 45), stateBeforeStyle2 = consumeSpecialNameChar("L", 46), stateBeforeStyle3 = consumeSpecialNameChar("E", 47), stateAfterStyle1 = ifElseState("Y", 49, 1), stateAfterStyle2 = ifElseState("L", 50, 1), stateAfterStyle3 = ifElseState("E", 51, 1), stateBeforeSpecialT = consumeSpecialNameChar("I", 54), stateBeforeTitle1 = consumeSpecialNameChar("T", 55), stateBeforeTitle2 = consumeSpecialNameChar("L", 56), stateBeforeTitle3 = consumeSpecialNameChar("E", 57), stateAfterSpecialTEnd = ifElseState("I", 58, 1), stateAfterTitle1 = ifElseState("T", 59, 1), stateAfterTitle2 = ifElseState("L", 60, 1), stateAfterTitle3 = ifElseState("E", 61, 1), stateBeforeEntity = ifElseState("#", 63, 64), stateBeforeNumericEntity = ifElseState("X", 66, 65), Tokenizer = function() {
    function Tokenizer2(options, cbs) {
      var _a;
      this._state = 1, this.buffer = "", this.sectionStart = 0, this._index = 0, this.bufferOffset = 0, this.baseState = 1, this.special = 1, this.running = !0, this.ended = !1, this.cbs = cbs, this.xmlMode = !!(options == null ? void 0 : options.xmlMode), this.decodeEntities = (_a = options == null ? void 0 : options.decodeEntities) !== null && _a !== void 0 ? _a : !0;
    }
    return Tokenizer2.prototype.reset = function() {
      this._state = 1, this.buffer = "", this.sectionStart = 0, this._index = 0, this.bufferOffset = 0, this.baseState = 1, this.special = 1, this.running = !0, this.ended = !1;
    }, Tokenizer2.prototype.write = function(chunk) {
      this.ended && this.cbs.onerror(Error(".write() after done!")), this.buffer += chunk, this.parse();
    }, Tokenizer2.prototype.end = function(chunk) {
      this.ended && this.cbs.onerror(Error(".end() after done!")), chunk && this.write(chunk), this.ended = !0, this.running && this.finish();
    }, Tokenizer2.prototype.pause = function() {
      this.running = !1;
    }, Tokenizer2.prototype.resume = function() {
      this.running = !0, this._index < this.buffer.length && this.parse(), this.ended && this.finish();
    }, Tokenizer2.prototype.getAbsoluteIndex = function() {
      return this.bufferOffset + this._index;
    }, Tokenizer2.prototype.stateText = function(c) {
      c === "<" ? (this._index > this.sectionStart && this.cbs.ontext(this.getSection()), this._state = 2, this.sectionStart = this._index) : this.decodeEntities && c === "&" && (this.special === 1 || this.special === 4) && (this._index > this.sectionStart && this.cbs.ontext(this.getSection()), this.baseState = 1, this._state = 62, this.sectionStart = this._index);
    }, Tokenizer2.prototype.stateBeforeTagName = function(c) {
      c === "/" ? this._state = 5 : c === "<" ? (this.cbs.ontext(this.getSection()), this.sectionStart = this._index) : c === ">" || this.special !== 1 || whitespace(c) ? this._state = 1 : c === "!" ? (this._state = 15, this.sectionStart = this._index + 1) : c === "?" ? (this._state = 17, this.sectionStart = this._index + 1) : isASCIIAlpha(c) ? (this._state = !this.xmlMode && (c === "s" || c === "S") ? 32 : !this.xmlMode && (c === "t" || c === "T") ? 52 : 3, this.sectionStart = this._index) : this._state = 1;
    }, Tokenizer2.prototype.stateInTagName = function(c) {
      (c === "/" || c === ">" || whitespace(c)) && (this.emitToken("onopentagname"), this._state = 8, this._index--);
    }, Tokenizer2.prototype.stateBeforeClosingTagName = function(c) {
      whitespace(c) || (c === ">" ? this._state = 1 : this.special !== 1 ? this.special !== 4 && (c === "s" || c === "S") ? this._state = 33 : this.special === 4 && (c === "t" || c === "T") ? this._state = 53 : (this._state = 1, this._index--) : isASCIIAlpha(c) ? (this._state = 6, this.sectionStart = this._index) : (this._state = 20, this.sectionStart = this._index));
    }, Tokenizer2.prototype.stateInClosingTagName = function(c) {
      (c === ">" || whitespace(c)) && (this.emitToken("onclosetag"), this._state = 7, this._index--);
    }, Tokenizer2.prototype.stateAfterClosingTagName = function(c) {
      c === ">" && (this._state = 1, this.sectionStart = this._index + 1);
    }, Tokenizer2.prototype.stateBeforeAttributeName = function(c) {
      c === ">" ? (this.cbs.onopentagend(), this._state = 1, this.sectionStart = this._index + 1) : c === "/" ? this._state = 4 : whitespace(c) || (this._state = 9, this.sectionStart = this._index);
    }, Tokenizer2.prototype.stateInSelfClosingTag = function(c) {
      c === ">" ? (this.cbs.onselfclosingtag(), this._state = 1, this.sectionStart = this._index + 1, this.special = 1) : whitespace(c) || (this._state = 8, this._index--);
    }, Tokenizer2.prototype.stateInAttributeName = function(c) {
      (c === "=" || c === "/" || c === ">" || whitespace(c)) && (this.cbs.onattribname(this.getSection()), this.sectionStart = -1, this._state = 10, this._index--);
    }, Tokenizer2.prototype.stateAfterAttributeName = function(c) {
      c === "=" ? this._state = 11 : c === "/" || c === ">" ? (this.cbs.onattribend(void 0), this._state = 8, this._index--) : whitespace(c) || (this.cbs.onattribend(void 0), this._state = 9, this.sectionStart = this._index);
    }, Tokenizer2.prototype.stateBeforeAttributeValue = function(c) {
      c === '"' ? (this._state = 12, this.sectionStart = this._index + 1) : c === "'" ? (this._state = 13, this.sectionStart = this._index + 1) : whitespace(c) || (this._state = 14, this.sectionStart = this._index, this._index--);
    }, Tokenizer2.prototype.handleInAttributeValue = function(c, quote) {
      c === quote ? (this.emitToken("onattribdata"), this.cbs.onattribend(quote), this._state = 8) : this.decodeEntities && c === "&" && (this.emitToken("onattribdata"), this.baseState = this._state, this._state = 62, this.sectionStart = this._index);
    }, Tokenizer2.prototype.stateInAttributeValueDoubleQuotes = function(c) {
      this.handleInAttributeValue(c, '"');
    }, Tokenizer2.prototype.stateInAttributeValueSingleQuotes = function(c) {
      this.handleInAttributeValue(c, "'");
    }, Tokenizer2.prototype.stateInAttributeValueNoQuotes = function(c) {
      whitespace(c) || c === ">" ? (this.emitToken("onattribdata"), this.cbs.onattribend(null), this._state = 8, this._index--) : this.decodeEntities && c === "&" && (this.emitToken("onattribdata"), this.baseState = this._state, this._state = 62, this.sectionStart = this._index);
    }, Tokenizer2.prototype.stateBeforeDeclaration = function(c) {
      this._state = c === "[" ? 23 : c === "-" ? 18 : 16;
    }, Tokenizer2.prototype.stateInDeclaration = function(c) {
      c === ">" && (this.cbs.ondeclaration(this.getSection()), this._state = 1, this.sectionStart = this._index + 1);
    }, Tokenizer2.prototype.stateInProcessingInstruction = function(c) {
      c === ">" && (this.cbs.onprocessinginstruction(this.getSection()), this._state = 1, this.sectionStart = this._index + 1);
    }, Tokenizer2.prototype.stateBeforeComment = function(c) {
      c === "-" ? (this._state = 19, this.sectionStart = this._index + 1) : this._state = 16;
    }, Tokenizer2.prototype.stateInComment = function(c) {
      c === "-" && (this._state = 21);
    }, Tokenizer2.prototype.stateInSpecialComment = function(c) {
      c === ">" && (this.cbs.oncomment(this.buffer.substring(this.sectionStart, this._index)), this._state = 1, this.sectionStart = this._index + 1);
    }, Tokenizer2.prototype.stateAfterComment1 = function(c) {
      c === "-" ? this._state = 22 : this._state = 19;
    }, Tokenizer2.prototype.stateAfterComment2 = function(c) {
      c === ">" ? (this.cbs.oncomment(this.buffer.substring(this.sectionStart, this._index - 2)), this._state = 1, this.sectionStart = this._index + 1) : c !== "-" && (this._state = 19);
    }, Tokenizer2.prototype.stateBeforeCdata6 = function(c) {
      c === "[" ? (this._state = 29, this.sectionStart = this._index + 1) : (this._state = 16, this._index--);
    }, Tokenizer2.prototype.stateInCdata = function(c) {
      c === "]" && (this._state = 30);
    }, Tokenizer2.prototype.stateAfterCdata1 = function(c) {
      c === "]" ? this._state = 31 : this._state = 29;
    }, Tokenizer2.prototype.stateAfterCdata2 = function(c) {
      c === ">" ? (this.cbs.oncdata(this.buffer.substring(this.sectionStart, this._index - 2)), this._state = 1, this.sectionStart = this._index + 1) : c !== "]" && (this._state = 29);
    }, Tokenizer2.prototype.stateBeforeSpecialS = function(c) {
      c === "c" || c === "C" ? this._state = 34 : c === "t" || c === "T" ? this._state = 44 : (this._state = 3, this._index--);
    }, Tokenizer2.prototype.stateBeforeSpecialSEnd = function(c) {
      this.special === 2 && (c === "c" || c === "C") ? this._state = 39 : this.special === 3 && (c === "t" || c === "T") ? this._state = 48 : this._state = 1;
    }, Tokenizer2.prototype.stateBeforeSpecialLast = function(c, special) {
      (c === "/" || c === ">" || whitespace(c)) && (this.special = special), this._state = 3, this._index--;
    }, Tokenizer2.prototype.stateAfterSpecialLast = function(c, sectionStartOffset) {
      c === ">" || whitespace(c) ? (this.special = 1, this._state = 6, this.sectionStart = this._index - sectionStartOffset, this._index--) : this._state = 1;
    }, Tokenizer2.prototype.parseFixedEntity = function(map) {
      if (map === void 0 && (map = this.xmlMode ? xml_json_1.default : entities_json_1.default), this.sectionStart + 1 < this._index) {
        var entity = this.buffer.substring(this.sectionStart + 1, this._index);
        Object.prototype.hasOwnProperty.call(map, entity) && (this.emitPartial(map[entity]), this.sectionStart = this._index + 1);
      }
    }, Tokenizer2.prototype.parseLegacyEntity = function() {
      for (var start = this.sectionStart + 1, limit = Math.min(this._index - start, 6); limit >= 2; ) {
        var entity = this.buffer.substr(start, limit);
        if (Object.prototype.hasOwnProperty.call(legacy_json_1.default, entity)) {
          this.emitPartial(legacy_json_1.default[entity]), this.sectionStart += limit + 1;
          return;
        }
        limit--;
      }
    }, Tokenizer2.prototype.stateInNamedEntity = function(c) {
      c === ";" ? (this.parseFixedEntity(), this.baseState === 1 && this.sectionStart + 1 < this._index && !this.xmlMode && this.parseLegacyEntity(), this._state = this.baseState) : (c < "0" || c > "9") && !isASCIIAlpha(c) && (this.xmlMode || this.sectionStart + 1 === this._index || (this.baseState !== 1 ? c !== "=" && this.parseFixedEntity(legacy_json_1.default) : this.parseLegacyEntity()), this._state = this.baseState, this._index--);
    }, Tokenizer2.prototype.decodeNumericEntity = function(offset, base, strict) {
      var sectionStart = this.sectionStart + offset;
      if (sectionStart !== this._index) {
        var entity = this.buffer.substring(sectionStart, this._index), parsed = parseInt(entity, base);
        this.emitPartial(decode_codepoint_1.default(parsed)), this.sectionStart = strict ? this._index + 1 : this._index;
      }
      this._state = this.baseState;
    }, Tokenizer2.prototype.stateInNumericEntity = function(c) {
      c === ";" ? this.decodeNumericEntity(2, 10, !0) : (c < "0" || c > "9") && (this.xmlMode ? this._state = this.baseState : this.decodeNumericEntity(2, 10, !1), this._index--);
    }, Tokenizer2.prototype.stateInHexEntity = function(c) {
      c === ";" ? this.decodeNumericEntity(3, 16, !0) : (c < "a" || c > "f") && (c < "A" || c > "F") && (c < "0" || c > "9") && (this.xmlMode ? this._state = this.baseState : this.decodeNumericEntity(3, 16, !1), this._index--);
    }, Tokenizer2.prototype.cleanup = function() {
      this.sectionStart < 0 ? (this.buffer = "", this.bufferOffset += this._index, this._index = 0) : this.running && (this._state === 1 ? (this.sectionStart !== this._index && this.cbs.ontext(this.buffer.substr(this.sectionStart)), this.buffer = "", this.bufferOffset += this._index, this._index = 0) : this.sectionStart === this._index ? (this.buffer = "", this.bufferOffset += this._index, this._index = 0) : (this.buffer = this.buffer.substr(this.sectionStart), this._index -= this.sectionStart, this.bufferOffset += this.sectionStart), this.sectionStart = 0);
    }, Tokenizer2.prototype.parse = function() {
      for (; this._index < this.buffer.length && this.running; ) {
        var c = this.buffer.charAt(this._index);
        this._state === 1 ? this.stateText(c) : this._state === 12 ? this.stateInAttributeValueDoubleQuotes(c) : this._state === 9 ? this.stateInAttributeName(c) : this._state === 19 ? this.stateInComment(c) : this._state === 20 ? this.stateInSpecialComment(c) : this._state === 8 ? this.stateBeforeAttributeName(c) : this._state === 3 ? this.stateInTagName(c) : this._state === 6 ? this.stateInClosingTagName(c) : this._state === 2 ? this.stateBeforeTagName(c) : this._state === 10 ? this.stateAfterAttributeName(c) : this._state === 13 ? this.stateInAttributeValueSingleQuotes(c) : this._state === 11 ? this.stateBeforeAttributeValue(c) : this._state === 5 ? this.stateBeforeClosingTagName(c) : this._state === 7 ? this.stateAfterClosingTagName(c) : this._state === 32 ? this.stateBeforeSpecialS(c) : this._state === 21 ? this.stateAfterComment1(c) : this._state === 14 ? this.stateInAttributeValueNoQuotes(c) : this._state === 4 ? this.stateInSelfClosingTag(c) : this._state === 16 ? this.stateInDeclaration(c) : this._state === 15 ? this.stateBeforeDeclaration(c) : this._state === 22 ? this.stateAfterComment2(c) : this._state === 18 ? this.stateBeforeComment(c) : this._state === 33 ? this.stateBeforeSpecialSEnd(c) : this._state === 53 ? stateAfterSpecialTEnd(this, c) : this._state === 39 ? stateAfterScript1(this, c) : this._state === 40 ? stateAfterScript2(this, c) : this._state === 41 ? stateAfterScript3(this, c) : this._state === 34 ? stateBeforeScript1(this, c) : this._state === 35 ? stateBeforeScript2(this, c) : this._state === 36 ? stateBeforeScript3(this, c) : this._state === 37 ? stateBeforeScript4(this, c) : this._state === 38 ? this.stateBeforeSpecialLast(c, 2) : this._state === 42 ? stateAfterScript4(this, c) : this._state === 43 ? this.stateAfterSpecialLast(c, 6) : this._state === 44 ? stateBeforeStyle1(this, c) : this._state === 29 ? this.stateInCdata(c) : this._state === 45 ? stateBeforeStyle2(this, c) : this._state === 46 ? stateBeforeStyle3(this, c) : this._state === 47 ? this.stateBeforeSpecialLast(c, 3) : this._state === 48 ? stateAfterStyle1(this, c) : this._state === 49 ? stateAfterStyle2(this, c) : this._state === 50 ? stateAfterStyle3(this, c) : this._state === 51 ? this.stateAfterSpecialLast(c, 5) : this._state === 52 ? stateBeforeSpecialT(this, c) : this._state === 54 ? stateBeforeTitle1(this, c) : this._state === 55 ? stateBeforeTitle2(this, c) : this._state === 56 ? stateBeforeTitle3(this, c) : this._state === 57 ? this.stateBeforeSpecialLast(c, 4) : this._state === 58 ? stateAfterTitle1(this, c) : this._state === 59 ? stateAfterTitle2(this, c) : this._state === 60 ? stateAfterTitle3(this, c) : this._state === 61 ? this.stateAfterSpecialLast(c, 5) : this._state === 17 ? this.stateInProcessingInstruction(c) : this._state === 64 ? this.stateInNamedEntity(c) : this._state === 23 ? stateBeforeCdata1(this, c) : this._state === 62 ? stateBeforeEntity(this, c) : this._state === 24 ? stateBeforeCdata2(this, c) : this._state === 25 ? stateBeforeCdata3(this, c) : this._state === 30 ? this.stateAfterCdata1(c) : this._state === 31 ? this.stateAfterCdata2(c) : this._state === 26 ? stateBeforeCdata4(this, c) : this._state === 27 ? stateBeforeCdata5(this, c) : this._state === 28 ? this.stateBeforeCdata6(c) : this._state === 66 ? this.stateInHexEntity(c) : this._state === 65 ? this.stateInNumericEntity(c) : this._state === 63 ? stateBeforeNumericEntity(this, c) : this.cbs.onerror(Error("unknown _state"), this._state), this._index++;
      }
      this.cleanup();
    }, Tokenizer2.prototype.finish = function() {
      this.sectionStart < this._index && this.handleTrailingData(), this.cbs.onend();
    }, Tokenizer2.prototype.handleTrailingData = function() {
      var data = this.buffer.substr(this.sectionStart);
      this._state === 29 || this._state === 30 || this._state === 31 ? this.cbs.oncdata(data) : this._state === 19 || this._state === 21 || this._state === 22 ? this.cbs.oncomment(data) : this._state === 64 && !this.xmlMode ? (this.parseLegacyEntity(), this.sectionStart < this._index && (this._state = this.baseState, this.handleTrailingData())) : this._state === 65 && !this.xmlMode ? (this.decodeNumericEntity(2, 10, !1), this.sectionStart < this._index && (this._state = this.baseState, this.handleTrailingData())) : this._state === 66 && !this.xmlMode ? (this.decodeNumericEntity(3, 16, !1), this.sectionStart < this._index && (this._state = this.baseState, this.handleTrailingData())) : this._state !== 3 && this._state !== 8 && this._state !== 11 && this._state !== 10 && this._state !== 9 && this._state !== 13 && this._state !== 12 && this._state !== 14 && this._state !== 6 && this.cbs.ontext(data);
    }, Tokenizer2.prototype.getSection = function() {
      return this.buffer.substring(this.sectionStart, this._index);
    }, Tokenizer2.prototype.emitToken = function(name) {
      this.cbs[name](this.getSection()), this.sectionStart = -1;
    }, Tokenizer2.prototype.emitPartial = function(value) {
      this.baseState !== 1 ? this.cbs.onattribdata(value) : this.cbs.ontext(value);
    }, Tokenizer2;
  }();
  exports.default = Tokenizer;
});

// node_modules/.pnpm/htmlparser2@6.0.1/node_modules/htmlparser2/lib/Parser.js
var require_Parser = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.Parser = void 0;
  var Tokenizer_1 = __importDefault(require_Tokenizer()), formTags = new Set([
    "input",
    "option",
    "optgroup",
    "select",
    "button",
    "datalist",
    "textarea"
  ]), pTag = new Set(["p"]), openImpliesClose = {
    tr: new Set(["tr", "th", "td"]),
    th: new Set(["th"]),
    td: new Set(["thead", "th", "td"]),
    body: new Set(["head", "link", "script"]),
    li: new Set(["li"]),
    p: pTag,
    h1: pTag,
    h2: pTag,
    h3: pTag,
    h4: pTag,
    h5: pTag,
    h6: pTag,
    select: formTags,
    input: formTags,
    output: formTags,
    button: formTags,
    datalist: formTags,
    textarea: formTags,
    option: new Set(["option"]),
    optgroup: new Set(["optgroup", "option"]),
    dd: new Set(["dt", "dd"]),
    dt: new Set(["dt", "dd"]),
    address: pTag,
    article: pTag,
    aside: pTag,
    blockquote: pTag,
    details: pTag,
    div: pTag,
    dl: pTag,
    fieldset: pTag,
    figcaption: pTag,
    figure: pTag,
    footer: pTag,
    form: pTag,
    header: pTag,
    hr: pTag,
    main: pTag,
    nav: pTag,
    ol: pTag,
    pre: pTag,
    section: pTag,
    table: pTag,
    ul: pTag,
    rt: new Set(["rt", "rp"]),
    rp: new Set(["rt", "rp"]),
    tbody: new Set(["thead", "tbody"]),
    tfoot: new Set(["thead", "tbody"])
  }, voidElements = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]), foreignContextElements = new Set(["math", "svg"]), htmlIntegrationElements = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title"
  ]), reNameEnd = /\s|\//, Parser2 = function() {
    function Parser3(cbs, options) {
      options === void 0 && (options = {});
      var _a, _b, _c, _d, _e;
      this.startIndex = 0, this.endIndex = null, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.foreignContext = [], this.options = options, this.cbs = cbs ?? {}, this.lowerCaseTagNames = (_a = options.lowerCaseTags) !== null && _a !== void 0 ? _a : !options.xmlMode, this.lowerCaseAttributeNames = (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : !options.xmlMode, this.tokenizer = new ((_c = options.Tokenizer) !== null && _c !== void 0 ? _c : Tokenizer_1.default)(this.options, this), (_e = (_d = this.cbs).onparserinit) === null || _e === void 0 || _e.call(_d, this);
    }
    return Parser3.prototype.updatePosition = function(initialOffset) {
      this.endIndex === null ? this.tokenizer.sectionStart <= initialOffset ? this.startIndex = 0 : this.startIndex = this.tokenizer.sectionStart - initialOffset : this.startIndex = this.endIndex + 1, this.endIndex = this.tokenizer.getAbsoluteIndex();
    }, Parser3.prototype.ontext = function(data) {
      var _a, _b;
      this.updatePosition(1), this.endIndex--, (_b = (_a = this.cbs).ontext) === null || _b === void 0 || _b.call(_a, data);
    }, Parser3.prototype.onopentagname = function(name) {
      var _a, _b;
      if (this.lowerCaseTagNames && (name = name.toLowerCase()), this.tagname = name, !this.options.xmlMode && Object.prototype.hasOwnProperty.call(openImpliesClose, name))
        for (var el = void 0; this.stack.length > 0 && openImpliesClose[name].has(el = this.stack[this.stack.length - 1]); )
          this.onclosetag(el);
      (this.options.xmlMode || !voidElements.has(name)) && (this.stack.push(name), foreignContextElements.has(name) ? this.foreignContext.push(!0) : htmlIntegrationElements.has(name) && this.foreignContext.push(!1)), (_b = (_a = this.cbs).onopentagname) === null || _b === void 0 || _b.call(_a, name), this.cbs.onopentag && (this.attribs = {});
    }, Parser3.prototype.onopentagend = function() {
      var _a, _b;
      this.updatePosition(1), this.attribs && ((_b = (_a = this.cbs).onopentag) === null || _b === void 0 || _b.call(_a, this.tagname, this.attribs), this.attribs = null), !this.options.xmlMode && this.cbs.onclosetag && voidElements.has(this.tagname) && this.cbs.onclosetag(this.tagname), this.tagname = "";
    }, Parser3.prototype.onclosetag = function(name) {
      if (this.updatePosition(1), this.lowerCaseTagNames && (name = name.toLowerCase()), (foreignContextElements.has(name) || htmlIntegrationElements.has(name)) && this.foreignContext.pop(), this.stack.length && (this.options.xmlMode || !voidElements.has(name))) {
        var pos = this.stack.lastIndexOf(name);
        if (pos !== -1)
          if (this.cbs.onclosetag)
            for (pos = this.stack.length - pos; pos--; )
              this.cbs.onclosetag(this.stack.pop());
          else
            this.stack.length = pos;
        else
          name === "p" && !this.options.xmlMode && (this.onopentagname(name), this.closeCurrentTag());
      } else
        !this.options.xmlMode && (name === "br" || name === "p") && (this.onopentagname(name), this.closeCurrentTag());
    }, Parser3.prototype.onselfclosingtag = function() {
      this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1] ? this.closeCurrentTag() : this.onopentagend();
    }, Parser3.prototype.closeCurrentTag = function() {
      var _a, _b, name = this.tagname;
      this.onopentagend(), this.stack[this.stack.length - 1] === name && ((_b = (_a = this.cbs).onclosetag) === null || _b === void 0 || _b.call(_a, name), this.stack.pop());
    }, Parser3.prototype.onattribname = function(name) {
      this.lowerCaseAttributeNames && (name = name.toLowerCase()), this.attribname = name;
    }, Parser3.prototype.onattribdata = function(value) {
      this.attribvalue += value;
    }, Parser3.prototype.onattribend = function(quote) {
      var _a, _b;
      (_b = (_a = this.cbs).onattribute) === null || _b === void 0 || _b.call(_a, this.attribname, this.attribvalue, quote), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribname = "", this.attribvalue = "";
    }, Parser3.prototype.getInstructionName = function(value) {
      var idx = value.search(reNameEnd), name = idx < 0 ? value : value.substr(0, idx);
      return this.lowerCaseTagNames && (name = name.toLowerCase()), name;
    }, Parser3.prototype.ondeclaration = function(value) {
      if (this.cbs.onprocessinginstruction) {
        var name_1 = this.getInstructionName(value);
        this.cbs.onprocessinginstruction("!" + name_1, "!" + value);
      }
    }, Parser3.prototype.onprocessinginstruction = function(value) {
      if (this.cbs.onprocessinginstruction) {
        var name_2 = this.getInstructionName(value);
        this.cbs.onprocessinginstruction("?" + name_2, "?" + value);
      }
    }, Parser3.prototype.oncomment = function(value) {
      var _a, _b, _c, _d;
      this.updatePosition(4), (_b = (_a = this.cbs).oncomment) === null || _b === void 0 || _b.call(_a, value), (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 || _d.call(_c);
    }, Parser3.prototype.oncdata = function(value) {
      var _a, _b, _c, _d, _e, _f;
      this.updatePosition(1), this.options.xmlMode || this.options.recognizeCDATA ? ((_b = (_a = this.cbs).oncdatastart) === null || _b === void 0 || _b.call(_a), (_d = (_c = this.cbs).ontext) === null || _d === void 0 || _d.call(_c, value), (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 || _f.call(_e)) : this.oncomment("[CDATA[" + value + "]]");
    }, Parser3.prototype.onerror = function(err) {
      var _a, _b;
      (_b = (_a = this.cbs).onerror) === null || _b === void 0 || _b.call(_a, err);
    }, Parser3.prototype.onend = function() {
      var _a, _b;
      if (this.cbs.onclosetag)
        for (var i = this.stack.length; i > 0; this.cbs.onclosetag(this.stack[--i]))
          ;
      (_b = (_a = this.cbs).onend) === null || _b === void 0 || _b.call(_a);
    }, Parser3.prototype.reset = function() {
      var _a, _b, _c, _d;
      (_b = (_a = this.cbs).onreset) === null || _b === void 0 || _b.call(_a), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack = [], (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 || _d.call(_c, this);
    }, Parser3.prototype.parseComplete = function(data) {
      this.reset(), this.end(data);
    }, Parser3.prototype.write = function(chunk) {
      this.tokenizer.write(chunk);
    }, Parser3.prototype.end = function(chunk) {
      this.tokenizer.end(chunk);
    }, Parser3.prototype.pause = function() {
      this.tokenizer.pause();
    }, Parser3.prototype.resume = function() {
      this.tokenizer.resume();
    }, Parser3.prototype.parseChunk = function(chunk) {
      this.write(chunk);
    }, Parser3.prototype.done = function(chunk) {
      this.end(chunk);
    }, Parser3;
  }();
  exports.Parser = Parser2;
});

// node_modules/.pnpm/domhandler@4.0.0/node_modules/domhandler/lib/node.js
var require_node = __commonJS((exports) => {
  "use strict";
  var __extends = exports && exports.__extends || function() {
    var extendStatics = function(d, b) {
      return extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          Object.prototype.hasOwnProperty.call(b2, p) && (d2[p] = b2[p]);
      }, extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }(), __assign = exports && exports.__assign || function() {
    return __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
      }
      return t;
    }, __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.cloneNode = exports.Element = exports.Document = exports.NodeWithChildren = exports.ProcessingInstruction = exports.Comment = exports.Text = exports.DataNode = exports.Node = void 0;
  var nodeTypes = new Map([
    ["tag", 1],
    ["script", 1],
    ["style", 1],
    ["directive", 1],
    ["text", 3],
    ["cdata", 4],
    ["comment", 8],
    ["root", 9]
  ]), Node = function() {
    function Node2(type) {
      this.type = type, this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    return Object.defineProperty(Node2.prototype, "nodeType", {
      get: function() {
        var _a;
        return (_a = nodeTypes.get(this.type)) !== null && _a !== void 0 ? _a : 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(Node2.prototype, "parentNode", {
      get: function() {
        return this.parent;
      },
      set: function(parent) {
        this.parent = parent;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(Node2.prototype, "previousSibling", {
      get: function() {
        return this.prev;
      },
      set: function(prev) {
        this.prev = prev;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(Node2.prototype, "nextSibling", {
      get: function() {
        return this.next;
      },
      set: function(next) {
        this.next = next;
      },
      enumerable: !1,
      configurable: !0
    }), Node2.prototype.cloneNode = function(recursive) {
      return recursive === void 0 && (recursive = !1), cloneNode(this, recursive);
    }, Node2;
  }();
  exports.Node = Node;
  var DataNode = function(_super) {
    __extends(DataNode2, _super);
    function DataNode2(type, data) {
      var _this = _super.call(this, type) || this;
      return _this.data = data, _this;
    }
    return Object.defineProperty(DataNode2.prototype, "nodeValue", {
      get: function() {
        return this.data;
      },
      set: function(data) {
        this.data = data;
      },
      enumerable: !1,
      configurable: !0
    }), DataNode2;
  }(Node);
  exports.DataNode = DataNode;
  var Text = function(_super) {
    __extends(Text2, _super);
    function Text2(data) {
      return _super.call(this, "text", data) || this;
    }
    return Text2;
  }(DataNode);
  exports.Text = Text;
  var Comment = function(_super) {
    __extends(Comment2, _super);
    function Comment2(data) {
      return _super.call(this, "comment", data) || this;
    }
    return Comment2;
  }(DataNode);
  exports.Comment = Comment;
  var ProcessingInstruction = function(_super) {
    __extends(ProcessingInstruction2, _super);
    function ProcessingInstruction2(name, data) {
      var _this = _super.call(this, "directive", data) || this;
      return _this.name = name, _this;
    }
    return ProcessingInstruction2;
  }(DataNode);
  exports.ProcessingInstruction = ProcessingInstruction;
  var NodeWithChildren = function(_super) {
    __extends(NodeWithChildren2, _super);
    function NodeWithChildren2(type, children) {
      var _this = _super.call(this, type) || this;
      return _this.children = children, _this;
    }
    return Object.defineProperty(NodeWithChildren2.prototype, "firstChild", {
      get: function() {
        var _a;
        return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(NodeWithChildren2.prototype, "lastChild", {
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(NodeWithChildren2.prototype, "childNodes", {
      get: function() {
        return this.children;
      },
      set: function(children) {
        this.children = children;
      },
      enumerable: !1,
      configurable: !0
    }), NodeWithChildren2;
  }(Node);
  exports.NodeWithChildren = NodeWithChildren;
  var Document = function(_super) {
    __extends(Document2, _super);
    function Document2(children) {
      return _super.call(this, "root", children) || this;
    }
    return Document2;
  }(NodeWithChildren);
  exports.Document = Document;
  var Element = function(_super) {
    __extends(Element2, _super);
    function Element2(name, attribs, children) {
      children === void 0 && (children = []);
      var _this = _super.call(this, name === "script" ? "script" : name === "style" ? "style" : "tag", children) || this;
      return _this.name = name, _this.attribs = attribs, _this.attribs = attribs, _this;
    }
    return Object.defineProperty(Element2.prototype, "tagName", {
      get: function() {
        return this.name;
      },
      set: function(name) {
        this.name = name;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(Element2.prototype, "attributes", {
      get: function() {
        var _this = this;
        return Object.keys(this.attribs).map(function(name) {
          var _a, _b;
          return {
            name,
            value: _this.attribs[name],
            namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
            prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name]
          };
        });
      },
      enumerable: !1,
      configurable: !0
    }), Element2;
  }(NodeWithChildren);
  exports.Element = Element;
  function cloneNode(node, recursive) {
    recursive === void 0 && (recursive = !1);
    var result;
    switch (node.type) {
      case "text":
        result = new Text(node.data);
        break;
      case "directive": {
        var instr = node;
        result = new ProcessingInstruction(instr.name, instr.data), instr["x-name"] != null && (result["x-name"] = instr["x-name"], result["x-publicId"] = instr["x-publicId"], result["x-systemId"] = instr["x-systemId"]);
        break;
      }
      case "comment":
        result = new Comment(node.data);
        break;
      case "tag":
      case "script":
      case "style": {
        var elem = node, children = recursive ? cloneChildren(elem.children) : [], clone_1 = new Element(elem.name, __assign({}, elem.attribs), children);
        children.forEach(function(child) {
          return child.parent = clone_1;
        }), elem["x-attribsNamespace"] && (clone_1["x-attribsNamespace"] = __assign({}, elem["x-attribsNamespace"])), elem["x-attribsPrefix"] && (clone_1["x-attribsPrefix"] = __assign({}, elem["x-attribsPrefix"])), result = clone_1;
        break;
      }
      case "cdata": {
        var cdata = node, children = recursive ? cloneChildren(cdata.children) : [], clone_2 = new NodeWithChildren(node.type, children);
        children.forEach(function(child) {
          return child.parent = clone_2;
        }), result = clone_2;
        break;
      }
      case "root": {
        var doc = node, children = recursive ? cloneChildren(doc.children) : [], clone_3 = new Document(children);
        children.forEach(function(child) {
          return child.parent = clone_3;
        }), doc["x-mode"] && (clone_3["x-mode"] = doc["x-mode"]), result = clone_3;
        break;
      }
      case "doctype":
        throw new Error("Not implemented yet: ElementType.Doctype case");
    }
    return result.startIndex = node.startIndex, result.endIndex = node.endIndex, result;
  }
  exports.cloneNode = cloneNode;
  function cloneChildren(childs) {
    for (var children = childs.map(function(child) {
      return cloneNode(child, !0);
    }), i = 1; i < children.length; i++)
      children[i].prev = children[i - 1], children[i - 1].next = children[i];
    return children;
  }
});

// node_modules/.pnpm/domhandler@4.0.0/node_modules/domhandler/lib/index.js
var require_lib4 = __commonJS((exports) => {
  "use strict";
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    k2 === void 0 && (k2 = k), Object.defineProperty(o, k2, {enumerable: !0, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    k2 === void 0 && (k2 = k), o[k2] = m[k];
  }), __exportStar2 = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p) && __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.DomHandler = void 0;
  var node_1 = require_node();
  __exportStar2(require_node(), exports);
  var reWhitespace = /\s+/g, defaultOpts = {
    normalizeWhitespace: !1,
    withStartIndices: !1,
    withEndIndices: !1
  }, DomHandler2 = function() {
    function DomHandler3(callback, options, elementCB) {
      this.dom = [], this.root = new node_1.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof options == "function" && (elementCB = options, options = defaultOpts), typeof callback == "object" && (options = callback, callback = void 0), this.callback = callback ?? null, this.options = options ?? defaultOpts, this.elementCB = elementCB ?? null;
    }
    return DomHandler3.prototype.onparserinit = function(parser) {
      this.parser = parser;
    }, DomHandler3.prototype.onreset = function() {
      var _a;
      this.dom = [], this.root = new node_1.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = (_a = this.parser) !== null && _a !== void 0 ? _a : null;
    }, DomHandler3.prototype.onend = function() {
      this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
    }, DomHandler3.prototype.onerror = function(error) {
      this.handleCallback(error);
    }, DomHandler3.prototype.onclosetag = function() {
      this.lastNode = null;
      var elem = this.tagStack.pop();
      this.options.withEndIndices && (elem.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(elem);
    }, DomHandler3.prototype.onopentag = function(name, attribs) {
      var element = new node_1.Element(name, attribs);
      this.addNode(element), this.tagStack.push(element);
    }, DomHandler3.prototype.ontext = function(data) {
      var normalizeWhitespace = this.options.normalizeWhitespace, lastNode = this.lastNode;
      if (lastNode && lastNode.type === "text")
        normalizeWhitespace ? lastNode.data = (lastNode.data + data).replace(reWhitespace, " ") : lastNode.data += data;
      else {
        normalizeWhitespace && (data = data.replace(reWhitespace, " "));
        var node = new node_1.Text(data);
        this.addNode(node), this.lastNode = node;
      }
    }, DomHandler3.prototype.oncomment = function(data) {
      if (this.lastNode && this.lastNode.type === "comment") {
        this.lastNode.data += data;
        return;
      }
      var node = new node_1.Comment(data);
      this.addNode(node), this.lastNode = node;
    }, DomHandler3.prototype.oncommentend = function() {
      this.lastNode = null;
    }, DomHandler3.prototype.oncdatastart = function() {
      var text = new node_1.Text(""), node = new node_1.NodeWithChildren("cdata", [text]);
      this.addNode(node), text.parent = node, this.lastNode = text;
    }, DomHandler3.prototype.oncdataend = function() {
      this.lastNode = null;
    }, DomHandler3.prototype.onprocessinginstruction = function(name, data) {
      var node = new node_1.ProcessingInstruction(name, data);
      this.addNode(node);
    }, DomHandler3.prototype.handleCallback = function(error) {
      if (typeof this.callback == "function")
        this.callback(error, this.dom);
      else if (error)
        throw error;
    }, DomHandler3.prototype.addNode = function(node) {
      var parent = this.tagStack[this.tagStack.length - 1], previousSibling = parent.children[parent.children.length - 1];
      this.options.withStartIndices && (node.startIndex = this.parser.startIndex), this.options.withEndIndices && (node.endIndex = this.parser.endIndex), parent.children.push(node), previousSibling && (node.prev = previousSibling, previousSibling.next = node), node.parent = parent, this.lastNode = null;
    }, DomHandler3.prototype.addDataNode = function(node) {
      this.addNode(node), this.lastNode = node;
    }, DomHandler3;
  }();
  exports.DomHandler = DomHandler2;
  exports.default = DomHandler2;
});

// node_modules/.pnpm/domutils@2.4.4/node_modules/domutils/lib/tagtypes.js
var require_tagtypes = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.hasChildren = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = void 0;
  var domelementtype_1 = require_lib();
  function isTag(node) {
    return domelementtype_1.isTag(node);
  }
  exports.isTag = isTag;
  function isCDATA(node) {
    return node.type === "cdata";
  }
  exports.isCDATA = isCDATA;
  function isText(node) {
    return node.type === "text";
  }
  exports.isText = isText;
  function isComment(node) {
    return node.type === "comment";
  }
  exports.isComment = isComment;
  function hasChildren(node) {
    return Object.prototype.hasOwnProperty.call(node, "children");
  }
  exports.hasChildren = hasChildren;
});

// node_modules/.pnpm/domutils@2.4.4/node_modules/domutils/lib/stringify.js
var require_stringify = __commonJS((exports) => {
  "use strict";
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.getText = exports.getInnerHTML = exports.getOuterHTML = void 0;
  var tagtypes_1 = require_tagtypes(), dom_serializer_1 = __importDefault(require_lib3());
  function getOuterHTML(node, options) {
    return dom_serializer_1.default(node, options);
  }
  exports.getOuterHTML = getOuterHTML;
  function getInnerHTML(node, options) {
    return tagtypes_1.hasChildren(node) ? node.children.map(function(node2) {
      return getOuterHTML(node2, options);
    }).join("") : "";
  }
  exports.getInnerHTML = getInnerHTML;
  function getText(node) {
    return Array.isArray(node) ? node.map(getText).join("") : tagtypes_1.isTag(node) ? node.name === "br" ? `
` : getText(node.children) : tagtypes_1.isCDATA(node) ? getText(node.children) : tagtypes_1.isText(node) ? node.data : "";
  }
  exports.getText = getText;
});

// node_modules/.pnpm/domutils@2.4.4/node_modules/domutils/lib/traversal.js
var require_traversal = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.nextElementSibling = exports.getName = exports.hasAttrib = exports.getAttributeValue = exports.getSiblings = exports.getParent = exports.getChildren = void 0;
  var tagtypes_1 = require_tagtypes(), emptyArray = [];
  function getChildren(elem) {
    var _a;
    return (_a = elem.children) !== null && _a !== void 0 ? _a : emptyArray;
  }
  exports.getChildren = getChildren;
  function getParent(elem) {
    return elem.parent || null;
  }
  exports.getParent = getParent;
  function getSiblings(elem) {
    var _a, _b, parent = getParent(elem);
    if (parent != null)
      return getChildren(parent);
    for (var siblings = [elem], prev = elem.prev, next = elem.next; prev != null; )
      siblings.unshift(prev), _a = prev, prev = _a.prev;
    for (; next != null; )
      siblings.push(next), _b = next, next = _b.next;
    return siblings;
  }
  exports.getSiblings = getSiblings;
  function getAttributeValue(elem, name) {
    var _a;
    return (_a = elem.attribs) === null || _a === void 0 ? void 0 : _a[name];
  }
  exports.getAttributeValue = getAttributeValue;
  function hasAttrib(elem, name) {
    return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
  }
  exports.hasAttrib = hasAttrib;
  function getName(elem) {
    return elem.name;
  }
  exports.getName = getName;
  function nextElementSibling(elem) {
    for (var _a, next = elem.next; next !== null && !tagtypes_1.isTag(next); )
      _a = next, next = _a.next;
    return next;
  }
  exports.nextElementSibling = nextElementSibling;
});

// node_modules/.pnpm/domutils@2.4.4/node_modules/domutils/lib/manipulation.js
var require_manipulation = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.prepend = exports.prependChild = exports.append = exports.appendChild = exports.replaceElement = exports.removeElement = void 0;
  function removeElement(elem) {
    if (elem.prev && (elem.prev.next = elem.next), elem.next && (elem.next.prev = elem.prev), elem.parent) {
      var childs = elem.parent.children;
      childs.splice(childs.lastIndexOf(elem), 1);
    }
  }
  exports.removeElement = removeElement;
  function replaceElement(elem, replacement) {
    var prev = replacement.prev = elem.prev;
    prev && (prev.next = replacement);
    var next = replacement.next = elem.next;
    next && (next.prev = replacement);
    var parent = replacement.parent = elem.parent;
    if (parent) {
      var childs = parent.children;
      childs[childs.lastIndexOf(elem)] = replacement;
    }
  }
  exports.replaceElement = replaceElement;
  function appendChild(elem, child) {
    if (removeElement(child), child.next = null, child.parent = elem, elem.children.push(child) > 1) {
      var sibling = elem.children[elem.children.length - 2];
      sibling.next = child, child.prev = sibling;
    } else
      child.prev = null;
  }
  exports.appendChild = appendChild;
  function append(elem, next) {
    removeElement(next);
    var parent = elem.parent, currNext = elem.next;
    if (next.next = currNext, next.prev = elem, elem.next = next, next.parent = parent, currNext) {
      if (currNext.prev = next, parent) {
        var childs = parent.children;
        childs.splice(childs.lastIndexOf(currNext), 0, next);
      }
    } else
      parent && parent.children.push(next);
  }
  exports.append = append;
  function prependChild(elem, child) {
    if (removeElement(child), child.parent = elem, child.prev = null, elem.children.unshift(child) !== 1) {
      var sibling = elem.children[1];
      sibling.prev = child, child.next = sibling;
    } else
      child.next = null;
  }
  exports.prependChild = prependChild;
  function prepend(elem, prev) {
    removeElement(prev);
    var parent = elem.parent;
    if (parent) {
      var childs = parent.children;
      childs.splice(childs.indexOf(elem), 0, prev);
    }
    elem.prev && (elem.prev.next = prev), prev.parent = parent, prev.prev = elem.prev, prev.next = elem, elem.prev = prev;
  }
  exports.prepend = prepend;
});

// node_modules/.pnpm/domutils@2.4.4/node_modules/domutils/lib/querying.js
var require_querying = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.findAll = exports.existsOne = exports.findOne = exports.findOneChild = exports.find = exports.filter = void 0;
  var tagtypes_1 = require_tagtypes();
  function filter(test, node, recurse, limit) {
    return recurse === void 0 && (recurse = !0), limit === void 0 && (limit = Infinity), Array.isArray(node) || (node = [node]), find(test, node, recurse, limit);
  }
  exports.filter = filter;
  function find(test, nodes, recurse, limit) {
    for (var result = [], _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
      var elem = nodes_1[_i];
      if (test(elem) && (result.push(elem), --limit <= 0))
        break;
      if (recurse && tagtypes_1.hasChildren(elem) && elem.children.length > 0) {
        var children = find(test, elem.children, recurse, limit);
        if (result.push.apply(result, children), limit -= children.length, limit <= 0)
          break;
      }
    }
    return result;
  }
  exports.find = find;
  function findOneChild(test, nodes) {
    return nodes.find(test);
  }
  exports.findOneChild = findOneChild;
  function findOne(test, nodes, recurse) {
    recurse === void 0 && (recurse = !0);
    for (var elem = null, i = 0; i < nodes.length && !elem; i++) {
      var checked = nodes[i];
      if (tagtypes_1.isTag(checked))
        test(checked) ? elem = checked : recurse && checked.children.length > 0 && (elem = findOne(test, checked.children));
      else
        continue;
    }
    return elem;
  }
  exports.findOne = findOne;
  function existsOne(test, nodes) {
    return nodes.some(function(checked) {
      return tagtypes_1.isTag(checked) && (test(checked) || checked.children.length > 0 && existsOne(test, checked.children));
    });
  }
  exports.existsOne = existsOne;
  function findAll(test, nodes) {
    for (var _a, result = [], stack = nodes.filter(tagtypes_1.isTag), elem; elem = stack.shift(); ) {
      var children = (_a = elem.children) === null || _a === void 0 ? void 0 : _a.filter(tagtypes_1.isTag);
      children && children.length > 0 && stack.unshift.apply(stack, children), test(elem) && result.push(elem);
    }
    return result;
  }
  exports.findAll = findAll;
});

// node_modules/.pnpm/domutils@2.4.4/node_modules/domutils/lib/legacy.js
var require_legacy2 = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.getElementsByTagType = exports.getElementsByTagName = exports.getElementById = exports.getElements = exports.testElement = void 0;
  var querying_1 = require_querying(), tagtypes_1 = require_tagtypes(), Checks = {
    tag_name: function(name) {
      return typeof name == "function" ? function(elem) {
        return tagtypes_1.isTag(elem) && name(elem.name);
      } : name === "*" ? tagtypes_1.isTag : function(elem) {
        return tagtypes_1.isTag(elem) && elem.name === name;
      };
    },
    tag_type: function(type) {
      return typeof type == "function" ? function(elem) {
        return type(elem.type);
      } : function(elem) {
        return elem.type === type;
      };
    },
    tag_contains: function(data) {
      return typeof data == "function" ? function(elem) {
        return tagtypes_1.isText(elem) && data(elem.data);
      } : function(elem) {
        return tagtypes_1.isText(elem) && elem.data === data;
      };
    }
  };
  function getAttribCheck(attrib, value) {
    return typeof value == "function" ? function(elem) {
      return tagtypes_1.isTag(elem) && value(elem.attribs[attrib]);
    } : function(elem) {
      return tagtypes_1.isTag(elem) && elem.attribs[attrib] === value;
    };
  }
  function combineFuncs(a, b) {
    return function(elem) {
      return a(elem) || b(elem);
    };
  }
  function compileTest(options) {
    var funcs = Object.keys(options).map(function(key) {
      var value = options[key];
      return key in Checks ? Checks[key](value) : getAttribCheck(key, value);
    });
    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
  }
  function testElement(options, node) {
    var test = compileTest(options);
    return test ? test(node) : !0;
  }
  exports.testElement = testElement;
  function getElements(options, nodes, recurse, limit) {
    limit === void 0 && (limit = Infinity);
    var test = compileTest(options);
    return test ? querying_1.filter(test, nodes, recurse, limit) : [];
  }
  exports.getElements = getElements;
  function getElementById(id, nodes, recurse) {
    return recurse === void 0 && (recurse = !0), Array.isArray(nodes) || (nodes = [nodes]), querying_1.findOne(getAttribCheck("id", id), nodes, recurse);
  }
  exports.getElementById = getElementById;
  function getElementsByTagName(tagName, nodes, recurse, limit) {
    return recurse === void 0 && (recurse = !0), limit === void 0 && (limit = Infinity), querying_1.filter(Checks.tag_name(tagName), nodes, recurse, limit);
  }
  exports.getElementsByTagName = getElementsByTagName;
  function getElementsByTagType(type, nodes, recurse, limit) {
    return recurse === void 0 && (recurse = !0), limit === void 0 && (limit = Infinity), querying_1.filter(Checks.tag_type(type), nodes, recurse, limit);
  }
  exports.getElementsByTagType = getElementsByTagType;
});

// node_modules/.pnpm/domutils@2.4.4/node_modules/domutils/lib/helpers.js
var require_helpers = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.uniqueSort = exports.compareDocumentPosition = exports.removeSubsets = void 0;
  var tagtypes_1 = require_tagtypes();
  function removeSubsets(nodes) {
    for (var idx = nodes.length; --idx >= 0; ) {
      var node = nodes[idx];
      if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
        nodes.splice(idx, 1);
        continue;
      }
      for (var ancestor = node.parent; ancestor; ancestor = ancestor.parent)
        if (nodes.includes(ancestor)) {
          nodes.splice(idx, 1);
          break;
        }
    }
    return nodes;
  }
  exports.removeSubsets = removeSubsets;
  function compareDocumentPosition(nodeA, nodeB) {
    var aParents = [], bParents = [];
    if (nodeA === nodeB)
      return 0;
    for (var current = tagtypes_1.hasChildren(nodeA) ? nodeA : nodeA.parent; current; )
      aParents.unshift(current), current = current.parent;
    for (current = tagtypes_1.hasChildren(nodeB) ? nodeB : nodeB.parent; current; )
      bParents.unshift(current), current = current.parent;
    for (var maxIdx = Math.min(aParents.length, bParents.length), idx = 0; idx < maxIdx && aParents[idx] === bParents[idx]; )
      idx++;
    if (idx === 0)
      return 1;
    var sharedParent = aParents[idx - 1], siblings = sharedParent.children, aSibling = aParents[idx], bSibling = bParents[idx];
    return siblings.indexOf(aSibling) > siblings.indexOf(bSibling) ? sharedParent === nodeB ? 4 | 16 : 4 : sharedParent === nodeA ? 2 | 8 : 2;
  }
  exports.compareDocumentPosition = compareDocumentPosition;
  function uniqueSort(nodes) {
    return nodes = nodes.filter(function(node, i, arr) {
      return !arr.includes(node, i + 1);
    }), nodes.sort(function(a, b) {
      var relative = compareDocumentPosition(a, b);
      return relative & 2 ? -1 : relative & 4 ? 1 : 0;
    }), nodes;
  }
  exports.uniqueSort = uniqueSort;
});

// node_modules/.pnpm/domutils@2.4.4/node_modules/domutils/lib/index.js
var require_lib5 = __commonJS((exports) => {
  "use strict";
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    k2 === void 0 && (k2 = k), Object.defineProperty(o, k2, {enumerable: !0, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    k2 === void 0 && (k2 = k), o[k2] = m[k];
  }), __exportStar2 = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p) && __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  __exportStar2(require_stringify(), exports);
  __exportStar2(require_traversal(), exports);
  __exportStar2(require_manipulation(), exports);
  __exportStar2(require_querying(), exports);
  __exportStar2(require_legacy2(), exports);
  __exportStar2(require_helpers(), exports);
  __exportStar2(require_tagtypes(), exports);
});

// node_modules/.pnpm/htmlparser2@6.0.1/node_modules/htmlparser2/lib/FeedHandler.js
var require_FeedHandler = __commonJS((exports) => {
  "use strict";
  var __extends = exports && exports.__extends || function() {
    var extendStatics = function(d, b) {
      return extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          Object.prototype.hasOwnProperty.call(b2, p) && (d2[p] = b2[p]);
      }, extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b != "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }(), __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    k2 === void 0 && (k2 = k), Object.defineProperty(o, k2, {enumerable: !0, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    k2 === void 0 && (k2 = k), o[k2] = m[k];
  }), __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {enumerable: !0, value: v});
  } : function(o, v) {
    o.default = v;
  }), __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        k !== "default" && Object.prototype.hasOwnProperty.call(mod, k) && __createBinding(result, mod, k);
    return __setModuleDefault(result, mod), result;
  }, __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.parseFeed = exports.FeedHandler = void 0;
  var domhandler_1 = __importDefault(require_lib4()), DomUtils2 = __importStar(require_lib5()), Parser_1 = require_Parser(), FeedItemMediaMedium;
  (function(FeedItemMediaMedium2) {
    FeedItemMediaMedium2[FeedItemMediaMedium2.image = 0] = "image", FeedItemMediaMedium2[FeedItemMediaMedium2.audio = 1] = "audio", FeedItemMediaMedium2[FeedItemMediaMedium2.video = 2] = "video", FeedItemMediaMedium2[FeedItemMediaMedium2.document = 3] = "document", FeedItemMediaMedium2[FeedItemMediaMedium2.executable = 4] = "executable";
  })(FeedItemMediaMedium || (FeedItemMediaMedium = {}));
  var FeedItemMediaExpression;
  (function(FeedItemMediaExpression2) {
    FeedItemMediaExpression2[FeedItemMediaExpression2.sample = 0] = "sample", FeedItemMediaExpression2[FeedItemMediaExpression2.full = 1] = "full", FeedItemMediaExpression2[FeedItemMediaExpression2.nonstop = 2] = "nonstop";
  })(FeedItemMediaExpression || (FeedItemMediaExpression = {}));
  var FeedHandler = function(_super) {
    __extends(FeedHandler2, _super);
    function FeedHandler2(callback, options) {
      var _this = this;
      return typeof callback == "object" && (callback = void 0, options = callback), _this = _super.call(this, callback, options) || this, _this;
    }
    return FeedHandler2.prototype.onend = function() {
      var _a, _b, feedRoot = getOneElement(isValidFeed, this.dom);
      if (!feedRoot) {
        this.handleCallback(new Error("couldn't find root of feed"));
        return;
      }
      var feed = {};
      if (feedRoot.name === "feed") {
        var childs = feedRoot.children;
        feed.type = "atom", addConditionally(feed, "id", "id", childs), addConditionally(feed, "title", "title", childs);
        var href = getAttribute("href", getOneElement("link", childs));
        href && (feed.link = href), addConditionally(feed, "description", "subtitle", childs);
        var updated = fetch2("updated", childs);
        updated && (feed.updated = new Date(updated)), addConditionally(feed, "author", "email", childs, !0), feed.items = getElements("entry", childs).map(function(item) {
          var entry = {}, children = item.children;
          addConditionally(entry, "id", "id", children), addConditionally(entry, "title", "title", children);
          var href2 = getAttribute("href", getOneElement("link", children));
          href2 && (entry.link = href2);
          var description = fetch2("summary", children) || fetch2("content", children);
          description && (entry.description = description);
          var pubDate = fetch2("updated", children);
          return pubDate && (entry.pubDate = new Date(pubDate)), entry.media = getMediaElements(children), entry;
        });
      } else {
        var childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
        feed.type = feedRoot.name.substr(0, 3), feed.id = "", addConditionally(feed, "title", "title", childs), addConditionally(feed, "link", "link", childs), addConditionally(feed, "description", "description", childs);
        var updated = fetch2("lastBuildDate", childs);
        updated && (feed.updated = new Date(updated)), addConditionally(feed, "author", "managingEditor", childs, !0), feed.items = getElements("item", feedRoot.children).map(function(item) {
          var entry = {}, children = item.children;
          addConditionally(entry, "id", "guid", children), addConditionally(entry, "title", "title", children), addConditionally(entry, "link", "link", children), addConditionally(entry, "description", "description", children);
          var pubDate = fetch2("pubDate", children);
          return pubDate && (entry.pubDate = new Date(pubDate)), entry.media = getMediaElements(children), entry;
        });
      }
      this.feed = feed, this.handleCallback(null);
    }, FeedHandler2;
  }(domhandler_1.default);
  exports.FeedHandler = FeedHandler;
  function getMediaElements(where) {
    return getElements("media:content", where).map(function(elem) {
      var media = {
        medium: elem.attribs.medium,
        isDefault: !!elem.attribs.isDefault
      };
      return elem.attribs.url && (media.url = elem.attribs.url), elem.attribs.fileSize && (media.fileSize = parseInt(elem.attribs.fileSize, 10)), elem.attribs.type && (media.type = elem.attribs.type), elem.attribs.expression && (media.expression = elem.attribs.expression), elem.attribs.bitrate && (media.bitrate = parseInt(elem.attribs.bitrate, 10)), elem.attribs.framerate && (media.framerate = parseInt(elem.attribs.framerate, 10)), elem.attribs.samplingrate && (media.samplingrate = parseInt(elem.attribs.samplingrate, 10)), elem.attribs.channels && (media.channels = parseInt(elem.attribs.channels, 10)), elem.attribs.duration && (media.duration = parseInt(elem.attribs.duration, 10)), elem.attribs.height && (media.height = parseInt(elem.attribs.height, 10)), elem.attribs.width && (media.width = parseInt(elem.attribs.width, 10)), elem.attribs.lang && (media.lang = elem.attribs.lang), media;
    });
  }
  function getElements(tagName, where) {
    return DomUtils2.getElementsByTagName(tagName, where, !0);
  }
  function getOneElement(tagName, node) {
    return DomUtils2.getElementsByTagName(tagName, node, !0, 1)[0];
  }
  function fetch2(tagName, where, recurse) {
    return recurse === void 0 && (recurse = !1), DomUtils2.getText(DomUtils2.getElementsByTagName(tagName, where, recurse, 1)).trim();
  }
  function getAttribute(name, elem) {
    if (!elem)
      return null;
    var attribs = elem.attribs;
    return attribs[name];
  }
  function addConditionally(obj, prop, what, where, recurse) {
    recurse === void 0 && (recurse = !1);
    var tmp = fetch2(what, where, recurse);
    tmp && (obj[prop] = tmp);
  }
  function isValidFeed(value) {
    return value === "rss" || value === "feed" || value === "rdf:RDF";
  }
  function parseFeed(feed, options) {
    options === void 0 && (options = {xmlMode: !0});
    var handler = new FeedHandler(options);
    return new Parser_1.Parser(handler, options).end(feed), handler.feed;
  }
  exports.parseFeed = parseFeed;
});

// node_modules/.pnpm/htmlparser2@6.0.1/node_modules/htmlparser2/lib/index.js
var require_lib6 = __commonJS((exports) => {
  "use strict";
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    k2 === void 0 && (k2 = k), Object.defineProperty(o, k2, {enumerable: !0, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    k2 === void 0 && (k2 = k), o[k2] = m[k];
  }), __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {enumerable: !0, value: v});
  } : function(o, v) {
    o.default = v;
  }), __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        k !== "default" && Object.prototype.hasOwnProperty.call(mod, k) && __createBinding(result, mod, k);
    return __setModuleDefault(result, mod), result;
  }, __exportStar2 = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p) && __createBinding(exports2, m, p);
  }, __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports, "__esModule", {value: !0});
  exports.RssHandler = exports.DefaultHandler = exports.DomUtils = exports.ElementType = exports.Tokenizer = exports.createDomStream = exports.parseDOM = exports.parseDocument = exports.DomHandler = exports.Parser = void 0;
  var Parser_1 = require_Parser();
  Object.defineProperty(exports, "Parser", {enumerable: !0, get: function() {
    return Parser_1.Parser;
  }});
  var domhandler_1 = require_lib4();
  Object.defineProperty(exports, "DomHandler", {enumerable: !0, get: function() {
    return domhandler_1.DomHandler;
  }});
  Object.defineProperty(exports, "DefaultHandler", {enumerable: !0, get: function() {
    return domhandler_1.DomHandler;
  }});
  function parseDocument2(data, options) {
    var handler = new domhandler_1.DomHandler(void 0, options);
    return new Parser_1.Parser(handler, options).end(data), handler.root;
  }
  exports.parseDocument = parseDocument2;
  function parseDOM(data, options) {
    return parseDocument2(data, options).children;
  }
  exports.parseDOM = parseDOM;
  function createDomStream(cb, options, elementCb) {
    var handler = new domhandler_1.DomHandler(cb, options, elementCb);
    return new Parser_1.Parser(handler, options);
  }
  exports.createDomStream = createDomStream;
  var Tokenizer_1 = require_Tokenizer();
  Object.defineProperty(exports, "Tokenizer", {enumerable: !0, get: function() {
    return __importDefault(Tokenizer_1).default;
  }});
  var ElementType = __importStar(require_lib());
  exports.ElementType = ElementType;
  __exportStar2(require_FeedHandler(), exports);
  exports.DomUtils = __importStar(require_lib5());
  var FeedHandler_1 = require_FeedHandler();
  Object.defineProperty(exports, "RssHandler", {enumerable: !0, get: function() {
    return FeedHandler_1.FeedHandler;
  }});
});

// node_modules/.pnpm/prop-types@15.7.2/node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS((exports, module) => {
  "use strict";
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  module.exports = ReactPropTypesSecret;
});

// node_modules/.pnpm/prop-types@15.7.2/node_modules/prop-types/factoryWithThrowingShims.js
var require_factoryWithThrowingShims = __commonJS((exports, module) => {
  "use strict";
  var ReactPropTypesSecret = require_ReactPropTypesSecret();
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  module.exports = function() {
    function shim(props, propName, componentName, location2, propFullName, secret) {
      if (secret !== ReactPropTypesSecret) {
        var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw err.name = "Invariant Violation", err;
      }
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    return ReactPropTypes.PropTypes = ReactPropTypes, ReactPropTypes;
  };
});

// node_modules/.pnpm/prop-types@15.7.2/node_modules/prop-types/index.js
var require_prop_types = __commonJS((exports, module) => {
  module.exports = require_factoryWithThrowingShims()();
  var ReactIs, throwOnDirectAccess;
});

// src/lib/launchIdleWorker.ts
typeof SharedWorker != "undefined" && !globalThis.IDLE_WORKER;

// src/lib/injectServiceWorker.ts
globalThis.navigator.serviceWorker && globalThis.navigator.serviceWorker.register("/_dev_/service-worker.js", {scope: "/"}).then(function(registration) {
  console.log("ServiceWorker registration successful!"), globalThis.navigator.serviceWorker.startMessages(), globalThis.navigator.serviceWorker.controller.addEventListener("message", () => {
  });
}).catch(function(err) {
  console.log("ServiceWorker registration failed: ", err);
});

// src/_dev_/NewProjectPage.tsx
var React10 = __toModule(require_react()), ReactDOM4 = __toModule(require_react_dom());

// node_modules/.pnpm/idb@6.0.0/node_modules/idb/build/esm/wrap-idb-value.js
var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c), idbProxyableTypes, cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
var cursorRequestMap = new WeakMap(), transactionDoneMap = new WeakMap(), transactionStoreNamesMap = new WeakMap(), transformCache = new WeakMap(), reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
  let promise = new Promise((resolve, reject) => {
    let unlisten = () => {
      request.removeEventListener("success", success), request.removeEventListener("error", error);
    }, success = () => {
      resolve(wrap(request.result)), unlisten();
    }, error = () => {
      reject(request.error), unlisten();
    };
    request.addEventListener("success", success), request.addEventListener("error", error);
  });
  return promise.then((value) => {
    value instanceof IDBCursor && cursorRequestMap.set(value, request);
  }).catch(() => {
  }), reverseTransformCache.set(promise, request), promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  let done = new Promise((resolve, reject) => {
    let unlisten = () => {
      tx.removeEventListener("complete", complete), tx.removeEventListener("error", error), tx.removeEventListener("abort", error);
    }, complete = () => {
      resolve(), unlisten();
    }, error = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError")), unlisten();
    };
    tx.addEventListener("complete", complete), tx.addEventListener("error", error), tx.addEventListener("abort", error);
  });
  transactionDoneMap.set(tx, done);
}
var idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "objectStoreNames")
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      if (prop === "store")
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
    }
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    return target[prop] = value, !0;
  },
  has(target, prop) {
    return target instanceof IDBTransaction && (prop === "done" || prop === "store") ? !0 : prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  return func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(storeNames, ...args) {
    let tx = func.call(unwrap(this), storeNames, ...args);
    return transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]), wrap(tx);
  } : getCursorAdvanceMethods().includes(func) ? function(...args) {
    return func.apply(unwrap(this), args), wrap(cursorRequestMap.get(this));
  } : function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  return typeof value == "function" ? wrapFunction(value) : (value instanceof IDBTransaction && cacheDonePromiseForTransaction(value), instanceOfAny(value, getIdbProxyableTypes()) ? new Proxy(value, idbProxyTraps) : value);
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  let newValue = transformCachableValue(value);
  return newValue !== value && (transformCache.set(value, newValue), reverseTransformCache.set(newValue, value)), newValue;
}
var unwrap = (value) => reverseTransformCache.get(value);

// node_modules/.pnpm/idb@6.0.0/node_modules/idb/build/esm/index.js
function openDB(name, version, {blocked, upgrade, blocking, terminated} = {}) {
  let request = indexedDB.open(name, version), openPromise = wrap(request);
  return upgrade && request.addEventListener("upgradeneeded", (event) => {
    upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
  }), blocked && request.addEventListener("blocked", () => blocked()), openPromise.then((db) => {
    terminated && db.addEventListener("close", () => terminated()), blocking && db.addEventListener("versionchange", () => blocking());
  }).catch(() => {
  }), openPromise;
}
var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"], writeMethods = ["put", "add", "delete", "clear"], cachedMethods = new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop == "string"))
    return;
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  let targetFuncName = prop.replace(/FromIndex$/, ""), useIndex = prop !== targetFuncName, isWrite = writeMethods.includes(targetFuncName);
  if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName)))
    return;
  let method = async function(storeName, ...args) {
    let tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly"), target2 = tx.store;
    return useIndex && (target2 = target2.index(args.shift())), (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  return cachedMethods.set(prop, method), method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));

// src/_dev_/getPackageID.tsx
function getPackageID() {
  return location.origin.substring(location.protocol.length + "//".length, location.origin.indexOf("."));
}

// src/lib/StoredPackage.ts
var import_lite2 = __toModule(require_lite()), path5 = __toModule(require_path_browserify());

// src/lib/ErrorCode.tsx
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2[ErrorCode2.invalidPackageJSON = 0] = "invalidPackageJSON", ErrorCode2[ErrorCode2.emptyDir = 1] = "emptyDir", ErrorCode2[ErrorCode2.missingEntryFiles = 2] = "missingEntryFiles", ErrorCode2[ErrorCode2.missing = 3] = "missing", ErrorCode2[ErrorCode2.genericError = 4] = "genericError", ErrorCode2[ErrorCode2.errorFetchingPackageJSON = 5] = "errorFetchingPackageJSON", ErrorCode2[ErrorCode2.errorGettingPackageJSONFile = 6] = "errorGettingPackageJSONFile", ErrorCode2[ErrorCode2.parsingPackageJSON = 7] = "parsingPackageJSON", ErrorCode2[ErrorCode2.requirePermission = 8] = "requirePermission", ErrorCode2[ErrorCode2.noEntryPoints = 9] = "noEntryPoints", ErrorCode2[ErrorCode2.resolveFile = 10] = "resolveFile", ErrorCode2[ErrorCode2.fileNotFound = 11] = "fileNotFound", ErrorCode2[ErrorCode2.fileAccessDenied = 12] = "fileAccessDenied", ErrorCode2[ErrorCode2.buildFailed = 13] = "buildFailed", ErrorCode2[ErrorCode2.invalidTSConfig = 14] = "invalidTSConfig", ErrorCode2[ErrorCode2.routeNotFound = 15] = "routeNotFound", ErrorCode2[ErrorCode2.needsConfig = 16] = "needsConfig", ErrorCode2[ErrorCode2.failedToResolveNPMPackage = 17] = "failedToResolveNPMPackage";
})(ErrorCode || (ErrorCode = {}));

// src/lib/ESBuildPackage.tsx
var import_esbuild_wasm = __toModule(require_browser()), import_lite = __toModule(require_lite()), import_path_browserify = __toModule(require_path_browserify());

// src/lib/getCache.tsx
var _cache;
async function getCache() {
  return _cache || (_cache = await globalThis.caches.open("bundles")), _cache;
}

// src/lib/ESBuildPackage.tsx
var PackagerError = class extends Error {
  constructor(code, ...args) {
    super(...args);
    this.code = code;
  }
  static with(code, error) {
    let packager2 = new PackagerError(code);
    return Object.assign(packager2, error), packager2;
  }
}, PackagerPermissionError = class extends PackagerError {
}, _ESBuildPackage = class {
  constructor(root2, pkg) {
    this.extensionsToTry = [
      ".js",
      ".ts",
      ".tsx",
      ".jsx",
      ".css",
      ".png",
      ".jpg",
      ".webp"
    ];
    this.textExtensionsToTry = [".js", ".ts", ".tsx", ".jsx", ".css"];
    this.binaryExtensionsToTry = [".png", ".jpg", ".webp"];
    this.alwaysRequestPermissions = !1;
    this.resolveFile = async (opts) => {
      let components = opts.path.split("/"), pkgName = components[0];
      if (this.pkg.allDependencies.has(pkgName)) {
        let file = components.length > 1 ? `/${components.slice(1).join("/")}` : "";
        return {
          path: `https://jspm.dev/${this.pkg.allDependencies.get(pkgName)}${file}`,
          external: !0
        };
      }
      let resolvedPath = import_path_browserify.default.join(opts.resolveDir, import_path_browserify.default.normalize(opts.path));
      !import_path_browserify.default.isAbsolute(resolvedPath) && opts.importer ? resolvedPath = import_path_browserify.default.join(resolvedPath, opts.importer) : !import_path_browserify.default.isAbsolute(resolvedPath) && !opts.importer && (resolvedPath = import_path_browserify.default.join(resolvedPath, opts.importer));
      let doesExist = await this.root.exists(resolvedPath);
      if (!doesExist && import_path_browserify.default.extname(resolvedPath) === "") {
        let origPath = resolvedPath;
        for (let extension of this.textExtensionsToTry)
          if (resolvedPath = origPath + extension, await this.root.exists(resolvedPath))
            return {
              path: resolvedPath,
              external: !1
            };
      }
      return doesExist ? {
        path: resolvedPath,
        external: !1
      } : {
        errors: [
          {
            text: `404 - File not found: ${opts.path}`
          }
        ]
      };
    };
    this.loadFile = async (opts) => (console.log("[Load]", opts), opts.namespace === "file" || import_lite.default.getType(import_path_browserify.default.extname(opts.path))?.includes("image") ? {
      contents: new Uint8Array(await this.root.readFileBinary(opts.path)),
      loader: "default"
    } : {
      contents: await this.root.readFileText(opts.path),
      loader: "default"
    });
    this.root = root2, this.pkg = pkg;
  }
  async resolve(_path, importer, resolveDir, canRetry = !0) {
    debugger;
    _path.includes("//") && (_path = _path.replace(/\/+/gm, "/"));
    let fs = this.root;
    if (await fs.exists(_path) || importer && !_path.startsWith("/") && (_path = import_path_browserify.default.normalize(import_path_browserify.default.join(import_path_browserify.default.dirname(importer), "../", _path)), await fs.exists(_path)))
      return _path;
    let newPath = "";
    for (let ext of this.extensionsToTry)
      if (newPath = _path + ext, await fs.exists(newPath))
        return newPath;
    if (importer && importer.startsWith("/") && canRetry)
      return this.resolve(import_path_browserify.default.join(resolveDir, _path), importer, resolveDir, !1);
  }
  emitResolveError({
    message,
    location: location2,
    code,
    path: path7,
    exception,
    namespace,
    external
  }) {
    return {
      pluginName: _ESBuildPackage.pluginName,
      errors: [
        {
          text: message || exception?.toString() || "",
          detail: message && exception ? exception.toString() : "",
          location: location2 || void 0
        }
      ],
      path: path7,
      external,
      namespace,
      pluginData: {code}
    };
  }
  async saveResultToCache(result, route) {
    let outResults = new Array(result.outputFiles.length), i = 0, cache = await getCache();
    for (let file of result.outputFiles) {
      let dest = globalThis.location.origin + file.path, headers = new Headers();
      headers.set("Content-Length", file.contents.byteLength.toString(10)), headers.set("Content-Type", import_lite.default.getType(file.path).toString()), await cache.put(dest, new Response(new Blob([file.text], {
        type: import_lite.default.getType(file.path)
      }), {headers})), outResults[i++] = dest;
    }
    return {entryPoints: outResults};
  }
  generateRelativePath() {
    return "/";
  }
  async build(route) {
    this.relativePath = route.absWorkingDirectory;
    let tsconfigFile = await this.root.nativeFile("tsconfig.json"), tsconfig;
    if (tsconfigFile)
      try {
        tsconfig = await tsconfigFile.text();
      } catch (exception) {
        let err = PackagerError.with(ErrorCode.invalidTSConfig, exception);
        throw err.build = this, err;
      }
    let entryPoints = route.entryPoints, result, config = {
      ...this.pkg.esbuild,
      format: "esm",
      tsconfig,
      metafile: !0,
      entryPoints,
      publicPath: _ESBuildPackage.origin + this.relativePath,
      plugins: [this.asPlugin()],
      write: !1,
      loader: this.pkg.esbuild.loader ? this.pkg.esbuild.loader : {
        ".js": "jsx",
        ".ts": "tsx",
        ".tsx": "tsx"
      },
      absWorkingDir: this.relativePath,
      nodePaths: ["/node_modules"],
      outdir: this.relativePath,
      bundle: !0
    };
    try {
      result = await (0, import_esbuild_wasm.build)(config);
    } catch (e) {
      let err = PackagerError.with(ErrorCode.buildFailed, e);
      throw err.build = this, err;
    }
    for (let script of route.builder.scripts.values())
      script.attribs.type = "module", script.attribs.defer = "", script.attribs["data-src"] = script.attribs.src;
    let html = route.renderToString(result, config);
    return {
      warnings: result.warnings,
      ...await this.saveResultToCache(result, route),
      html
    };
  }
  async getFileForLocation(location2) {
    return await this.root.nativeFile(location2.file);
  }
  asPlugin() {
    let resolveFile = this.resolveFile, loadFile = this.loadFile;
    return {
      name: _ESBuildPackage.pluginName,
      setup(build2) {
        build2.onResolve({filter: /.*/}, resolveFile), build2.onLoad({filter: /.*/}, loadFile);
      }
    };
  }
}, ESBuildPackage = _ESBuildPackage;
ESBuildPackage.pluginName = "devserverless", ESBuildPackage.permissionMode = {mode: "read"};

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global, freeGlobal_default = freeGlobal;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self, root = freeGlobal_default || freeSelf || Function("return this")(), root_default = root;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Symbol.js
var Symbol2 = root_default.Symbol, Symbol_default = Symbol2;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = !0;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), result;
}
var getRawTag_default = getRawTag;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype, nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  return value == null ? value === void 0 ? undefinedTag : nullTag : symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isArray.js
var isArray = Array.isArray, isArray_default = isArray;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value))
    return !1;
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"], coreJsData_default = coreJsData;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isMasked.js
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype, funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var toSource_default = toSource;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto2 = Function.prototype, objectProto3 = Object.prototype, funcToString2 = funcProto2.toString, hasOwnProperty2 = objectProto3.hasOwnProperty, reIsNative = RegExp("^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value))
    return !1;
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_WeakMap.js
var WeakMap2 = getNative_default(root_default, "WeakMap"), WeakMap_default = WeakMap2;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseCreate.js
var objectCreate = Object.create, baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject_default(proto))
      return {};
    if (objectCreate)
      return objectCreate(proto);
    object.prototype = proto;
    var result = new object();
    return object.prototype = void 0, result;
  };
}(), baseCreate_default = baseCreate;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_copyArray.js
function copyArray(source, array) {
  var index = -1, length = source.length;
  for (array || (array = Array(length)); ++index < length; )
    array[index] = source[index];
  return array;
}
var copyArray_default = copyArray;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
  try {
    var func = getNative_default(Object, "defineProperty");
    return func({}, "", {}), func;
  } catch (e) {
  }
}(), defineProperty_default = defineProperty;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayEach.js
function arrayEach(array, iteratee) {
  for (var index = -1, length = array == null ? 0 : array.length; ++index < length && iteratee(array[index], index, array) !== !1; )
    ;
  return array;
}
var arrayEach_default = arrayEach;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER = 9007199254740991, reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  return length = length ?? MAX_SAFE_INTEGER, !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
var isIndex_default = isIndex;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseAssignValue.js
function baseAssignValue(object, key, value) {
  key == "__proto__" && defineProperty_default ? defineProperty_default(object, key, {
    configurable: !0,
    enumerable: !0,
    value,
    writable: !0
  }) : object[key] = value;
}
var baseAssignValue_default = baseAssignValue;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_assignValue.js
var objectProto4 = Object.prototype, hasOwnProperty3 = objectProto4.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) && baseAssignValue_default(object, key, value);
}
var assignValue_default = assignValue;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_copyObject.js
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  for (var index = -1, length = props.length; ++index < length; ) {
    var key = props[index], newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    newValue === void 0 && (newValue = source[key]), isNew ? baseAssignValue_default(object, key, newValue) : assignValue_default(object, key, newValue);
  }
  return object;
}
var copyObject_default = copyObject;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var isLength_default = isLength;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isPrototype.js
var objectProto5 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
  return value === proto;
}
var isPrototype_default = isPrototype;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee) {
  for (var index = -1, result = Array(n); ++index < n; )
    result[index] = iteratee(index);
  return result;
}
var baseTimes_default = baseTimes;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isArguments.js
var objectProto6 = Object.prototype, hasOwnProperty4 = objectProto6.hasOwnProperty, propertyIsEnumerable = objectProto6.propertyIsEnumerable, isArguments = baseIsArguments_default(function() {
  return arguments;
}()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
}, isArguments_default = isArguments;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return !1;
}
var stubFalse_default = stubFalse;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayLikeKeys.js
var import_isBuffer = __toModule(require_isBuffer());

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag2 = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = !1;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isTypedArray.js
var import_nodeUtil = __toModule(require_nodeUtil()), nodeIsTypedArray = import_nodeUtil.default && import_nodeUtil.default.isTypedArray, isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default, isTypedArray_default = isTypedArray;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayLikeKeys.js
var objectProto7 = Object.prototype, hasOwnProperty5 = objectProto7.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && (0, import_isBuffer.default)(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value)
    (inherited || hasOwnProperty5.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex_default(key, length))) && result.push(key);
  return result;
}
var arrayLikeKeys_default = arrayLikeKeys;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_overArg.js
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var overArg_default = overArg;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object), nativeKeys_default = nativeKeys;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseKeys.js
var objectProto8 = Object.prototype, hasOwnProperty6 = objectProto8.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object))
    return nativeKeys_default(object);
  var result = [];
  for (var key in Object(object))
    hasOwnProperty6.call(object, key) && key != "constructor" && result.push(key);
  return result;
}
var baseKeys_default = baseKeys;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_nativeKeysIn.js
function nativeKeysIn(object) {
  var result = [];
  if (object != null)
    for (var key in Object(object))
      result.push(key);
  return result;
}
var nativeKeysIn_default = nativeKeysIn;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseKeysIn.js
var objectProto9 = Object.prototype, hasOwnProperty7 = objectProto9.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_default(object))
    return nativeKeysIn_default(object);
  var isProto = isPrototype_default(object), result = [];
  for (var key in object)
    key == "constructor" && (isProto || !hasOwnProperty7.call(object, key)) || result.push(key);
  return result;
}
var baseKeysIn_default = baseKeysIn;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/keysIn.js
function keysIn(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object, !0) : baseKeysIn_default(object);
}
var keysIn_default = keysIn;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create"), nativeCreate_default = nativeCreate;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {}, this.size = 0;
}
var hashClear_default = hashClear;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  return this.size -= result ? 1 : 0, result;
}
var hashDelete_default = hashDelete;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__", objectProto10 = Object.prototype, hasOwnProperty8 = objectProto10.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty8.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hashHas.js
var objectProto11 = Object.prototype, hasOwnProperty9 = objectProto11.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty9.call(data, key);
}
var hashHas_default = hashHas;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value, this;
}
var hashSet_default = hashSet;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  for (this.clear(); ++index < length; ) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype.delete = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [], this.size = 0;
}
var listCacheClear_default = listCacheClear;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  for (var length = array.length; length--; )
    if (eq_default(array[length][0], key))
      return length;
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype, splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0)
    return !1;
  var lastIndex = data.length - 1;
  return index == lastIndex ? data.pop() : splice.call(data, index, 1), --this.size, !0;
}
var listCacheDelete_default = listCacheDelete;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default = listCacheGet;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? (++this.size, data.push([key, value])) : data[index][1] = value, this;
}
var listCacheSet_default = listCacheSet;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  for (this.clear(); ++index < length; ) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype.delete = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Map.js
var Map2 = getNative_default(root_default, "Map"), Map_default = Map2;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0, this.__data__ = {
    hash: new Hash_default(),
    map: new (Map_default || ListCache_default)(),
    string: new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getMapData.js
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key).delete(key);
  return this.size -= result ? 1 : 0, result;
}
var mapCacheDelete_default = mapCacheDelete;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size = data.size;
  return data.set(key, value), this.size += data.size == size ? 0 : 1, this;
}
var mapCacheSet_default = mapCacheSet;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  for (this.clear(); ++index < length; ) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype.delete = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values) {
  for (var index = -1, length = values.length, offset = array.length; ++index < length; )
    array[offset + index] = values[index];
  return array;
}
var arrayPush_default = arrayPush;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getPrototype.js
var getPrototype = overArg_default(Object.getPrototypeOf, Object), getPrototype_default = getPrototype;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default(), this.size = 0;
}
var stackClear_default = stackClear;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data.delete(key);
  return this.size = data.size, result;
}
var stackDelete_default = stackDelete;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1)
      return pairs.push([key, value]), this.size = ++data.size, this;
    data = this.__data__ = new MapCache_default(pairs);
  }
  return data.set(key, value), this.size = data.size, this;
}
var stackSet_default = stackSet;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype.delete = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseAssign.js
function baseAssign(object, source) {
  return object && copyObject_default(source, keys_default(source), object);
}
var baseAssign_default = baseAssign;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseAssignIn.js
function baseAssignIn(object, source) {
  return object && copyObject_default(source, keysIn_default(source), object);
}
var baseAssignIn_default = baseAssignIn;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseClone.js
var import_cloneBuffer = __toModule(require_cloneBuffer());

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  for (var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = []; ++index < length; ) {
    var value = array[index];
    predicate(value, index, array) && (result[resIndex++] = value);
  }
  return result;
}
var arrayFilter_default = arrayFilter;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getSymbols.js
var objectProto12 = Object.prototype, propertyIsEnumerable2 = objectProto12.propertyIsEnumerable, nativeGetSymbols = Object.getOwnPropertySymbols, getSymbols = nativeGetSymbols ? function(object) {
  return object == null ? [] : (object = Object(object), arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  }));
} : stubArray_default, getSymbols_default = getSymbols;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_copySymbols.js
function copySymbols(source, object) {
  return copyObject_default(source, getSymbols_default(source), object);
}
var copySymbols_default = copySymbols;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getSymbolsIn.js
var nativeGetSymbols2 = Object.getOwnPropertySymbols, getSymbolsIn = nativeGetSymbols2 ? function(object) {
  for (var result = []; object; )
    arrayPush_default(result, getSymbols_default(object)), object = getPrototype_default(object);
  return result;
} : stubArray_default, getSymbolsIn_default = getSymbolsIn;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_copySymbolsIn.js
function copySymbolsIn(source, object) {
  return copyObject_default(source, getSymbolsIn_default(source), object);
}
var copySymbolsIn_default = copySymbolsIn;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getAllKeysIn.js
function getAllKeysIn(object) {
  return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
}
var getAllKeysIn_default = getAllKeysIn;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_DataView.js
var DataView = getNative_default(root_default, "DataView"), DataView_default = DataView;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise"), Promise_default = Promise2;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Set.js
var Set2 = getNative_default(root_default, "Set"), Set_default = Set2;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getTag.js
var mapTag2 = "[object Map]", objectTag2 = "[object Object]", promiseTag = "[object Promise]", setTag2 = "[object Set]", weakMapTag2 = "[object WeakMap]", dataViewTag2 = "[object DataView]", dataViewCtorString = toSource_default(DataView_default), mapCtorString = toSource_default(Map_default), promiseCtorString = toSource_default(Promise_default), setCtorString = toSource_default(Set_default), weakMapCtorString = toSource_default(WeakMap_default), getTag = baseGetTag_default;
(DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) && (getTag = function(value) {
  var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
  if (ctorString)
    switch (ctorString) {
      case dataViewCtorString:
        return dataViewTag2;
      case mapCtorString:
        return mapTag2;
      case promiseCtorString:
        return promiseTag;
      case setCtorString:
        return setTag2;
      case weakMapCtorString:
        return weakMapTag2;
    }
  return result;
});
var getTag_default = getTag;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_initCloneArray.js
var objectProto13 = Object.prototype, hasOwnProperty10 = objectProto13.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  return length && typeof array[0] == "string" && hasOwnProperty10.call(array, "index") && (result.index = array.index, result.input = array.input), result;
}
var initCloneArray_default = initCloneArray;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Uint8Array.js
var Uint8Array2 = root_default.Uint8Array, Uint8Array_default = Uint8Array2;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneArrayBuffer.js
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  return new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer)), result;
}
var cloneArrayBuffer_default = cloneArrayBuffer;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneDataView.js
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var cloneDataView_default = cloneDataView;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneRegExp.js
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  return result.lastIndex = regexp.lastIndex, result;
}
var cloneRegExp_default = cloneRegExp;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneSymbol.js
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var cloneSymbol_default = cloneSymbol;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneTypedArray.js
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var cloneTypedArray_default = cloneTypedArray;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_initCloneByTag.js
var boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", mapTag3 = "[object Map]", numberTag2 = "[object Number]", regexpTag2 = "[object RegExp]", setTag3 = "[object Set]", stringTag2 = "[object String]", symbolTag = "[object Symbol]", arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag3 = "[object DataView]", float32Tag2 = "[object Float32Array]", float64Tag2 = "[object Float64Array]", int8Tag2 = "[object Int8Array]", int16Tag2 = "[object Int16Array]", int32Tag2 = "[object Int32Array]", uint8Tag2 = "[object Uint8Array]", uint8ClampedTag2 = "[object Uint8ClampedArray]", uint16Tag2 = "[object Uint16Array]", uint32Tag2 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag2:
      return cloneArrayBuffer_default(object);
    case boolTag2:
    case dateTag2:
      return new Ctor(+object);
    case dataViewTag3:
      return cloneDataView_default(object, isDeep);
    case float32Tag2:
    case float64Tag2:
    case int8Tag2:
    case int16Tag2:
    case int32Tag2:
    case uint8Tag2:
    case uint8ClampedTag2:
    case uint16Tag2:
    case uint32Tag2:
      return cloneTypedArray_default(object, isDeep);
    case mapTag3:
      return new Ctor();
    case numberTag2:
    case stringTag2:
      return new Ctor(object);
    case regexpTag2:
      return cloneRegExp_default(object);
    case setTag3:
      return new Ctor();
    case symbolTag:
      return cloneSymbol_default(object);
  }
}
var initCloneByTag_default = initCloneByTag;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_initCloneObject.js
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
}
var initCloneObject_default = initCloneObject;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseClone.js
var import_isBuffer2 = __toModule(require_isBuffer());

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsMap.js
var mapTag4 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike_default(value) && getTag_default(value) == mapTag4;
}
var baseIsMap_default = baseIsMap;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isMap.js
var import_nodeUtil2 = __toModule(require_nodeUtil()), nodeIsMap = import_nodeUtil2.default && import_nodeUtil2.default.isMap, isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default, isMap_default = isMap;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsSet.js
var setTag4 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike_default(value) && getTag_default(value) == setTag4;
}
var baseIsSet_default = baseIsSet;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isSet.js
var import_nodeUtil3 = __toModule(require_nodeUtil()), nodeIsSet = import_nodeUtil3.default && import_nodeUtil3.default.isSet, isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default, isSet_default = isSet;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseClone.js
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4, argsTag3 = "[object Arguments]", arrayTag2 = "[object Array]", boolTag3 = "[object Boolean]", dateTag3 = "[object Date]", errorTag2 = "[object Error]", funcTag3 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag5 = "[object Map]", numberTag3 = "[object Number]", objectTag3 = "[object Object]", regexpTag3 = "[object RegExp]", setTag5 = "[object Set]", stringTag3 = "[object String]", symbolTag2 = "[object Symbol]", weakMapTag3 = "[object WeakMap]", arrayBufferTag3 = "[object ArrayBuffer]", dataViewTag4 = "[object DataView]", float32Tag3 = "[object Float32Array]", float64Tag3 = "[object Float64Array]", int8Tag3 = "[object Int8Array]", int16Tag3 = "[object Int16Array]", int32Tag3 = "[object Int32Array]", uint8Tag3 = "[object Uint8Array]", uint8ClampedTag3 = "[object Uint8ClampedArray]", uint16Tag3 = "[object Uint16Array]", uint32Tag3 = "[object Uint32Array]", cloneableTags = {};
cloneableTags[argsTag3] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag3] = cloneableTags[dataViewTag4] = cloneableTags[boolTag3] = cloneableTags[dateTag3] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag5] = cloneableTags[numberTag3] = cloneableTags[objectTag3] = cloneableTags[regexpTag3] = cloneableTags[setTag5] = cloneableTags[stringTag3] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = !0;
cloneableTags[errorTag2] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = !1;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer && (result = object ? customizer(value, key, object, stack) : customizer(value)), result !== void 0)
    return result;
  if (!isObject_default(value))
    return value;
  var isArr = isArray_default(value);
  if (isArr) {
    if (result = initCloneArray_default(value), !isDeep)
      return copyArray_default(value, result);
  } else {
    var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
    if ((0, import_isBuffer2.default)(value))
      return (0, import_cloneBuffer.default)(value, isDeep);
    if (tag == objectTag3 || tag == argsTag3 || isFunc && !object) {
      if (result = isFlat || isFunc ? {} : initCloneObject_default(value), !isDeep)
        return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result, value)) : copySymbols_default(value, baseAssign_default(result, value));
    } else {
      if (!cloneableTags[tag])
        return object ? value : {};
      result = initCloneByTag_default(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack_default());
  var stacked = stack.get(value);
  if (stacked)
    return stacked;
  stack.set(value, result), isSet_default(value) ? value.forEach(function(subValue) {
    result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
  }) : isMap_default(value) && value.forEach(function(subValue, key2) {
    result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default, props = isArr ? void 0 : keysFunc(value);
  return arrayEach_default(props || value, function(subValue, key2) {
    props && (key2 = subValue, subValue = value[key2]), assignValue_default(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  }), result;
}
var baseClone_default = baseClone;

// node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/cloneDeep.js
var CLONE_DEEP_FLAG2 = 1, CLONE_SYMBOLS_FLAG2 = 4;
function cloneDeep(value) {
  return baseClone_default(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG2);
}
var cloneDeep_default = cloneDeep;

// src/lib/PackageJSON.ts
var semver = __toModule(require_semver2()), AUTO_DEPENDENCIES = ["react", "react-dom", "prop-types", "object-assign"], dependencyKeys = [
  "dependencies",
  "optionalDependencies",
  "peerDependencies",
  "devDependencies"
], eachIteratorValue = ["", ""], PackageJSON = class {
  constructor() {
    this.allDependencies = new Map();
  }
  *eachDependency() {
    for (let depKey of dependencyKeys) {
      let deps = this[depKey];
      if (deps)
        for (let key in deps)
          eachIteratorValue[0] = key, eachIteratorValue[1] = deps[key], yield eachIteratorValue;
    }
  }
  normalizeDependencies() {
    for (let depKey of dependencyKeys) {
      let deps = this[depKey];
      if (deps)
        for (let moduleId in deps) {
          let version = deps[moduleId];
          version = version.replace(/\^/gm, ""), semver.clean(version, !1) ? this.allDependencies.set(moduleId, `${moduleId}@${semver.clean(version, !1)}`) : this.allDependencies.set(moduleId, moduleId);
        }
    }
    for (let autodep of AUTO_DEPENDENCIES)
      this.allDependencies.has(autodep) || this.allDependencies.set(autodep, autodep);
  }
  static parse(json, ClassName = PackageJSON) {
    let pkg = new ClassName();
    return pkg.process(json, ClassName), pkg;
  }
  process(json, ClassName = PackageJSON) {
    let parsed = JSON.parse(json);
    return typeof parsed.handle != "undefined" && delete parsed.handle, parsed.run = ClassName.normalizeRun(parsed.run || {}), parsed.esbuild = ClassName.normalizeESBuild(parsed.esbuild || {}), Object.assign(this, parsed), this.normalizeDependencies(), this;
  }
  static normalizeRun(run) {
    return typeof run.router == "string" && run.router ? (run.router = run.router.toLowerCase().trim(), run.isRouterUnset = !1) : (run.isRouterUnset = !0, run.router = ""), run;
  }
  toJSON() {
    let json = cloneDeep_default(this);
    return delete json.run.isRouterUnset, delete json.allDependencies, json;
  }
  static normalizeESBuild(esbuild) {
    return {};
  }
}, PackageJSONFile = class extends PackageJSON {
  constructor() {
    super();
  }
  static async fromHandle(handle) {
    let pkg = PackageJSONFile.parse(await (await handle.getFile()).text());
    return pkg.handle = handle, pkg;
  }
  async save() {
    let perm = await this.handle.createWritable({
      keepExistingData: !1
    }), json = this.toJSON();
    console.log(json);
    let text = JSON.stringify(json, null, 2), writer = perm.getWriter();
    await writer.write(text), await writer.close();
  }
  process(json, ClassName = PackageJSON) {
    return super.process(json, PackageJSONFile);
  }
  async reload() {
    this.process(await (await this.handle.getFile()).text(), PackageJSONFile);
  }
  static parse(json) {
    return super.parse(json, PackageJSONFile);
  }
  toJSON() {
    let json = super.toJSON();
    return delete json.handle, json;
  }
};

// node_modules/.pnpm/@jarred/htmlbuild@1.0.2/node_modules/@jarred/htmlbuild/index.mjs
var serializer = __toModule(require_lib3()), import_htmlparser2 = __toModule(require_lib6()), path2 = __toModule(require_path_browserify()), HTML2ESBuild = class {
  constructor() {
    this.scripts = new Map(), this.links = new Map();
  }
  generate(source, resolve) {
    let dom = (0, import_htmlparser2.parseDocument)(source);
    this.dom = dom;
    let config = {
      bundle: !0,
      metafile: !0,
      entryPoints: []
    }, src = "";
    for (let script of import_htmlparser2.DomUtils.getElementsByTagName("script", dom))
      src = script.attribs.src, src && !src.includes("://") && (src = resolve(src), this.scripts.set(src, script), config.entryPoints.push(src));
    for (let link of import_htmlparser2.DomUtils.getElementsByTagName("link", dom))
      (!link.attribs.rel || link.attribs.rel === "stylesheet") && link.attribs.href && !link.attribs.href.includes("://") && (src = resolve(link.attribs.href), this.links.set(src, link), config.entryPoints.push(src));
    return this.config = config, config;
  }
  renderToString(build2, config = this.config, resolveFrom, resolveTo) {
    if (!build2.metafile)
      throw "Build is missing metafile.";
    let {links, scripts} = this, meta = build2.metafile, cssOutputs = new Map(), file;
    for (let output in meta.outputs)
      file = meta.outputs[output], path2.extname(output) === ".css" && cssOutputs.set(output, file);
    let stylesheetsToInsert = new Map(), prefix = config.publicPath ? config.publicPath : "";
    for (let output in meta.outputs) {
      if (file = meta.outputs[output], !file.entryPoint)
        continue;
      let entryPoint = resolveFrom(file.entryPoint);
      if (scripts.has(entryPoint)) {
        let ext = path2.extname(output), cssName = output.substring(0, output.length - ext.length) + ".css", script = scripts.get(entryPoint);
        cssOutputs.has(cssName) && (!cssOutputs.get(cssName).entryPoint || !links.has(cssOutputs.get(cssName).entryPoint)) && stylesheetsToInsert.set(cssName, script), script.attribs.src = resolveTo(output);
      } else
        links.has(entryPoint) && (links.get(entryPoint).attribs.href = resolveTo(output));
    }
    for (let [stylesheetName, above] of stylesheetsToInsert.entries()) {
      var parser = new import_htmlparser2.Parser(new import_htmlparser2.DomHandler((err, elems) => {
        import_htmlparser2.DomUtils.prepend(above, elems[0]);
      }));
      parser.write(`<link rel="stylesheet" href="${resolveTo(stylesheetName)}" />`), parser.end();
    }
    return serializer.default(this.dom, {});
  }
};

// src/lib/Route.ts
var path3 = __toModule(require_path_browserify()), Route = class {
  constructor() {
    this.entryPoints = [];
    this.absWorkingDirectory = "";
    this.builder = new HTML2ESBuild();
    this.outDestination = "/";
    this.resolveFrom = (..._path) => path3.join(this.absWorkingDirectory, ..._path);
    this.resolveTo = (..._path) => path3.join(this.outDestination, ..._path);
  }
  static from(root2, pathname) {
    let route = new Route();
    return route.root = root2, route.absWorkingDirectory = pathname.endsWith(".html") ? path3.join(pathname, "../") : pathname, route;
  }
  async generateConfig(file) {
    let {entryPoints} = this.builder.generate(await file.text(), this.resolveFrom);
    this.entryPoints = entryPoints;
  }
  renderToString(result, config) {
    return this.builder.renderToString(result, config, this.resolveFrom, this.resolveTo);
  }
}, FilesystemRouter = class {
  constructor(packageRoot, pagesRoot) {
    this.packageRoot = packageRoot, this.pagesRoot = pagesRoot;
  }
  async routeFor(file, pathname) {
    let route = Route.from(this.packageRoot, pathname);
    return await route.generateConfig(file), route;
  }
  async resolve(pathname) {
    let {pagesRoot: fs} = this, target = pathname, file;
    if (pathname.indexOf("//") > -1 && (pathname = pathname.replace(/\/+/g, "/")), pathname.endsWith("/"))
      return target = pathname.slice(0, -1) + ".html", file = await fs.nativeFile(target), file ? await this.routeFor(file, target) : (target = pathname + "index.html", file = await fs.nativeFile(target), file ? await this.routeFor(file, target) : null);
    if (pathname.endsWith(".html") || (target = pathname + ".html"), file = await fs.nativeFile(target), file)
      return await this.routeFor(file, target);
    if (target = path3.normalize(path3.join(pathname, "../")), target.startsWith(".."))
      return null;
    for (let _result of await fs.readdir(target)) {
      let result = _result;
      if (result.kind === "file" && result.name.startsWith("[") && result.name.endsWith("].html")) {
        file = result;
        break;
      }
    }
    return file ? await this.routeFor(file, target) : null;
  }
}, SinglePageAppRouter = class extends FilesystemRouter {
  constructor() {
    super(...arguments);
    this.destination = "";
  }
  async resolve(pathname) {
    let {pagesRoot: fs} = this;
    return await this.routeFor(await fs.nativeFile(this.destination), "/");
  }
}, RouterType;
(function(RouterType2) {
  RouterType2.unknown = "", RouterType2.spa = "spa", RouterType2.filesystem = "filesystem";
})(RouterType || (RouterType = {}));

// src/lib/router/fs-native.ts
var path4 = __toModule(require_path_browserify()), NativeFS = class {
  constructor(root2) {
    this.relativePath = "/";
    this.handleCache = new Map();
    this.root = root2;
  }
  async nativeFile(_path) {
    if (this.handleCache.has(_path))
      return await this.handleCache.get(_path).getFile();
    let handle = await this.resolveFileHandle(_path);
    return handle ? (this.handleCache.set(_path, handle), await handle.getFile()) : null;
  }
  async fileHandleFor(_path) {
    if (this.handleCache.has(_path))
      return this.handleCache.get(_path);
    let handle = await this.resolveFileHandle(_path);
    return handle ? (this.handleCache.set(_path, handle), handle) : null;
  }
  async exists(_path) {
    if (this.handleCache.has(_path))
      return !0;
    let handle = await this.resolveFileHandle(_path);
    return handle ? (this.handleCache.set(_path, handle), !0) : !1;
  }
  async resolveFileHandle(__path, from = this.root) {
    let _path = __path;
    (!path4.isAbsolute(_path) || !_path.startsWith("/")) && (_path = path4.join("/", _path)), _path = path4.normalize(_path);
    let component = _path;
    for (; _path.includes("/") && _path.length > 1 && from; )
      try {
        if (_path = _path.startsWith("/") ? _path.substring(1) : _path, component = _path.substring(0, _path.indexOf("/")), _path.length - component.length > 0) {
          if (_path = _path.substring(component.length), !_path.includes("/")) {
            let hasMatch = !1;
            for await (let filename of from.keys())
              if (filename === _path) {
                hasMatch = !0;
                break;
              }
            return hasMatch ? await from.getFileHandle(_path) : null;
          }
          from = await from.getDirectoryHandle(component);
        } else {
          let hasMatch = !1;
          for await (let filename of from.keys())
            if (filename === component) {
              hasMatch = !0;
              break;
            }
          return hasMatch ? await from.getFileHandle(component) : null;
        }
      } catch (exception) {
        return console.error(__path, exception), null;
      }
    return null;
  }
  async resolveDirectoryHandle(_path, from = this.root) {
    (!path4.isAbsolute(_path) || !_path.startsWith("/")) && (_path = path4.join("/", _path)), _path = path4.normalize(_path);
    let component = _path;
    for (; _path.includes("/") && _path.length > 1 && from; )
      try {
        if (component = _path.substring(0, _path.indexOf("/")), _path.length - component.length > 0)
          _path = _path.substring(component.length), from = await from.getDirectoryHandle(component);
        else
          return await from.getDirectoryHandle(component);
      } catch (exception) {
        return console.error(exception), null;
      }
    return null;
  }
  async *readdir(_path) {
    let dir = await this.resolveDirectoryHandle(_path);
    !dir || (yield* dir.values());
  }
  async readFile(_path, encoding = "binary") {
    switch (encoding) {
      case "utf8":
        return this.readFileText(_path);
      case "binary":
        return this.readFileBinary(_path);
    }
  }
  async readFileBinary(_path) {
    return await (await this.nativeFile(_path)).arrayBuffer();
  }
  async readFileText(_path) {
    return await (await this.nativeFile(_path)).text();
  }
  async createReadStream(_path) {
    return (await this.nativeFile(_path)).stream();
  }
  realpath(_path) {
    return path4.normalize(_path);
  }
};

// src/lib/StoredPackage.ts
var permissionMode = {mode: "read"}, StoredPackage = class {
  constructor() {
    this.routerType = RouterType.unknown;
  }
  toRecord() {
    return {
      id: this.id,
      lastBuild: this.lastBuild || null,
      handle: this.handle,
      staticHandle: this.staticHandle,
      routerType: this.routerType
    };
  }
  static fromRecord(record) {
    let stored = new StoredPackage();
    return Object.assign(stored, record), stored.root = record.handle ? new NativeFS(record.handle) : null, stored.static = record.staticHandle ? new NativeFS(record.staticHandle) : null, stored;
  }
  static async fromJSON(opts) {
    let pkg = new StoredPackage();
    return Object.assign(pkg, opts), pkg.root = opts.handle ? new NativeFS(opts.handle) : null, pkg.static = opts.staticHandle ? new NativeFS(opts.staticHandle) : null, pkg;
  }
  async load() {
    await this.loadPackageJSON(), this.loadRouter();
  }
  loadRouter() {
    path5.extname(this.pkg.run?.router) === ".html" ? (this.routerType = RouterType.spa, this.router = new SinglePageAppRouter(this.root, this.static), this.router.destination = path5.basename(this.pkg.run.router)) : (this.routerType = RouterType.filesystem, this.router = new FilesystemRouter(this.root, this.static));
  }
  async loadPackageJSON() {
    let dir = this.root;
    if (await dir.root.queryPermission(permissionMode) !== "granted") {
      let error = new PackagerPermissionError(ErrorCode.requirePermission);
      throw error.directoryName = dir.root.name, error;
    }
    let packageJSONFileHandle;
    try {
      packageJSONFileHandle = await dir.fileHandleFor("package.json");
    } catch (exception) {
      throw PackagerError.with(ErrorCode.errorFetchingPackageJSON, exception);
    }
    this.pkg = await PackageJSONFile.fromHandle(packageJSONFileHandle);
  }
  loadConfig() {
  }
  normalizeURL(url) {
    return !url.startsWith("/") || !path5.isAbsolute(url) ? path5.normalize(path5.join("/" + url)) : path5.normalize(url);
  }
  async resolveStaticFile(url) {
    let file;
    if (file = await this.static.nativeFile(url), console.log(url), !file) {
      let headers2 = new Headers();
      return headers2.set("Cache-Control", "private"), headers2.set("Content-Type", "text/plain"), new Response(new Blob([`404 Not Found \u2013 ${url}
`]), {
        status: 404,
        headers: headers2
      });
    }
    let headers = new Headers();
    return headers.set("Content-Type", import_lite2.default.getType(file.name).toString()), typeof file.size == "number" && headers.set("Content-Length", file.size.toString()), new Response(file, {headers, status: 200});
  }
};

// src/lib/Database.ts
var Database = class {
  async load() {
    this.db || (this.db = await openDB("handles", 7, {
      upgrade(database, oldVersion, newVersion, transaction) {
        database.objectStoreNames.contains("packages") || database.createObjectStore("packages"), database.objectStoreNames.contains("dirs") || database.createObjectStore("dirs");
      }
    }));
  }
  async savePackage(pkg) {
    await this.load(), await this.db.put("packages", pkg.toRecord(), pkg.id);
  }
  async saveDir(directory) {
    await this.load(), await this.db.put("dirs", {directory, id: getPackageID()}, getPackageID());
  }
  async loadDir() {
    return await this.load(), (await this.db.get("dirs", getPackageID()))?.directory || null;
  }
  async loadPackage(id) {
    await this.load();
    let rec = await this.db.get("packages", id);
    return rec ? StoredPackage.fromRecord(rec) : null;
  }
};

// src/lib/rpc.ts
var Method;
(function(Method2) {
  Method2[Method2.bundle = 0] = "bundle", Method2[Method2.output = 1] = "output", Method2[Method2.bundleById = 2] = "bundleById", Method2[Method2.setPort = 3] = "setPort";
})(Method || (Method = {}));

// dist/_dev_/worker.jsurl
var worker_default = "/_dev_/worker.UXCYUCI7.jsurl";

// src/lib/Packager.ts
var Packager = class {
  constructor() {
    this._onMessage = (event) => {
      switch (event.data.method) {
        case Method.output: {
          this.onBundleComplete(event.data.params);
          break;
        }
        default:
          throw "Unknown message from worker.";
      }
    };
  }
  start() {
    let worker = new SharedWorker(worker_default, {type: "module"});
    worker.port.addEventListener("message", this._onMessage), worker.port.addEventListener("error", (message) => console.error(message.error)), this.port = worker.port, worker.port.start();
  }
  bundleById(id, origin) {
    this.port.postMessage({
      method: Method.bundleById,
      params: {
        origin,
        id
      }
    });
  }
  bundle(handle, origin) {
    this.port.postMessage({
      method: Method.bundle,
      params: {
        handle,
        origin
      }
    });
  }
};

// src/lib/InitialPackager.ts
var InitialPackager = class extends Packager {
  constructor() {
    super(...arguments);
    this.database = new Database();
  }
  async loadStoredPackage() {
    if (await this.database.load(), !await this.database.loadPackage(getPackageID()))
      return null;
  }
  async verify(handle) {
    return !0;
  }
};

// src/icons/GearIcon.tsx
var React = __toModule(require_react());
function GearIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", {
    viewBox: "0 0 64 64",
    xmlns: "http://www.w3.org/2000/svg",
    ...props
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M57.284 34.228l-3.988 1.14c-.36.105-.632.404-.702.773a20.72 20.72 0 01-.701 2.599 1 1 0 00.221 1.022l2.888 2.984c.31.321.37.81.148 1.197l-1.245 2.156a1 1 0 01-1.11.47l-4.05-1.014a1 1 0 00-.995.318 21.207 21.207 0 01-1.886 1.891 1 1 0 00-.318.994l1.013 4.047a1 1 0 01-.47 1.11l-2.157 1.245a1 1 0 01-1.196-.148l-3-2.901a1 1 0 00-1.021-.223c-.845.29-1.707.524-2.582.703-.368.07-.666.341-.772.701l-1.143 4.003c-.123.43-.516.726-.963.726h-2.49c-.447 0-.84-.296-.962-.726l-1.143-4.002a1.001 1.001 0 00-.774-.702 20.764 20.764 0 01-2.587-.696 1 1 0 00-1.02.222l-2.994 2.896a1 1 0 01-1.196.147l-2.157-1.245a1.001 1.001 0 01-.47-1.11l1.015-4.052c.09-.366-.033-.75-.318-.996a21.143 21.143 0 01-1.894-1.884 1 1 0 00-.994-.316l-4.044 1.013a1.001 1.001 0 01-1.11-.47l-1.246-2.157a1.001 1.001 0 01.148-1.197l2.893-2.99a1 1 0 00.222-1.023 20.774 20.774 0 01-.707-2.592 1.001 1.001 0 00-.702-.772l-3.989-1.14a1 1 0 01-.726-.963v-2.49a1 1 0 01.726-.963l3.989-1.14c.36-.105.631-.404.702-.773.177-.88.411-1.749.701-2.599a1 1 0 00-.222-1.022L9.02 21.296c-.311-.322-.371-.81-.148-1.197l1.245-2.156a1.001 1.001 0 011.11-.47l4.05 1.014a1 1 0 00.995-.318 21.19 21.19 0 011.886-1.891 1 1 0 00.318-.994l-1.014-4.047a1 1 0 01.47-1.11l2.157-1.245a1.001 1.001 0 011.196.148l3 2.902a1 1 0 001.022.222c.844-.29 1.706-.524 2.58-.703.37-.07.667-.341.773-.701l1.143-4.003c.123-.43.516-.726.963-.726h2.49c.447 0 .84.297.962.726l1.144 4.002c.105.36.404.632.773.702.877.176 1.74.409 2.587.696a1 1 0 001.021-.222l2.993-2.895a1 1 0 011.197-.148l2.156 1.245a1 1 0 01.47 1.11l-1.014 4.052a1 1 0 00.318.996c.67.587 1.303 1.216 1.894 1.884a1 1 0 00.993.316l4.045-1.012a1 1 0 011.11.47l1.244 2.156a1 1 0 01-.147 1.197l-2.893 2.99a1 1 0 00-.222 1.023c.291.848.527 1.714.707 2.592.07.369.341.667.701.773l3.99 1.14a1 1 0 01.725.962v2.49a1 1 0 01-.725.962zM22.642 19.795a.506.506 0 00-.753-.144c-6.832 5.563-7.86 15.612-2.296 22.444.686.841 1.455 1.61 2.296 2.296a.506.506 0 00.753-.145l5.76-9.976a4.5 4.5 0 000-4.5zm9.368-3.775a15.959 15.959 0 00-5.666 1.033.503.503 0 00-.25.721l5.771 9.996a4.5 4.5 0 003.898 2.25h11.525a.506.506 0 00.502-.58 15.993 15.993 0 00-15.78-13.42zm15.278 18H35.763a4.5 4.5 0 00-3.897 2.25l-5.771 9.996a.503.503 0 00.25.721c8.264 3.124 17.496-1.043 20.62-9.308.377-.996.653-2.028.825-3.079a.506.506 0 00-.502-.58z",
    fillRule: "evenodd"
  }));
}

// docs/PackageJSONEditor.tsx
var React5 = __toModule(require_react());

// node_modules/.pnpm/react-portal@4.2.1_react@17.0.1/node_modules/react-portal/es/PortalCompat.js
var import_react_dom3 = __toModule(require_react_dom());

// node_modules/.pnpm/react-portal@4.2.1_react@17.0.1/node_modules/react-portal/es/Portal.js
var import_react = __toModule(require_react()), import_prop_types = __toModule(require_prop_types()), import_react_dom = __toModule(require_react_dom());

// node_modules/.pnpm/react-portal@4.2.1_react@17.0.1/node_modules/react-portal/es/utils.js
var canUseDOM = !!(typeof window != "undefined" && window.document && window.document.createElement);

// node_modules/.pnpm/react-portal@4.2.1_react@17.0.1/node_modules/react-portal/es/Portal.js
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn(self2, call) {
  if (!self2)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return call && (typeof call == "object" || typeof call == "function") ? call : self2;
}
function _inherits(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, enumerable: !1, writable: !0, configurable: !0}}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
}
var Portal = function(_React$Component) {
  _inherits(Portal4, _React$Component);
  function Portal4() {
    return _classCallCheck(this, Portal4), _possibleConstructorReturn(this, (Portal4.__proto__ || Object.getPrototypeOf(Portal4)).apply(this, arguments));
  }
  return _createClass(Portal4, [{
    key: "componentWillUnmount",
    value: function() {
      this.defaultNode && document.body.removeChild(this.defaultNode), this.defaultNode = null;
    }
  }, {
    key: "render",
    value: function() {
      return canUseDOM ? (!this.props.node && !this.defaultNode && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode)), import_react_dom.default.createPortal(this.props.children, this.props.node || this.defaultNode)) : null;
    }
  }]), Portal4;
}(import_react.default.Component);
Portal.propTypes = {
  children: import_prop_types.default.node.isRequired,
  node: import_prop_types.default.any
};
var Portal_default = Portal;

// node_modules/.pnpm/react-portal@4.2.1_react@17.0.1/node_modules/react-portal/es/LegacyPortal.js
var import_react2 = __toModule(require_react()), import_react_dom2 = __toModule(require_react_dom()), import_prop_types2 = __toModule(require_prop_types()), _createClass2 = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor;
  };
}();
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _possibleConstructorReturn2(self2, call) {
  if (!self2)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return call && (typeof call == "object" || typeof call == "function") ? call : self2;
}
function _inherits2(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, enumerable: !1, writable: !0, configurable: !0}}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
}
var Portal2 = function(_React$Component) {
  _inherits2(Portal4, _React$Component);
  function Portal4() {
    return _classCallCheck2(this, Portal4), _possibleConstructorReturn2(this, (Portal4.__proto__ || Object.getPrototypeOf(Portal4)).apply(this, arguments));
  }
  return _createClass2(Portal4, [{
    key: "componentDidMount",
    value: function() {
      this.renderPortal();
    }
  }, {
    key: "componentDidUpdate",
    value: function(props) {
      this.renderPortal();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      import_react_dom2.default.unmountComponentAtNode(this.defaultNode || this.props.node), this.defaultNode && document.body.removeChild(this.defaultNode), this.defaultNode = null, this.portal = null;
    }
  }, {
    key: "renderPortal",
    value: function(props) {
      !this.props.node && !this.defaultNode && (this.defaultNode = document.createElement("div"), document.body.appendChild(this.defaultNode));
      var children = this.props.children;
      typeof this.props.children.type == "function" && (children = import_react2.default.cloneElement(this.props.children)), this.portal = import_react_dom2.default.unstable_renderSubtreeIntoContainer(this, children, this.props.node || this.defaultNode);
    }
  }, {
    key: "render",
    value: function() {
      return null;
    }
  }]), Portal4;
}(import_react2.default.Component), LegacyPortal_default = Portal2;
Portal2.propTypes = {
  children: import_prop_types2.default.node.isRequired,
  node: import_prop_types2.default.any
};

// node_modules/.pnpm/react-portal@4.2.1_react@17.0.1/node_modules/react-portal/es/PortalCompat.js
var Portal3 = void 0;
import_react_dom3.default.createPortal ? Portal3 = Portal_default : Portal3 = LegacyPortal_default;
var PortalCompat_default = Portal3;

// src/icons/Folder.tsx
var React4 = __toModule(require_react()), Folder = (props) => /* @__PURE__ */ React4.createElement("svg", {
  viewBox: "0 0 64 64",
  xmlns: "http://www.w3.org/2000/svg",
  ...props
}, /* @__PURE__ */ React4.createElement("path", {
  d: "M56.011 28.174l-1.623 21.077a3.002 3.002 0 01-2.995 2.77H12.649a3.003 3.003 0 01-2.995-2.77L8.03 28.174a2.001 2.001 0 011.997-2.153h43.988a2.001 2.001 0 011.997 2.153zm-1.99-8.153v3a1 1 0 01-1 1h-42a1 1 0 01-1-1v-9a2 2 0 012-2h11.343a4 4 0 012.828 1.172l3.657 3.656a4 4 0 002.829 1.172H52.02a2 2 0 012 2z",
  fillRule: "evenodd",
  fill: "currentColor"
}));

// docs/PackageJSONEditor.tsx
var PropertyBindingType;
(function(PropertyBindingType2) {
  PropertyBindingType2[PropertyBindingType2.router = 0] = "router";
})(PropertyBindingType || (PropertyBindingType = {}));
var QuoteLiteral = ({}) => /* @__PURE__ */ React5.createElement("span", {
  className: "CodeBox-token CodeBox-token--Quote"
}, '"'), PropertyName = ({children}) => /* @__PURE__ */ React5.createElement("span", {
  className: "CodeBox-token CodeBox-token--PropertyName"
}, children), StringKey = ({name}) => /* @__PURE__ */ React5.createElement("div", {
  className: "StringKey"
}, /* @__PURE__ */ React5.createElement(QuoteLiteral, null), /* @__PURE__ */ React5.createElement(PropertyName, null, `${name}`), /* @__PURE__ */ React5.createElement(QuoteLiteral, null), /* @__PURE__ */ React5.createElement(Colon, null)), Colon = ({}) => /* @__PURE__ */ React5.createElement("span", {
  className: "CodeBox-token CodeBox-token--Colon"
}, ":"), OpeningBrace = ({}) => /* @__PURE__ */ React5.createElement("span", {
  className: "CodeBox-token CodeBox-token--OpeningBrace"
}, "{"), ClosingBrace = ({}) => /* @__PURE__ */ React5.createElement("span", {
  className: "CodeBox-token CodeBox-token--ClosingBrace"
}, "}"), AutoCompleter = React5.forwardRef((props, ref) => {
  let _ref = React5.useRef();
  return React5.useImperativeHandle(ref, () => _ref), React5.useLayoutEffect(() => {
    _ref.current.innerText = props.defaultValue || "";
  }, [_ref, props.defaultValue]), /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement("div", {
    ref: _ref,
    contentEditable: !0,
    "data-focusable": !0,
    suppressContentEditableWarning: !0,
    className: "AutoCompletePropertyValue"
  }));
}), AutocompleteListItem = ({icon, label, value, selectedLength}) => /* @__PURE__ */ React5.createElement("div", {
  className: "AutocompleteListItem",
  "data-value": value
}, icon, /* @__PURE__ */ React5.createElement("div", {
  className: "AutocompleteListItem-label"
}, /* @__PURE__ */ React5.createElement("span", {
  className: "AutocompleteListItem-highlight"
}, label.substring(0, selectedLength)), label.substring(selectedLength))), HTMLIcon = (props) => /* @__PURE__ */ React5.createElement("svg", {
  viewBox: "0 0 640 512",
  ...props
}, /* @__PURE__ */ React5.createElement("path", {
  fill: "currentColor",
  d: "M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"
})), htmlIcon = /* @__PURE__ */ React5.createElement(HTMLIcon, {
  width: 18
}), folderIcon = /* @__PURE__ */ React5.createElement(Folder, {
  width: 18
}), BANNED_DIR_NAMES = [
  "node_modules",
  "bower_components",
  "test",
  "spec",
  "__test__",
  "__spec__",
  "vendor"
], routeTuple = [null, ""];
async function* walkRouteFiles(handle, parentName, isRoot = !0) {
  let relativeName = isRoot ? "" : parentName.length ? `${parentName}/${handle.name}` : handle.name;
  for await (let _entry of handle.values()) {
    let entry = _entry;
    if (!entry.name.startsWith("."))
      switch (entry.kind) {
        case "file": {
          entry.name.endsWith(".html") && (routeTuple[1] = `${relativeName}/${entry.name}`, routeTuple[0] = entry, yield routeTuple);
          break;
        }
        case "directory": {
          BANNED_DIR_NAMES.includes(entry.name) || (routeTuple[1] = `${relativeName}/${entry.name}/`, routeTuple[0] = entry, yield* await walkRouteFiles(entry, relativeName, !1));
          break;
        }
      }
  }
  routeTuple[1] = relativeName || "/", routeTuple[1].endsWith("/") || (routeTuple[1] += "/"), routeTuple[0] = handle, yield routeTuple;
}
async function getRouteFilesForHandle(handle) {
  let handles = [];
  for await (let [route, value] of walkRouteFiles(handle, ""))
    handles.push({
      handle: route,
      label: value,
      value,
      key: value,
      selectedLength: 0,
      icon: route.kind === "file" ? htmlIcon : folderIcon
    });
  return handles;
}
function viewSorter({props: aProps}, {props: bProps}) {
  return aProps.label === bProps.label ? 0 : aProps.label > bProps.label ? 1 : -1;
}
var AutoCompleteBox = React5.forwardRef(({editRef, values, query = ""}, ref) => {
  let container = React5.useRef();
  React5.useImperativeHandle(ref, () => container.current);
  let views;
  if (query.length) {
    let selectedLength = query.length, count = Math.min(values.length, 14);
    views = [];
    for (let i = 0; i < values.length; i++)
      values[i].label.startsWith(query) ? (values[i].selectedLength = selectedLength, views.push(React5.createElement(AutocompleteListItem, values[i]))) : query.startsWith("/") && !values[i].label.startsWith("/") && values[i].label.startsWith(query.substring(1)) && (values[i].selectedLength = selectedLength - 1, views.push(React5.createElement(AutocompleteListItem, values[i])));
    views.sort(viewSorter), views.length > count && (views.length = count);
  } else {
    let count = Math.min(values.length, 14);
    views = new Array(values.length);
    for (let i = 0; i < values.length; i++)
      values[i].selectedLength = 0, views[i] = React5.createElement(AutocompleteListItem, values[i]);
    views.sort(viewSorter), views.length > count && (views.length = count);
  }
  return /* @__PURE__ */ React5.createElement("div", {
    ref: container,
    className: "AutoCompleteBox"
  }, views);
});
function setCaretToEnd(target) {
  let range = document.createRange(), sel = window.getSelection();
  sel.removeAllRanges(), range.setStart(target, 0), sel.addRange(range), target.focus(), range.detach(), target.scrollTop = target.scrollHeight;
}
function blur(content) {
  content.blur(), content.dispatchEvent(new Event("blur", {bubbles: !0}));
}
function setSelectedIndex(container, index, ref) {
  ref.current = index;
  let node = container.childNodes.item(index), selected = container.querySelector("[data-selected]");
  if (selected !== node && selected)
    selected.removeAttribute("data-selected");
  else if (selected === node)
    return;
  node.setAttribute("data-selected", "true");
}
var AutoCompletePropertyValue = ({values, onChange, defaultValue}) => {
  let [hasFocus, setHasFocus] = React5.useState(!1), [route, setRoute] = React5.useState(defaultValue), editRef = React5.useRef(), boxRef = React5.useRef(), selectedIndex = React5.useRef(0), currentValue = React5.useRef(defaultValue);
  React5.useLayoutEffect(() => {
    let becomeFocus = () => setHasFocus(!0), resignFocus = () => {
      console.trace("t"), document.activeElement?.hasAttribute("contenteditable") || (setHasFocus(!1), onChange(currentValue.current), boxRef?.current && (boxRef.current.hidden = !0));
    };
    function checkClickOutside(event) {
      event.defaultPrevented || setHasFocus(!1);
    }
    return editRef.current.addEventListener("focusin", becomeFocus), editRef.current.addEventListener("focusout", resignFocus), () => {
      editRef.current.removeEventListener("focusin", becomeFocus), editRef.current.removeEventListener("focusout", resignFocus);
    };
  }, [editRef, setHasFocus, boxRef, onChange, currentValue]);
  let frameRef = React5.useRef();
  return React5.useLayoutEffect(() => {
    boxRef.current && setSelectedIndex(boxRef.current, 0, selectedIndex);
  }, [route, boxRef, values]), React5.useLayoutEffect(() => {
    if (!boxRef.current || !editRef.current)
      return;
    function onSelectionChange(event) {
      let selection = getSelection(), boundingRectEl = event.currentTarget.querySelector("[contenteditable]"), text = boundingRectEl.innerText;
      text ? setRoute(currentValue.current = text) : (setRoute(""), currentValue.current = ""), frameRef.current && cancelAnimationFrame(frameRef.current), frameRef.current = requestAnimationFrame(() => {
        setSelectedIndex(boxRef.current, 0, selectedIndex);
        let rect = boundingRectEl.getBoundingClientRect();
        boxRef.current.style.setProperty("--offset-x", `${rect.right}px`), boxRef.current.style.setProperty("--offset-y", `${rect.bottom}px`);
      });
    }
    let el = editRef.current.querySelector("[contenteditable]");
    if (setCaretToEnd(el), console.log(el), el.innerText) {
      let rect = el.getBoundingClientRect();
      boxRef.current.style.setProperty("--offset-x", `${rect.right}px`), boxRef.current.style.setProperty("--offset-y", `${rect.bottom}px`);
    } else {
      let rect = el.getBoundingClientRect();
      boxRef.current.style.setProperty("--offset-x", `${rect.right}px`), boxRef.current.style.setProperty("--offset-y", `${rect.bottom}px`);
    }
    function onMouseOver(event) {
      let listItem = event.target.closest(".AutoCompleteListItem");
      if (!listItem)
        return;
      let index = Array.prototype.indexOf.call(listItem.parentElement.childNodes, listItem);
      return setSelectedIndex(boxRef.current, index, selectedIndex), listItem;
    }
    function onKeyDown(event) {
      switch (event.key) {
        case "ArrowUp": {
          let newIndex = selectedIndex.current - 1;
          newIndex = newIndex < 0 ? boxRef.current.childElementCount - 1 : newIndex, event.preventDefault(), setSelectedIndex(boxRef.current, newIndex, selectedIndex);
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          let newIndex = selectedIndex.current + 1;
          newIndex = newIndex > boxRef.current.childElementCount - 1 ? 0 : newIndex, setSelectedIndex(boxRef.current, newIndex, selectedIndex);
          break;
        }
        case "Escape": {
          event.preventDefault();
          let content = editRef.current.querySelector("[contenteditable]");
          blur(content);
          break;
        }
        case "Enter": {
          event.preventDefault();
          let content = editRef.current.querySelector("[contenteditable]");
          onSelectValue(content, boxRef.current.childNodes.item(selectedIndex.current).getAttribute("data-value"));
          break;
        }
      }
    }
    function doFocus(event) {
      event.preventDefault(), editRef.current.querySelector("[contenteditable]").focus();
    }
    function onSelectValue(content, value) {
      currentValue.current = content.innerText = value, getSelection().modify("move", "right", "line"), blur(content);
    }
    function onClickItem(event) {
      let item = onMouseOver(event);
      if (item) {
        event.preventDefault();
        let content = editRef.current.querySelector("[contenteditable]");
        onSelectValue(content, item.getAttribute("data-value"));
      }
    }
    return editRef.current.addEventListener("keydown", onKeyDown), editRef.current.addEventListener("click", doFocus), editRef.current.addEventListener("input", onSelectionChange), boxRef.current.addEventListener("mouseover", onMouseOver), boxRef.current.addEventListener("mousedown", onClickItem), () => {
      cancelAnimationFrame(frameRef.current), editRef.current && (editRef.current.removeEventListener("input", onSelectionChange), editRef.current.removeEventListener("click", doFocus), editRef.current.removeEventListener("keydown", onKeyDown)), boxRef.current && (boxRef.current.removeEventListener("mousedown", onClickItem), boxRef.current.removeEventListener("mouseover", onMouseOver));
    };
  }, [
    editRef,
    boxRef,
    frameRef,
    selectedIndex,
    currentValue,
    hasFocus,
    setRoute
  ]), React5.useLayoutEffect(() => {
    hasFocus && (editRef.current.querySelector("[contenteditable]").innerText = currentValue.current, setSelectedIndex(boxRef.current, 0, selectedIndex));
  }, [currentValue, hasFocus, editRef, boxRef]), /* @__PURE__ */ React5.createElement("div", {
    ref: editRef,
    className: "AutoCompleteContainer"
  }, /* @__PURE__ */ React5.createElement(QuoteLiteral, null), /* @__PURE__ */ React5.createElement(AutoCompleter, {
    defaultValue
  }), /* @__PURE__ */ React5.createElement(QuoteLiteral, null), hasFocus && /* @__PURE__ */ React5.createElement(PortalCompat_default, null, /* @__PURE__ */ React5.createElement(AutoCompleteBox, {
    query: route,
    values,
    ref: boxRef
  })));
}, Unimportant = ({children}) => /* @__PURE__ */ React5.createElement("span", {
  className: "CodeBox-token CodeBox-token--unimportant"
}, children);
function lineFocuser(event) {
  let focusLine = event.target.closest(".CodeBox-line");
  if (focusLine) {
    let focusable = focusLine.querySelector("[data-focusable]");
    focusable && document.activeElement !== focusable && focusable.focus();
  }
}
var PackageJSONEditor = ({
  pkg,
  folderName,
  values,
  onChange,
  defaultValue,
  onSave,
  hasChanged,
  propertyBinding = 0
}) => {
  let [isExpanded, setExpanded] = React5.useState(!1);
  return pkg.name ? /* @__PURE__ */ React5.createElement("div", {
    className: "CodeBox-container"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "CodeBox-heading"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "CodeBox-filename"
  }, /* @__PURE__ */ React5.createElement(Unimportant, null, folderName, "/"), "package.json")), /* @__PURE__ */ React5.createElement("div", {
    onClick: lineFocuser,
    className: "CodeBox"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "CodeBox-line CodeBox-Indent"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "Ellipsis"
  }, "...")), /* @__PURE__ */ React5.createElement("div", {
    className: "CodeBox-line CodeBox-Indent"
  }, /* @__PURE__ */ React5.createElement(StringKey, {
    name: "run"
  }), /* @__PURE__ */ React5.createElement(OpeningBrace, null)), /* @__PURE__ */ React5.createElement("div", {
    className: `CodeBox-line CodeBox-line--enabled ${defaultValue ? "" : "CodeBox-line--enabled--invalid"} CodeBox-line--flex CodeBox-Indent CodeBox-Indent--2`
  }, /* @__PURE__ */ React5.createElement(StringKey, {
    name: "router"
  }), /* @__PURE__ */ React5.createElement(AutoCompletePropertyValue, {
    values,
    onChange,
    defaultValue
  })), /* @__PURE__ */ React5.createElement("div", {
    className: "CodeBox-line CodeBox-Indent"
  }, /* @__PURE__ */ React5.createElement(ClosingBrace, null)), /* @__PURE__ */ React5.createElement("div", {
    className: "CodeBox-line CodeBox-Indent"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "Ellipsis"
  }, "..."))), /* @__PURE__ */ React5.createElement("div", {
    className: "CodeBox-heading CodeBox-heading--footer"
  }, /* @__PURE__ */ React5.createElement("div", {
    onClick: hasChanged ? onSave : void 0,
    "data-disabled": !hasChanged,
    className: "CodeBox-action"
  }, "Save changes"))) : null;
};

// src/icons/filetypes/CSSFileType.tsx
var React6 = __toModule(require_react());
function CSSFileType(props) {
  return /* @__PURE__ */ React6.createElement("svg", {
    viewBox: "0 0 32 32",
    ...props
  }, /* @__PURE__ */ React6.createElement("path", {
    fill: "#1572b6",
    d: "M5.902 27.201L3.656 2h24.688l-2.249 25.197L15.985 30 5.902 27.201z"
  }), /* @__PURE__ */ React6.createElement("path", {
    fill: "#33a9dc",
    d: "M16 27.858l8.17-2.265 1.922-21.532H16v23.797z"
  }), /* @__PURE__ */ React6.createElement("path", {
    fill: "#fff",
    d: "M16 13.191h4.09l.282-3.165H16V6.935h7.75l-.074.829-.759 8.518H16v-3.091z"
  }), /* @__PURE__ */ React6.createElement("path", {
    fill: "#ebebeb",
    d: "M16.019 21.218l-.014.004-3.442-.93-.22-2.465H9.24l.433 4.853 6.331 1.758.015-.004v-3.216z"
  }), /* @__PURE__ */ React6.createElement("path", {
    fill: "#fff",
    d: "M19.827 16.151l-.372 4.139-3.447.93v3.216l6.336-1.756.047-.522.537-6.007h-3.101z"
  }), /* @__PURE__ */ React6.createElement("path", {
    fill: "#ebebeb",
    d: "M16.011 6.935v3.091H8.545l-.062-.695-.141-1.567-.074-.829h7.743zM16 13.191v3.091H12.601l-.062-.695-.14-1.567-.074-.829H16z"
  }));
}

// src/icons/filetypes/HTMLFileType.tsx
var React7 = __toModule(require_react()), HTMLFileType = ({width, height, className}) => /* @__PURE__ */ React7.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width,
  height,
  className,
  viewBox: "0 0 32 32"
}, /* @__PURE__ */ React7.createElement("path", {
  fill: "#e44f26",
  d: "M5.902 27.201L3.655 2 28.345 2 26.095 27.197 15.985 30 5.902 27.201z"
}), /* @__PURE__ */ React7.createElement("path", {
  fill: "#f1662a",
  d: "M16 27.858L24.17 25.593 26.092 4.061 16 4.061 16 27.858z"
}), /* @__PURE__ */ React7.createElement("path", {
  fill: "#ebebeb",
  d: "M16 13.407L11.91 13.407 11.628 10.242 16 10.242 16 7.151 15.989 7.151 8.25 7.151 8.324 7.981 9.083 16.498 16 16.498 16 13.407z"
}), /* @__PURE__ */ React7.createElement("path", {
  fill: "#ebebeb",
  d: "M16 21.434L15.986 21.438 12.544 20.509 12.324 18.044 10.651 18.044 9.221 18.044 9.654 22.896 15.986 24.654 16 24.65 16 21.434z"
}), /* @__PURE__ */ React7.createElement("path", {
  fill: "#fff",
  d: "M15.989 13.407L15.989 16.498 19.795 16.498 19.437 20.507 15.989 21.437 15.989 24.653 22.326 22.896 22.372 22.374 23.098 14.237 23.174 13.407 22.341 13.407 15.989 13.407z"
}), /* @__PURE__ */ React7.createElement("path", {
  fill: "#fff",
  d: "M15.989 7.151L15.989 9.071 15.989 10.235 15.989 10.242 23.445 10.242 23.445 10.242 23.455 10.242 23.517 9.548 23.658 7.981 23.732 7.151 15.989 7.151z"
}));

// src/icons/filetypes/JavaScriptFileType.tsx
var React8 = __toModule(require_react());
function JavaScriptFileType(props) {
  return /* @__PURE__ */ React8.createElement("svg", {
    viewBox: "0 0 32 32",
    ...props
  }, /* @__PURE__ */ React8.createElement("path", {
    d: "M18.774 19.7a3.727 3.727 0 003.376 2.078c1.418 0 2.324-.709 2.324-1.688 0-1.173-.931-1.589-2.491-2.272l-.856-.367c-2.469-1.052-4.11-2.37-4.11-5.156 0-2.567 1.956-4.52 5.012-4.52A5.058 5.058 0 0126.9 10.52l-2.665 1.711a2.327 2.327 0 00-2.2-1.467 1.489 1.489 0 00-1.638 1.467c0 1.027.636 1.442 2.1 2.078l.856.366c2.908 1.247 4.549 2.518 4.549 5.376 0 3.081-2.42 4.769-5.671 4.769a6.575 6.575 0 01-6.236-3.5zM6.686 20c.538.954 1.027 1.76 2.2 1.76 1.124 0 1.834-.44 1.834-2.15V7.975h3.422v11.683c0 3.543-2.078 5.156-5.11 5.156A5.312 5.312 0 013.9 21.688z",
    fill: "#f5de19"
  }));
}

// src/icons/filetypes/TypeScriptFileType.tsx
var React9 = __toModule(require_react());
function TypeScriptFileType(props) {
  return /* @__PURE__ */ React9.createElement("svg", {
    viewBox: "0 0 32 32",
    ...props
  }, /* @__PURE__ */ React9.createElement("rect", {
    x: 2,
    y: 2,
    width: 28,
    height: 28,
    rx: 1.312,
    fill: "#3178c6"
  }), /* @__PURE__ */ React9.createElement("path", {
    d: "M18.245 23.759v3.068a6.492 6.492 0 001.764.575 11.56 11.56 0 002.146.192 9.968 9.968 0 002.088-.211 5.11 5.11 0 001.735-.7 3.542 3.542 0 001.181-1.266 4.469 4.469 0 00.186-3.394 3.409 3.409 0 00-.717-1.117 5.236 5.236 0 00-1.123-.877 12.027 12.027 0 00-1.477-.734q-.6-.249-1.08-.484a5.5 5.5 0 01-.813-.479 2.089 2.089 0 01-.516-.518 1.091 1.091 0 01-.181-.618 1.039 1.039 0 01.162-.571 1.4 1.4 0 01.459-.436 2.439 2.439 0 01.726-.283 4.211 4.211 0 01.956-.1 5.942 5.942 0 01.808.058 6.292 6.292 0 01.856.177 5.994 5.994 0 01.836.3 4.657 4.657 0 01.751.422V13.9a7.509 7.509 0 00-1.525-.4 12.426 12.426 0 00-1.9-.129 8.767 8.767 0 00-2.064.235 5.239 5.239 0 00-1.716.733 3.655 3.655 0 00-1.171 1.271 3.731 3.731 0 00-.431 1.845 3.588 3.588 0 00.789 2.34 6 6 0 002.395 1.639q.63.26 1.175.509a6.458 6.458 0 01.942.517 2.463 2.463 0 01.626.585 1.2 1.2 0 01.23.719 1.1 1.1 0 01-.144.552 1.269 1.269 0 01-.435.441 2.381 2.381 0 01-.726.292 4.377 4.377 0 01-1.018.105 5.773 5.773 0 01-1.969-.35 5.874 5.874 0 01-1.805-1.045zm-5.154-7.638h4v-2.527H5.938v2.527H9.92v11.254h3.171z",
    fill: "#fff",
    fillRule: "evenodd"
  }));
}

// src/icons/filetypes/filetypes.tsx
var filetypes = {
  ".js": JavaScriptFileType,
  ".jsx": JavaScriptFileType,
  ".mjs": JavaScriptFileType,
  ".cjs": JavaScriptFileType,
  ".html": HTMLFileType,
  ".ts": TypeScriptFileType,
  ".tsx": TypeScriptFileType,
  ".css": CSSFileType
};

// src/_dev_/NewProjectPage.tsx
var path6 = __toModule(require_path_browserify());
var packager = new InitialPackager(), DirectoryLoadState;
(function(DirectoryLoadState2) {
  DirectoryLoadState2[DirectoryLoadState2.loading = 0] = "loading", DirectoryLoadState2[DirectoryLoadState2.loaded = 1] = "loaded";
})(DirectoryLoadState || (DirectoryLoadState = {}));
var pkgJSON = new PackageJSONFile(), PackageContext = React10.createContext({
  directory: null,
  packager,
  id: getPackageID(),
  setDirectory: () => {
  },
  pkgJSON,
  directoryLoadingState: 0
}), PackageProvider = ({children}) => {
  let [directory, _setDirectory] = React10.useState(null), [directoryLoadingState, setDirectoryLoadState] = React10.useState(0), setDirectory = React10.useCallback((dirHandle) => {
    _setDirectory(dirHandle), dirHandle && packager.database.saveDir(dirHandle).then((a) => console.log("Saved dirHandle")), setDirectoryLoadState(1);
  }, [_setDirectory, setDirectoryLoadState]);
  React10.useEffect(() => {
    packager.database.loadDir().then(async (dir) => {
      if (dir && await dir.queryPermission({mode: "read"}) !== "granted" && await dir.requestPermission({mode: "read"}) === "denied")
        return null;
      if (dir)
        return pkgJSON.handle = await dir.getFileHandle("package.json"), pkgJSON.process(await (await pkgJSON.handle.getFile()).text()), dir;
    }).then((dir) => {
      dir && _setDirectory(dir), setDirectoryLoadState(1);
    }, (e) => {
      console.error(e), setDirectoryLoadState(1);
    });
  }, [setDirectoryLoadState, packager, _setDirectory, pkgJSON]);
  let contextValue = React10.useMemo(() => ({
    packager,
    directory,
    setDirectory,
    pkgJSON,
    id: getPackageID(),
    directoryLoadingState
  }), [packager, directory, setDirectory, getPackageID, directoryLoadingState]);
  return /* @__PURE__ */ React10.createElement(PackageContext.Provider, {
    value: contextValue
  }, children);
}, Title = ({children}) => /* @__PURE__ */ React10.createElement("div", {
  className: "Title"
}, children), Monospace = ({children}) => /* @__PURE__ */ React10.createElement("span", {
  className: "Monospace"
}, children), Highlight = ({children}) => /* @__PURE__ */ React10.createElement("span", {
  className: "Highlight"
}, children), Instructions = ({children}) => /* @__PURE__ */ React10.createElement("div", {
  className: "Paragraph"
}, children), Dropbox = ({children, dragState, onClick}) => /* @__PURE__ */ React10.createElement("div", {
  onClick,
  className: `Dropbox ${DragStateClasses[dragState]}`
}, /* @__PURE__ */ React10.createElement("div", {
  className: "Dropbox-background"
}, /* @__PURE__ */ React10.createElement("svg", {
  width: "100%",
  height: "100%"
}, /* @__PURE__ */ React10.createElement("rect", {
  x: "0",
  y: "0",
  width: "100%",
  height: "100%",
  r: "20"
}))), /* @__PURE__ */ React10.createElement("div", {
  className: "Dropbox-foreground"
}, children)), HelpText = ({children}) => /* @__PURE__ */ React10.createElement("div", {
  className: "HelpText"
}, children), StatusLightLevel;
(function(StatusLightLevel2) {
  StatusLightLevel2[StatusLightLevel2.unknown = 0] = "unknown", StatusLightLevel2[StatusLightLevel2.verifying = 1] = "verifying", StatusLightLevel2[StatusLightLevel2.built = 2] = "built", StatusLightLevel2[StatusLightLevel2.error = 3] = "error";
})(StatusLightLevel || (StatusLightLevel = {}));
var StatusLightLevelClassNames = [
  "StatusLightLevel--unknown",
  "StatusLightLevel--verifying",
  "StatusLightLevel--building",
  "StatusLightLevel--error"
], StatusLight = ({level}) => /* @__PURE__ */ React10.createElement("span", {
  className: `StatusLight ${StatusLightLevelClassNames[level]}`
}), AttachFolderStep = ({dragState, onClickDropbox}) => /* @__PURE__ */ React10.createElement("main", {
  className: "NewProjectPage"
}, /* @__PURE__ */ React10.createElement("div", {
  className: "TitleContainer"
}, /* @__PURE__ */ React10.createElement(StatusLight, {
  level: 0
}), /* @__PURE__ */ React10.createElement("div", {
  className: "TitleGroup"
}, /* @__PURE__ */ React10.createElement(Title, null, "Start ", /* @__PURE__ */ React10.createElement(Monospace, null, getPackageID())), /* @__PURE__ */ React10.createElement(Instructions, null, "Drag and drop a ", /* @__PURE__ */ React10.createElement(Highlight, null, "\u{1F4C2} folder"), " with a", " ", /* @__PURE__ */ React10.createElement(Monospace, null, "package.json"), " inside."))), /* @__PURE__ */ React10.createElement(Dropbox, {
  onClick: onClickDropbox,
  dragState
}, "Drop folder with a package.json in here"), /* @__PURE__ */ React10.createElement(HelpText, null, "Code with your local editor, and your dev server syncs automatically. There's nothing to install. There are no commands to run. Your code stays on your local computer."), /* @__PURE__ */ React10.createElement(Footer, null)), Footer = () => /* @__PURE__ */ React10.createElement("div", {
  className: "Footer"
}, /* @__PURE__ */ React10.createElement("div", null, new Intl.DateTimeFormat(["lookup"], {
  dateStyle: "short",
  timeStyle: "long"
}).format(new Date())), /* @__PURE__ */ React10.createElement("div", null, getPackageID())), ProjectStep;
(function(ProjectStep2) {
  ProjectStep2[ProjectStep2.attach = 0] = "attach", ProjectStep2[ProjectStep2.verifyFolder = 1] = "verifyFolder", ProjectStep2[ProjectStep2.config = 2] = "config", ProjectStep2[ProjectStep2.ready = 3] = "ready", ProjectStep2[ProjectStep2.loadFolder = 4] = "loadFolder", ProjectStep2[ProjectStep2.petitionMozilla = 5] = "petitionMozilla", ProjectStep2[ProjectStep2.petitionWebkit = 6] = "petitionWebkit";
})(ProjectStep || (ProjectStep = {}));
var PetitionMozilla = ({}) => /* @__PURE__ */ React10.createElement("div", {
  className: "Petition"
}, /* @__PURE__ */ React10.createElement(Title, null, "Firefox doesn't support the Filesystem Access API"), /* @__PURE__ */ React10.createElement(Instructions, null, "In the meantime, you'll have to use a Chromium-based browser. Voice your support for the Filesystem Access API."), /* @__PURE__ */ React10.createElement(GitHubButton, {
  href: "https://github.com/mozilla/standards-positions/issues/154"
}, "Petition Mozilla")), GitHubButton = ({children, href}) => /* @__PURE__ */ React10.createElement("a", {
  href,
  target: "_blank",
  rel: "noopener",
  className: "GitHubButton"
}, children), TweetButton = ({children, href}) => /* @__PURE__ */ React10.createElement("a", {
  href,
  target: "_blank",
  rel: "noopener",
  className: "TweetButton"
}, children), PetitionWebkit = ({}) => /* @__PURE__ */ React10.createElement("div", {
  className: "Petition"
}, /* @__PURE__ */ React10.createElement(Title, null, "Apple won't let you do that."), /* @__PURE__ */ React10.createElement(Instructions, null, "By", " ", /* @__PURE__ */ React10.createElement("a", {
  target: "_blank",
  rel: "noopener",
  href: "https://lists.webkit.org/pipermail/webkit-dev/2020-August/031362.html"
}, "refusing"), " ", "to support the filesystem access API, Apple is holding back the free and open internet."), /* @__PURE__ */ React10.createElement(Instructions, null, "20% of Apple's revenue comes from Software & Services. Apple's stance on the filesystem access API helps ensure a future where only software Apple can monetize runs on devices you own."), /* @__PURE__ */ React10.createElement(TweetButton, null, "Tweet")), BrowserType;
(function(BrowserType2) {
  BrowserType2[BrowserType2.unknown = 0] = "unknown", BrowserType2[BrowserType2.firefox = 1] = "firefox", BrowserType2[BrowserType2.webkit = 2] = "webkit";
})(BrowserType || (BrowserType = {}));
var DragState;
(function(DragState2) {
  DragState2[DragState2.none = 0] = "none", DragState2[DragState2.drag = 1] = "drag", DragState2[DragState2.drop = 2] = "drop", DragState2[DragState2.success = 3] = "success";
})(DragState || (DragState = {}));
var DragStateClasses = [
  "DragState--none",
  "DragState--drag",
  "DragState--drop",
  "DragState--success"
], getBrowserType = () => typeof InstallTrigger != "undefined" ? 1 : navigator?.userAgent?.toLowerCase()?.includes("webkit") && !navigator?.userAgent?.toLowerCase()?.includes("chrome") ? 2 : 0, FileSystemRouteDescriptor = ({router, values}) => (console.log(router, values), null), EntryPoint = ({
  entryPoint,
  route
}) => {
  let IconComponent = filetypes[path6.extname(entryPoint)], [errorCode, setErrorCode] = React10.useState(-1);
  return React10.useEffect(() => {
    let didClose = !1;
    async function doesFileExist() {
      if (didClose)
        return;
      let doesExist = await route.root.exists(entryPoint);
      didClose || doesExist || setErrorCode(ErrorCode.missingEntryFiles);
    }
    return doesFileExist(), () => {
      didClose = !0;
    };
  }, [route, entryPoint, setErrorCode]), /* @__PURE__ */ React10.createElement("div", {
    className: `EntryPoint ${IconComponent ? "EntryPoint--withIcon" : ""} ${ErrorCode.missingEntryFiles === errorCode ? "EntryPoint--withError" : ""}`
  }, /* @__PURE__ */ React10.createElement("div", {
    className: "EntryPoint-icon"
  }, IconComponent && /* @__PURE__ */ React10.createElement(IconComponent, {
    width: 24,
    height: 24
  })), /* @__PURE__ */ React10.createElement("div", {
    className: "EntryPoint-label"
  }, entryPoint), errorCode === ErrorCode.missingEntryFiles && /* @__PURE__ */ React10.createElement("div", {
    className: "EntryPoint-error"
  }, "Missing file"));
}, Lowercase = ({children}) => /* @__PURE__ */ React10.createElement("span", {
  className: "Lowercase"
}, children), SPARouteDescriptor = ({
  router: {handle, value: filepath, icon},
  values: tree
}) => {
  let route = React10.useRef(), {directory} = React10.useContext(PackageContext), [entryPoints, setEntryPoints] = React10.useState([]), [errorCode, setErrorCode] = React10.useState(-1);
  React10.useEffect(() => {
    let didCancel = !1;
    route.current || (route.current = Route.from(new NativeFS(directory), filepath));
    async function load() {
      if (didCancel)
        return;
      let _route = route.current;
      await _route.generateConfig(await handle.getFile()), setEntryPoints(_route.entryPoints);
    }
    return load(), () => {
      didCancel = !0;
    };
  }, [route, handle, filepath, setEntryPoints, directory]);
  let entryPointViews = new Array(entryPoints.length);
  for (let i = 0; i < entryPointViews.length; i++)
    entryPointViews[i] = /* @__PURE__ */ React10.createElement(EntryPoint, {
      entryPoint: entryPoints[i],
      key: entryPoints[i] + (route?.current?.absWorkingDirectory ?? ""),
      route: route.current
    });
  return /* @__PURE__ */ React10.createElement("div", {
    className: "SPARouteDescriptor"
  }, /* @__PURE__ */ React10.createElement("a", {
    href: "/",
    target: "_blank",
    className: "Section-label Section-label--url"
  }, /* @__PURE__ */ React10.createElement("span", {
    className: "Section-label--url-indicator"
  }, location.origin, "/"), "*"), /* @__PURE__ */ React10.createElement("div", {
    className: "Routing-explanation"
  }, "Navigation requests route to\xA0", /* @__PURE__ */ React10.createElement(Monospace, null, filepath), ". Open any url in ", location.origin, "/ from your browser to bundle & render."), /* @__PURE__ */ React10.createElement("div", {
    className: "Section-label Section-label--level-2"
  }, "Entry points", " ", /* @__PURE__ */ React10.createElement(Lowercase, null, /* @__PURE__ */ React10.createElement(Monospace, null, "<script>"), " &", " ", /* @__PURE__ */ React10.createElement(Monospace, null, "<link>"), " in", " ", /* @__PURE__ */ React10.createElement(Monospace, null, filepath))), /* @__PURE__ */ React10.createElement("div", {
    className: "EntryPointList"
  }, entryPointViews));
}, NewProjectPage = () => {
  let [step, setStep] = React10.useState(() => location.pathname.endsWith("/setup") ? 0 : 1), {
    directory,
    directoryLoadingState,
    packager: packager2,
    pkgJSON: pkgJSON2,
    id,
    setDirectory: _setDirectory
  } = React10.useContext(PackageContext), [dragState, setDragState] = React10.useState(0);
  React10.useEffect(() => {
    function onPopState(event) {
      let question = location.pathname.indexOf("?");
      switch (location.pathname.substring(0, question > -1 ? question : void 0)) {
        case "/_dev_/config": {
          setStep(1);
          break;
        }
        case "/_dev_/setup": {
          setStep(0);
          break;
        }
        default:
          location.reload();
      }
    }
    return window.addEventListener("popstate", onPopState), () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [setStep]);
  let setDirectory = React10.useCallback(async (handle) => {
    try {
      let file = await handle.getFileHandle("package.json");
      if (!file)
        return !1;
      pkgJSON2.process(await (await file.getFile()).text());
    } catch (exception) {
      return console.error(exception), alert("Please choose a folder with a valid package.json inside. More specific exception is in the console"), !1;
    }
    return _setDirectory(handle), setStep(1), !0;
  }, [_setDirectory, setStep, pkgJSON2]), handleClick = React10.useCallback(async (evt) => {
    if (evt.preventDefault(), typeof window.showDirectoryPicker != "function") {
      switch (getBrowserType()) {
        case 1: {
          setStep(5);
          break;
        }
        case 2: {
          setStep(6);
          break;
        }
        default:
          alert("Your browser doesn't support the Filesystem Access API. Sorry.");
      }
      return;
    }
    let handle = await window.showDirectoryPicker();
    await setDirectory(handle) && history.pushState({}, document.title, "/_dev_/config");
  }, [setDirectory, setStep]);
  switch (React10.useLayoutEffect(() => {
    let onDragOver = (e) => {
      setDragState(1), e.preventDefault();
    }, onDragEnd = (e) => {
      setDragState(0);
    };
    return document.body.addEventListener("dragover", onDragOver), document.body.addEventListener("dragend", onDragEnd), document.body.addEventListener("dragleave", onDragEnd), document.body.addEventListener("dragexit", onDragEnd), () => {
      document.body.removeEventListener("dragover", onDragOver), document.body.removeEventListener("dragend", onDragEnd), document.body.removeEventListener("dragleave", onDragEnd), document.body.removeEventListener("dragexit", onDragEnd);
    };
  }, [setDragState]), React10.useLayoutEffect(() => {
    let onDrop = async (e) => {
      e.preventDefault();
      let filesCount = 0, directory2;
      for (let item of e.dataTransfer.items) {
        if (item.kind === "file") {
          if (!item.getAsFileSystemHandle) {
            switch (getBrowserType()) {
              case 1: {
                setDragState(0), setStep(5);
                break;
              }
              case 2: {
                setDragState(0), setStep(6);
                break;
              }
              default:
                alert("Your browser doesn't support the Filesystem Access API. Sorry.");
            }
            return;
          }
          let entry = await item.getAsFileSystemHandle();
          if (entry.kind === "directory")
            directory2 = entry;
          else {
            setDragState(0), alert("Please drop the folder instead of files in the folder (it needs folder access)");
            return;
          }
        }
        directory2 && (setDirectory(directory2), setDragState(3));
      }
    };
    return document.body.addEventListener("drop", onDrop), () => {
      document.body.removeEventListener("drop", onDrop);
    };
  }, [setDirectory, setStep, setDragState]), step) {
    case 0:
      return /* @__PURE__ */ React10.createElement(AttachFolderStep, {
        dragState,
        onClickDropbox: handleClick
      });
    case 5:
      return /* @__PURE__ */ React10.createElement(PetitionMozilla, null);
    case 6:
      return /* @__PURE__ */ React10.createElement(PetitionWebkit, null);
    case 1:
      return /* @__PURE__ */ React10.createElement(VerifyFolder, {
        packager: packager2,
        directory
      });
  }
}, RoutingSection = ({}) => {
  let {directory, directoryLoadingState, pkgJSON: pkgJSON2} = React10.useContext(PackageContext), [route, setRoute] = React10.useState(() => pkgJSON2?.run?.router ? pkgJSON2?.run?.router : ""), [savedRoute, setSavedRoute] = React10.useState(route);
  React10.useEffect(() => {
    directoryLoadingState === 1 && (setRoute(pkgJSON2?.run?.router ?? ""), setSavedRoute(pkgJSON2?.run?.router ?? ""));
  }, [directoryLoadingState, pkgJSON2, setRoute, setSavedRoute]);
  let [values, setValues] = React10.useState([]), routeValue = React10.useMemo(() => {
    for (let value of values)
      if (value.value === route)
        return value;
    return null;
  }, [route, values]), staticHandle = React10.useMemo(() => {
    if (!routeValue)
      return;
    let _route = routeValue.value;
    if (_route.endsWith("/"))
      return routeValue.handle;
    let parentDir = path6.join(_route, "../");
    for (let v of values)
      if (v.value === parentDir)
        return v.handle;
    return null;
  }, [routeValue, values]), routeType = React10.useMemo(() => {
    if (routeValue)
      switch (routeValue.handle.kind) {
        case "file":
          return RouterType.spa;
        case "directory":
          return RouterType.filesystem;
      }
    return RouterType.unknown;
  }, [routeValue]);
  React10.useEffect(() => {
    async function loadValues() {
      let list = await getRouteFilesForHandle(directory);
      setValues(list);
    }
    directory && loadValues();
  }, [setValues, directory, getRouteFilesForHandle]);
  let routeDescriptor;
  switch (routeType) {
    case RouterType.filesystem: {
      routeDescriptor = /* @__PURE__ */ React10.createElement(FileSystemRouteDescriptor, {
        router: routeValue,
        values
      });
      break;
    }
    case RouterType.spa: {
      routeDescriptor = /* @__PURE__ */ React10.createElement(SPARouteDescriptor, {
        router: routeValue,
        values
      });
      break;
    }
    default:
  }
  return /* @__PURE__ */ React10.createElement("section", {
    className: "Section Routing"
  }, /* @__PURE__ */ React10.createElement(PackageJSONEditor, {
    pkg: pkgJSON2,
    key: savedRoute,
    values,
    onChange: setRoute,
    onSave: async () => {
      pkgJSON2.run ? (pkgJSON2.run.router = route, pkgJSON2.run.isRouterUnset = !1) : pkgJSON2.run = {router: route, isRouterUnset: !1}, setSavedRoute(pkgJSON2.run.router), await pkgJSON2.handle.requestPermission({mode: "readwrite"}), await pkgJSON2.save();
      let record = StoredPackage.fromRecord({
        id: getPackageID(),
        lastBuild: null,
        handle: directory,
        staticHandle,
        routerType: path6.extname(pkgJSON2.run.router) === ".html" ? RouterType.spa : RouterType.filesystem
      });
      if (packager.storedPackage)
        Object.assign(packager.storedPackage, record), await packager.database.savePackage(packager.storedPackage);
      else {
        let storedPackage = StoredPackage.fromRecord(record);
        await packager.database.savePackage(storedPackage), packager.storedPackage = storedPackage;
      }
    },
    hasChanged: route && route !== savedRoute,
    defaultValue: route,
    folderName: directory?.name ?? "Loading..."
  }), routeDescriptor);
}, VerifyFolder = ({}) => {
  let {directoryLoadingState, directory} = React10.useContext(PackageContext);
  return /* @__PURE__ */ React10.createElement("main", {
    className: "NewProjectPage"
  }, /* @__PURE__ */ React10.createElement("div", {
    className: "TitleContainer"
  }, /* @__PURE__ */ React10.createElement(GearIcon, {
    width: 64,
    height: 64,
    fill: "white",
    stroke: "rgb(64, 2, 209)"
  }), /* @__PURE__ */ React10.createElement("div", {
    className: "TitleGroup"
  }, /* @__PURE__ */ React10.createElement(Title, null, "Configure dev server"), /* @__PURE__ */ React10.createElement(Instructions, null, "Your configuration will save to ", /* @__PURE__ */ React10.createElement(Monospace, null, "package.json")))), /* @__PURE__ */ React10.createElement(RoutingSection, null), /* @__PURE__ */ React10.createElement(Footer, null));
}, Page = () => /* @__PURE__ */ React10.createElement(PackageProvider, null, /* @__PURE__ */ React10.createElement(NewProjectPage, null));
function render2() {
  ReactDOM4.render(/* @__PURE__ */ React10.createElement(Page, null), document.body.querySelector("#root"));
}
window.addEventListener("unhandledRejection", console.error);

// src/_dev_/setup.tsx
window.addEventListener("DOMContentLoaded", render2);