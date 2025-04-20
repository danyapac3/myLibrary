export class BookCollection {
  constructor({onAdd = () => {}, onRemove = () => {}, isCompletedHandler = () => {}}) {
    this.collection = new Set();
    this.onAdd = onAdd;
    this.onRemove = onRemove;
    this.isCompletedHandler = isCompletedHandler;
  }

  add(obj) {
    let _isCompleted = false;
    Object.defineProperty(obj, 'isCompleted', {
      get: () => _isCompleted,
      set: (value) => {
        console.log('right');
        _isCompleted = value;
        this.isCompletedHandler();
      }
    });
    this.collection.add(obj);
    this.onAdd(obj, Array.from(this));
  }

  remove(obj) {
    this.collection.delete(obj)
    this.onRemove(obj, Array.from(this))
  }

  [Symbol.iterator]() {
    return this.collection.values();
  }
}