!function(){"use strict";var t="/antd-token-previewer/".replace(/([^/])$/,"$1/"),e=location.pathname,n=e.startsWith(t)&&decodeURI("/".concat(e.slice(t.length)));if(n){var a=document,c=a.head,r=a.createElement.bind(a),i=function(t,e,n){var a,c=e.r[t]||(null===(a=Object.entries(e.r).find((function(e){var n=e[0];return new RegExp("^".concat(n.replace(/\/:[^/]+/g,"/[^/]+").replace("/*","/.+"),"$")).test(t)})))||void 0===a?void 0:a[1]);return null==c?void 0:c.map((function(t){var a=e.f[t][1],c=e.f[t][0];return{type:c.split(".").pop(),url:"".concat(n.publicPath).concat(c),attrs:[["data-".concat(e.b),"".concat(e.p,":").concat(a)]]}}))}(n,{"p":"antd-token-previewer","b":"webpack","f":[["nm__dumi__dist__client__pages__Demo__index.54e54e46.async.js",9],["nm__dumi__dist__client__pages__404.dfb0a3d3.async.js",65],["docs__editor__v4-theme.md.ef70d36b.async.js",131],["docs__others__color-panel.md.9d7fec8d.async.js",184],["docs__previewer__previewer-token-panel.md.b0f0d722.async.js",306],["docs__previewer__index.md.0f1a6b0f.async.js",323],["docs__editor__index.md.8163286d.async.js",373],["docs__others__overview.md.a9224d83.async.js",472],["nm__dumi__theme-default__layouts__DocLayout__index.e11cd8d4.async.js",519],["520.ebb2b171.async.js",520],["docs__previewer__controlled.md.7b85dc29.async.js",543],["748.f583cbda.async.js",748],["911.b32fa5ee.async.js",911],["dumi__tmp-production__dumi__theme__ContextWrapper.1da389ea.async.js",923],["docs__index.md.d83a281a.async.js",935]],"r":{"/*":[1,8,9,13],"/":[11,12,14,8,9,13],"/previewer":[5,11,12,8,9,13],"/editor":[6,11,12,8,9,13],"/~demos/:id":[0,13],"/previewer/previewer-token-panel":[4,11,12,8,9,13],"/previewer/controlled":[10,11,12,8,9,13],"/others/color-panel":[3,11,12,8,9,13],"/editor/v4-theme":[2,11,12,8,9,13],"/others/overview":[7,11,12,8,9,13]}},{publicPath:"/antd-token-previewer/"});null==i||i.forEach((function(t){var e,n=t.type,a=t.url;if("js"===n)(e=r("script")).src=a,e.async=!0;else{if("css"!==n)return;(e=r("link")).href=a,e.rel="preload",e.as="style"}t.attrs.forEach((function(t){e.setAttribute(t[0],t[1]||"")})),c.appendChild(e)}))}}();