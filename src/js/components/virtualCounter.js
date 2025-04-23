import { snap } from "@/js/utils/mathUtils";

/**
 * @param {HTMLInputElement} input
 * @param {HTMLElement} increaseButton
 * @param {HTMLElement} decreaseButton
 * @param {function(number): void} [onUpdate]
 * @param {object} [options]
 * @param {number} [options.min]
 * @param {number} [options.max]
 * @param {number} [options.step] 
 * @param {boolean} [options.loop]
 */
export default function initializeCounter(
  input
  ,decreaseButton
  ,increaseButton
  ,onUpdate = () => {}
  ,options = {}
) {
  const { 
     min = 0
    ,max = Number.MAX_SAFE_INTEGER - 1 
    ,step = 1
    ,loop = false
  } = options;
  
  const isValid = (value) => !( 
    Number.isNaN(value)
    || value > max
    || value < min
  );

  let previousValue = isValid(Number(input.value)) ? Number(input.value) : min;

  input.addEventListener('change', () => {
    const numeric = Number(input.value);
    const snapped = snap(numeric, step);

    if (isValid(snapped)) {
      input.value = snapped;
      previousValue = snapped;
      onUpdate(snapped);
    } else {
      input.value = previousValue;
      onUpdate(previousValue);
    }
  });

  increaseButton.addEventListener('click', () => { 
    input.value =  Number(input.value) + Number(input.step);
    input.dispatchEvent(new Event("change"));
  });

  decreaseButton.addEventListener('click', () => {
    input.value =  Number(input.value) - Number(input.step);
    input.dispatchEvent(new Event("change"));
  });
}
