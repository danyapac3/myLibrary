// import "./styles";
import renderBookInProgress from "@/js/components/bookInProgress";
import renderBookCompleted from "@/js/components/bookCompleted";
import renderModalPickBook from "@/js/components/мodalPickBook";
import renderModalEditBook from "@/js/components/modalEditBook";
import { BookCollection } from "@/js/classes/bookCollection";

const booksStorage = {
  storageKey: 'books',
  save(books) {
    localStorage.setItem(this.storageKey, books);
  },
  load() {
    return localStorage.getItem(this.storageKey) || "";
  }
}


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

function renderBooksInProgress(books) {
  const booksInProgress = books.filter((book) => !book.isCompleted);
  mountBooks(booksInProgress, '.in-progress-section', renderBookInProgress);
}

function renderBooksCompleted(books) {
  function filterBooksBySearch(books, searchQuery) {
    if (searchQuery === '') return books;
    return books.filter(({title, author, description}) => {
      return  (
        title.toLowerCase().includes(searchQuery.toLowerCase())
        || author.toLowerCase().includes(searchQuery.toLowerCase())
        || description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }

  const booksCompleted = books.filter((book) => book.isCompleted);
  const booksFound = filterBooksBySearch(booksCompleted, completedSearchBarInput.value);
  mountBooks(booksFound, '.completed-section', renderBookCompleted);
}

function renderBooks(books) {
  const booksInLibraryCounter = document.querySelector('.header__statistics-item span');
  booksInLibraryCounter.textContent = books.length;

  renderBooksInProgress(books);
  renderBooksCompleted(books);
}

const books = BookCollection.createFromString(
  booksStorage.load()
  ,{
    onUpdate () {
      booksStorage.save(books.stringified());
    },
    onUpgrade() {
      booksStorage.save(books.stringified());
      renderBooks(Array.from(books));
    }
  }
);


const pageElement = document.querySelector('.page');
const pickNewBookButton = document.querySelector('.header__add-button');
const modalPickBook = renderModalPickBook(books);
const modalEditBook = renderModalEditBook();
const completedSearchBarInput = document.querySelector('.completed-section .section-header__search input');

modalEditBook.addEventListener('close', () => {
  renderBooks(Array.from(books));
});

completedSearchBarInput.addEventListener('change', () => {
  renderBooksCompleted(Array.from(books));
});

pageElement.appendChild(modalEditBook);


pickNewBookButton.addEventListener('click', () => {
  modalPickBook.showModal();
});
pageElement.appendChild(modalPickBook);

renderBooks(Array.from(books));