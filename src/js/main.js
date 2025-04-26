// import "./styles";
import renderBookInProgress from "@/js/components/bookInProgress";
import renderBookCompleted from "@/js/components/bookCompleted";
import renderModalPickBook from "@/js/components/мodalPickBook";
import renderModalEditBook from "@/js/components/modalEditBook";
import { BookCollection } from "@/js/classes/bookCollection";
import { findElements } from "@/js/utils/DOMUtils";


function mountBooks(books, sectionSelector, renderFunction) {
  const sectionCounter = document.querySelector(`${sectionSelector} .section-header__number`);
  const sectionItems = document.querySelector(`${sectionSelector}__items`);

  sectionCounter.textContent = `(${books.length})`;

  sectionItems.innerHTML = '';
  books.forEach((book) => {
    const renderedBook = renderFunction(book, () => {
      modalEditBook.showModalWithBook(book)
    });
    sectionItems.appendChild(renderedBook);
  });
}

function renderBooks(books = []) {
  const booksInLibraryCounter = document.querySelector('.header__statistics-item span');
  booksInLibraryCounter.textContent = books.length;

  const booksInProgress = books.filter((book) => !book.isCompleted);
  const booksCompleted = books.filter((book) => book.isCompleted);

  mountBooks(booksInProgress, '.in-progress-section', renderBookInProgress);
  mountBooks(booksCompleted, '.completed-section', renderBookCompleted);
}

const books = new BookCollection(
  {
    onAdd: () => {
      renderBooks(Array.from(books))
    },
    isCompletedHandler: () => {
      renderBooks(Array.from(books));
    }
  }
);

const pageElement = document.querySelector('.page');
const pickNewBookButton = document.querySelector('.header__add-button');
const modalPickBook = renderModalPickBook(books);
const modalEditBook = renderModalEditBook();


pageElement.appendChild(modalEditBook);


pickNewBookButton.addEventListener('click', () => {
  modalPickBook.showModal();
});
pageElement.appendChild(modalPickBook);

renderBooks(Array.from(books));