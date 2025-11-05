// patratul polibius

// const cheie = "SECRETSIGUR";
// const textClar = "EXEMPLU";

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

// export const patratPolibius = [
//   [0, 1, 2, 3, 4, 5],
//   [1, "-", "-", "-", "-", "-"],
//   [2, "-", "-", "-", "-", "-"],
//   [3, "-", "-", "-", "-", "-"],
//   [4, "-", "-", "-", "-", "-"],
//   [5, "-", "-", "-", "-", "-"],
// ];

// // se utilizeaza doar pentru reprezentare
// export const patratPolibiusCheie = [
//   [0, 1, 2, 3, 4, 5],
//   [1, "-", "-", "-", "-", "-"],
//   [2, "-", "-", "-", "-", "-"],
//   [3, "-", "-", "-", "-", "-"],
//   [4, "-", "-", "-", "-", "-"],
//   [5, "-", "-", "-", "-", "-"],
// ];

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

// Prelucram cheia pentru a elimina duplicatele si consideram I/J ca fiind aceeasi litera
// const cheiePrelucrata = eliminaDuplicateSiCombinaIJ(cheie);

// const alfabetFaraCheie = eliminaLitereleDinCheie(
//   litereAlfabet,
//   cheiePrelucrata
// );

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

export function construirePatratPolibiusCompletatCuCheie(
  cheiePrelucrata,
  patratPolibiusCheie
) {
  let indexCheie = 0;

  // constructia linilor
  for (let i = 1; i <= 5; i++) {
    // console.log(`-- Linia ${i} --`);
    // constructia coloanelor
    for (let j = 1; j <= 5; j++) {
      if (indexCheie < cheiePrelucrata.length) {
        // console.log(`Coloana ${cheiePrelucrata[indexCheie]}`);
        patratPolibiusCheie[i][j] = cheiePrelucrata[indexCheie];
        indexCheie++;
      }
    }
  }
}

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

export function decripteazaPolibius(textCodat, patrat) {
  const sanitized = textCodat;
  let textDecriptat = "";
  const coordonate = [];

  // Procesarea numerelor in pereche
  for (let k = 0; k < sanitized.length; k += 2) {
    const rand = String(sanitized[k]);
    const coloana = String(sanitized[k + 1]);
    let literaGasita = "";

    // Cautare in patratul Polibius
    for (let i = 1; i < patrat.length; i++) {
      if (String(patrat[i][0]) === rand) {
        for (let j = 1; j < patrat[i].length; j++) {
          if (String(patrat[0][j]) === coloana) {
            literaGasita = patrat[i][j];
            break;
          }
        }
      }
      if (literaGasita) break;
    }

    // Pentru I sau J mereu se va afisa J
    if (literaGasita === "I/J") {
      literaGasita = "I";
    }

    textDecriptat += literaGasita;
    coordonate.push([rand, coloana]);
  }

  return { text: textDecriptat, coordonate };
}

// construirePatratPolibius(cheiePrelucrata, alfabetFaraCheie);

// console.log(patratPolibius);

// console.log("Alfabet fara cheie: ", alfabetFaraCheie);
