(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("Models.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _markdownIt = _interopRequireDefault(require("markdown-it"));

var _markdownItHighlightjs = _interopRequireDefault(require("markdown-it-highlightjs"));

var _markdownItEmoji = _interopRequireDefault(require("markdown-it-emoji"));

var _markdownItSub = _interopRequireDefault(require("markdown-it-sub"));

var _markdownItSup = _interopRequireDefault(require("markdown-it-sup"));

var _markdownItIns = _interopRequireDefault(require("markdown-it-ins"));

var _markdownItFootnote = _interopRequireDefault(require("markdown-it-footnote"));

var _markdownItDeflist = _interopRequireDefault(require("markdown-it-deflist"));

var _markdownItAbbr = _interopRequireDefault(require("markdown-it-abbr"));

var _markdownItSmartarrows = _interopRequireDefault(require("markdown-it-smartarrows"));

var _highlight = _interopRequireDefault(require("highlight.js"));

var _javascript = _interopRequireDefault(require("highlight.js/lib/languages/javascript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import imsize from "markdown-it-imsize"
// import printJS from "print-js"
_highlight.default.registerLanguage("javascript", _javascript.default);

var markup = new _markdownIt.default({
  html: true,
  // Enable HTML tags in source
  xhtmlOut: true,
  // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: true,
  // Convert '\n' in paragraphs into <br>
  langPrefix: "",
  // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  linkify: true,
  // Autoconvert URL-like text to links
  // Enable some language-neutral replacement + quotes beautification
  typographer: true,
  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: "“”‘’" // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  // highlight: (str, language) => ,

}).use(_markdownItHighlightjs.default, {
  hljs: _highlight.default
}).use(_markdownItEmoji.default).use(_markdownItSub.default).use(_markdownItSup.default).use(_markdownItIns.default).use(_markdownItFootnote.default).use(_markdownItDeflist.default).use(_markdownItAbbr.default) // .use(imsize, { autofill: true })
.use(_markdownItSmartarrows.default);
var SlideModel = {
  title: "",
  contents: "",
  order: 0,
  presentation_id: ""
};
var Slides = [];
var Presentations = [];
var SlideShowStruct = {
  keys: new Set(),
  values: {},
  items: Stream([])
};
var CurrentPresentation = {
  title: "",
  id: "",
  slideShow: [],
  Slides: Slides
};

var getProfile = function getProfile(w) {
  if (w < 668) return "phone";
  if (w < 920) return "tablet";
  return "desktop";
};

var caputerScreen = function caputerScreen() {
  var w = window.open();
  var c = document.cloneNode(document);
  var card = c.getElementById("slidecard");
  var styles = card.stylesheet;
  w.document.body.appendChild(card);
  w.document.body.style = styles;
  w.print();
  w.close();
};

var Models = {
  caputerScreen: caputerScreen,
  markup: markup,
  profile: getProfile(window.innerWidth),
  SlideShowStruct: SlideShowStruct,
  Presentations: Presentations,
  CurrentPresentation: CurrentPresentation,
  SlideModel: SlideModel,
  modals: {
    presentations: false,
    slides: false,
    auth: false
  },
  toggleModal: function toggleModal(mdl, modal) {
    return mdl.modals[modal] = !mdl.modals[modal];
  },
  code: null,
  isLoggedIn: false
};
var _default = Models;
exports.default = _default;
});

;require.register("components/index.js", function(exports, require, module) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = exports.Loader = exports.Layout = void 0;

var _Layout = _interopRequireWildcard(require("./layout.js"));

exports.Layout = _Layout;

var _Loader = _interopRequireWildcard(require("./loader.js"));

exports.Loader = _Loader;

var _Modal = _interopRequireWildcard(require("./modal.js"));

exports.Modal = _Modal;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
});

;require.register("components/layout.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _toolbar = _interopRequireDefault(require("./toolbar.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = {
  view: function view(_ref) {
    var children = _ref.children,
        mdl = _ref.attrs.mdl;
    return m(".container", m(_toolbar.default, {
      mdl: mdl
    }), children);
  }
};
exports.Layout = Layout;
});

;require.register("components/loader.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = void 0;

var Loader = function Loader() {
  return m(".lds-roller", [m("."), m("."), m("."), m("."), m("."), m("."), m("."), m(".")]);
};

exports.Loader = Loader;
});

;require.register("components/modal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var isActive = function isActive(mdl, id) {
  return mdl.modals[id] ? "active" : "";
};

var Modal = function Modal(_ref) {
  var mdl = _ref.attrs.mdl;
  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          id = _ref2$attrs.id,
          modalTitle = _ref2$attrs.modalTitle,
          modalContent = _ref2$attrs.modalContent,
          modalFooter = _ref2$attrs.modalFooter,
          onremove = _ref2$attrs.onremove;
      return mdl.modals[id] && m(".modal.".concat(isActive(mdl, id), "[id=").concat(id, "]"), {
        onremove: onremove
      }, m("a.modal-overlay[href='#'][aria-label='Close']", {
        onclick: function onclick() {
          return mdl.toggleModal(mdl, id);
        }
      }), m(".modal-container", [m(".modal-header", [m("button.btn.btn-clear.float-right[aria-label='Close']", {
        onclick: function onclick() {
          return mdl.toggleModal(mdl, id);
        }
      }), m(".modal-title.h5", modalTitle)]), m(".modal-body", m(".content", modalContent)), m(".modal-footer", modalFooter)]));
    }
  };
};

exports.Modal = Modal;
});

