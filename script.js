document.body.classList.add("loading");

const loader=document.querySelector(".page-loader");
const finishLoading=()=>{
  document.body.classList.remove("loading");
  loader?.classList.add("loaded");
  document.querySelectorAll(".hero .reveal").forEach((el,i)=>setTimeout(()=>el.classList.add("visible"),120+i*140));
};
window.addEventListener("load",()=>setTimeout(finishLoading,950),{once:true});
setTimeout(finishLoading,2200);

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