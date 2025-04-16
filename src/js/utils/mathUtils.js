// TODO: Write it safer way. Probably using integers. Doesn't work properly with cases like 0.3, 0.7.
export const snap = (value, step) => {
  const scale = 1 / step;
  return Math.round(value * scale) / scale;
}