;require.register("components/toolbar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _utils = require("utils");

var _Tasks = _interopRequireDefault(require("utils/Tasks.js"));

var _modal = require("./modal.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthModal = function AuthModal(_ref) {
  var mdl = _ref.attrs.mdl;
  var state = {
    code: ""
  };

  var verifyCode = function verifyCode(state) {
    return function (e) {
      if ((0, _utils.secure)(state.code) === mdl.code) {
        mdl.isLoggedIn = true;
        mdl.toggleModal(mdl, "auth");
        sessionStorage.setItem("code", true);
      }
    };
  };

  return {
    oninit: function oninit() {
      _Tasks.default.postTask("https://ancient-headland-12919.herokuapp.com/auth")().fork((0, _utils.log)("e"), function (code) {
        return mdl.code = code;
      });
    },
    view: function view() {
      return m(_modal.Modal, {
        mdl: mdl,
        id: "auth",
        modalTitle: "Verify Code",
        modalContent: m("input.modal-input", {
          value: state.code,
          autofocus: true,
          type: "text",
          onkeyup: function onkeyup(e) {
            return state.code = e.target.value;
          }
        }),
        modalFooter: m("button.card-btn", {
          onclick: verifyCode(state)
        }, "Login")
      });
    }
  };
};

var login = function login(mdl) {
  return mdl.isLoggedIn ? m("a.btn.btn-link", {
    onclick: function onclick() {
      mdl.isLoggedIn = false;
      sessionStorage.removeItem("code");
    }
  }, "Logout") : m("a.btn.btn-link", {
    onclick: function onclick() {
      mdl.toggleModal(mdl, "auth");
    }
  }, "Login");
};

var toggleModalSwitch = function toggleModalSwitch(mdl) {
  return mdl.isLoggedIn && m("a.btn.btn-link", {
    onclick: function onclick() {
      var route = m.route.get().split("/");
      var context = route[route.length - 1];
      mdl.toggleModal(mdl, context);
    }
  }, "Add New");
};

var toPresentations = [m(m.route.Link, {
  selector: "a",
  class: "btn btn-link",
  href: "/presentations"
}, "Presentations")];

var toSlides = function toSlides(mdl) {
  return [mdl.isLoggedIn && m(m.route.Link, {
    selector: "a",
    class: "btn btn-link",
    href: "/presentation/".concat(mdl.CurrentPresentation.id, "/slides")
  }, "slides")];
};

var toSlideShow = function toSlideShow(mdl) {
  return mdl.CurrentPresentation && !(0, _ramda.isEmpty)(mdl.CurrentPresentation.slideShow) && m(m.route.Link, {
    selector: "a",
    class: "btn btn-link",
    href: "/slideshow/".concat(mdl.CurrentPresentation.id)
  }, "Slide Show");
};

var printToPDF = function printToPDF(mdl) {
  return m(m.route.Link, {
    selector: "a",
    class: "btn btn-link",
    onclick: function onclick(e) {
      e.preventDefault();
      mdl.caputerScreen();
    }
  }, "Print Slide");
};

var navView = function navView(mdl) {
  var page = (0, _ramda.view)((0, _ramda.lensProp)(1), (0, _ramda.split)("/", m.route.get()));

  switch (page) {
    case "presentation":
      return [toPresentations, toSlideShow(mdl)];
      break;

    case "slideshow":
      return [toPresentations, toSlides(mdl)];
      break;

    case "slides":
      return [toPresentations, toSlideShow(mdl)];
      break;

    case "edit":
      return [toPresentations, toSlides(mdl), toSlideShow(mdl)];
      break;

    default:
  }
};

var actionView = function actionView(mdl) {
  var page = (0, _ramda.view)((0, _ramda.lensProp)(1), (0, _ramda.split)("/", m.route.get()));

  switch (page) {
    case "presentations":
      return [login(mdl), toggleModalSwitch(mdl)];
      break;

    case "presentation":
      return [login(mdl), toggleModalSwitch(mdl)];
      break;

    case "slideshow":
      return [login(mdl), printToPDF(mdl)];
      break;

    default:
  }
};

var Toolbar = function Toolbar(_ref2) {
  var mdl = _ref2.attrs.mdl;
  return {
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return m(".navbar", m(".navbar-section", navView(mdl)), m(".navbar-section", actionView(mdl)), mdl.modals.auth && m(AuthModal, {
        mdl: mdl
      }));
    }
  };
};

var _default = Toolbar;
exports.default = _default;
});

;require.register("editor/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = require("./model.js");

var _components = _interopRequireDefault(require("components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = {
  view: function view(_ref) {
    var _ref$attrs = _ref.attrs,
        action = _ref$attrs.action,
        label = _ref$attrs.label;
    return m("button.card-btn", {
      onclick: action
    }, label);
  }
};

var Editor = function Editor(_ref2) {
  var mdl = _ref2.attrs.mdl;
  var state = {
    presentationId: "",
    slide: {
      title: "",
      content: "",
      id: ""
    }
  };

  var toSlides = function toSlides(_) {
    return m.route.set("/presentation/".concat(state.presentationId, "/slides"));
  };

  var onError = function onError(error) {
    return log("error")(error);
  };

  var onSuccess = function onSuccess(slide) {
    state.slide = slide;
  };

  var getSlide = function getSlide() {
    state.slide.id = m.route.param("id");
    state.presentationId = m.route.param("pid");
    return (0, _model.loadSlide)(state.slide.id).fork(onError, onSuccess);
  };

  var updateInput = function updateInput(input) {
    return function (e) {
      return state.slide[input] = e.target.value;
    };
  };

  var save = function save(e) {
    e.preventDefault();
    (0, _model.editSlide)(state.slide).fork(onError, function () {
      return toSlides();
    });
  };

  return {
    oncreate: getSlide(),
    view: function view() {
      return m(".container.editor", [m(".editor-left", m(".card.follow", [m(".card-header", [m(".card-footer", [m(Button, {
        action: save,
        label: "Save"
      }), m(Button, {
        action: toSlides,
        label: "Cancel"
      })]), m("input.editor-input", {
        type: "text",
        placeholder: "Slide Title",
        oninput: updateInput("title"),
        value: state.slide.title
      })]), m("textarea.editor-text", {
        oninput: updateInput("content"),
        value: state.slide.content
      })])), m(".editor-right", m.trust(mdl.markup.render(state.slide.content || "")))]);
    }
  };
};

var _default = Editor;
exports.default = _default;
});

;require.register("editor/model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editSlide = exports.loadSlide = void 0;

var _utils = require("utils");

var _ramda = require("ramda");

var loadSlide = function loadSlide(id) {
  var q = "{ slide(where:{id:".concat(JSON.stringify(id), "}){\n              id content title\n            }\n          }");
  return (0, _utils.getQlTask)(q).map((0, _ramda.path)(["data", "slide"]));
};

exports.loadSlide = loadSlide;

var editSlide = function editSlide(_ref) {
  var id = _ref.id,
      title = _ref.title,
      content = _ref.content;
  var q = "mutation {\n            updateSlide(\n              data: {\n                title: ".concat(JSON.stringify(title), "\n                content: ").concat(JSON.stringify(content), "\n              }\n              where: {\n                id: ").concat(JSON.stringify(id), "\n              }) {\n                id\n                title\n              }\n        }");
  return (0, _utils.getQlTask)(q).map((0, _ramda.path)(["data", "updatePresentation", "Slides"]));
};

exports.editSlide = editSlide;
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _layout = require("./components/layout.js");

var _component = _interopRequireDefault(require("./presentations/component.js"));

var _component2 = _interopRequireDefault(require("./slides/component.js"));

var _component3 = _interopRequireDefault(require("./editor/component.js"));

var _component4 = _interopRequireDefault(require("./slideshow/component.js"));

var _Models = _interopRequireDefault(require("./Models.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = document.body;

if (sessionStorage.getItem("code")) {
  _Models.default.isLoggedIn = true;
}

var makeRoutes = function makeRoutes(mdl) {
  return {
    "/presentations": {
      onmatch: function onmatch() {
        mdl.CurrentPresentation = {
          title: "",
          id: "",
          slideShow: [],
          Slides: []
        };
      },
      render: function render() {
        return m(_layout.Layout, {
          mdl: mdl
        }, m(_component.default, {
          mdl: mdl
        }));
      }
    },
    "/presentation/:id/slides": {
      onmatch: function onmatch() {
        return mdl.isLoggedIn || m.route.set(m.route.get());
      },
      render: function render() {
        return m(_layout.Layout, {
          mdl: mdl
        }, m(_component2.default, {
          mdl: mdl
        }));
      }
    },
    "/edit/:pid/slide/:id": {
      onmatch: function onmatch() {
        return mdl.isLoggedIn || m.route.set(m.route.get());
      },
      render: function render() {
        return m(_layout.Layout, {
          mdl: mdl
        }, m(_component3.default, {
          mdl: mdl
        }));
      }
    },
    "/slideshow/:id": {
      render: function render() {
        return m(_layout.Layout, {
          mdl: mdl
        }, m(_component4.default, {
          mdl: mdl
        }));
      }
    }
  };
};

m.route(root, "/presentations", makeRoutes(_Models.default));
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  return require("./index.js");
});
});

