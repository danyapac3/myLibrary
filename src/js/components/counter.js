import {createElementFromString, findElements} from "@/js/utils/dom";

function createCounterElement(targetObject, targetProperty, label, optionalArguments = {}) {
  const options = {
    minValue: Number.MIN_SAFE_INTEGER,
    maxValue: Number.MAX_SAFE_INTEGER,
    initialValue: 0,
    step: 1,
    classes: [],
  };

  Object.assign(options, optionalArguments);

  function validate(value) {
    const numeric = Number(value)
    if (Number.isNaN(numeric)) return false;
    if (numeric - options.initialValue % options.step !== 0) return false;
    return numeric >= options.minValue && numeric <= options.maxValue;
  }

  const counter = createElementFromString( /*html*/ `
    <div class="counter ${options.classes.join(' ')}">
      <div class="counter__label">${label}: </div>
      <button class="counter__decrease-button">-</button>
      <input class="counter__input" value="${options.initialValue}">
      <button class="counter__increase-button">+</button>
    </div>
  `);

  const counterIncreaseButton = counter.querySelector('.counter__increase-button');
  const counterDecreaseButton = counter.querySelector('.counter__decrease-button');
  const counterInput = counter.querySelector('.counter__input');

  counterInput.addEventListener('change', ({target}) => {
    if (validate(target.value)) {
      targetObject[targetProperty] = Number(target.value)
    } else {
      target.value = targetObject[targetProperty]
    }
  });

  counterDecreaseButton.addEventListener('click', () => {
    counterInput.value = Number(counterInput.value) - 1;
    counterInput.dispatchEvent(new Event('change'));
  });

  counterIncreaseButton.addEventListener('click', () => {
    counterInput.value = Number(counterInput.value) + 1;
    counterInput.dispatchEvent(new Event('change'));
  });
  
  return counter;
}

export {createCounterElement};
export default createCounterElement;