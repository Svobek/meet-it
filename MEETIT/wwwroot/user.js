let loginButton = document.getElementById("loginButton");
let logoutButton = document.getElementById("logoutButton");
let username = document.getElementById("username");
// Ukryj elementy na początku
loginButton.style.display = "none";
logoutButton.style.display = "none";
username.style.display = "none";

async function onPageLoad() {
  let login = sessionStorage.getItem("login");

  try {
    const token = sessionStorage.getItem("token");
    let apiUrl =
      "https://meet-it.azurewebsites.net/User/CheckToken?token=" + token;

    let response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/text",
      },
    });
    let data = await response.text();
    if (!response.ok) {
      // Wyświetl przycisk "Zaloguj się", jeśli użytkownik nie jest zalogowany
      loginButton.style.display = "block";
    }
    if (response.status === 200) {
      // Wyświetl przycisk "Wyloguj" i span "Cześć,", jeśli użytkownik jest zalogowany
      username.style.display = "block";
      username.innerHTML += login;
      logoutButton.style.display = "block";
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
window.addEventListener("load", onPageLoad);