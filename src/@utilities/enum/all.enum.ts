export function getEnumValues(reference: object) {
  const VALUES = Object.keys(reference).filter((item) => {
    return isNaN(Number(item));
  });

  return VALUES;
}
