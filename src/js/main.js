import "./styles";
import renderBookInProgress from "@/js/components/bookInProgress";
import renderBookCompleted from "@/js/components/bookCompleted";
import renderModalPickBook from "@/js/components/мodalPickBook";
import { BookCollection } from "@/js/classes/bookCollection";
import { Book } from "@/js/classes/book"


function mountBooks(books = []) {
  console.log(books);
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

mountBooks();


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
const modalPickBook = renderModalPickBook({
  onAddBook: (book) => {
    books.add(book)
  }
});


pageElement.appendChild(modalPickBook);


const pickNewBookButton = document.querySelector('.header__add-button');
pickNewBookButton.addEventListener('click', (e) => {
  modalPickBook.showModal();
});
