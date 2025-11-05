import {
  cheie,
  textInClar,
  cheieSanetizata,
  textInClarSanetizat,
  cheiePrelucrata,
  textCriptatDecriptare,
  textCriptatDecriptareSanetizat,
} from "./app.js";

export function explicatiiPolibius() {
  return `
<section class="explicatii">
    <div class="titlu-explicatii">
        <h2>Etape criptare Polibius</h2>
    </div>

    <div class = "explicatii-polibius">
        <p>
            1. Preluam datele de la utilizator si eliminam spatiile, orice caracter
            care nu este litara de la A la Z si transformam toate literele in
            majuscule
        </p>

        <div class = "date">
            <div class = "date-intrare">
                <p>Date de intrare: </p>
                <p>Cheie: ${cheie} </p>
                <p>Text in clar: ${textInClar} </p>
            </div>    

            <div class = "date-iesire">
                <p>Date de iesire: </p>
                <p>Cheie: ${cheieSanetizata} </p>
                <p>Text in clar: ${textInClarSanetizat} </p>
            </div>  
        </div>

        <p>2. Eliminam din cheie toate literele care sunt duplicate si consideram ca I si J sunt aceeasi litera. Astfel obtinem urmatoarea cheie: ${cheiePrelucrata}</p>

        <p>3. Se completeaza patratul Polibius cu cheia:</p>
        <table id="polibius-cheie"></table>
        <p>4. Se completeaza patratul Polibius cu restul literelor alfabetului:</p>
        <table id="polibius-complet"></table>
        <p>5. Se cripteaza textul prin inlocuirea fiecarei litere cu coordonatele sale din patrat in formatul [linie,coloana]
    </div>
</section>`;
}

export function explicatiiPolibiusDecriptare() {
  return `
<section class="explicatii">
    <div class="titlu-explicatii">
        <h2>Etape decriptare Polibius</h2>
    </div>

    <div class = "explicatii-polibius">
        <p>
            1. Preluam datele de la utilizator si pentru cheie eliminam spatiile, orice caracter
            care nu este litara de la A la Z si transformam toate literele in
            majuscule. Pentru textul criptat ne aiguram ca avem numai caractere numerice de la 1 la 9 si eliminam spatiile, iar numarul de caractere este par.
        </p>

        <div class = "date">
            <div class = "date-intrare">
                <p>Date de intrare: </p>
                <p>Cheie: ${cheie} </p>
                <p>Text in clar: ${textCriptatDecriptare} </p>
            </div>    

            <div class = "date-iesire">
                <p>Date de iesire: </p>
                <p>Cheie: ${cheieSanetizata} </p>
                <p>Text in clar: ${textCriptatDecriptareSanetizat} </p>
            </div>  
        </div>

        <p>2. Eliminam din cheie toate literele care sunt duplicate si consideram ca I si J sunt aceeasi litera. Astfel obtinem urmatoarea cheie: ${cheiePrelucrata}</p>

        <p>3. Se completeaza patratul Polibius cu cheia:</p>
        <table id="polibius-cheie"></table>
        <p>4. Se completeaza patratul Polibius cu restul literelor alfabetului:</p>
        <table id="polibius-complet"></table>
        <p>5. Se decripteaza textul prin inlocuirea fiecarei litere cu coordonatele sale din patrat in formatul [linie,coloana]
    </div>
</section>`;
}
