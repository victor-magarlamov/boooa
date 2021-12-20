import stringify from "../../src/stringify";

describe("stringify", () => {
  describe("when valid", () => {
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

  describe("when invalid", () => {
    describe("when items are not object", () => {
      test("it gets 'Not object!' error", () => {
        expect.assertions(1);

        try {
          stringify([1,2,3]);
        } catch (e) {
          expect(e.message).toBe("Boooa: Not object!");
        }
      }); 
    });

    describe("when items have one key", () => {
      test("it gets 'Not similar data!' error", () => {
        expect.assertions(1);

        try {
          stringify([{
            a: 1
          }, {
            a:2, b: 3,
          }]);
        } catch (e) {
          expect(e.message).toBe("Boooa: Not similar data!");
        }
      }); 
    }); 

    describe("when items are not similar", () => {
      test("it gets 'Not similar data!' error", () => {
        expect.assertions(1);

        try {
          stringify([{
            a: 1, b: 2,
          }, {
            a:2, b: 3, c: 4,
          }]);
        } catch (e) {
          expect(e.message).toBe("Boooa: Not similar data!");
        }
      }); 
    }); 

    describe("when unexpected error", () => {
      test("it catches error", () => {
        expect.assertions(1);

        try {
          stringify();
        } catch (e) {
          expect(e).not.toBe(null);
        }
      }); 
    }); 
  });
});
