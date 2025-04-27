function setBookProxy(book, onUpgrade, onUpdate) {
  return new Proxy(book, {
    set(obj, prop, value) {
      const isSucceed = Reflect.set(...arguments);

      if (['isCompleted'].includes(prop)) {
        onUpgrade();
      }
      if (['currentPage', 'rate'].includes(prop)) {
        onUpdate();
      }
      
      return isSucceed;
    }
  });
}

export class BookCollection {
  constructor(options = {}) {
    const {
      collection = [],
      onUpgrade = () => {},
      onUpdate = () => {},
    } = options;

    this.onUpgrade = onUpgrade;
    this.onUpdate = onUpdate;
    this.collection = new Set(collection.map(book => setBookProxy(book, this.onUpgrade, this.onUpdate)));
  }

  add(book) {
    const proxied = setBookProxy(book, this.onUpgrade, this.onUpdate);
    this.collection.add(proxied);
    this.onUpgrade();
  }

  remove(book) {
    this.collection.delete(book);
    this.onUpgrade();
  }

  stringified() {
    return JSON.stringify(Array.from(this.collection));
  }

  [Symbol.iterator]() {
    return this.collection.values();
  }

  static createFromString(str, events = {}) {
    let array = null;
    try {
      array = JSON.parse(str);
    } catch {
      array = [];
    }

    if(!Array.isArray(array)) {
      array = [];
    }

    const result = new this({
      collection: array,
      ...events
    });

    return result;
  }
}