;require.register("presentations/Presentation/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("utils");

var _ramda = require("ramda");

var _model = require("../model.js");

var _data = _interopRequireDefault(require("data.task"));

var _index = require("@mithril-icons/clarity/cjs/index");

var _model2 = require("./model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Presentation = function Presentation(_ref) {
  var mdl = _ref.attrs.mdl;

  var getSlidesAndStartSlideShow = function getSlidesAndStartSlideShow(id) {
    var onSuccess = function onSuccess(slides) {
      mdl.CurrentPresentation = slides;
      mdl.CurrentPresentation.slideShow = mdl.CurrentPresentation.Slides.filter(function (p) {
        return p.order > 0;
      }).sort(function (a, b) {
        return a.order - b.order;
      });
      m.route.set("/slideshow/".concat(id));
    };

    var onError = (0, _utils.log)("e");
    (0, _model2.loadSlides)(id).fork(onError, onSuccess);
  };

  var onError = function onError(task) {
    return function (error) {
      return (0, _utils.log)("error with ".concat(task, ": "))(error);
    };
  };

  var onSuccess = function onSuccess(models) {
    return function (deleted) {
      return models.Presentations = (0, _ramda.without)([deleted], models.Presentations);
    };
  };

  var authDeleteTask = function authDeleteTask(id) {
    return window.confirm("Are you sure you want to delete?") ? _data.default.of(id) : _data.default.rejected("user denied req");
  };

  var removePresTask = function removePresTask(pId) {
    return authDeleteTask(pId).chain(_model.deletePresentationsTask).fork(onError("deleting"), onSuccess(mdl));
  };

  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          title = _ref2$attrs.title,
          id = _ref2$attrs.id,
          mdl = _ref2$attrs.mdl;
      return m(".card.column.col-3", {
        style: {
          margin: "10px"
        }
      }, m(".tile", {
        style: {
          height: "100px"
        }
      }, m(".tile-content", title), m(".tile-action", {
        style: {
          position: "relative"
        }
      }, m(_index.PlayLine, {
        class: "clarity",
        onclick: function onclick() {
          return getSlidesAndStartSlideShow(id);
        }
      }), mdl.isLoggedIn && [m(_index.EditLine, {
        class: "clarity",
        onclick: function onclick() {
          return m.route.set("/presentation/".concat(id, "/slides"));
        }
      }), m(_index.RemoveLine, {
        class: "clarity",
        onclick: function onclick(e) {
          e.stopPropagation();
          removePresTask(id);
        }
      })])));
    }
  };
};

var _default = Presentation;
exports.default = _default;
});

;require.register("presentations/Presentation/model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSlides = void 0;

var _ramda = require("ramda");

var _utils = require("utils");

var loadSlides = function loadSlides(id) {
  return (0, _utils.getQlTask)("{ presentation(where:{id:".concat(JSON.stringify(id), "}){\n    id, title, Slides { id title content order }\n  } }")).map((0, _ramda.path)(["data", "presentation"]));
};

exports.loadSlides = loadSlides;
});

;require.register("presentations/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _utils = require("utils");

var _presentationModal = _interopRequireDefault(require("./presentationModal.js"));

var _component = _interopRequireDefault(require("./Presentation/component.js"));

var _model = require("./model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Presentations = function Presentations() {
  var state = {
    errors: null,
    title: ""
  };

  var onError = function onError(error) {
    (0, _utils.log)("error")(error);
    state.error = error;
  };

  var onSuccess = function onSuccess(mdl) {
    return function (dto) {
      return mdl.Presentations = dto;
    };
  };

  var findPresentations = function findPresentations(_ref) {
    var mdl = _ref.attrs.mdl;
    return (0, _model.getPresentations)().fork(onError, onSuccess(mdl));
  };

  return {
    oninit: findPresentations,
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return [mdl.modals.presentations && m(_presentationModal.default, {
        onremove: function onremove() {
          state.title = "";
          state.errors = null;
        },
        mdl: mdl,
        state: state,
        presentations: mdl.Presentations,
        presentationModel: (0, _ramda.clone)(mdl.PresentationModel)
      }), m(".container.columns", {
        oncreate: function oncreate(_ref3) {
          var dom = _ref3.dom;
          return (0, _utils.animateFadeIn)({
            dom: dom
          });
        },
        onBeforeRemove: function onBeforeRemove(vnode, done) {
          vnode.dom.addEventListener("animationend", done);
          vnode.dom.style.animation = "fadeOut 1s";
        }
      }, [mdl.Presentations && mdl.Presentations.map(function (_ref4) {
        var title = _ref4.title,
            id = _ref4.id;
        return m(_component.default, {
          key: id,
          id: id,
          title: title,
          mdl: mdl
        });
      })])];
    }
  };
};

var _default = Presentations;
exports.default = _default;
});

;require.register("presentations/model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePresentationsTask = exports.savePresentationTask = exports.getPresentations = void 0;

var _utils = require("utils");

var _ramda = require("ramda");

var toViewModel = function toViewModel(_ref) {
  var data = _ref.data,
      errors = _ref.errors;
  (0, _utils.log)("errors")(errors);
  return {
    data: data,
    errors: errors
  };
};

var getPresentations = function getPresentations() {
  return (0, _utils.getQlTask)("query {\n  presentations{ id, title}\n}").map((0, _ramda.path)(["data", "presentations"]));
};

exports.getPresentations = getPresentations;

var savePresentationTask = function savePresentationTask(state) {
  var q = "mutation {\n    createPresentation(data: {title: ".concat(JSON.stringify(state.title), "})\n    { title id}\n  }");
  return (0, _utils.getQlTask)(q).map((0, _ramda.path)(["data", "createPresentation"]));
};

exports.savePresentationTask = savePresentationTask;

var deletePresentationsTask = function deletePresentationsTask(id) {
  var q = "mutation {\n    deletePresentation(where: {id: ".concat(JSON.stringify(id), "})\n    { title id}\n  }");
  return (0, _utils.getQlTask)(q).map((0, _ramda.path)(["data", "deletePresentation"]));
};

exports.deletePresentationsTask = deletePresentationsTask;
});

;require.register("presentations/presentationModal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = require("./model.js");

var _utils = require("utils");

var _modal = require("components/modal");

var PresentationModal = function PresentationModal(_ref) {
  var _ref$attrs = _ref.attrs,
      state = _ref$attrs.state,
      mdl = _ref$attrs.mdl,
      presentations = _ref$attrs.presentations,
      onremove = _ref$attrs.onremove;

  var onError = function onError(errors) {
    (0, _utils.log)("error")(errors);
    state.errors = errors;
    toggleModal();
  };

  var onSuccess = function onSuccess(p) {
    state.title = "";
    state.errors = null;
    presentations.push(p);
    mdl.toggleModal(mdl, "presentations");
  };

  var save = function save(e) {
    e.preventDefault();
    (0, _model.savePresentationTask)(state).fork(onError, onSuccess);
  };

  return {
    view: function view() {
      return m(_modal.Modal, {
        onremove: onremove,
        mdl: mdl,
        id: "presentations",
        modalTitle: "New Presentation",
        modalContent: m("input", {
          value: state.title,
          autofocus: true,
          type: "text",
          onkeyup: function onkeyup(e) {
            return state.title = e.target.value;
          }
        }),
        modalFooter: m("button.card-btn", {
          onclick: save
        }, "create presentation")
      });
    }
  };
};

var _default = PresentationModal;
exports.default = _default;
});

