document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginButton').addEventListener('click', function () {
        loginUser();
    });
});

function loginUser() {
    let apiUrl = 'https://meeeetit.azurewebsites.net/User/Login/';
    let loginValue = document.getElementById('loginUser').value;
    let passwordValue = document.getElementById('loginPassword').value;

    if (!loginValue || !passwordValue) {
        console.error('Login and password are required');
        return;
    }

    let user = {
        login: loginValue,
        psswd: passwordValue
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        if (data === "Succesfull Login") {
            alert("Zalogowano pomyślnie!");
            window.location.href = '/index.html';
        } else {
            document.getElementById('loginErrorMessage').textContent = 'Incorrect username or password. Try again.';
            alert('Login failed. Incorrect username or password. Try again.');
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
