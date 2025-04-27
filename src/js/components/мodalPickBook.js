import { createElementFromTemplate } from "@/js/utils/templateUtils";
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
      <div class="modal-pick-books__always-in-end-box">
        <div class="modal-pick-books__load-more-button button dark invisible">Load More</div>
        <div class="modal-pick-books__nothing-found-message invisible">There is nothing found</div>
        <div class="modal-pick-books__loading-spin loading-spin invisible"></div>
      </div>
    </div>
  </div>
</dialog>`;

export default function render(booksCollection) {
  const modal = createElementFromTemplate(template);
  const modalItems = modal.querySelector('.modal-pick-books__items');
  const closeButton = modal.querySelector('.modal-pick-books__close-button');
  const endBox = modalItems.querySelector('.modal-pick-books__always-in-end-box');
  const nothingFoundMessage = modal.querySelector('.modal-pick-books__nothing-found-message');
  const loadMoreButton = modalItems.querySelector('.modal-pick-books__load-more-button');
  const loadingSpin = modalItems.querySelector('.loading-spin');
  const search = modal.querySelector('.search').querySelector('input');
 
  let loadedBooks = [];
  let loadOffset = 0;
  let booksPerLoad = 3;
  let currentLoadingController = null;

  function interruptLoading() {
    loadOffset = 0;
    currentLoadingController?.abort();
  }

  function clearSearch() {
    loadingSpin.classList.toggle('invisible', true);
    loadedBooks.forEach(e => e.remove());
    loadMoreButton.classList.toggle('invisible', true);
    // loadedBooks = [];
  }

  function loadBooks() {
    nothingFoundMessage.classList.toggle('invisible', true)
    loadingSpin.classList.toggle('invisible', false);

    currentLoadingController = fetchBooks(search.value, booksPerLoad, loadOffset, (books, booksFoundNumber) => {
      if (loadOffset === 0 && booksFoundNumber === 0) {
        nothingFoundMessage.classList.toggle('invisible', false)
      } 
      loadOffset += booksPerLoad;
  
      const booksLeft = booksFoundNumber - booksPerLoad;
  
      loadMoreButton.textContent = `Load More (${booksLeft} left)`;
      loadMoreButton.classList.toggle('invisible', !(booksLeft > 0));

      for (let book of books) {
        const bookToPick = renderBookToPick(book, booksCollection);
        modalItems.removeChild(endBox);
        modalItems.appendChild(bookToPick);
        modalItems.appendChild(endBox);
  
        loadedBooks.push(bookToPick); 
      }
  
      loadingSpin.classList.toggle('invisible', true);
    });
  }

  loadMoreButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('inactive')) {
      return;
    }
    loadBooks();
  });
  
  search.addEventListener('change', (e) => {
    interruptLoading();
    clearSearch()
    loadBooks();
  });

  closeButton.addEventListener('click', (e) => {
    modal.close()
  });
  
  modal.addEventListener('close', (e) => {
    interruptLoading();
    clearSearch()
  })
  
  return modal;
}