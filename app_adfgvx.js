import { cleanStringADFGVX, textCriptat, extractNumbers } from "./functions.js";
import {
  eliminaDuplicateSiCombinaIJ,
  eliminaLitereleDinCheie,
  litereAlfabet,
  construirePatratPolibius,
  gasesteCoordonate,
  flattenArray,
  construirePatratTranspozitie,
  sortMatrixByHeader,
  readMatrixByColumns,
  buildMatrixColumnByColumn,
  reorderMatrixByHeader,
  matrixToADFGXString,
  decripteazaCoordonateADFGX,
  sortAlphabetically,
} from "./adfgvx.js";
import {
  explicatiiPolibius,
  explicatiiPolibiusDecriptare,
} from "./explicatii_adfgvx.js";

export let cheie = "";
export let textInClar = "";
export let cifruTranspozitie = "";
export let cheieSanetizata = "";
export let textInClarSanetizat = "";
export let cifruTranspozitieSanetizat = "";
export let cheiePrelucrata = "";
export let cifruTranspozitiePrelucrat = "";
// export let textCriptatDecriptare = "";
// export let textCriptatDecriptareSanetizat = "";
export let etapaIntaiTranspozitie = "";

export let criptareArr = "";
export let etapaDoiTranspozitie = "";
export let cifrareaTextului = "";

// DECRIPTARE
export let cheieDecriptare = "";
export let textCriptatDecriptare = "";
export let cifruTranspozitieDecriptare = "";
export let cheieDecriptareSanetizata = "";
export let textCriptatDecriptareSanetizat = "";
export let cifruTranspozitieDecriptareSanetizat = "";

export let cheieDecriptarePrelucrata = "";
export let cifruTranspozitieDecriptarePrelucrat = "";
export let transpozitieEtapa1Decifrare = [];
export let transpozitieEtapa2Decifrare = [];
export let cifruPolibiusDecriptare = "";
export let decriptareADFGX = "";

// POLIBIUS
let selectTabelPolibius = document.querySelector("#polibius");
const selectCriptareCheie = document.querySelector("#criptareCheie");
const selectCriptareTextClar = document.querySelector("#criptareTextClar");
const selectCifruTranspozitie = document.querySelector("#cifruTranspozitie");
const selectDecriptareCifruTranspozitie = document.querySelector(
  "#cifruTranspozitieDecriptare"
);
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
  ["0", "A", "D", "F", "G", "V", "X"],
  ["A", "-", "-", "-", "-", "-", "-"],
  ["D", "-", "-", "-", "-", "-", "-"],
  ["F", "-", "-", "-", "-", "-", "-"],
  ["G", "-", "-", "-", "-", "-", "-"],
  ["V", "-", "-", "-", "-", "-", "-"],
  ["X", "-", "-", "-", "-", "-", "-"],
];

// patrat polibius utilizat in decriptare
const patratPolibiusADFGXDecriptare = [
  ["0", "A", "D", "F", "G", "V", "X"],
  ["A", "-", "-", "-", "-", "-", "-"],
  ["D", "-", "-", "-", "-", "-", "-"],
  ["F", "-", "-", "-", "-", "-", "-"],
  ["G", "-", "-", "-", "-", "-", "-"],
  ["V", "-", "-", "-", "-", "-", "-"],
  ["X", "-", "-", "-", "-", "-", "-"],
];

// --- FUNCTII ---
function randarePatratPolibius(selectTabelPolibius, patrat) {
  if (selectTabelPolibius !== null) {
    selectTabelPolibius.innerHTML = "";

    // loop randuri
    for (let i = 0; i < patrat.length; i++) {
      const row = document.createElement("tr");

      // loop intre coloane pe randul curent
      for (let j = 0; j < patrat[i].length; j++) {
        const cell = document.createElement("td");
        cell.textContent = patrat[i][j];
        row.appendChild(cell);
      }

      selectTabelPolibius.appendChild(row);
    }
  }
}
// ---
// randarea patratului Polibius fara nici o valoare
randarePatratPolibius(selectTabelPolibius, patratPolibius);

