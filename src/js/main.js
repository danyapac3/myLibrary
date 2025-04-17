import "./styles";
import renderBookInProgress from "@/js/components/bookInProgress"
import renderBookCompleted from "@/js/components/bookCompleted"
import {mountElements} from "@/js/utils/DOMUtils"


function createBook(properties = {}) {
  let _isCompleted = properties.isCompleted || false;
  delete properties.isCompleted;
  const book = {
    imageSrc: null,
    title: null,
    author: null,
    description: null,
    pages: null,
    currentPage: 0,
    rate: 5,
    lang: null,
    publishDate: null,
  }

  Object.defineProperty(book, 'isCompleted', {
    get: () => _isCompleted,
    set: (value) => {
      _isCompleted = value;
      mountBooks();
    }
  });

  return Object.assign(book, properties);
}


const books = [];
for (let i = 0; i < 4; i++) {
  const book = createBook({
    imageSrc: '/images/cover.jpg',
    title: 'The lord of the rings',
    author: 'A.J. Danya',
    description: `The Eighth Story. Nineteen Years Later. Based on an original new story by J.K. Rowling, John Tiffany, and Jack Thorne, a new play by Jack Thorne, "Harry Potter and the Cursed Child" is the eighth story in the Harry Potter series and the first official Harry Potter story to be presented on stage. The play will receive its world premiere in London's West End on July 30, 2016. It was always difficult being Harry Potter and it isn't much easier now that he is an overworked employee of the Ministry of Magic, a husband and father of three school-age children. While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted. As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes, darkness comes from unexpected places.`,
    pages: 200,
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
  console.log(booksCompleted)
  booksCompleted.forEach((book) => {
    const renderedBook =  renderBookCompleted(book)
    completedSectionContainer.appendChild(renderedBook);
  });
}

mountBooks();


const addNewBookButton = document.querySelector('.header__add-button');
const modalPickBooks = document.querySelector('.modal-pick-books');

addNewBookButton.addEventListener('click', (e) => {
  modalPickBooks.showModal();
});

modalPickBooks.showModal();

// // ---Debug--- //

// const modal1 = document.querySelector('.modal-edit-book');
// modal1.showModal();