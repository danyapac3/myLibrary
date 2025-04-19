function createBook(properties = {}) {
  let _isCompleted = properties.isCompleted || false;
  const book = {
    imageSrc: null,
    title: null,
    author: null,
    description: null,
    currentPage: 0,
    rate: 5,
    publishDate: null,
    category: null,
    id: null,
    isCompleated: false
  }

  return Object.assign(book, properties);
}

export {createBook};
export default createBook;