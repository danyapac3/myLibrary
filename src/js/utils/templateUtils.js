import {createElementFromString} from './DOMUtils'

export function processTemplate(template, data) {
  const regex = /\|\[(\w*)\]\|/g;

  return template.replace(regex, (_, key) => {
    return key in data
      ? data[key]
      : '';
  });
}

export function createElementFromTemplate(template, data = {}, callback = () => {}) {
  const processed = processTemplate(template, data);
  const element = createElementFromString(processed)
  callback(element, data);
  return element
}