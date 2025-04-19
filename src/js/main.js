import "./styles";
import renderBookInProgress from "@/js/components/bookInProgress";
import renderBookCompleted from "@/js/components/bookCompleted";
import renderModalPickBook from "@/js/components/мodalPickBook";
import { mountElements } from "@/js/utils/DOMUtils";
import { getBooks } from "@/js/booksAPI";

import { createBook } from "@/js/factories/book"


const books = [];
for (let i = 0; i < 4; i++) {
  const book = createBook({
    imageSrc: '/images/cover.jpg',
    title: 'The lord of the rings',
    author: 'A.J. Danya',
    description: `The Eighth Story. Nineteen Years Later. Based on an original new story by J.K. Rowling, John Tiffany, and Jack Thorne, a new play by Jack Thorne, "Harry Potter and the Cursed Child" is the eighth story in the Harry Potter series and the first official Harry Potter story to be presented on stage. The play will receive its world premiere in London's West End on July 30, 2016. It was always difficult being Harry Potter and it isn't much easier now that he is an overworked employee of the Ministry of Magic, a husband and father of three school-age children. While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted. As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes, darkness comes from unexpected places.`,
    pages: 200,
    category: 'Histoy',
    lang: 'eng',
    publishDate: 2016,
    isCompleted: Boolean(Math.round(Math.random())),
  });
  books.push(book);
}


function mountBooks() {
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

const pageElement = document.querySelector('.page');
const modalPickBook = renderModalPickBook();
pageElement.appendChild(modalPickBook);


const pickNewBookButton = document.querySelector('.header__add-button');
pickNewBookButton.addEventListener('click', (e) => {
  modalPickBook.showModal();
});
