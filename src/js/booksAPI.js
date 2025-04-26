import { Book } from "@/js/classes/book";
const url = "https://openlibrary.org";

function queryParameter(params = {}) {
  const result = Object.entries(params).reduce((acc, [key, value]) => {
    const separator = acc === '?' ? '' : '&';
    const formatedValue = value.toString().replace(/\s+/g, '+');
    return `${acc}${separator}${key}=${formatedValue}`;
  }, '?');

  return result !== '?'
    ? result
    : '';
}


export async function fetchBooks(searchText, limit = 1, offset = 0) {
  const books = []
  
  const docsUrl = `${url}/search.json` + queryParameter({
    q: searchText,
    fields: 'author_name,title,first_publish_year,key',
    limit,
    offset,
  });
  
  const {docs, numFound} = await fetch(docsUrl)
    .then(r => r.json());

  for (let doc of docs) {
    let book = {
      imageSrc: null,
      title: null,
      author: null,
      description: null,
      publishDate: null,
    };

    book.author = doc.author_name ? doc.author_name.join(', ') : 'Unknown';
    book.title = doc.title;
    book.publishDate = doc.first_publish_year;

    const workUrl = `${url}${doc.key}.json?fields=description`;
    const work = await fetch(workUrl)
      .then(r => r.json());
    book.description = typeof work.description === 'object'
      ? work.description.value
      : work.description || 'There is no description for this book';

    book.imageSrc = work.covers
      ? `https://covers.openlibrary.org/b/id/${work.covers[0]}-L.jpg`
      :  'images/fallback.png';

    book.id = work.key.replace('/works/', '');

    books.push(new Book(book));
  }

  return {
    booksFoundNumber: numFound - offset,
    books: books,
  };
}