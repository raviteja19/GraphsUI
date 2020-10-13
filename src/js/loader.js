(function() {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    'use strict';
    var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    ;
    function ca(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("Cannot find global object");
    }
    var da = ca(this);
    function ea(a, b) {
        if (b)
            a: {
                var c = da;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c))
                        break a;
                    c = c[e]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && ba(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    }
    function fa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    function ha(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: fa(a)
        }
    }
    ea("Promise", function(a) {
        function b(f) {
            this.b = 0;
            this.c = void 0;
            this.a = [];
            var h = this.f();
            try {
                f(h.resolve, h.reject)
            } catch (k) {
                h.reject(k)
            }
        }
        function c() {
            this.a = null
        }
        function d(f) {
            return f instanceof b ? f : new b(function(h) {
                h(f)
            }
            )
        }
        if (a)
            return a;
        c.prototype.b = function(f) {
            if (null == this.a) {
                this.a = [];
                var h = this;
                this.c(function() {
                    h.g()
                })
            }
            this.a.push(f)
        }
        ;
        var e = da.setTimeout;
        c.prototype.c = function(f) {
            e(f, 0)
        }
        ;
        c.prototype.g = function() {
            for (; this.a && this.a.length; ) {
                var f = this.a;
                this.a = [];
                for (var h = 0; h < f.length; ++h) {
                    var k = f[h];
                    f[h] = null;
                    try {
                        k()
                    } catch (l) {
                        this.f(l)
                    }
                }
            }
            this.a = null
        }
        ;
        c.prototype.f = function(f) {
            this.c(function() {
                throw f;
            })
        }
        ;
        b.prototype.f = function() {
            function f(l) {
                return function(p) {
                    k || (k = !0,
                    l.call(h, p))
                }
            }
            var h = this
              , k = !1;
            return {
                resolve: f(this.m),
                reject: f(this.g)
            }
        }
        ;
        b.prototype.m = function(f) {
            if (f === this)
                this.g(new TypeError("A Promise cannot resolve to itself"));
            else if (f instanceof b)
                this.s(f);
            else {
                a: switch (typeof f) {
                case "object":
                    var h = null != f;
                    break a;
                case "function":
                    h = !0;
                    break a;
                default:
                    h = !1
                }
                h ? this.l(f) : this.h(f)
            }
        }
        ;
        b.prototype.l = function(f) {
            var h = void 0;
            try {
                h = f.then
            } catch (k) {
                this.g(k);
                return
            }
            "function" == typeof h ? this.u(h, f) : this.h(f)
        }
        ;
        b.prototype.g = function(f) {
            this.i(2, f)
        }
        ;
        b.prototype.h = function(f) {
            this.i(1, f)
        }
        ;
        b.prototype.i = function(f, h) {
            if (0 != this.b)
                throw Error("Cannot settle(" + f + ", " + h + "): Promise already settled in state" + this.b);
            this.b = f;
            this.c = h;
            this.j()
        }
        ;
        b.prototype.j = function() {
            if (null != this.a) {
                for (var f = 0; f < this.a.length; ++f)
                    g.b(this.a[f]);
                this.a = null
            }
        }
        ;
        var g = new c;
        b.prototype.s = function(f) {
            var h = this.f();
            f.o(h.resolve, h.reject)
        }
        ;
        b.prototype.u = function(f, h) {
            var k = this.f();
            try {
                f.call(h, k.resolve, k.reject)
            } catch (l) {
                k.reject(l)
            }
        }
        ;
        b.prototype.then = function(f, h) {
            function k(t, z) {
                return "function" == typeof t ? function(Y) {
                    try {
                        l(t(Y))
                    } catch (Z) {
                        p(Z)
                    }
                }
                : z
            }
            var l, p, aa = new b(function(t, z) {
                l = t;
                p = z
            }
            );
            this.o(k(f, l), k(h, p));
            return aa
        }
        ;
        b.prototype.catch = function(f) {
            return this.then(void 0, f)
        }
        ;
        b.prototype.o = function(f, h) {
            function k() {
                switch (l.b) {
                case 1:
                    f(l.c);
                    break;
                case 2:
                    h(l.c);
                    break;
                default:
                    throw Error("Unexpected state: " + l.b);
                }
            }
            var l = this;
            null == this.a ? g.b(k) : this.a.push(k)
        }
        ;
        b.resolve = d;
        b.reject = function(f) {
            return new b(function(h, k) {
                k(f)
            }
            )
        }
        ;
        b.race = function(f) {
            return new b(function(h, k) {
                for (var l = ha(f), p = l.next(); !p.done; p = l.next())
                    d(p.value).o(h, k)
            }
            )
        }
        ;
        b.all = function(f) {
            var h = ha(f)
              , k = h.next();
            return k.done ? d([]) : new b(function(l, p) {
                function aa(Y) {
                    return function(Z) {
                        t[Y] = Z;
                        z--;
                        0 == z && l(t)
                    }
                }
                var t = []
                  , z = 0;
                do
                    t.push(void 0),
                    z++,
                    d(k.value).o(aa(t.length - 1), p),
                    k = h.next();
                while (!k.done)
            }
            )
        }
        ;
        return b
    });
    var ia = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d)
                    Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e])
        }
        return a
    }
    ;
    ea("Object.assign", function(a) {
        return a || ia
    });
    var m = this || self
      , ja = /^[\w+/_-]+[=]{0,2}$/
      , ka = null;
    function la(a) {
        return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && ja.test(a) ? a : ""
    }
    function n() {}
    function ma(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }
    function q(a) {
        return "function" == ma(a)
    }
    function na(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
    function oa(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function pa(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
    function r(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? r = oa : r = pa;
        return r.apply(null, arguments)
    }
    function u(a, b) {
        a = a.split(".");
        var c = m;
        a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }
    function v(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    }
    function qa(a) {
        return a
    }
    ;function w(a) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, w);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    }
    v(w, Error);
    w.prototype.name = "CustomError";
    function x(a, b) {
        this.a = a === ra && b || "";
        this.b = sa
    }
    x.prototype.C = !0;
    x.prototype.B = function() {
        return this.a
    }
    ;
    function ta(a) {
        return a instanceof x && a.constructor === x && a.b === sa ? a.a : "type_error:Const"
    }
    function y(a) {
        return new x(ra,a)
    }
    var sa = {}
      , ra = {};
    var ua = {
        "gstatic.com": {
            loader: y("https://www.gstatic.com/charts/%{version}/loader.js"),
            debug: y("https://www.gstatic.com/charts/debug/%{version}/js/jsapi_debug_%{package}_module.js"),
            debug_i18n: y("https://www.gstatic.com/charts/debug/%{version}/i18n/jsapi_debug_i18n_%{package}_module__%{language}.js"),
            compiled: y("https://www.gstatic.com/charts/%{version}/js/jsapi_compiled_%{package}_module.js"),
            compiled_i18n: y("https://www.gstatic.com/charts/%{version}/i18n/jsapi_compiled_i18n_%{package}_module__%{language}.js"),
            css: y("https://www.gstatic.com/charts/%{version}/css/%{subdir}/%{filename}"),
            css2: y("https://www.gstatic.com/charts/%{version}/css/%{subdir1}/%{subdir2}/%{filename}"),
            third_party: y("https://www.gstatic.com/charts/%{version}/third_party/%{subdir}/%{filename}"),
            third_party2: y("https://www.gstatic.com/charts/%{version}/third_party/%{subdir1}/%{subdir2}/%{filename}"),
            third_party_gen: y("https://www.gstatic.com/charts/%{version}/third_party/%{subdir}/%{filename}")
        },
        "gstatic.cn": {
            loader: y("https://www.gstatic.cn/charts/%{version}/loader.js"),
            debug: y("https://www.gstatic.cn/charts/debug/%{version}/js/jsapi_debug_%{package}_module.js"),
            debug_i18n: y("https://www.gstatic.cn/charts/debug/%{version}/i18n/jsapi_debug_i18n_%{package}_module__%{language}.js"),
            compiled: y("https://www.gstatic.cn/charts/%{version}/js/jsapi_compiled_%{package}_module.js"),
            compiled_i18n: y("https://www.gstatic.cn/charts/%{version}/i18n/jsapi_compiled_i18n_%{package}_module__%{language}.js"),
            css: y("https://www.gstatic.cn/charts/%{version}/css/%{subdir}/%{filename}"),
            css2: y("https://www.gstatic.cn/charts/%{version}/css/%{subdir1}/%{subdir2}/%{filename}"),
            third_party: y("https://www.gstatic.cn/charts/%{version}/third_party/%{subdir}/%{filename}"),
            third_party2: y("https://www.gstatic.cn/charts/%{version}/third_party/%{subdir1}/%{subdir2}/%{filename}"),
            third_party_gen: y("https://www.gstatic.cn/charts/%{version}/third_party/%{subdir}/%{filename}")
        }
    }
      , va = ["default"]
      , wa = {
        "default": [],
        graphics: ["default"],
        ui: ["graphics"],
        ui_base: ["graphics"],
        flashui: ["ui"],
        fw: ["ui"],
        geo: ["ui"],
        annotatedtimeline: ["annotationchart"],
        annotationchart: ["ui", "controls", "corechart", "table"],
        areachart: "browserchart",
        bar: ["fw", "dygraph", "webfontloader"],
        barchart: "browserchart",
        browserchart: ["ui"],
        bubbles: ["fw", "d3"],
        calendar: ["fw"],
        charteditor: "ui corechart imagechart annotatedtimeline gauge geochart motionchart orgchart table".split(" "),
        charteditor_base: "ui_base corechart imagechart annotatedtimeline gauge geochart motionchart orgchart table_base".split(" "),
        circles: ["fw", "d3"],
        clusterchart: ["corechart", "d3"],
        columnchart: "browserchart",
        controls: ["ui"],
        controls_base: ["ui_base"],
        corechart: ["ui"],
        gantt: ["fw", "dygraph"],
        gauge: ["ui"],
        geochart: ["geo"],
        geomap: ["flashui", "geo"],
        geomap_base: ["ui_base"],
        heatmap: ["vegachart"],
        helloworld: ["fw"],
        imagechart: ["ui"],
        imageareachart: "imagechart",
        imagebarchart: "imagechart",
        imagelinechart: "imagechart",
        imagepiechart: "imagechart",
        imagesparkline: "imagechart",
        line: ["fw", "dygraph", "webfontloader"],
        linechart: "browserchart",
        map: ["geo"],
        motionchart: ["flashui"],
        orgchart: ["ui"],
        overtimecharts: ["ui", "corechart"],
        piechart: "browserchart",
        sankey: ["fw", "d3", "d3.sankey"],
        scatter: ["fw", "dygraph", "webfontloader"],
        scatterchart: "browserchart",
        sunburst: ["fw", "d3"],
        streamgraph: ["fw", "d3"],
        table: ["ui"],
        table_base: ["ui_base"],
        timeline: ["fw", "ui", "dygraph"],
        treemap: ["ui"],
        vegachart: ["graphics"],
        wordtree: ["ui"]
    }
      , xa = {
        d3: {
            subdir1: "d3",
            subdir2: "v5",
            filename: "d3.js"
        },
        "d3.sankey": {
            subdir1: "d3_sankey",
            subdir2: "v4",
            filename: "d3.sankey.js"
        },
        webfontloader: {
            subdir: "webfontloader",
            filename: "webfont.js"
        }
    }
      , ya = {
        dygraph: {
            subdir: "dygraphs",
            filename: "dygraph-tickers-combined.js"
        }
    }
      , za = {
        "default": [{
            subdir: "core",
            filename: "tooltip.css"
        }],
        annotationchart: [{
            subdir: "annotationchart",
            filename: "annotationchart.css"
        }],
        charteditor: [{
            subdir: "charteditor",
            filename: "charteditor.css"
        }],
        charteditor_base: [{
            subdir: "charteditor_base",
            filename: "charteditor_base.css"
        }],
        controls: [{
            subdir: "controls",
            filename: "controls.css"
        }],
        imagesparkline: [{
            subdir: "imagechart",
            filename: "imagesparkline.css"
        }],
        orgchart: [{
            subdir: "orgchart",
            filename: "orgchart.css"
        }],
        table: [{
            subdir: "table",
            filename: "table.css"
        }, {
            subdir: "util",
            filename: "format.css"
        }],
        table_base: [{
            subdir: "util",
            filename: "format.css"
        }, {
            subdir: "table",
            filename: "table_base.css"
        }],
        ui: [{
            subdir: "util",
            filename: "util.css"
        }],
        ui_base: [{
            subdir: "util",
            filename: "util_base.css"
        }]
    };
    var A = Array.prototype.forEach ? function(a, b) {
        Array.prototype.forEach.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            e in d && b.call(void 0, d[e], e, a)
    }
      , Aa = Array.prototype.filter ? function(a, b) {
        return Array.prototype.filter.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = [], e = 0, g = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++)
            if (f in g) {
                var h = g[f];
                b.call(void 0, h, f, a) && (d[e++] = h)
            }
        return d
    }
      , B = Array.prototype.map ? function(a, b) {
        return Array.prototype.map.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, g = 0; g < c; g++)
            g in e && (d[g] = b.call(void 0, e[g], g, a));
        return d
    }
      , Ba = Array.prototype.some ? function(a, b) {
        return Array.prototype.some.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a))
                return !0;
        return !1
    }
    ;
    function Ca(a, b) {
        a: {
            for (var c = "string" === typeof a ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
                if (d in c && b.call(void 0, c[d], d, a)) {
                    b = d;
                    break a
                }
            b = -1
        }
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    }
    function Da(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c]
              , e = ma(d);
            if ("array" == e || "object" == e && "number" == typeof d.length) {
                e = a.length || 0;
                var g = d.length || 0;
                a.length = e + g;
                for (var f = 0; f < g; f++)
                    a[e + f] = d[f]
            } else
                a.push(d)
        }
    }
    ;var C;
    function D(a, b) {
        this.a = a === Ea && b || "";
        this.b = Fa
    }
    D.prototype.C = !0;
    D.prototype.B = function() {
        return this.a.toString()
    }
    ;
    function E(a) {
        return a instanceof D && a.constructor === D && a.b === Fa ? a.a : "type_error:TrustedResourceUrl"
    }
    function Ga(a, b) {
        var c = ta(a);
        if (!Ha.test(c))
            throw Error("Invalid TrustedResourceUrl format: " + c);
        a = c.replace(Ia, function(d, e) {
            if (!Object.prototype.hasOwnProperty.call(b, e))
                throw Error('Found marker, "' + e + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
            d = b[e];
            return d instanceof x ? ta(d) : encodeURIComponent(String(d))
        });
        return Ja(a)
    }
    var Ia = /%{(\w+)}/g
      , Ha = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i
      , Ka = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/
      , Fa = {};
    function Ja(a) {
        if (void 0 === C) {
            var b = null;
            var c = m.trustedTypes;
            if (c && c.createPolicy) {
                try {
                    b = c.createPolicy("goog#html", {
                        createHTML: qa,
                        createScript: qa,
                        createScriptURL: qa
                    })
                } catch (d) {
                    m.console && m.console.error(d.message)
                }
                C = b
            } else
                C = b
        }
        a = (b = C) ? b.createScriptURL(a) : a;
        return new D(Ea,a)
    }
    function La(a, b, c) {
        if (null == c)
            return b;
        if ("string" === typeof c)
            return c ? a + encodeURIComponent(c) : "";
        for (var d in c)
            if (Object.prototype.hasOwnProperty.call(c, d)) {
                var e = c[d];
                e = Array.isArray(e) ? e : [e];
                for (var g = 0; g < e.length; g++) {
                    var f = e[g];
                    null != f && (b || (b = a),
                    b += (b.length > a.length ? "&" : "") + encodeURIComponent(d) + "=" + encodeURIComponent(String(f)))
                }
            }
        return b
    }
    var Ea = {};
    var Ma = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }
    ;
    function Na(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
    ;var F;
    a: {
        var Oa = m.navigator;
        if (Oa) {
            var Pa = Oa.userAgent;
            if (Pa) {
                F = Pa;
                break a
            }
        }
        F = ""
    }
    function G(a) {
        return -1 != F.indexOf(a)
    }
    ;function Qa(a, b) {
        for (var c in a)
            b.call(void 0, a[c], c, a)
    }
    var Ra = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Sa(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var g = 0; g < Ra.length; g++)
                c = Ra[g],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }
    ;function Ta(a, b) {
        a.src = E(b);
        (b = a.ownerDocument && a.ownerDocument.defaultView) && b != m ? b = la(b.document) : (null === ka && (ka = la(m.document)),
        b = ka);
        b && a.setAttribute("nonce", b)
    }
    ;function Ua(a) {
        var b = Va;
        return Object.prototype.hasOwnProperty.call(b, 11) ? b[11] : b[11] = a(11)
    }
    ;var Wa = G("Opera"), Xa = G("Trident") || G("MSIE"), Ya = G("Edge"), Za = G("Gecko") && !(-1 != F.toLowerCase().indexOf("webkit") && !G("Edge")) && !(G("Trident") || G("MSIE")) && !G("Edge"), $a = -1 != F.toLowerCase().indexOf("webkit") && !G("Edge"), ab;
    a: {
        var bb = ""
          , cb = function() {
            var a = F;
            if (Za)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Ya)
                return /Edge\/([\d\.]+)/.exec(a);
            if (Xa)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if ($a)
                return /WebKit\/(\S+)/.exec(a);
            if (Wa)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        cb && (bb = cb ? cb[1] : "");
        if (Xa) {
            var H, db = m.document;
            H = db ? db.documentMode : void 0;
            if (null != H && H > parseFloat(bb)) {
                ab = String(H);
                break a
            }
        }
        ab = bb
    }
    var eb = ab
      , Va = {};
    function fb() {
        return Ua(function() {
            for (var a = 0, b = Ma(String(eb)).split("."), c = Ma("11").split("."), d = Math.max(b.length, c.length), e = 0; 0 == a && e < d; e++) {
                var g = b[e] || ""
                  , f = c[e] || "";
                do {
                    g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                    f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                    if (0 == g[0].length && 0 == f[0].length)
                        break;
                    a = Na(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == f[1].length ? 0 : parseInt(f[1], 10)) || Na(0 == g[2].length, 0 == f[2].length) || Na(g[2], f[2]);
                    g = g[3];
                    f = f[3]
                } while (0 == a)
            }
            return 0 <= a
        })
    }
    ;function gb(a, b) {
        Qa(b, function(c, d) {
            c && "object" == typeof c && c.C && (c = c.B());
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : hb.hasOwnProperty(d) ? a.setAttribute(hb[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
        })
    }
    var hb = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    function ib(a) {
        var b = document;
        a = String(a);
        "application/xhtml+xml" === b.contentType && (a = a.toLowerCase());
        return b.createElement(a)
    }
    ;function jb(a, b) {
        this.c = a;
        this.f = b;
        this.b = 0;
        this.a = null
    }
    jb.prototype.get = function() {
        if (0 < this.b) {
            this.b--;
            var a = this.a;
            this.a = a.next;
            a.next = null
        } else
            a = this.c();
        return a
    }
    ;
    function kb(a, b) {
        a.f(b);
        100 > a.b && (a.b++,
        b.next = a.a,
        a.a = b)
    }
    ;function lb(a) {
        m.setTimeout(function() {
            throw a;
        }, 0)
    }
    var mb;
    function nb() {
        var a = m.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !G("Presto") && (a = function() {
            var e = ib("IFRAME");
            e.style.display = "none";
            document.documentElement.appendChild(e);
            var g = e.contentWindow;
            e = g.document;
            e.open();
            e.close();
            var f = "callImmediate" + Math.random()
              , h = "file:" == g.location.protocol ? "*" : g.location.protocol + "//" + g.location.host;
            e = r(function(k) {
                if (("*" == h || k.origin == h) && k.data == f)
                    this.port1.onmessage()
            }, this);
            g.addEventListener("message", e, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    g.postMessage(f, h)
                }
            }
        }
        );
        if ("undefined" !== typeof a && !G("Trident") && !G("MSIE")) {
            var b = new a
              , c = {}
              , d = c;
            b.port1.onmessage = function() {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.A;
                    c.A = null;
                    e()
                }
            }
            ;
            return function(e) {
                d.next = {
                    A: e
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return function(e) {
            m.setTimeout(e, 0)
        }
    }
    ;function ob() {
        this.b = this.a = null
    }
    var qb = new jb(function() {
        return new pb
    }
    ,function(a) {
        a.reset()
    }
    );
    ob.prototype.add = function(a, b) {
        var c = qb.get();
        c.set(a, b);
        this.b ? this.b.next = c : this.a = c;
        this.b = c
    }
    ;
    function rb() {
        var a = sb
          , b = null;
        a.a && (b = a.a,
        a.a = a.a.next,
        a.a || (a.b = null),
        b.next = null);
        return b
    }
    function pb() {
        this.next = this.b = this.a = null
    }
    pb.prototype.set = function(a, b) {
        this.a = a;
        this.b = b;
        this.next = null
    }
    ;
    pb.prototype.reset = function() {
        this.next = this.b = this.a = null
    }
    ;
    function tb(a, b) {
        I || ub();
        vb || (I(),
        vb = !0);
        sb.add(a, b)
    }
    var I;
    function ub() {
        if (m.Promise && m.Promise.resolve) {
            var a = m.Promise.resolve(void 0);
            I = function() {
                a.then(wb)
            }
        } else
            I = function() {
                var b = wb;
                !q(m.setImmediate) || m.Window && m.Window.prototype && !G("Edge") && m.Window.prototype.setImmediate == m.setImmediate ? (mb || (mb = nb()),
                mb(b)) : m.setImmediate(b)
            }
    }
    var vb = !1
      , sb = new ob;
    function wb() {
        for (var a; a = rb(); ) {
            try {
                a.a.call(a.b)
            } catch (b) {
                lb(b)
            }
            kb(qb, a)
        }
        vb = !1
    }
    ;function xb(a) {
        if (!a)
            return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    }
    ;function J(a) {
        this.a = 0;
        this.i = void 0;
        this.f = this.b = this.c = null;
        this.g = this.h = !1;
        if (a != n)
            try {
                var b = this;
                a.call(void 0, function(c) {
                    K(b, 2, c)
                }, function(c) {
                    K(b, 3, c)
                })
            } catch (c) {
                K(this, 3, c)
            }
    }
    function yb() {
        this.next = this.c = this.b = this.f = this.a = null;
        this.g = !1
    }
    yb.prototype.reset = function() {
        this.c = this.b = this.f = this.a = null;
        this.g = !1
    }
    ;
    var zb = new jb(function() {
        return new yb
    }
    ,function(a) {
        a.reset()
    }
    );
    function Ab(a, b, c) {
        var d = zb.get();
        d.f = a;
        d.b = b;
        d.c = c;
        return d
    }
    J.prototype.then = function(a, b, c) {
        return Bb(this, q(a) ? a : null, q(b) ? b : null, c)
    }
    ;
    J.prototype.$goog_Thenable = !0;
    J.prototype.cancel = function(a) {
        if (0 == this.a) {
            var b = new L(a);
            tb(function() {
                Cb(this, b)
            }, this)
        }
    }
    ;
    function Cb(a, b) {
        if (0 == a.a)
            if (a.c) {
                var c = a.c;
                if (c.b) {
                    for (var d = 0, e = null, g = null, f = c.b; f && (f.g || (d++,
                    f.a == a && (e = f),
                    !(e && 1 < d))); f = f.next)
                        e || (g = f);
                    e && (0 == c.a && 1 == d ? Cb(c, b) : (g ? (d = g,
                    d.next == c.f && (c.f = d),
                    d.next = d.next.next) : Db(c),
                    Eb(c, e, 3, b)))
                }
                a.c = null
            } else
                K(a, 3, b)
    }
    function Fb(a, b) {
        a.b || 2 != a.a && 3 != a.a || Gb(a);
        a.f ? a.f.next = b : a.b = b;
        a.f = b
    }
    function Bb(a, b, c, d) {
        var e = Ab(null, null, null);
        e.a = new J(function(g, f) {
            e.f = b ? function(h) {
                try {
                    var k = b.call(d, h);
                    g(k)
                } catch (l) {
                    f(l)
                }
            }
            : g;
            e.b = c ? function(h) {
                try {
                    var k = c.call(d, h);
                    void 0 === k && h instanceof L ? f(h) : g(k)
                } catch (l) {
                    f(l)
                }
            }
            : f
        }
        );
        e.a.c = a;
        Fb(a, e);
        return e.a
    }
    J.prototype.l = function(a) {
        this.a = 0;
        K(this, 2, a)
    }
    ;
    J.prototype.m = function(a) {
        this.a = 0;
        K(this, 3, a)
    }
    ;
    function K(a, b, c) {
        if (0 == a.a) {
            a === c && (b = 3,
            c = new TypeError("Promise cannot resolve to itself"));
            a.a = 1;
            a: {
                var d = c
                  , e = a.l
                  , g = a.m;
                if (d instanceof J) {
                    Fb(d, Ab(e || n, g || null, a));
                    var f = !0
                } else if (xb(d))
                    d.then(e, g, a),
                    f = !0;
                else {
                    if (na(d))
                        try {
                            var h = d.then;
                            if (q(h)) {
                                Hb(d, h, e, g, a);
                                f = !0;
                                break a
                            }
                        } catch (k) {
                            g.call(a, k);
                            f = !0;
                            break a
                        }
                    f = !1
                }
            }
            f || (a.i = c,
            a.a = b,
            a.c = null,
            Gb(a),
            3 != b || c instanceof L || Ib(a, c))
        }
    }
    function Hb(a, b, c, d, e) {
        function g(k) {
            h || (h = !0,
            d.call(e, k))
        }
        function f(k) {
            h || (h = !0,
            c.call(e, k))
        }
        var h = !1;
        try {
            b.call(a, f, g)
        } catch (k) {
            g(k)
        }
    }
    function Gb(a) {
        a.h || (a.h = !0,
        tb(a.j, a))
    }
    function Db(a) {
        var b = null;
        a.b && (b = a.b,
        a.b = b.next,
        b.next = null);
        a.b || (a.f = null);
        return b
    }
    J.prototype.j = function() {
        for (var a; a = Db(this); )
            Eb(this, a, this.a, this.i);
        this.h = !1
    }
    ;
    function Eb(a, b, c, d) {
        if (3 == c && b.b && !b.g)
            for (; a && a.g; a = a.c)
                a.g = !1;
        if (b.a)
            b.a.c = null,
            Jb(b, c, d);
        else
            try {
                b.g ? b.f.call(b.c) : Jb(b, c, d)
            } catch (e) {
                Kb.call(null, e)
            }
        kb(zb, b)
    }
    function Jb(a, b, c) {
        2 == b ? a.f.call(a.c, c) : a.b && a.b.call(a.c, c)
    }
    function Ib(a, b) {
        a.g = !0;
        tb(function() {
            a.g && Kb.call(null, b)
        })
    }
    var Kb = lb;
    function L(a) {
        w.call(this, a)
    }
    v(L, w);
    L.prototype.name = "cancel";
    /*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
    function M(a, b) {
        this.g = [];
        this.u = a;
        this.s = b || null;
        this.f = this.a = !1;
        this.c = void 0;
        this.l = this.K = this.i = !1;
        this.h = 0;
        this.b = null;
        this.j = 0
    }
    M.prototype.cancel = function(a) {
        if (this.a)
            this.c instanceof M && this.c.cancel();
        else {
            if (this.b) {
                var b = this.b;
                delete this.b;
                a ? b.cancel(a) : (b.j--,
                0 >= b.j && b.cancel())
            }
            this.u ? this.u.call(this.s, this) : this.l = !0;
            this.a || (a = new N(this),
            O(this),
            P(this, !1, a))
        }
    }
    ;
    M.prototype.m = function(a, b) {
        this.i = !1;
        P(this, a, b)
    }
    ;
    function P(a, b, c) {
        a.a = !0;
        a.c = c;
        a.f = !b;
        Lb(a)
    }
    function O(a) {
        if (a.a) {
            if (!a.l)
                throw new Q(a);
            a.l = !1
        }
    }
    function R(a, b, c, d) {
        a.g.push([b, c, d]);
        a.a && Lb(a);
        return a
    }
    M.prototype.then = function(a, b, c) {
        var d, e, g = new J(function(f, h) {
            d = f;
            e = h
        }
        );
        R(this, d, function(f) {
            f instanceof N ? g.cancel() : e(f)
        });
        return g.then(a, b, c)
    }
    ;
    M.prototype.$goog_Thenable = !0;
    function Mb(a) {
        return Ba(a.g, function(b) {
            return q(b[1])
        })
    }
    function Lb(a) {
        if (a.h && a.a && Mb(a)) {
            var b = a.h
              , c = S[b];
            c && (m.clearTimeout(c.a),
            delete S[b]);
            a.h = 0
        }
        a.b && (a.b.j--,
        delete a.b);
        b = a.c;
        for (var d = c = !1; a.g.length && !a.i; ) {
            var e = a.g.shift()
              , g = e[0]
              , f = e[1];
            e = e[2];
            if (g = a.f ? f : g)
                try {
                    var h = g.call(e || a.s, b);
                    void 0 !== h && (a.f = a.f && (h == b || h instanceof Error),
                    a.c = b = h);
                    if (xb(b) || "function" === typeof m.Promise && b instanceof m.Promise)
                        d = !0,
                        a.i = !0
                } catch (k) {
                    b = k,
                    a.f = !0,
                    Mb(a) || (c = !0)
                }
        }
        a.c = b;
        d && (h = r(a.m, a, !0),
        d = r(a.m, a, !1),
        b instanceof M ? (R(b, h, d),
        b.K = !0) : b.then(h, d));
        c && (b = new Nb(b),
        S[b.a] = b,
        a.h = b.a)
    }
    function Ob() {
        var a = new M;
        O(a);
        P(a, !0, null);
        return a
    }
    function Q() {
        w.call(this)
    }
    v(Q, w);
    Q.prototype.message = "Deferred has already fired";
    Q.prototype.name = "AlreadyCalledError";
    function N() {
        w.call(this)
    }
    v(N, w);
    N.prototype.message = "Deferred was canceled";
    N.prototype.name = "CanceledError";
    function Nb(a) {
        this.a = m.setTimeout(r(this.c, this), 0);
        this.b = a
    }
    Nb.prototype.c = function() {
        delete S[this.a];
        throw this.b;
    }
    ;
    var S = {};
    var Pb, Qb = [];
    function Rb(a, b) {
        function c() {
            var e = a.shift();
            e = Sb(e, b);
            a.length && R(e, c, c, void 0);
            return e
        }
        if (!a.length)
            return Ob();
        var d = Qb.length;
        Da(Qb, a);
        if (d)
            return Pb;
        a = Qb;
        return Pb = c()
    }
    function Sb(a, b) {
        var c = b || {};
        b = c.document || document;
        var d = E(a).toString()
          , e = ib("SCRIPT")
          , g = {
            H: e,
            I: void 0
        }
          , f = new M(Tb,g)
          , h = null
          , k = null != c.timeout ? c.timeout : 5E3;
        0 < k && (h = window.setTimeout(function() {
            T(e, !0);
            var l = new Ub(1,"Timeout reached for loading script " + d);
            O(f);
            P(f, !1, l)
        }, k),
        g.I = h);
        e.onload = e.onreadystatechange = function() {
            e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (T(e, c.L || !1, h),
            O(f),
            P(f, !0, null))
        }
        ;
        e.onerror = function() {
            T(e, !0, h);
            var l = new Ub(0,"Error while loading script " + d);
            O(f);
            P(f, !1, l)
        }
        ;
        g = c.attributes || {};
        Sa(g, {
            type: "text/javascript",
            charset: "UTF-8"
        });
        gb(e, g);
        Ta(e, a);
        Vb(b).appendChild(e);
        return f
    }
    function Vb(a) {
        var b;
        return (b = (a || document).getElementsByTagName("HEAD")) && 0 != b.length ? b[0] : a.documentElement
    }
    function Tb() {
        if (this && this.H) {
            var a = this.H;
            a && "SCRIPT" == a.tagName && T(a, !0, this.I)
        }
    }
    function T(a, b, c) {
        null != c && m.clearTimeout(c);
        a.onload = n;
        a.onerror = n;
        a.onreadystatechange = n;
        b && window.setTimeout(function() {
            a && a.parentNode && a.parentNode.removeChild(a)
        }, 0)
    }
    function Ub(a, b) {
        var c = "Jsloader error (code #" + a + ")";
        b && (c += ": " + b);
        w.call(this, c);
        this.code = a
    }
    v(Ub, w);
    var Wb = Sb;
    function Xb(a) {
        var b = a.D || {};
        a = Ga(a.format, a.v);
        a = Ka.exec(E(a).toString());
        var c = a[3] || "";
        return Ja(a[1] + La("?", a[2] || "", b) + La("#", c, void 0))
    }
    function Yb(a) {
        a = B(a, Xb);
        if (0 == a.length)
            return Promise.resolve();
        var b = {
            timeout: 3E4,
            attributes: {
                async: !1,
                defer: !1
            }
        }
          , c = [];
        !Xa || fb() ? A(a, function(d) {
            c.push(Wb(d, b))
        }) : c.push(Rb(a, b));
        return Promise.all(B(c, function(d) {
            return new Promise(function(e) {
                return R(d, e, null, void 0)
            }
            )
        }))
    }
    ;function Zb() {
        return new Promise(function(a) {
            "undefined" == typeof window || "complete" === document.readyState ? a() : window.addEventListener ? (document.addEventListener("DOMContentLoaded", a, !0),
            window.addEventListener("load", a, !0)) : window.attachEvent ? window.attachEvent("onload", a) : "function" !== typeof window.onload ? window.onload = a : window.onload = function(b) {
                window.onload(b);
                a()
            }
        }
        )
    }
    var U = {};
    function $b(a) {
        U[a] || (U[a] = {
            loaded: !1
        });
        U[a].loaded = !0
    }
    ;var ac = 0;
    function bc(a, b) {
        b = b || document;
        var c = "load-css-" + ac++
          , d = b.createElement("link");
        d.setAttribute("id", c);
        d.setAttribute("rel", "stylesheet");
        d.setAttribute("type", "text/css");
        return new Promise(function(e, g) {
            void 0 !== d.addEventListener ? (d.addEventListener("load", e, !1),
            d.addEventListener("error", g, !1)) : void 0 !== d.attachEvent && d.attachEvent("onload", function() {
                try {
                    Ca(b.styleSheets, function(f) {
                        return f.id === c
                    }) && ($b(a),
                    e())
                } catch (f) {
                    g()
                }
            });
            try {
                (b.querySelector("head") || b).appendChild(d),
                d.setAttribute("href", a)
            } catch (f) {
                e()
            }
        }
        )
    }
    function cc(a, b) {
        return Promise.all(B(a, function(c) {
            c = Xb(c);
            return bc(E(c).toString(), b)
        }))
    }
    ;var V = "", dc = "", ec = !1, fc = !1, W;
    function gc(a) {
        function b(d) {
            for (var e = [], g = 0; g < d.length; g++) {
                var f = d[g];
                if (!c[f]) {
                    c[f] = !0;
                    var h = wa[f] || [];
                    e = e.concat(b("string" === typeof h ? [h] : h));
                    "string" !== typeof h && e.push(f)
                }
            }
            return e
        }
        var c = {};
        return b(a)
    }
    function hc(a) {
        var b = []
          , c = [];
        A(a, function(d) {
            var e = U[d] && U[d].F;
            void 0 !== e ? b.push(e) : c.push(d)
        });
        return {
            G: b,
            J: c
        }
    }
    function ic(a) {
        a = hc(gc(a));
        var b = a.G
          , c = a.J
          , d = Aa(B(c, function(g) {
            var f = {
                version: V,
                language: dc,
                "package": g
            };
            xa[g] ? (g = xa[g],
            Object.assign(f, g),
            g = W[g.subdir ? "third_party" : "third_party2"]) : ya[g] ? (Object.assign(f, ya[g]),
            g = W.third_party_gen) : g = W[(ec ? "debug" : fc ? "pseudo" : "compiled") + (dc ? "_i18n" : "")];
            return g ? {
                format: g,
                v: f,
                D: void 0
            } : null
        }), function(g) {
            return null != g
        })
          , e = Promise.all(b).then(function() {
            return Yb(d)
        }).then(function() {
            A(c, function(g) {
                $b(g)
            })
        });
        A(c, function(g) {
            U[g] = {
                F: e,
                loaded: !1
            }
        });
        return e
    }
    function jc(a, b) {
        a = gc(a);
        var c = [];
        A(a, function(k) {
            A(za[k] || [], function(l) {
                c.push(l)
            })
        });
        if (0 === c.length)
            return Promise.resolve();
        var d = {};
        a = B(c, function(k) {
            var l = (k.subdir || k.subdir1 + "/" + k.subdir2) + "/" + k.filename;
            d[l] = k;
            return l
        });
        a = hc(a);
        var e = a.G
          , g = a.J
          , f = B(g, function(k) {
            k = d[k];
            var l = W.css
              , p = {
                version: V,
                subdir: k.subdir,
                filename: k.filename
            };
            k.subdir2 && (l = W.css2,
            p.subdir1 = k.subdir1,
            p.subdir2 = k.subdir2);
            return {
                format: l,
                v: p,
                D: void 0
            }
        })
          , h = Promise.all(e).then(function() {
            return cc(f, b)
        }).then(function() {
            A(g, function(k) {
                $b(k)
            })
        });
        A(g, function(k) {
            U[k] = {
                F: h,
                loaded: !1
            }
        });
        return h
    }
    function kc(a, b) {
        u("goog.visualization.isSafeMode", b.safeMode || !1);
        var c = b.debug || !1
          , d = b.pseudo || !1
          , e = b.language || "";
        dc = e;
        a || (a = b.version || "unknown");
        a = a || "";
        "" !== V && V !== a && (a = V);
        a = V = a || "";
        ec = c;
        fc = d;
        u("google.visualization.ModulePath", W.format);
        u("google.visualization.Version", a);
        u("google.visualization.Locale", e);
        u("google.visualization.isDebug", c);
        u("google.visualization.isPseudo", d);
        u("google.visualization.mapsApiKey", b.mapsApiKey)
    }
    var X = null;
    function lc(a, b) {
        function c(e) {
            return e.getRootNode ? e.getRootNode() : null != e.parentNode ? c(e.parentNode) : e
        }
        kc(a, b);
        a = b.packages;
        Array.isArray(a) && 0 != a.length || (a = va);
        var d = c(b.element || document);
        return X = Promise.all([jc(a, d), ic(a), b.ignoreWindowOnLoad ? Promise.resolve() : Zb()]).then(function() {
            var e = b.callback;
            if (e) {
                if ("function" !== typeof e)
                    throw Error("Callback must be a function");
                e()
            }
        })
    }
    u("google.charts.loader.VersionSpecific.load", function(a) {
        for (var b = [], c = 0; c < arguments.length; ++c)
            b[c] = arguments[c];
        c = 0;
        "visualization" === b[c] && c++;
        var d = "current";
        "string" === typeof b[c] && (d = b[c],
        c++);
        var e = {};
        na(b[c]) && (e = b[c]);
        W || (W = ua[e.domain || "gstatic.com"]);
        return lc(d, e)
    });
    u("google.charts.loader.VersionSpecific.setOnLoadCallback", function(a) {
        if (!X)
            throw Error("Must call google.charts.load before google.charts.setOnLoadCallback");
        if (!a)
            return X;
        if ("function" !== typeof a)
            throw Error("Callback must be a function");
        return X.then(a)
    });
}
).call(this);
