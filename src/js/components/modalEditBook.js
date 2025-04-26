import { createElementFromTemplate } from '@/js/utils/templateUtils';
import { createElementFromString } from '@/js/utils/DOMUtils';
import renderBookToEdit from '@/js/components/bookToEdit';

const template = 
/*html*/ `
<dialog class="page__modal-edit-book modal-edit-book">
  <div class="modal-edit-book__close-button"></div>
</dialog>`;


export default function render() {
  let bookToEdit = null;
  const element = createElementFromString(template);
  const closeButton = element.querySelector('.modal-edit-book__close-button');

  element.showModalWithBook = (book) => {
    bookToEdit?.remove();
    bookToEdit = renderBookToEdit(book);
    element.append(bookToEdit);
    element.showModal();
  }

  closeButton.addEventListener('click', () => {
    element.close();
  });

  return element;
}