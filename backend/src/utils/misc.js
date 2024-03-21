const fs = require('fs');

const removeUploadedFile = (fileName) => {
  const fileIsPresent = fs.existsSync(fileName);
  if (fileIsPresent) {
    fs.unlinkSync(fileName);
  }
};

const convertSqlDate = (date) => {
  if (!date || !new Date(date)?.toISOString?.()) {
    return '';
  }
  const convertedDate = new Date(date);
  const year = convertedDate.getFullYear();
  const month = String(convertedDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(convertedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getBodyKeys = (body, keys, dateKeys) => {
  const keyValueLst =
    keys?.reduce?.((list, key) => {
      if (body?.hasOwnProperty?.(key)) {
        let value = body?.[key];
        if (dateKeys?.includes?.(key)) {
          value = convertSqlDate(value);
        }
        value = `'${value}'`;
        list.push([key, value]);
      }
      return list;
    }, []) || [];
  return keyValueLst;
};

module.exports = { removeUploadedFile, convertSqlDate, getBodyKeys };
