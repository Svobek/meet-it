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

        if (!loginValue || !passwordValue) {
            document.getElementById('loginErrorMessage').textContent = 'Incorrect username or password. Try again.';
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
                document.getElementById('loginErrorMessage').textContent = 'Incorrect username or password. Try again.';
            }
        }

       

        if (response.status === 200) {
            const token = data;
            sessionStorage.setItem('token', token);
            alert("Zalogowano pomyślnie!");
            window.location.href = '/index.html';
        } 
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