;require.register("slides/Preview/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _utils = require("utils");

var _model = require("../model.js");

var _cjs = require("@mithril-icons/clarity/cjs");

var SlidePosition = function SlidePosition(_ref) {
  var update = _ref.attrs.update;

  var updateSlidesPosition = function updateSlidesPosition(dir, slides, slide) {
    switch (dir) {
      case "left":
        var prevSlide = slides.filter(function (x) {
          return x.order == slide.order - 1;
        })[0];
        prevSlide.order++;
        slide.order--;
        update([prevSlide, slide]);
        break;

      case "right":
        var nextSlide = slides.filter(function (x) {
          return x.order == slide.order + 1;
        })[0];
        slide.order++;
        nextSlide.order--;
        update([nextSlide, slide]);
        break;
    }
  };

  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          slides = _ref2$attrs.slides,
          slide = _ref2$attrs.slide,
          dir = _ref2$attrs.dir;
      return m("button.s-circle", {
        disabled: dir == "right" && slide.order == slides.length || dir == "left" && slide.order == 1,
        onclick: function onclick() {
          return updateSlidesPosition(dir, slides, slide);
        }
      }, m("i.icon icon-arrow-".concat(dir)));
    }
  };
};

var Preview = function Preview(_ref3) {
  var _ref3$attrs = _ref3.attrs,
      getSlides = _ref3$attrs.getSlides,
      mdl = _ref3$attrs.mdl,
      s = _ref3$attrs.s,
      key = _ref3$attrs.key,
      state = _ref3$attrs.state;

  var onError = function onError(task) {
    return function (error) {
      return (0, _utils.log)("error with ".concat(task))(error);
    };
  };

  var onSuccess = function onSuccess(_) {
    return getSlides({
      attrs: {
        mdl: mdl
      }
    });
  };

  var updateAndSaveSlideTask = function updateAndSaveSlideTask(slides) {
    return (0, _model.updateSlideTask)(mdl.CurrentPresentation.id)(slides).fork(onError("updating"), onSuccess);
  };

  var removeSlideTask = function removeSlideTask(s) {
    var tail = (0, _ramda.compose)((0, _ramda.map)(_model.reduceOrder), (0, _ramda.filter)((0, _model.forGreater)(s)))(state.right());
    var removeSlide = (0, _model.updateRemoveSlide)(s);
    var updateList = (0, _ramda.concat)(removeSlide, tail);
    updateAndSaveSlideTask(updateList);
  };

  var handleDragStart = function handleDragStart(ev) {
    ev.target.style.opacity = "0.4";
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("text/plain", "preview");
    state.previewDrag.drag = (0, _ramda.head)((0, _ramda.filter)((0, _ramda.propEq)("id", s.id), state.right()));
  };

  var handleDragOver = function handleDragOver(ev) {
    ev.preventDefault();
    if (state.previewDrag.drag) state.previewDrag.drop = s;
  };

  var handleDragLeave = function handleDragLeave(ev) {
    ev.preventDefault();
    state.previewDrag.drop = null;
  };

  var handleDrop = function handleDrop(ev) {
    return ev.preventDefault();
  };

  var handleDragEnd = function handleDragEnd(ev) {
    ev.target.style.opacity = "1";
    state.slideDrag.dragging = false;

    if (state.previewDrag.drop) {
      var start = state.previewDrag.drag.order;
      var end = state.previewDrag.drop.order;
      var dragged = state.previewDrag.drag;
      var dropped = state.previewDrag.drop;
      state.previewDrag.drag = mdl.SlideModel;
      state.previewDrag.drop = mdl.SlideModel;

      if (!(0, _ramda.eqProps)("id", dragged, dropped)) {
        dragged.order = end;
        dropped.order = start;
        updateAndSaveSlideTask([dragged, dropped]);
      }
    }
  };

  return {
    oncreate: function oncreate(_ref4) {
      var dom = _ref4.dom;
      return (0, _utils.animateFadeIn)({
        dom: dom
      });
    },
    view: function view(_ref5) {
      var _ref5$attrs = _ref5.attrs,
          mdl = _ref5$attrs.mdl,
          s = _ref5$attrs.s,
          state = _ref5$attrs.state;
      return m(".card.preview", {
        draggable: mdl.isLoggedIn,
        ondragstart: handleDragStart,
        ondragend: handleDragEnd,
        ondragover: handleDragOver,
        ondrop: handleDrop,
        ondragleave: handleDragLeave,
        style: {
          position: "relative",
          opacity: state.previewDrag.drop && state.previewDrag.drop.id == s.id ? 0.4 : 1
        }
      }, [m(".card-header", [m("p.slidePosition", s.order), mdl.isLoggedIn && m(_cjs.RemoveLine, {
        class: "clarity",
        style: {
          position: "absolute",
          top: 0,
          right: 0
        },
        onclick: function onclick() {
          return removeSlideTask(s);
        }
      })]), m("p.slidePosition", s.title), // m(".card-body", m.trust(mdl.markup.render(s.content || ""))),
      mdl.isLoggedIn && m(".card-footer", [m(SlidePosition, {
        slides: state.right(),
        dir: "left",
        slide: s,
        update: updateAndSaveSlideTask
      }), m(_cjs.EditLine, {
        class: "clarity",
        style: {
          position: "absolute",
          top: 35,
          right: 0
        },
        onclick: function onclick() {
          m.route.set("/edit/".concat(mdl.CurrentPresentation.id, "/slide/").concat(s.id));
        }
      }), m(SlidePosition, {
        slides: state.right(),
        dir: "right",
        slide: s,
        update: updateAndSaveSlideTask
      })])]);
    }
  };
};

var _default = Preview;
exports.default = _default;
});

