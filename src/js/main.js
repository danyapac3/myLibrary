import "./styles";
import { createElementFromTemplate } from "@/js/utils/templateUtils"
import { findElements } from "@/js/utils/DOMUtils";
import { snap } from "@/js/utils/mathUtils";
import templates from "@/js/templates";

const books = [{
  imageSrc: '/images/cover.jpg',
  title: 'The lord of the rings',
  author: 'A.J. Danya',
  description: `The Eighth Story. Nineteen Years Later. Based on an original new story by J.K. Rowling, John Tiffany, and Jack Thorne, a new play by Jack Thorne, "Harry Potter and the Cursed Child" is the eighth story in the Harry Potter series and the first official Harry Potter story to be presented on stage. The play will receive its world premiere in London's West End on July 30, 2016. It was always difficult being Harry Potter and it isn't much easier now that he is an overworked employee of the Ministry of Magic, a husband and father of three school-age children. While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted. As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes, darkness comes from unexpected places.`,
  pages: 200,
  currentPage: 1,
  rate: 3.5,
  lang: 'eng',
  publishDate: 2016,
  isRead: false,
}];

const book = createElementFromTemplate(templates.bookInProgress, books[0], (element, data) => {
  const book = element;
  //  counter
  const counter = (book.querySelector('.book-in-progress__page-counter'));
  const {increaseButton, decreaseButton, input} = findElements(counter, {
    increaseButton: '.counter__increase-button',
    decreaseButton: '.counter__decrease-button',
    input: '.counter__input',
  });

  input.addEventListener('change', (e) => {
    const min = Number(e.target.min);
    const max = Number(e.target.max);
    const step = Number(e.target.step);
    const value = Number(e.target.value);
    const numeric = value;
    const snapped = snap(numeric, step);

    const validate = (value) => !( 
      Number.isNaN(value)
      || value > max
      || value < min
    );

    if (validate(snapped)) {
      data.currentPage = snapped;
    }
    e.target.value = data.currentPage;
  });

  increaseButton.addEventListener('click', (e) => {
    input.value = Number(input.value) + Number(input.step);
    input.dispatchEvent(new Event("change"));
  });

  decreaseButton.addEventListener('click', (e) => {
    input.value = Number(input.value) - Number(input.step);
    input.dispatchEvent(new Event("change"));
  });
});


const firstBook = document.querySelector('.book-in-progress');

firstBook.replaceWith(book);


// // ---Debug--- //
// const modal = document.querySelector('.modal-pick-books');
// modal.showModal();
// const modal1 = document.querySelector('.modal-edit-book');
// modal1.showModal();