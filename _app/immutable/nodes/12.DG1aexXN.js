import{e as Ue}from"../chunks/Dr0UTSVU.js";import{s as qe,g as De,d as re,b as g,c as Q,f as he,i as fe,e as Ae,r as We,h as Ye}from"../chunks/OWYnqYm6.js";import"../chunks/DsnmJJEf.js";import{o as Ve}from"../chunks/DVDbhwPA.js";import{p as Se,t as C,a as u,b as je,c as _,d as r,r as a,am as X,ap as ae,s as v,al as Te,e as L,V as e,an as R,aa as W,a0 as S,_ as Ce,I as ze,W as se,U as He,$ as Ne,aq as le}from"../chunks/CKND6IKG.js";import{i as q}from"../chunks/Dqoxw5KV.js";import{h as Ge}from"../chunks/fYQPAFoT.js";import{a as K}from"../chunks/OPj8JxX7.js";import{p as me}from"../chunks/BcFE4h8X.js";import{c as ie}from"../chunks/6RNvWHKb.js";const Je=!0,Ke=({params:h})=>{const t=De(h.id);if(!t)throw Ue(404,"셰이더를 찾을 수 없습니다");return{shader:t}};function Qe(){return qe.map(h=>({id:h.id}))}const Ut=Object.freeze(Object.defineProperty({__proto__:null,entries:Qe,load:Ke,prerender:Je},Symbol.toStringTag,{value:"Module"}));var Re=_('<div class="mock-layout hero-custom-layout svelte-1sfx1kn"><iframe class="svelte-1sfx1kn"></iframe> <div class="hero-custom-overlay svelte-1sfx1kn" aria-hidden="true"><div class="mock-nav svelte-1sfx1kn"><span class="mock-logo svelte-1sfx1kn">아크메</span> <span class="mock-links svelte-1sfx1kn"><span>기능</span> <span>가격</span> <span>소개</span></span></div> <div class="hero-body svelte-1sfx1kn"><div class="mock-content svelte-1sfx1kn"><h2 class="svelte-1sfx1kn">여기서 다음 위대한 아이디어가 시작됩니다</h2> <p class="svelte-1sfx1kn">제품을 돋보이게 하는 생성형 셰이더를 갖춘 아름다운 랜딩 페이지.</p> <div class="mock-btn svelte-1sfx1kn">시작하기</div></div></div></div></div>'),Xe=_('<div class="mock-layout hero-layout svelte-1sfx1kn" aria-hidden="true"><div class="mock-nav svelte-1sfx1kn"><span class="mock-logo svelte-1sfx1kn">아크메</span> <span class="mock-links svelte-1sfx1kn"><span>기능</span> <span>가격</span> <span>소개</span></span></div> <div class="hero-body svelte-1sfx1kn"><div class="mock-content svelte-1sfx1kn"><h2 class="svelte-1sfx1kn">여기서 다음 위대한 아이디어가 시작됩니다</h2> <p class="svelte-1sfx1kn">제품을 돋보이게 하는 생성형 셰이더를 갖춘 아름다운 랜딩 페이지.</p> <div class="mock-btn svelte-1sfx1kn">시작하기</div></div> <div class="hero-shader svelte-1sfx1kn"><iframe class="svelte-1sfx1kn"></iframe></div></div></div>'),Ze=_('<div class="mock-layout bg-layout svelte-1sfx1kn" aria-hidden="true"><iframe class="svelte-1sfx1kn"></iframe> <div class="mock-overlay svelte-1sfx1kn"><div class="mock-overlay-content svelte-1sfx1kn"><h2 class="svelte-1sfx1kn">환영합니다</h2> <p class="svelte-1sfx1kn">다크닝 레이어와 함께 전체 뷰포트 셰이더 배경 위에 콘텐츠가 오버레이됩니다.</p> <div class="mock-btn svelte-1sfx1kn">액션 유도</div></div></div></div>'),$e=_('<div class="mock-layout accent-layout svelte-1sfx1kn" aria-hidden="true"><iframe class="svelte-1sfx1kn"></iframe> <div class="mock-content svelte-1sfx1kn"><h2 class="svelte-1sfx1kn">크리에이티브 스튜디오</h2> <p class="svelte-1sfx1kn">셰이더가 오른쪽에서 극적인 액센트로 페이드인되어 콘텐츠와 함께 깊이감을 만듭니다.</p> <div class="mock-btn svelte-1sfx1kn">자세히 보기</div></div></div>'),et=_('<div class="mock-layout full-layout svelte-1sfx1kn"><iframe class="svelte-1sfx1kn"></iframe></div>'),tt=_("<div><!></div>");function at(h,t){Se(t,!0);let s=me(t,"layout",3,"full"),k=me(t,"filter",3,"none");function x(d){let i=null;function n(){try{const c=d.contentDocument;if(!c)return;const f=c.querySelector(".label");if(f&&(f.style.display="none"),!c.getElementById("fps-counter")){const F=c.createElement("div");F.id="fps-counter",F.style.cssText="position:fixed;top:8px;right:10px;font:10px/1 monospace;color:rgba(200,149,108,0.4);z-index:99;pointer-events:none;",c.body.appendChild(F);const ee=c.createElement("script");ee.textContent=`(function(){var f=0,lt=performance.now(),el=document.getElementById('fps-counter');function t(){f++;var n=performance.now();if(n-lt>=1000){el.textContent=f+" fps";f=0;lt=n;}requestAnimationFrame(t);}requestAnimationFrame(t);})();`,c.body.appendChild(ee)}const V=c.querySelectorAll("script");let B="";V.forEach(F=>{B+=F.textContent||""});const $=/addEventListener\s*\(\s*['"]mouse(down|up)['"]/.test(B),N=/addEventListener\s*\(\s*['"]click['"]/.test(B),G=/addEventListener\s*\(\s*['"]mousemove['"]/.test(B),pe=/addEventListener\s*\(\s*['"]touch(start|move)['"]/.test(B);let P="";if(N&&G?P="이동 및 클릭하여 상호작용":$&&G?P="드래그하여 상호작용":N?P="클릭하여 상호작용":G&&(P="커서를 움직여 상호작용"),i&&(i.remove(),i=null),P){const F=d.closest(".mock-layout");F&&(i=document.createElement("div"),i.className="interaction-hint",i.textContent=P,F.appendChild(i))}}catch{}}return d.addEventListener("load",n),{destroy(){d.removeEventListener("load",n),i&&i.remove()}}}function y(d){if(!t.shader.heroConfig)return{destroy(){}};const i=t.shader.heroConfig.params;function n(){for(const c of i)d.contentWindow?.postMessage({type:"param",name:c.name,value:c.value},"*")}return d.addEventListener("load",n),{destroy(){d.removeEventListener("load",n)}}}const Y=!!t.shader.heroConfig;var z=tt(),M=r(z);{var j=d=>{var i=Re(),n=r(i);let c;K(n,f=>x?.(f)),K(n,f=>y?.(f)),X(2),a(i),C(()=>{g(n,"src",`/${t.shader.file??""}`),g(n,"title",t.shader.title),c=Q(n,"",c,{filter:k()})}),ae(n),u(d,i)},I=d=>{var i=Xe(),n=v(r(i),2),c=v(r(n),2),f=r(c);let V;K(f,B=>x?.(B)),a(c),a(n),a(i),C(()=>{g(f,"src",`/${t.shader.file??""}?p=1.8`),g(f,"title",t.shader.title),V=Q(f,"",V,{filter:k()})}),ae(f),u(d,i)},D=d=>{var i=Ze(),n=r(i);let c;K(n,f=>x?.(f)),X(2),a(i),C(()=>{g(n,"src",`/${t.shader.file??""}`),g(n,"title",t.shader.title),c=Q(n,"",c,{filter:k()})}),ae(n),u(d,i)},A=d=>{var i=$e(),n=r(i);let c;K(n,f=>x?.(f)),X(2),a(i),C(()=>{g(n,"src",`/${t.shader.file??""}`),g(n,"title",t.shader.title),c=Q(n,"",c,{filter:k()})}),ae(n),u(d,i)},Z=d=>{var i=et(),n=r(i);let c;K(n,f=>x?.(f)),a(i),C(()=>{g(n,"src",`/${t.shader.file??""}`),g(n,"title",t.shader.title),c=Q(n,"",c,{filter:k()})}),ae(n),u(d,i)};q(M,d=>{s()==="hero"&&Y?d(j):s()==="hero"?d(I,1):s()==="background"?d(D,2):s()==="accent"?d(A,3):d(Z,-1)})}a(z),C(()=>re(z,1,`preview layout-${s()??""}`,"svelte-1sfx1kn")),u(h,z),je()}var st=_('<div class="loading svelte-e5lkj5">소스 불러오는 중...</div>'),it=_('<pre class="svelte-e5lkj5"><code class="svelte-e5lkj5"> </code></pre>'),rt=_('<aside class="panel svelte-e5lkj5"><div class="panel-header svelte-e5lkj5"><span class="panel-title svelte-e5lkj5">소스</span> <div class="panel-actions svelte-e5lkj5"><button class="panel-btn svelte-e5lkj5"> </button> <button class="panel-btn close-btn svelte-e5lkj5" aria-label="소스 뷰어 닫기">&times;</button></div></div> <div class="panel-body svelte-e5lkj5"><!></div></aside>');function nt(h,t){let s=me(t,"loading",3,!1),k=W(!1);async function x(){await navigator.clipboard.writeText(t.source),S(k,!0),setTimeout(()=>S(k,!1),2e3)}var y=rt(),Y=r(y),z=v(r(Y),2),M=r(z),j=r(M,!0);a(M);var I=v(M,2);a(z),a(Y);var D=v(Y,2),A=r(D);{var Z=i=>{var n=st();u(i,n)},d=i=>{var n=it(),c=r(n),f=r(c,!0);a(c),a(n),C(()=>L(f,t.source)),u(i,n)};q(A,i=>{s()?i(Z):i(d,-1)})}a(D),a(y),C(()=>L(j,e(k)?"복사 완료!":"복사")),R("click",M,x),R("click",I,function(...i){t.onclose?.apply(this,i)}),u(h,y)}Te(["click"]);function lt(h,t,s,k){if(s==="full")return k.filter==="none"?h:h.replace("</style>",`  /* 컬러 스킴: ${k.name} */
  canvas { filter: ${k.filter}; }
</style>`);const x=ot(h),y=k.filter!=="none"?` style="filter: ${k.filter}"`:"";switch(s){case"hero":return t.heroConfig?dt(t,x,y):ct(t,x,y);case"background":return vt(t,x,y);case"accent":return ht(t,x,y)}}function ot(h){let t=h;return t=t.replace(/<div class="label">.*?<\/div>\n?/g,""),t=t.replace(/\s*\.label\s*\{[^}]*\}\n?/g,""),t=t.replace(/\\/g,"\\\\"),t=t.replace(/`/g,"\\`"),t=t.replace(/\$\{/g,"\\${"),t=t.replace(/<\/script>/gi,"<\\/script>"),t}function ct(h,t,s){return`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>히어로 — ${h.title}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #e8e0d8;
    font-family: system-ui, -apple-system, sans-serif;
    min-height: 100vh;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;
  }
  nav .logo { font-weight: 600; color: #c8956c; letter-spacing: 0.05em; }
  nav .links { display: flex; gap: 2rem; font-size: 0.9rem; color: rgba(232,224,216,0.5); }
  nav .links a { color: inherit; text-decoration: none; }

  .hero {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 60vh;
  }
  .hero-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .hero-content h1 {
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  .hero-content p {
    color: rgba(232,224,216,0.5);
    line-height: 1.6;
    max-width: 36ch;
  }
  .hero-content .btn {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    background: #c8956c;
    color: #0a0a0a;
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;
  }
  .hero-shader {
    flex: 0 0 420px;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    position: relative;
  }
  .hero-shader iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
</style>
</head>
<body>
  <nav>
    <div class="logo">acme</div>
    <div class="links">
      <a href="#">기능</a>
      <a href="#">가격</a>
      <a href="#">소개</a>
    </div>
  </nav>
  <section class="hero">
    <div class="hero-content">
      <h1>여기서 다음 위대한 아이디어가 시작됩니다</h1>
      <p>생성형 셰이더로 제품을 돋보이게 하는 아름다운 랜딩 페이지.</p>
      <a href="#" class="btn">시작하기</a>
    </div>
    <div class="hero-shader">
      <iframe id="shader"${s}></iframe>
    </div>
  </section>

  <script>
    document.getElementById('shader').srcdoc = \`${t}\`;
  <\/script>
</body>
</html>`}function dt(h,t,s){const x=h.heroConfig.params.map(y=>`      frame.contentWindow.postMessage({ type: 'param', name: '${y.name}', value: ${y.value} }, '*');`).join(`
`);return`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>히어로 — ${h.title}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #e8e0d8;
    font-family: system-ui, -apple-system, sans-serif;
    min-height: 100vh;
    overflow: hidden;
  }
  .shader-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
  }
  .shader-bg iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
  .page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;
  }
  nav .logo { font-weight: 600; color: #c8956c; letter-spacing: 0.05em; }
  nav .links { display: flex; gap: 2rem; font-size: 0.9rem; color: rgba(232,224,216,0.5); }
  nav .links a { color: inherit; text-decoration: none; }

  .hero {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 3rem;
    max-width: 600px;
    flex: 1;
  }
  .hero-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .hero-content h1 {
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  .hero-content p {
    color: rgba(232,224,216,0.5);
    line-height: 1.6;
    max-width: 36ch;
  }
  .hero-content .btn {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    background: #c8956c;
    color: #0a0a0a;
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;
  }
</style>
</head>
<body>
  <div class="shader-bg">
    <iframe id="shader"${s}></iframe>
  </div>
  <div class="page">
    <nav>
      <div class="logo">acme</div>
      <div class="links">
        <a href="#">기능</a>
        <a href="#">가격</a>
        <a href="#">소개</a>
      </div>
    </nav>
    <section class="hero">
      <div class="hero-content">
        <h1>여기서 다음 위대한 아이디어가 시작됩니다</h1>
        <p>생성형 셰이더로 제품을 돋보이게 하는 아름다운 랜딩 페이지.</p>
        <a href="#" class="btn">시작하기</a>
      </div>
    </section>
  </div>

  <script>
    var frame = document.getElementById('shader');
    frame.srcdoc = \`${t}\`;
    frame.addEventListener('load', function() {
${x}
    });
  <\\/script>
</body>
</html>`}function vt(h,t,s){return`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>배경 — ${h.title}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #e8e0d8;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .viewport {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .viewport iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  .viewport .overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 10, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1;
    pointer-events: none;
  }
  .overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: auto;
  }
  .overlay h1 {
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .overlay p {
    color: rgba(232,224,216,0.6);
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 42ch;
  }
  .overlay .btn {
    display: inline-block;
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    background: #c8956c;
    color: #0a0a0a;
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;
    font-size: 1rem;
  }
</style>
</head>
<body>
  <section class="viewport">
    <iframe id="shader"${s}></iframe>
    <div class="overlay">
      <div class="overlay-content">
        <h1>환영합니다</h1>
        <p>전체 뷰포트 셰이더 배경 위에 어둡게 처리된 콘텐츠가 오버레이됩니다.</p>
        <a href="#" class="btn">액션 유도</a>
      </div>
    </div>
  </section>

  <script>
    document.getElementById('shader').srcdoc = \`${t}\`;
  <\/script>
</body>
</html>`}function ht(h,t,s){return`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>액센트 — ${h.title}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #e8e0d8;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .viewport {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .viewport iframe {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    border: none;
  }
  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    max-width: 40%;
    padding: 4rem;
  }
  .content h1 {
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  .content p {
    color: rgba(232,224,216,0.5);
    line-height: 1.6;
    max-width: 36ch;
  }
  .content .btn {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    background: #c8956c;
    color: #0a0a0a;
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;
    width: fit-content;
  }
</style>
</head>
<body>
  <section class="viewport">
    <iframe id="shader"${s}></iframe>
    <div class="content">
      <h1>크리에이티브 스튜디오</h1>
      <p>셰이더가 오른쪽에서 극적인 액센트로 페이드 인되어 콘텐츠와 함께 깊이를 만들어냅니다.</p>
      <a href="#" class="btn">자세히 보기</a>
    </div>
  </section>

  <script>
    document.getElementById('shader').srcdoc = \`${t}\`;
  <\/script>
</body>
</html>`}var ft=_('<div class="sidebar-section inspiration-section svelte-ikhl8a"><span class="sidebar-label svelte-ikhl8a">영감</span> <div class="inspiration-name svelte-ikhl8a"> </div></div>'),mt=_('<a class="credit-link svelte-ikhl8a" target="_blank" rel="noopener noreferrer"> </a>'),pt=_('<div class="credit-text svelte-ikhl8a"> </div>'),ut=_('<div class="sidebar-section credit-section svelte-ikhl8a"><!></div>'),gt=le('<rect x="1" y="1" width="12" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"></rect>'),bt=le('<rect x="1" y="1" width="12" height="12" rx="1" opacity="0.35"></rect><rect x="3.5" y="3.5" width="7" height="7" rx="0.5"></rect>',1),kt=le('<rect x="1" y="1" width="12" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"></rect><rect x="1" y="1" width="6" height="12" rx="1" opacity="0.6"></rect>',1),xt=le('<rect x="1" y="1" width="12" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"></rect><rect x="7" y="1" width="6" height="12" rx="1" opacity="0.6"></rect>',1),yt=_('<button><svg aria-hidden="true" class="ctrl-icon svelte-ikhl8a" width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><!></svg> <span class="ctrl-text svelte-ikhl8a"> </span></button>'),_t=_('<button><span class="scheme-swatch svelte-ikhl8a"></span> <span class="ctrl-text svelte-ikhl8a"> </span></button>'),wt=_('<label class="param-row svelte-ikhl8a"><span class="param-label svelte-ikhl8a"> </span> <input type="range" class="param-slider svelte-ikhl8a"/> <span class="param-value svelte-ikhl8a"> </span></label>'),Et=_('<div class="sidebar-section svelte-ikhl8a"><span class="sidebar-label svelte-ikhl8a">매개변수</span> <div class="param-controls svelte-ikhl8a"></div></div>'),Ct=_('<a class="deep-dive-cta svelte-ikhl8a"><span class="deep-dive-label svelte-ikhl8a">심층 분석</span> <span class="deep-dive-title svelte-ikhl8a"> </span></a>'),zt=_('<div><!> <div class="main svelte-ikhl8a"><header class="svelte-ikhl8a"><a href="/gallery" class="back svelte-ikhl8a">&larr; 갤러리</a> <div class="shader-id svelte-ikhl8a"> </div></header> <div class="preview-area svelte-ikhl8a"><!></div></div> <aside class="sidebar svelte-ikhl8a"><div class="sidebar-inner svelte-ikhl8a"><!> <!> <div class="sidebar-section svelte-ikhl8a"><span class="sidebar-label svelte-ikhl8a">레이아웃</span> <div class="sidebar-buttons svelte-ikhl8a"></div></div> <div class="sidebar-section svelte-ikhl8a"><span class="sidebar-label svelte-ikhl8a">컬러 스킴</span> <div class="sidebar-buttons svelte-ikhl8a"></div></div> <!> <!> <div class="sidebar-section actions-section svelte-ikhl8a"><button> </button> <a class="action-btn svelte-ikhl8a">다운로드</a> <a class="action-btn svelte-ikhl8a" target="_blank">전체 화면 &rarr;</a></div></div></aside></div>');function qt(h,t){Se(t,!0);const s=se(()=>t.data.shader),k=se(()=>Ae(e(s)));let x=W(!1);Ve(()=>{const o=()=>{S(x,window.innerWidth<768)};return o(),window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)});let y=W("full");const Y=se(()=>e(s).defaultScheme?ie.find(o=>o.id===e(s).defaultScheme)??ie[0]:ie[0]);let z=W(Ce(ie[0])),M=!1;ze(()=>{M||(S(z,e(Y),!0),M=!0)});let j=W(!1),I=W(""),D=W(!1),A=W(Ce({}));ze(()=>{const o={};for(const l of e(s).params??[])o[l.name]=l.default;S(A,o,!0)});const Z=se(()=>e(I)?lt(e(I),e(s),e(y),e(z)):""),d=[{id:"full",label:"전체 화면",icon:"full"},{id:"background",label:"배경",icon:"bg"},{id:"hero",label:"히어로 섹션",icon:"hero"},{id:"accent",label:"액센트",icon:"accent"}];function i(o,l){e(A)[o]=l;const m=document.querySelectorAll(".preview iframe");for(const b of m)b.contentWindow?.postMessage({type:"param",name:o,value:l},"*")}async function n(){if(!e(j)&&!e(I)){S(D,!0);try{const o=await fetch(`/${e(s).file}`);S(I,await o.text(),!0)}catch{S(I,"<!-- Failed to load source -->")}S(D,!1)}S(j,!e(j))}var c=zt();Ge("ikhl8a",o=>{He(()=>{Ne.title=`${e(k)??""} — ${e(s).title??""}`})});let f;var V=r(c);{var B=o=>{nt(o,{get source(){return e(Z)},get loading(){return e(D)},onclose:()=>S(j,!1)})};q(V,o=>{e(j)&&o(B)})}var $=v(V,2),N=r($),G=v(r(N),2),pe=r(G);a(G),a(N);var P=v(N,2),F=r(P);at(F,{get shader(){return e(s)},get layout(){return e(y)},get filter(){return e(z).filter}}),a(P),a($);var ee=v($,2),ue=r(ee),ge=r(ue);{var Le=o=>{var l=ft(),m=v(r(l),2),b=r(m,!0);a(m),a(l),C(()=>L(b,e(s).inspiration)),u(o,l)};q(ge,o=>{e(s).inspiration&&o(Le)})}var be=v(ge,2);{var Fe=o=>{var l=ut(),m=r(l);{var b=w=>{var E=mt(),O=r(E,!0);a(E),C(()=>{g(E,"href",e(s).creditUrl),L(O,e(s).credit)}),u(w,E)},p=w=>{var E=pt(),O=r(E,!0);a(E),C(()=>L(O,e(s).credit)),u(w,E)};q(m,w=>{e(s).creditUrl?w(b):w(p,-1)})}a(l),u(o,l)};q(be,o=>{e(s).credit&&o(Fe)})}var oe=v(be,2),ke=v(r(oe),2);he(ke,21,()=>d,fe,(o,l)=>{const m=se(()=>e(l).id==="hero"||e(l).id==="accent");var b=yt();let p;var w=r(b),E=r(w);{var O=T=>{var H=gt();u(T,H)},U=T=>{var H=bt();X(),u(T,H)},ne=T=>{var H=kt();X(),u(T,H)},ve=T=>{var H=xt();X(),u(T,H)};q(E,T=>{e(l).icon==="full"?T(O):e(l).icon==="bg"?T(U,1):e(l).icon==="hero"?T(ne,2):e(l).icon==="accent"&&T(ve,3)})}a(w);var J=v(w,2),Oe=r(J,!0);a(J),a(b),C(()=>{p=re(b,1,"ctrl-btn svelte-ikhl8a",null,p,{active:e(y)===e(l).id,disabled:e(x)&&e(m)}),g(b,"title",e(x)&&e(m)?"데스크톱 전용":e(l).label),g(b,"aria-label",e(l).label),g(b,"aria-pressed",e(y)===e(l).id),L(Oe,e(l).label)}),R("click",b,()=>{e(x)&&e(m)||S(y,e(l).id,!0)}),u(o,b)}),a(ke),a(oe);var ce=v(oe,2),xe=v(r(ce),2);he(xe,21,()=>ie,fe,(o,l)=>{var m=_t();let b;var p=r(m);let w;var E=v(p,2),O=r(E,!0);a(E),a(m),C(()=>{b=re(m,1,"ctrl-btn svelte-ikhl8a",null,b,{active:e(z).id===e(l).id}),g(m,"title",e(l).name),w=Q(p,"",w,{background:e(l).swatch}),L(O,e(l).name)}),R("click",m,()=>S(z,e(l),!0)),u(o,m)}),a(xe),a(ce);var ye=v(ce,2);{var Me=o=>{var l=Et(),m=v(r(l),2);he(m,21,()=>e(s).params,fe,(b,p)=>{var w=wt(),E=r(w),O=r(E,!0);a(E);var U=v(E,2);We(U);var ne=v(U,2),ve=r(ne,!0);a(ne),a(w),C(J=>{L(O,e(p).label),g(U,"min",e(p).min),g(U,"max",e(p).max),g(U,"step",e(p).step??.01),Ye(U,e(A)[e(p).name]??e(p).default),L(ve,J)},[()=>(e(A)[e(p).name]??e(p).default).toFixed(e(p).step&&e(p).step>=1?0:e(p).step&&e(p).step>=.1?1:e(p).step&&e(p).step>=.01?2:3)]),R("input",U,J=>i(e(p).name,parseFloat(J.currentTarget.value))),u(b,w)}),a(m),a(l),u(o,l)};q(ye,o=>{e(s).params?.length&&o(Me)})}var _e=v(ye,2);{var Ie=o=>{var l=Ct(),m=v(r(l),2),b=r(m);a(m),a(l),C(()=>{g(l,"href",`/learn/${e(s).id??""}`),L(b,`${e(s).title??""} 셰이더 심층 분석 →`)}),u(o,l)};q(_e,o=>{e(s).hasArticle&&o(Ie)})}var we=v(_e,2),te=r(we);let Ee;var Be=r(te,!0);a(te);var de=v(te,2),Pe=v(de,2);a(we),a(ue),a(ee),a(c),C(()=>{f=re(c,1,"page svelte-ikhl8a",null,f,{"source-open":e(j)}),L(pe,`${e(k)??""} — ${e(s).title??""}`),Ee=re(te,1,"action-btn svelte-ikhl8a",null,Ee,{active:e(j)}),L(Be,e(j)?"소스 숨기기":"소스 보기"),g(de,"href",`/${e(s).file??""}`),g(de,"download",e(s).file),g(Pe,"href",`/${e(s).file??""}`)}),R("click",te,n),u(h,c),je()}Te(["click","input"]);export{qt as component,Ut as universal};
