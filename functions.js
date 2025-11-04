export function cleanString(str) {
  return str
    .replace(/[^a-zA-Z]/g, "") // inlaturam orice caracter care nu este majuscula
    .toUpperCase();
}
