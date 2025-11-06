//ADFGX
const litereAlfabet = [
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
  "0",
  "1",
  "2",
];

const patratPolibiusADFGX = [
  ["0", "A", "D", "F", "G", "X"],
  ["A", "-", "-", "-", "-", "-"],
  ["D", "-", "-", "-", "-", "-"],
  ["F", "-", "-", "-", "-", "-"],
  ["G", "-", "-", "-", "-", "-"],
  ["X", "-", "-", "-", "-", "-"],
];

const patratPolibiusADFGXDecriptare = [
  ["0", "A", "D", "F", "G", "X"],
  ["A", "-", "-", "-", "-", "-"],
  ["D", "-", "-", "-", "-", "-"],
  ["F", "-", "-", "-", "-", "-"],
  ["G", "-", "-", "-", "-", "-"],
  ["X", "-", "-", "-", "-", "-"],
];

const cheie = "SECRETSIGUR";
const textInClar = "EXEMPLU";
const cifruTranspozitie = "TESTARE";

// --- FUNCTII ---

function eliminaDuplicateSiCombinaIJ(cheie) {
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
function eliminaLitereleDinCheie(litereAlfabet, cheiePrelucrata) {
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

function construirePatratPolibius(
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
function gasesteCoordonate(text, patrat) {
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

function flattenArray(arrayOfArrays) {
  return arrayOfArrays.flat();
}

// etapa 1 transpozitie
function construirePatratTranspozitie(firstRow, dataArray) {
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
function sortMatrixByHeader(matrix) {
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
function readMatrixByColumns(matrix) {
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

function sortAlphabetically(arr) {
  return [...arr].sort();
}

function buildMatrixColumnByColumn(header, data) {
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

function reorderMatrixByHeader(targetHeader, matrix) {
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

function matrixToADFGXString(matrix) {
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

function decripteazaCoordonateADFGX(matrix, coordString) {
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

// --- END FUNCTII ---
console.log("\n===== ADFGX CRIPTARE =====");

// prelucrare chei - eliminam duplicate si literele I si J devin I/J
const cheiePrelucrata = eliminaDuplicateSiCombinaIJ(cheie);
const cifruTranspozitiePrelucrat =
  eliminaDuplicateSiCombinaIJ(cifruTranspozitie);

// console.log("Patrat Polibius fara date: ", patratPolibiusADFGX);
console.log("Cheie prelucrata: ", cheiePrelucrata);
console.log("Cifru transpozitei prelucrat: ", cifruTranspozitiePrelucrat);

// eliminam toate literele din cheie prezente in alfabet
const alfabetFaraCheie = eliminaLitereleDinCheie(
  litereAlfabet,
  cheiePrelucrata
);

construirePatratPolibius(
  cheiePrelucrata,
  alfabetFaraCheie,
  patratPolibiusADFGX
);

console.log("Patrat polibius avand cheia adaugata: ", patratPolibiusADFGX);

// gasim coordonatele fiecarei litere si o criptam
const criptare = gasesteCoordonate(textInClar, patratPolibiusADFGX);
const criptareArr = flattenArray(criptare);

// etapa 1 transpozitie
const etapaIntaiTranspozitie = construirePatratTranspozitie(
  cifruTranspozitiePrelucrat,
  criptareArr
);
console.log("Etapa 1 transpozite: ", etapaIntaiTranspozitie);

// etapa 2 transpozite
const etapaDoiTranspozitie = sortMatrixByHeader(etapaIntaiTranspozitie);
console.log("Etapa 2 transpoztie: ", etapaDoiTranspozitie);

// cifrarea textului
const cifrareaTextului = readMatrixByColumns(etapaDoiTranspozitie);
console.log("Cifrarea textului: ", cifrareaTextului);

console.log("============================\n");

// --- DECRIPTARE TEXT ---
console.log("\n===== ADFGX DECRIPTARE =====");
const cheieDecriptare = "SECRETSIGUR";
const textCriptat = "FGFDGXAGQXADADF";
const cifruTranspozitieDecriptare = "TESTARE";

// prelucrare chei - eliminam duplicate si literele I si J devin I/J

const cheieDecriptarePrelucrata = eliminaDuplicateSiCombinaIJ(cheieDecriptare);
const cifruTranspozitieDecriptarePrelucrat = eliminaDuplicateSiCombinaIJ(
  cifruTranspozitieDecriptare
);

console.log("Cheie de criptare prelucrata: ", cheieDecriptarePrelucrata);
console.log("Cifru transpozite prelucrat: ", cifruTranspozitiePrelucrat);

// sortam array-ul de transpozite decifrare alfabetic
const headerEtapa1Decifrare = sortAlphabetically(
  cifruTranspozitieDecriptarePrelucrat
);

// Etapa 1 transpozitie decriptare
const transpozitieEtapa1Decifrare = buildMatrixColumnByColumn(
  headerEtapa1Decifrare,
  textCriptat.split("")
);

console.log(
  "Tabel de transpozitie etapa 1 decriptare: ",
  transpozitieEtapa1Decifrare
);

// Etapa 2 transpozite decriptare
const transpozitieEtapa2Decifrare = reorderMatrixByHeader(
  cifruTranspozitieDecriptarePrelucrat,
  transpozitieEtapa1Decifrare
);

console.log(
  "Tabelul de transpozitie etapa 2 decriptare: ",
  transpozitieEtapa2Decifrare
);

const cifruPolibiusDecriptare = matrixToADFGXString(
  transpozitieEtapa2Decifrare
);

console.log("Coordonate pentru patratul Polibius: ", cifruPolibiusDecriptare);

// Construim patratul polibius utilizant cheia de decriptare
const alfabetFaraCheieDecriptare = eliminaLitereleDinCheie(
  litereAlfabet,
  cheieDecriptarePrelucrata
);

construirePatratPolibius(
  cheieDecriptarePrelucrata,
  alfabetFaraCheieDecriptare,
  patratPolibiusADFGXDecriptare
);

console.log(
  "Construim patratul Polibius utilizat pentru decriptare: ",
  patratPolibiusADFGXDecriptare
);

const decriptareADFGX = decripteazaCoordonateADFGX(
  patratPolibiusADFGXDecriptare,
  cifruPolibiusDecriptare
);

console.log("Textul decriptat: ", decriptareADFGX);
console.log("============================\n");
