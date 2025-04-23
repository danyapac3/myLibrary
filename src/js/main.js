// import "./styles";
import renderBookInProgress from "@/js/components/bookInProgress";
import renderBookCompleted from "@/js/components/bookCompleted";
import renderModalPickBook from "@/js/components/мodalPickBook";
import renderModalEditBook from "@/js/components/modalEditBook";
import { BookCollection } from "@/js/classes/bookCollection";


function mountBooks(books = []) {
  const inProgressSectionItems = document.querySelector('.in-progress-section__items');
  const completedSectionItems = document.querySelector('.completed-section__items');

  const booksInProgress = books.filter((book) => !book.isCompleted);
  const booksCompleted = books.filter((book) => book.isCompleted);
  
  inProgressSectionItems.innerHTML = '';
  booksInProgress.forEach((book) => {
    const renderedBook =  renderBookInProgress(book);
    inProgressSectionItems.appendChild(renderedBook);
  });

  completedSectionItems.innerHTML = '';
  booksCompleted.forEach((book) => {
    const renderedBook =  renderBookCompleted(book);
    renderedBook.addEventListener('click', () => {
      modalEditBook.showModalWithBook(book);
    });
    completedSectionItems.appendChild(renderedBook);
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
const modalEditBook = renderModalEditBook();

pageElement.append(modalEditBook);


pickNewBookButton.addEventListener('click', () => {
  modalPickBook.showModal();
});
pageElement.appendChild(modalPickBook);

mountBooks();

// //debug modal-edit-book
// const debugBook = {
//   "imageSrc": "https://covers.openlibrary.org/b/id/4342323-L.jpg",
//   "title": "The Book of Dragons",
//   "author": "Edith Nesbit",
//   "description": "Eight madcap tales of unpredictable dragons — including one made of ice, another that takes refuge in the General Post Office, and a fire-breathing monster that flies out of an enchanted book and eats an entire soccer team! Marvelous adventure and excitement for make-believers of all ages. hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ",
//   "currentPage": 0,
//   "rate": 5,
//   "publishDate": 1973,
//   "id": "OL99529W",
//   "isCompleted": true
// }

// modalEditBook.showModalWithBook(debugBook);