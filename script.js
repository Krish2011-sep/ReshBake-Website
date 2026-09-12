/* ReshBake — interaction + opening animation — cache refresh */

const openingStyles = document.createElement("style");
openingStyles.textContent = `
body.loading{overflow:hidden}
.page-loader{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#3b261e;color:#fffaf5;opacity:1;visibility:visible;transition:opacity .8s cubic-bezier(.22,1,.36,1),visibility .8s}
.page-loader.loaded{opacity:0;visibility:hidden;pointer-events:none}
.loader-inner{position:relative;width:min(360px,78vw);text-align:center;display:flex;flex-direction:column;align-items:center;gap:.45rem;animation:loaderEnter 1s cubic-bezier(.22,1,.36,1) both}
.loader-mark{width:78px;height:78px;border:1px solid rgba(255,250,245,.35);border-radius:50%;display:grid;place-items:center;font-family:"Playfair Display",Georgia,serif;font-size:1.45rem;letter-spacing:.05em;animation:markPulse 1.8s ease-in-out infinite}
.loader-inner>span{font-family:"DM Sans",Arial,sans-serif;font-size:.78rem;font-weight:700;letter-spacing:.28em;margin-left:.28em}
.loader-inner>small{font-family:"Playfair Display",Georgia,serif;font-style:italic;color:#d9b294;font-size:.9rem}
.loader-line{width:100%;height:2px;background:rgba(255,250,245,.16);margin-top:1.35rem;overflow:hidden;border-radius:99px}
.loader-line i{display:block;width:0;height:100%;background:#d99c70;animation:loaderProgress 1.35s cubic-bezier(.22,1,.36,1) forwards}
body:not(.loading) .hero .reveal{opacity:1;transform:none}
@keyframes loaderEnter{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}
@keyframes markPulse{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(217,156,112,0)}50%{transform:scale(1.05);box-shadow:0 0 0 12px rgba(217,156,112,.08)}}
@keyframes loaderProgress{from{width:0}to{width:100%}}
@media(prefers-reduced-motion:reduce){.page-loader,.loader-inner,.loader-mark,.loader-line i{animation:none!important;transition:none!important}.loader-line i{width:100%}}
`;
document.head.appendChild(openingStyles);

document.body.classList.add("loading");
const loader=document.querySelector(".page-loader");
let loadingFinished=false;
const finishLoading=()=>{
  if(loadingFinished)return;
  loadingFinished=true;
  document.body.classList.remove("loading");
  document.body.style.overflow="";
  loader?.classList.add("loaded");
  document.querySelectorAll(".hero .reveal").forEach((el,i)=>setTimeout(()=>el.classList.add("visible"),120+i*140));
};
window.addEventListener("load",()=>setTimeout(finishLoading,1700),{once:true});
setTimeout(finishLoading,4500);

const menuToggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav"),header=document.querySelector(".site-header");
menuToggle?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.classList.toggle("open",open);
  menuToggle.setAttribute("aria-expanded",open);
  menuToggle.setAttribute("aria-label",open?"Close menu":"Open menu");
});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle?.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");}));

const onScroll=()=>header?.classList.toggle("scrolled",window.scrollY>20);
onScroll();
window.addEventListener("scroll",onScroll,{passive:true});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target);}
}),{threshold:.12,rootMargin:"0px 0px -40px 0px"});
document.querySelectorAll(".reveal:not(.hero .reveal)").forEach(el=>observer.observe(el));

const tabs=document.querySelectorAll(".menu-tabs button"),items=document.querySelectorAll(".menu-item");
tabs.forEach(tab=>tab.addEventListener("click",()=>{
  tabs.forEach(t=>t.classList.remove("active"));
  tab.classList.add("active");
  const filter=tab.dataset.filter;
  items.forEach(item=>{
    const show=filter==="all"||item.dataset.type===filter;
    item.style.display=show?"grid":"none";
    if(show){item.classList.remove("visible");requestAnimationFrame(()=>item.classList.add("visible"));}
  });
}));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const target=document.querySelector(a.getAttribute("href"));
  if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
}));

if(matchMedia("(pointer:fine)").matches){
  document.querySelectorAll(".product-card,.map-card").forEach(card=>{
    card.addEventListener("pointermove",e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${(-y*2.2).toFixed(2)}deg) rotateY(${(x*2.2).toFixed(2)}deg) translateY(-7px)`;
    });
    card.addEventListener("pointerleave",()=>{card.style.transform="";});
  });
}

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"&&nav?.classList.contains("open")){nav.classList.remove("open");menuToggle?.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");}
});

/* ReshBake customer photos */
const photoCSS = document.createElement("style");
photoCSS.textContent = `
.hero-art{background-image:url("assets/gallery-1.jpg");background-size:500% 100%;background-position:50% 0;background-repeat:no-repeat;border-radius:32px;overflow:hidden;box-shadow:0 25px 70px rgba(56,34,23,.18)}
.hero-art .hero-orbit,.hero-art .cake-glow,.hero-art .cake{display:none}
.image-placeholder{background-image:url("assets/gallery-2.jpg");background-size:500% 100%;background-position:0 0;background-repeat:no-repeat}
.image-placeholder .placeholder-cake,.image-placeholder .placeholder-shine{display:none}
.image-placeholder>span{font-size:0}
.image-placeholder>span:after{content:"ReshBake at Ganganagar";font-size:.7rem}
.visual-cake,.visual-cupcake,.visual-brownie,.visual-custom{background-image:url("assets/gallery-1.jpg");background-size:500% 100%;background-repeat:no-repeat}
.visual-cake{background-position:0 0}.visual-cupcake{background-position:25% 0}.visual-brownie{background-position:50% 0}.visual-custom{background-position:75% 0}
.product-visual span,.product-visual i{opacity:0}
.gallery-tile{background-image:url("assets/gallery-1.jpg");background-size:500% 100%;background-repeat:no-repeat}
.gallery-tile.g1{background-position:0 0}.gallery-tile.g2{background-position:25% 0}.gallery-tile.g3{background-position:50% 0}.gallery-tile.g4{background-position:75% 0}.gallery-tile.g5{background-image:url("assets/gallery-2.jpg");background-position:100% 0}
.gallery-tile span,.gallery-tile b{background:rgba(38,29,24,.72);padding:.35rem .5rem;border-radius:6px}
@media(max-width:600px){.hero-art{border-radius:24px;min-height:360px;transform:none}.image-placeholder{min-height:480px}.product-visual{height:260px}}
`;
document.head.appendChild(photoCSS);
document.querySelector(".hero-art")?.setAttribute("aria-label","ReshBake customer cake photograph");
document.querySelector(".gallery-section .center-heading p:not(.eyebrow)")?.replaceChildren(document.createTextNode("A selection of ReshBake cakes, bakes and custom creations."));