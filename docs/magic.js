"use strict";function b(a){return n(a)||c(a)||l()}function c(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function d(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function f(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?d(Object(b),!0).forEach(function(c){g(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):d(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function g(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function i(a,b){if(null==a)return{};var c,d,e=j(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],!(0<=b.indexOf(c))&&Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}function j(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e}function k(a,b){return n(a)||m(a,b)||l()}function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function m(a,b){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a)){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}}function n(a){if(Array.isArray(a))return a}function o(a){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},o(a)}var q=function(){var a=2,b=3,c={},d=[],e=d.map,f=Array.isArray,g="undefined"==typeof requestAnimationFrame?setTimeout:requestAnimationFrame,h=function(a){var b="";if("string"==typeof a)return a;if(f(a)&&0<a.length)for(var c,d=0;d<a.length;d++)""!==(c=h(a[d]))&&(b+=(b&&" ")+c);else for(var d in a)a[d]&&(b+=(b&&" ")+d);return b},j=function(c,a){var b={};for(var d in c)b[d]=c[d];for(var d in a)b[d]=a[d];return b},k=function(a){return a.reduce(function(a,b){return a.concat(b&&!0!==b?"function"==typeof b[0]?[b]:k(b):0)},d)},l=function(c,a){return f(c)&&f(a)&&c[0]===a[0]&&"function"==typeof c[0]},m=function(c,a){if(c!==a)for(var b in j(c,a)){if(c[b]!==a[b]&&!l(c[b],a[b]))return!0;a[b]=c[b]}},n=function(a,b,c){for(var d,e,f=0,g=[];f<a.length||f<b.length;f++)d=a[f],e=b[f],g.push(e?!d||e[0]!==d[0]||m(e[1],d[1])?[e[0],e[1],e[0](c,e[1]),d&&d[2]()]:d:d&&d[2]());return g},p=function(a,b,c,d,e,f){if("key"===b);else if("style"===b)for(var g in j(c,d))c=null==d||null==d[g]?"":d[g],"-"===g[0]?a[b].setProperty(g,c):a[b][g]=c;else"o"===b[0]&&"n"===b[1]?((a.actions||(a.actions={}))[b=b.slice(2).toLowerCase()]=d)?!c&&a.addEventListener(b,e):a.removeEventListener(b,e):!f&&"list"!==b&&b in a?a[b]=null==d?"":d:null!=d&&!1!==d&&("class"!==b||(d=h(d)))?a.setAttribute(b,d):a.removeAttribute(b)},q=function(a,c,d){var e=a.props,f=a.type===b?document.createTextNode(a.name):(d=d||"svg"===a.name)?document.createElementNS("http://www.w3.org/2000/svg",a.name,{is:e.is}):document.createElement(a.name,{is:e.is});for(var g in e)p(f,g,null,e[g],c,d);for(var h=0,j=a.children.length;h<j;h++)f.appendChild(q(a.children[h]=v(a.children[h]),c,d));return a.node=f},r=function(a){return null==a?null:a.key},s=function(a,c,d,e,f,g){if(d===e);else if(null!=d&&d.type===b&&e.type===b)d.name!==e.name&&(c.nodeValue=e.name);else if(null==d||d.name!==e.name)c=a.insertBefore(q(e=v(e),f,g),c),null!=d&&a.removeChild(d.node);else{var h,k,l,m,n=d.props,o=e.props,t=d.children,u=e.children,w=0,x=0,y=t.length-1,z=u.length-1;for(var A in g=g||"svg"===e.name,j(n,o))("value"===A||"selected"===A||"checked"===A?c[A]:n[A])!==o[A]&&p(c,A,n[A],o[A],f,g);for(;x<=z&&w<=y&&null!=(l=r(t[w]))&&l===r(u[x]);)s(c,t[w].node,t[w],u[x]=v(u[x++],t[w++]),f,g);for(;x<=z&&w<=y&&null!=(l=r(t[y]))&&l===r(u[z]);)s(c,t[y].node,t[y],u[z]=v(u[z--],t[y--]),f,g);if(w>y)for(;x<=z;)c.insertBefore(q(u[x]=v(u[x++]),f,g),(k=t[w])&&k.node);else if(x>z)for(;w<=y;)c.removeChild(t[w++].node);else{for(var A=w,B={},C={};A<=y;A++)null!=(l=t[A].key)&&(B[l]=t[A]);for(;x<=z;){if(l=r(k=t[w]),m=r(u[x]=v(u[x],k)),C[l]||null!=m&&m===r(t[w+1])){null==l&&c.removeChild(k.node),w++;continue}null==m||1===d.type?(null==l&&(s(c,k&&k.node,k,u[x],f,g),x++),w++):(l===m?(s(c,k.node,k,u[x],f,g),C[m]=!0,w++):null==(h=B[m])?s(c,k&&k.node,null,u[x],f,g):(s(c,c.insertBefore(h.node,k&&k.node),h,u[x],f,g),C[m]=!0),x++)}for(;w<=y;)null==r(k=t[w++])&&c.removeChild(k.node);for(var A in B)null==C[A]&&c.removeChild(B[A].node)}}return e.node=c},t=function(c,a){for(var b in c)if(c[b]!==a[b])return!0;for(var b in a)if(c[b]!==a[b])return!0},u=function(a){return"object"===o(a)?a:x(a)},v=function(b,c){return b.type===a?((!c||c.type!==a||t(c.lazy,b.lazy))&&((c=u(b.lazy.view(b.lazy))).lazy=b.lazy),c):b},w=function(a,b,c,d,e,f){return{name:a,props:b,children:c,node:d,type:f,key:e}},x=function(a,e){return w(a,c,d,e,void 0,b)},y=function(a){return a.nodeType===b?x(a.nodeValue,a):w(a.nodeName.toLowerCase(),c,e.call(a.childNodes,y),a,void 0,1)};return{h:function h(a,b){for(var d,e=[],g=[],h=arguments.length;2<h--;)e.push(arguments[h]);for(;0<e.length;)if(f(d=e.pop()))for(var h=d.length;0<h--;)e.push(d[h]);else if(!1===d||!0===d||null==d);else g.push(u(d));return b=b||c,"function"==typeof a?a(b,g):w(a,b,g,void 0,b.key)},app:function app(a){var b={},c=!1,d=a.view,e=a.node,h=e&&y(e),i=a.subscriptions,j=[],l=function(a){o(this.actions[a.type],a)},m=function(a){return b!==a&&(b=a,i&&(j=n(j,k([i(b)]),o)),d&&!c&&g(p,c=!0)),b},o=(a.middleware||function(a){return a})(function(a,c){return"function"==typeof a?o(a(b,c)):f(a)?"function"==typeof a[0]||f(a[0])?o(a[0],"function"==typeof a[1]?a[1](c):a[1]):(k(a.slice(1)).map(function(a){a&&a[0](o,a[1])},m(a[0])),b):m(a)}),p=function(){c=!1,e=s(e.parentNode,e,h,h=u(d(b)),l)};o(a.init)}}}(),r=q.h,e=q.app,h=function(a){return function(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},d=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1],e=function(a){for(var b=arguments.length,c=Array(1<b?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];return c.some(function(b){return b===o(a)})};return d||(e(b,"string","number","function")||Array.isArray(b)?(d=b,b={}):e(b.View,"function")&&(d=b.View,b={})),r(a,b,d)}},s=h("a"),a=h("button"),t=h("code"),u=h("div"),v=h("footer"),w=h("h1"),x=h("h2"),y=h("h3"),z=h("header"),A=h("img"),B=h("input"),C=h("label"),D=h("li"),E=h("link"),F=h("main"),G=h("meta"),H=h("nav"),I=h("p"),p=h("pre"),J=h("script"),K=h("span"),L=h("title"),M=h("ul"),N={cookies:{},description:"adds a gdpr compliant information popup with minimal intrusion and complexity to your page.",gdpr:{allowAllCookiesButtonText:"Allow all",allowCookieButtonText:"Allow selected",cookieButtonText:"Awesome.",cookieText:"We are using the following cookies on this page",denyCookieButtonText:"Deny all",noCookieButtonText:"Awesome.",noCookieText:"This page does neither save, collect, nor share any personal data about you.",show:!0,title:"Magic Privacy Information"},logotext:"Gdpr",menu:[{text:"installation",to:"/#installation"},{text:"usage",to:"/#usage"},{text:"themes",to:"/#themes"},{text:"source",to:"/#source"}],pageClass:{},root:"/gdpr/",theme:"dark",title:"@magic-modules/gdpr",url:"/gdpr/"},O={listenPopState:function listenPopState(a,b){var c=function(c){return a(b,c)};return addEventListener("popstate",c),function(){return removeEventListener("popstate",c)}},mapClickToGo:function mapClickToGo(a){return a.preventDefault(),a}},P=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[];return v({class:"Footer"},[u({class:"Container"},[b,u({class:"Credits"},["made with a few bits of ",V({to:"https://github.com/magic/core",target:"_blank",rel:"noopener"},"magic")])]),"function"==typeof Q&&Q(a)])},Q=function(a){var b=a.gdpr,c=void 0===b?{}:b,d=a.cookies,e=void 0===d?[]:d,f=c.title,g=c.content,h=c.show,i=void 0===h||h,j=c.small,l=c.left,m=c.right,n=c.noCookieButtonText,o=c.noCookieText,p=c.allowCookieButtonText,q=c.allowAllCookiesButtonText,r=c.denyCookieButtonText;if(i)return e=Object.entries(e||{}),u({class:{Gdpr:!0,show:i,small:void 0!==j&&j,left:void 0!==l&&l,right:void 0!==m&&m}},[B({type:"checkbox",name:"show-hide",id:"show-hide",checked:!i}),u({class:"Container"},[f&&y(f),g&&I(g),e.length?[cookieText&&I(cookieText),M(e.sort(function(a){var b=k(a,2),c=b[0],d=b[1].required;return d?0:1}).map(function(a){var b=k(a,2),c=b[0],d=b[1],e=d.info,f=d.allowed;return D([B({type:"checkbox",title:"allow",checked:void 0!==f&&f,onchange:[aa.gdpr.allow,{name:c}]}),C([c,e&&[" - ",e]])])}))]:I(o),e.length?[C({class:"button",for:"show-hide",onclick:[aa.gdpr.close,{allowed:!0}]},q),C({class:"button",for:"show-hide",onclick:aa.gdpr.close},p),C({class:"button",for:"show-hide",onclick:[aa.gdpr.close,{allowed:!1}]},r)]:C({class:"button",for:"show-hide",onclick:aa.gdpr.close},n)])])},R=function(a){if("string"==typeof a)a={project:a};else if(!a.project)return;var b=a,c=b.project,d=void 0!==c&&c,e=b.branch,f=void 0===e?"master":e,g=b.host,h=void 0===g?"github":g,i=[["npm",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;return a&&{to:"https://www.npmjs.com/package/@".concat(a),src:"https://img.shields.io/npm/v/@".concat(a,".svg")}}],["travis",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;return a&&{to:"https://travis-ci.com/".concat(a),src:"https://img.shields.io/travis/com/".concat(a,"/").concat(f)}}],["appveyor",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;if(a){var b=a.split("/"),c=k(b,2),e=c[0],g=c[1];return e=e.replace(/-/g,""),{to:"https://ci.appveyor.com/project/".concat(e,"/").concat(g,"/branch/").concat(f),src:"https://img.shields.io/appveyor/ci/".concat(e,"/").concat(g,"/").concat(f,".svg")}}}],["coveralls",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;return{to:"https://coveralls.io/".concat(h,"/").concat(a),src:"https://img.shields.io/coveralls/".concat(h,"/").concat(a,"/").concat(f,".svg")}}],["greenkeeper",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;return a&&{to:"https://greenkeeper.io",src:"https://badges.greenkeeper.io/".concat(a,".svg")}}],["snyk",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;return a&&{to:"https://snyk.io/test/".concat(h,"/").concat(a),src:"https://img.shields.io/snyk/vulnerabilities/github/".concat(a,".svg")}}]].map(function(b){var c=k(b,2),d=c[0],e=c[1];return e(a[d])}).filter(function(b){return b.to&&b.src});return i.length?M({class:"GitBadges"},i.map(function(a){var b=a.to,c=a.src;return D([V({to:b},T({src:c}))])})):void 0},S=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[],c=a.logo,d=a.menu,e=a.logotext,f=i(a,["logo","menu","logotext"]);return c||d||e?z({class:"Header"},[(c||e)&&V({to:f.root,class:"Logo"},[c&&T(c),e&&K(e)]),d&&W({state:f,items:d}),b]):void 0},T=function(a){if("string"==typeof a&&(a={src:a}),!!a.src)return a.alt||(a.title?a.alt=a.title:(a.role="presentation",a.alt="")),A(a)},U=function(){0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};return a({class:"LightSwitch",onclick:aa.changeTheme})},V=function(a,b){var c=a.to,d=i(a,["to"]),e=d.href,f=d.text,g=d.nofollow,h=d.noreferrer,j=i(d,["href","text","nofollow","noreferrer"]);c=c||e||"",j.href=c;var k=c.startsWith("/");return k?j.onclick=[aa.go,O.mapClickToGo]:(j.target="_blank",j.rel="noopener",g&&(j.rel+=" nofollow"),h&&(j.rel+=" noreferrer")),s(j,[f,b])},W=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},b=a.items,c=a["class"],d=void 0===c?"Menu":c,e=a.collapse,g=a.state;if(b.length){var h=g.url||"";return g.hash&&!h.endsWith(g.hash)&&(h+="#".concat(g.hash)),H({className:d},M(b.map(function(a){return X(f({},a,{url:h,state:g,collapse:void 0===e||e}))})))}},X=function(a){var b=a.text,c=a.items,d=void 0===c?[]:c,e=a.url,g=a.state,h=a.parentTo,j=void 0===h?void 0:h,k=a.collapse,l=i(a,["text","items","url","state","parentTo","collapse"]),m=g.root;if(l.to||b){var n={class:{}},o=l.to;o.startsWith("/#")&&(o=o.substr(1));var p=l.to[0],q="/"===p||"-"===p||"#"===p;if(j&&q)if("-"===p||"#"===p)o=j+o;else{var u=o.split("/")[1];if(u){var v=j.endsWith("/".concat(u,"/"));!v&&q&&(o=j+o)}}("/"!==l.to&&e.endsWith(l.to)||l.to===e)&&(n["class"].active=!0);var r=o.startsWith(m);m&&q&&!r&&(o=m+o),l.to=o.replace(/\/\//g,"/");var s=[],t=e&&e.includes(l.to);return(d.length&&t||!k)&&(s=M(d.map(function(a){return X(f({parentTo:l.to,url:e,state:g,collapse:k},a))}))),D(n,[l.to?V(l,b):K(l,b),s])}},Y=function(a){var b=a.page,c=a.state;b=b?b(c):"404 - not found";var d={id:"Magic",class:c.pageClass};return F(d,u({class:{Wrapper:!0}},$({state:c,page:b})))},Z=function(b,c){"string"==typeof b?b={content:b}:c&&(b=f({content:c},b));var d=b,g=d.content,h=d.lines;return u({class:{Pre:!0,lines:!(void 0!==h)||h}},[u({class:"menu"},[a({onclick:[aa.pre.clip,function(a){return{e:a,content:g}}]},"copy")]),p(_.pre.format(g))])},$=function(a){var b=a.page,c=a.state;return[S(c),u({class:"Page"},b),P(c)]},_={pre:function(){var a="\nlet this long package float\ngoto private class if short\nwhile protected with debugger case\ncontinue volatile interface\n\ninstanceof super synchronized throw\nextends final throws\ntry import double enum\n\nboolean abstract function\nimplements typeof transient break\ndefault do static void\n\nint new async native switch\nelse delete null public var\nawait byte finally catch\nin return for get const char\nmodule exports require\n".trim().split(/\b/g).map(function(a){return a.trim()}),c="\nArray Object String Number RegExp Null Symbol\nSet WeakSet Map WeakMap\nsetInterval setTimeout\nPromise\nJSON\nInt8Array Uint8Array Uint8ClampedArray\nInt16Array Uint16Array\nInt32Array Uint32Array\nFloat32Array Float64Array\n".trim().split(/\b/g).map(function(a){return a.trim()}),d=["true","false"],e=function(b){if("string"!=typeof b)return b;var e=b.split(/\b/);return b=e.map(function(b,f){if(""!==b){var g="";return"state"===b?g="state":"actions"===b?g="actions":e[f+1]&&e[f+1].includes(":")?g="colon":a.includes(b)?g="keyword":c.includes(b)?g="builtin":d.includes(b)?g="boolean":"."===e[f-1]?g="property":"."===e[f+1]&&(g="object"),g&&(b=K({class:g},b)),b}}),b},f=/([a-zA-Z0-9:+._-]+@[a-zA-Z0-9._-]+)/g,g=function(a){return a.split(f).map(function(a){if(f.test(a)){var b=a.startsWith("mailto:")?a:"mailto:".concat(a),c=a.replace("mailto:","");return V({class:"email",to:b},c)}return e(a)})},h=function(a,b){return[m(a.substring(0,b)),m(a.substring(b))]},i=function(a){return a.split(/(?= )/).map(function(a){if(!a.includes("://"))return m(a);var b=a.split("://"),c=k(b,2),d=c[0],e=c[1];return d.match(/[a-z]/g)?a:V({to:a},a)})},j=function(a){return a.includes("://")&&!a.includes("@")?i(a):g(a)},l=function(a){var c=a.replace(/"/g,"'"),d=c.split("'"),f=b(d),g=f[0],h=f[1],i=f.slice(2),k=i;1===k.length?k=m(k[0]):1<k.length&&(k=m(k.join("'")));var l=[];return l="undefined"==typeof h?e(a):[e(g),K({class:"string"},["'",j(h),"'"]),k],l},m=function(a){var b=a.indexOf("//"),c=a.trim();if(c.startsWith("//")){for(var d=a.search(/\S|$/),e="",f=0;f<d;f++)e+=" ";return c.startsWith("// ")||(a="".concat(e,"// ").concat(c.substr(2))),K({class:"comment"},[e,"// ",m(c.substring(3))])}return-1<b&&":"!==a[b-1]?h(a,b):2<a.indexOf("://")?i(a):a.indexOf("@")&&a.includes(".")&&!a.trim().includes(" ")?g(a):l(a)},n=function(a){return t({class:"line"},m(a))};return{format:function format(a){return a.trim().split("\n").map(n)}}}()},aa={changeTheme:function changeTheme(a){return f({},a,{pageClass:f({},a.pageClass,{light:"dark"===a.theme}),theme:"dark"===a.theme?"light":"dark"})},gdpr:{allow:function allow(a,b){return a.cookies[b.name].allowed=!0,f({},a)},close:function close(a,b){var c=b.allowed,d=a.cookies;return"boolean"==typeof c&&Object.entries(d).forEach(function(a){var b=k(a,2),e=b[0],g=b[1];d[e]=f({},g,{allowed:c})}),[f({},a,{gdpr:f({},a.gdpr,{show:!1}),cookies:d}),[ba.gdpr.writeLocalStorage,{key:"magic-gdpr",value:{cookies:a.cookies||[],show:!1}}]]},load:function load(a){return[a,[ba.gdpr.readLocalStorage,{key:"magic-gdpr",action:aa.gdpr.show}]]},show:function show(a,b){return f({},a,{gdpr:f({},a.gdpr,{},b.value)})}},go:function go(a,b){var c=b.currentTarget.href.replace(window.location.origin,""),d=c.split("#"),e=k(d,2),g=e[0],h=e[1],i=void 0===h?"":h;return g===a.url&&i===a.hash?a:(window.history.pushState({url:g,hash:i},"",c),i?window.location.hash=i:window.scroll(0,0),f({},a,{url:g,hash:i,prev:a.url}))},pop:function pop(a,b){var c=window.location,d=c.pathname,e=c.hash;return e=e.substring(1),b.state&&(d=b.state.url,e=b.state.hash),e?window.location.hash=e:window.scroll(0,0),f({},a,{url:d,hash:e})},pre:{clip:function clip(a,b){var c=b.content;if("undefined"!=typeof document&&"function"==typeof document.execCommand){var d=document.createElement("textarea");d.id="copy",d.innerHTML=c,document.body.appendChild(d);var e=document.getElementById("copy");e.select(),document.execCommand("copy"),document.body.removeChild(e)}return a}}},ba={gdpr:{readLocalStorage:function readLocalStorage(a,b){var c=b.key,d=b.action,e=window.localStorage||{},f=e[c];"undefined"!=typeof f&&(f=JSON.parse(f)),a(d,{key:c,value:f})},writeLocalStorage:function writeLocalStorage(a,b){var c=b.key,d=b.value,e=window.localStorage||{};e[c]=JSON.stringify(d)}}},ca={"/gdpr/":function gdpr(a){return[w(a.title),I(["this is the ",V({to:"https://github.com/magic-modules"},"@magic-modules")," Gdpr component. ",a.description]),R("magic-modules/gdpr"),x({id:"installation"},"installation:"),Z("npm install @magic-modules/gdpr"),x({id:"usage"},"usage:"),I("gdpr gets loaded automatically after being installed."),I("to configure it, add the object below to /src/app.mjs"),Z("\n// /src/app.mjs\nexport const state = {\n  gdpr: {\n    show: false, // || true\n    small: false, // if true, component has 30% of screen.\n    left: false, // popup is positioned to the left if true\n    right: false, // popup is positioned to the right if true\n    title: 'Main popup title',\n    content: [p('text of cookie'), p('popup'),\n    noCookieText: 'String or Array of Magic modules',\n    noCookieButtonText: 'String or Array of Magic modules',\n    cookieButtonText: 'String or Array of Magic modules',\n    allowAllCookiesButtonText: 'String or Array of Magic modules',\n    allowCookieButtonText: 'String or Array of Magic modules',\n    denyCookieButtonText: 'String or Array of Magic modules',\n    cookieText: 'String or Array of Magic modules',\n  },\n  cookies: [\n    ['name', { info: 'cookie description' }],\n    ['cookie 2', { info: [h3('cookie title', 'cookie content'] }],\n  ],\n})\n"),x({id:"source"},"source"),I(["the source for this page is in the ",V({to:"https://github.com/magic-modules/gdpr/tree/master/example"},"example directory")," and gets built and published to github using ",V({to:"https://github.com/magic/core"},"@magic/core")]),U(a)]},"/gdpr/404/":function gdpr404(){return u("404 - not found")}};e({init:function init(){return aa.gdpr.load(f({},N,{url:window.location.pathname}))},subscriptions:function subscriptions(){return[[O.listenPopState,aa.pop]]},view:function view(a){var b=ca[a.url]?a.url:"/404/",c=ca[b];return a.pages&&a.pages[b]&&Object.keys(a.pages[b]).forEach(function(c){a[c]=a.pages[b][c]}),Y({page:c,state:a})},node:document.getElementById("Magic")});