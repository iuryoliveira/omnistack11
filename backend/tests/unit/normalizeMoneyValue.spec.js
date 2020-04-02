const normalizeMoneyValue = require("../../src/utils/normalizeMoneyValue");

describe("Normalize money value", () => {
  it("should normalize money value in BR format", () => {
    let number = "R$12345,98";
    let normalizedNumber = normalizeMoneyValue(number);

    expect(normalizedNumber).toEqual("12345.98");
  });

  it("should normalize money value in US format", () => {
    let number = "$12345.98";
    let normalizedNumber = normalizeMoneyValue(number);

    expect(normalizedNumber).toEqual("12345.98");
  });

  it("should normalize a decimal number", () => {
    let number = 12345.98;
    let normalizedNumber = normalizeMoneyValue(number);

    expect(normalizedNumber).toEqual("12345.98");
  });
});
