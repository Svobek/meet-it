/*document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginButton').addEventListener('click', function () {
        loginUser();
    });
});

function loginUser() {
    let apiUrl = 'https://meeetit.azurewebsites.net/User/Login/';
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
        console.log("321");
        return response.text();
    })
    .then(data => {
        console.log(data);
        console.log("123");
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
}*/
async function loginUser() {
    const url = 'https://meeetit.azurewebsites.net/User/Login/'; // Zastąp 'adres_twojego_endpointu' odpowiednim adresem
    let login = document.getElementById('loginUser').value;
    let password = document.getElementById('loginPassword').value;
    const requestBody = {
        login: login,
        psswd: password
    };
    console.log(requestBody);

    try {
        const response = await fetch(url, {
            method: 'POST',    
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        if (response.status === 200) {
            console.log('Successful Login:', result);
        } else {
            console.error('Login Failed:', result);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginButton').addEventListener('click', function () {
        loginUser();
    });
});

