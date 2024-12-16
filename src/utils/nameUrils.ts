export function firstUpperCase(name: string) {
  const firstLetter = name.charAt(0).toUpperCase();
  const rest = name.slice(1).toLowerCase();

  return firstLetter + rest;
}
