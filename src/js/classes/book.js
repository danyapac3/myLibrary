function Book(properties = {}) {
  this.imageSrc = null,
  this.title = null,
  this.author = null,
  this.description = null,
  this.currentPage = 0,
  this.rate = 5,
  this.publishDate = null,
  this.id = null,
  this.isCompleted = false;

  Object.assign(this, properties);
}

export {Book};
export default Book;