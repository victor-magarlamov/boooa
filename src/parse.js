export default function parse (string) {
  try {
    const { data, schema } = JSON.parse(string);

    const result  = [];
    let start = 0;

    while (start < data.length) {
      const obj = schema.reduce((acc, key) => {
        acc[key] = data[start++];

        return acc;
      }, {});

      result.push(obj);
    }

    return result;
  } catch (e) {
    throw new Error(`Boooa: ${e.message}`);
  }
}
