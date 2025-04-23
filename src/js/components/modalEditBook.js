import { createElementFromTemplate } from '@/js/utils/templateUtils';
import { createElementFromString } from '@/js/utils/DOMUtils';
import renderBookToEdit from '@/js/components/bookToEdit';

const template = 
/*html*/ `
<dialog class="page__modal-edit-book modal-edit-book">
  <div class="modal-pick-books__close-button"></div>
</dialog>`;


export default function render() {
  let bookToEdit = null;
  const element = createElementFromString(template);

  element.showModalWithBook = (book) => {
    bookToEdit?.remove();
    bookToEdit = renderBookToEdit(book);
    element.append(bookToEdit);
    element.showModal();
  }

  return element;
}