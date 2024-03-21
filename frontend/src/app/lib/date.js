export const formatDate = (date) => {
  if (!date || !new Date(date)?.toISOString?.()) {
    return '';
  }
  const convertedDate = new Date(date);
  const year = convertedDate.getFullYear();
  const month = String(convertedDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  const day = String(convertedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