;require.register("slides/Slide/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _utils = require("utils");

var _ramda = require("ramda");

var _model = require("../model.js");

var _cjs = require("@mithril-icons/clarity/cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slide = function Slide(_ref) {
  var _ref$attrs = _ref.attrs,
      getSlides = _ref$attrs.getSlides,
      mdl = _ref$attrs.mdl,
      s = _ref$attrs.s,
      key = _ref$attrs.key,
      state = _ref$attrs.state;

  var onError = function onError(task) {
    return function (error) {
      return (0, _utils.log)("error with ".concat(task))(error);
    };
  };

  var onSuccess = function onSuccess(_) {
    return getSlides({
      attrs: {
        mdl: mdl
      }
    });
  };

  var authDeleteTask = function authDeleteTask(id) {
    return window.confirm("Are you sure you want to delete?") ? _data.default.of(id) : _data.default.rejected(id);
  };

  var removeSlideTask = function removeSlideTask(id) {
    return authDeleteTask(id).chain((0, _model.deleteSlideTask)(state.presentationId)).fork(onError("deleting"), onSuccess);
  };

  var addSlideToShow = function addSlideToShow(s) {
    (0, _model.updateSlideTask)(state.presentationId)([s]).fork(onError("updating"), function (_) {
      state.slideDrag = {
        dragId: "",
        dragging: false,
        droppable: false
      };
      onSuccess();
    });
  };

  var handleDragStart = function handleDragStart(ev) {
    ev.target.style.opacity = "0.4";
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("text/plain", "slide");
    state.slideDrag = (0, _model.updateSlideDragStart)(s)(state.slideDrag);
  };

  var handleDragEnd = function handleDragEnd(ev) {
    ev.target.style.opacity = "1";

    if (state.slideDrag.droppable) {
      var _slide = (0, _model.updateSlideDragEnd)(state.right().length)(s);

      (0, _model.updateStateDragEnd)(state.slideDrag);
      return addSlideToShow(_slide);
    }
  };

  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          s = _ref2$attrs.s,
          state = _ref2$attrs.state,
          mdl = _ref2$attrs.mdl;
      return m(".card", {
        id: s.id,
        draggable: mdl.isLoggedIn,
        ondragstart: handleDragStart,
        ondragend: handleDragEnd
      }, [m("div.card-header", [m("h1.title", m("span", (0, _ramda.take)(15, s.title)))]), mdl.isLoggedIn && m(".card-footer", m(_cjs.RemoveLine, {
        class: "clarity",
        onclick: function onclick() {
          return removeSlideTask(s.id);
        }
      }), m(_cjs.EditLine, {
        class: "clarity",
        onclick: function onclick() {
          return m.route.set("/edit/".concat(state.presentationId, "/slide/").concat(s.id));
        }
      }))]);
    }
  };
};

var _default = Slide;
exports.default = _default;
});

;require.register("slides/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _slidesModal = _interopRequireDefault(require("./slidesModal.js"));

var _component = _interopRequireDefault(require("./Slide/component.js"));

var _component2 = _interopRequireDefault(require("./Preview/component.js"));

var _model = require("./model.js");

var _utils = require("utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slides = function Slides(_ref) {
  var mdl = _ref.attrs.mdl;
  var state = {
    left: Stream([]),
    right: Stream([]),
    slideDrag: {
      dragId: "",
      dragging: false,
      droppable: false
    },
    previewDrag: {
      drag: null,
      drop: null
    },
    presentationId: ""
  };
  var onError = (0, _utils.log)("error");

  var onSuccess = function onSuccess() {
    var slides = mdl.CurrentPresentation.Slides;
    state.left((0, _ramda.filter)((0, _ramda.propEq)("order", 0), slides));
    state.right((0, _ramda.sortBy)((0, _ramda.prop)("order"), (0, _ramda.without)(state.left(), slides)));
    mdl.CurrentPresentation.slideShow = state.right();
  };

  var getSlides = function getSlides(_ref2) {
    var mdl = _ref2.attrs.mdl;
    state.presentationId = m.route.param("id");
    return (0, _model.loadSlides)(state.presentationId)(mdl).fork(onError, onSuccess);
  };

  var handleDragEnter = function handleDragEnter(ev) {
    ev.preventDefault();
    state.bColor = true;
  };

  var handleDragLeave = function handleDragLeave(ev) {
    ev.preventDefault();
    state.slideDrag.dragging = false;
    state.slideDrag.droppable = false;
    state.bColor = false;
  };

  var handleDrop = function handleDrop(ev) {
    ev.preventDefault();
    var type = ev.dataTransfer.getData("text/plain");

    if (state.slideDrag.dragging) {
      if (type == "slide") {
        var item = (0, _ramda.head)((0, _ramda.filter)((0, _ramda.propEq)("id", state.slideDrag.dragId), state.left()));
        state.slideDrag.droppable = true;
        item.order = state.right().length + 1;
        state.left((0, _ramda.without)([item], state.left()));
        state.right((0, _ramda.concat)(state.right(), [item]));
      } else {
        var _item = (0, _ramda.head)((0, _ramda.filter)((0, _ramda.propEq)("id", state.slideDrag.dragId), state.right()));
      }
    }
  };

  var handleDragOver = function handleDragOver(ev) {
    ev.preventDefault();
    var type = ev.dataTransfer.getData("text/plain");
    state.slideDrag.dragging = true;
    ev.dataTransfer.dropEffect = "move";
  };

  return {
    oninit: getSlides,
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return [mdl.toggleModal ? m(_slidesModal.default, {
        slide: (0, _ramda.clone)(mdl.SlideModel),
        getSlides: getSlides,
        mdl: mdl,
        pId: state.presentationId
      }) : "", m(".container.slides", [m("aside.left-drag ".concat(state.left().length == 0 ? ".isDragging" : ""), {
        style: {
          overflowY: "auto"
        },
        onBeforeRemove: function onBeforeRemove(vnode, done) {
          vnode.dom.addEventListener("animationend", done);
          vnode.dom.style.animation = "fadeOut 1s";
        }
      }, state.left().map(function (s) {
        return m(_component.default, {
          key: s.id,
          mdl: mdl,
          getSlides: getSlides,
          s: s,
          state: state
        });
      })), m("section.right-drag".concat(state.slideDrag.dragging ? ".isDragging" : ""), {
        style: {
          height: "90vh",
          overflowY: "auto"
        },
        onBeforeRemove: function onBeforeRemove(vnode, done) {
          vnode.dom.addEventListener("animationend", done);
          vnode.dom.style.animation = "fadeOut 1s";
        },
        ondragleave: handleDragLeave,
        ondrop: handleDrop,
        ondragover: handleDragOver,
        ondragenter: handleDragEnter
      }, state.right().map(function (s) {
        return m(_component2.default, {
          key: s.id,
          mdl: mdl,
          getSlides: getSlides,
          s: s,
          state: state
        });
      }))])];
    }
  };
};

var _default = Slides;
exports.default = _default;
});

