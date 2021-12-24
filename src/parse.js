export default function parse (string) {
  const { data, schema, options } = JSON.parse(string);
  const { replace } = options || {};

  const result  = [];
  let start = 0;

  while (start < data.length) {
    const obj = schema.reduce((acc, key) => {
      let value = data[start++];

      if (value.indexOf && replace && replace[key]) {
        const { newValue, searchValue } = replace[key];

        if (~value.indexOf(newValue)) {
          if (typeof searchValue === "number") {
            value = searchValue;
          } else {
            value = value.replace(newValue, searchValue);
          }
        }
      }

      acc[`${key}`] = value;

      return acc;
    }, {});

    result.push(obj);
  }

  return result;
}
