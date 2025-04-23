import { findElements } from "@/js/utils/DOMUtils";
import { createElementFromTemplate } from "@/js/utils/templateUtils";
import initializeCounter from "@/js/components/virtualCounter";

export const template = 
/*html*/ `<div class="in-progress-section__item book-in-progress">
  <div class="book-in-progress__content">
    <div class="book-in-progress__cover cover">
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
    <div class="book-in-progress__published info-group">
      <div class="info-group__title">Published</div>
      <div class="info-group__content">|[publishDate]|</div>
    </div>
    <div class="book-in-progress__desctioption info-group description">
      <div class="info-group__title">Description</div>
      <div class="info-group__content">|[description]|</div>
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
`;


export default function render(book) {
  return createElementFromTemplate(template, book, (element, data) => {
    
    {
      const {input, decreaseButton, increaseButton} = findElements(
        element.querySelector('.book-in-progress__page-counter')
        ,{
          input: ".counter__input",
          decreaseButton: ".counter__decrease-button",
          increaseButton: ".counter__increase-button",
        }
      );
  
      initializeCounter(input, decreaseButton, increaseButton, (updatedValue) => {
        data.currentPage = updatedValue;
      });
    }

    {
      const {input, decreaseButton, increaseButton} = findElements(
        element.querySelector('.book-in-progress__rate-counter')
        ,{
          input: ".counter__input",
          decreaseButton: ".counter__decrease-button",
          increaseButton: ".counter__increase-button",
        }
      );
      
      initializeCounter(input, decreaseButton, increaseButton, (updatedValue) => {
        data.rate = updatedValue;
      }, {
        min: 0,
        max: 5,
        step: 0.1,
      });
    }

    const expandButton = element.querySelector(".book-in-progress__expand-button");
    expandButton.addEventListener('click', (e) => {
      data.isCompleted = true;
    });

    // temporary
    const cover = element.querySelector('.book-in-progress__cover');
    cover.addEventListener('click', () => {
      book.isCompleted = !book.isCompleted;
      console.log(book);
    })
  });
}