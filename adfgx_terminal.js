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
];

const patratPolibiusADFGX = [
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

// --- END FUNCTII ---

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
