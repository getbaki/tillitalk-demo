(()=>{
const music=new Audio('TilliTalk-Woodland-Loop.ogg'); music.loop=true; music.volume=.2;
let enabled=true; try{enabled=localStorage.getItem('tillitalk-demo-music')!=='off'}catch{}
let intro=true, started=false; const cover=document.createElement('div'); cover.style.cssText='position:fixed;inset:0;z-index:20000;background:radial-gradient(ellipse at 50% 48%,#fffef1 0%,#fff1b6 28%,#f8ce72 65%,#f4b65b 100%);display:grid;place-items:center;overflow:hidden';
const v=document.createElement('video'); v.src='TilliTalk-Transparent-Intro.webm';v.playsInline=true;v.style.cssText='position:relative;width:min(88vw,76vh);height:76vh;object-fit:contain;z-index:1;transform:translateY(-5vh)';const rays=document.createElement('div');rays.style.cssText='position:absolute;inset:-80%;background:repeating-conic-gradient(from 8deg at 50% 50%,transparent 0deg 12deg,rgba(255,255,225,.35) 18deg,transparent 28deg);mask-image:radial-gradient(circle,transparent 5%,black 32%,black 100%);pointer-events:none';cover.append(rays,v);const title=document.createElement('div');title.textContent='TilliTalk';title.style.cssText='position:absolute;bottom:5%;left:0;right:0;text-align:center;font:900 clamp(42px,9vw,100px) system-ui,sans-serif;color:#7540bb;text-shadow:0 2px 0 #fff,0 4px 12px #fff3b5;z-index:2;opacity:0';cover.append(title);v.addEventListener('timeupdate',()=>{title.style.opacity=String(Math.min(1,Math.max(0,(v.currentTime-3.5)/.7)))});document.body.append(cover);
const b=document.createElement('button');document.querySelector('nav').prepend(b);function label(){b.textContent=enabled?'🎵 Music on':'🎵 Music off';b.setAttribute('aria-pressed',String(enabled))}label();
function play(){if(enabled&&started&&!document.hidden){if(intro)music.volume=0;music.play().catch(()=>{});}else music.pause()}
function finish(){if(!intro)return;intro=false;v.pause();cover.remove();play()}
v.onended=finish;v.onerror=()=>{if(started)finish()};
v.style.visibility='hidden';
const welcome=document.createElement('div');welcome.style.cssText='position:relative;z-index:3;grid-area:1/1;text-align:center;padding:24px;color:#7540bb';v.style.gridArea='1/1';
const fox=document.createElement('img');fox.src='TilliTalk-Launcher.png';fox.alt='Tilli';fox.style.cssText='width:min(42vw,220px);max-height:34vh;object-fit:contain;border-radius:24px';
const heading=document.createElement('h1');heading.textContent='Welcome to TilliTalk!';heading.style.cssText='font-size:clamp(28px,6vw,58px);margin:16px 0';
const go=document.createElement('button');go.textContent='Let’s go!';go.style.cssText='background:#7540bb;color:white;border:2px solid #ffe29a;border-radius:24px;padding:16px 36px;font:bold 24px system-ui;cursor:pointer;box-shadow:0 6px 18px #a76b4555';welcome.append(fox,heading,go);cover.append(welcome);
go.onclick=()=>{if(started)return;started=true;welcome.remove();v.style.visibility='visible';v.muted=!enabled;const playback=v.play();if(enabled){music.volume=0;music.play().catch(()=>{});}playback.catch(finish);setTimeout(finish,20000);};
function unlock(){if(!started)return;if(intro&&enabled){v.muted=false;v.play().catch(()=>{})}else play()}
document.addEventListener('pointerdown',unlock);document.addEventListener('keydown',unlock);document.addEventListener('visibilitychange',play);
b.onclick=()=>{enabled=!enabled;try{localStorage.setItem('tillitalk-demo-music',enabled?'on':'off')}catch{}label();play()};
let speech=false;const original=window.say;if(typeof original==='function'){window.say=function(t){original(t);speech=true;}}let volume=0;setInterval(()=>{speech=!!window.speechSynthesis?.speaking;const target=intro?0:document.getElementById('picture')?(speech ? .10 : .20):.30;volume=intro?0:volume+(target-volume)*.2;music.volume=volume;},100);
})();