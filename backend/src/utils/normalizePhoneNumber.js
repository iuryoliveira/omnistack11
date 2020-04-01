module.exports = function normalizePhoneNumber(phoneNumber) {
  return (number = phoneNumber
    .replace("(", "")
    .replace(")", "")
    .replace("-", "")
    .replace(" ", ""));
};
