export function cleanString(str) {
  return str
    .replace(/[^a-zA-Z]/g, "") // inlaturam orice caracter care nu este majuscula
    .toUpperCase();
}

// transofmram un array de arrayuri intr-un string
export function textCriptat(coordonate) {
  return coordonate.map(([row, col]) => `${row}${col}`).join(" ");
}
