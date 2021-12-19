export default function stringify (array) {
  const schema = getSchema(array[0]);
  const data = normalize(array);

  return toJSON(data, schema);
}

function getSchema (item) {
  return Object.keys(item);
}

function normalize (items) {
  return items.reduce((acc, item) => {
    acc.push(...Object.values(item));

    return acc;
  }, []);
}

function toJSON (data, schema) {
  return JSON.stringify({
    data,
    schema,
  });
}