;require.register("slides/model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSlideTask = exports.deleteSlideTask = exports.saveSlideTask = exports.loadSlides = exports.updateStateDragEnd = exports.updateSlideDragEnd = exports.updateSlideDragStart = exports.updateRemoveSlide = exports.getId = exports.reduceOrder = exports.forLess = exports.forGreater = exports.toStruct = void 0;

var _utils = require("utils");

var _ramda = require("ramda");

var toViewModel = function toViewModel(model) {
  return function (presentations) {
    return model.CurrentPresentation = presentations;
  };
};

var toStruct = function toStruct(acc, item) {
  if (item.order > 0 && !acc.keys.has(item.id)) {
    item.order = acc.keys.size + 1;
    acc.keys.add(item.id);
    acc.values[item.order] = item;
    acc.items(Object.keys(acc.values));
    return acc;
  }

  return acc;
};

exports.toStruct = toStruct;

var orderOf = function orderOf(slide) {
  return (0, _ramda.prop)("order", slide);
};

var forGreater = function forGreater(removeSlide) {
  return function (checkSlide) {
    return (0, _ramda.lt)(orderOf(removeSlide), orderOf(checkSlide));
  };
};

exports.forGreater = forGreater;

var forLess = function forLess(removeSlide) {
  return function (checkSlide) {
    return (0, _ramda.gt)(orderOf(removeSlide), orderOf(checkSlide));
  };
};

exports.forLess = forLess;

var reduceOrder = function reduceOrder(slide) {
  return (0, _ramda.set)((0, _ramda.lensProp)("order", slide), (0, _ramda.subtract)(orderOf(slide), 1), slide);
};

exports.reduceOrder = reduceOrder;

var getId = function getId(item) {
  return (0, _ramda.prop)("id", item);
};

exports.getId = getId;

var resetOrder = function resetOrder(slide) {
  return (0, _ramda.set)((0, _ramda.lensProp)("order", slide), 0, slide);
};

var updateRemoveSlide = (0, _ramda.compose)(Array.of, resetOrder);
exports.updateRemoveSlide = updateRemoveSlide;

var updateId = function updateId(slide) {
  return function (slideDrag) {
    return (0, _ramda.set)((0, _ramda.lensProp)("dragId", slideDrag), (0, _ramda.prop)("id", slide), slideDrag);
  };
};

var updateSlideDragStart = function updateSlideDragStart(slide) {
  return (0, _ramda.compose)(updateId(slide), updateDrag);
};

exports.updateSlideDragStart = updateSlideDragStart;

var updateOrder = function updateOrder(length) {
  return function (slide) {
    return (0, _ramda.set)((0, _ramda.lensProp)("order"), length, slide);
  };
};

var updateSlideDragEnd = function updateSlideDragEnd(length) {
  return (0, _ramda.compose)(updateOrder(length));
};

exports.updateSlideDragEnd = updateSlideDragEnd;

var updateDrag = function updateDrag(state) {
  return (0, _ramda.set)((0, _ramda.lensProp)("dragging", false, state));
};

var updateDrop = function updateDrop(state) {
  return (0, _ramda.set)((0, _ramda.lensProp)("droppable", false, state));
};

var updateStateDragEnd = (0, _ramda.compose)(updateDrop, updateDrag);
exports.updateStateDragEnd = updateStateDragEnd;

var loadSlides = function loadSlides(id) {
  return function (model) {
    return (0, _utils.getQlTask)("{ presentation(where:{id:".concat(JSON.stringify(id), "}){\n      id, title, Slides { id title content order }\n    } }")).map((0, _ramda.path)(["data", "presentation"])).map(toViewModel(model));
  };
};

exports.loadSlides = loadSlides;

var saveSlideTask = function saveSlideTask(_ref) {
  var title = _ref.title,
      order = _ref.order,
      presentation_id = _ref.presentation_id;
  var q = "mutation {\n            updatePresentation(\n              where: {\n                id: ".concat(JSON.stringify(presentation_id), "\n              }\n              data: {\n                  Slides:{\n                    create : {\n                      title: ").concat(JSON.stringify(title), "\n                      content: \"\"\n                      order: ").concat(JSON.stringify(order), "\n                    }\n                  }\n          }){\n    id title Slides { id title content order }\n  } }");
  return (0, _utils.getQlTask)(q).map((0, _ramda.path)(["data", "updatePresentation", "Slides"]));
};

exports.saveSlideTask = saveSlideTask;

var deleteSlideTask = function deleteSlideTask(presentation_id) {
  return function (id) {
    var q = "mutation {\n            updatePresentation(\n              where: {\n                id: ".concat(JSON.stringify(presentation_id), "\n              }\n              data: {\n                  Slides:{\n                    delete : [{\n                      id: ").concat(JSON.stringify(id), "\n                    }]\n                  }\n          }){\n    id title Slides { id title content order}\n  } }");
    return (0, _utils.getQlTask)(q).map((0, _ramda.path)(["data", "updatePresentation", "Slides"]));
  };
};

exports.deleteSlideTask = deleteSlideTask;

var updateSlideTask = function updateSlideTask(presentation_id) {
  return function (slides) {
    var qlSlides = slides.map(function (slide) {
      return "{\n      where: {\n        id: ".concat(JSON.stringify(slide.id), "\n      }\n      data: {\n        order: ").concat(JSON.stringify(slide.order), "\n      }\n    }");
    });
    var q = "mutation {\n            updatePresentation(\n              where: {\n                id: ".concat(JSON.stringify(presentation_id), "\n              }\n              data: {\n                Slides:{\n                  update : [").concat(qlSlides, "]\n                }\n              }\n            )\n          { id title Slides { id title content order } }\n        }");
    return (0, _utils.getQlTask)(q).map((0, _ramda.path)(["data", "updatePresentation", "Slides"]));
  };
};

exports.updateSlideTask = updateSlideTask;
});

;require.register("slides/slidesModal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = require("ramda");

var _model = require("./model.js");

var _modal = require("components/modal");

var SlidesModal = function SlidesModal(_ref) {
  var _ref$attrs = _ref.attrs,
      pId = _ref$attrs.pId,
      slide = _ref$attrs.slide,
      getSlides = _ref$attrs.getSlides,
      mdl = _ref$attrs.mdl;
  var state = {
    errors: "",
    title: ""
  };

  var onError = function onError(errors) {
    log("error")(errors);
    state.errors = errors;
  };

  var onSuccess = function onSuccess() {
    getSlides({
      attrs: {
        mdl: mdl
      }
    });
    mdl.toggleModal(mdl, "slides");
  };

  var save = function save(e) {
    e.preventDefault();
    var dto = (0, _ramda.assoc)("presentation_id", pId, (0, _ramda.assoc)("title", state.title, slide));
    (0, _model.saveSlideTask)(dto).fork(onError, onSuccess);
  };

  return {
    view: function view() {
      return m(_modal.Modal, {
        onremove: function onremove() {
          state.title = "";
          state.errors = "";
        },
        mdl: mdl,
        id: "slides",
        modalTitle: "New Slide",
        modalContent: m("input", {
          value: state.title,
          autofocus: true,
          type: "text",
          onkeyup: function onkeyup(e) {
            return state.title = e.target.value;
          }
        }),
        modalFooter: m("button.card-btn", {
          onclick: save
        }, "add slide")
      });
    }
  };
};

var _default = SlidesModal;
exports.default = _default;
});

