export function cleanString(str) {
  return str
    .replace(/[^a-zA-Z]/g, "") // inlaturam orice caracter care nu este majuscula
    .toUpperCase();
}

export function extractNumbers(str) {
  let sanitized = str.replace(/[^1-9]/g, "");
  console.log(sanitized);

  if (sanitized.length % 2 !== 0) {
    return alert("Te rog introdu grupuri de cate doua cifre");
  }

  return sanitized;
}

// transofmram un array de arrayuri intr-un string
export function textCriptat(coordonate) {
  return coordonate.map(([row, col]) => `${row}${col}`).join(" ");
}
