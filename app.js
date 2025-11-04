import {
  eliminaDuplicateSiCombinaIJ,
  construirePatratPolibiusCompletatCuCheie,
  eliminaLitereleDinCheie,
  litereAlfabet,
  construirePatratPolibius,
} from "./polibius.js";
import { cleanString } from "./functions.js";
import { explicatiiPolibius } from "./explicatii.js";

export let cheie = "";
export let textInClar = "";
export let cheieSanetizata = "";
export let textInClarSanetizat = "";
export let cheiePrelucrata = "";

// POLIBIUS
let selectTabelPolibius = document.querySelector("#polibius");
const selectCriptareCheie = document.querySelector("#criptareCheie");
const selectCriptareTextClar = document.querySelector("#criptareTextClar");
const btnPolibiusCripteaza = document.querySelector("#polibius-cripteaza");
const containerPolibiusData = document.querySelector(".polibius-data");

// patrat polibius utilizat in criptare
const patratPolibius = [
  [0, 1, 2, 3, 4, 5],
  [1, "-", "-", "-", "-", "-"],
  [2, "-", "-", "-", "-", "-"],
  [3, "-", "-", "-", "-", "-"],
  [4, "-", "-", "-", "-", "-"],
  [5, "-", "-", "-", "-", "-"],
];

// se utilizeaza doar pentru randarea in explicatie
let patratPolibiusCheie = [
  [0, 1, 2, 3, 4, 5],
  [1, "-", "-", "-", "-", "-"],
  [2, "-", "-", "-", "-", "-"],
  [3, "-", "-", "-", "-", "-"],
  [4, "-", "-", "-", "-", "-"],
  [5, "-", "-", "-", "-", "-"],
];

// --- FUNCTII ---
function randarePatratPolibius(selectTabelPolibius) {
  if (selectTabelPolibius !== null) {
    selectTabelPolibius.innerHTML = "";

    // loop randuri
    for (let i = 0; i < patratPolibius.length; i++) {
      const row = document.createElement("tr");

      // loop intre coloane pe randul curent
      for (let j = 0; j < patratPolibius[i].length; j++) {
        const cell = document.createElement("td");
        cell.textContent = patratPolibius[i][j];
        row.appendChild(cell);
      }

      selectTabelPolibius.appendChild(row);
    }
  }
}
// ---

// randarea patratului Polibius fara nici o valoare
randarePatratPolibius(selectTabelPolibius);
// if (selectTabelPolibius !== null) {
//   selectTabelPolibius.innerHTML = "";

//   // loop randuri
//   for (let i = 0; i < patratPolibius.length; i++) {
//     const row = document.createElement("tr");

//     // loop intre coloane pe randul curent
//     for (let j = 0; j < patratPolibius[i].length; j++) {
//       const cell = document.createElement("td");
//       cell.textContent = patratPolibius[i][j];
//       row.appendChild(cell);
//     }

//     selectTabelPolibius.appendChild(row);
//   }
// }

// apelam addEventListener doar daca btnPolibiusCripteaza nu e null sau undefined
btnPolibiusCripteaza?.addEventListener("click", () => {
  cheie = selectCriptareCheie.value;
  textInClar = selectCriptareTextClar.value;

  if (cheie === "" || textInClar === "") {
    alert("Te rog completeaza campul Cheie si Text in clar");
    return [];
  }

  // sanetizam datele de intrare sa contina numai litere majuscule
  cheieSanetizata = cleanString(cheie);
  textInClarSanetizat = cleanString(textInClar);

  // prelucram cheia pentru a elimina duplicatele si combinam I cu J
  cheiePrelucrata = eliminaDuplicateSiCombinaIJ(cheieSanetizata);

  // din alfabet eliminam toate literele care sunt existente in cheie
  const alfabetFaraCheie = eliminaLitereleDinCheie(
    litereAlfabet,
    cheiePrelucrata
  );

  // completam patratul polibius cu cheia si restul literelor alfabetului
  construirePatratPolibius(cheiePrelucrata, alfabetFaraCheie, patratPolibius);

  // randarea noului patrat Polibius
  selectTabelPolibius = document.querySelector("#polibius");
  randarePatratPolibius(selectTabelPolibius);
  //   if (selectTabelPolibius !== null) {
  //     selectTabelPolibius.innerHTML = "";

  //     // loop randuri
  //     for (let i = 0; i < patratPolibius.length; i++) {
  //       const row = document.createElement("tr");

  //       // loop intre coloane pe randul curent
  //       for (let j = 0; j < patratPolibius[i].length; j++) {
  //         const cell = document.createElement("td");
  //         cell.textContent = patratPolibius[i][j];
  //         row.appendChild(cell);
  //       }

  //       selectTabelPolibius.appendChild(row);
  //     }
  //   }

  console.log(patratPolibius);

  //explicatii pasi Polibius
  const explicatiiExistente = document.querySelector(".explicatii");

  if (explicatiiExistente) {
    explicatiiExistente.remove();
  }

  containerPolibiusData.insertAdjacentHTML("afterend", explicatiiPolibius());
  const selectTabelPolibiusCheie = document.querySelector("#polibius-cheie");

  construirePatratPolibiusCompletatCuCheie(
    cheiePrelucrata,
    patratPolibiusCheie
  );

  // randarea patratului Polibius fara nici o valoare
  if (selectTabelPolibiusCheie !== null) {
    selectTabelPolibiusCheie.innerHTML = "";

    // loop randuri
    for (let i = 0; i < patratPolibiusCheie.length; i++) {
      const row = document.createElement("tr");

      // loop intre coloane pe randul curent
      for (let j = 0; j < patratPolibiusCheie[i].length; j++) {
        const cell = document.createElement("td");
        cell.textContent = patratPolibiusCheie[i][j];
        row.appendChild(cell);
      }

      selectTabelPolibiusCheie.appendChild(row);
    }
  }

  // randarea patratului Polibius complet
  const selectTabelPolibiusComplet =
    document.querySelector("#polibius-complet");
  randarePatratPolibius(selectTabelPolibiusComplet);

  patratPolibiusCheie = [
    [0, 1, 2, 3, 4, 5],
    [1, "-", "-", "-", "-", "-"],
    [2, "-", "-", "-", "-", "-"],
    [3, "-", "-", "-", "-", "-"],
    [4, "-", "-", "-", "-", "-"],
    [5, "-", "-", "-", "-", "-"],
  ];
});
