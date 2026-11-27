(()=>{
const music=new Audio('TilliTalk-Woodland-Loop.ogg'); music.loop=true; music.volume=.2;
let enabled=true; try{enabled=localStorage.getItem('tillitalk-demo-music')!=='off'}catch{}
let intro=true; const cover=document.createElement('div'); cover.style.cssText='position:fixed;inset:0;z-index:20000;background:#fbf6ed;display:grid;place-items:center';
const v=document.createElement('video'); v.src='TilliTalk-Golden-Intro.mp4';v.playsInline=true;v.style.cssText='width:min(86vw,900px);height:70vh;object-fit:contain';cover.append(v);document.body.append(cover);
const b=document.createElement('button');document.querySelector('nav').prepend(b);function label(){b.textContent=enabled?'🎵 Music on':'🎵 Music off';b.setAttribute('aria-pressed',String(enabled))}label();
function play(){if(enabled&&!intro&&!document.hidden)music.play().catch(()=>{});else music.pause()}
function finish(){if(!intro)return;intro=false;v.pause();cover.remove();play()}
v.onended=finish;v.onerror=finish;setTimeout(finish,20000);v.muted=!enabled;v.play().catch(()=>{if(intro){v.muted=true;v.play().catch(finish)}});
function unlock(){if(intro&&enabled){v.muted=false;v.play().catch(()=>{})}else play()}
document.addEventListener('pointerdown',unlock);document.addEventListener('keydown',unlock);document.addEventListener('visibilitychange',play);
b.onclick=()=>{enabled=!enabled;try{localStorage.setItem('tillitalk-demo-music',enabled?'on':'off')}catch{}label();play()};
let speech=false;const original=window.say;if(typeof original==='function'){window.say=function(t){original(t);speech=true;}}let volume=.2;setInterval(()=>{speech=!!window.speechSynthesis?.speaking;const target=document.getElementById('picture')?(speech ? .10 : .20):.30;volume+=(target-volume)*.2;music.volume=volume;},100);
})();