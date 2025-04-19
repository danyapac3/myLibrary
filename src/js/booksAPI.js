import { createBook } from "@/js/factories/book";
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


export async function getBooks(searchText, limit = 1, offset = 0) {
  const result = []
  
  const docsUrl = `${url}/search.json` + queryParameter({
    q: searchText,
    fields: 'author_name,title,first_publish_year,key',
    limit,
    offset,
  });
  
  const docs = (await fetch(docsUrl)
    .then(r => r.json())).docs;

  for (let doc of docs) {
    let book = {
      imageSrc: null,
      title: null,
      author: null,
      description: null,
      publishDate: null,
      category: null,
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
      :  null;

    book.category = work.subjects ? work.subjects[0] : null;

    book.id = work.key.replace('/works/', '');

    result.push(createBook(book));
  }

  return result;
}


// https://openlibrary.org/works/OL45804W.json
getBooks('Harry Potter', 10)
  .then(console.log);