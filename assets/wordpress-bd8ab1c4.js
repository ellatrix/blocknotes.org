import{r as y,c as b,s as _,e as v,L as P,a as k}from"./get-wordpress-module-0a0dc2a0.js";function L(r,e){return{type:"response",requestId:r,response:e}}async function W(r,e,s,p){const a=navigator.serviceWorker;if(!a)throw new Error("Service workers are not supported in this browser.");const c=await a.getRegistrations();if(c.length>0){const d=await I();if(p!==d){console.debug(`[window] Reloading the currently registered Service Worker (expected version: ${p}, registered version: ${d})`);for(const n of c){let i=!1;try{await n.update()}catch{i=!0}const t=n.waiting||n.installing;t&&!i&&(d!==null?t.postMessage("skip-waiting"):i=!0),i&&(await n.unregister(),window.location.reload())}}}else console.debug(`[window] Creating a Service Worker registration (version: ${p})`),await a.register(s,{type:"module"});navigator.serviceWorker.addEventListener("message",async function(n){if(console.debug("Message from ServiceWorker",n),e&&n.data.scope!==e)return;const i=n.data.args||[],t=n.data.method,l=await r[t](...i);n.source.postMessage(L(n.data.requestId,l))}),a.startMessages()}async function I(){try{return(await(await fetch("/version")).json()).version}catch{return null}}const E="1686951377419",S="_overlay_1n1bq_1",U="_is-hidden_1n1bq_17",R="_wrapper_1n1bq_22",B="_wrapper-definite_1n1bq_32",q="_progress-bar_1n1bq_32",M="_is-indefinite_1n1bq_32",T="_wrapper-indefinite_1n1bq_33",C="_is-definite_1n1bq_33",D="_indefinite-loading_1n1bq_1",A="_caption_1n1bq_81",o={overlay:S,isHidden:U,wrapper:R,wrapperDefinite:B,progressBar:q,isIndefinite:M,wrapperIndefinite:T,isDefinite:C,indefiniteLoading:D,caption:A};class O{constructor(e={}){this.caption="Preparing WordPress",this.progress=0,this.isIndefinite=!1,this.visible=!0,this.element=document.createElement("div"),this.captionElement=document.createElement("h3"),this.element.appendChild(this.captionElement),this.setOptions(e)}setOptions(e){"caption"in e&&e.caption&&(this.caption=e.caption),"progress"in e&&(this.progress=e.progress),"isIndefinite"in e&&(this.isIndefinite=e.isIndefinite),"visible"in e&&(this.visible=e.visible),this.updateElement()}destroy(){this.setOptions({visible:!1}),setTimeout(()=>{this.element.remove()},500)}updateElement(){this.element.className="",this.element.classList.add(o.overlay),this.visible||this.element.classList.add(o.isHidden),this.captionElement.className="",this.captionElement.classList.add(o.caption),this.captionElement.textContent=this.caption+"...";const e=this.element.querySelector(`.${o.wrapper}`);e&&this.element.removeChild(e),this.isIndefinite?this.element.appendChild(this.createProgressIndefinite()):this.element.appendChild(this.createProgress())}createProgress(){const e=document.createElement("div");e.classList.add(o.wrapper,o.wrapperDefinite);const s=document.createElement("div");return s.classList.add(o.progressBar,o.isDefinite),s.style.width=this.progress+"%",e.appendChild(s),e}createProgressIndefinite(){const e=document.createElement("div");e.classList.add(o.wrapper,o.wrapperIndefinite);const s=document.createElement("div");return s.classList.add(o.progressBar,o.isIndefinite),e.appendChild(s),e}}const h="/worker-thread-ad8957e7.js",H="/sw.js",g=new URL("/",(import.meta||{}).url).origin,V="/iframe-worker.html",f=y,j=function(){switch(f){case"webworker":return new URL(h,g)+"";case"iframe":{const r=new URL(V,g);return r.searchParams.set("scriptUrl",h),r+""}default:throw new Error(`Unknown backend: ${f}`)}}(),$=new URL(H,g),w=new URL(document.location.href).searchParams;async function x(){z();const r=w.has("progressbar");let e;r&&(e=new O,document.body.prepend(e.element));const s=m(w.get("wp"),P),p=m(w.get("php"),k),a=b(await _(j,f,{wpVersion:s,phpVersion:p,persistent:w.has("persistent")?"true":"false"})),c=document.querySelector("#wp"),d={async onDownloadProgress(t){return a.onDownloadProgress(t)},async setProgress(t){if(!e)throw new Error("Progress bar not available");e.setOptions(t)},async setLoaded(){if(!e)throw new Error("Progress bar not available");e.destroy()},async onNavigation(t){c.addEventListener("load",async l=>{try{const u=await i.internalUrlToPath(l.currentTarget.contentWindow.location.href);t(u)}catch{}})},async goTo(t){t==="/wp-admin"&&(t="/wp-admin/"),c.src=await i.pathToInternalUrl(t)},async getCurrentURL(){return await i.internalUrlToPath(c.src)},async setIframeSandboxFlags(t){c.setAttribute("sandbox",t.join(" "))},async onMessage(t){return await a.onMessage(t)}};await a.isConnected();const[n,i]=v(d,a);return await a.isReady(),await W(a,await a.scope,$+"",E),F(c,N(await i.absoluteUrl)),c.src=await i.pathToInternalUrl("/"),n(),i}function N(r){return new URL(r,"https://example.com").origin}function F(r,e){window.addEventListener("message",s=>{s.source===r.contentWindow&&s.origin===e&&(typeof s.data!="object"||s.data.type!=="relay"||window.parent.postMessage(s.data,"*"))})}function m(r,e){return!r||r==="latest"?e.replace(".","_"):r.replace(".","_")}function z(){let r=!1;try{r=window.parent!==window&&window.parent.IS_WASM_WORDPRESS}catch{}if(r)throw new Error("The service worker did not load correctly. This is a bug, please report it on https://github.com/WordPress/wordpress-playground/issues");window.IS_WASM_WORDPRESS=!0}window.top!=window.self&&document.body.classList.add("is-embedded");x();
