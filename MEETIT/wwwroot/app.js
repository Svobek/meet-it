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


