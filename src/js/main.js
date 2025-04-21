// import "./styles";
import renderBookInProgress from "@/js/components/bookInProgress";
import renderBookCompleted from "@/js/components/bookCompleted";
import renderModalPickBook from "@/js/components/мodalPickBook";
import { BookCollection } from "@/js/classes/bookCollection";


function mountBooks(books = []) {
  const inProgressSectionContainer = document.querySelector('.in-progress-section__items');
  const completedSectionContainer = document.querySelector('.completed-section__items');

  const booksInProgress = books.filter((book) => !book.isCompleted);
  const booksCompleted = books.filter((book) => book.isCompleted);
  
  inProgressSectionContainer.innerHTML = '';
  booksInProgress.forEach((book) => {
    const renderedBook =  renderBookInProgress(book)
    inProgressSectionContainer.appendChild(renderedBook);
  });

  completedSectionContainer.innerHTML = '';
  booksCompleted.forEach((book) => {
    const renderedBook =  renderBookCompleted(book)
    completedSectionContainer.appendChild(renderedBook);
  });
}

const books = new BookCollection(
  {
    onAdd: () => {
      mountBooks(Array.from(books))
    },
    isCompletedHandler: () => {
      mountBooks(Array.from(books));
    }
  }
);

const pageElement = document.querySelector('.page');
const pickNewBookButton = document.querySelector('.header__add-button');
const modalPickBook = renderModalPickBook(books);


pickNewBookButton.addEventListener('click', () => {
  modalPickBook.showModal();
});
pageElement.appendChild(modalPickBook);

mountBooks();








