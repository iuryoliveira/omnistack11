module.exports = function normalizeMoneyValue(value) {
  return value
    .toString()
    .replace("R", "")
    .replace("$", "")
    .replace(",", ".");
};
