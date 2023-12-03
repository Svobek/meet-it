document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addUser').addEventListener('click', function () {
        addUser();
    });
});

function validatePassword(password) {
    if (password.length < 6) {
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    if (!/[0-9]/.test(password)) {
        return false;
    }
    return true;
}

function addUser() {
    var apiUrl = 'https://meeetit.azurewebsites.net/User/AddUser/';

    var loginValue = document.getElementById('user').value;
    var passwordValue = document.getElementById('password').value;

    if (!loginValue || !passwordValue) {
        console.error('Login and password are required');
        return;
    }

    if (!validatePassword(passwordValue)) {
        console.error('Password must be at least 6 characters long, contain at least one uppercase letter and one digit');
        return;
    }

    var user = {
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
/*    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Status: ', response.status);
        return response.json();
    })
    .then(data => {
        console.log('User added successfully:', data);
        alert('Konto utworzone');
        window.location.href = 'logowanie.html';
    }) */
    .catch(error => {
        console.error('Error:', error);
    });
}
