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
var ThermometerLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "thermometer-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M19,23.17V11.46H17V23.2a3,3,0,1,0,2,0Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M26,15a1,1,0,0,0,0-2H23.92V11H26a1,1,0,0,0,0-2H23.92V8a6,6,0,0,0-12,0V20.81a8,8,0,1,0,12-.2V19H26a1,1,0,0,0,0-2H23.92V15ZM24,26a6,6,0,1,1-10.36-4.12l.27-.29V8a4,4,0,0,1,8,0V21.44l.3.29A6,6,0,0,1,24,26Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ThermometerLine;