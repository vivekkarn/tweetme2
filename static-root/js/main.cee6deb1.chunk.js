(this["webpackJsonptweetme2-web"]=this["webpackJsonptweetme2-web"]||[]).push([[0],[,,,,,function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},function(e,t,a){e.exports=a(13)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(2),s=a.n(r),o=(a(11),a(5)),l=a.n(o),i=(a(12),a(3)),m=a(1);function u(e){var t=Object(n.useState)([]),a=Object(m.a)(t,2),r=a[0],s=a[1],o=Object(n.useState)([]),l=Object(m.a)(o,2),u=l[0],p=l[1];return Object(n.useEffect)((function(){var t=Object(i.a)(e.newTweets).concat(r);t.length!==u.length&&p(t)}),[e.newTweets,r,u]),Object(n.useEffect)((function(){!function(e){var t=new XMLHttpRequest;t.responseType="json",t.open("GET","http://127.0.0.1:8000/api/tweets"),t.onload=function(){e(t.response,t.status)},t.onerror=function(t){console.log("error is ",t),e({message:"there was an error"},400)},t.send()}((function(e,t){200===t&&s(e)}))}),[]),u.map((function(e,t){return c.a.createElement(d,{tweet:e,key:t,className:"my-5 py-5 border bg-white text-dark"})}))}function p(e){var t=e.tweet,a=e.action,r=Object(n.useState)(t.likes?t.likes:0),s=Object(m.a)(r,2),o=s[0],l=s[1],i=Object(n.useState)(!0===t.userLike),u=Object(m.a)(i,2),p=u[0],d=u[1],f=e.className?e.className:"btn btn-primary btn-sm",w="like"===a.type?"".concat(o," ").concat(a.display):a.display;return c.a.createElement("button",{className:f,onClick:function(e){e.preventDefault(),"like"===a.type&&(!0===p?(l(o-1),d(!1)):(l(o+1),d(!0)))}}," ",w)}function d(e){var t=e.tweet,a=e.className?e.className:"col-10";return c.a.createElement("div",{className:a},c.a.createElement("div",null,t.id," -- ",t.content),c.a.createElement("div",{className:"btn btn-group"},c.a.createElement(p,{tweet:t,action:{type:"like",display:"Likes"}}),c.a.createElement(p,{tweet:t,action:{type:"unlike",display:"Unlikes"}}),c.a.createElement(p,{tweet:t,action:{type:"retweet",display:"Retweets"}})))}function f(e){var t=c.a.createRef(),a=Object(n.useState)([]),r=Object(m.a)(a,2),s=r[0],o=r[1];return c.a.createElement("div",{className:e.className},c.a.createElement("div",{className:"col-12 mb-3"},c.a.createElement("form",null,c.a.createElement("textarea",{ref:t,required:!0,className:"form-control",name:"tweet"}),c.a.createElement("button",{type:"submit",className:"btn btn-primary my-3",onClick:function(e){e.preventDefault();var a=t.current.value,n=Object(i.a)(s);n.unshift({content:a,likes:0,id:12345}),o(n),t.current.value=""}},"Tweet"))),c.a.createElement(u,{newTweets:s}))}var w=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("img",{src:l.a,className:"App-logo",alt:"logo"}),c.a.createElement("div",null,c.a.createElement(f,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(w,null),document.getElementById("root"));var b=document.getElementById("tweetme-2");s.a.render(c.a.createElement(f,null),b),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[6,1,2]]]);
//# sourceMappingURL=main.cee6deb1.chunk.js.map