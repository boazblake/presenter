"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(require("mithril"));
var WorldSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "world-solid-badged"), mithril_1.default("path", { "d": "M10.05,18a20.46,20.46,0,0,0,.62,4.93h6.48V13.45H10.58A20.55,20.55,0,0,0,10.05,18Z", "class": "clr-i-solid--badged clr-i-solid-path-1--badged" }), mithril_1.default("path", { "d": "M18.85,22.94h6.48A20.46,20.46,0,0,0,26,18a20.55,20.55,0,0,0-.52-4.55H18.85Z", "class": "clr-i-solid--badged clr-i-solid-path-2--badged" }), mithril_1.default("path", { "d": "M33.12,12.81a7.44,7.44,0,0,1-1.9.58v0H31a6.77,6.77,0,0,1-2.07,0h-1.8A21.88,21.88,0,0,1,27.66,18a22.2,22.2,0,0,1-.57,4.93h4a13.94,13.94,0,0,1-.83,1.81H26.6a21.8,21.8,0,0,1-3,6,13.86,13.86,0,0,1-3,.92,20.21,20.21,0,0,0,4.18-6.94H18.86v7.15c-.29,0-.57,0-.86,0s-.55,0-.83,0V24.71H11.22a20.21,20.21,0,0,0,4.18,6.95,13.86,13.86,0,0,1-2.94-.9,21.8,21.8,0,0,1-3-6.05H5.78a13.94,13.94,0,0,1-.83-1.81h4A22.2,22.2,0,0,1,8.37,18a21.88,21.88,0,0,1,.48-4.55H4.76a13.88,13.88,0,0,1,.76-1.81H9.33A22.26,22.26,0,0,1,12.61,5a13.86,13.86,0,0,1,2.87-.84,20.13,20.13,0,0,0-4.4,7.45h6.09V4c.28,0,.55,0,.83,0s.58,0,.86,0v7.64h6.09l0-.13a7.47,7.47,0,0,1-2.36-4.76,20.37,20.37,0,0,0-2-2.55,14.23,14.23,0,0,1,2.06.56,7.44,7.44,0,0,1,.57-1.86,16.06,16.06,0,1,0,9.93,9.93Z", "class": "clr-i-solid--badged clr-i-solid-path-3--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-solid--badged clr-i-solid-path-4--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = WorldSolidBadged;