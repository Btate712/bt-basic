const Scanner = require("../src/Scanner.js");

test("Should be able to instantiate a Scanner", () => {
  let scanner = new Scanner("");
  expect(scanner.getTokens()).toEqual([]);
});

test("Can identify an integer token", () => {
  let scanner = new Scanner("805");
  expect(scanner.getTokens()[0]).toEqual("NUMBER: 805");
});

test("Can identify a numeric floating value token", () => {
  let scanner = new Scanner("11.94");
  expect(scanner.getTokens()[0]).toEqual("NUMBER: 11.94");
});

test("Can identify a negative numeric value", () => {
  let scanner = new Scanner("-25");
  expect(scanner.getTokens()[0]).toEqual("NUMBER: -25");
})

test("Can differntiate between negation and subtraction", () => {
  let scanner = new Scanner("5-3");
  expect(scanner.getTokens()).toEqual([
    "NUMBER: 5", "MINUS: NULL", "NUMBER: 3"
  ]);
  let scanner2 = new Scanner("-4.5-5");
  scanner2.tokenize();
  expect(scanner2.getTokens()).toEqual([
    "NUMBER: -4.5", "MINUS: NULL", "NUMBER: 5"
  ]);
});

test("Throws error for invalid numeric input", () => {
  let scanner;
  expect(() => scanner = new Scanner("2321.23.323")).toThrow();
});

test("Can identify a string value token", () => {
  let scanner = new Scanner("\"Hello world\"");
  expect(scanner.getTokens()[0]).toEqual("STRING: Hello world");
});

test("Can identify a string value token and an integer value token", () => {
  let scanner = new Scanner("\"Hello\" 12345");
  expect(scanner.getTokens()).toEqual(["STRING: Hello", "NUMBER: 12345"]);
});

test("Can check last token added", () => {
  let scanner = new Scanner("\"Hello\" 123 234 567");
  expect(scanner.lastToken()).toEqual("NUMBER: 567");
});

test("Can identify symbols found in KEYWORDS", () => {
  let scanner = new Scanner("(123 - 245)");
  expect(scanner.getTokens()).toEqual([
    "LEFT_PAREN: NULL", "NUMBER: 123", "MINUS: NULL", "NUMBER: 245", "RIGHT_PAREN: NULL"]
  );
});

test("Can identify multi-character symbols found in KEYWORDS", () => {
  let scanner = new Scanner("3 <= 4");
  expect(scanner.getTokens()).toEqual([
    "NUMBER: 3", "LESS_EQUAL: NULL", "NUMBER: 4"
  ]);

  let scanner2 = new Scanner("a!=5");
  expect(scanner2.getTokens()).toEqual([
    "IDENTIFIER: a", "BANG_EQUAL: NULL", "NUMBER: 5"
  ]);
});

test("Can identify variable identifiers", () => {
  let scanner = new Scanner("a = 5.25");
  expect(scanner.getTokens()).toEqual(["IDENTIFIER: a", "EQUAL: NULL", "NUMBER: 5.25"]);
});

test("Can identify commands", () => {
  let scanner = new Scanner("LET a = 5");
  expect(scanner.getTokens()).toEqual([
    "LET: NULL", "IDENTIFIER: a", "EQUAL: NULL", "NUMBER: 5"
  ]);

  let scanner2 = new Scanner("NOT_A_COMMAND a = 5");
  expect(scanner2.getTokens()).toEqual([
    "IDENTIFIER: NOT_A_COMMAND", "IDENTIFIER: a", "EQUAL: NULL", "NUMBER: 5"
  ]);
});