import parse from "../../src/parse";

describe("parse", () => {
  let result = null;

  beforeAll(() => {
    const data = '{"data":[1,2,3,4,5,6],"schema":["a","b","c"]}';
    
    result = parse(data);
  });

  test("it has right data", () => {
    const expectedData = [{
      a: 1, b: 2, c: 3,
    }, {
      a: 4, b: 5, c: 6,
    }];

    expect(result).toEqual(expectedData);
  });
});