;require.register("slideshow/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mithril = _interopRequireDefault(require("mithril"));

var _ramda = require("ramda");

var _utils = require("utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ending = {
  view: function view() {
    return (0, _mithril.default)(".endingContainer", (0, _mithril.default)("h1.endingTitle", "THE END!"), (0, _mithril.default)("img.endingImg", {
      id: "ending",
      src: "https://imgur.com/uj15GJp.gif",
      width: "100%"
    }));
  }
};

var updateCursor = function updateCursor(state, pageX) {
  state.class = pageX / window.innerWidth * 100 > 50 ? "point-right" : "point-left";
};

var SlideShow = function SlideShow(_ref) {
  var mdl = _ref.attrs.mdl;
  if (!mdl.CurrentPresentation.id) _mithril.default.route.set("/presentations");
  var state = {
    update: false,
    key: undefined,
    current: 0,
    class: "",
    size: mdl.CurrentPresentation.slideShow.length || 0,
    contents: (0, _ramda.pluck)("content", mdl.CurrentPresentation.slideShow) || 0
  };

  var calcStatePosition = function calcStatePosition(x) {
    return x > window.innerWidth / 2 ? "right" : "left";
  };

  var updateStatePosition = function updateStatePosition(x, state) {
    return state.key = calcStatePosition(x) == "right" ? "ArrowRight" : "ArrowLeft";
  };

  var nextSlide = function nextSlide(target) {
    if (state.current == state.size - 1) {
      state.contents[state.current] = "";
    } else {
      state.current++;
    }

    return state;
  };

  var prevSlide = function prevSlide(target) {
    state.current == 0 ? state.current : state.current--;
  };

  var changeSlide = function changeSlide(key, target) {
    switch (key) {
      case "ArrowLeft":
        if (target.children) prevSlide(target);
        break;

      case "ArrowRight":
        if (target.children) nextSlide(target);
        break;

      case "ArrowUp":
        target.scrollBy(0, 100);
        break;

      case "ArrowDown":
        target.scrollBy(0, -100);
        break;
    }
  };

  return {
    dir: state.key,
    oninit: state.slide = state.contents[state.current],
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return (0, _mithril.default)(".slideshow#slideshow", {
        class: state.class,
        tabindex: 0,
        onkeyup: function onkeyup(_ref3) {
          var key = _ref3.key,
              target = _ref3.target;
          state.update = true;
          state.key = key;
          changeSlide(key, target);
        },
        onmousemove: function onmousemove(_ref4) {
          var pageX = _ref4.pageX;
          state.update = false;
          updateCursor(state, pageX);
        },
        onclick: function onclick(_ref5) {
          var x = _ref5.x,
              target = _ref5.target;
          state.update = true;
          updateStatePosition(x, state);
          return changeSlide(state.key, target);
        }
      }, (0, _mithril.default)(".slidecard#slidecard", {
        onbeforeupdate: function onbeforeupdate() {
          return !["ArrowUp", "ArrowDown"].includes(state.key) && state.update;
        },
        onupdate: function onupdate(_ref6) {
          var dom = _ref6.dom;
          dom.scrollIntoView({
            block: "start",
            inline: "start"
          });
          (0, _utils.animateEntranceRight)({
            dom: dom
          });
        }
      }, state.contents[state.current] ? _mithril.default.trust(mdl.markup.render(state.contents[state.current])) : (0, _mithril.default)(Ending)));
    }
  };
};

var _default = SlideShow;
exports.default = _default;
});

;require.register("utils/.secret.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secure = exports.onlineUrl = void 0;

var _sha = _interopRequireDefault(require("crypto-js/sha256"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onlineUrl = "https://eu1.prisma.sh/boaz-blake-8951e1/mithril-presenter/dev";
exports.onlineUrl = onlineUrl;

var secure = function secure(code) {
  return (0, _sha.default)(code).toString();
};

exports.secure = secure;
});

;require.register("utils/Tasks.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.postQl = void 0;

var _data = _interopRequireDefault(require("data.task"));

var _index = require("./index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postQl = function postQl(query) {
  return new _data.default(function (rej, res) {
    return m.request({
      method: "POST",
      url: "".concat(_index.onlineUrl),
      withCredentials: false,
      body: (0, _index.makeQuery)(query)
    }).then(res, rej);
  });
};

exports.postQl = postQl;

var postTask = function postTask(url) {
  return function (dto) {
    return new _data.default(function (rej, res) {
      return m.request({
        method: "POST",
        url: "".concat(url),
        body: dto,
        withCredentials: false
      }).then(res, rej);
    });
  };
};

var putTask = function putTask(url) {
  return function (_ref) {
    var dto = _ref.dto;
    return new _data.default(function (rej, res) {
      return m.request({
        method: "PUT",
        url: "".concat(_index.onlineUrl, "/").concat(url),
        body: dto,
        withCredentials: false
      }).then(res, rej);
    });
  };
};

var getTask = function getTask(url) {
  return new _data.default(function (rej, res) {
    return m.request({
      method: "GET",
      url: "".concat(_index.onlineUrl, "/").concat(url),
      withCredentials: false
    }).then(res, rej);
  });
};

var deleteTask = function deleteTask(url) {
  return function (id) {
    return new _data.default(function (rej, res) {
      return m.request({
        method: "DELETE",
        url: "".concat(_index.onlineUrl, "/").concat(url, "/").concat(id),
        withCredentials: false
      }).then(res, rej);
    });
  };
};

var _default = {
  postTask: postTask,
  putTask: putTask,
  getTask: getTask,
  deleteTask: deleteTask,
  postQl: postQl
};
exports.default = _default;
});

