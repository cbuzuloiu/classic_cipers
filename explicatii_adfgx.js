import {
  cheie,
  textInClar,
  cheieSanetizata,
  textInClarSanetizat,
  cheiePrelucrata,
  //   textCriptatDecriptare,
  //   textCriptatDecriptareSanetizat,
  cifruTranspozitie,
  cifruTranspozitieSanetizat,
  cifruTranspozitiePrelucrat,
  criptareArr,
  etapaIntaiTranspozitie,
  etapaDoiTranspozitie,
  cifrareaTextului,
  cheieDecriptare,
  textCriptatDecriptare,
  cifruTranspozitieDecriptare,
  cheieDecriptareSanetizata,
  textCriptatDecriptareSanetizat,
  cifruTranspozitieDecriptareSanetizat,
  cheieDecriptarePrelucrata,
  cifruTranspozitieDecriptarePrelucrat,
  transpozitieEtapa1Decifrare,
  transpozitieEtapa2Decifrare,
  cifruPolibiusDecriptare,
  decriptareADFGX,
} from "./app_adfgx.js";

export function explicatiiPolibius() {
  return `
<section class="explicatii">
    <div class="titlu-explicatii">
        <h2>Etape criptare ADFGX</h2>
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
                <p>Cifru transpozitie: ${cifruTranspozitie}</p>
            </div>    

            <div class = "date-iesire">
                <p>Date de iesire: </p>
                <p>Cheie: ${cheieSanetizata} </p>
                <p>Text in clar: ${textInClarSanetizat} </p>
                <p>Cifru transpozitie: ${cifruTranspozitieSanetizat}</p>
            </div>  
        </div>

        <p>2. Eliminam din cheie toate literele care sunt duplicate si consideram ca I si J sunt aceeasi litera. Astfel obtinem urmatoarea cheie: ${cheiePrelucrata} si cifru de transpozitie: ${cifruTranspozitiePrelucrat}</p>
        <p>3. Se completeaza patratul Polibius cu restul literelor alfabetului:</p>
        <table id="polibius-complet"></table>
        <p>4. Se realizeaza criptarea textului intermediar prin inlocuirea fiecarei litere cu coordonatele sale din patrat in formatul [linie,coloana]. Se obtine urmatorul text criptat urmand principiile patratului Polibius : ${criptareArr.join(
          ""
        )}</p>
        <h3>5. Etapa 1 de transpozitie:</h3>
        <p>In prima etapa de transpozitie cheia de transpozitie devine cap de tabel. Sub ea se pozitioneaza in ordine toate literele din textul intermediar. In cazul in care la final exista una su mai mult pozitii neocupate aceastea se inlocuiesc cu o litera cu frecventa mica. In cazul de fata Q. Obtinem:  </p>
        <p>${etapaIntaiTranspozitie
          .map((row) => row.join(" "))
          .join("<br>")}</p>
        <h3>6. Etapa 2 de transpozitie:</h3>
        <p>In a 2-a etapa de transpozitie se ordoneaza alfabetic coloanele capului de tabel obtinut anterior.</p>
        <p>${etapaDoiTranspozitie.map((row) => row.join(" ")).join("<br>")}</p>
        <h3>7. Cifrarea textului</h3>
        <p>Cifrarea textului se realizeaza luand literele coloana cu coloana excluzand capul de tabel. Se obtine urmatorul text cifrat: ${cifrareaTextului.join(
          ""
        )}</p>
    </div>
</section>`;
}

export function explicatiiPolibiusDecriptare() {
  return `
<section class="explicatii">
    <div class="titlu-explicatii">
        <h2>Etape decriptare ADFGX</h2>
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
                <p>Cheie: ${cheieDecriptare} </p>
                <p>Text in clar: ${textCriptatDecriptare} </p>
                <p>Cifru transpozitie: ${cifruTranspozitieDecriptare}</p>
            </div>    

            <div class = "date-iesire">
                <p>Date de iesire: </p>
                <p>Cheie: ${cheieDecriptareSanetizata} </p>
                <p>Text criptat: ${textCriptatDecriptareSanetizat} </p>
                <p>Cifru transpozitie: ${cifruTranspozitieDecriptareSanetizat}</p>
            </div>  
        </div>

        <p>2. Eliminam din cheie toate literele care sunt duplicate si consideram ca I si J sunt aceeasi litera. Astfel obtinem urmatoarea cheie: ${cheieDecriptarePrelucrata} si cifru de transpozitie: ${cifruTranspozitieDecriptarePrelucrat}</p>

        <h3>3. Etapa 1 tabel transpozitie decriptare</h3>
        <p>Cunoscand cheia aceasta devine cap de tabel si se ordoneaza alfabetic. Textul cifrat se pozitioneaza pe coloane urmarind ordinea capului de tabel.</p>
        <p>${transpozitieEtapa1Decifrare
          .map((row) => row.join(" "))
          .join("<br>")}</p>

        <h3>4. Etapa 2 tabel transpozitie decriptare</h3>
        <p> Coloanele tabelului generat anterior se pozitioneaza dupa ordinea literelor din cheie. Astfel se obtine:</p>
        <p>${transpozitieEtapa2Decifrare
          .map((row) => row.join(" "))
          .join("<br>")}
        </p>

        <p>5. Se obtine textul intermediar, Coordonatele pentru patratul Polibius: </p>
        <p>${cifruPolibiusDecriptare}</p>

        <p>6. Se creeaza patratul Polibius:</p>
        <table id="polibius-complet"></table>
        
        <p>7. Se realizeaza decriptarea textului criptat utilizand coordonatele obtinute la punctul 5 si tabelul Polibius:</p>
        <p>${decriptareADFGX}</p>
        
    </div>
</section>`;
}
