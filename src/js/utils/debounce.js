export default function debounceDecorator (fn, timeout, onInterrupt = () => {}) {
  let timeoutID = null;

  return () => {
    if (timeoutID !== null) {
      clearTimeout(timeoutID);
      timeoutID = null;
      onInterrupt();
    }
    timeoutID = setTimeout(() => {
      fn();
      timeoutID = null;
    }, timeout);
  }
}