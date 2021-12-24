import parse from "../../src/parse";

describe("parse", () => {
  describe("when valid", () => {
    let result = null;

    beforeAll(() => {
      const data = '{"data":[1,2,3,4,5,6],"schema":["a","b","c"]}';
      
      result = parse(data);
    });

    it("has right data", () => {
      const expectedData = [{
        a: 1, b: 2, c: 3,
      }, {
        a: 4, b: 5, c: 6,
      }];

      expect(result).toEqual(expectedData);
    });
  });

  describe("when options", () => {
    let result = null;

    beforeAll(() => {
      const data = `{
        "data":["#1",2,3,4,"#5",6],
        "schema":["a","b","c"],
        "options":{
          "replace":{"a":{"searchValue":"1","newValue":"#1"},"b":{"searchValue":5,"newValue":"#5"}}
        }
      }`;
      
      result = parse(data);
    });

    it("has right data", () => {
      const expectedData = [{
        a: "1", b: 2, c: 3,
      }, {
        a: 4, b: 5, c: 6,
      }];

      expect(result).toEqual(expectedData);
    });
  });

  describe("when invalid", () => {
    describe("when unexpected error", () => {
      it("catches error", () => {
        expect(() => parse()).toThrowError(
          new Error("Unexpected token u in JSON at position 0")
        );
      }); 
    }); 
  });
});
