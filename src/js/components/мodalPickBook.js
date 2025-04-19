import { createElementFromTemplate } from "@/js/utils/templateUtils";
import { createBook } from "@/js/factories/book";
import { fetchBooks } from "@/js/booksAPI";
import renderBookToPick from "@/js/components/bookToPick";


const template =
/*html*/ `<dialog class="page__modal-pick-books modal-pick-books">
  <div class="modal-pick-books__close-button"></div>
  <div class="modal-pick-books__container">
    <div class="modal-pick-books__search search">
      <input placeholder="Search..." class="search__input" type="text">
      <img class="search__icon" src="images/search.svg" alt="">
    </div>
    <div class="modal-pick-books__items">
      <div class="modal-pick-books__load-more-button button dark">Load More </div> 
    </div>
  </div>
</dialog>`;

export default function render() {
  const modal = createElementFromTemplate(template);
  const modalItems = modal.querySelector('.modal-pick-books__items');

  const closeButton = modal.querySelector('.modal-pick-books__close-button');
  closeButton.addEventListener('click', (e) => {
    modal.close()
  });



  const loadMoreButton = modalItems.querySelector('.modal-pick-books__load-more-button');
  const search = modal.querySelector('.search').querySelector('input');
  const loadedBooks = [];
  let loadOffset = 0;

  async function loadBooks() {
    const { books } = await fetchBooks(search.value, 3, loadOffset);
    console.log(books);
    loadOffset += 3;
    for (let book of books) {
      const bookToPick = renderBookToPick(book);
      modalItems.removeChild(loadMoreButton);
      modalItems.appendChild(bookToPick);
      modalItems.appendChild(loadMoreButton);

      loadedBooks.push(bookToPick); 
    }
  }

  loadMoreButton.addEventListener('click', (e) => {
    loadBooks();
  });
  
  search.addEventListener('change', (e) => {
    loadOffset = 0;
    loadedBooks.forEach(e => e.remove());

    loadBooks();
  });

  return modal;
}