import { createElementFromTemplate } from "@/js/utils/templateUtils";

const template = 
/*html*/ `<div class="modal-pick-books__book-to-pick book-to-pick">
  <div class="book-to-pick__left-side">
    <div class="book-to-pick__cover">
      <img src="/images/cover.jpg" width="300" height="400" alt="">
    </div>
    <div class="book-to-pick__select-book-toggle toggle-button">
      <input class="toggle-button__checkbox" type="checkbox"  id="rediculous-id-1">
      <label class="toggle-button__label" for="rediculous-id-1">Add</label>
    </div>
  </div>
  <div class="book-to-pick__content">
    <div class="book-to-pick__date info-group short">
      <div class="info-group__title">Date:</div>
      <div class="info-group__content">|[publishDate]|</div>
    </div>
    <div class="book-to-pick__language info-group short">
      <div class="info-group__title">Language:</div>
      <div class="info-group__content">|[lang]|</div>
    </div>
    <div class="book-to-pick__pages info-group short">
      <div class="info-group__title">Pages</div>
      <div class="info-group__content">|[pages]|</div>
    </div>
    <div class="book-to-pick__name info-group">
      <div class="info-group__title">Name</div>
      <div class="info-group__content">|[title]|</div>
    </div>
    <div class="book-to-pick__author info-group">
      <div class="info-group__title">Author</div>
      <div class="info-group__content">|[author]|</div>
    </div>
    <div class="book-to-pick__category info-group">
      <div class="info-group__title">Category</div>
      <div class="info-group__content">|[category]|</div>
    </div>
    <div class="book-to-pick__description info-group description">
      <div class="info-group__title">Desctiption</div>
      <div class="info-group__text">|[description]|</div>
      <div class="info-group__toggle-text-button">show</div>
    </div>
  </div>
</div>
`;

export default function render(book) {
  const element = createElementFromTemplate(template, book);
  const descriptionText = element.querySelector('.book-to-pick__description .info-group__text')
  const showMoreButton = element.querySelector('info-group__toggle-text-button');

  

  return element;
}
