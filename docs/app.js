!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},n={},r={},o={}.hasOwnProperty,i=/^\.\.?(\/|$)/,a=function(e,t){for(var n,r=[],o=(i.test(t)?e+"/"+t:t).split("/"),a=0,s=o.length;a<s;a++)".."===(n=o[a])?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},d=function(t,r){var o,i={id:t,exports:{},hot:m&&m.createHot(t)};return n[t]=i,r(i.exports,(o=t,function(t){var n=a(s(o),t);return e.require(n,o)}),i),i.exports},u=function(e){var t=r[e];return t&&e!==t?u(t):e},l=function(e,r){null==r&&(r="/");var i=u(e);if(o.call(n,i))return n[i].exports;if(o.call(t,i))return d(i,t[i]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};l.alias=function(e,t){r[t]=e};var c=/\.[^.\/]+$/,f=/\/index(\.[^\/]+)?$/;l.register=l.define=function(e,i){if(e&&"object"==typeof e)for(var a in e)o.call(e,a)&&l.register(a,e[a]);else t[e]=i,delete n[e],function(e){if(c.test(e)){var t=e.replace(c,"");o.call(r,t)&&r[t].replace(c,"")!==t+"/index"||(r[t]=e)}if(f.test(e)){var n=e.replace(f,"");o.call(r,n)||(r[n]=e)}}(e)},l.list=function(){var e=[];for(var n in t)o.call(t,n)&&e.push(n);return e};var m=e._hmr&&new e._hmr((function(e,t){return u(a(s(e),t))}),l,t,n);l._cache=n,l.hmr=m&&m.wrap,l.brunch=!0,e.require=l}}(),function(){"undefined"==typeof window||window;require.register("Models.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=g(t("markdown-it")),o=g(t("markdown-it-highlightjs")),i=g(t("markdown-it-emoji")),a=g(t("markdown-it-sub")),s=g(t("markdown-it-sup")),d=g(t("markdown-it-ins")),u=g(t("markdown-it-footnote")),l=g(t("markdown-it-deflist")),c=g(t("markdown-it-abbr")),f=g(t("markdown-it-smartarrows")),m=g(t("highlight.js")),p=g(t("highlight.js/lib/languages/javascript"));function g(e){return e&&e.__esModule?e:{default:e}}m.default.registerLanguage("javascript",p.default);var v,y=new r.default({html:!0,xhtmlOut:!0,breaks:!0,langPrefix:"",linkify:!0,typographer:!0,quotes:"“”‘’"}).use(o.default,{hljs:m.default}).use(i.default).use(a.default).use(s.default).use(d.default).use(u.default).use(l.default).use(c.default).use(f.default),h={keys:new Set,values:{},items:Stream([])},w={title:"",id:"",slideShow:[],Slides:[]},k={caputerScreen:function(){var e=window.open(),t=document.cloneNode(document).getElementById("slidecard"),n=t.stylesheet;e.document.body.appendChild(t),e.document.body.style=n,e.print(),e.close()},markup:y,profile:(v=window.innerWidth,v<668?"phone":v<920?"tablet":"desktop"),SlideShowStruct:h,Presentations:[],CurrentPresentation:w,SlideModel:{title:"",contents:"",order:0,presentation_id:""},modals:{presentations:!1,slides:!1,auth:!1},toggleModal:function(e,t){return e.modals[t]=!e.modals[t]},code:null,isLoggedIn:!1};e.default=k})),require.register("components/index.js",(function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Modal=e.Loader=e.Layout=void 0;var o=d(t("./layout.js"));e.Layout=o;var i=d(t("./loader.js"));e.Loader=i;var a=d(t("./modal.js"));function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function d(e){if(e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var a=o?Object.getOwnPropertyDescriptor(e,i):null;a&&(a.get||a.set)?Object.defineProperty(n,i,a):n[i]=e[i]}return n.default=e,t&&t.set(e,n),n}e.Modal=a})),require.register("components/layout.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Layout=void 0;var r,o=(r=t("./toolbar.js"))&&r.__esModule?r:{default:r};var i={view:function(e){var t=e.children,n=e.attrs.mdl;return m(".container",m(o.default,{mdl:n}),t)}};e.Layout=i})),require.register("components/loader.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Loader=void 0;e.Loader=function(){return m(".lds-roller",[m("."),m("."),m("."),m("."),m("."),m("."),m("."),m(".")])}})),require.register("components/modal.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Modal=void 0;e.Modal=function(e){var t=e.attrs.mdl;return{view:function(e){var n=e.attrs,r=n.id,o=n.modalTitle,i=n.modalContent,a=n.modalFooter,s=n.onremove;return t.modals[r]&&m(".modal.".concat(function(e,t){return e.modals[t]?"active":""}(t,r),"[id=").concat(r,"]"),{onremove:s},m("a.modal-overlay[href='#'][aria-label='Close']",{onclick:function(){return t.toggleModal(t,r)}}),m(".modal-container",[m(".modal-header",[m("button.btn.btn-clear.float-right[aria-label='Close']",{onclick:function(){return t.toggleModal(t,r)}}),m(".modal-title.h5",o)]),m(".modal-body",m(".content",i)),m(".modal-footer",a)]))}}}})),require.register("components/toolbar.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r,o=t("ramda"),i=t("utils"),a=(r=t("utils/Tasks.js"))&&r.__esModule?r:{default:r},s=t("./modal.js");var d=function(e){var t=e.attrs.mdl,n={code:""},r=function(e){return function(n){(0,i.secure)(e.code)===t.code&&(t.isLoggedIn=!0,t.toggleModal(t,"auth"),sessionStorage.setItem("code",!0))}};return{oninit:function(){a.default.postTask("https://ancient-headland-12919.herokuapp.com/auth")().fork((0,i.log)("e"),(function(e){return t.code=e}))},view:function(){return m(s.Modal,{mdl:t,id:"auth",modalTitle:"Verify Code",modalContent:m("input.modal-input",{value:n.code,autofocus:!0,type:"text",onkeyup:function(e){return n.code=e.target.value}}),modalFooter:m("button.card-btn",{onclick:r(n)},"Login")})}}},u=function(e){return e.isLoggedIn?m("a.btn.btn-link",{onclick:function(){e.isLoggedIn=!1,sessionStorage.removeItem("code")}},"Logout"):m("a.btn.btn-link",{onclick:function(){e.toggleModal(e,"auth")}},"Login")},l=function(e){return e.isLoggedIn&&m("a.btn.btn-link",{onclick:function(){var t=m.route.get().split("/"),n=t[t.length-1];e.toggleModal(e,n)}},"Add New")},c=[m(m.route.Link,{selector:"a",class:"btn btn-link",href:"/presentations"},"Presentations")],f=function(e){return[e.isLoggedIn&&m(m.route.Link,{selector:"a",class:"btn btn-link",href:"/presentation/".concat(e.CurrentPresentation.id,"/slides")},"slides")]},p=function(e){return e.CurrentPresentation&&!(0,o.isEmpty)(e.CurrentPresentation.slideShow)&&m(m.route.Link,{selector:"a",class:"btn btn-link",href:"/slideshow/".concat(e.CurrentPresentation.id)},"Slide Show")},g=function(e){return m(m.route.Link,{selector:"a",class:"btn btn-link",onclick:function(t){t.preventDefault(),e.caputerScreen()}},"Print Slide")},v=function(e){return{opacity:m.route.get().split("/").includes("slideshow")&&e.show?1:0}},y=function(e){e.attrs.mdl;var t={show:!0};return{view:function(e){var n=e.attrs.mdl;return m("#toolbar.navbar",{onmouseover:function(){t.show=!0},onmouseout:function(){t.show=!1},style:v(t)},m(".navbar-section",function(e){switch((0,o.view)((0,o.lensProp)(1),(0,o.split)("/",m.route.get()))){case"presentation":return[c,p(e)];case"slideshow":return[c,f(e)];case"slides":return[c,p(e)];case"edit":return[c,f(e),p(e)]}}(n)),m(".navbar-section",function(e){switch((0,o.view)((0,o.lensProp)(1),(0,o.split)("/",m.route.get()))){case"presentations":case"presentation":return[u(e),l(e)];case"slideshow":return[m("a.btn.btn-link",{onclick:function(){return document.dispatchEvent(new Event("restart-presentation"),"shit")}},"restart"),u(e),g(e)]}}(n)),n.modals.auth&&m(d,{mdl:n}))}}};e.default=y})),require.register("editor/component.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r,o=t("./model.js");(r=t("components"))&&r.__esModule;var i={view:function(e){var t=e.attrs,n=t.action,r=t.label;return m("button.card-btn",{onclick:n},r)}},a=function(e){var t=e.attrs.mdl,n={presentationId:"",slide:{title:"",content:"",id:""}},r=function(e){return m.route.set("/presentation/".concat(n.presentationId,"/slides"))},a=function(e){return log("error")(e)},s=function(e){n.slide=e},d=function(e){return function(t){return n.slide[e]=t.target.value}},u=function(e){e.preventDefault(),(0,o.editSlide)(n.slide).fork(a,(function(){return r()}))};return{oncreate:(n.slide.id=m.route.param("id"),n.presentationId=m.route.param("pid"),(0,o.loadSlide)(n.slide.id).fork(a,s)),view:function(){return m(".container.editor",[m(".editor-left",m(".card.follow",[m(".card-header",[m(".card-footer",[m(i,{action:u,label:"Save"}),m(i,{action:r,label:"Cancel"})]),m("input.editor-input",{type:"text",placeholder:"Slide Title",oninput:d("title"),value:n.slide.title})]),m("textarea.editor-text",{oninput:d("content"),value:n.slide.content})])),m(".editor-right",m.trust(t.markup.render(n.slide.content||"")))])}}};e.default=a})),require.register("editor/model.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.editSlide=e.loadSlide=void 0;var r=t("utils"),o=t("ramda");e.loadSlide=function(e){var t="{ slide(where:{id:".concat(JSON.stringify(e),"}){\n              id content title\n            }\n          }");return(0,r.getQlTask)(t).map((0,o.path)(["data","slide"]))};e.editSlide=function(e){var t=e.id,n=e.title,i=e.content,a="mutation {\n            updateSlide(\n              data: {\n                title: ".concat(JSON.stringify(n),"\n                content: ").concat(JSON.stringify(i),"\n              }\n              where: {\n                id: ").concat(JSON.stringify(t),"\n              }) {\n                id\n                title\n              }\n        }");return(0,r.getQlTask)(a).map((0,o.path)(["data","updatePresentation","Slides"]))}})),require.register("index.js",(function(e,t,n){"use strict";var r=t("./components/layout.js"),o=u(t("./presentations/component.js")),i=u(t("./slides/component.js")),a=u(t("./editor/component.js")),s=u(t("./slideshow/component.js")),d=u(t("./Models.js"));function u(e){return e&&e.__esModule?e:{default:e}}var l=document.body;sessionStorage.getItem("code")&&(d.default.isLoggedIn=!0);var c;m.route(l,"/presentations",(c=d.default,{"/presentations":{onmatch:function(){c.CurrentPresentation={title:"",id:"",slideShow:[],Slides:[]}},render:function(){return m(r.Layout,{mdl:c},m(o.default,{mdl:c}))}},"/presentation/:id/slides":{onmatch:function(){return c.isLoggedIn||m.route.set(m.route.get())},render:function(){return m(r.Layout,{mdl:c},m(i.default,{mdl:c}))}},"/edit/:pid/slide/:id":{onmatch:function(){return c.isLoggedIn||m.route.set(m.route.get())},render:function(){return m(r.Layout,{mdl:c},m(a.default,{mdl:c}))}},"/slideshow/:id":{onmatch:function(e,t,n,r,o,i){console.log("matched",e,t,n,r,o,i)},render:function(){return m(r.Layout,{mdl:c},m(s.default,{mdl:c}))}}}))})),require.register("initialize.js",(function(e,t,n){"use strict";document.addEventListener("DOMContentLoaded",(function(){return t("./index.js")}))})),require.register("presentations/Presentation/component.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r,o=t("utils"),i=t("ramda"),a=t("../model.js"),s=(r=t("data.task"))&&r.__esModule?r:{default:r},d=t("@mithril-icons/clarity/cjs/index"),u=t("./model.js");var l=function(e){var t=e.attrs.mdl,n=function(e){var n=(0,o.log)("e");(0,u.loadSlides)(e).fork(n,(function(n){t.CurrentPresentation=n,t.CurrentPresentation.slideShow=t.CurrentPresentation.Slides.filter((function(e){return e.order>0})).sort((function(e,t){return e.order-t.order})),m.route.set("/slideshow/".concat(e))}))},r=function(e){return(d=e,window.confirm("Are you sure you want to delete?")?s.default.of(d):s.default.rejected("user denied req")).chain(a.deletePresentationsTask).fork((r="deleting",function(e){return(0,o.log)("error with ".concat(r,": "))(e)}),(n=t,function(e){return n.Presentations=(0,i.without)([e],n.Presentations)}));var n,r,d};return{view:function(e){var t=e.attrs,o=t.title,i=t.id,a=t.mdl;return m(".card.column.col-3",{style:{margin:"10px"}},m(".tile",{style:{height:"100px"}},m(".tile-content",o),m(".tile-action",{style:{position:"relative"}},m(d.PlayLine,{class:"clarity",onclick:function(){return n(i)}}),a.isLoggedIn&&[m(d.EditLine,{class:"clarity",onclick:function(){return m.route.set("/presentation/".concat(i,"/slides"))}}),m(d.RemoveLine,{class:"clarity",onclick:function(e){e.stopPropagation(),r(i)}})])))}}};e.default=l})),require.register("presentations/Presentation/model.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.loadSlides=void 0;var r=t("ramda"),o=t("utils");e.loadSlides=function(e){return(0,o.getQlTask)("{ presentation(where:{id:".concat(JSON.stringify(e),"}){\n    id, title, Slides { id title content order }\n  } }")).map((0,r.path)(["data","presentation"]))}})),require.register("presentations/component.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t("ramda"),o=t("utils"),i=d(t("./presentationModal.js")),a=d(t("./Presentation/component.js")),s=t("./model.js");function d(e){return e&&e.__esModule?e:{default:e}}var u=function(){var e={errors:null,title:""},t=function(t){(0,o.log)("error")(t),e.error=t};return{oninit:function(e){var n=e.attrs.mdl;return(0,s.getPresentations)().fork(t,function(e){return function(t){return e.Presentations=t}}(n))},view:function(t){var n=t.attrs.mdl;return[n.modals.presentations&&m(i.default,{onremove:function(){e.title="",e.errors=null},mdl:n,state:e,presentations:n.Presentations,presentationModel:(0,r.clone)(n.PresentationModel)}),m(".container.columns",{oncreate:function(e){var t=e.dom;return(0,o.animateFadeIn)({dom:t})},onBeforeRemove:function(e,t){e.dom.addEventListener("animationend",t),e.dom.style.animation="fadeOut 1s"}},[n.Presentations&&n.Presentations.map((function(e){var t=e.title,r=e.id;return m(a.default,{key:r,id:r,title:t,mdl:n})}))])]}}};e.default=u})),require.register("presentations/model.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.deletePresentationsTask=e.savePresentationTask=e.getPresentations=void 0;var r=t("utils"),o=t("ramda");e.getPresentations=function(){return(0,r.getQlTask)("query {\n  presentations{ id, title}\n}").map((0,o.path)(["data","presentations"]))};e.savePresentationTask=function(e){var t="mutation {\n    createPresentation(data: {title: ".concat(JSON.stringify(e.title),"})\n    { title id}\n  }");return(0,r.getQlTask)(t).map((0,o.path)(["data","createPresentation"]))};e.deletePresentationsTask=function(e){var t="mutation {\n    deletePresentation(where: {id: ".concat(JSON.stringify(e),"})\n    { title id}\n  }");return(0,r.getQlTask)(t).map((0,o.path)(["data","deletePresentation"]))}})),require.register("presentations/presentationModal.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t("./model.js"),o=t("utils"),i=t("components/modal"),a=function(e){var t=e.attrs,n=t.state,a=t.mdl,s=t.presentations,d=t.onremove,u=function(e){(0,o.log)("error")(e),n.errors=e,toggleModal()},l=function(e){n.title="",n.errors=null,s.push(e),a.toggleModal(a,"presentations")},c=function(e){e.preventDefault(),(0,r.savePresentationTask)(n).fork(u,l)};return{view:function(){return m(i.Modal,{onremove:d,mdl:a,id:"presentations",modalTitle:"New Presentation",modalContent:m("input",{value:n.title,autofocus:!0,type:"text",onkeyup:function(e){return n.title=e.target.value}}),modalFooter:m("button.card-btn",{onclick:c},"create presentation")})}}};e.default=a})),require.register("slides/Preview/component.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t("ramda"),o=t("utils"),i=t("../model.js"),a=t("@mithril-icons/clarity/cjs"),s=function(e){var t=e.attrs.update;return{view:function(e){var n=e.attrs,r=n.slides,o=n.slide,i=n.dir;return m("button.s-circle",{disabled:"right"==i&&o.order==r.length||"left"==i&&1==o.order,onclick:function(){return function(e,n,r){switch(e){case"left":var o=n.filter((function(e){return e.order==r.order-1}))[0];o.order++,r.order--,t([o,r]);break;case"right":var i=n.filter((function(e){return e.order==r.order+1}))[0];r.order++,i.order--,t([i,r])}}(i,r,o)}},m("i.icon icon-arrow-".concat(i)))}}},d=function(e){var t=e.attrs,n=t.getSlides,d=t.mdl,u=t.s,l=(t.key,t.state),c=function(e){return n({attrs:{mdl:d}})},f=function(e){return(0,i.updateSlideTask)(d.CurrentPresentation.id)(e).fork((t="updating",function(e){return(0,o.log)("error with ".concat(t))(e)}),c);var t},p=function(e){var t=(0,r.compose)((0,r.map)(i.reduceOrder),(0,r.filter)((0,i.forGreater)(e)))(l.right()),n=(0,i.updateRemoveSlide)(e),o=(0,r.concat)(n,t);f(o)},g=function(e){e.target.style.opacity="0.4",e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain","preview"),l.previewDrag.drag=(0,r.head)((0,r.filter)((0,r.propEq)("id",u.id),l.right()))},v=function(e){e.preventDefault(),l.previewDrag.drag&&(l.previewDrag.drop=u)},y=function(e){e.preventDefault(),l.previewDrag.drop=null},h=function(e){return e.preventDefault()},w=function(e){if(e.target.style.opacity="1",l.slideDrag.dragging=!1,l.previewDrag.drop){var t=l.previewDrag.drag.order,n=l.previewDrag.drop.order,o=l.previewDrag.drag,i=l.previewDrag.drop;l.previewDrag.drag=d.SlideModel,l.previewDrag.drop=d.SlideModel,(0,r.eqProps)("id",o,i)||(o.order=n,i.order=t,f([o,i]))}};return{oncreate:function(e){var t=e.dom;return(0,o.animateFadeIn)({dom:t})},view:function(e){var t=e.attrs,n=t.mdl,r=t.s,o=t.state;return m(".card.preview",{draggable:n.isLoggedIn,ondragstart:g,ondragend:w,ondragover:v,ondrop:h,ondragleave:y,style:{position:"relative",opacity:o.previewDrag.drop&&o.previewDrag.drop.id==r.id?.4:1}},[m(".card-header",[m("p.slidePosition",r.order),n.isLoggedIn&&m(a.RemoveLine,{class:"clarity",style:{position:"absolute",top:0,right:0},onclick:function(){return p(r)}})]),m("p.slidePosition",r.title),n.isLoggedIn&&m(".card-footer",[m(s,{slides:o.right(),dir:"left",slide:r,update:f}),m(a.EditLine,{class:"clarity",style:{position:"absolute",top:35,right:0},onclick:function(){m.route.set("/edit/".concat(n.CurrentPresentation.id,"/slide/").concat(r.id))}}),m(s,{slides:o.right(),dir:"right",slide:r,update:f})])])}}};e.default=d})),require.register("slides/Slide/component.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r,o=(r=t("data.task"))&&r.__esModule?r:{default:r},i=t("utils"),a=t("ramda"),s=t("../model.js"),d=t("@mithril-icons/clarity/cjs");var u=function(e){var t=e.attrs,n=t.getSlides,r=t.mdl,u=t.s,l=(t.key,t.state),c=function(e){return function(t){return(0,i.log)("error with ".concat(e))(t)}},f=function(e){return n({attrs:{mdl:r}})},p=function(e){return function(e){return window.confirm("Are you sure you want to delete?")?o.default.of(e):o.default.rejected(e)}(e).chain((0,s.deleteSlideTask)(l.presentationId)).fork(c("deleting"),f)},g=function(e){e.target.style.opacity="0.4",e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain","slide"),l.slideDrag=(0,s.updateSlideDragStart)(u)(l.slideDrag)},v=function(e){if(e.target.style.opacity="1",l.slideDrag.droppable){var t=(0,s.updateSlideDragEnd)(l.right().length)(u);return(0,s.updateStateDragEnd)(l.slideDrag),function(e){(0,s.updateSlideTask)(l.presentationId)([e]).fork(c("updating"),(function(e){l.slideDrag={dragId:"",dragging:!1,droppable:!1},f()}))}(t)}};return{view:function(e){var t=e.attrs,n=t.s,r=t.state,o=t.mdl;return m(".card",{id:n.id,draggable:o.isLoggedIn,ondragstart:g,ondragend:v},[m("div.card-header",[m("h1.title",m("span",(0,a.take)(15,n.title)))]),o.isLoggedIn&&m(".card-footer",m(d.RemoveLine,{class:"clarity",onclick:function(){return p(n.id)}}),m(d.EditLine,{class:"clarity",onclick:function(){return m.route.set("/edit/".concat(r.presentationId,"/slide/").concat(n.id))}}))])}}};e.default=u})),require.register("slides/component.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t("ramda"),o=u(t("./slidesModal.js")),i=u(t("./Slide/component.js")),a=u(t("./Preview/component.js")),s=t("./model.js"),d=t("utils");function u(e){return e&&e.__esModule?e:{default:e}}var l=function(e){var t=e.attrs.mdl,n={left:Stream([]),right:Stream([]),slideDrag:{dragId:"",dragging:!1,droppable:!1},previewDrag:{drag:null,drop:null},presentationId:""},u=(0,d.log)("error"),l=function(){var e=t.CurrentPresentation.Slides;n.left((0,r.filter)((0,r.propEq)("order",0),e)),n.right((0,r.sortBy)((0,r.prop)("order"),(0,r.without)(n.left(),e))),t.CurrentPresentation.slideShow=n.right()},c=function(e){var t=e.attrs.mdl;return n.presentationId=m.route.param("id"),(0,s.loadSlides)(n.presentationId)(t).fork(u,l)},f=function(e){e.preventDefault(),n.bColor=!0},p=function(e){e.preventDefault(),n.slideDrag.dragging=!1,n.slideDrag.droppable=!1,n.bColor=!1},g=function(e){e.preventDefault();var t=e.dataTransfer.getData("text/plain");if(n.slideDrag.dragging)if("slide"==t){var o=(0,r.head)((0,r.filter)((0,r.propEq)("id",n.slideDrag.dragId),n.left()));n.slideDrag.droppable=!0,o.order=n.right().length+1,n.left((0,r.without)([o],n.left())),n.right((0,r.concat)(n.right(),[o]))}else(0,r.head)((0,r.filter)((0,r.propEq)("id",n.slideDrag.dragId),n.right()))},v=function(e){e.preventDefault();e.dataTransfer.getData("text/plain");n.slideDrag.dragging=!0,e.dataTransfer.dropEffect="move"};return{oninit:c,view:function(e){var t=e.attrs.mdl;return[t.toggleModal?m(o.default,{slide:(0,r.clone)(t.SlideModel),getSlides:c,mdl:t,pId:n.presentationId}):"",m(".container.slides",[m("aside.left-drag ".concat(0==n.left().length?".isDragging":""),{style:{overflowY:"auto"},onBeforeRemove:function(e,t){e.dom.addEventListener("animationend",t),e.dom.style.animation="fadeOut 1s"}},n.left().map((function(e){return m(i.default,{key:e.id,mdl:t,getSlides:c,s:e,state:n})}))),m("section.right-drag".concat(n.slideDrag.dragging?".isDragging":""),{style:{height:"90vh",overflowY:"auto"},onBeforeRemove:function(e,t){e.dom.addEventListener("animationend",t),e.dom.style.animation="fadeOut 1s"},ondragleave:p,ondrop:g,ondragover:v,ondragenter:f},n.right().map((function(e){return m(a.default,{key:e.id,mdl:t,getSlides:c,s:e,state:n})})))])]}}};e.default=l})),require.register("slides/model.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.updateSlideTask=e.deleteSlideTask=e.saveSlideTask=e.loadSlides=e.updateStateDragEnd=e.updateSlideDragEnd=e.updateSlideDragStart=e.updateRemoveSlide=e.getId=e.reduceOrder=e.forLess=e.forGreater=e.toStruct=void 0;var r=t("utils"),o=t("ramda");e.toStruct=function(e,t){return t.order>0&&!e.keys.has(t.id)?(t.order=e.keys.size+1,e.keys.add(t.id),e.values[t.order]=t,e.items(Object.keys(e.values)),e):e};var i=function(e){return(0,o.prop)("order",e)};e.forGreater=function(e){return function(t){return(0,o.lt)(i(e),i(t))}};e.forLess=function(e){return function(t){return(0,o.gt)(i(e),i(t))}};e.reduceOrder=function(e){return(0,o.set)((0,o.lensProp)("order",e),(0,o.subtract)(i(e),1),e)};e.getId=function(e){return(0,o.prop)("id",e)};var a=(0,o.compose)(Array.of,(function(e){return(0,o.set)((0,o.lensProp)("order",e),0,e)}));e.updateRemoveSlide=a;e.updateSlideDragStart=function(e){return(0,o.compose)(function(e){return function(t){return(0,o.set)((0,o.lensProp)("dragId",t),(0,o.prop)("id",e),t)}}(e),s)};e.updateSlideDragEnd=function(e){return(0,o.compose)(function(e){return function(t){return(0,o.set)((0,o.lensProp)("order"),e,t)}}(e))};var s=function(e){return(0,o.set)((0,o.lensProp)("dragging",!1,e))},d=(0,o.compose)((function(e){return(0,o.set)((0,o.lensProp)("droppable",!1,e))}),s);e.updateStateDragEnd=d;e.loadSlides=function(e){return function(t){return(0,r.getQlTask)("{ presentation(where:{id:".concat(JSON.stringify(e),"}){\n      id, title, Slides { id title content order }\n    } }")).map((0,o.path)(["data","presentation"])).map(function(e){return function(t){return e.CurrentPresentation=t}}(t))}};e.saveSlideTask=function(e){var t=e.title,n=e.order,i=e.presentation_id,a="mutation {\n            updatePresentation(\n              where: {\n                id: ".concat(JSON.stringify(i),"\n              }\n              data: {\n                  Slides:{\n                    create : {\n                      title: ").concat(JSON.stringify(t),'\n                      content: ""\n                      order: ').concat(JSON.stringify(n),"\n                    }\n                  }\n          }){\n    id title Slides { id title content order }\n  } }");return(0,r.getQlTask)(a).map((0,o.path)(["data","updatePresentation","Slides"]))};e.deleteSlideTask=function(e){return function(t){var n="mutation {\n            updatePresentation(\n              where: {\n                id: ".concat(JSON.stringify(e),"\n              }\n              data: {\n                  Slides:{\n                    delete : [{\n                      id: ").concat(JSON.stringify(t),"\n                    }]\n                  }\n          }){\n    id title Slides { id title content order}\n  } }");return(0,r.getQlTask)(n).map((0,o.path)(["data","updatePresentation","Slides"]))}};e.updateSlideTask=function(e){return function(t){var n=t.map((function(e){return"{\n      where: {\n        id: ".concat(JSON.stringify(e.id),"\n      }\n      data: {\n        order: ").concat(JSON.stringify(e.order),"\n      }\n    }")})),i="mutation {\n            updatePresentation(\n              where: {\n                id: ".concat(JSON.stringify(e),"\n              }\n              data: {\n                Slides:{\n                  update : [").concat(n,"]\n                }\n              }\n            )\n          { id title Slides { id title content order } }\n        }");return(0,r.getQlTask)(i).map((0,o.path)(["data","updatePresentation","Slides"]))}}})),require.register("slides/slidesModal.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t("ramda"),o=t("./model.js"),i=t("components/modal"),a=function(e){var t=e.attrs,n=t.pId,a=t.slide,s=t.getSlides,d=t.mdl,u={errors:"",title:""},l=function(e){log("error")(e),u.errors=e},c=function(){s({attrs:{mdl:d}}),d.toggleModal(d,"slides")},f=function(e){e.preventDefault();var t=(0,r.assoc)("presentation_id",n,(0,r.assoc)("title",u.title,a));(0,o.saveSlideTask)(t).fork(l,c)};return{view:function(){return m(i.Modal,{onremove:function(){u.title="",u.errors=""},mdl:d,id:"slides",modalTitle:"New Slide",modalContent:m("input",{value:u.title,autofocus:!0,type:"text",onkeyup:function(e){return u.title=e.target.value}}),modalFooter:m("button.card-btn",{onclick:f},"add slide")})}}};e.default=a})),require.register("slideshow/component.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r,o=(r=t("mithril"))&&r.__esModule?r:{default:r},i=t("ramda"),a=t("utils");var s={view:function(){return(0,o.default)(".endingContainer",(0,o.default)("h1.endingTitle","THE END!"),(0,o.default)("img.endingImg",{id:"ending",src:"https://imgur.com/uj15GJp.gif",width:"100%"}))}},d=function(e){var t=e.attrs.mdl;t.CurrentPresentation.id||o.default.route.set("/presentations");var n={update:!1,key:void 0,current:0,class:"",size:t.CurrentPresentation.slideShow.length||0,contents:(0,i.pluck)("content",t.CurrentPresentation.slideShow)||0},r=function(e,t){return t.key="right"==function(e){return e>window.innerWidth/2?"right":"left"}(e)?"ArrowRight":"ArrowLeft"},d=function(e,t){switch(e){case"ArrowLeft":t.children&&function(e){e.scrollIntoView(!0),0==n.current?n.current:n.current--}(t);break;case"ArrowRight":t.children&&function(e){n.current==n.size-1?n.contents[n.current]="":n.current++,e.scroll(0,-300)}(t);break;case"ArrowUp":t.scrollBy(0,100);break;case"ArrowDown":t.scrollBy(0,-100)}};return{dir:n.key,oncreate:function(e){e.dom;document.addEventListener("restart-presentation",(function(e){n.update=!0,n.current=0}))},oninit:function(){return n.slide=n.contents[n.current]},view:function(e){var t=e.attrs.mdl;return(0,o.default)(".slideshow#slideshow",{class:n.class,tabindex:0,onkeyup:function(e){var t=e.key,r=e.target;n.update=!0,n.key=t,d(t,r)},onmousemove:function(e){var t=e.pageX;n.update=!1,function(e,t){e.class=t/window.innerWidth*100>50?"point-right":"point-left"}(n,t)},onclick:function(e){var t=e.x,o=e.target;return n.update=!0,r(t,n),d(n.key,o)}},(0,o.default)(".slidecard#slidecard",{onbeforeupdate:function(){return!["ArrowUp","ArrowDown"].includes(n.key)&&n.update},onupdate:function(e){var t=e.dom;t.scrollIntoView({block:"start",inline:"start"}),(0,a.animateEntranceRight)({dom:t})}},n.contents[n.current]?o.default.trust(t.markup.render(n.contents[n.current])):(0,o.default)(s)))}}};e.default=d})),require.register("utils/.secret.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.secure=e.onlineUrl=void 0;var r,o=(r=t("crypto-js/sha256"))&&r.__esModule?r:{default:r};e.onlineUrl="https://eu1.prisma.sh/boaz-blake-8951e1/mithril-presenter/dev";e.secure=function(e){return(0,o.default)(e).toString()}})),require.register("utils/Tasks.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.postQl=void 0;var r,o=(r=t("data.task"))&&r.__esModule?r:{default:r},i=t("./index.js");var a=function(e){return new o.default((function(t,n){return m.request({method:"POST",url:"".concat(i.onlineUrl),withCredentials:!1,body:(0,i.makeQuery)(e)}).then(n,t)}))};e.postQl=a;var s={postTask:function(e){return function(t){return new o.default((function(n,r){return m.request({method:"POST",url:"".concat(e),body:t,withCredentials:!1}).then(r,n)}))}},putTask:function(e){return function(t){var n=t.dto;return new o.default((function(t,r){return m.request({method:"PUT",url:"".concat(i.onlineUrl,"/").concat(e),body:n,withCredentials:!1}).then(r,t)}))}},getTask:function(e){return new o.default((function(t,n){return m.request({method:"GET",url:"".concat(i.onlineUrl,"/").concat(e),withCredentials:!1}).then(n,t)}))},deleteTask:function(e){return function(t){return new o.default((function(n,r){return m.request({method:"DELETE",url:"".concat(i.onlineUrl,"/").concat(e,"/").concat(t),withCredentials:!1}).then(r,n)}))}},postQl:a};e.default=s})),require.register("utils/animations.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.bounceEntrance=e.animeEntrance=e.animateFadeOut=e.animateFadeIn=e.animateExit=e.animateChildEntrance=e.animateEntranceRight=e.animateSlideEntrance=void 0;var r,o=(r=t("animejs"))&&r.__esModule?r:{default:r};function i(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}e.animateSlideEntrance=function(e){return e.dom.animate([{transform:"translate3d(20%,0,0)",opacity:0},{transform:"none",opacity:1}],{duration:650})};e.animateEntranceRight=function(e){return e.dom.animate([{animation:"",transform:"translate3d(100%,0,0)",scale:2,opacity:0},{animation:"stretchRight 1s ease-in-out both",transform:"none",opacity:1,scale:1}],{duration:350})};e.animateChildEntrance=function(e){return i(e.dom.children).map((function(e,t){setTimeout((function(){e.animate([{transform:"translate3d(0,-100%,0)",opacity:0},{transform:"none",opacity:1}],{duration:850})}),200*(t+1))}))};e.animateExit=function(e){var t=i(e.children),n=animate([{transform:"none",opacity:1},{transform:"translate3d(25%,100%,0)",opacity:0}]),r=t.map((function(e){return e.animate(n,{duration:850})}));return new Promise((function(e){r.onfinish=function(t){e()}}))};e.animateFadeIn=function(e){i(e.dom.children).map((function(e,t){return e.style.opacity=0,e.style.transition="opacity .4s ease-in-out",setTimeout((function(){e.style.opacity=1}),200*(t+1))}))};e.animateFadeOut=function(e){var t=e.dom.animate([{transition:"opacity .4s ease-in-out"},{transform:"none",opacity:1},{transform:"translate3d(25%,100%,0)",opacity:0}],{duration:850});return new Promise((function(e){t.onfinish=function(t){e()}}))};e.animeEntrance=function(e){return i(e.dom.children).map((function(e){return(0,o.default)({target:e,easing:"easeInQuad",translateX:250,offset:0})}))};e.bounceEntrance=function(e){return e.dom.animate({animation:"animation 1000ms linear both",keyframes:{"0%":{transform:"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"3.4%":{transform:"matrix3d(1.316, 0, 0, 0, 0, 1.407, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"4.7%":{transform:"matrix3d(1.45, 0, 0, 0, 0, 1.599, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"6.81%":{transform:"matrix3d(1.659, 0, 0, 0, 0, 1.893, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"9.41%":{transform:"matrix3d(1.883, 0, 0, 0, 0, 2.168, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"10.21%":{transform:"matrix3d(1.942, 0, 0, 0, 0, 2.226, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"13.61%":{transform:"matrix3d(2.123, 0, 0, 0, 0, 2.332, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"14.11%":{transform:"matrix3d(2.141, 0, 0, 0, 0, 2.331, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"17.52%":{transform:"matrix3d(2.208, 0, 0, 0, 0, 2.239, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"18.72%":{transform:"matrix3d(2.212, 0, 0, 0, 0, 2.187, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"21.32%":{transform:"matrix3d(2.196, 0, 0, 0, 0, 2.069, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"24.32%":{transform:"matrix3d(2.151, 0, 0, 0, 0, 1.96, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"25.23%":{transform:"matrix3d(2.134, 0, 0, 0, 0, 1.938, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"29.03%":{transform:"matrix3d(2.063, 0, 0, 0, 0, 1.897, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"29.93%":{transform:"matrix3d(2.048, 0, 0, 0, 0, 1.899, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"35.54%":{transform:"matrix3d(1.979, 0, 0, 0, 0, 1.962, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"36.74%":{transform:"matrix3d(1.972, 0, 0, 0, 0, 1.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"41.04%":{transform:"matrix3d(1.961, 0, 0, 0, 0, 2.022, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"44.44%":{transform:"matrix3d(1.966, 0, 0, 0, 0, 2.032, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"52.15%":{transform:"matrix3d(1.991, 0, 0, 0, 0, 2.006, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"59.86%":{transform:"matrix3d(2.006, 0, 0, 0, 0, 1.99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"63.26%":{transform:"matrix3d(2.007, 0, 0, 0, 0, 1.992, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"75.28%":{transform:"matrix3d(2.001, 0, 0, 0, 0, 2.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"85.49%":{transform:"matrix3d(1.999, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"90.69%":{transform:"matrix3d(1.999, 0, 0, 0, 0, 1.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"},"100%":{transform:"matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"}}})}})),require.register("utils/index.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={viewModelMap:!0,log:!0,repeat:!0,wait:!0,makeQuery:!0};e.makeQuery=e.wait=e.repeat=e.log=e.viewModelMap=void 0;var o=t("./animations.js");Object.keys(o).forEach((function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(r,t)||t in e&&e[t]===o[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return o[t]}}))}));var i=t("./requests.js");Object.keys(i).forEach((function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(r,t)||t in e&&e[t]===i[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return i[t]}}))}));var a=t("./.secret.js");Object.keys(a).forEach((function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(r,t)||t in e&&e[t]===a[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return a[t]}}))}));var s=t("./Tasks.js");Object.keys(s).forEach((function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(r,t)||t in e&&e[t]===s[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return s[t]}}))}));e.makeQuery=function(e){return JSON.parse(JSON.stringify(e))};e.repeat=function(e){return function(t){return function(n){for(var r=e;;){if(0===r)return n;r-=1,n=t(n)}}}};e.wait=function(e){return function(t){return function(n){for(var r=e;;){if(0===r)return n;r-=1,n=t(n)}}}};e.log=function(e){return function(t){return console.log(e,t),t}};e.viewModelMap=function(e){var t={};return function(n){if(!t[n])for(var r in t[n]={},e)t[n][r]=Stream(e[r]());return t[n]}}})),require.register("utils/requests.js",(function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.loadSlideTask=e.deleteSlideTask=e.updateSlideTask=e.saveSlideTask=e.findSlidesTask=e.deletePresentationsTask=e.savePresentationTask=e.getQlTask=e.findPresentationsTask=void 0;var r,o=(r=t("./Tasks.js"))&&r.__esModule?r:{default:r};e.findPresentationsTask=function(){return o.default.getTask("presentations")};e.getQlTask=function(e){return o.default.postQl({query:e})};e.savePresentationTask=function(e){return o.default.postTask("presentations")({dto:e})};e.deletePresentationsTask=function(e){return o.default.deleteTask("presentations")(e)};e.findSlidesTask=function(e){return o.default.getTask("presentations/".concat(e,"/slides"))};e.saveSlideTask=function(e){return o.default.postTask("slides")({dto:e})};e.updateSlideTask=function(e){return function(t){return o.default.putTask("slides/".concat(e))({dto:t})}};e.deleteSlideTask=function(e){return o.default.deleteTask("slides")(e)};e.loadSlideTask=function(e){return o.default.getTask("slides/".concat(e))}})),require.register("___globals___",(function(e,t,n){window.m=t("mithril"),window.Stream=t("mithril-stream"),window.punycode=t("punycode")}))}(),require("___globals___"),require("initialize.js");
