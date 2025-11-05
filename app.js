import {
  eliminaDuplicateSiCombinaIJ,
  construirePatratPolibiusCompletatCuCheie,
  eliminaLitereleDinCheie,
  litereAlfabet,
  construirePatratPolibius,
  gasesteCoordonate,
  decripteazaPolibius,
} from "./polibius.js";
import { cleanString, textCriptat, extractNumbers } from "./functions.js";
import {
  explicatiiPolibius,
  explicatiiPolibiusDecriptare,
} from "./explicatii.js";

export let cheie = "";
export let textInClar = "";
export let cheieSanetizata = "";
export let textInClarSanetizat = "";
export let cheiePrelucrata = "";
export let textCriptatDecriptare = "";
export let textCriptatDecriptareSanetizat = "";

// POLIBIUS
let selectTabelPolibius = document.querySelector("#polibius");
const selectCriptareCheie = document.querySelector("#criptareCheie");
const selectCriptareTextClar = document.querySelector("#criptareTextClar");
const btnPolibiusCripteaza = document.querySelector("#polibius-cripteaza");
const containerPolibiusData = document.querySelector(".polibius-data");
const containerTextCriptatPolibius = document.querySelector(
  ".text-criptat-polibius"
);
// decriptare
const selectDecriptareCheie = document.querySelector("#decriptareCheie");
const selectDecriptareTextCriptat = document.querySelector(
  "#decriptareTextClar"
);
const btnPolibiusDecripteaza = document.querySelector("#polibiusDripteaza");
const containerTextDecriptatPolibius = document.querySelector(
  ".text-decriptat-polibius"
);

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

  // gasim coordonatele fiecarei litere si o criptam
  const criptare = gasesteCoordonate(textInClarSanetizat, patratPolibius);

  // --- text criptat Polibius ---
  const textCriptatPolibius = textCriptat(criptare);

  containerTextCriptatPolibius.textContent = textCriptatPolibius;

  //explicatii pasi Polibius -- SECTIUNE --
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

  // randarea patratului Polibius doar cu cehia
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

  // etapa 5 - criptarea fiecarui caracter
  const containerDateIesire = document.querySelector(".explicatii-polibius");

  for (let i = 0; i < textInClarSanetizat.length; i++) {
    containerDateIesire.insertAdjacentHTML(
      "beforeend",
      `<p>Litera: ${textInClarSanetizat[i]} - Criptata in: ${criptare[i]}</p>`
    );
  }

  patratPolibiusCheie = [
    [0, 1, 2, 3, 4, 5],
    [1, "-", "-", "-", "-", "-"],
    [2, "-", "-", "-", "-", "-"],
    [3, "-", "-", "-", "-", "-"],
    [4, "-", "-", "-", "-", "-"],
    [5, "-", "-", "-", "-", "-"],
  ];
});

// apelam addEventListener doar daca btnPolibiusDecripteaza nu e null sau undefined
btnPolibiusDecripteaza?.addEventListener("click", () => {
  cheie = selectDecriptareCheie.value;
  textCriptatDecriptare = selectDecriptareTextCriptat.value;

  if (cheie === "" || textCriptatDecriptare === "") {
    alert("Te rog completeaza campul Cheie si Text criptat");
    return [];
  }

  // sanetizam datele de intrare sa contina numai litere majuscule
  cheieSanetizata = cleanString(cheie);
  textCriptatDecriptareSanetizat = extractNumbers(textCriptatDecriptare);

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

  // pentru coordonate gasim litera corespunzatoare
  const decriptare = decripteazaPolibius(
    textCriptatDecriptareSanetizat,
    patratPolibius
  );

  // --- text decriptat Polibius ---
  containerTextDecriptatPolibius.textContent = decriptare.text;

  // -- Explicatii decriptare pasi Polibius SECTIUNE --
  const explicatiiExistente = document.querySelector(".explicatii");

  if (explicatiiExistente) {
    explicatiiExistente.remove();
  }

  containerPolibiusData.insertAdjacentHTML(
    "afterend",
    explicatiiPolibiusDecriptare()
  );

  const selectTabelPolibiusCheie = document.querySelector("#polibius-cheie");

  construirePatratPolibiusCompletatCuCheie(
    cheiePrelucrata,
    patratPolibiusCheie
  );

  // randarea patratului Polibius doar cu cehia
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

  // etapa 5 - criptarea fiecarui caracter
  const containerDateIesire = document.querySelector(".explicatii-polibius");

  for (let i = 0; i < decriptare.text.length; i++) {
    containerDateIesire.insertAdjacentHTML(
      "beforeend",
      `<p>Litera: ${decriptare.text[i]} - Decriptata din: ${decriptare.coordonate[i]}</p>`
    );
  }

  patratPolibiusCheie = [
    [0, 1, 2, 3, 4, 5],
    [1, "-", "-", "-", "-", "-"],
    [2, "-", "-", "-", "-", "-"],
    [3, "-", "-", "-", "-", "-"],
    [4, "-", "-", "-", "-", "-"],
    [5, "-", "-", "-", "-", "-"],
  ];
});
