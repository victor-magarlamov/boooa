export default function stringify (array) {
  try {
    const schema = getSchema(array[0]);
    const data = normalize(array);

    validate(data, schema, array);

    return toJSON(data, schema);
  } catch (e) {
    throw new Error(`Boooa: ${e.message}`);
  }
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

function validate (data, schema, source) {
  const keyCount = schema.length;
  const dataCount = data.length;
  const sourceCount = source.length;

  if (!keyCount) {
    throw new Error("Not object!");
  } else if (keyCount === 1) {
    if (dataCount !== sourceCount) {
      throw new Error("Not similar data!");
    }
  } else if (dataCount % keyCount > 0) {
    throw new Error("Not similar data!");
  }
}
