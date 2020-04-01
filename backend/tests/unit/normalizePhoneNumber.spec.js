const normalizePhoneNumber = require("../../src/utils/normalizePhoneNumber");

describe("Normalize phone number", () => {
  it("should normalize phone number", () => {
    const phoneNumber = "(31)99999-5555";

    let number = normalizePhoneNumber(phoneNumber);

    expect(number).toEqual("31999995555");
  });
});
