import { createElementFromTemplate } from '@/js/utils/templateUtils';

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
        <div class="info-group__toggle-text-button">show more</div>
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
      <button class="book-to-edit__change-completion-state-button button dark">Mark as read</button>
    </div>
  </div>
</div>
`;

export default function render(data) {
  const element = createElementFromTemplate(template, data)

  return element;
}