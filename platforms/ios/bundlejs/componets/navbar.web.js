// { "framework": "Vue"} 

!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=112)}({101:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.opacity>0?n("div",{staticClass:"root",style:{height:t.height+"px",paddingTop:t.paddingTop+"px",backgroundColor:t.backgroundColor,opacity:t.opacity}},[n("div",{staticClass:"div-wrap"},[t.leftItemSrc?t._e():n("text",{staticClass:"text",style:{color:t.leftItemColor},attrs:{naviItemPosition:"left"},on:{click:t.onClickLeft}},[t._v(t._s(t.leftItemTitle)+"\n            ")]),t._v(" "),t.leftItemSrc?n("image",{staticClass:"img",attrs:{naviItemPosition:"left",src:t.leftItemSrc},on:{click:t.onClickLeft}}):t._e()]),t._v(" "),n("div",{staticClass:"div-wrap"},[n("text",{staticClass:"title",style:{color:t.titleColor},attrs:{naviItemPosition:"center"}},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"div-wrap"},[t.rightItemSrc?t._e():n("text",{staticClass:"text",style:{color:t.rightItemColor},attrs:{naviItemPosition:"right"},on:{click:t.onClickRight}},[t._v(t._s(t.rightItemTitle)+"\n            ")]),t._v(" "),t.rightItemSrc?n("image",{staticClass:"img",attrs:{naviItemPosition:"right",src:t.rightItemSrc},on:{click:t.onClickRight}}):t._e()])]):n("div",{staticClass:"root navBG",style:{height:t.height+"px",paddingTop:t.paddingTop+"px"}},[n("div",{staticClass:"div-wrap"},[t.leftItemSrc?t._e():n("text",{staticClass:"text",style:{color:t.leftItemColor},attrs:{naviItemPosition:"left"},on:{click:t.onClickLeft}},[t._v(t._s(t.leftItemTitle)+"\n\n            ")]),t._v(" "),t.leftItemSrc?n("image",{staticClass:"img",attrs:{naviItemPosition:"left",src:t.leftItemSrc},on:{click:t.onClickLeft}}):t._e()]),t._v(" "),n("div",{staticClass:"div-wrap"},[n("text",{staticClass:"title",style:{color:t.titleColor},attrs:{naviItemPosition:"center"}},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"div-wrap"},[t.rightItemSrc?t._e():n("text",{staticClass:"text",style:{color:t.rightItemColor},attrs:{naviItemPosition:"right"},on:{click:t.onClickRight}},[t._v(t._s(t.rightItemTitle)+"\n            ")]),t._v(" "),t.rightItemSrc?n("image",{staticClass:"img",attrs:{naviItemPosition:"right",src:t.rightItemSrc},on:{click:t.onClickRight}}):t._e()])])])},staticRenderFns:[]},t.exports.render._withStripped=!0},102:function(t,e,n){var i=n(97);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(33)("690fe4f6",i,!1)},112:function(t,e,n){var i=n(51);i.el="#root",new Vue(i)},31:function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(i[o]=!0)}for(r=0;r<e.length;r++){var a=e[r];"number"==typeof a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},32:function(t,e){t.exports=function(t,e,n,i){var r,o=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(r=t,o=t.default);var s="function"==typeof o?o.options:o;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),n&&(s._scopeId=n),i){var l=s.computed||(s.computed={});Object.keys(i).forEach(function(t){var e=i[t];l[t]=function(){return e}})}return{esModule:r,exports:o,options:s}}},33:function(t,e,n){function i(t){for(var e=0;e<t.length;e++){var n=t[e],i=f[n.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](n.parts[r]);for(;r<n.parts.length;r++)i.parts.push(o(n.parts[r]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{for(var a=[],r=0;r<n.parts.length;r++)a.push(o(n.parts[r]));f[n.id]={id:n.id,refs:1,parts:a}}}}function r(){var t=document.createElement("style");return t.type="text/css",u.appendChild(t),t}function o(t){var e,n,i=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(i){if(h)return v;i.parentNode.removeChild(i)}if(g){var o=p++;i=d||(d=r()),e=a.bind(null,i,o,!1),n=a.bind(null,i,o,!0)}else i=r(),e=s.bind(null,i),n=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else n()}}function a(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=m(e,r);else{var o=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function s(t,e){var n=e.css,i=e.media,r=e.sourceMap;if(i&&t.setAttribute("media",i),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(50),f={},u=l&&(document.head||document.getElementsByTagName("head")[0]),d=null,p=0,h=!1,v=function(){},g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n){h=n;var r=c(t,e);return i(r),function(e){for(var n=[],o=0;o<r.length;o++){var a=r[o],s=f[a.id];s.refs--,n.push(s)}e?(r=c(t,e),i(r)):r=[];for(var o=0;o<n.length;o++){var s=n[o];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete f[s.id]}}}};var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},50:function(t,e){t.exports=function(t,e){for(var n=[],i={},r=0;r<e.length;r++){var o=e[r],a=o[0],s=o[1],l=o[2],c=o[3],f={id:t+":"+r,css:s,media:l,sourceMap:c};i[a]?i[a].parts.push(f):n.push(i[a]={id:a,parts:[f]})}return n}},51:function(t,e,n){n(102);var i=n(32)(n(52),n(101),"data-v-0f2b32b4",null);i.options.__file="/Users/gaoyuan/web/Weex/ZhihuDaily/src/componets/navbar.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] navbar.vue: functional components are not supported with templates, they should use render functions."),t.exports=i.exports},52:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{backgroundColor:{default:"#0099FF"},height:{default:88},title:{default:""},titleColor:{default:"white"},rightItemSrc:{default:""},rightItemTitle:{default:""},rightItemColor:{default:"white"},leftItemSrc:{default:""},leftItemTitle:{default:""},leftItemColor:{default:"white"},opacity:{default:1}},data:function(){return{iOS:"iOS"===weex.config.env.platform,paddingTop:20}},methods:{onClickRight:function(t){this.$emit("naviBarRightItemClick")},onClickLeft:function(t){console.log("height",this.height),this.$emit("naviBarLeftItemClick")}},created:function(){this.height=this.iOS?128:88,this.paddingTop=this.iOS?60:20}}},97:function(t,e,n){e=t.exports=n(31)(),e.push([t.i,"\n.root[data-v-0f2b32b4] {\n    flex-direction: row;\n    width: 750px;\n    padding: 20px;\n    align-items: center;\n    justify-content: space-between;\n    background-image: linear-gradient(to bottom,rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.01));\n}\n.navBG[data-v-0f2b32b4] {\n    background-color: rebeccapurple;\n}\n.div-wrap[data-v-0f2b32b4] {\n    /*display: flex;*/\n    /*align-items: center;*/\n    /*justify-content: center;*/\n}\n.text[data-v-0f2b32b4] {\n    font-size: 32px;\n}\n.img[data-v-0f2b32b4] {\n    width: 50px;\n    height: 50px;\n}\n.title[data-v-0f2b32b4] {\n    font-size: 36px;\n    font-weight: bold;\n    max-width: 360px;\n    text-overflow: ellipsis;\n}\n",""])}});