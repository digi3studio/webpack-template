!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=62)}({0:function(e,t){e.exports=React},1:function(e,t){e.exports=ReactRedux},3:function(e,t){e.exports=ReactDOM},4:function(e,t){e.exports=Redux},49:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),u=n.n(o),i=n(3),c=n.n(i),a=n(55),l=n(56),f=n(1),s=(n.n(f),n(4)),p=(n.n(s),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),h=function(){function e(){r(this,e);var t=this.getDefaultState();this.store=n.i(s.createStore)(n.i(l.a)(t)),this.render()}return p(e,[{key:"getDefaultState",value:function(){var e=Object.assign({},{hello:"world"},window.__PRELOADED_STATE__||{});return delete window.__PRELOADED_STATE__,console.log(e),e}},{key:"render",value:function(){c.a.render(u.a.createElement(f.Provider,{store:this.store},u.a.createElement(a.a,null)),document.getElementById("root"))}}]),e}();t.default=h,new h},55:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),c=n.n(i),a=n(1),l=(n.n(a),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),f=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),l(t,[{key:"render",value:function(){var e=this;return c.a.createElement("div",{onClick:function(t){e.props.onClick(t)}},this.props.hello,"!!!")}}]),t}(c.a.Component);t.a=n.i(a.connect)(function(e){return{hmr:e.hmr,hello:e.hello}},function(e){return{onClick:function(){e({type:"CHANGE_HELLO",payload:"click"})}}})(f)},56:function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,n=arguments[1];switch(n.type){case"HOT_RELOAD":return Object.assign({},t,{hmr:Math.random()});case"CHANGE_HELLO":return t.hello==n.payload?t:Object.assign({},t,{hello:n.payload});default:return t}}}t.a=r},62:function(e,t,n){e.exports=n(49)}});