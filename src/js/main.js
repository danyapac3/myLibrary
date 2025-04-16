import "./styles";
import renderBookInProgress from "@/js/components/bookInProgress"

function createBook(
  imageSrc, title, author,
  description, pages, lang,
  publishDate,
) {
  return {
    imageSrc,
    title,
    author,
    description,
    pages,
    currentPage: 0,
    rate: 5,
    lang,
    publishDate,
    isRead: false,
  }
}

const books = [createBook(
  '/images/cover.jpg',
  'The lord of the rings',
  'A.J. Danya',
  `The Eighth Story. Nineteen Years Later. Based on an original new story by J.K. Rowling, John Tiffany, and Jack Thorne, a new play by Jack Thorne, "Harry Potter and the Cursed Child" is the eighth story in the Harry Potter series and the first official Harry Potter story to be presented on stage. The play will receive its world premiere in London's West End on July 30, 2016. It was always difficult being Harry Potter and it isn't much easier now that he is an overworked employee of the Ministry of Magic, a husband and father of three school-age children. While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted. As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes, darkness comes from unexpected places.`,
  200,
  'eng',
  2016,
)];




const book = renderBookInProgress(books[0]);

const firstBook = document.querySelector('.book-in-progress');

firstBook.replaceWith(book);


// // ---Debug--- //
// const modal = document.querySelector('.modal-pick-books');
// modal.showModal();
// const modal1 = document.querySelector('.modal-edit-book');
// modal1.showModal();