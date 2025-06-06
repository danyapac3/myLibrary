import { createElementFromTemplate } from "@/js/utils/templateUtils";

const template = 
/*html*/ `<div class="modal-pick-books__book-to-pick book-to-pick">
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
`;

export default function render( book, booksCollection ) {
  let isAdded = Array.from(booksCollection).some(({id}) => book.id === id);
  const element = createElementFromTemplate(template, book);
  const addNewBookButton = element.querySelector(".book-to-pick__add-book-button");
  if (isAdded) {
    addNewBookButton.textContent = "Added";
  }
  
  addNewBookButton.classList.toggle('inactive', isAdded);
  addNewBookButton.addEventListener('click', (e) => {
    if (!isAdded) {
      booksCollection.add(book);
      isAdded = true;
      addNewBookButton.classList.toggle('inactive', isAdded);
    }
    
    addNewBookButton.textContent = "Added";
  });
  
  return element;
}