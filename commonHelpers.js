import{a as S,i as a,S as w}from"./assets/vendor-b42c18af.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function c(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(s){if(s.ep)return;s.ep=!0;const r=c(s);fetch(s.href,r)}})();const A="40405988-c6d5b0647c8f4a8e4e473288b";async function y(e,t){return(await S.get(`https://pixabay.com/api/?key=${A}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=40`)).data}function m(e,t,c){const{hits:l}=e,s=l.map(({webformatURL:r,largeImageURL:n,tags:f,likes:b,views:L,comments:$,downloads:v})=>`<div class="photo-card">    
                  <a class="photo-card-link" href="${n}">
                    <img class="searched-image" src="${r}" alt="${f}" loading="lazy" data-title="${f}"/>
                    <div class="info">
                      <p class="info-item">
                        <span class="info-title">Likes</span>
                        <span class="info-data">${b}</span>
                      </p>
                      <p class="info-item">
                        <span class="info-title">Views</span>
                        <span class="info-data">${L}</span>
                      </p>
                      <p class="info-item">
                        <span class="info-title">Comments</span>
                        <span class="info-data">${$}</span>
                      </p>
                      <p class="info-item">
                        <span class="info-title">Downloads</span>
                        <span class="info-data">${v}
                      </p></span>
                    </div>
                  </a>
              </div>`).join("");t.insertAdjacentHTML("beforeend",s),c.refresh()}const g=40,P=10;let i,d;a.settings({position:"topRight",timeout:3e3,maxWidth:400,progressBar:!1,transitionIn:"fadeIn",transitionOut:"fadeOut"});const h=new w(".gallery a",{captionType:"data",captionDelay:250}),O=document.querySelector("#search-form"),u=document.querySelector(".js-gallery"),o=document.querySelector(".js-load-more-btn"),p=document.querySelector(".js-end-of-img-list");O.addEventListener("submit",_);o.addEventListener("click",q);async function _(e){if(e.preventDefault(),i=1,d=e.target.searchQuery.value.trim(),!d){a.warning({title:"Please specify search criteria!",message:"The search query cannot be empty."});return}u.innerHTML="",o.style.display="none",p.style.display="none";try{const t=await y(d,i);if(!t.hits.length){a.error({title:"Sorry, there are no images matching your search query.",message:"Please try again."}),e.target.searchQuery.value="";return}if(e.target.searchQuery.value="",m(t,u,h),a.success({title:"Hooray!",message:`We found ${t.totalHits} images.`}),t.hits.length<g){p.style.display="block";return}o.style.display="block"}catch(t){a.error({title:"Oops. An error has occurred",message:`${t.message}.`}),console.log(t.message)}}async function q(){i++,o.visibility="hidden";try{const e=await y(d,i);if(m(e,u,h),E(),i===P){o.style.display="none",p.style.display="block";return}if(e.hits.length<g||!e.hits.length){o.style.display="none",p.style.display="block";return}o.visibility="visible"}catch(e){a.error({title:"Oops. An error has occurred",message:`${e.message}`}),console.log(e.message)}}function E(){const{height:e}=document.querySelector(".photo-card").getBoundingClientRect(),t=window.innerHeight;window.scrollBy({top:t-e,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
