import parse from "../../src/parse";

describe("parse", () => {
  describe("when valid", () => {
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

  describe("when invalid", () => {
    describe("when unexpected error", () => {
      test("it catches error", () => {
        expect.assertions(1);

        try {
          parse();
        } catch (e) {
          expect(e).not.toBe(null);
        }
      }); 
    }); 
  });
});
