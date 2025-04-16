import { createElementFromTemplate } from "@/js/utils/templateUtils"
import { findElements } from "@/js/utils/DOMUtils";
import { snap } from "@/js/utils/mathUtils";

const template = 
/*html*/ `<div class="in-progress-section__item book-in-progress">
  <div class="book-in-progress__content">
    <div class="book-in-progress__cover">
      <img src="|[imageSrc]|" alt="book cover">
    </div>
    <div class="book-in-progress__name info-group">
      <div class="info-group__title">Title</div>
      <div class="info-group__content">|[title]|</div>
    </div>
    <div class="book-in-progress__author info-group">
      <div class="info-group__title">Author</div>
      <div class="info-group__content">|[author]|</div>
    </div>
    <div class="book-in-progress__pages info-group">
      <div class="info-group__title">Pages</div>
      <div class="info-group__content">|[pages]|</div>
    </div>
    <div class="book-in-progress__desctioption info-group">
      <div class="info-group__title">Description</div>
      <div class="info-group__content">
        <div class="info-group__text folded">|[description]|</div>
        <div class="info-group__toggle-text-button">show more</div>
      </div>
    </div>
    <div class="book-in-progress__interactions">
      <div class="book-in-progress__page-counter counter">
        <div class="counter__title">Page: </div>
        <div class="counter__controls">
          <button class="counter__decrease-button button dark">−</button>
          <input min="0" max="|[pages]|" step="1" class="counter__input" type="text" inputmode="numeric" value="|[currentPage]|">
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
      <button class="book-in-progress__read-button button dark">Read</button>
    </div>
  </div>
</div>
`;


function initializeCounter(counter, data, controlledPropertyName) {
  const {increaseButton, decreaseButton, input} = findElements(counter, {
    increaseButton: '.counter__increase-button',
    decreaseButton: '.counter__decrease-button',
    input: '.counter__input',
  });

  input.addEventListener('change', (e) => {
    const min = Number(e.target.min);
    const max = Number(e.target.max);
    const step = Number(e.target.step);
    const value = Number(e.target.value);
    const numeric = value;
    const snapped = snap(numeric, step);

    const validate = (value) => !( 
      Number.isNaN(value)
      || value > max
      || value < min
    );

    if (validate(snapped)) {
      data[controlledPropertyName] = snapped;
    }
    e.target.value = data[controlledPropertyName];
  });

  increaseButton.addEventListener('click', (e) => { 
    input.value =  Number(input.value) + Number(input.step);
    input.dispatchEvent(new Event("change"));
  });

  decreaseButton.addEventListener('click', (e) => {
    input.value =  Number(input.value) - Number(input.step);
    input.dispatchEvent(new Event("change"));
  });
}

export default function render(book) {
  return createElementFromTemplate(template, book, (element, data) => {
    const pageCounter = (element.querySelector('.book-in-progress__page-counter'));
    const rateCounter = (element.querySelector('.book-in-progress__rate-counter'));
    
    initializeCounter(pageCounter, data, 'currentPage');
    initializeCounter(rateCounter, data, 'rate');
  
    const descriptionText = element.querySelector('.info-group__text');
    const showMoreButton =  element.querySelector('.info-group__toggle-text-button');
  
    showMoreButton.addEventListener('click', (e) => {
      descriptionText.classList.toggle('folded');
      e.target.textContent = descriptionText.classList.contains('folded')
        ? "show more"
        : "hide";
    });

    const markAsReadButton = element.querySelector(".book-in-progress__read-button");
    markAsReadButton.addEventListener('click', (e) => {
      data.isRead = true;
      console.log(data);
    });
  });
}