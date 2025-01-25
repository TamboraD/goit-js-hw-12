import{a as L,i as p,S as m}from"./assets/vendor-B6jJ9_I0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const g=e=>`<li class="card-gallery">
    <div class="card">
    <a class="gallery-link" target="_blank" href="${e.largeImageURL}">
    <img class="img-gallery" src="${e.webformatURL}" alt="${e.tags}"/>
    </a>
<div class="container-gallery">
<div class="gallery-items">
<p class="title-gallery">Likes</p>
<p class="gallery-item">${e.likes}</p>
</div>

<div class="gallery-items">
<p class="title-gallery">Views</p>
<p class="gallery-item">${e.views}</p>
</div>

<div class="gallery-items">
<p class="title-gallery">Comments</p>
<p class="gallery-item">${e.comments}</p>
</div>

<div class="gallery-items">
<p class="title-gallery">Downloads</p>
<p class="gallery-item">${e.downloads}</p>
</div>
</div>
</div>
    </li>`,h=(e,t)=>{const a={params:{key:"48321272-90fb434237c8601cd660dced0",q:e,page:t,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:"true"}};return L.get("https://pixabay.com/api/",a)},f=document.querySelector(".form-gallery"),u=document.querySelector(".gallery"),y=document.querySelector(".loader-container"),o=document.querySelector(".load-more");document.querySelector(".card-gallery");let i=1,c="",n;const b=async e=>{y.style.display="block";try{if(e.preventDefault(),c=e.currentTarget.elements.user_query.value.trim(),c===""){y.style.display="none",p.error({message:"Please enter your request",position:"topRight"});return}i=1,o.classList.add("is-hidden");const{data:t}=await h(c,i);if(t.total===0){p.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u.innerHTML="";return}t.totalHits>1&&(o.classList.remove("is-hidden"),o.addEventListener("click",v));const a=t.hits.map(l=>g(l)).join("");u.innerHTML=a,n=new m(".gallery a",{captionDelay:300,captionsData:"alt"}),n.refresh()}catch(t){console.log(t)}y.style.display="none",f.reset()};f.addEventListener("submit",b);const v=async e=>{try{i++;const{data:t}=await h(c,i),a=t.hits.map(l=>g(l)).join("");n=new m(".gallery a",{captionDelay:300,captionsData:"alt"}),u.insertAdjacentHTML("beforeend",a),n.refresh(),i===t.totalHits&&(o.classList.add("is-hidden"),o.removeEventListener("click",v),p.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),w()}catch(t){console.log(t)}};function w(){let e=document.querySelector(".card-gallery").getBoundingClientRect().height;window.scrollBy({top:document.body.scrollTop+Math.floor(e*2),behavior:"smooth"})}
//# sourceMappingURL=index.js.map
