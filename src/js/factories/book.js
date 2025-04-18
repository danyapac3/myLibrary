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
    category: null,
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

export {createBook};
export default createBook;