// ---- CRIPTARE ----
btnPolibiusCripteaza?.addEventListener("click", () => {
  cheie = selectCriptareCheie.value;
  textInClar = selectCriptareTextClar.value;
  cifruTranspozitie = selectCifruTranspozitie.value;

  if (cheie === "" || textInClar === "" || cifruTranspozitie === "") {
    alert("Te rog completeaza campul Cheie si Text in clar");
    return [];
  }

  // sanetizam datele de intrare sa contina numai litere majuscule
  cheieSanetizata = cleanStringADFGVX(cheie);
  textInClarSanetizat = cleanStringADFGVX(textInClar);
  cifruTranspozitieSanetizat = cleanStringADFGVX(cifruTranspozitie);

  console.log(textInClarSanetizat);
  // prelucram cheia pentru a elimina duplicatele si combinam I cu J
  cheiePrelucrata = eliminaDuplicateSiCombinaIJ(cheieSanetizata);
  cifruTranspozitiePrelucrat = eliminaDuplicateSiCombinaIJ(
    cifruTranspozitieSanetizat
  );

  // din alfabet eliminam toate literele care sunt existente in cheie
  const alfabetFaraCheie = eliminaLitereleDinCheie(
    litereAlfabet,
    cheiePrelucrata
  );

  // completam patratul polibius cu cheia si restul literelor alfabetului
  construirePatratPolibius(cheiePrelucrata, alfabetFaraCheie, patratPolibius);

  // randarea noului patrat Polibius
  selectTabelPolibius = document.querySelector("#polibius");
  randarePatratPolibius(selectTabelPolibius, patratPolibius);

  // gasim coordonatele fiecarei litere si o criptam
  const criptare = gasesteCoordonate(textInClarSanetizat, patratPolibius);
  criptareArr = flattenArray(criptare);

  // etapa 1 transpozitie
  etapaIntaiTranspozitie = construirePatratTranspozitie(
    cifruTranspozitiePrelucrat,
    criptareArr
  );
  // etapa 2 transpozitie
  etapaDoiTranspozitie = sortMatrixByHeader(etapaIntaiTranspozitie);

  // cifrarea textului
  cifrareaTextului = readMatrixByColumns(etapaDoiTranspozitie);

  containerTextCriptatPolibius.textContent = cifrareaTextului.join("");

  // ----- EXPLICATII PASI SECTIUNE -----
  const explicatiiExistente = document.querySelector(".explicatii");

  if (explicatiiExistente) {
    explicatiiExistente.remove();
  }

  containerPolibiusData.insertAdjacentHTML("afterend", explicatiiPolibius());
  //   const selectTabelPolibiusCheie = document.querySelector("#polibius-cheie");

  // randarea patratului Polibius complet
  const selectTabelPolibiusComplet =
    document.querySelector("#polibius-complet");
  randarePatratPolibius(selectTabelPolibiusComplet, patratPolibius);
});

// ---- DECRIPTARE ----
btnPolibiusDecripteaza?.addEventListener("click", () => {
  cheieDecriptare = selectDecriptareCheie.value;
  textCriptatDecriptare = selectDecriptareTextCriptat.value;
  cifruTranspozitieDecriptare = selectDecriptareCifruTranspozitie.value;

  if (
    cheieDecriptare === "" ||
    textCriptatDecriptare === "" ||
    cifruTranspozitieDecriptare === ""
  ) {
    alert("Te rog completeaza campul Cheie si Text criptat");
    return [];
  }

  // sanetizam datele de intrare sa contina numai litere majuscule
  cheieDecriptareSanetizata = cleanStringADFGVX(cheieDecriptare);
  textCriptatDecriptareSanetizat = cleanStringADFGVX(textCriptatDecriptare);
  cifruTranspozitieDecriptareSanetizat = cleanStringADFGVX(
    cifruTranspozitieDecriptare
  );

  // prelucrare chei - eliminam duplicate si literele I si J devin I/J

  cheieDecriptarePrelucrata = eliminaDuplicateSiCombinaIJ(
    cheieDecriptareSanetizata
  );
  cifruTranspozitieDecriptarePrelucrat = eliminaDuplicateSiCombinaIJ(
    cifruTranspozitieDecriptareSanetizat
  );

  // sortam array-ul de transpozite decifrare alfabetic
  const headerEtapa1Decifrare = sortAlphabetically(
    cifruTranspozitieDecriptarePrelucrat
  );

  // Tabel de transpozitie etapa 1 de decriptare
  transpozitieEtapa1Decifrare = buildMatrixColumnByColumn(
    headerEtapa1Decifrare,
    textCriptatDecriptareSanetizat.split("")
  );

  // Etapa 2 transpozite decriptare
  transpozitieEtapa2Decifrare = reorderMatrixByHeader(
    cifruTranspozitieDecriptarePrelucrat,
    transpozitieEtapa1Decifrare
  );

  // Se obtin coordonatele pentru patratul polibius (text intermediar)
  cifruPolibiusDecriptare = matrixToADFGXString(transpozitieEtapa2Decifrare);

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

  // randarea noului patrat Polibius
  selectTabelPolibius = document.querySelector("#polibius");
  randarePatratPolibius(selectTabelPolibius, patratPolibiusADFGXDecriptare);

  // decriptarea finala
  decriptareADFGX = decripteazaCoordonateADFGX(
    patratPolibiusADFGXDecriptare,
    cifruPolibiusDecriptare
  );

  containerTextDecriptatPolibius.textContent = decriptareADFGX;

  console.log(transpozitieEtapa1Decifrare);
  console.log(transpozitieEtapa2Decifrare);
  console.log(cifruPolibiusDecriptare);
  console.log(patratPolibiusADFGXDecriptare);

  // ----- EXPLICATII PASI SECTIUNE -----
  const explicatiiExistente = document.querySelector(".explicatii");

  if (explicatiiExistente) {
    explicatiiExistente.remove();
  }

  containerPolibiusData.insertAdjacentHTML(
    "afterend",
    explicatiiPolibiusDecriptare()
  );
  //   const selectTabelPolibiusCheie = document.querySelector("#polibius-cheie");

  // completam patratul polibius cu cheia si restul literelor alfabetului
  const selectTabelPolibiusComplet =
    document.querySelector("#polibius-complet");
  randarePatratPolibius(
    selectTabelPolibiusComplet,
    patratPolibiusADFGXDecriptare
  );
});
