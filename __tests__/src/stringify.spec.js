import stringify from "../../src/stringify";

describe("stringify", () => {
  let parsedResult = null;
  let result = null;

  beforeAll(() => {
    const data = [{
      a: 1, b: 2, c: 3,
    }, {
      a: 4, b: 5, c: 6,
    }];

    result = stringify(data);
    parsedResult = JSON.parse(result);
  });

  test("it has right type", () => {
    expect(typeof result).toBe("string");
  });

  test("it has right data", () => {
    const expectedData = [1, 2, 3, 4, 5, 6];

    expect(parsedResult.data).toEqual(expectedData);
  });

  test("it has right schema", () => {
    const expectedSchema = ["a", "b", "c"];

    expect(parsedResult.schema).toEqual(expectedSchema);
  });
});
