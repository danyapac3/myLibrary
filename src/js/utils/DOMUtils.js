export function createElementFromString(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  const result = template.content.firstElementChild;
  return result;
}

export function findElements(node, referenceObject = {}) {
  return Object.keys(referenceObject).reduce((acc, key) => {
    acc[key] = node.querySelector(referenceObject[key]);
    return acc;
  }, {});
}

/**
 * @param {Element} target
 * @param {Element|Element[]} elements
 */
export function mountElements(target, elements) {
  elements.forEach((element) => target.appendChild(element));
}