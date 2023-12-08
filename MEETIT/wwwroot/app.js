// skrypt sprawdzania zalogowania

/*document.addEventListener('DOMContentLoaded', (event) => {
  const zapWyj = document.getElementById('ZapWyj');
  const twWyj = document.getElementById('TwWyj');

  // Sprawdź, czy użytkownik jest zalogowany
  // Zastąp to odpowiednią logiką sprawdzającą stan logowania
  const isLoggedIn = false;

  if (!isLoggedIn) {
      zapWyj.addEventListener('click', (event) => {
          event.preventDefault();
          window.location.href = 'logowanie.html';
      });

      twWyj.addEventListener('click', (event) => {
          event.preventDefault();
          window.location.href = 'logowanie.html';
      });
  }
});*/


// skrypt godziny
function aktualizujCzas() {
    // Utwórz nowy obiekt Date
    let teraz = new Date();

    // Ustaw strefę czasową na Polskę
    teraz.setHours(teraz.getHours() + teraz.getTimezoneOffset() / 60 + 1);

    // Wyświetl aktualną datę
    let dzien = teraz.getDate().toString().padStart(2, '0');
    let miesiac = (teraz.getMonth() + 1).toString().padStart(2, '0'); // Miesiące są liczone od 0, więc dodajemy 1
    let rok = teraz.getFullYear();
    document.getElementById("data").innerHTML = `${dzien}-${miesiac}-${rok}`;

    // Wyświetl aktualną godzinę
    let godziny = teraz.getHours().toString().padStart(2, '0');
    let minuty = teraz.getMinutes().toString().padStart(2, '0');
    let sekundy = teraz.getSeconds().toString().padStart(2, '0');
    document.getElementById("czas").innerHTML = `${godziny}:${minuty}:${sekundy}`;
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

  
  // funkcja limitu slow 
  document.addEventListener('DOMContentLoaded', (event) => {
    const textarea = document.querySelector('.panel-opis');
    const wordCount = document.querySelector('#wordCount');
    textarea.addEventListener('input', (event) => {
      event.target.value = event.target.value.substring(0, 150);
      const letters = event.target.value.length;
      wordCount.textContent = `${letters}/150`;
      if (letters >= 150) {
        wordCount.style.color = 'red';
      } else {
        wordCount.style.color = 'white';
      }
    });
  });




    //write method to check if user is logged in
    async function checkIfLoggedInNW() {
        try {
            const token = sessionStorage.getItem('token');
            let apiUrl = 'https://meeetit.azurewebsites.net/User/CheckToken?token=' + token;

            let response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/text'
                },
            });
            let data = await response.text();
            if (!response.ok) {
                window.location.href = '/logowanie.html';                      
            }
            if (response.status === 200) {
                window.location.href = '/nowywyjazd.html';
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
}



async function checkIfLoggedInTW() {
    try {
        const token = sessionStorage.getItem('token');
        let apiUrl = 'https://meeetit.azurewebsites.net/User/CheckToken?token=' + token;

        let response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text'
            },
        });
        let data = await response.text();
        if (!response.ok) {
            window.location.href = '/logowanie.html';
        }
        if (response.status === 200) {
            window.location.href = '/twojwyjazd.html';
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
    window.location.href = '/index.html';
}





