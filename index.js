import{i as c,S as d}from"./assets/vendor-B07T6_gy.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const u=r=>`<li class="card-gallery">
    <div class="card">
    <a class="gallery-link" target="_blank" href="${r.largeImageURL}">
    <img class="img-gallery" src="${r.webformatURL}" alt="${r.tags}"/>
    </a>
<div class="container-gallery">
<div class="gallery-items">
<p class="title-gallery">Likes</p>
<p class="gallery-item">${r.likes}</p>
</div>

<div class="gallery-items">
<p class="title-gallery">Views</p>
<p class="gallery-item">${r.views}</p>
</div>

<div class="gallery-items">
<p class="title-gallery">Comments</p>
<p class="gallery-item">${r.comments}</p>
</div>

<div class="gallery-items">
<p class="title-gallery">Downloads</p>
<p class="gallery-item">${r.downloads}</p>
</div>
</div>
</div>
    </li>`,p=r=>{const l=new URLSearchParams({key:"48321272-90fb434237c8601cd660dced0",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`https://pixabay.com/api/?${l}`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})},y=document.querySelector(".form-gallery"),n=document.querySelector(".gallery"),o=document.querySelector(".loader-container"),m=r=>{o.style.display="block",r.preventDefault();const l=r.currentTarget.elements.user_query.value.trim();if(l===""){o.style.display="none",c.error({message:"Please enter your request",position:"topRight"});return}p(l).then(s=>{if(s.total===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.innerHTML="";return}const a=s.hits.map(t=>u(t)).join("");n.innerHTML=a,new d(".gallery a",{captionDelay:300,captionsData:"alt"}).refresh()}).catch(s=>{console.log(s)}).finally(()=>{o.style.display="none",y.reset()})};y.addEventListener("submit",m);
//# sourceMappingURL=index.js.map
