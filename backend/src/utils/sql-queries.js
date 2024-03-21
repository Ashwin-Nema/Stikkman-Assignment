const { getBodyKeys } = require('./misc');

// Dynamically construct sql insert query based on fields present in the model
const constructInsertQuery = (body, keys, table, dateKeys) => {
  let query = `INSERT INTO ${table}`;
  const keyValueLst = getBodyKeys(body, keys, dateKeys);

  const keyValStr = keyValueLst.reduce(
    ({ keyStr, valStr }, keyVal, index) => {
      const [key, val] = keyVal;
      let newKey = keyStr + key,
        newVal = valStr + val;
      if (index == keyValueLst.length - 1) {
        newVal += ');';
      } else {
        newKey += ', ';
        newVal += ', ';
      }

      return {
        keyStr: newKey,
        valStr: newVal,
      };
    },
    {
      keyStr: ' (',
      valStr: ') VALUES (',
    }
  );

  const { keyStr, valStr } = keyValStr;
  query += keyStr;
  query += valStr;
  return query;
};

const constructUpdateQuery = (table, updateObj, filter) => {
  let keyValLst = Object.entries(updateObj || {});
  let query = keyValLst.reduce((queryStr, keyVal, index) => {
    let [key, val] = keyVal;
    if (typeof val != 'number') {
      val = `'${val}'`;
    }
    let newStr = `${queryStr} ${key} = ${val}`;
    if (index == keyValLst.length - 1) {
      return newStr;
    }
    return newStr + ', ';
  }, `Update ${table} SET`);

  if (filter) {
    query += ` WHERE`;
    let filterKeyValLst = Object.entries(filter || {});
    filterKeyValLst.forEach((keyVal, index) => {
      let [key, val] = keyVal;
      if (typeof val != 'number') {
        val = `'${val}'`;
      }
      query += ` ${key} = ${val}`;
      if (index == filterKeyValLst.length - 1) {
        query += ';';
        return;
      }
      query += ', ';
    });
  }
  return query;
};

module.exports = { constructInsertQuery, constructUpdateQuery };
