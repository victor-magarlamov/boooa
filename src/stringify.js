export default function stringify (array, options = {}) {
  const schema = getSchema(array[0]);
  const replacements = getReplacements(options, schema);
  const data = normalize(array, replacements);

  validate(data, schema, array);

  return toJSON(data, schema, options);
}

function getSchema (item) {
  return Object.keys(item);
}

function getReplacements (options, schema) {
  if (!options.replace) {
    return [];
  }

  return Object.keys(options.replace).map(key => ({
    index: schema.indexOf(key),
    ...options.replace[key],
  }));
}

function normalize (items, replacements) {
  const replace = values => {
    for (const { index, searchValue, newValue } of replacements) {
      const value = values[index].toString();

      if (~value.indexOf(searchValue)) {
        values[index] = value.replace(
          searchValue,
          newValue
        );
      }
    }

    return values;
  };

  const actions = [];

  if (replacements.length > 0) {
    actions.push(replace);
  }

  return items.reduce((acc, item) => {
    const values = actions.reduce((values, action) => {
      return action(values);
    }, Object.values(item));

    acc.push(...values);

    return acc;
  }, []);
}

function toJSON (data, schema, options) {
  return JSON.stringify({
    data,
    schema,
    options,
  });
}

function validate (data, schema, source) {
  const keyCount = schema.length;
  const dataCount = data.length;
  const sourceCount = source.length;

  if (!keyCount) {
    throw new Error("Boooa: Not object!");
  } else if (keyCount === 1) {
    if (dataCount !== sourceCount) {
      throw new Error("Boooa: Not similar data!");
    }
  } else if (dataCount % keyCount > 0) {
    throw new Error("Boooa: Not similar data!");
  }
}
