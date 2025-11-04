// // patratul polibius

// const cheie = "SECRETSIGUR";
// const textClar = "EXEMPLU";

// const litereAlfabet = [
//   "A",
//   "B",
//   "C",
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "I/J",
//   "K",
//   "L",
//   "M",
//   "N",
//   "O",
//   "P",
//   "Q",
//   "R",
//   "S",
//   "T",
//   "U",
//   "V",
//   "W",
//   "X",
//   "Y",
//   "Z",
// ];

// const patratPolibius = [
//   [0, 1, 2, 3, 4, 5],
//   [1, "-", "-", "-", "-", "-"],
//   [2, "-", "-", "-", "-", "-"],
//   [3, "-", "-", "-", "-", "-"],
//   [4, "-", "-", "-", "-", "-"],
//   [5, "-", "-", "-", "-", "-"],
// ];

// // console.log(patratPolibius);

// // // stergem literele duplicate din cheie
// // const cheieFaraLitereDuplicate = new Set(cheie);

// // const newArr = Array.from(cheieFaraLitereDuplicate).map((litera) => {
// //   if (litera === "I" || litera === "J") {
// //     return "I/J";
// //   }
// //   return litera;
// // });

// function eliminaDuplicateSiCombinaIJ(cheie) {
//   // Convertim cheia la uppercase
//   const upper = cheie.toUpperCase();

//   // Eliminam orice caracter care nu e litera A-Z
//   const doarLitere = upper.replace(/[^A-Z]/g, "");

//   // Eliminam duplicatele
//   const cheieFaraDuplicate = new Set(doarLitere);

//   // Convertim in array si combinam I/J
//   const rezultat = Array.from(cheieFaraDuplicate).map((litera) => {
//     if (litera === "I" || litera === "J") {
//       return "I/J";
//     }
//     return litera;
//   });

//   return rezultat;
// }

// function eliminaLitereleDinCheie(litereAlfabet, cheiePrelucrata) {
//   return litereAlfabet.filter((litera) => {
//     if (cheiePrelucrata.includes(litera)) {
//       // Daca cheiePrelucrata contine litera atunci o exclude,
//       return false;
//     } else {
//       // Daca nu atunci o pastram
//       return true;
//     }
//   });
// }

// // Prelucram cheia pentru a elimina duplicatele si consideram I/J ca fiind aceeasi litera
// const cheiePrelucrata = eliminaDuplicateSiCombinaIJ(cheie);

// const alfabetFaraCheie = eliminaLitereleDinCheie(
//   litereAlfabet,
//   cheiePrelucrata
// );

// console.log(cheiePrelucrata);

// let indexCheie = 0;
// let indexAlfabet = 0;
// // constructia linilor
// for (let i = 1; i <= 5; i++) {
//   console.log(`-- Linia ${i} --`);
//   // constructia coloanelor
//   for (let j = 1; j <= 5; j++) {
//     if (indexCheie < cheiePrelucrata.length) {
//       console.log(`Coloana ${cheiePrelucrata[indexCheie]}`);
//       patratPolibius[i][j] = cheiePrelucrata[indexCheie];
//       indexCheie++;
//     } else {
//       console.log(`Coloana ${alfabetFaraCheie[indexAlfabet]}`);
//       patratPolibius[i][j] = alfabetFaraCheie[indexAlfabet];
//       indexAlfabet++;
//     }
//   }
// }

// console.log(patratPolibius);

// console.log("Alfabet fara cheie: ", alfabetFaraCheie);
