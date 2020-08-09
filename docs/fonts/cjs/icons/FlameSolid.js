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
var FlameSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "flame-solid"), mithril_1.default("path", { "d": "M31.3,16.32c-1.19-2.09-7.94-14.15-7.94-14.15a1,1,0,0,0-1.75,0l-6,10.64-3-5.28a1,1,0,0,0-1.75,0S5.4,17.43,4.42,19.15A9.3,9.3,0,0,0,3,24.26c0,5.11,3.88,9.65,8.67,9.74H22.48C28.28,34,33,28.62,33,22.44A11.13,11.13,0,0,0,31.3,16.32ZM21.48,32H14.54A4.68,4.68,0,0,1,10,27.41a3.91,3.91,0,0,1,.75-2.34l3.35-5.21a.5.5,0,0,1,.84,0l1.78,2.77,0-.08c.63-1.11,4.23-7.48,4.23-7.48a.5.5,0,0,1,.87,0s3.6,6.38,4.23,7.48A5.83,5.83,0,0,1,27,25.76C27,32,22.1,32,21.48,32Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FlameSolid;