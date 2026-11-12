
(()=>{'use strict';
 const intro=document.getElementById('intro');const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let introClosed=false;
 function closeIntro(){if(introClosed)return;introClosed=true;intro.classList.add('done');intro.setAttribute('aria-hidden','true');setTimeout(()=>intro.remove(),650)}
 document.getElementById('skip').addEventListener('click',closeIntro);setTimeout(closeIntro,reduce?80:2850);
 const menu=document.getElementById('menu'),links=document.getElementById('navlinks');menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
 let category='todos';const search=document.getElementById('search'),features=[...document.querySelectorAll('.feature')];
 function filter(){let count=0;const q=search.value.trim().toLocaleLowerCase('en');features.forEach(el=>{const show=(category==='todos'||el.dataset.category===category)&&(!q||el.dataset.keywords.includes(q));el.hidden=!show;if(show)count++});document.getElementById('empty').classList.toggle('show',count===0);document.getElementById('gallery-count').textContent=`Mostrando ${count} de ${features.length} pantallas`}
 document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.filter;document.querySelectorAll('.filter').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));filter()}));search.addEventListener('input',filter);
 const dialog=document.getElementById('viewer'),viewerImg=document.getElementById('viewer-img');let lastOpener=null;document.querySelectorAll('.shot').forEach(btn=>btn.addEventListener('click',()=>{lastOpener=btn;viewerImg.src=btn.dataset.image;viewerImg.alt='Enlarged screenshot of '+btn.dataset.title;document.getElementById('viewer-title').textContent=btn.dataset.title;dialog.showModal()}));document.getElementById('close-viewer').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>{viewerImg.removeAttribute('src');lastOpener?.focus()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!introClosed)closeIntro()});document.getElementById('year').textContent=new Date().getFullYear();
 const progress=document.getElementById('scroll-progress'),backTop=document.getElementById('back-top');
 let scrollQueued=false;
 function refreshScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';backTop.classList.toggle('visible',scrollY>550);scrollQueued=false}
 window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(refreshScroll)}},{passive:true});
 window.addEventListener('resize',refreshScroll,{passive:true});refreshScroll();
 backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduce?'instant':'smooth'}));
})();


(()=>{
 const button=document.getElementById('copy-discord');
 const status=document.getElementById('discord-status');
 if(!button||!status)return;
 button.addEventListener('click',async()=>{
   const username='diegodc5';
   try{
     if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
     await navigator.clipboard.writeText(username);
     status.textContent='Copied: diegodc5';
   }catch(error){
     status.textContent='Select and copy: diegodc5';
     const selection=window.getSelection();
     const userElement=document.getElementById('discord-username');
     if(userElement&&selection){
       const range=document.createRange();range.selectNodeContents(userElement);
       selection.removeAllRanges();selection.addRange(range);
     }
   }
 });
})();

// Copia alternativa cuando el dispositivo no tiene cliente de correo configurado.
(()=>{
 const button=document.getElementById('copy-email');
 const status=document.getElementById('email-status');
 if(!button||!status)return;
 button.addEventListener('click',async()=>{
   const email='elgitanito46@gmail.com';
   try{
     if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
     await navigator.clipboard.writeText(email);
     status.textContent='Email address copied';
   }catch(error){
     status.textContent='Select and copy the email address';
     const element=document.querySelector('.support-card a[href^="mailto:"]');
     const selection=window.getSelection();
     if(element&&selection){const range=document.createRange();range.selectNodeContents(element);selection.removeAllRanges();selection.addRange(range)}
   }
 });
})();
