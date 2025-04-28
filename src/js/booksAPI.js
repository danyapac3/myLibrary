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

export function fetchBooks(
  searchText,
  limit = 1,
  offset = 0,
  onLoad = () => {},
  onInterrupt = () => {}
  ) {

  const controller = new AbortController; 

  const docsUrl = `${url}/search.json` + queryParameter({
    q: searchText,
    fields: 'author_name,title,first_publish_year,key',
    limit,
    offset,
  });

  
  fetch(docsUrl, {signal: controller.signal})
    .then(r => r.json())
    .then(({docs, numFound}) => Promise.all(
      docs.map(async doc => {
        const workUrl = `${url}${doc.key}.json?fields=description`;
        let response;

        try {
          response = await fetch(workUrl, {signal: controller.signal});
        } catch (e ) {
          return (e instanceof AbortError)
            ?  Promise.reject()
            :  null;
        }

        const work = await response.json();

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

        book.description = typeof work.description === 'object'
          ? work.description.value
          : work.description || 'There is no description for this book';

        book.imageSrc = work.covers && work.covers[0] !== -1
          ? `https://covers.openlibrary.org/b/id/${work.covers[0]}-L.jpg`
          :  'images/fallback.png';

        book.id = work.key.replace('/works/', '');

        return new Book(book);
    }).filter(b => b !== null))
    .then(books => {
      onLoad(books, numFound - offset);
    }))
    .catch(e => {
      onInterrupt();
    })

  return {
    abort: () => {
      controller.abort();
    }
  }
}
