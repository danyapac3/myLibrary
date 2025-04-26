(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();function B(o){const e=document.createElement("template");return e.innerHTML=o.trim(),e.content.firstElementChild}function x(o,e={}){return Object.keys(e).reduce((t,s)=>(t[s]=o.querySelector(e[s]),t),{})}function N(o,e){const t=/\|\[(\w*)\]\|/g;return o.replace(t,(s,i)=>i in e?e[i]:"")}function p(o,e={},t=()=>{}){const s=N(o,e),i=B(s);return t(i,e),i}const P=(o,e)=>{const t=1/e;return Math.round(o*t)/t};function C(o,e,t,s=()=>{},i={}){const{min:n=0,max:r=Number.MAX_SAFE_INTEGER-1,step:c=1,loop:d=!1}=i,_=u=>!(Number.isNaN(u)||u>r||u<n);let l=_(Number(o.value))?Number(o.value):n;o.addEventListener("change",()=>{const u=Number(o.value),a=P(u,c);_(a)?(o.value=a,l=a,s(a)):(o.value=l,s(l))}),t.addEventListener("click",()=>{o.value=Number(o.value)+Number(c),o.dispatchEvent(new Event("change"))}),e.addEventListener("click",()=>{o.value=Number(o.value)-Number(c),o.dispatchEvent(new Event("change"))})}const A=`<div class="in-progress-section__item book-in-progress">
  <div class="book-in-progress__cover cover">
    <img src="|[imageSrc]|" alt="book cover">
  </div>
  <div class="book-in-progress__content">
    <div class="book-in-progress__title info-group">
      <div class="info-group__title">Title</div>
      <div class="info-group__content"><div class="info-group__line">|[title]|</div></div>
    </div>
    <div class="book-in-progress__row">
      <div class="book-in-progress__author info-group">
        <div class="info-group__title">Author</div>
        <div class="info-group__content"><div class="info-group__line">|[author]|</div></div>
      </div>
      <div class="book-in-progress__published info-group">
        <div class="info-group__title">Published</div>
        <div class="info-group__content"><div class="info-group__line">|[publishDate]|</div></div>
      </div>
    </div>
    <div class="book-in-progress__description info-group">
      <div class="info-group__title">Description</div>
      <div class="info-group__content"><div class="info-group__text folded">|[description]|</div></div>
    </div>
    <div class="book-in-progress__interactions">
      <div class="book-in-progress__page-counter counter">
        <div class="counter__title">Page: </div>
        <div class="counter__controls">
          <button class="counter__decrease-button button dark">−</button>
          <input min="0" max="999" step="1" class="counter__input" type="text" inputmode="numeric" value="|[currentPage]|">
          <button class="counter__increase-button button dark">+</button>
        </div>
      </div>
      <div class="book-in-progress__rate-counter counter">
        <div class="counter__title">Rate: </div>
        <div class="counter__controls">
          <button class="counter__decrease-button button dark">−</button>
          <input min="0" max="5" step="0.1" class="counter__input" type="text" inputmode="numeric" value="|[rate]|">
          <button class="counter__increase-button button dark">+</button>
        </div>
      </div>
      <button class="book-in-progress__expand-button button dark">Expand</button>
    </div>
  </div>
</div>
`;function h(o,e,t,s,i={}){const{input:n,decreaseButton:r,increaseButton:c}=x(o.querySelector(e),{input:".counter__input",decreaseButton:".counter__decrease-button",increaseButton:".counter__increase-button"});C(n,r,c,d=>{t[s]=d},i)}function M(o,e=()=>{}){return p(A,o,(t,s)=>{h(t,".book-in-progress__page-counter",s,"currentPage"),h(t,".book-in-progress__rate-counter",s,"rate",{min:0,max:5,step:.1}),t.querySelector(".book-in-progress__expand-button").addEventListener("click",e)})}const O=`<div class="completed-section__item book-completed">
  <div class="book-completed__cover cover">
    <img src="|[imageSrc]|" alt="book cover">
  </div>
    <div class="book-completed__row">
      <div class="book-completed__rate">|[rate]|</div>
    </div>
    <div class="book-completed__name">|[title]|</div>
    <div class="book-completed__author">|[author]|</div>
</div>`;function D(o,e=()=>{}){return p(O,o,(t,s)=>{t.querySelector(".book-completed__cover").addEventListener("click",e)})}function F(o={}){this.imageSrc=null,this.title=null,this.author=null,this.description=null,this.currentPage=0,this.rate=5,this.publishDate=null,this.id=null,this.isCompleted=!1,Object.assign(this,o)}const y="https://openlibrary.org";function T(o={}){const e=Object.entries(o).reduce((t,[s,i])=>{const n=t==="?"?"":"&",r=i.toString().replace(/\s+/g,"+");return`${t}${n}${s}=${r}`},"?");return e!=="?"?e:""}async function j(o,e=1,t=0){const s=[],i=`${y}/search.json`+T({q:o,fields:"author_name,title,first_publish_year,key",limit:e,offset:t}),{docs:n,numFound:r}=await fetch(i).then(c=>c.json());for(let c of n){let d={imageSrc:null,title:null,author:null,description:null,publishDate:null};d.author=c.author_name?c.author_name.join(", "):"Unknown",d.title=c.title,d.publishDate=c.first_publish_year;const _=`${y}${c.key}.json?fields=description`,l=await fetch(_).then(u=>u.json());d.description=typeof l.description=="object"?l.description.value:l.description||"There is no description for this book",d.imageSrc=l.covers?`https://covers.openlibrary.org/b/id/${l.covers[0]}-L.jpg`:"/images/fallback.png",d.id=l.key.replace("/works/",""),s.push(new F(d))}return{booksFoundNumber:r-t,books:s}}const I=`<div class="modal-pick-books__book-to-pick book-to-pick">
  <div class="book-to-pick__left-side">
    <div class="book-to-pick__cover cover">
      <img src="|[imageSrc]|" width="300" height="400" alt="">
    </div>
    <div class="book-to-pick__add-book-button button dark">Add Book</div>
  </div>
  <div class="book-to-pick__content">
    <div class="book-to-pick__published info-group">
      <div class="info-group__title">Date:</div>
      <div class="info-group__content"><div class="info-group__line">|[publishDate]|</div></div>
    </div>
    <div class="book-to-pick__name info-group">
      <div class="info-group__title">Name</div>
      <div class="info-group__content"><div class="info-group__line">|[title]|</div></div>
    </div>
    <div class="book-to-pick__author info-group">
      <div class="info-group__title">Author</div>
      <div class="info-group__content"><div class="info-group__line">|[author]|</div></div>
    </div>
    <div class="book-to-pick__description info-group description">
      <div class="info-group__title">Desctiption</div>
      <div class="info-group__content"><div class="info-group__text folded">|[description]|</div></div>
    </div>
  </div>
</div>
`;function H(o,e){let t=Array.from(e).some(({id:n})=>o.id===n);const s=p(I,o),i=s.querySelector(".book-to-pick__add-book-button");return t&&(i.textContent="Added"),i.classList.toggle("inactive",t),i.addEventListener("click",n=>{t||(e.add(o),t=!0,i.classList.toggle("inactive",t)),i.textContent="Added"}),s}const R=`<dialog class="page__modal-pick-books modal-pick-books">
  <div class="modal-pick-books__close-button"></div>
  <div class="modal-pick-books__container">
    <div class="modal-pick-books__search search">
      <input placeholder="Search..." class="search__input" type="text">
      <img class="search__icon" src="images/search.svg" alt="">
    </div>
    <div class="modal-pick-books__items">
      <div class="modal-pick-books__always-in-end-box">
        <div class="modal-pick-books__load-more-button button dark invisible">Load More</div>
        <div class="modal-pick-books__nothing-found-message invisible">There is nothing found</div>
        <div class="modal-pick-books__loading-spin loading-spin invisible"></div>
      </div>
    </div>
  </div>
</dialog>`;function V(o){const e=p(R),t=e.querySelector(".modal-pick-books__items"),s=e.querySelector(".modal-pick-books__close-button"),i=t.querySelector(".modal-pick-books__always-in-end-box"),n=e.querySelector(".modal-pick-books__nothing-found-message"),r=t.querySelector(".modal-pick-books__load-more-button"),c=t.querySelector(".loading-spin"),d=e.querySelector(".search").querySelector("input"),_=[];let l=0;async function u(){n.classList.toggle("invisible",!0);const a=3;r.classList.toggle("invisible",!0),c.classList.toggle("invisible",!1);const{books:b,booksFoundNumber:m}=await j(d.value,a,l);l===0&&m===0&&n.classList.toggle("invisible",!1),l+=3;const k=m-a;r.textContent=`Load More (${k} left)`,r.classList.toggle("invisible",!(k>0));for(let $ of b){const f=H($,o);t.removeChild(i),t.appendChild(f),t.appendChild(i),_.push(f)}c.classList.toggle("invisible",!0)}return r.addEventListener("click",a=>{a.target.classList.contains("inactive")||u()}),d.addEventListener("change",a=>{l=0,_.forEach(b=>b.remove()),u()}),s.addEventListener("click",a=>{e.close()}),e}const U=`
<div class="modal-edit-book__book-to-edit book-to-edit">
  <div class="book-to-edit__cover cover">
    <img src="|[imageSrc]|" alt="">
  </div>
  <div class="book-to-edit__content">
    <div class="book-to-edit__name info-group">
      <div class="info-group__title">Name</div>
      <div class="info-group__content"><div class="info-group__line">|[title]|</div></div>
    </div>

    <div class="book-to-edit__author info-group">
      <div class="info-group__title">Author</div>
      <div class="info-group__content"><div class="info-group__line">|[author]|</div></div>
    </div>

    <div class="book-to-edit__description info-group">
      <div class="info-group__title">Desctiption</div>
      <div class="info-group__content">
        <div class="info-group__text folded">|[description]|</div>
        <div class="info-group__show-more-button">show more</div>
      </div>
    </div>

    <div class="book-to-edit__interactions">
      <div class="book-to-edit__page-counter counter">
        <div class="counter__title">Page: </div>
        <div class="counter__controls">
          <button class="counter__decrease-button button dark">−</button>
          <input class="counter__input" type="text" inputmode="numeric" value="|[currentPage]|">
          <button class="counter__increase-button button dark">+</button>
        </div>
      </div>
      <div class="book-to-edit__rate-counter counter">
        <div class="counter__title">Rate: </div>
        <div class="counter__controls">
          <button class="counter__decrease-button button dark">−</button>
          <input class="counter__input" type="text" inputmode="numeric" value="|[rate]|">
          <button class="counter__increase-button button dark">+</button>
        </div>
      </div>
      <div class="book-to-edit__toggle-state toggle dark">
        <label class="toggle__label" for="state-toggle-|[id]|">Completed:</label>
        <input class="toggle__checkbox" type="checkbox" id ="state-toggle-|[id]|">
      </div>
    </div>
  </div>
</div>
`;function S(o,e,t,s,i={}){const{input:n,decreaseButton:r,increaseButton:c}=x(o.querySelector(e),{input:".counter__input",decreaseButton:".counter__decrease-button",increaseButton:".counter__increase-button"});C(n,r,c,d=>{t[s]=d},i)}function W(o){return p(U,o,(e,t)=>{S(e,".book-to-edit__page-counter",t,"currentPage"),S(e,".book-to-edit__rate-counter",t,"rate",{min:0,max:5,step:.1});const s=e.querySelector(".book-to-edit__description .info-group__text"),i=e.querySelector(".info-group__show-more-button");i.addEventListener("click",r=>{const c=s.classList.contains("folded");i.textContent=c?"Hide":"Show more",s.classList.toggle("folded",!c)});const n=e.querySelector(".book-to-edit__toggle-state input");n.checked=t.isCompleted,n.addEventListener("change",r=>{const{checked:c}=r.target;t.isCompleted=c})})}const z=`
<dialog class="page__modal-edit-book modal-edit-book">
  <div class="modal-edit-book__close-button"></div>
</dialog>`;function G(){let o=null;const e=B(z),t=e.querySelector(".modal-edit-book__close-button");return e.showModalWithBook=s=>{o==null||o.remove(),o=W(s),e.append(o),e.showModal()},t.addEventListener("click",()=>{e.close()}),e}class K{constructor({onAdd:e=()=>{},onRemove:t=()=>{},isCompletedHandler:s=()=>{}}){this.collection=new Set,this.onAdd=e,this.onRemove=t,this.isCompletedHandler=s}add(e){let t=!1;Object.defineProperty(e,"isCompleted",{get:()=>t,set:s=>{t=s,this.isCompletedHandler()}}),this.collection.add(e),this.onAdd(e)}remove(e){this.collection.delete(e),this.onRemove(e)}[Symbol.iterator](){return this.collection.values()}}function L(o,e,t){const s=document.querySelector(`${e} .section-header__number`),i=document.querySelector(`${e}__items`);s.textContent=`(${o.length})`,i.innerHTML="",o.forEach(n=>{const r=t(n,()=>{q.showModalWithBook(n)});i.appendChild(r)})}function g(o=[]){const e=document.querySelector(".header__statistics-item span");e.textContent=o.length;const t=o.filter(i=>!i.isCompleted),s=o.filter(i=>i.isCompleted);L(t,".in-progress-section",M),L(s,".completed-section",D)}const v=new K({onAdd:()=>{g(Array.from(v))},isCompletedHandler:()=>{g(Array.from(v))}}),w=document.querySelector(".page"),X=document.querySelector(".header__add-button"),E=V(v),q=G();w.appendChild(q);X.addEventListener("click",()=>{E.showModal()});w.appendChild(E);g(Array.from(v));
