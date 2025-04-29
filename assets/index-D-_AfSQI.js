(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=o(i);fetch(i.href,s)}})();function q(t){const e=document.createElement("template");return e.innerHTML=t.trim(),e.content.firstElementChild}function P(t,e={}){return Object.keys(e).reduce((o,n)=>(o[n]=t.querySelector(e[n]),o),{})}function T(t,e){const o=/\|\[(\w*)\]\|/g;return t.replace(o,(n,i)=>i in e?e[i]:"")}function b(t,e={},o=()=>{}){const n=T(t,e),i=q(n);return o(i,e),i}const F=(t,e)=>{const o=1/e;return Math.round(t*o)/o};function $(t,e,o,n=()=>{},i={}){const{min:s=0,max:r=Number.MAX_SAFE_INTEGER-1,step:c=1,loop:u=!1}=i,a=l=>!(Number.isNaN(l)||l>r||l<s);let _=a(Number(t.value))?Number(t.value):s;t.addEventListener("change",()=>{const l=Number(t.value),d=F(l,c);a(d)?(t.value=d,_=d,n(d)):(t.value=_,n(_))});function p(){t.dispatchEvent(new Event("change"))}o.addEventListener("click",()=>{t.value=Number(t.value)+Number(c),p()}),e.addEventListener("click",()=>{t.value=Number(t.value)-Number(c),p()})}const K=`<div class="in-progress-section__item book-in-progress">
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
`;function w(t,e,o,n,i={}){const{input:s,decreaseButton:r,increaseButton:c}=P(t.querySelector(e),{input:".counter__input",decreaseButton:".counter__decrease-button",increaseButton:".counter__increase-button"});$(s,r,c,u=>{o[n]=u},i)}function R(t,e=()=>{}){return b(K,t,(o,n)=>{w(o,".book-in-progress__page-counter",n,"currentPage"),w(o,".book-in-progress__rate-counter",n,"rate",{min:0,max:5,step:.1}),o.querySelector(".book-in-progress__expand-button").addEventListener("click",e)})}const V=`<div class="completed-section__item book-completed">
  <div class="book-completed__cover cover">
    <img src="|[imageSrc]|" alt="book cover">
  </div>
    <div class="book-completed__row">
      <div class="book-completed__rate">|[rate]|</div>
    </div>
    <div class="book-completed__name">|[title]|</div>
    <div class="book-completed__author">|[author]|</div>
</div>`;function H(t,e=()=>{}){return b(V,t,(o,n)=>{o.querySelector(".book-completed__cover").addEventListener("click",e)})}function J(t={}){this.imageSrc=null,this.title=null,this.author=null,this.description=null,this.currentPage=0,this.rate=5,this.publishDate=null,this.id=null,this.isCompleted=!1,Object.assign(this,t)}const x="https://openlibrary.org";function W(t={}){const e=Object.entries(t).reduce((o,[n,i])=>{const s=o==="?"?"":"&",r=i.toString().replace(/\s+/g,"+");return`${o}${s}${n}=${r}`},"?");return e!=="?"?e:""}function z(t,e=1,o=0,n=()=>{},i=()=>{}){const s=new AbortController,r=`${x}/search.json`+W({q:t,fields:"author_name,title,first_publish_year,key",limit:e,offset:o});return fetch(r,{signal:s.signal}).then(c=>c.json()).then(({docs:c,numFound:u})=>Promise.all(c.map(async a=>{const _=`${x}${a.key}.json?fields=description`;let p;try{p=await fetch(_,{signal:s.signal})}catch(m){return m instanceof AbortError?Promise.reject():null}const l=await p.json();let d={imageSrc:null,title:null,author:null,description:null,publishDate:null};return d.author=a.author_name?a.author_name.join(", "):"Unknown",d.title=a.title,d.publishDate=a.first_publish_year,d.description=typeof l.description=="object"?l.description.value:l.description||"There is no description for this book",d.imageSrc=l.covers&&l.covers[0]!==-1?`https://covers.openlibrary.org/b/id/${l.covers[0]}-L.jpg`:"images/fallback.png",d.id=l.key.replace("/works/",""),new J(d)}).filter(a=>a!==null)).then(a=>{n(a,u-o)})).catch(c=>{i()}),{abort:()=>{s.abort()}}}function A(t,e,o=()=>{}){let n=null;return()=>{n!==null&&(clearTimeout(n),n=null,o()),n=setTimeout(()=>{t(),n=null},e)}}const G=`<div class="modal-pick-books__book-to-pick book-to-pick">
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
`;function X(t,e){let o=Array.from(e).some(({id:s})=>t.id===s);const n=b(G,t),i=n.querySelector(".book-to-pick__add-book-button");return o&&(i.textContent="Added"),i.classList.toggle("inactive",o),i.addEventListener("click",s=>{o||(e.add(t),o=!0,i.classList.toggle("inactive",o)),i.textContent="Added"}),n}const Y=`<dialog class="page__modal-pick-books modal-pick-books">
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
</dialog>`;function Z(t){const e=b(Y),o=e.querySelector(".modal-pick-books__items"),n=e.querySelector(".modal-pick-books__close-button"),i=o.querySelector(".modal-pick-books__always-in-end-box"),s=e.querySelector(".modal-pick-books__nothing-found-message"),r=o.querySelector(".modal-pick-books__load-more-button"),c=o.querySelector(".loading-spin"),u=e.querySelector(".search").querySelector("input");let a=[],_=0,p=3,l=null;function d(){_=0,l==null||l.abort(),c.classList.toggle("invisible",!0)}function m(){c.classList.toggle("invisible",!0),r.classList.toggle("invisible",!0),a.forEach(v=>v.remove())}function y(){r.classList.toggle("invisible",!0),s.classList.toggle("invisible",!0),c.classList.toggle("invisible",!1),l=z(u.value,p,_,(v,L)=>{_===0&&L===0&&s.classList.toggle("invisible",!1),_+=p;const S=L-p;r.textContent=`Load More (${S} left)`,r.classList.toggle("invisible",!(S>0));for(let O of v){const B=X(O,t);o.removeChild(i),o.appendChild(B),o.appendChild(i),a.push(B)}c.classList.toggle("invisible",!0)},()=>{})}const D=A(y,500);return r.addEventListener("click",v=>{v.target.classList.contains("inactive")||y()}),u.addEventListener("input",v=>{u.value.trim()!==""&&(d(),m(),D())}),n.addEventListener("click",v=>{e.close()}),e.addEventListener("close",v=>{d(),m(),u.value=""}),e}const Q=`
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
`;function C(t,e,o,n,i={}){const{input:s,decreaseButton:r,increaseButton:c}=P(t.querySelector(e),{input:".counter__input",decreaseButton:".counter__decrease-button",increaseButton:".counter__increase-button"});$(s,r,c,u=>{o[n]=u},i)}function ee(t){return b(Q,t,(e,o)=>{C(e,".book-to-edit__page-counter",o,"currentPage"),C(e,".book-to-edit__rate-counter",o,"rate",{min:0,max:5,step:.1});const n=e.querySelector(".book-to-edit__description .info-group__text"),i=e.querySelector(".info-group__show-more-button");i.addEventListener("click",r=>{const c=n.classList.contains("folded");i.textContent=c?"Hide":"Show more",n.classList.toggle("folded",!c)});const s=e.querySelector(".book-to-edit__toggle-state input");s.checked=o.isCompleted,s.addEventListener("change",r=>{const{checked:c}=r.target;o.isCompleted=c})})}const te=`
<dialog class="page__modal-edit-book modal-edit-book">
  <div class="modal-edit-book__close-button"></div>
</dialog>`;function oe(){let t=null;const e=q(te),o=e.querySelector(".modal-edit-book__close-button");return e.showModalWithBook=n=>{t==null||t.remove(),t=ee(n),e.append(t),e.showModal()},o.addEventListener("click",()=>{e.close()}),e}function E(t,e,o){return new Proxy(t,{set(n,i,s){const r=Reflect.set(...arguments);return["isCompleted"].includes(i)&&e(),["currentPage","rate"].includes(i)&&o(),r}})}class ie{constructor(e={}){const{collection:o=[],onUpgrade:n=()=>{},onUpdate:i=()=>{}}=e;this.onUpgrade=n,this.onUpdate=i,this.collection=new Set(o.map(s=>E(s,this.onUpgrade,this.onUpdate)))}add(e){const o=E(e,this.onUpgrade,this.onUpdate);this.collection.add(o),this.onUpgrade()}remove(e){this.collection.delete(e),this.onUpgrade()}stringified(){return JSON.stringify(Array.from(this.collection))}[Symbol.iterator](){return this.collection.values()}static createFromString(e,o={}){let n=null;try{n=JSON.parse(e)}catch{n=[]}return Array.isArray(n)||(n=[]),new this({collection:n,...o})}}const f={storageKey:"books",save(t){localStorage.setItem(this.storageKey,t)},load(){return localStorage.getItem(this.storageKey)||""}};function N(t,e,o){const n=document.querySelector(`${e} .section-header__number`),i=document.querySelector(`${e}__items`);n.textContent=`(${t.length})`,i.innerHTML="",t.forEach(s=>{const r=o(s,()=>{h.showModalWithBook(s)});i.appendChild(r)})}function ne(t){const e=t.filter(o=>!o.isCompleted);N(e,".in-progress-section",R)}function M(t){function e(i,s){return s===""?i:i.filter(({title:r,author:c,description:u})=>r.toLowerCase().includes(s.toLowerCase())||c.toLowerCase().includes(s.toLowerCase())||u.toLowerCase().includes(s.toLowerCase()))}const o=t.filter(i=>i.isCompleted),n=e(o,j.value);N(n,".completed-section",H)}function k(t){const e=document.querySelector(".header__statistics-item span");e.textContent=t.length,ne(t),M(t)}const g=ie.createFromString(f.load(),{onUpdate(){f.save(g.stringified())},onUpgrade(){f.save(g.stringified()),k(Array.from(g))}}),U=document.querySelector(".page"),se=document.querySelector(".header__add-button"),I=Z(g),h=oe(),j=document.querySelector(".completed-section .section-header__search input");h.addEventListener("close",()=>{k(Array.from(g))});j.addEventListener("input",A(()=>{M(Array.from(g))},700));U.appendChild(h);se.addEventListener("click",()=>{I.showModal()});U.appendChild(I);k(Array.from(g));
