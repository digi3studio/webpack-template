!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=61)}([function(t,e){t.exports=React},function(t,e){t.exports=ReactRedux},function(t,e){function n(t){var e=t*t;return t<4/11?7.5625*e:t<8/11?9.075*e-9.9*t+3.4:t<.9?4356/361*e-35442/1805*t+16061/1805:10.8*t*t-20.52*t+10.72}t.exports=n},function(t,e){t.exports=ReactDOM},function(t,e){t.exports=Redux},function(t,e,n){"use strict";function r(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var a=n(0),u=n.n(a),l=n(25),c=n.n(l),p=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),h=function(t){function e(t){i(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.timeoutId=null,n.step=n.step.bind(n),n.state={value:0},n.startStep(),n}return s(e,t),p(e,[{key:"componentWillReceiveProps",value:function(t){t.value!==this.props.value&&this.startStep()}},{key:"startStep",value:function(){var t=this;clearTimeout(this.timeoutId),this.timeoutId=setTimeout(function(){t.start=null,t.iv=null,t.dv=null,window.requestAnimationFrame(t.step)},1e3*this.props.delay)}},{key:"step",value:function(t){null===this.start&&(this.start=t),null===this.iv&&(this.iv=this.state.value),null===this.dv&&(this.dv=this.props.value-this.state.value);var e=t-this.start;if(e>=this.props.duration)return void this.setState({value:this.props.value});var n=this.props.ease(e/this.props.duration);this.setState({value:n*this.dv+this.iv}),window.requestAnimationFrame(this.step)}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeoutId)}},{key:"render",value:function(){var t=this.props,n=(t.value,t.unit),i=(t.ease,t.delay,t.duration,r(t,["value","unit","ease","delay","duration"])),o=this.props.format(this.state.value);if(":"===n){var s=o%60;o=Math.floor(o/60)+":"+(s<10?"0"+s:s),n=""}return"svg"===this.props.type?e.renderSVG(i,o,n):e.renderSpan(i,o,n)}}],[{key:"renderSVG",value:function(t,e,n){return u.a.createElement("text",t,e+n)}},{key:"renderSpan",value:function(t,e,n){return u.a.createElement("span",t,e+n)}}]),e}(u.a.Component);e.a=h,h.defaultProps={speed:500,duration:1e3,delay:0,type:"span",format:function(t){return String(Math.round(10*t)/10)},ease:c.a.quartOut,unit:""}},function(t,e,n){!function(n,r){function i(t){return!!(""===t||t&&t.charCodeAt&&t.substr)}function o(t){return f?f(t):"[object Array]"===g.call(t)}function s(t){return t&&"[object Object]"===g.call(t)}function a(t,e){var n;t=t||{},e=e||{};for(n in e)e.hasOwnProperty(n)&&null==t[n]&&(t[n]=e[n]);return t}function u(t,e,n){var r,i,o=[];if(!t)return o;if(h&&t.map===h)return t.map(e,n);for(r=0,i=t.length;r<i;r++)o[r]=e.call(n,t[r],r,t);return o}function l(t,e){return t=Math.round(Math.abs(t)),isNaN(t)?e:t}function c(t){var e=p.settings.currency.format;return"function"==typeof t&&(t=t()),i(t)&&t.match("%v")?{pos:t,neg:t.replace("-","").replace("%v","-%v"),zero:t}:t&&t.pos&&t.pos.match("%v")?t:i(e)?p.settings.currency.format={pos:e,neg:e.replace("%v","-%v"),zero:e}:e}var p={};p.version="0.4.1",p.settings={currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}};var h=Array.prototype.map,f=Array.isArray,g=Object.prototype.toString,d=p.unformat=p.parse=function(t,e){if(o(t))return u(t,function(t){return d(t,e)});if("number"==typeof(t=t||0))return t;e=e||p.settings.number.decimal;var n=new RegExp("[^0-9-"+e+"]",["g"]),r=parseFloat((""+t).replace(/\((.*)\)/,"-$1").replace(n,"").replace(e,"."));return isNaN(r)?0:r},m=p.toFixed=function(t,e){e=l(e,p.settings.number.precision);var n=Math.pow(10,e);return(Math.round(p.unformat(t)*n)/n).toFixed(e)},b=p.formatNumber=p.format=function(t,e,n,r){if(o(t))return u(t,function(t){return b(t,e,n,r)});t=d(t);var i=a(s(e)?e:{precision:e,thousand:n,decimal:r},p.settings.number),c=l(i.precision),h=t<0?"-":"",f=parseInt(m(Math.abs(t||0),c),10)+"",g=f.length>3?f.length%3:0;return h+(g?f.substr(0,g)+i.thousand:"")+f.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+i.thousand)+(c?i.decimal+m(Math.abs(t),c).split(".")[1]:"")},y=p.formatMoney=function(t,e,n,r,i,h){if(o(t))return u(t,function(t){return y(t,e,n,r,i,h)});t=d(t);var f=a(s(e)?e:{symbol:e,precision:n,thousand:r,decimal:i,format:h},p.settings.currency),g=c(f.format);return(t>0?g.pos:t<0?g.neg:g.zero).replace("%s",f.symbol).replace("%v",b(Math.abs(t),l(f.precision),f.thousand,f.decimal))};p.formatColumn=function(t,e,n,r,h,f){if(!t)return[];var g=a(s(e)?e:{symbol:e,precision:n,thousand:r,decimal:h,format:f},p.settings.currency),m=c(g.format),y=m.pos.indexOf("%s")<m.pos.indexOf("%v"),x=0;return u(u(t,function(t,e){if(o(t))return p.formatColumn(t,g);t=d(t);var n=t>0?m.pos:t<0?m.neg:m.zero,r=n.replace("%s",g.symbol).replace("%v",b(Math.abs(t),l(g.precision),g.thousand,g.decimal));return r.length>x&&(x=r.length),r}),function(t,e){return i(t)&&t.length<x?y?t.replace(g.symbol,g.symbol+new Array(x-t.length+1).join(" ")):new Array(x-t.length+1).join(" ")+t:t})},void 0!==t&&t.exports&&(e=t.exports=p),e.accounting=p}()},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=n(0),a=n.n(s),u=n(6),l=(n.n(u),n(5)),c=n(1),p=(n.n(c),function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}()),h=function(t){function e(){return r(this,e),i(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),p(e,[{key:"render",value:function(){return a.a.createElement("div",{className:"item "+(this.props.inViewport?"on":"off")},a.a.createElement("div",{className:"icon"}),a.a.createElement("h3",null,a.a.createElement(l.a,{value:this.props.inViewport?this.props.value:0,format:function(t){return u.accounting.formatNumber(t)}}),a.a.createElement("sup",null,this.props.source)),a.a.createElement("div",{className:"title"},this.props.title),a.a.createElement("div",{className:"description"},this.props.description))}}]),e}(a.a.Component);e.a=n.i(c.connect)(function(t){return{hmr:t.hmr,inViewport:t.inViewport,value:t.value,source:t.source,description:t.description,title:t.title||""}},function(t){return{}})(h)},function(t,e){function n(t){var e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}t.exports=n},function(t,e){function n(t){var e=1.70158;return t*t*((e+1)*t-e)}t.exports=n},function(t,e){function n(t){var e=1.70158;return--t*t*((e+1)*t+e)+1}t.exports=n},function(t,e,n){function r(t){return t<.5?.5*(1-i(1-2*t)):.5*i(2*t-1)+.5}var i=n(2);t.exports=r},function(t,e,n){function r(t){return 1-i(1-t)}var i=n(2);t.exports=r},function(t,e){function n(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}t.exports=n},function(t,e){function n(t){return 1-Math.sqrt(1-t*t)}t.exports=n},function(t,e){function n(t){return Math.sqrt(1- --t*t)}t.exports=n},function(t,e){function n(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}t.exports=n},function(t,e){function n(t){return t*t*t}t.exports=n},function(t,e){function n(t){var e=t-1;return e*e*e+1}t.exports=n},function(t,e){function n(t){return t<.5?.5*Math.sin(13*Math.PI/2*2*t)*Math.pow(2,10*(2*t-1)):.5*Math.sin(-13*Math.PI/2*(2*t-1+1))*Math.pow(2,-10*(2*t-1))+1}t.exports=n},function(t,e){function n(t){return Math.sin(13*t*Math.PI/2)*Math.pow(2,10*(t-1))}t.exports=n},function(t,e){function n(t){return Math.sin(-13*(t+1)*Math.PI/2)*Math.pow(2,-10*t)+1}t.exports=n},function(t,e){function n(t){return 0===t||1===t?t:t<.5?.5*Math.pow(2,20*t-10):-.5*Math.pow(2,10-20*t)+1}t.exports=n},function(t,e){function n(t){return 0===t?t:Math.pow(2,10*(t-1))}t.exports=n},function(t,e){function n(t){return 1===t?t:1-Math.pow(2,-10*t)}t.exports=n},function(t,e,n){t.exports={backInOut:n(8),backIn:n(9),backOut:n(10),bounceInOut:n(11),bounceIn:n(12),bounceOut:n(2),circInOut:n(13),circIn:n(14),circOut:n(15),cubicInOut:n(16),cubicIn:n(17),cubicOut:n(18),elasticInOut:n(19),elasticIn:n(20),elasticOut:n(21),expoInOut:n(22),expoIn:n(23),expoOut:n(24),linear:n(26),quadInOut:n(27),quadIn:n(28),quadOut:n(29),quartInOut:n(30),quartIn:n(31),quartOut:n(32),quintInOut:n(33),quintIn:n(34),quintOut:n(35),sineInOut:n(36),sineIn:n(37),sineOut:n(38)}},function(t,e){function n(t){return t}t.exports=n},function(t,e){function n(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)}t.exports=n},function(t,e){function n(t){return t*t}t.exports=n},function(t,e){function n(t){return-t*(t-2)}t.exports=n},function(t,e){function n(t){return t<.5?8*Math.pow(t,4):-8*Math.pow(t-1,4)+1}t.exports=n},function(t,e){function n(t){return Math.pow(t,4)}t.exports=n},function(t,e){function n(t){return Math.pow(t-1,3)*(1-t)+1}t.exports=n},function(t,e){function n(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}t.exports=n},function(t,e){function n(t){return t*t*t*t*t}t.exports=n},function(t,e){function n(t){return--t*t*t*t*t+1}t.exports=n},function(t,e){function n(t){return-.5*(Math.cos(Math.PI*t)-1)}t.exports=n},function(t,e){function n(t){var e=Math.cos(t*Math.PI*.5);return Math.abs(e)<1e-14?1:1-e}t.exports=n},function(t,e){function n(t){return Math.sin(t*Math.PI/2)}t.exports=n},function(t,e){t.exports=InViewport},function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var a=n(0),u=n.n(a),l=n(1),c=(n.n(l),function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}()),p=function(t){function e(){return i(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return s(e,t),c(e,[{key:"render",value:function(){var t=this,e=Math.round(460/this.props.data.length),n=this.props.data.map(function(t){return parseFloat(t.value)}),i=Math.max.apply(Math,r(n)),o=n.map(function(t){var e=147*t/i,n=20-e;n>-5&&(n=-5);var r=-e-5;return r>-20&&(r=-20),{h:e,labelY:n,valueY:r}}),s=["#616c9e","#505b8a","#253b70","#132b61"];this.props.data.forEach(function(t,e){console.log(t.color),void 0!==t.color&&(s[e]=t.color)}),console.log(s);var a=o.map(function(t,n){return u.a.createElement("g",{className:"bar",key:"bar"+n},u.a.createElement("rect",{x:e*n,y:-t.h,width:e,height:t.h,fill:s[n]||s[n%s.length]}))}),l=o.map(function(n,r){return u.a.createElement("g",{className:"label",key:"label"+r,transform:"translate(0, "+n.labelY+")"},u.a.createElement("text",{textAnchor:"middle",x:e/2+e*r},t.props.data[r].name))}),c=o.map(function(n,r){return u.a.createElement("g",{className:"value",key:"value"+r,transform:"translate(0, "+n.valueY+")"},u.a.createElement("text",{textAnchor:"middle",x:e/2+e*r},t.props.data[r].value+t.props.unit,u.a.createElement("tspan",{className:"superscript",dy:"-10"},t.props.source)))});return u.a.createElement("div",null,u.a.createElement("svg",{className:this.props.inViewport?"on":"off",width:460,height:180,viewBox:"0 0 460 180"},u.a.createElement("g",{className:"bg",strokeWidth:1,stroke:"#b2bfcb"},u.a.createElement("path",{d:"M 0 0.5 l 275 0"}),u.a.createElement("path",{d:"M 0 44.5 l 275 0"}),u.a.createElement("path",{d:"M 0 88.5 l 275 0"}),u.a.createElement("path",{d:"M 0 132.5 l 275 0"})),u.a.createElement("rect",{className:"base-bar",y:"175",width:460,height:"5",fill:"#f17628"}),u.a.createElement("g",{className:"baseline",transform:"translate(0, 169)"},u.a.createElement("g",{className:"bars"},a),u.a.createElement("g",{className:"labels",fill:"#FFFFFF"},l),u.a.createElement("g",{className:"values",fill:"#002a53"},c))),u.a.createElement("div",{className:"title"},this.props.title))}}]),e}(u.a.Component);e.a=n.i(l.connect)(function(t){return Object.assign({},t)},function(t){return{}})(p)},,,,function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,n=arguments[1];switch(n.type){case"HOT_RELOAD":return Object.assign({},e,{hmr:Math.random()});case"CHANGE_IN_VIEWPORT":return Object.assign({},e,{inViewport:n.payload});default:return e}}}e.a=r},,,,function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=n.n(i),s=n(3),a=n.n(s),u=n(1),l=(n.n(u),n(4)),c=(n.n(l),n(39)),p=n.n(c),h=n(44),f=n(7),g=n(54),d=n(40),m=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),b=function(){function t(e){var i=this;r(this,t);var o={value:parseFloat(e.getAttribute("data-value")),source:e.getAttribute("data-source"),description:e.getAttribute("data-description"),title:e.getAttribute("data-title")};this.store=this.store||n.i(l.createStore)(n.i(h.a)(o)),p()(e,function(t){setTimeout(function(){i.store.dispatch({type:"CHANGE_IN_VIEWPORT",payload:!0})},500)}),this.render(e)}return m(t,[{key:"render",value:function(t){a.a.render(o.a.createElement(u.Provider,{store:this.store},o.a.createElement(f.a,null)),t)}}]),t}(),y=function(){function t(e){var i=this;r(this,t);var o={title:e.getAttribute("data-title"),description:e.getAttribute("data-description"),value:e.getAttribute("data-value"),unit:e.getAttribute("data-unit"),source:e.getAttribute("data-source")};this.store=this.store||n.i(l.createStore)(n.i(h.a)(o)),p()(e,function(t){setTimeout(function(){i.store.dispatch({type:"CHANGE_IN_VIEWPORT",payload:!0})},500)}),this.render(e)}return m(t,[{key:"render",value:function(t){a.a.render(o.a.createElement(u.Provider,{store:this.store},o.a.createElement(g.a,null)),t)}}]),t}(),x=function(){function t(e,i,o){var s=this;r(this,t),this.store=this.store||n.i(l.createStore)(n.i(h.a)(i)),this.render(e,o),p()(e,function(t){setTimeout(function(){s.store.dispatch({type:"CHANGE_IN_VIEWPORT",payload:!0})},500)})}return m(t,[{key:"render",value:function(t,e){a.a.render(o.a.createElement(u.Provider,{store:this.store},o.a.createElement(e,null)),t)}}]),t}(),v=function(){function t(){r(this,t),this.setup()}return m(t,[{key:"setup",value:function(){this.charts=[];for(var t=document.querySelectorAll(".info-graphic-root"),e=0;e<t.length;e++)this.charts.push(new b(t[e]));for(var n=document.querySelectorAll(".horizontal-bar-root"),r=0;r<n.length;r++)this.charts.push(new y(n[r]));for(var i=document.querySelectorAll(".bar-chart-root"),o=0;o<i.length;o++){var s=Object.assign({title:i[o].getAttribute("data-title"),unit:i[o].getAttribute("data-unit"),source:i[o].getAttribute("data-source")},JSON.parse(i[o].getAttribute("data-chart")));this.charts.push(new x(i[o],s,d.a))}}}]),t}();window.main=new v},,,,,,function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=n(0),a=n.n(s),u=n(1),l=(n.n(u),n(57)),c=n.n(l),p=n(5),h=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=function(t){function e(){return r(this,e),i(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),h(e,[{key:"render",value:function(){return a.a.createElement("div",{className:"item "+(this.props.inViewport?"on":"off")},a.a.createElement("div",{className:"title"},this.props.title),a.a.createElement("div",{className:"icon"}),a.a.createElement("div",{className:"description",dangerouslySetInnerHTML:{__html:c()(this.props.description||"")}}),a.a.createElement("div",{className:"value"},a.a.createElement(p.a,{value:this.props.inViewport?this.props.value:0,unit:this.props.unit}),a.a.createElement("sup",null,this.props.source)),a.a.createElement("div",{className:"bar"},a.a.createElement("div",{style:{width:String(parseFloat(this.props.inViewport?this.props.value:0))+"%"}})))}}]),e}(a.a.Component);e.a=n.i(u.connect)(function(t){return{hmr:t.hmr,inViewport:t.inViewport,title:t.title,description:t.description,value:t.value,unit:t.unit,source:t.source}},function(t){return{}})(f)},,,function(t,e,n){(function(e){!function(e){"use strict";function n(t){this.tokens=[],this.tokens.links={},this.options=t||f.defaults,this.rules=g.normal,this.options.gfm&&(this.options.tables?this.rules=g.tables:this.rules=g.gfm)}function r(t,e){if(this.options=e||f.defaults,this.links=t,this.rules=d.normal,this.renderer=this.options.renderer||new i,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=d.breaks:this.rules=d.gfm:this.options.pedantic&&(this.rules=d.pedantic)}function i(t){this.options=t||{}}function o(){}function s(t){this.tokens=[],this.token=null,this.options=t||f.defaults,this.options.renderer=this.options.renderer||new i,this.renderer=this.options.renderer,this.renderer.options=this.options}function a(t,e){return t.replace(e?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function u(t){return t.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,function(t,e){return e=e.toLowerCase(),"colon"===e?":":"#"===e.charAt(0)?"x"===e.charAt(1)?String.fromCharCode(parseInt(e.substring(2),16)):String.fromCharCode(+e.substring(1)):""})}function l(t,e){return t=t.source,e=e||"",{replace:function(e,n){return n=n.source||n,n=n.replace(/(^|[^\[])\^/g,"$1"),t=t.replace(e,n),this},getRegex:function(){return new RegExp(t,e)}}}function c(t,e){return m[" "+t]||(/^[^:]+:\/*[^\/]*$/.test(t)?m[" "+t]=t+"/":m[" "+t]=t.replace(/[^\/]*$/,"")),t=m[" "+t],"//"===e.slice(0,2)?t.replace(/:[\s\S]*/,":")+e:"/"===e.charAt(0)?t.replace(/(:\/*[^\/]*)[\s\S]*/,"$1")+e:t+e}function p(){}function h(t){for(var e,n,r=1;r<arguments.length;r++){e=arguments[r];for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t}function f(t,e,r){if(void 0===t||null===t)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof t)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected");if(r||"function"==typeof e){r||(r=e,e=null),e=h({},f.defaults,e||{});var i,o,u=e.highlight,l=0;try{i=n.lex(t,e)}catch(t){return r(t)}o=i.length;var c=function(t){if(t)return e.highlight=u,r(t);var n;try{n=s.parse(i,e)}catch(e){t=e}return e.highlight=u,t?r(t):r(null,n)};if(!u||u.length<3)return c();if(delete e.highlight,!o)return c();for(;l<i.length;l++)!function(t){"code"!==t.type?--o||c():u(t.text,t.lang,function(e,n){return e?c(e):null==n||n===t.text?--o||c():(t.text=n,t.escaped=!0,void(--o||c()))})}(i[l])}else try{return e&&(e=h({},f.defaults,e)),s.parse(n.lex(t,e),e)}catch(t){if(t.message+="\nPlease report this to https://github.com/markedjs/marked.",(e||f.defaults).silent)return"<p>An error occurred:</p><pre>"+a(t.message+"",!0)+"</pre>";throw t}}var g={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:p,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:p,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,table:p,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,paragraph:/^([^\n]+(?:\n?(?!hr|heading|lheading| {0,3}>|tag)[^\n]+)+)/,text:/^[^\n]+/};g._label=/(?:\\[\[\]]|[^\[\]])+/,g._title=/(?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))/,g.def=l(g.def).replace("label",g._label).replace("title",g._title).getRegex(),g.bullet=/(?:[*+-]|\d+\.)/,g.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,g.item=l(g.item,"gm").replace(/bull/g,g.bullet).getRegex(),g.list=l(g.list).replace(/bull/g,g.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+g.def.source+")").getRegex(),g._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b",g.html=l(g.html).replace("comment",/<!--[\s\S]*?-->/).replace("closed",/<(tag)[\s\S]+?<\/\1>/).replace("closing",/<tag(?:"[^"]*"|'[^']*'|\s[^'"\/>\s]*)*?\/?>/).replace(/tag/g,g._tag).getRegex(),g.paragraph=l(g.paragraph).replace("hr",g.hr).replace("heading",g.heading).replace("lheading",g.lheading).replace("tag","<"+g._tag).getRegex(),g.blockquote=l(g.blockquote).replace("paragraph",g.paragraph).getRegex(),g.normal=h({},g),g.gfm=h({},g.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),g.gfm.paragraph=l(g.paragraph).replace("(?!","(?!"+g.gfm.fences.source.replace("\\1","\\2")+"|"+g.list.source.replace("\\1","\\3")+"|").getRegex(),g.tables=h({},g.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),n.rules=g,n.lex=function(t,e){return new n(e).lex(t)},n.prototype.lex=function(t){return t=t.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(t,!0)},n.prototype.token=function(t,e){t=t.replace(/^ +$/gm,"");for(var n,r,i,o,s,a,u,l,c,p,h;t;)if((i=this.rules.newline.exec(t))&&(t=t.substring(i[0].length),i[0].length>1&&this.tokens.push({type:"space"})),i=this.rules.code.exec(t))t=t.substring(i[0].length),i=i[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?i:i.replace(/\n+$/,"")});else if(i=this.rules.fences.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"code",lang:i[2],text:i[3]||""});else if(i=this.rules.heading.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"heading",depth:i[1].length,text:i[2]});else if(e&&(i=this.rules.nptable.exec(t))){for(t=t.substring(i[0].length),a={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/\n$/,"").split("\n")},l=0;l<a.align.length;l++)/^ *-+: *$/.test(a.align[l])?a.align[l]="right":/^ *:-+: *$/.test(a.align[l])?a.align[l]="center":/^ *:-+ *$/.test(a.align[l])?a.align[l]="left":a.align[l]=null;for(l=0;l<a.cells.length;l++)a.cells[l]=a.cells[l].split(/ *\| */);this.tokens.push(a)}else if(i=this.rules.hr.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"hr"});else if(i=this.rules.blockquote.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"blockquote_start"}),i=i[0].replace(/^ *> ?/gm,""),this.token(i,e),this.tokens.push({type:"blockquote_end"});else if(i=this.rules.list.exec(t)){for(t=t.substring(i[0].length),o=i[2],h=o.length>1,this.tokens.push({type:"list_start",ordered:h,start:h?+o:""}),i=i[0].match(this.rules.item),n=!1,p=i.length,l=0;l<p;l++)a=i[l],u=a.length,a=a.replace(/^ *([*+-]|\d+\.) +/,""),~a.indexOf("\n ")&&(u-=a.length,a=this.options.pedantic?a.replace(/^ {1,4}/gm,""):a.replace(new RegExp("^ {1,"+u+"}","gm"),"")),this.options.smartLists&&l!==p-1&&(s=g.bullet.exec(i[l+1])[0],o===s||o.length>1&&s.length>1||(t=i.slice(l+1).join("\n")+t,l=p-1)),r=n||/\n\n(?!\s*$)/.test(a),l!==p-1&&(n="\n"===a.charAt(a.length-1),r||(r=n)),this.tokens.push({type:r?"loose_item_start":"list_item_start"}),this.token(a,!1),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(i=this.rules.html.exec(t))t=t.substring(i[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===i[1]||"script"===i[1]||"style"===i[1]),text:i[0]});else if(e&&(i=this.rules.def.exec(t)))t=t.substring(i[0].length),i[3]&&(i[3]=i[3].substring(1,i[3].length-1)),c=i[1].toLowerCase(),this.tokens.links[c]||(this.tokens.links[c]={href:i[2],title:i[3]});else if(e&&(i=this.rules.table.exec(t))){for(t=t.substring(i[0].length),a={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/(?: *\| *)?\n$/,"").split("\n")},l=0;l<a.align.length;l++)/^ *-+: *$/.test(a.align[l])?a.align[l]="right":/^ *:-+: *$/.test(a.align[l])?a.align[l]="center":/^ *:-+ *$/.test(a.align[l])?a.align[l]="left":a.align[l]=null;for(l=0;l<a.cells.length;l++)a.cells[l]=a.cells[l].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(a)}else if(i=this.rules.lheading.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"heading",depth:"="===i[2]?1:2,text:i[1]});else if(e&&(i=this.rules.paragraph.exec(t)))t=t.substring(i[0].length),this.tokens.push({type:"paragraph",text:"\n"===i[1].charAt(i[1].length-1)?i[1].slice(0,-1):i[1]});else if(i=this.rules.text.exec(t))t=t.substring(i[0].length),this.tokens.push({type:"text",text:i[0]});else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0));return this.tokens};var d={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:p,tag:/^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/\s]*)*?\/?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:p,text:/^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/};d._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,d._email=/[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,d.autolink=l(d.autolink).replace("scheme",d._scheme).replace("email",d._email).getRegex(),d._inside=/(?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/,d._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,d.link=l(d.link).replace("inside",d._inside).replace("href",d._href).getRegex(),d.reflink=l(d.reflink).replace("inside",d._inside).getRegex(),d.normal=h({},d),d.pedantic=h({},d.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),d.gfm=h({},d.normal,{escape:l(d.escape).replace("])","~|])").getRegex(),url:l(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("email",d._email).getRegex(),_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:l(d.text).replace("]|","~]|").replace("|","|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|").getRegex()}),d.breaks=h({},d.gfm,{br:l(d.br).replace("{2,}","*").getRegex(),text:l(d.gfm.text).replace("{2,}","*").getRegex()}),r.rules=d,r.output=function(t,e,n){return new r(e,n).output(t)},r.prototype.output=function(t){for(var e,n,r,i,o="";t;)if(i=this.rules.escape.exec(t))t=t.substring(i[0].length),o+=i[1];else if(i=this.rules.autolink.exec(t))t=t.substring(i[0].length),"@"===i[2]?(n=a(this.mangle(i[1])),r="mailto:"+n):(n=a(i[1]),r=n),o+=this.renderer.link(r,null,n);else if(this.inLink||!(i=this.rules.url.exec(t))){if(i=this.rules.tag.exec(t))!this.inLink&&/^<a /i.test(i[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(i[0])&&(this.inLink=!1),t=t.substring(i[0].length),o+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):a(i[0]):i[0];else if(i=this.rules.link.exec(t))t=t.substring(i[0].length),this.inLink=!0,o+=this.outputLink(i,{href:i[2],title:i[3]}),this.inLink=!1;else if((i=this.rules.reflink.exec(t))||(i=this.rules.nolink.exec(t))){if(t=t.substring(i[0].length),e=(i[2]||i[1]).replace(/\s+/g," "),!(e=this.links[e.toLowerCase()])||!e.href){o+=i[0].charAt(0),t=i[0].substring(1)+t;continue}this.inLink=!0,o+=this.outputLink(i,e),this.inLink=!1}else if(i=this.rules.strong.exec(t))t=t.substring(i[0].length),o+=this.renderer.strong(this.output(i[2]||i[1]));else if(i=this.rules.em.exec(t))t=t.substring(i[0].length),o+=this.renderer.em(this.output(i[2]||i[1]));else if(i=this.rules.code.exec(t))t=t.substring(i[0].length),o+=this.renderer.codespan(a(i[2].trim(),!0));else if(i=this.rules.br.exec(t))t=t.substring(i[0].length),o+=this.renderer.br();else if(i=this.rules.del.exec(t))t=t.substring(i[0].length),o+=this.renderer.del(this.output(i[1]));else if(i=this.rules.text.exec(t))t=t.substring(i[0].length),o+=this.renderer.text(a(this.smartypants(i[0])));else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}else i[0]=this.rules._backpedal.exec(i[0])[0],t=t.substring(i[0].length),"@"===i[2]?(n=a(i[0]),r="mailto:"+n):(n=a(i[0]),r="www."===i[1]?"http://"+n:n),o+=this.renderer.link(r,null,n);return o},r.prototype.outputLink=function(t,e){var n=a(e.href),r=e.title?a(e.title):null;return"!"!==t[0].charAt(0)?this.renderer.link(n,r,this.output(t[1])):this.renderer.image(n,r,a(t[1]))},r.prototype.smartypants=function(t){return this.options.smartypants?t.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):t},r.prototype.mangle=function(t){if(!this.options.mangle)return t;for(var e,n="",r=t.length,i=0;i<r;i++)e=t.charCodeAt(i),Math.random()>.5&&(e="x"+e.toString(16)),n+="&#"+e+";";return n},i.prototype.code=function(t,e,n){if(this.options.highlight){var r=this.options.highlight(t,e);null!=r&&r!==t&&(n=!0,t=r)}return e?'<pre><code class="'+this.options.langPrefix+a(e,!0)+'">'+(n?t:a(t,!0))+"\n</code></pre>\n":"<pre><code>"+(n?t:a(t,!0))+"\n</code></pre>"},i.prototype.blockquote=function(t){return"<blockquote>\n"+t+"</blockquote>\n"},i.prototype.html=function(t){return t},i.prototype.heading=function(t,e,n){return"<h"+e+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+t+"</h"+e+">\n"},i.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},i.prototype.list=function(t,e,n){var r=e?"ol":"ul";return"<"+r+(e&&1!==n?' start="'+n+'"':"")+">\n"+t+"</"+r+">\n"},i.prototype.listitem=function(t){return"<li>"+t+"</li>\n"},i.prototype.paragraph=function(t){return"<p>"+t+"</p>\n"},i.prototype.table=function(t,e){return"<table>\n<thead>\n"+t+"</thead>\n<tbody>\n"+e+"</tbody>\n</table>\n"},i.prototype.tablerow=function(t){return"<tr>\n"+t+"</tr>\n"},i.prototype.tablecell=function(t,e){var n=e.header?"th":"td";return(e.align?"<"+n+' style="text-align:'+e.align+'">':"<"+n+">")+t+"</"+n+">\n"},i.prototype.strong=function(t){return"<strong>"+t+"</strong>"},i.prototype.em=function(t){return"<em>"+t+"</em>"},i.prototype.codespan=function(t){return"<code>"+t+"</code>"},i.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},i.prototype.del=function(t){return"<del>"+t+"</del>"},i.prototype.link=function(t,e,n){if(this.options.sanitize){try{var r=decodeURIComponent(u(t)).replace(/[^\w:]/g,"").toLowerCase()}catch(t){return n}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:")||0===r.indexOf("data:"))return n}this.options.baseUrl&&!b.test(t)&&(t=c(this.options.baseUrl,t));var i='<a href="'+t+'"';return e&&(i+=' title="'+e+'"'),i+=">"+n+"</a>"},i.prototype.image=function(t,e,n){this.options.baseUrl&&!b.test(t)&&(t=c(this.options.baseUrl,t));var r='<img src="'+t+'" alt="'+n+'"';return e&&(r+=' title="'+e+'"'),r+=this.options.xhtml?"/>":">"},i.prototype.text=function(t){return t},o.prototype.strong=o.prototype.em=o.prototype.codespan=o.prototype.del=o.prototype.text=function(t){return t},o.prototype.link=o.prototype.image=function(t,e,n){return""+n},o.prototype.br=function(){return""},s.parse=function(t,e){return new s(e).parse(t)},s.prototype.parse=function(t){this.inline=new r(t.links,this.options),this.inlineText=new r(t.links,h({},this.options,{renderer:new o})),this.tokens=t.reverse();for(var e="";this.next();)e+=this.tok();return e},s.prototype.next=function(){return this.token=this.tokens.pop()},s.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},s.prototype.parseText=function(){for(var t=this.token.text;"text"===this.peek().type;)t+="\n"+this.next().text;return this.inline.output(t)},s.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,u(this.inlineText.output(this.token.text)));case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var t,e,n,r,i="",o="";for(n="",t=0;t<this.token.header.length;t++)n+=this.renderer.tablecell(this.inline.output(this.token.header[t]),{header:!0,align:this.token.align[t]});for(i+=this.renderer.tablerow(n),t=0;t<this.token.cells.length;t++){for(e=this.token.cells[t],n="",r=0;r<e.length;r++)n+=this.renderer.tablecell(this.inline.output(e[r]),{header:!1,align:this.token.align[r]});o+=this.renderer.tablerow(n)}return this.renderer.table(i,o);case"blockquote_start":for(o="";"blockquote_end"!==this.next().type;)o+=this.tok();return this.renderer.blockquote(o);case"list_start":o="";for(var s=this.token.ordered,a=this.token.start;"list_end"!==this.next().type;)o+=this.tok();return this.renderer.list(o,s,a);case"list_item_start":for(o="";"list_item_end"!==this.next().type;)o+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(o);case"loose_item_start":for(o="";"list_item_end"!==this.next().type;)o+=this.tok();return this.renderer.listitem(o);case"html":var l=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(l);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}};var m={},b=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;p.exec=p,f.options=f.setOptions=function(t){return h(f.defaults,t),f},f.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new i,xhtml:!1,baseUrl:null},f.Parser=s,f.parser=s.parse,f.Renderer=i,f.TextRenderer=o,f.Lexer=n,f.lexer=n.lex,f.InlineLexer=r,f.inlineLexer=r.output,f.parse=f,t.exports=f}(this||"undefined"!=typeof window&&window)}).call(e,n(58))},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},,,function(t,e,n){t.exports=n(48)}]);