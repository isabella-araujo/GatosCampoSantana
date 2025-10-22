export function search(data, column, query) {
  if (!Array.isArray(data) || !column || !query) return data;

  const normalizedQuery = query.toString().toLowerCase();

  return data.filter((item) => {
    const value = item[column];
    if (value == null) return false;
    return value.toString().toLowerCase().includes(normalizedQuery);
  });
}
