import { createElementFromTemplate } from "@/js/utils/templateUtils";
import renderBookToPick from "@/js/components/bookToPick";
import { createBook } from "@/js/factories/book";

const template =
/*html*/ `<dialog class="page__modal-pick-books modal-pick-books">
  <div class="modal-pick-books__close-button"></div>
  <div class="modal-pick-books__container">
    <div class="modal-pick-books__search search">
      <input placeholder="Search..." class="search__input" type="text">
      <img class="search__icon" src="images/search.svg" alt="">
    </div>
    <div class="modal-pick-books__items">
    </div>
  </div>
</dialog>`;

// temporary
const book = createBook({
  imageSrc: '/images/cover.jpg',
  title: 'The lord of the rings',
  author: 'A.J. Danya',
  description: `The Eighth Story. Nineteen Years Later. Based on an original new story by J.K. Rowling, John Tiffany, and Jack Thorne, a new play by Jack Thorne, "Harry Potter and the Cursed Child" is the eighth story in the Harry Potter series and the first official Harry Potter story to be presented on stage. The play will receive its world premiere in London's West End on July 30, 2016. It was always difficult being Harry Potter and it isn't much easier now that he is an overworked employee of the Ministry of Magic, a husband and father of three school-age children. While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted. As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes, darkness comes from unexpected places.`,
  pages: 200,
  category: 'History',
  lang: 'eng',
  publishDate: 2016,
  isCompleted: Boolean(Math.round(Math.random())),
});
// ------------

export default function render() {
  const modal = createElementFromTemplate(template);
  const modalItems = modal.querySelector('.modal-pick-books__items');

  const bookToPick = renderBookToPick(book);
  modalItems.appendChild(bookToPick);

  const closeButton = modal.querySelector('.modal-pick-books__close-button');
  closeButton.addEventListener('click', (e) => {
    modal.close()
  });

  const search = modal.querySelector('.search');
  search.addEventListener('change', async (e) => {
    
  });
  return modal;
}