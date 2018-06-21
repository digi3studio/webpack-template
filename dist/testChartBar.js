!function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var r={};t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=63)}({0:function(e,t){e.exports=React},1:function(e,t){e.exports=ReactRedux},3:function(e,t){e.exports=ReactDOM},4:function(e,t){e.exports=Redux},40:function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=r(0),l=r.n(i),u=r(1),s=(r.n(u),function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}()),f=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,e),s(t,[{key:"render",value:function(){var e=this,t=Math.round(460/this.props.data.length),r=this.props.data.map(function(e){return parseFloat(e.value)}),a=Math.max.apply(Math,n(r)),o=r.map(function(e){var t=125*e/a,r=20-t;r>-5&&(r=-5);var n=-t-5;return n>-20&&(n=-20),{h:t,labelY:r,valueY:n}}),c=["#616c9e","#505b8a","#253b70","#132b61"];this.props.data.forEach(function(e,t){console.log(e.color),void 0!==e.color&&(c[t]=e.color)}),console.log(c);var i=o.map(function(e,r){return l.a.createElement("g",{className:"bar",key:"bar"+r},l.a.createElement("rect",{x:t*r,y:-e.h,width:t,height:e.h,fill:c[r]||c[r%c.length]}))}),u=o.map(function(r,n){return l.a.createElement("g",{className:"label",key:"label"+n,transform:"translate(0, "+r.labelY+")"},l.a.createElement("text",{textAnchor:"middle",x:t/2+t*n},e.props.data[n].name))}),s=o.map(function(r,n){return l.a.createElement("g",{className:"value",key:"value"+n,transform:"translate(0, "+r.valueY+")"},l.a.createElement("text",{textAnchor:"middle",x:t/2+t*n},e.props.data[n].value+e.props.unit,l.a.createElement("tspan",{className:"superscript",dy:"-10"},e.props.source)))});return l.a.createElement("div",null,l.a.createElement("svg",{className:this.props.inViewport?"on":"off",width:460,height:180,viewBox:"0 0 460 180"},l.a.createElement("g",{className:"bg",strokeWidth:1,stroke:"#b2bfcb"},l.a.createElement("path",{d:"M 0 0.5 l 275 0"}),l.a.createElement("path",{d:"M 0 44.5 l 275 0"}),l.a.createElement("path",{d:"M 0 88.5 l 275 0"}),l.a.createElement("path",{d:"M 0 132.5 l 275 0"})),l.a.createElement("rect",{className:"base-bar",y:"175",width:460,height:"5",fill:"#f17628"}),l.a.createElement("g",{className:"baseline",transform:"translate(0, 169)"},l.a.createElement("g",{className:"bars"},i),l.a.createElement("g",{className:"labels",fill:"#FFFFFF"},u),l.a.createElement("g",{className:"values",fill:"#002a53"},s))),l.a.createElement("div",{className:"title"},this.props.title))}}]),t}(l.a.Component);t.a=r.i(u.connect)(function(e){return Object.assign({},e)},function(e){return{}})(f)},44:function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,r=arguments[1];switch(r.type){case"HOT_RELOAD":return Object.assign({},t,{hmr:Math.random()});case"CHANGE_IN_VIEWPORT":return Object.assign({},t,{inViewport:r.payload});default:return t}}}t.a=n},50:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),o=r.n(a),c=r(3),i=r.n(c),l=r(40),u=r(44),s=r(1),f=(r.n(s),r(4)),p=(r.n(f),function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}()),m=function(){function e(){n(this,e);var t=document.querySelector(".bar-chart-root"),a=Object.assign({title:t.getAttribute("data-title"),unit:t.getAttribute("data-unit"),source:t.getAttribute("data-source")},JSON.parse(t.getAttribute("data-chart")));this.store=r.i(f.createStore)(r.i(u.a)(a)),this.render(t)}return p(e,[{key:"render",value:function(e){var t=this;i.a.render(o.a.createElement(s.Provider,{store:this.store},o.a.createElement(l.a,null)),e),InViewport(e,function(e){setTimeout(function(){t.store.dispatch({type:"CHANGE_IN_VIEWPORT",payload:!0})},500)})}}]),e}();t.default=m,window.main=new m},63:function(e,t,r){e.exports=r(50)}});