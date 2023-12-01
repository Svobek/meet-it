function aktualizujCzas() {
    // Utwórz nowy obiekt Date
    let teraz = new Date();

    // Ustaw strefę czasową na Polskę
    teraz.setHours(teraz.getHours() + teraz.getTimezoneOffset() / 60 + 1);

    // Wyświetl aktualną datę
    document.getElementById("data").innerHTML = teraz.toLocaleDateString();

    // Wyświetl aktualną godzinę
    document.getElementById("czas").innerHTML = teraz.toLocaleTimeString();
}

// Wywołaj funkcję aktualizujCzas od razu, a następnie co sekundę
aktualizujCzas();
setInterval(aktualizujCzas, 1000);

//liczenie kosztów
 // Pobierz elementy input
 let kosztyInput = document.getElementById('koszty');
 let iloscOsobInput = document.getElementById('ilosc-osob');
 let kosztOsobaInput = document.getElementById('koszt-osoba');

 // Dodaj zdarzenie input dla pola koszty
 kosztyInput.addEventListener('input', obliczKosztNaOsobe);

 // Dodaj zdarzenie input dla pola ilosc-osob
 iloscOsobInput.addEventListener('input', obliczKosztNaOsobe);

 function obliczKosztNaOsobe() {
     // Sprawdź, czy obie wartości są dostępne
     if (kosztyInput && iloscOsobInput) {
         // Pobierz wartości
         var koszty = parseFloat(kosztyInput.value);
         var iloscOsob = parseInt(iloscOsobInput.value);

         // Sprawdź, czy ilość osób jest większa od zera
         if (iloscOsob > 0) {
             // Oblicz koszt na osobę
             var kosztNaOsobe = koszty / iloscOsob;

             // Wyświetl wynik w polu koszt-osoba
             if (kosztOsobaInput) {
                 kosztOsobaInput.value = kosztNaOsobe.toFixed(2); // Zaokrąglenie do dwóch miejsc po przecinku
             }
         }
     } 
 }


 //uzupelnianie danych z mapy

 // Funkcja obsługująca zmiany miejsc
 function setupPlaceChangedListener(map, searchBox) {
    let markers = [];
  
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      console.log(places); // Sprawdź, czy dane są prawidłowo pobierane
  
      if (places.length == 0) {
        return;
      }
  
      // ... reszta kodu
    });
  }
  
  function updateLocationFields(place) {
    // Pobierz referencje do pól wejściowych
    const countryInput = document.querySelector(".box2 .input-panel:nth-child(1)");
    const cityInput = document.getElementById("location-input");
    const provinceInput = document.querySelector(".box2 .input-panel:nth-child(3)");
    const addressInput = document.querySelector(".box2 .input-panel:nth-child(4)");
  
    console.log(place); // Sprawdź, czy dane są prawidłowo przekazywane
  
    // Zaktualizuj wartości pól wejściowych
    countryInput.value = getComponentValue(place, "country");
    cityInput.value = getComponentValue(place, "locality");
    provinceInput.value = getComponentValue(place, "administrative_area_level_1");
    addressInput.value = getComponentValue(place, "route");
  }
  
  