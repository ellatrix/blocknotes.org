function c(e){return e.pathname.startsWith("/scope:")}function f(e){return c(e)?e.pathname.split("/")[1].split(":")[1]:null}function R(e,t){let n=new URL(e);if(c(n))if(t){const r=n.pathname.split("/");r[1]=`scope:${t}`,n.pathname=r.join("/")}else n=u(n);else if(t){const r=n.pathname==="/"?"":n.pathname;n.pathname=`/scope:${t}${r}`}return n}function u(e){if(!c(e))return e;const t=new URL(e),n=t.pathname.split("/");return t.pathname="/"+n.slice(2).join("/"),t}const U=25e3;let L=0;function W(){return++L}function h(e,t,n=U){return new Promise((r,a)=>{const i=s=>{s.data.type==="response"&&s.data.requestId===t&&(e.removeEventListener("message",i),clearTimeout(o),r(s.data.response))},o=setTimeout(()=>{a(new Error("Request timed out")),e.removeEventListener("message",i)},n);e.addEventListener("message",i)})}function S(e){const{version:t,handleRequest:n=P}=e;self.addEventListener("message",r=>{r.data&&r.data==="skip-waiting"&&self.skipWaiting()}),self.addEventListener("activate",r=>{r.waitUntil(self.clients.claim())}),self.addEventListener("fetch",r=>{const a=new URL(r.request.url);if(a.pathname==="/version"){r.preventDefault();const o=typeof t=="function"?t():t;r.respondWith(new Response(JSON.stringify({version:o}),{headers:{"Content-Type":"application/json"},status:200}));return}if(a.pathname.startsWith(self.location.pathname))return;if(!c(a)){let o;try{o=new URL(r.request.referrer)}catch{return}if(!c(o))return}console.debug(`[ServiceWorker] Serving request: ${v(u(a))}`);const i=n(r);i&&r.respondWith(i)})}async function P(e){e.preventDefault();const t=new URL(e.request.url),n=u(t);return y(n.pathname)?m(e):fetch(await g(e.request,{url:t}))}async function m(e){let t=new URL(e.request.url);if(!c(t))try{const s=new URL(e.request.referrer);t=R(t,f(s))}catch{}const{body:n,files:r,contentType:a}=await b(e.request),i={};for(const s of e.request.headers.entries())i[s[0]]=s[1];let o;try{const s={method:"request",args:[{body:n,files:r,url:t.toString(),method:e.request.method,headers:{...i,Host:t.host,"User-agent":self.navigator.userAgent,"Content-type":a}}]},d=f(t);if(d===null)throw new Error(`The URL ${t.toString()} is not scoped. This should not happen.`);console.debug("[ServiceWorker] Forwarding a request to the Worker Thread",{message:s});const l=await w(s,d);o=await h(self,l),delete o.headers["x-frame-options"],console.debug("[ServiceWorker] Response received from the main app",{phpResponse:o})}catch(s){throw console.error(s,{url:t.toString()}),s}return new Response(o.bytes,{headers:o.headers,status:o.httpStatusCode})}async function w(e,t){const n=W();for(const r of await self.clients.matchAll({includeUncontrolled:!0}))r.postMessage({...e,scope:t,requestId:n});return n}function y(e){return q(e)||E(e)}function q(e){return e.endsWith(".php")||e.includes(".php/")}function E(e){return!e.split("/").pop().includes(".")}async function b(e){const t=e.headers.get("content-type");if(e.method!=="POST")return{contentType:t,body:void 0,files:void 0};if(t.toLowerCase().startsWith("multipart/form-data"))try{const r=await e.clone().formData(),a={},i={};for(const o of r.keys()){const s=r.get(o);s instanceof File?i[o]=s:a[o]=s}return{contentType:"application/x-www-form-urlencoded",body:new URLSearchParams(a).toString(),files:i}}catch{}return{contentType:t,body:await e.clone().text(),files:{}}}async function g(e,t){const n=["GET","HEAD"].includes(e.method)||"body"in t?void 0:await e.blob();return new Request(t.url||e.url,{body:n,method:e.method,headers:e.headers,referrer:e.referrer,referrerPolicy:e.referrerPolicy,mode:e.mode==="navigate"?"same-origin":e.mode,credentials:e.credentials,cache:e.cache,redirect:e.redirect,integrity:e.integrity,...t})}function v(e){return e.toString().substring(e.origin.length)}const T=e=>e.startsWith("/wp-content/uploads/")||e.startsWith("/wp-content/plugins/")||e.startsWith("/wp-content/mu-plugins/")||e.startsWith("/wp-content/themes/"),k="1686951377419";self.document||(self.document={});S({version:k,handleRequest(e){const t=new URL(e.request.url);let n=f(t);if(!n)try{n=f(new URL(e.request.referrer))}catch{}const r=u(t);if(r.pathname.startsWith("/plugin-proxy"))return;e.preventDefault();async function i(){const{staticAssetsDirectory:o,defaultTheme:s}=await H(n);if((y(r.pathname)||T(r.pathname))&&!r.pathname.startsWith(`/wp-content/themes/${s}`)){const l=await m(e);return l.headers.set("Cross-Origin-Resource-Policy","cross-origin"),l.headers.set("Cross-Origin-Embedder-Policy","credentialless"),l}const d=await D(e.request,o);return fetch(d)}return i()}});const p={};async function D(e,t){const n=new URL(e.url),r=u(n);return!r.pathname.startsWith("/@fs")&&!r.pathname.startsWith("/assets")&&(r.pathname=`/${t}${r.pathname}`),await g(e,{url:r})}async function H(e){if(!p[e]){const t=await w({method:"getWordPressModuleDetails"},e);p[e]=await h(self,t)}return p[e]}
