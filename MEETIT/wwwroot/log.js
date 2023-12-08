document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginButton').addEventListener('click', function () {
        event.preventDefault();
        loginUser();
    });
});

async function loginUser() {
    try {
        let apiUrl = 'https://meeetit.azurewebsites.net/User/Login/';
        let loginValue = document.getElementById('loginUser').value;
        let passwordValue = document.getElementById('loginPassword').value;
        let loginInfoDiv = document.getElementById('login-info');
        let loginErrorMessage = document.getElementById('loginErrorMessage');

        if (!loginValue || !passwordValue) {
            loginErrorMessage.textContent = 'Podałeś nieprawidłowy login lub hasło. Spróbuj ponownie.';
            loginInfoDiv.style.display = 'block'; // Wyświetl div
            return;
        }

        let user = {
            login: loginValue,
            psswd: passwordValue
        };

        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        let data = await response.text();
        if (!response.ok) {
            if (data === "Invalid login or password"){
                loginErrorMessage.textContent = 'Podałeś nieprawidłowy login lub hasło. Spróbuj ponownie.';
                loginInfoDiv.style.display = 'block'; // Wyświetl div
            }
        }

        if (response.status === 200) {
            const token = data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('login', loginValue);
            alert("Zalogowano pomyślnie!");
            loginInfoDiv.style.display = 'none'; // Ukryj div
            window.location.href = '/index.html';
        } 
    } catch (error) {
        console.error('Fetch error:', error);
    }
}