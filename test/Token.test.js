const Token = require("../src/Token.js");

test("Can represent a token as a string", () => {
  const t = new Token("INTEGER", 5);
  expect(t.toString()).toEqual("INTEGER: 5");
});

test("Can return its type", () => {
  const t = new Token("INTEGER", 5);
  expect(t.getType()).toEqual("INTEGER");
});