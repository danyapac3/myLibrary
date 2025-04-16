const templates = {
  bookInProgress: /*html*/ `
    <div class="in-progress-section__item book-in-progress">
      <div class="book-in-progress__content">
        <div class="book-in-progress__cover">
          <img src="|[imageSrc]|" alt="book cover">
        </div>
        <div class="book-in-progress__name info-group">
          <div class="info-group__title">Title</div>
          <div class="info-group__content">|[title]|</div>
        </div>
        <div class="book-in-progress__author info-group">
          <div class="info-group__title">Author</div>
          <div class="info-group__content">|[author]|</div>
        </div>
        <div class="book-in-progress__pages info-group">
          <div class="info-group__title">Pages</div>
          <div class="info-group__content">|[pages]|</div>
        </div>
        <div class="book-in-progress__desctioption info-group">
          <div class="info-group__title">Description</div>
          <div class="info-group__content">
            <div class="info-group__text folded">|[description]|</div>
            <div class="info-group__toggle-text-button">show more</div>
          </div>
        </div>
        <div class="book-in-progress__interactions">
          <div class="book-in-progress__page-counter counter">
            <div class="counter__title">Page: </div>
            <div class="counter__controls">
              <button class="counter__decrease-button button dark">−</button>
              <input min="0" max="|[pages]|" step="1" class="counter__input" type="text" inputmode="numeric" value="|[currentPage]|">
              <button class="counter__increase-button button dark">+</button>
            </div>
          </div>
          <div class="book-in-progress__rate-counter counter">
            <div class="counter__title">Rate: </div>
            <div class="counter__controls">
              <button class="counter__decrease-button button dark">−</button>
              <input class="counter__input" type="text" inputmode="numeric" value="|[rate]|">
              <button class="counter__increase-button button dark">+</button>
            </div>
          </div>
          <button class="book-in-progress__read-button button dark">Read</button>
        </div>
      </div>
    </div>
  `,
}

export default templates;