import { createElementFromTemplate } from "@/js/utils/templateUtils"
import { findElements } from "@/js/utils/DOMUtils";

const template = /*html*/ `<div class="completed-section__item book-completed">
  <div class="book-completed__cover cover">
    <img src="|[imageSrc]|" alt="book cover">
  </div>
    <div class="book-completed__row">
      <div class="book-completed__rate">|[rate]|</div>
    </div>
    <div class="book-completed__name">|[title]|</div>
    <div class="book-completed__author">|[author]|</div>
</div>`;

export default function render(book) {
  return createElementFromTemplate(template, book, (element, data) => {});
}