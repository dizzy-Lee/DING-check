(function(e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.dd = t() : e.dd = t() })(this, function() {
    return function(e) {
        function t(r) { if (n[r]) return n[r].exports; var o = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports }
        var n = {};
        return t.m = e, t.c = n, t.i = function(e) { return e }, t.d = function(e, n, r) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r }) }, t.n = function(e) { var n = e && e.__esModule ? function() { return e.default } : function() { return e }; return t.d(n, "a", n), n }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 444)
    }([function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(2),
            o = n(136),
            i = n(2);
        t.ENV_ENUM = i.ENV_ENUM;
        var s = n(3);
        n(139), t.ddSdk = new s.Sdk(r.getENV(), o.log)
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.addWatchParamsDeal = function(e) { var t = Object.assign({}, e); return t.watch = !0, t }, t.genDefaultParamsDealFn = function(e) { var t = Object.assign({}, e); return function(e) { return Object.assign(t, e) } }, t.genBoolResultDealFn = function(e) { return function(t) { var n = Object.assign({}, t); return e.forEach(function(e) { void 0 !== n[e] && (n[e] = !!n[e]) }), n } }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(3),
            o = n(3);
        t.ENV_ENUM = o.ENV_ENUM, t.getENV = function() {
            var e, t = navigator.userAgent || navigator.swuserAgent,
                n = -1 !== t.indexOf("AliApp") && -1 !== t.indexOf("DingTalk"),
                o = /iPhone|iPad|iPod/i.test(t) && n,
                i = /Android/i.test(t) && n,
                s = (t.indexOf("Mac"), t.indexOf("Win"), t.indexOf("dingtalk-win"), /Nebula/i.test(t) && n),
                a = s ? r.APP_TYPE.MINI_APP : r.APP_TYPE.WEB,
                u = "*",
                d = t.match(/AliApp\(\w+\/([a-zA-Z0-9.-]+)\)/);
            null === d && (d = t.match(/DingTalk\/([a-zA-Z0-9.-]+)/));
            var c;
            d && d[1] && (c = d[1]);
            var f = "";
            if ("undefined" != typeof name && (f = name), f) try {
                var l = JSON.parse(f);
                l.hostVersion && (c = l.hostVersion), u = l.language || "*", e = l.containerId
            } catch (e) {}
            var v, p = !!e;
            return v = o ? r.ENV_ENUM.ios : i ? r.ENV_ENUM.android : p ? r.ENV_ENUM.pc : r.ENV_ENUM.notInDingTalk, { platform: v, version: c, appType: a, language: u }
        }
    }, function(e, t, n) {
        "use strict";

        function r(e) { return "function" == typeof e }

        function o(e, t) {
            function n(e) { return parseInt(e, 10) || 0 }
            for (var r = e.split(".").map(n), o = t.split(".").map(n), i = 0; i < r.length; i++) { if (void 0 === o[i]) return !1; if (r[i] < o[i]) return !1; if (r[i] > o[i]) return !0 }
            return !0
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i;
        (function(e) { e.cancel = "-1", e.not_exist = "1", e.no_permission = "7", e.jsapi_internal_error = "22" })(i || (i = {})), t.isFunction = r, t.compareVersion = o;
        var s;
        (function(e) { e.pc = "pc", e.android = "android", e.ios = "ios", e.notInDingTalk = "notInDingTalk" })(s = t.ENV_ENUM || (t.ENV_ENUM = {}));
        (function(e) { e.WEB = "WEB", e.MINI_APP = "MINI_APP" })(t.APP_TYPE || (t.APP_TYPE = {}));
        var a;
        (function(e) { e[e.INFO = 1] = "INFO", e[e.WARNING = 2] = "WARNING", e[e.ERROR = 3] = "ERROR" })(a = t.LogLevel || (t.LogLevel = {}));
        var u = function() {
            function e(e, t) {
                var n = this;
                this.configJsApiList = [], this.hadConfig = !1, this.p = {}, this.config$ = new Promise(function(e, t) { n.p.reject = t, n.p.resolve = e }), this.logQueue = [], this.devConfig = { debug: !1 }, this.platformConfigMap = {}, this.invokeAPIConfigMapByMethod = {}, this.getExportSdk = function() { return n.exportSdk }, this.setAPI = function(e, t) { n.invokeAPIConfigMapByMethod[e] = t }, this.setPlatform = function(e) { n.platformConfigMap[e.platform] = e, e.platform === n.env.platform && e.bridgeInit().catch(function(e) { n.customLog(a.WARNING, ["auto bridgeInit error", e || ""]) }) }, this.invokeAPI = function(e, t, u) {
                    return void 0 === t && (t = {}), void 0 === u && (u = !0), n.customLog(a.INFO, ['==> "' + e + '" params: ', t]), n.bridgeInitFn().then(function(d) {
                        var c = n.invokeAPIConfigMapByMethod[e];
                        if (c || !u) {
                            var f;
                            if (c && (f = c[n.env.platform]), f || !u) {
                                var l = {};
                                l = f && f.paramsDeal && r(f.paramsDeal) ? f.paramsDeal(t) : Object.assign({}, t);
                                var v = function(e) { return f && f.resultDeal && r(f.resultDeal) ? f.resultDeal(e) : e };
                                if (r(l.onSuccess)) {
                                    var p = l.onSuccess;
                                    l.onSuccess = function(e) { p(v(e)) }
                                }
                                return d(e, l).then(v, function(t) {
                                    var r = n.hadConfig && void 0 === n.isReady && -1 !== n.configJsApiList.indexOf(e),
                                        a = "object" == typeof t && "string" == typeof t.errorCode && t.errorCode === i.no_permission,
                                        c = "object" == typeof t && "string" == typeof t.errorCode && t.errorCode === i.cancel,
                                        p = f && f.vs && n.env.version && o(n.env.version, f.vs),
                                        _ = (n.env.platform === s.ios || n.env.platform === s.android) && r && a,
                                        E = n.env.platform === s.pc && r && (p && !c && u || a);
                                    return _ || E ? n.config$.then(function() { return d(e, l).then(v) }) : Promise.reject(t)
                                }).then(function(t) { return n.customLog(a.INFO, ['<== "' + e + '" success result: ', t]), t }, function(t) { return n.customLog(a.WARNING, ['<== "' + e + '" fail result: ', t]), Promise.reject(t) })
                            }
                            var _ = '"' + e + '" do not support the current platform (' + n.env.platform + ")";
                            return n.customLog(a.ERROR, [_]), Promise.reject({ errorCode: i.jsapi_internal_error, errorMessage: _ })
                        }
                        var _ = "This API method is not configured for the platform (" + n.env.platform + ")";
                        return n.customLog(a.ERROR, [_]), Promise.reject({ errorCode: i.jsapi_internal_error, errorMessage: _ })
                    })
                }, this.customLog = function(e, t) { var r = { level: e, text: t, time: new Date };!0 === n.devConfig.debug ? n.customLogInstance(r) : n.logQueue.push(r) }, this.clearLogQueue = function() { n.logQueue.forEach(function(e) { n.customLogInstance(e) }), n.logQueue = [] }, this.customLogInstance = t, this.env = e, this.bridgeInitFn = function() {
                    if (n.bridgeInitFnPromise) return n.bridgeInitFnPromise;
                    var t = n.platformConfigMap[e.platform];
                    if (t) n.bridgeInitFnPromise = t.bridgeInit().catch(function(e) { return n.customLog(a.ERROR, ["\b\b\b\b\bJsBridge initialization fails, jsapi will not work"]), Promise.reject(e) });
                    else {
                        var r = "Do not support the current environment：" + e.platform;
                        n.customLog(a.WARNING, [r]), n.bridgeInitFnPromise = Promise.reject(new Error(r))
                    }
                    return n.bridgeInitFnPromise
                };
                var u = function(e) { void 0 === e && (e = {}), n.devConfig = Object.assign(n.devConfig, e), !0 === n.devConfig.debug && n.clearLogQueue() };
                this.exportSdk = {
                    config: function(t) {
                        void 0 === t && (t = {});
                        var r = !0;
                        Object.keys(t).forEach(function(e) {-1 === ["debug", "usePromise"].indexOf(e) && (r = !1) }), r ? (n.customLog(a.WARNING, ["This is a deprecated feature, recommend use dd.devConfig"]), u(t)) : n.hadConfig ? n.customLog(a.WARNING, ["Config has been executed"]) : (t.jsApiList && (n.configJsApiList = t.jsApiList), n.hadConfig = !0, n.bridgeInitFn().then(function(r) {
                            var o = n.platformConfigMap[e.platform],
                                i = t;
                            o.authParamsDeal && (i = o.authParamsDeal(i)), r(o.authMethod, i).then(function(e) { n.isReady = !0, n.p.resolve(e) }).catch(function(e) { n.isReady = !1, n.p.reject(e) })
                        }, function() { n.customLog(a.ERROR, ['\b\b\b\b\bJsBridge initialization failed and "dd.config" failed to call']) }))
                    },
                    devConfig: u,
                    ready: function(e) {!1 === n.hadConfig ? (n.customLog(a.WARNING, ["You don 't use a dd.config, so you don't need to wrap dd.ready, recommend remove dd.ready"]), e()) : n.config$.then(function(t) { e() }) },
                    error: function(e) { n.config$.catch(function(t) { e(t) }) },
                    on: function(t, r) { n.bridgeInitFn().then(function() { n.platformConfigMap[e.platform].event.on(t, r) }) },
                    off: function(t, r) { n.bridgeInitFn().then(function() { n.platformConfigMap[e.platform].event.off(t, r) }) },
                    env: e,
                    checkJsApi: function(t) {
                        void 0 === t && (t = {});
                        var r = {};
                        return t.jsApiList && t.jsApiList.forEach(function(t) {
                            var i = n.invokeAPIConfigMapByMethod[t];
                            if (i) {
                                var s = i[e.platform];
                                s && s.vs && e.version && o(e.version, s.vs) && (r[t] = !0)
                            }
                            r[t] || (r[t] = !1)
                        }), Promise.resolve(r)
                    },
                    _invoke: function(e, t) { return void 0 === t && (t = {}), n.invokeAPI(e, t, !1) }
                }
            }
            return e
        }();
        t.Sdk = u
    }, function(e, t) {
        var n;
        n = function() { return this }();
        try { n = n || Function("return this")() || (0, eval)("this") } catch (e) { "object" == typeof window && (n = window) }
        e.exports = n
    }, function(e, t, n) {
        (function(t, n) { e.exports = n() })(0, function() {
            return function(e) {
                function t(r) { if (n[r]) return n[r].exports; var o = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports }
                var n = {};
                return t.m = e, t.c = n, t.i = function(e) { return e }, t.d = function(e, n, r) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r }) }, t.n = function(e) { var n = e && e.__esModule ? function() { return e.default } : function() { return e }; return t.d(n, "a", n), n }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 438)
            }({
                10: function(e, t) { e.exports = function(e) { return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", { enumerable: !0, get: function() { return e.l } }), Object.defineProperty(e, "id", { enumerable: !0, get: function() { return e.i } }), e.webpackPolyfill = 1), e } },
                11: function(e, t, n) {
                    "use strict";
                    var r = function() { this.pendingMsgs = {} };
                    r.prototype.addPending = function(e) {
                        this.pendingMsgs[e.id] = e;
                        var t = function() { delete this.pendingMsgs[e.id], e.removeEventListener("_finish", t) }.bind(this);
                        e.addEventListener("_finish", t)
                    }, r.prototype.getMsyById = function(e) { return this.pendingMsgs[e] }, e.exports = r
                },
                12: function(e, t, n) {
                    "use strict";
                    var r = n(18),
                        o = n(16),
                        i = function() { return (new Date).getTime() + Math.ceil(1e3 * Math.random()) },
                        s = { code: 408, reason: "timeout" },
                        a = { TIMEOUT: "_timeout", FINISH: "_finish" },
                        u = { timeout: -1 },
                        d = function(e, t, n, r) {
                            this.id = i(), this.methodName = t, this.containerId = e, this.option = o({}, u, r);
                            var n = n || {};
                            this._p = {}, this.result = new Promise(function(e, t) { this._p._resolve = e, this._p._reject = t }.bind(this)), this.callbacks = {}, this.plainMsg = this._handleMsg(n), this._eventsHandle = {}, this._timeoutTimer = null, this._initTimeout(), this.isFinish = !1
                        };
                    d.prototype._initTimeout = function() { this._clearTimeout(), this.option.timeout > 0 && (this._timeoutTimer = setTimeout(function() { this.receiveEvent(a.TIMEOUT), this.receiveResponse(s, !0) }.bind(this), this.option.timeout)) }, d.prototype._clearTimeout = function() { clearTimeout(this._timeoutTimer) }, d.prototype._handleMsg = function(e) { var t = {}; return Object.keys(e).forEach(function(n) { var o = e[n]; "function" == typeof o && "on" === n.slice(0, 2) ? this.callbacks[n] = o : t[n] = r(o) }.bind(this)), t }, d.prototype.getPayload = function() { return { msgId: this.id, containerId: this.containerId, methodName: this.methodName, body: this.plainMsg, type: "request" } }, d.prototype.receiveEvent = function(e, t) {
                        if (this.isFinish && e !== a.FINISH) return !1;
                        e !== a.FINISH && e !== a.TIMEOUT && this._initTimeout(), Array.isArray(this._eventsHandle[e]) && this._eventsHandle[e].forEach(function(e) { try { e(t) } catch (e) { console.error(t) } });
                        var n = "on" + e.charAt(0).toUpperCase() + e.slice(1);
                        return this.callbacks[n] && this.callbacks[n](t), !0
                    }, d.prototype.addEventListener = function(e, t) {
                        if (!e || "function" != typeof t) throw "eventName is null or handle is not a function, addEventListener fail";
                        Array.isArray(this._eventsHandle[e]) || (this._eventsHandle[e] = []), this._eventsHandle[e].push(t)
                    }, d.prototype.removeEventListener = function(e, t) { if (!e || !t) throw "eventName is null or handle is null, invoke removeEventListener fail"; if (Array.isArray(this._eventsHandle[e])) { var n = this._eventsHandle[e].indexOf(t); - 1 !== n && this._eventsHandle[e].splice(n, 1) } }, d.prototype.receiveResponse = function(e, t) {
                        if (!0 === this.isFinish) return !1;
                        this._clearTimeout();
                        var t = !!t;
                        return t ? this._p._reject(e) : this._p._resolve(e), setTimeout(function() { this.receiveEvent(a.FINISH) }.bind(this), 0), this.isFinish = !0, !0
                    }, e.exports = d
                },
                13: function(e, t, n) {
                    "use strict";
                    var r = function(e, t, n) {
                        if (this._msgId = n.msgId, this.frameWindow = e, this.methodName = n.methodName, this.clientOrigin = t, this.containerId = n.containerId, this.params = n.body, !this._msgId) throw "msgId not exist";
                        if (!this.frameWindow) throw "frameWindow not exist";
                        if (!this.methodName) throw "methodName not exits";
                        if (!this.clientOrigin) throw "clientOrigin not exist";
                        this.hasResponded = !1
                    };
                    r.prototype.respond = function(e, t) {
                        var t = !!t;
                        if (!0 !== this.hasResponded) {
                            var n = { type: "response", success: !t, body: e, msgId: this._msgId };
                            this.frameWindow.postMessage(n, this.clientOrigin), this.hasResponded = !0
                        }
                    }, r.prototype.emit = function(e, t) {
                        var n = { type: "event", eventName: e, body: t, msgId: this._msgId };
                        this.frameWindow.postMessage(n, this.clientOrigin)
                    }, e.exports = r
                },
                14: function(e, t, n) {
                    "use strict";
                    e.exports = { SYS_EVENT: "SYS_openAPIContainerInitEvent", SYS_INIT: "SYS_openAPIContainerInit" }
                },
                15: function(e, t) {
                    function n(e, t, n) {
                        switch (n.length) {
                            case 0:
                                return e.call(t);
                            case 1:
                                return e.call(t, n[0]);
                            case 2:
                                return e.call(t, n[0], n[1]);
                            case 3:
                                return e.call(t, n[0], n[1], n[2])
                        }
                        return e.apply(t, n)
                    }

                    function r(e, t) {
                        return t = k(void 0 === t ? e.length - 1 : t, 0),
                            function() {
                                for (var r = arguments, o = -1, i = k(r.length - t, 0), s = Array(i); ++o < i;) s[o] = r[t + o];
                                o = -1;
                                for (var a = Array(t + 1); ++o < t;) a[o] = r[o];
                                return a[t] = s, n(e, this, a)
                            }
                    }

                    function o(e, t) { if ("function" != typeof e) throw new TypeError(f); return t = void 0 === t ? t : d(t), r(e, t) }

                    function i(e) { var t = typeof e; return !!e && ("object" == t || "function" == t) }

                    function s(e) { return !!e && "object" == typeof e }

                    function a(e) { return "symbol" == typeof e || s(e) && y.call(e) == _ }

                    function u(e) { return e ? (e = c(e)) === l || e === -l ? (e < 0 ? -1 : 1) * v : e === e ? e : 0 : 0 === e ? e : 0 }

                    function d(e) {
                        var t = u(e),
                            n = t % 1;
                        return t === t ? n ? t - n : t : 0
                    }

                    function c(e) {
                        if ("number" == typeof e) return e;
                        if (a(e)) return p;
                        if (i(e)) {
                            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                            e = i(t) ? t + "" : t
                        }
                        if ("string" != typeof e) return 0 === e ? e : +e;
                        e = e.replace(E, "");
                        var n = h.test(e);
                        return n || P.test(e) ? m(e.slice(2), n ? 2 : 8) : N.test(e) ? p : +e
                    }
                    var f = "Expected a function",
                        l = 1 / 0,
                        v = 1.7976931348623157e308,
                        p = NaN,
                        _ = "[object Symbol]",
                        E = /^\s+|\s+$/g,
                        N = /^[-+]0x[0-9a-f]+$/i,
                        h = /^0b[01]+$/i,
                        P = /^0o[0-7]+$/i,
                        m = parseInt,
                        M = Object.prototype,
                        y = M.toString,
                        k = Math.max;
                    e.exports = o
                },
                16: function(e, t, n) {
                    function r(e, t, n) {
                        var r = e[t];
                        m.call(e, t) && u(r, n) && (void 0 !== n || t in e) || (e[t] = n)
                    }

                    function o(e, t, n, o) {
                        n || (n = {});
                        for (var i = -1, s = t.length; ++i < s;) {
                            var a = t[i];
                            r(n, a, o ? o(n[a], e[a], a, n, e) : e[a])
                        }
                        return n
                    }

                    function i(e, t) { return !!(t = null == t ? _ : t) && ("number" == typeof e || h.test(e)) && e > -1 && e % 1 == 0 && e < t }

                    function s(e, t, n) { if (!l(n)) return !1; var r = typeof t; return !!("number" == r ? d(n) && i(t, n.length) : "string" == r && t in n) && u(n[t], e) }

                    function a(e) { var t = e && e.constructor; return e === ("function" == typeof t && t.prototype || P) }

                    function u(e, t) { return e === t || e !== e && t !== t }

                    function d(e) { return null != e && f(b(e)) && !c(e) }

                    function c(e) { var t = l(e) ? M.call(e) : ""; return t == E || t == N }

                    function f(e) { return "number" == typeof e && e > -1 && e % 1 == 0 && e <= _ }

                    function l(e) { var t = typeof e; return !!e && ("object" == t || "function" == t) }
                    var v = n(17),
                        p = n(15),
                        _ = 9007199254740991,
                        E = "[object Function]",
                        N = "[object GeneratorFunction]",
                        h = /^(?:0|[1-9]\d*)$/,
                        P = Object.prototype,
                        m = P.hasOwnProperty,
                        M = P.toString,
                        y = P.propertyIsEnumerable,
                        k = !y.call({ valueOf: 1 }, "valueOf"),
                        b = function(e) { return function(e) { return null == e ? void 0 : e.length } }(),
                        g = function(e) {
                            return p(function(t, n) {
                                var r = -1,
                                    o = n.length,
                                    i = o > 1 ? n[o - 1] : void 0,
                                    a = o > 2 ? n[2] : void 0;
                                for (i = e.length > 3 && "function" == typeof i ? (o--, i) : void 0, a && s(n[0], n[1], a) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++r < o;) {
                                    var u = n[r];
                                    u && e(t, u)
                                }
                                return t
                            })
                        }(function(e, t) { if (k || a(t) || d(t)) return void o(t, v(t), e); for (var n in t) m.call(t, n) && r(e, n, t[n]) });
                    e.exports = g
                },
                17: function(e, t) {
                    function n(e, t) { for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n); return r }

                    function r(e, t) {
                        var r = g(e) || a(e) ? n(e.length, String) : [],
                            o = r.length,
                            s = !!o;
                        for (var u in e) !t && !M.call(e, u) || s && ("length" == u || i(u, o)) || r.push(u);
                        return r
                    }

                    function o(e) { if (!s(e)) return b(e); var t = []; for (var n in Object(e)) M.call(e, n) && "constructor" != n && t.push(n); return t }

                    function i(e, t) { return !!(t = null == t ? _ : t) && ("number" == typeof e || P.test(e)) && e > -1 && e % 1 == 0 && e < t }

                    function s(e) { var t = e && e.constructor; return e === ("function" == typeof t && t.prototype || m) }

                    function a(e) { return d(e) && M.call(e, "callee") && (!k.call(e, "callee") || y.call(e) == E) }

                    function u(e) { return null != e && f(e.length) && !c(e) }

                    function d(e) { return v(e) && u(e) }

                    function c(e) { var t = l(e) ? y.call(e) : ""; return t == N || t == h }

                    function f(e) { return "number" == typeof e && e > -1 && e % 1 == 0 && e <= _ }

                    function l(e) { var t = typeof e; return !!e && ("object" == t || "function" == t) }

                    function v(e) { return !!e && "object" == typeof e }

                    function p(e) { return u(e) ? r(e) : o(e) }
                    var _ = 9007199254740991,
                        E = "[object Arguments]",
                        N = "[object Function]",
                        h = "[object GeneratorFunction]",
                        P = /^(?:0|[1-9]\d*)$/,
                        m = Object.prototype,
                        M = m.hasOwnProperty,
                        y = m.toString,
                        k = m.propertyIsEnumerable,
                        b = function(e, t) { return function(n) { return e(t(n)) } }(Object.keys, Object),
                        g = Array.isArray;
                    e.exports = p
                },
                18: function(e, t, n) {
                    function r(e) { return o(e, !0, !0) }
                    var o = n(19);
                    e.exports = r
                },
                19: function(e, t, n) {
                    (function(e, n) {
                        function r(e, t) { return e.set(t[0], t[1]), e }

                        function o(e, t) { return e.add(t), e }

                        function i(e, t) { for (var n = -1, r = e.length; ++n < r && !1 !== t(e[n], n, e);); return e }

                        function s(e, t) { for (var n = -1, r = t.length, o = e.length; ++n < r;) e[o + n] = t[n]; return e }

                        function a(e, t, n, r) {
                            var o = -1,
                                i = e.length;
                            for (r && i && (n = e[++o]); ++o < i;) n = t(n, e[o], o, e);
                            return n
                        }

                        function u(e, t) { for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n); return r }

                        function d(e) { return e && e.Object === Object ? e : null }

                        function c(e) {
                            var t = !1;
                            if (null != e && "function" != typeof e.toString) try { t = !!(e + "") } catch (e) {}
                            return t
                        }

                        function f(e) {
                            var t = -1,
                                n = Array(e.size);
                            return e.forEach(function(e, r) { n[++t] = [r, e] }), n
                        }

                        function l(e) {
                            var t = -1,
                                n = Array(e.size);
                            return e.forEach(function(e) { n[++t] = e }), n
                        }

                        function v(e) {
                            var t = -1,
                                n = e ? e.length : 0;
                            for (this.clear(); ++t < n;) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }

                        function p() { this.__data__ = Ot ? Ot(null) : {} }

                        function _(e) { return this.has(e) && delete this.__data__[e] }

                        function E(e) { var t = this.__data__; if (Ot) { var n = t[e]; return n === Se ? void 0 : n } return Et.call(t, e) ? t[e] : void 0 }

                        function N(e) { var t = this.__data__; return Ot ? void 0 !== t[e] : Et.call(t, e) }

                        function h(e, t) { return this.__data__[e] = Ot && void 0 === t ? Se : t, this }

                        function P(e) {
                            var t = -1,
                                n = e ? e.length : 0;
                            for (this.clear(); ++t < n;) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }

                        function m() { this.__data__ = [] }

                        function M(e) {
                            var t = this.__data__,
                                n = F(t, e);
                            return !(n < 0 || (n == t.length - 1 ? t.pop() : gt.call(t, n, 1), 0))
                        }

                        function y(e) {
                            var t = this.__data__,
                                n = F(t, e);
                            return n < 0 ? void 0 : t[n][1]
                        }

                        function k(e) { return F(this.__data__, e) > -1 }

                        function b(e, t) {
                            var n = this.__data__,
                                r = F(n, e);
                            return r < 0 ? n.push([e, t]) : n[r][1] = t, this
                        }

                        function g(e) {
                            var t = -1,
                                n = e ? e.length : 0;
                            for (this.clear(); ++t < n;) {
                                var r = e[t];
                                this.set(r[0], r[1])
                            }
                        }

                        function I() { this.__data__ = { hash: new v, map: new(Vt || P), string: new v } }

                        function A(e) { return re(this, e).delete(e) }

                        function S(e) { return re(this, e).get(e) }

                        function V(e) { return re(this, e).has(e) }

                        function U(e, t) { return re(this, e).set(e, t), this }

                        function j(e) { this.__data__ = new P(e) }

                        function $() { this.__data__ = new P }

                        function O(e) { return this.__data__.delete(e) }

                        function w(e) { return this.__data__.get(e) }

                        function D(e) { return this.__data__.has(e) }

                        function C(e, t) { var n = this.__data__; return n instanceof P && n.__data__.length == Ae && (n = this.__data__ = new g(n.__data__)), n.set(e, t), this }

                        function T(e, t, n) {
                            var r = e[t];
                            Et.call(e, t) && Ee(r, n) && (void 0 !== n || t in e) || (e[t] = n)
                        }

                        function F(e, t) {
                            for (var n = e.length; n--;)
                                if (Ee(e[n][0], t)) return n;
                            return -1
                        }

                        function x(e, t) { return e && ee(t, Ie(t), e) }

                        function z(e, t, n, r, o, s, a) {
                            var u;
                            if (r && (u = s ? r(e, o, s, a) : r(e)), void 0 !== u) return u;
                            if (!ye(e)) return e;
                            var d = Rt(e);
                            if (d) { if (u = ue(e), !t) return X(e, u) } else {
                                var f = ae(e),
                                    l = f == Oe || f == we;
                                if (Bt(e)) return q(e, t);
                                if (f == Te || f == Ue || l && !s) { if (c(e)) return s ? e : {}; if (u = de(l ? {} : e), !t) return te(e, x(u, e)) } else {
                                    if (!rt[f]) return s ? e : {};
                                    u = ce(e, f, z, t)
                                }
                            }
                            a || (a = new j);
                            var v = a.get(e);
                            if (v) return v;
                            if (a.set(e, u), !d) var p = n ? ne(e) : Ie(e);
                            return i(p || e, function(o, i) { p && (i = o, o = e[i]), T(u, i, z(o, t, n, r, i, e, a)) }), u
                        }

                        function L(e) { return ye(e) ? kt(e) : {} }

                        function R(e, t, n) { var r = t(e); return Rt(e) ? r : s(r, n(e)) }

                        function B(e, t) { return Et.call(e, t) || "object" == typeof e && t in e && null === ie(e) }

                        function W(e) { return At(Object(e)) }

                        function q(e, t) { if (t) return e.slice(); var n = new e.constructor(e.length); return e.copy(n), n }

                        function J(e) { var t = new e.constructor(e.byteLength); return new Mt(t).set(new Mt(e)), t }

                        function H(e, t) { var n = t ? J(e.buffer) : e.buffer; return new e.constructor(n, e.byteOffset, e.byteLength) }

                        function G(e, t, n) { return a(t ? n(f(e), !0) : f(e), r, new e.constructor) }

                        function Y(e) { var t = new e.constructor(e.source, et.exec(e)); return t.lastIndex = e.lastIndex, t }

                        function Q(e, t, n) { return a(t ? n(l(e), !0) : l(e), o, new e.constructor) }

                        function K(e) { return zt ? Object(zt.call(e)) : {} }

                        function Z(e, t) { var n = t ? J(e.buffer) : e.buffer; return new e.constructor(n, e.byteOffset, e.length) }

                        function X(e, t) {
                            var n = -1,
                                r = e.length;
                            for (t || (t = Array(r)); ++n < r;) t[n] = e[n];
                            return t
                        }

                        function ee(e, t, n, r) {
                            n || (n = {});
                            for (var o = -1, i = t.length; ++o < i;) {
                                var s = t[o];
                                T(n, s, r ? r(n[s], e[s], s, n, e) : e[s])
                            }
                            return n
                        }

                        function te(e, t) { return ee(e, se(e), t) }

                        function ne(e) { return R(e, Ie, se) }

                        function re(e, t) { var n = e.__data__; return ve(t) ? n["string" == typeof t ? "string" : "hash"] : n.map }

                        function oe(e, t) { var n = e[t]; return be(n) ? n : void 0 }

                        function ie(e) { return It(Object(e)) }

                        function se(e) { return yt(Object(e)) }

                        function ae(e) { return Nt.call(e) }

                        function ue(e) {
                            var t = e.length,
                                n = e.constructor(t);
                            return t && "string" == typeof e[0] && Et.call(e, "index") && (n.index = e.index, n.input = e.input), n
                        }

                        function de(e) { return "function" != typeof e.constructor || pe(e) ? {} : L(ie(e)) }

                        function ce(e, t, n, r) {
                            var o = e.constructor;
                            switch (t) {
                                case Re:
                                    return J(e);
                                case je:
                                case $e:
                                    return new o(+e);
                                case Be:
                                    return H(e, r);
                                case We:
                                case qe:
                                case Je:
                                case He:
                                case Ge:
                                case Ye:
                                case Qe:
                                case Ke:
                                case Ze:
                                    return Z(e, r);
                                case De:
                                    return G(e, r, n);
                                case Ce:
                                case ze:
                                    return new o(e);
                                case Fe:
                                    return Y(e);
                                case xe:
                                    return Q(e, r, n);
                                case Le:
                                    return K(e)
                            }
                        }

                        function fe(e) { var t = e ? e.length : void 0; return Me(t) && (Rt(e) || ge(e) || Ne(e)) ? u(t, String) : null }

                        function le(e, t) { return !!(t = null == t ? Ve : t) && ("number" == typeof e || nt.test(e)) && e > -1 && e % 1 == 0 && e < t }

                        function ve(e) { var t = typeof e; return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e }

                        function pe(e) { var t = e && e.constructor; return e === ("function" == typeof t && t.prototype || pt) }

                        function _e(e) { if (null != e) { try { return _t.call(e) } catch (e) {} try { return e + "" } catch (e) {} } return "" }

                        function Ee(e, t) { return e === t || e !== e && t !== t }

                        function Ne(e) { return Pe(e) && Et.call(e, "callee") && (!bt.call(e, "callee") || Nt.call(e) == Ue) }

                        function he(e) { return null != e && Me(Lt(e)) && !me(e) }

                        function Pe(e) { return ke(e) && he(e) }

                        function me(e) { var t = ye(e) ? Nt.call(e) : ""; return t == Oe || t == we }

                        function Me(e) { return "number" == typeof e && e > -1 && e % 1 == 0 && e <= Ve }

                        function ye(e) { var t = typeof e; return !!e && ("object" == t || "function" == t) }

                        function ke(e) { return !!e && "object" == typeof e }

                        function be(e) { return !!ye(e) && (me(e) || c(e) ? ht : tt).test(_e(e)) }

                        function ge(e) { return "string" == typeof e || !Rt(e) && ke(e) && Nt.call(e) == ze }

                        function Ie(e) {
                            var t = pe(e);
                            if (!t && !he(e)) return W(e);
                            var n = fe(e),
                                r = !!n,
                                o = n || [],
                                i = o.length;
                            for (var s in e) !B(e, s) || r && ("length" == s || le(s, i)) || t && "constructor" == s || o.push(s);
                            return o
                        }
                        var Ae = 200,
                            Se = "__lodash_hash_undefined__",
                            Ve = 9007199254740991,
                            Ue = "[object Arguments]",
                            je = "[object Boolean]",
                            $e = "[object Date]",
                            Oe = "[object Function]",
                            we = "[object GeneratorFunction]",
                            De = "[object Map]",
                            Ce = "[object Number]",
                            Te = "[object Object]",
                            Fe = "[object RegExp]",
                            xe = "[object Set]",
                            ze = "[object String]",
                            Le = "[object Symbol]",
                            Re = "[object ArrayBuffer]",
                            Be = "[object DataView]",
                            We = "[object Float32Array]",
                            qe = "[object Float64Array]",
                            Je = "[object Int8Array]",
                            He = "[object Int16Array]",
                            Ge = "[object Int32Array]",
                            Ye = "[object Uint8Array]",
                            Qe = "[object Uint8ClampedArray]",
                            Ke = "[object Uint16Array]",
                            Ze = "[object Uint32Array]",
                            Xe = /[\\^$.*+?()[\]{}|]/g,
                            et = /\w*$/,
                            tt = /^\[object .+?Constructor\]$/,
                            nt = /^(?:0|[1-9]\d*)$/,
                            rt = {};
                        rt[Ue] = rt["[object Array]"] = rt[Re] = rt[Be] = rt[je] = rt[$e] = rt[We] = rt[qe] = rt[Je] = rt[He] = rt[Ge] = rt[De] = rt[Ce] = rt[Te] = rt[Fe] = rt[xe] = rt[ze] = rt[Le] = rt[Ye] = rt[Qe] = rt[Ke] = rt[Ze] = !0, rt["[object Error]"] = rt[Oe] = rt["[object WeakMap]"] = !1;
                        var ot = { function: !0, object: !0 },
                            it = ot[typeof t] && t && !t.nodeType ? t : void 0,
                            st = ot[typeof e] && e && !e.nodeType ? e : void 0,
                            at = st && st.exports === it ? it : void 0,
                            ut = d(it && st && "object" == typeof n && n),
                            dt = d(ot[typeof self] && self),
                            ct = d(ot[typeof window] && window),
                            ft = d(ot[typeof this] && this),
                            lt = ut || ct !== (ft && ft.window) && ct || dt || ft || Function("return this")(),
                            vt = Array.prototype,
                            pt = Object.prototype,
                            _t = Function.prototype.toString,
                            Et = pt.hasOwnProperty,
                            Nt = pt.toString,
                            ht = RegExp("^" + _t.call(Et).replace(Xe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                            Pt = at ? lt.Buffer : void 0,
                            mt = lt.Symbol,
                            Mt = lt.Uint8Array,
                            yt = Object.getOwnPropertySymbols,
                            kt = Object.create,
                            bt = pt.propertyIsEnumerable,
                            gt = vt.splice,
                            It = Object.getPrototypeOf,
                            At = Object.keys,
                            St = oe(lt, "DataView"),
                            Vt = oe(lt, "Map"),
                            Ut = oe(lt, "Promise"),
                            jt = oe(lt, "Set"),
                            $t = oe(lt, "WeakMap"),
                            Ot = oe(Object, "create"),
                            wt = _e(St),
                            Dt = _e(Vt),
                            Ct = _e(Ut),
                            Tt = _e(jt),
                            Ft = _e($t),
                            xt = mt ? mt.prototype : void 0,
                            zt = xt ? xt.valueOf : void 0;
                        v.prototype.clear = p, v.prototype.delete = _, v.prototype.get = E, v.prototype.has = N, v.prototype.set = h, P.prototype.clear = m, P.prototype.delete = M, P.prototype.get = y, P.prototype.has = k, P.prototype.set = b, g.prototype.clear = I, g.prototype.delete = A, g.prototype.get = S, g.prototype.has = V, g.prototype.set = U, j.prototype.clear = $, j.prototype.delete = O, j.prototype.get = w, j.prototype.has = D, j.prototype.set = C;
                        var Lt = function(e) { return function(e) { return null == e ? void 0 : e.length } }();
                        yt || (se = function() { return [] }), (St && ae(new St(new ArrayBuffer(1))) != Be || Vt && ae(new Vt) != De || Ut && "[object Promise]" != ae(Ut.resolve()) || jt && ae(new jt) != xe || $t && "[object WeakMap]" != ae(new $t)) && (ae = function(e) {
                            var t = Nt.call(e),
                                n = t == Te ? e.constructor : void 0,
                                r = n ? _e(n) : void 0;
                            if (r) switch (r) {
                                case wt:
                                    return Be;
                                case Dt:
                                    return De;
                                case Ct:
                                    return "[object Promise]";
                                case Tt:
                                    return xe;
                                case Ft:
                                    return "[object WeakMap]"
                            }
                            return t
                        });
                        var Rt = Array.isArray,
                            Bt = Pt ? function(e) { return e instanceof Pt } : function(e) { return function() { return !1 } }();
                        e.exports = z
                    }).call(t, n(10)(e), n(4))
                },
                4: function(e, t) {
                    var n;
                    n = function() { return this }();
                    try { n = n || Function("return this")() || (0, eval)("this") } catch (e) { "object" == typeof window && (n = window) }
                    e.exports = n
                },
                438: function(e, t, n) { e.exports = n(6) },
                6: function(e, t, n) {
                    "use strict";
                    var r = n(12),
                        o = n(13),
                        i = n(11),
                        s = n(14),
                        a = new i,
                        u = !1,
                        d = "",
                        c = null,
                        f = {},
                        l = /{.*}/;
                    try { var v = window.name.match(l); if (v && v[0]) var f = JSON.parse(v[0]) } catch (e) { f = {} }
                    f.hostOrigin && ".dingtalk.com" === f.hostOrigin.split(":")[1].slice(0 - ".dingtalk.com".length) && f.containerId && (u = !0, d = f.hostOrigin, c = f.containerId);
                    var p = {},
                        _ = new Promise(function(e, t) { p._resolve = e, p._reject = t }),
                        E = {},
                        N = null;
                    window.top !== window && (N = window.top, p._resolve()), E[s.SYS_INIT] = function(e) { N = e.frameWindow, p._resolve(), e.respond({}) }, window.addEventListener("message", function(e) {
                        var t = e.data,
                            n = e.origin;
                        if (n === d)
                            if ("response" === t.type && t.msgId) {
                                var r = t.msgId,
                                    i = a.getMsyById(r);
                                i && i.receiveResponse(t.body, !t.success)
                            } else if ("event" === t.type && t.msgId) {
                            var r = t.msgId,
                                i = a.getMsyById(r);
                            i && i.receiveEvent(t.eventName, t.body)
                        } else if ("request" === t.type && t.msgId) {
                            var i = new o(e.source, n, t);
                            E[i.methodName] && E[i.methodName](i)
                        }
                    }), t.invokeAPI = function(e, t) { var n = new r(c, e, t); return u && _.then(function() { N && N.postMessage(n.getPayload(), d), a.addPending(n) }), n };
                    var h = null;
                    t.addEventListener = function(e, n) { h || (h = t.invokeAPI(s.SYS_EVENT, {})), h.addEventListener(e, n) }, t.removeEventListener = function(e, t) { h && h.removeEventListener(e, t) }
                }
            })
        })
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.alipay.pay";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.pay$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.calendar.chooseDateTime";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.5.0" }, o[i.ENV_ENUM.android] = { vs: "3.5.0" }, o)), t.chooseDateTime$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.calendar.chooseHalfDay";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.5.0" }, o[i.ENV_ENUM.android] = { vs: "3.5.0" }, o)), t.chooseHalfDay$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.calendar.chooseInterval";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.5.0" }, o[i.ENV_ENUM.android] = { vs: "3.5.0" }, o)), t.chooseInterval$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.calendar.chooseOneDay";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.5.0" }, o[i.ENV_ENUM.android] = { vs: "3.5.0" }, o)), t.chooseOneDay$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.chat.chooseConversationByCorpId",
            u = s.genDefaultParamsDealFn({ max: 50 });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.6.0", paramsDeal: u }, o)), t.chooseConversationByCorpId$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.chat.locationChatMessage";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.7.6" }, o[i.ENV_ENUM.android] = { vs: "2.7.6" }, o)), t.locationChatMessage$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.chat.openSingleChat";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.4.10" }, o[i.ENV_ENUM.android] = { vs: "3.4.10" }, o)), t.openSingleChat$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.chat.pickConversation";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.2" }, o[i.ENV_ENUM.android] = { vs: "2.4.2" }, o)), t.pickConversation$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.chat.toConversation";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0" }, o[i.ENV_ENUM.android] = { vs: "2.6.0" }, o)), t.toConversation$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.clipboardData.setData";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.7.0" }, o[i.ENV_ENUM.android] = { vs: "2.7.0" }, o)), t.setData$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.contact.choose",
            u = s.genDefaultParamsDealFn({ multiple: !0, startWithDepartmentId: 0, users: [] });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.choose$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.contact.chooseMobileContacts";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.1" }, o[i.ENV_ENUM.android] = { vs: "3.1" }, o)), t.chooseMobileContacts$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.contact.complexPicker";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.9.0" }, o[i.ENV_ENUM.android] = { vs: "2.9.0" }, o[i.ENV_ENUM.pc] = { vs: "4.3.5" }, o)), t.complexPicker$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.contact.createGroup";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.createGroup$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.contact.departmentsPicker";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "4.2.5" }, o[i.ENV_ENUM.ios] = { vs: "3.0" }, o[i.ENV_ENUM.android] = { vs: "3.0" }, o)), t.departmentsPicker$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.contact.externalComplexPicker";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0" }, o[i.ENV_ENUM.ios] = { vs: "3.0" }, o[i.ENV_ENUM.android] = { vs: "3.0" }, o)), t.externalComplexPicker$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.contact.externalEditForm";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.0" }, o[i.ENV_ENUM.android] = { vs: "3.0" }, o)), t.externalEditForm$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.contact.setRule";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.15" }, o[i.ENV_ENUM.android] = { vs: "2.15" }, o)), t.setRule$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.cspace.chooseSpaceDir";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.5.6" }, o[i.ENV_ENUM.android] = { vs: "3.5.6" }, o)), t.chooseSpaceDir$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.cspace.preview";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0" }, o[i.ENV_ENUM.ios] = { vs: "2.7.0" }, o[i.ENV_ENUM.android] = { vs: "2.7.0" }, o)), t.preview$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.cspace.saveFile";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.7.6" }, o[i.ENV_ENUM.android] = { vs: "2.7.6" }, o)), t.saveFile$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.customContact.choose",
            u = s.genDefaultParamsDealFn({ isShowCompanyName: !1, max: 50 });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0" }, o[i.ENV_ENUM.ios] = { vs: "2.5.2", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.5.2", paramsDeal: u }, o)), t.choose$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.customContact.multipleChoose",
            u = s.genDefaultParamsDealFn({ isShowCompanyName: !1, max: 50 });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.multipleChoose$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.ding.create";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.5.1" }, o[i.ENV_ENUM.android] = { vs: "3.5.1" }, o)), t.create$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.ding.post";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.post$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.intent.fetchData";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.7.6" }, o[i.ENV_ENUM.android] = { vs: "2.7.6" }, o)), t.fetchData$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.map.locate";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.locate$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.map.search",
            u = s.genDefaultParamsDealFn({ scope: 500 });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.search$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.map.view";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.view$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.navigation.close";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o[i.ENV_ENUM.pc] = { vs: "4.3.5" }, o)), t.close$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.navigation.goBack";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0" }, o[i.ENV_ENUM.android] = { vs: "2.6.0" }, o)), t.goBack$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.navigation.quit";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o)), t.quit$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.navigation.replace";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.4.6" }, o[i.ENV_ENUM.android] = { vs: "3.4.6" }, o)), t.replace$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.navigation.setIcon",
            u = s.genDefaultParamsDealFn({ watch: !0, showIcon: !0, iconIndex: 1 });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.setIcon$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.navigation.setLeft",
            u = s.genDefaultParamsDealFn({ watch: !0, show: !0, control: !1, showIcon: !0, text: "" });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.setLeft$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.navigation.setMenu";
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0", paramsDeal: s.addWatchParamsDeal }, o[i.ENV_ENUM.android] = { vs: "2.6.0", paramsDeal: s.addWatchParamsDeal }, o)), t.setMenu$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.navigation.setRight",
            u = s.genDefaultParamsDealFn({ watch: !0, show: !0, control: !1, showIcon: !0, text: "" });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.setRight$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.navigation.setTitle";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.setTitle$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.store.closeUnpayOrder";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "4.3.7" }, o[i.ENV_ENUM.android] = { vs: "4.3.7" }, o[i.ENV_ENUM.pc] = { vs: "4.5.3" }, o)), t.closeUnpayOrder$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.store.createOrder";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "4.3.7" }, o[i.ENV_ENUM.android] = { vs: "4.3.7" }, o[i.ENV_ENUM.pc] = { vs: "4.5.3" }, o)), t.createOrder$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.store.getPayUrl";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "4.3.7" }, o[i.ENV_ENUM.android] = { vs: "4.3.7" }, o[i.ENV_ENUM.pc] = { vs: "4.5.3" }, o)), t.getPayUrl$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.store.inquiry";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "4.3.7" }, o[i.ENV_ENUM.android] = { vs: "4.3.7" }, o[i.ENV_ENUM.pc] = { vs: "4.5.3" }, o)), t.inquiry$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.telephone.call";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.call$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.telephone.checkBizCall";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "4.0.0" }, o[i.ENV_ENUM.ios] = { vs: "3.5.6" }, o[i.ENV_ENUM.android] = { vs: "3.5.6" }, o)), t.checkBizCall$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.telephone.quickCallList";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.5.6" }, o[i.ENV_ENUM.ios] = { vs: "3.5.6" }, o[i.ENV_ENUM.android] = { vs: "3.5.6" }, o)), t.quickCallList$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.telephone.showCallMenu";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.showCallMenu$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.user.get";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.get$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.chosen";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.chosen$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.datepicker";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.datepicker$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.datetimepicker";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.datetimepicker$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.decrypt";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0" }, o[i.ENV_ENUM.ios] = { vs: "2.9.1" }, o[i.ENV_ENUM.android] = { vs: "2.9.1" }, o)), t.decrypt$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.downloadFile";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o)), t.downloadFile$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.encrypt";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0" }, o[i.ENV_ENUM.ios] = { vs: "2.9.1" }, o[i.ENV_ENUM.android] = { vs: "2.9.1" }, o)), t.encrypt$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.isLocalFileExist";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o)), t.isLocalFileExist$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.multiSelect";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.0.0" }, o[i.ENV_ENUM.android] = { vs: "3.0.0" }, o)), t.multiSelect$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.open";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.7.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.open$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.util.openLink",
            u = s.genDefaultParamsDealFn({ credible: !0, showMenuBar: !0 });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.7.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.openLink$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.openLocalFile";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o)), t.openLocalFile$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.openModal";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o)), t.openModal$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.openSlidePanel";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o)), t.openSlidePanel$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.previewImage";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.7.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.previewImage$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.previewVideo";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "4.3.7" }, o[i.ENV_ENUM.android] = { vs: "4.3.7" }, o)), t.previewVideo$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.util.scan",
            u = s.genDefaultParamsDealFn({ type: "qrCode" });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.scan$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.scanCard";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.scanCard$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.setScreenBrightnessAndKeepOn";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "4.3.3" }, o[i.ENV_ENUM.android] = { vs: "4.3.3" }, o)), t.setScreenBrightnessAndKeepOn$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.util.share",
            u = s.genDefaultParamsDealFn({ title: "", buttonName: "确定" });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.share$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.timepicker";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.timepicker$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.uploadAttachment";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0" }, o[i.ENV_ENUM.ios] = { vs: "2.7.0" }, o[i.ENV_ENUM.android] = { vs: "2.7.0" }, o)), t.uploadAttachment$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "biz.util.uploadImage",
            u = s.genDefaultParamsDealFn({ multiple: !1 });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.uploadImage$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.uploadImageFromCamera";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.uploadImageFromCamera$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "biz.util.ut",
            a = function(e) {
                var t = Object.assign({}, e),
                    n = t.value,
                    r = [];
                if (n && "object" == typeof n) {
                    for (var o in n) n[o] && r.push(o + "=" + n[o]);
                    n = r.join(",")
                }
                return t.value = n, t
            };
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.5.0", paramsDeal: a }, o[i.ENV_ENUM.ios] = {
            vs: "2.4.0",
            paramsDeal: function(e) {
                var t = Object.assign({}, e),
                    n = t.value;
                return n && "object" == typeof n && (n = JSON.stringify(n)), t.value = n, t
            }
        }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: a }, o)), t.ut$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "channel.permission.requestAuthCode";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.0.0" }, o[i.ENV_ENUM.android] = { vs: "3.0.0" }, o)), t.requestAuthCode$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.accelerometer.clearShake";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.clearShake$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "device.accelerometer.watchShake";
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: s.addWatchParamsDeal }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: s.addWatchParamsDeal }, o)), t.watchShake$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.audio.download";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.download$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.audio.onPlayEnd";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.onPlayEnd$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.audio.onRecordEnd";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.onRecordEnd$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.audio.pause";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.pause$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.audio.play";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.play$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.audio.resume";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.resume$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.audio.startRecord";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.startRecord$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.audio.stop";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.stop$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.audio.stopRecord";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.stopRecord$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.audio.translateVoice";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.8.0" }, o[i.ENV_ENUM.android] = { vs: "2.8.0" }, o)), t.translateVoice$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.base.getInterface";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.getInterface$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.base.getPhoneInfo";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.5.0" }, o[i.ENV_ENUM.android] = { vs: "3.5.0" }, o)), t.getPhoneInfo$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.base.getUUID";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.getUUID$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.base.getWifiStatus";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.11.0" }, o[i.ENV_ENUM.android] = { vs: "2.11.0" }, o)), t.getWifiStatus$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.connection.getNetworkType";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.getNetworkType$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.geolocation.get";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.get$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.geolocation.start";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "3.4.7" }, o[i.ENV_ENUM.android] = { vs: "3.4.7" }, o)), t.start$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.launcher.checkInstalledApps";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.checkInstalledApps$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.launcher.launchApp";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.launchApp$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.nfc.nfcRead";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.11.0" }, o[i.ENV_ENUM.android] = { vs: "2.11.0" }, o)), t.nfcRead$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.nfc.nfcStop";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "4.3.9" }, o[i.ENV_ENUM.android] = { vs: "4.3.9" }, o)), t.nfcStop$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.nfc.nfcWrite";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.11.0" }, o[i.ENV_ENUM.android] = { vs: "2.11.0" }, o)), t.nfcWrite$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.notification.actionSheet";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.actionSheet$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "device.notification.alert",
            u = s.genDefaultParamsDealFn({ title: "", buttonName: "确定" });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.alert$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "device.notification.confirm",
            u = s.genDefaultParamsDealFn({ title: "", buttonLabels: ["确定", "取消"] });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.confirm$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.notification.extendModal";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.5.0" }, o[i.ENV_ENUM.android] = { vs: "2.5.0" }, o)), t.extendModal$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.notification.hidePreloader";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.hidePreloader$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.notification.modal";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "4.2.5" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.modal$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "device.notification.prompt",
            u = s.genDefaultParamsDealFn({ title: "", buttonLabels: ["确定", "取消"] });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.7.0" }, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.prompt$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "device.notification.showPreloader",
            u = s.genDefaultParamsDealFn({ text: "加载中...", showIcon: !0 });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.showPreloader$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "device.notification.toast",
            u = s.genDefaultParamsDealFn({ text: "toast", duration: 3, delay: 0 });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.pc] = { vs: "2.5.0", paramsDeal: function(e) { return e.icon && !e.type && ("success" === e.icon ? e.type = "success" : "error" === e.icon && (e.type = "error")), e } }, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.toast$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "device.notification.vibrate",
            u = s.genDefaultParamsDealFn({ duration: 300 });
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: u }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: u }, o)), t.vibrate$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.screen.resetView";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.android] = { vs: "4.0.0" }, o[i.ENV_ENUM.ios] = { vs: "4.0.0" }, o)), t.resetView$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "device.screen.rotateView";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.android] = { vs: "4.0.0" }, o[i.ENV_ENUM.ios] = { vs: "4.0.0" }, o)), t.rotateView$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "runtime.message.fetch";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0" }, o[i.ENV_ENUM.android] = { vs: "2.6.0" }, o)), t.fetch$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "runtime.message.post";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0" }, o[i.ENV_ENUM.android] = { vs: "2.6.0" }, o)), t.post$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "runtime.permission.requestAuthCode",
            a = function(e) { return Object.assign(e, { url: location.href.split("#")[0] }) };
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.0.0", paramsDeal: a }, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.requestAuthCode$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "runtime.permission.requestOperateAuthCode",
            a = function(e) { return Object.assign(e, { url: location.href.split("#")[0] }) };
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.pc] = { vs: "3.3.0", paramsDeal: a }, o[i.ENV_ENUM.ios] = { vs: "3.3.0" }, o[i.ENV_ENUM.android] = { vs: "3.3.0" }, o)), t.requestOperateAuthCode$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.input.plain";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.plain$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.nav.close";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0" }, o[i.ENV_ENUM.android] = { vs: "2.6.0" }, o)), t.close$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.nav.getCurrentId";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0" }, o[i.ENV_ENUM.android] = { vs: "2.6.0" }, o)), t.getCurrentId$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.nav.go";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0" }, o[i.ENV_ENUM.android] = { vs: "2.6.0" }, o)), t.go$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.nav.preload";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0" }, o[i.ENV_ENUM.android] = { vs: "2.6.0" }, o)), t.preload$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.nav.recycle";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.6.0" }, o[i.ENV_ENUM.android] = { vs: "2.6.0" }, o)), t.recycle$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.progressBar.setColors";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.setColors$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.pullToRefresh.disable";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.disable$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(a, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = n(1),
            a = "ui.pullToRefresh.enable";
        i.ddSdk.setAPI(a, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: s.addWatchParamsDeal }, o[i.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: s.addWatchParamsDeal }, o)), t.enable$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.pullToRefresh.stop";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.stop$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.webViewBounce.disable";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.disable$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "ui.webViewBounce.enable";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.4.0" }, o[i.ENV_ENUM.android] = { vs: "2.4.0" }, o)), t.enable$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "util.domainStorage.getItem";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.9.0" }, o[i.ENV_ENUM.android] = { vs: "2.9.0" }, o)), t.getItem$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "util.domainStorage.removeItem";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.9.0" }, o[i.ENV_ENUM.android] = { vs: "2.9.0" }, o)), t.removeItem$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return i.ddSdk.invokeAPI(s, e) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o, i = n(0),
            s = "util.domainStorage.setItem";
        i.ddSdk.setAPI(s, (o = {}, o[i.ENV_ENUM.ios] = { vs: "2.9.0" }, o[i.ENV_ENUM.android] = { vs: "2.9.0" }, o)), t.setItem$ = r, t.default = r
    }, function(e, t, n) {
        "use strict";
        var r = n(0),
            o = n(137),
            i = Object.assign({}, o, r.ddSdk.getExportSdk());
        e.exports = i
    }, function(e, t, n) {
        "use strict";
        var r = n(134);
        n(143), e.exports = r
    }, function(e, t, n) {
        "use strict";

        function r(e) { return e = "00" + e, e.substring(e.length - 2, e.length) }
        Object.defineProperty(t, "__esModule", { value: !0 }), t.log = function(e) { console.log.apply(console, [r(e.time.getHours()) + ":" + r(e.time.getMinutes()) + ":" + r(e.time.getSeconds())].concat(e.text)) }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(2),
            o = r.getENV();
        t.ios = o.platform === r.ENV_ENUM.ios, t.android = o.platform === r.ENV_ENUM.android, t.pc = o.platform === r.ENV_ENUM.pc, t.other = o.platform === r.ENV_ENUM.notInDingTalk, t.compareVersion = function(e, t, n) { if ("string" != typeof e || "string" != typeof t) return !1; for (var r, o, i = e.split("."), s = t.split("."); r === o && s.length > 0;) r = i.shift(), o = s.shift(); return n ? (0 | o) >= (0 | r) : (0 | o) > (0 | r) }, t.language = o.language, t.version = o.version
    }, function(e, t, n) { "function" != typeof Promise && n(147) }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), n(138), n(140), n(141)
    }, function(e, t) {
        "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
            value: function(e, t) {
                "use strict";
                if (null == e) throw new TypeError("Cannot convert undefined or null to object");
                for (var n = Object(e), r = 1; r < arguments.length; r++) {
                    var o = arguments[r];
                    if (null != o)
                        for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i])
                }
                return n
            },
            writable: !0,
            configurable: !0
        })
    }, function(e, t) { Object.keys || (Object.keys = function(e) { if (e !== Object(e)) throw new TypeError("Object.keys called on a non-object"); var t, n = []; for (t in e) Object.prototype.hasOwnProperty.call(e, t) && n.push(t); return n }) }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(0),
            o = n(2),
            i = n(3);
        r.ddSdk.setPlatform({
            platform: o.ENV_ENUM.android,
            bridgeInit: function() {
                if (o.getENV().appType === i.APP_TYPE.MINI_APP) return Promise.resolve(function(e, t) { return new Promise(function(n, r) { my.dtBridge({ m: e, args: t, onSuccess: function(e) { "function" == typeof t.onSuccess && t.onSuccess(e), n(e) }, onFail: function(e) { "function" == typeof t.onFail && t.onFail(e), r(e) } }) }) });
                var e = function(e, t) {
                    return new Promise(function(n, r) {
                        var o = e.split("."),
                            i = o.pop() || "",
                            s = o.join("."),
                            a = function(e) { "function" == typeof t.onSuccess && t.onSuccess(e), n(e) },
                            u = function(e) { "function" == typeof t.onFail && t.onFail(e), r(e) };
                        "function" == typeof window.WebViewJavascriptBridgeAndroid && window.WebViewJavascriptBridgeAndroid(a, u, s, i, t)
                    })
                };
                return new Promise(function(t, n) {
                    var r = function() { try { window.WebViewJavascriptBridgeAndroid = window.nuva && window.nuva.require(), t(e) } catch (e) { n(e) } };
                    window.nuva && (void 0 === window.nuva.isReady || window.nuva.isReady) ? r() : document.addEventListener("runtimeready", function() { r() }, !1)
                })
            },
            authMethod: "runtime.permission.requestJsApis",
            event: { on: function(e, t) { document.addEventListener(e, t) }, off: function(e, t) { document.removeEventListener(e, t) } }
        })
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), n(145), n(142), n(144)
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(0),
            o = n(2),
            i = n(3);
        r.ddSdk.setPlatform({
            platform: o.ENV_ENUM.ios,
            bridgeInit: function() {
                if (o.getENV().appType === i.APP_TYPE.MINI_APP) return Promise.resolve(function(e, t) { return new Promise(function(n, r) { my.dtBridge({ m: e, args: t, onSuccess: function(e) { "function" == typeof t.onSuccess && t.onSuccess(e), n(e) }, onFail: function(e) { "function" == typeof t.onFail && t.onFail(e), r(e) } }) }) });
                var e = function(e, t) {
                    var n = Object.assign({}, t);
                    return new Promise(function(t, r) {
                        if (!0 === n.watch) {
                            var o = n.onSuccess;
                            delete n.onSuccess, "undefined" != typeof WebViewJavascriptBridge && WebViewJavascriptBridge.registerHandler(e, function(e, t) { "function" == typeof o && o.call(null, e), t && t({ errorCode: "0", errorMessage: "success" }) })
                        }
                        void 0 !== window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler(e, Object.assign({}, n), function(e) { var o = e || {}; "0" === o.errorCode ? ("function" == typeof n.onSuccess && n.onSuccess.call(null, o.result), t(o.result)) : ("-1" === o.errorCode ? "function" == typeof n.onCancel && n.onCancel.call(null, o.result, o.errorCode) : "function" == typeof n.onFail && n.onFail.call(null, o.result, o.errorCode), r(o.result)) })
                    })
                };
                return new Promise(function(t, n) {
                    if ("undefined" != typeof WebViewJavascriptBridge) { try { WebViewJavascriptBridge.init(function(e, t) {}) } catch (e) { return n() } return t(e) }
                    document.addEventListener("WebViewJavascriptBridgeReady", function() { if ("undefined" == typeof WebViewJavascriptBridge) return n(); try { WebViewJavascriptBridge.init(function(e, t) {}) } catch (e) { return n() } return t(e) }, !1)
                })
            },
            authMethod: "runtime.permission.requestJsApis",
            event: { on: function(e, t) { document.addEventListener(e, t) }, off: function(e, t) { document.removeEventListener(e, t) } }
        })
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(0),
            o = n(2);
        r.ddSdk.setPlatform({ platform: o.ENV_ENUM.pc, bridgeInit: function() { var e = n(5); return Promise.resolve(function(t, n) { return e.invokeAPI(t, n).result.then(function(e) { return "function" == typeof n.onSuccess && n.onSuccess.call(null, e), Promise.resolve(e) }, function(e) { return "function" == typeof n.onFail && n.onFail.call(null, e), Promise.reject(e) }) }) }, authMethod: "config", authParamsDeal: function(e) { var t = Object.assign({}, e); return t.url = window.location.href.split("#")[0], t }, event: { on: function(e, t) { n(5).addEventListener(e, t) }, off: function(e, t) { n(5).removeEventListener(e, t) } } })
    }, function(e, t) {
        function n() { throw new Error("setTimeout has not been defined") }

        function r() { throw new Error("clearTimeout has not been defined") }

        function o(e) { if (c === setTimeout) return setTimeout(e, 0); if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(e, 0); try { return c(e, 0) } catch (t) { try { return c.call(null, e, 0) } catch (t) { return c.call(this, e, 0) } } }

        function i(e) { if (f === clearTimeout) return clearTimeout(e); if ((f === r || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e); try { return f(e) } catch (t) { try { return f.call(null, e) } catch (t) { return f.call(this, e) } } }

        function s() { _ && v && (_ = !1, v.length ? p = v.concat(p) : E = -1, p.length && a()) }

        function a() {
            if (!_) {
                var e = o(s);
                _ = !0;
                for (var t = p.length; t;) {
                    for (v = p, p = []; ++E < t;) v && v[E].run();
                    E = -1, t = p.length
                }
                v = null, _ = !1, i(e)
            }
        }

        function u(e, t) { this.fun = e, this.array = t }

        function d() {}
        var c, f, l = e.exports = {};
        (function() { try { c = "function" == typeof setTimeout ? setTimeout : n } catch (e) { c = n } try { f = "function" == typeof clearTimeout ? clearTimeout : r } catch (e) { f = r } })();
        var v, p = [],
            _ = !1,
            E = -1;
        l.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            p.push(new u(e, t)), 1 !== p.length || _ || o(a)
        }, u.prototype.run = function() { this.fun.apply(null, this.array) }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = d, l.addListener = d, l.once = d, l.off = d, l.removeListener = d, l.removeAllListeners = d, l.emit = d, l.prependListener = d, l.prependOnceListener = d, l.listeners = function(e) { return [] }, l.binding = function(e) { throw new Error("process.binding is not supported") }, l.cwd = function() { return "/" }, l.chdir = function(e) { throw new Error("process.chdir is not supported") }, l.umask = function() { return 0 }
    }, function(e, t, n) {
        (function(e, t) {
            (function(e, t) { t() })(0, function() {
                "use strict";

                function n() {}

                function r(e, t) { return function() { e.apply(t, arguments) } }

                function o(e) {
                    if (!(this instanceof o)) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof e) throw new TypeError("not a function");
                    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], c(e, this)
                }

                function i(e, t) {
                    for (; 3 === e._state;) e = e._value;
                    if (0 === e._state) return void e._deferreds.push(t);
                    e._handled = !0, o._immediateFn(function() {
                        var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                        if (null === n) return void(1 === e._state ? s : a)(t.promise, e._value);
                        var r;
                        try { r = n(e._value) } catch (e) { return void a(t.promise, e) }
                        s(t.promise, r)
                    })
                }

                function s(e, t) {
                    try {
                        if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                        if (t && ("object" == typeof t || "function" == typeof t)) { var n = t.then; if (t instanceof o) return e._state = 3, e._value = t, void u(e); if ("function" == typeof n) return void c(r(n, t), e) }
                        e._state = 1, e._value = t, u(e)
                    } catch (t) { a(e, t) }
                }

                function a(e, t) { e._state = 2, e._value = t, u(e) }

                function u(e) {
                    2 === e._state && 0 === e._deferreds.length && o._immediateFn(function() { e._handled || o._unhandledRejectionFn(e._value) });
                    for (var t = 0, n = e._deferreds.length; t < n; t++) i(e, e._deferreds[t]);
                    e._deferreds = null
                }

                function d(e, t, n) { this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n }

                function c(e, t) {
                    var n = !1;
                    try { e(function(e) { n || (n = !0, s(t, e)) }, function(e) { n || (n = !0, a(t, e)) }) } catch (e) {
                        if (n) return;
                        n = !0, a(t, e)
                    }
                }
                var f = setTimeout;
                o.prototype.catch = function(e) { return this.then(null, e) }, o.prototype.then = function(e, t) { var r = new this.constructor(n); return i(this, new d(e, t, r)), r }, o.prototype.finally = function(e) { var t = this.constructor; return this.then(function(n) { return t.resolve(e()).then(function() { return n }) }, function(n) { return t.resolve(e()).then(function() { return t.reject(n) }) }) }, o.all = function(e) {
                    return new o(function(t, n) {
                        function r(e, s) {
                            try {
                                if (s && ("object" == typeof s || "function" == typeof s)) { var a = s.then; if ("function" == typeof a) return void a.call(s, function(t) { r(e, t) }, n) }
                                o[e] = s, 0 == --i && t(o)
                            } catch (e) { n(e) }
                        }
                        if (!e || void 0 === e.length) throw new TypeError("Promise.all accepts an array");
                        var o = Array.prototype.slice.call(e);
                        if (0 === o.length) return t([]);
                        for (var i = o.length, s = 0; s < o.length; s++) r(s, o[s])
                    })
                }, o.resolve = function(e) { return e && "object" == typeof e && e.constructor === o ? e : new o(function(t) { t(e) }) }, o.reject = function(e) { return new o(function(t, n) { n(e) }) }, o.race = function(e) { return new o(function(t, n) { for (var r = 0, o = e.length; r < o; r++) e[r].then(t, n) }) }, o._immediateFn = "function" == typeof e && function(t) { e(t) } || function(e) { f(e, 0) }, o._unhandledRejectionFn = function(e) { "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e) };
                var l = function() { if ("undefined" != typeof self) return self; if ("undefined" != typeof window) return window; if (void 0 !== t) return t; throw new Error("unable to locate global object") }();
                l.Promise || (l.Promise = o)
            })
        }).call(t, n(149).setImmediate, n(4))
    }, function(e, t, n) {
        (function(e, t) {
            (function(e, n) {
                "use strict";

                function r(e) { "function" != typeof e && (e = new Function("" + e)); for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1]; var r = { callback: e, args: t }; return d[u] = r, a(u), u++ }

                function o(e) { delete d[e] }

                function i(e) {
                    var t = e.callback,
                        r = e.args;
                    switch (r.length) {
                        case 0:
                            t();
                            break;
                        case 1:
                            t(r[0]);
                            break;
                        case 2:
                            t(r[0], r[1]);
                            break;
                        case 3:
                            t(r[0], r[1], r[2]);
                            break;
                        default:
                            t.apply(n, r)
                    }
                }

                function s(e) {
                    if (c) setTimeout(s, 0, e);
                    else { var t = d[e]; if (t) { c = !0; try { i(t) } finally { o(e), c = !1 } } }
                }
                if (!e.setImmediate) {
                    var a, u = 1,
                        d = {},
                        c = !1,
                        f = e.document,
                        l = Object.getPrototypeOf && Object.getPrototypeOf(e);
                    l = l && l.setTimeout ? l : e, "[object process]" === {}.toString.call(e.process) ? function() { a = function(e) { t.nextTick(function() { s(e) }) } }() : ! function() {
                        if (e.postMessage && !e.importScripts) {
                            var t = !0,
                                n = e.onmessage;
                            return e.onmessage = function() { t = !1 }, e.postMessage("", "*"), e.onmessage = n, t
                        }
                    }() ? e.MessageChannel ? function() {
                        var e = new MessageChannel;
                        e.port1.onmessage = function(e) { s(e.data) }, a = function(t) { e.port2.postMessage(t) }
                    }() : f && "onreadystatechange" in f.createElement("script") ? function() {
                        var e = f.documentElement;
                        a = function(t) {
                            var n = f.createElement("script");
                            n.onreadystatechange = function() { s(t), n.onreadystatechange = null, e.removeChild(n), n = null }, e.appendChild(n)
                        }
                    }() : function() { a = function(e) { setTimeout(s, 0, e) } }() : function() {
                        var t = "setImmediate$" + Math.random() + "$",
                            n = function(n) { n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(t) && s(+n.data.slice(t.length)) };
                        e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n), a = function(n) { e.postMessage(t + n, "*") }
                    }(), l.setImmediate = r, l.clearImmediate = o
                }
            })("undefined" == typeof self ? void 0 === e ? this : e : self)
        }).call(t, n(4), n(146))
    }, function(e, t, n) {
        (function(e) {
            function r(e, t) { this._id = e, this._clearFn = t }
            var o = void 0 !== e && e || "undefined" != typeof self && self || window,
                i = Function.prototype.apply;
            t.setTimeout = function() { return new r(i.call(setTimeout, o, arguments), clearTimeout) }, t.setInterval = function() { return new r(i.call(setInterval, o, arguments), clearInterval) }, t.clearTimeout = t.clearInterval = function(e) { e && e.close() }, r.prototype.unref = r.prototype.ref = function() {}, r.prototype.close = function() { this._clearFn.call(o, this._id) }, t.enroll = function(e, t) { clearTimeout(e._idleTimeoutId), e._idleTimeout = t }, t.unenroll = function(e) { clearTimeout(e._idleTimeoutId), e._idleTimeout = -1 }, t._unrefActive = t.active = function(e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                t >= 0 && (e._idleTimeoutId = setTimeout(function() { e._onTimeout && e._onTimeout() }, t))
            }, n(148), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
        }).call(t, n(4))
    }, , function(e, t, n) {
        "use strict";
        var r = n(135),
            o = n(403),
            i = Object.assign(r, o.apiObj);
        e.exports = i
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var r = n(6),
            o = n(7),
            i = n(8),
            s = n(9),
            a = n(10),
            u = n(11),
            d = n(12),
            c = n(13),
            f = n(14),
            l = n(15),
            v = n(16),
            p = n(17),
            _ = n(18),
            E = n(19),
            N = n(20),
            h = n(21),
            P = n(22),
            m = n(23),
            M = n(24),
            y = n(25),
            k = n(26),
            b = n(27),
            g = n(28),
            I = n(29),
            A = n(30),
            S = n(31),
            V = n(32),
            U = n(33),
            j = n(34),
            $ = n(35),
            O = n(36),
            w = n(37),
            D = n(38),
            C = n(39),
            T = n(40),
            F = n(41),
            x = n(42),
            z = n(43),
            L = n(44),
            R = n(45),
            B = n(46),
            W = n(47),
            q = n(48),
            J = n(49),
            H = n(50),
            G = n(51),
            Y = n(52),
            Q = n(53),
            K = n(54),
            Z = n(55),
            X = n(56),
            ee = n(57),
            te = n(58),
            ne = n(59),
            re = n(60),
            oe = n(61),
            ie = n(62),
            se = n(63),
            ae = n(64),
            ue = n(65),
            de = n(66),
            ce = n(67),
            fe = n(68),
            le = n(69),
            ve = n(70),
            pe = n(71),
            _e = n(72),
            Ee = n(73),
            Ne = n(74),
            he = n(75),
            Pe = n(76),
            me = n(77),
            Me = n(78),
            ye = n(79),
            ke = n(80),
            be = n(81),
            ge = n(82),
            Ie = n(83),
            Ae = n(84),
            Se = n(85),
            Ve = n(86),
            Ue = n(87),
            je = n(88),
            $e = n(89),
            Oe = n(90),
            we = n(91),
            De = n(92),
            Ce = n(93),
            Te = n(94),
            Fe = n(95),
            xe = n(96),
            ze = n(97),
            Le = n(98),
            Re = n(99),
            Be = n(100),
            We = n(101),
            qe = n(102),
            Je = n(103),
            He = n(104),
            Ge = n(105),
            Ye = n(106),
            Qe = n(107),
            Ke = n(108),
            Ze = n(109),
            Xe = n(110),
            et = n(111),
            tt = n(112),
            nt = n(113),
            rt = n(114),
            ot = n(115),
            it = n(116),
            st = n(117),
            at = n(118),
            ut = n(119),
            dt = n(120),
            ct = n(121),
            ft = n(122),
            lt = n(123),
            vt = n(124),
            pt = n(125),
            _t = n(126),
            Et = n(127),
            Nt = n(128),
            ht = n(129),
            Pt = n(130),
            mt = n(131),
            Mt = n(132),
            yt = n(133);
        t.apiObj = { biz: { alipay: { pay: r.pay$ }, calendar: { chooseDateTime: o.chooseDateTime$, chooseHalfDay: i.chooseHalfDay$, chooseInterval: s.chooseInterval$, chooseOneDay: a.chooseOneDay$ }, chat: { chooseConversationByCorpId: u.chooseConversationByCorpId$, locationChatMessage: d.locationChatMessage$, openSingleChat: c.openSingleChat$, pickConversation: f.pickConversation$, toConversation: l.toConversation$ }, clipboardData: { setData: v.setData$ }, contact: { choose: p.choose$, chooseMobileContacts: _.chooseMobileContacts$, complexPicker: E.complexPicker$, createGroup: N.createGroup$, departmentsPicker: h.departmentsPicker$, externalComplexPicker: P.externalComplexPicker$, externalEditForm: m.externalEditForm$, setRule: M.setRule$ }, cspace: { chooseSpaceDir: y.chooseSpaceDir$, preview: k.preview$, saveFile: b.saveFile$ }, customContact: { choose: g.choose$, multipleChoose: I.multipleChoose$ }, ding: { create: A.create$, post: S.post$ }, intent: { fetchData: V.fetchData$ }, map: { locate: U.locate$, search: j.search$, view: $.view$ }, navigation: { close: O.close$, goBack: w.goBack$, quit: D.quit$, replace: C.replace$, setIcon: T.setIcon$, setLeft: F.setLeft$, setMenu: x.setMenu$, setRight: z.setRight$, setTitle: L.setTitle$ }, store: { closeUnpayOrder: R.closeUnpayOrder$, createOrder: B.createOrder$, getPayUrl: W.getPayUrl$, inquiry: q.inquiry$ }, telephone: { call: J.call$, checkBizCall: H.checkBizCall$, quickCallList: G.quickCallList$, showCallMenu: Y.showCallMenu$ }, user: { get: Q.get$ }, util: { chosen: K.chosen$, datepicker: Z.datepicker$, datetimepicker: X.datetimepicker$, decrypt: ee.decrypt$, downloadFile: te.downloadFile$, encrypt: ne.encrypt$, isLocalFileExist: re.isLocalFileExist$, multiSelect: oe.multiSelect$, open: ie.open$, openLink: se.openLink$, openLocalFile: ae.openLocalFile$, openModal: ue.openModal$, openSlidePanel: de.openSlidePanel$, previewImage: ce.previewImage$, previewVideo: fe.previewVideo$, scan: le.scan$, scanCard: ve.scanCard$, setScreenBrightnessAndKeepOn: pe.setScreenBrightnessAndKeepOn$, share: _e.share$, timepicker: Ee.timepicker$, uploadAttachment: Ne.uploadAttachment$, uploadImage: he.uploadImage$, uploadImageFromCamera: Pe.uploadImageFromCamera$, ut: me.ut$ } }, channel: { permission: { requestAuthCode: Me.requestAuthCode$ } }, device: { accelerometer: { clearShake: ye.clearShake$, watchShake: ke.watchShake$ }, audio: { download: be.download$, onPlayEnd: ge.onPlayEnd$, onRecordEnd: Ie.onRecordEnd$, pause: Ae.pause$, play: Se.play$, resume: Ve.resume$, startRecord: Ue.startRecord$, stop: je.stop$, stopRecord: $e.stopRecord$, translateVoice: Oe.translateVoice$ }, base: { getInterface: we.getInterface$, getPhoneInfo: De.getPhoneInfo$, getUUID: Ce.getUUID$, getWifiStatus: Te.getWifiStatus$ }, connection: { getNetworkType: Fe.getNetworkType$ }, geolocation: { get: xe.get$, start: ze.start$ }, launcher: { checkInstalledApps: Le.checkInstalledApps$, launchApp: Re.launchApp$ }, nfc: { nfcRead: Be.nfcRead$, nfcStop: We.nfcStop$, nfcWrite: qe.nfcWrite$ }, notification: { actionSheet: Je.actionSheet$, alert: He.alert$, confirm: Ge.confirm$, extendModal: Ye.extendModal$, hidePreloader: Qe.hidePreloader$, modal: Ke.modal$, prompt: Ze.prompt$, showPreloader: Xe.showPreloader$, toast: et.toast$, vibrate: tt.vibrate$ }, screen: { resetView: nt.resetView$, rotateView: rt.rotateView$ } }, runtime: { message: { fetch: ot.fetch$, post: it.post$ }, permission: { requestAuthCode: st.requestAuthCode$, requestOperateAuthCode: at.requestOperateAuthCode$ } }, ui: { input: { plain: ut.plain$ }, nav: { close: dt.close$, getCurrentId: ct.getCurrentId$, go: ft.go$, preload: lt.preload$, recycle: vt.recycle$ }, progressBar: { setColors: pt.setColors$ }, pullToRefresh: { disable: _t.disable$, enable: Et.enable$, stop: Nt.stop$ }, webViewBounce: { disable: ht.disable$, enable: Pt.enable$ } }, util: { domainStorage: { getItem: mt.getItem$, removeItem: Mt.removeItem$, setItem: yt.setItem$ } } }
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) { e.exports = n(151) }])
});