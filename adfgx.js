export const litereAlfabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I/J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// --- FUNCTII ---

export function eliminaDuplicateSiCombinaIJ(cheie) {
  // Eliminam duplicatele
  const cheieFaraDuplicate = new Set(cheie);

  // Convertim in array si combinam I/J
  const rezultat = Array.from(cheieFaraDuplicate).map((litera) => {
    if (litera === "I" || litera === "J") {
      return "I/J";
    }
    return litera;
  });

  return rezultat;
}

// din alfabet eliminam toate literele care sunt existente in cheie
export function eliminaLitereleDinCheie(litereAlfabet, cheiePrelucrata) {
  return litereAlfabet.filter((litera) => {
    if (cheiePrelucrata.includes(litera)) {
      // Daca cheiePrelucrata contine litera atunci o exclude,
      return false;
    } else {
      // Daca nu atunci o pastram
      return true;
    }
  });
}

export function construirePatratPolibius(
  cheiePrelucrata,
  alfabetFaraCheie,
  patratPolibius
) {
  let indexCheie = 0;
  let indexAlfabet = 0;

  // constructia linilor
  for (let i = 1; i <= 5; i++) {
    // console.log(`-- Linia ${i} --`);
    // constructia coloanelor
    for (let j = 1; j <= 5; j++) {
      if (indexCheie < cheiePrelucrata.length) {
        // console.log(`Coloana ${cheiePrelucrata[indexCheie]}`);
        patratPolibius[i][j] = cheiePrelucrata[indexCheie];
        indexCheie++;
      } else {
        // console.log(`Coloana ${alfabetFaraCheie[indexAlfabet]}`);
        patratPolibius[i][j] = alfabetFaraCheie[indexAlfabet];
        indexAlfabet++;
      }
    }
  }
}

// stabilirea coordonatelor fiecarei litere
export function gasesteCoordonate(text, patrat) {
  const rezultate = [];

  for (const litera of text) {
    let gasit = false;

    // randuri coloane
    for (let i = 1; i < patrat.length; i++) {
      for (let j = 1; j < patrat[i].length; j++) {
        const valoare = patrat[i][j];

        // I/J
        if (valoare === "I/J" && (litera === "I" || litera === "J")) {
          rezultate.push([patrat[i][0], patrat[0][j]]);
          gasit = true;
          break;
        }

        if (valoare === litera) {
          rezultate.push([patrat[i][0], patrat[0][j]]);
          gasit = true;
          break;
        }
      }

      if (gasit) break;
    }
  }

  return rezultate;
}

export function flattenArray(arrayOfArrays) {
  return arrayOfArrays.flat();
}

// etapa 1 transpozitie
export function construirePatratTranspozitie(firstRow, dataArray) {
  const numCols = firstRow.length; // numar coloane
  const result = [firstRow]; // incepem cu primul rand
  let index = 0;

  while (index < dataArray.length) {
    const row = [];

    for (let i = 0; i < numCols; i++) {
      // adaugam urmatorul element sau Q
      row.push(dataArray[index] ?? "Q");
      index++;
    }

    result.push(row);
  }

  // Daca ultimul rand este incmplet adaugam Q
  const lastRow = result[result.length - 1];
  if (lastRow.length < numCols) {
    while (lastRow.length < numCols) {
      lastRow.push("Q");
    }
  }

  return result;
}

// etapa 2 de transpozite
export function sortMatrixByHeader(matrix) {
  // Defensive check
  if (!Array.isArray(matrix) || matrix.length === 0) return [];

  const header = matrix[0];
  const numCols = header.length;

  // creem un array de indici bazati pe ordinea alfabetica a capului de tabel
  const sortedIndices = [...header.keys()].sort((a, b) =>
    header[a].localeCompare(header[b])
  );

  // reconstruim matrieca
  const sortedMatrix = matrix.map((row) =>
    sortedIndices.map((index) => row[index])
  );

  return sortedMatrix;
}

// cifrarea textului
export function readMatrixByColumns(matrix) {
  const result = [];

  const numRows = matrix.length;
  const numCols = matrix[0].length;

  for (let col = 0; col < numCols; col++) {
    for (let row = 1; row < numRows; row++) {
      result.push(matrix[row][col]);
    }
  }

  return result;
}

export function sortAlphabetically(arr) {
  return [...arr].sort();
}

export function buildMatrixColumnByColumn(header, data) {
  const numCols = header.length;
  const numRows = Math.ceil(data.length / numCols) + 1; // +1 pt header

  // Matrice goala care contine doar headerul
  const matrix = [header];
  for (let i = 1; i < numRows; i++) {
    matrix.push(new Array(numCols).fill(null));
  }

  let index = 0;

  // Completam matricea coloana cu coloana
  for (let col = 0; col < numCols; col++) {
    for (let row = 1; row < numRows; row++) {
      if (index < data.length) {
        matrix[row][col] = data[index];
        index++;
      }
    }
  }

  return matrix;
}

export function reorderMatrixByHeader(targetHeader, matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) return [];

  const currentHeader = matrix[0];
  const numRows = matrix.length;

  // Determinam cum trebuie rearanjate coloanele
  const columnOrder = targetHeader.map((letter) =>
    currentHeader.indexOf(letter)
  );

  // Reconstruim matricea
  const reorderedMatrix = matrix.map((row) =>
    columnOrder.map((index) => row[index])
  );

  return reorderedMatrix;
}

export function matrixToADFGXString(matrix) {
  let result = "";

  // Incepem de la randul 2 (index 1)
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const letter = matrix[i][j];
      // Pastram doar A, D, F, G, X
      if (["A", "D", "F", "G", "X"].includes(letter)) {
        result += letter;
      }
    }
  }

  return result;
}

export function decripteazaCoordonateADFGX(matrix, coordString) {
  let result = "";

  for (let i = 0; i < coordString.length; i += 2) {
    const rowLetter = coordString[i];
    const colLetter = coordString[i + 1];

    let letterFound = "";

    for (let row = 1; row < matrix.length; row++) {
      if (matrix[row][0] === rowLetter) {
        for (let col = 1; col < matrix[row].length; col++) {
          if (matrix[0][col] === colLetter) {
            letterFound = matrix[row][col];
            break;
          }
        }
      }
      if (letterFound) break;
    }

    if (letterFound === "I/J") letterFound = "I";

    result += letterFound;
  }

  return result;
}
