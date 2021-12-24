import stringify from "../../src/stringify";

describe("stringify", () => {
  const data = [{
    a: 1, b: 2, c: 3,
  }, {
    a: 4, b: 5, c: 6,
  }];

  describe("when valid", () => {
    let parsedResult = null;
    let result = null;

    beforeAll(() => {
      result = stringify(data);
      parsedResult = JSON.parse(result);
    });

    it("has right type", () => {
      expect(typeof result).toBe("string");
    });

    it("has right data", () => {
      const expectedData = [1, 2, 3, 4, 5, 6];

      expect(parsedResult.data).toEqual(expectedData);
    });

    it("has right schema", () => {
      const expectedSchema = ["a", "b", "c"];

      expect(parsedResult.schema).toEqual(expectedSchema);
    });
  });

  describe("with replace", () => {
    let parsedResult = null;

    const replace = {
      a: {
        searchValue: 1,
        newValue: "#1",
      },
      b: {
        searchValue: 5,
        newValue: "#5",
      },
    };

    beforeAll(() => {
      const result = stringify(data, { replace });
      parsedResult = JSON.parse(result);
    });

    it("contains right options object", () => {
      expect(parsedResult.options).toEqual({ replace });
    });

    it("makes correct substitutions", () => {
      const expectedData = ["#1", 2, 3, 4, "#5", 6];

      expect(parsedResult.data).toEqual(expectedData);
    });
  });

  describe("when invalid", () => {
    describe("when items are not object", () => {
      it("gets 'Not object!' error", () => {
        expect(() => stringify([1,2,3])).toThrowError(
          new Error("Boooa: Not object!")
        );
      }); 
    });

    describe("when items have one key", () => {
      it("gets 'Not similar data!' error", () => {
        expect(() => stringify([{ a: 1 }, { a:2, b: 3, }])).toThrowError(
          new Error("Boooa: Not similar data!")
        );
      }); 
    }); 

    describe("when items are not similar", () => {
      it("gets 'Not similar data!' error", () => {
        expect(() => stringify([{ a: 1, b: 2, }, { a:2, b: 3, c: 4, }])).toThrowError(
          new Error("Boooa: Not similar data!")
        );
      }); 
    }); 

    describe("when unexpected error", () => {
      it("catches error", () => {
        expect(() => stringify()).toThrowError(
          new Error("Cannot read property '0' of undefined")
        );
      }); 
    }); 
  });
});
