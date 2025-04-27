import initializeCounter from '@/js/components/virtualCounter';
import { createElementFromTemplate } from '@/js/utils/templateUtils';
import { findElements } from '@/js/utils/DOMUtils';

const template = 
/*html*/`
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
`;

function setupCounter(element, counterSelector, data, key, options = {}) {
  const {input, decreaseButton, increaseButton} = findElements(
    element.querySelector(counterSelector)
    ,{
      input: ".counter__input",
      decreaseButton: ".counter__decrease-button",
      increaseButton: ".counter__increase-button",
    }
  );

  initializeCounter(input, decreaseButton, increaseButton, (updatedValue) => {
    data[key] = updatedValue;
  }, options);
}

export default function render(book) {
  return createElementFromTemplate(template, book, (element, data) => {
    setupCounter(element, '.book-to-edit__page-counter', data ,'currentPage');
  
    setupCounter(element,'.book-to-edit__rate-counter', data, 'rate',
      {
        min: 0,
        max: 5,
        step: 0.1,
      }
    );

    const description = element.querySelector(".book-to-edit__description .info-group__text");
    const showMoreButton = element.querySelector('.info-group__show-more-button');
    showMoreButton.addEventListener('click', (e) => {
      const isFolded = description.classList.contains('folded');
      showMoreButton.textContent = isFolded ? "Hide" : "Show more";
      description.classList.toggle('folded', !isFolded);
    });

    const toggleCompleteInput = element.querySelector('.book-to-edit__toggle-state input');
    toggleCompleteInput.checked = data.isCompleted;
    toggleCompleteInput.addEventListener('change', (e) => {
      const { checked } = e.target;
      data.isCompleted = checked; 
    });
  });
}