;require.register("utils/animations.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bounceEntrance = exports.animeEntrance = exports.animateFadeOut = exports.animateFadeIn = exports.animateExit = exports.animateChildEntrance = exports.animateEntranceRight = exports.animateSlideEntrance = void 0;

var _animejs = _interopRequireDefault(require("animejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var animateSlideEntrance = function animateSlideEntrance(_ref) {
  var dom = _ref.dom;
  return dom.animate([{
    transform: "translate3d(20%,0,0)",
    opacity: 0
  }, {
    transform: "none",
    opacity: 1
  }], {
    duration: 650
  });
};

exports.animateSlideEntrance = animateSlideEntrance;

var animateEntranceRight = function animateEntranceRight(_ref2) {
  var dom = _ref2.dom;
  return dom.animate([{
    animation: "",
    transform: "translate3d(100%,0,0)",
    scale: 2,
    opacity: 0
  }, {
    animation: "stretchRight 1s ease-in-out both",
    transform: "none",
    opacity: 1,
    scale: 1
  }], {
    duration: 350
  });
};

exports.animateEntranceRight = animateEntranceRight;

var animateChildEntrance = function animateChildEntrance(_ref3) {
  var dom = _ref3.dom;

  var children = _toConsumableArray(dom.children);

  return children.map(function (child, index) {
    setTimeout(function () {
      child.animate([{
        transform: "translate3d(0,-100%,0)",
        opacity: 0
      }, {
        transform: "none",
        opacity: 1
      }], {
        duration: 850
      });
    }, (index + 1) * 200);
  });
};

exports.animateChildEntrance = animateChildEntrance;

var animateExit = function animateExit(dom) {
  var children = _toConsumableArray(dom.children);

  var anim = animate([{
    transform: "none",
    opacity: 1
  }, {
    transform: "translate3d(25%,100%,0)",
    opacity: 0
  }]);
  var waapi = children.map(function (child) {
    return child.animate(anim, {
      duration: 850
    });
  });
  return new Promise(function (resolve) {
    waapi.onfinish = function (e) {
      resolve();
    };
  });
};

exports.animateExit = animateExit;

var animateFadeIn = function animateFadeIn(_ref4) {
  var dom = _ref4.dom;

  var children = _toConsumableArray(dom.children);

  children.map(function (child, index) {
    child.style.opacity = 0;
    child.style.transition = "opacity .4s ease-in-out";
    return setTimeout(function () {
      child.style.opacity = 1;
    }, (index + 1) * 200);
  });
};

exports.animateFadeIn = animateFadeIn;

var animateFadeOut = function animateFadeOut(_ref5) {
  var dom = _ref5.dom;
  var anim = [{
    transition: "opacity .4s ease-in-out"
  }, {
    transform: "none",
    opacity: 1
  }, {
    transform: "translate3d(25%,100%,0)",
    opacity: 0
  }];
  var waapi = dom.animate(anim, {
    duration: 850
  });
  return new Promise(function (resolve) {
    waapi.onfinish = function (e) {
      resolve();
    };
  });
};

exports.animateFadeOut = animateFadeOut;

var animeEntrance = function animeEntrance(_ref6) {
  var dom = _ref6.dom;

  var children = _toConsumableArray(dom.children);

  var res = children.map(function (el) {
    return (0, _animejs.default)({
      target: el,
      easing: "easeInQuad",
      translateX: 250,
      offset: 0
    });
  });
  return res;
};

exports.animeEntrance = animeEntrance;

var bounceEntrance = function bounceEntrance(_ref7) {
  var dom = _ref7.dom;
  return dom.animate({
    animation: "animation 1000ms linear both",
    keyframes: {
      "0%": {
        transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "3.4%": {
        transform: "matrix3d(1.316, 0, 0, 0, 0, 1.407, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "4.7%": {
        transform: "matrix3d(1.45, 0, 0, 0, 0, 1.599, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "6.81%": {
        transform: "matrix3d(1.659, 0, 0, 0, 0, 1.893, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "9.41%": {
        transform: "matrix3d(1.883, 0, 0, 0, 0, 2.168, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "10.21%": {
        transform: "matrix3d(1.942, 0, 0, 0, 0, 2.226, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "13.61%": {
        transform: "matrix3d(2.123, 0, 0, 0, 0, 2.332, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "14.11%": {
        transform: "matrix3d(2.141, 0, 0, 0, 0, 2.331, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "17.52%": {
        transform: "matrix3d(2.208, 0, 0, 0, 0, 2.239, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "18.72%": {
        transform: "matrix3d(2.212, 0, 0, 0, 0, 2.187, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "21.32%": {
        transform: "matrix3d(2.196, 0, 0, 0, 0, 2.069, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "24.32%": {
        transform: "matrix3d(2.151, 0, 0, 0, 0, 1.96, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "25.23%": {
        transform: "matrix3d(2.134, 0, 0, 0, 0, 1.938, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "29.03%": {
        transform: "matrix3d(2.063, 0, 0, 0, 0, 1.897, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "29.93%": {
        transform: "matrix3d(2.048, 0, 0, 0, 0, 1.899, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "35.54%": {
        transform: "matrix3d(1.979, 0, 0, 0, 0, 1.962, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "36.74%": {
        transform: "matrix3d(1.972, 0, 0, 0, 0, 1.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "41.04%": {
        transform: "matrix3d(1.961, 0, 0, 0, 0, 2.022, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "44.44%": {
        transform: "matrix3d(1.966, 0, 0, 0, 0, 2.032, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "52.15%": {
        transform: "matrix3d(1.991, 0, 0, 0, 0, 2.006, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "59.86%": {
        transform: "matrix3d(2.006, 0, 0, 0, 0, 1.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "63.26%": {
        transform: "matrix3d(2.007, 0, 0, 0, 0, 1.992, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "75.28%": {
        transform: "matrix3d(2.001, 0, 0, 0, 0, 2.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "85.49%": {
        transform: "matrix3d(1.999, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "90.69%": {
        transform: "matrix3d(1.999, 0, 0, 0, 0, 1.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      },
      "100%": {
        transform: "matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      }
    }
  });
};

exports.bounceEntrance = bounceEntrance;
});

;require.register("utils/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  viewModelMap: true,
  log: true,
  repeat: true,
  wait: true,
  makeQuery: true
};
exports.makeQuery = exports.wait = exports.repeat = exports.log = exports.viewModelMap = void 0;

var _animations = require("./animations.js");

Object.keys(_animations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _animations[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _animations[key];
    }
  });
});

var _requests = require("./requests.js");

Object.keys(_requests).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _requests[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _requests[key];
    }
  });
});

var _secret = require("./.secret.js");

Object.keys(_secret).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _secret[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _secret[key];
    }
  });
});

var _Tasks = require("./Tasks.js");

Object.keys(_Tasks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Tasks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Tasks[key];
    }
  });
});

var makeQuery = function makeQuery(string) {
  return JSON.parse(JSON.stringify(string));
};

exports.makeQuery = makeQuery;

var repeat = function repeat(n) {
  return function (f) {
    return function (x) {
      var m = n;

      while (true) {
        if (m === 0) return x;else m = m - 1, x = f(x);
      }
    };
  };
};

exports.repeat = repeat;

var wait = function wait(n) {
  return function (f) {
    return function (x) {
      var m = n;

      while (true) {
        if (m === 0) return x;else m = m - 1, x = f(x);
      }
    };
  };
};

exports.wait = wait;

var log = function log(m) {
  return function (v) {
    console.log(m, v);
    return v;
  };
};

exports.log = log;

var viewModelMap = function viewModelMap(signature) {
  var _map = {};
  return function (key) {
    if (!_map[key]) {
      _map[key] = {};

      for (var prop in signature) {
        _map[key][prop] = Stream(signature[prop]());
      }
    }

    return _map[key];
  };
};

exports.viewModelMap = viewModelMap;
});

;require.register("utils/requests.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSlideTask = exports.deleteSlideTask = exports.updateSlideTask = exports.saveSlideTask = exports.findSlidesTask = exports.deletePresentationsTask = exports.savePresentationTask = exports.getQlTask = exports.findPresentationsTask = void 0;

var _Tasks = _interopRequireDefault(require("./Tasks.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findPresentationsTask = function findPresentationsTask() {
  return _Tasks.default.getTask("presentations");
};

exports.findPresentationsTask = findPresentationsTask;

var getQlTask = function getQlTask(query) {
  return _Tasks.default.postQl({
    query: query
  });
};

exports.getQlTask = getQlTask;

var savePresentationTask = function savePresentationTask(dto) {
  return _Tasks.default.postTask("presentations")({
    dto: dto
  });
};

exports.savePresentationTask = savePresentationTask;

var deletePresentationsTask = function deletePresentationsTask(id) {
  return _Tasks.default.deleteTask("presentations")(id);
};

exports.deletePresentationsTask = deletePresentationsTask;

var findSlidesTask = function findSlidesTask(id) {
  return _Tasks.default.getTask("presentations/".concat(id, "/slides"));
};

exports.findSlidesTask = findSlidesTask;

var saveSlideTask = function saveSlideTask(dto) {
  return _Tasks.default.postTask("slides")({
    dto: dto
  });
};

exports.saveSlideTask = saveSlideTask;

var updateSlideTask = function updateSlideTask(id) {
  return function (dto) {
    return _Tasks.default.putTask("slides/".concat(id))({
      dto: dto
    });
  };
};

exports.updateSlideTask = updateSlideTask;

var deleteSlideTask = function deleteSlideTask(id) {
  return _Tasks.default.deleteTask("slides")(id);
};

exports.deleteSlideTask = deleteSlideTask;

var loadSlideTask = function loadSlideTask(id) {
  return _Tasks.default.getTask("slides/".concat(id));
};

exports.loadSlideTask = loadSlideTask;
});

;require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");
window.Stream = require("mithril-stream");
window.punycode = require("punycode");


});})();require('___globals___');

require('initialize.js');
//# sourceMappingURL=app.js.map