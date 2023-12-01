document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginButton').addEventListener('click', function () {
        loginUser();
    });
});

function loginUser() {
    var apiUrl = 'https://meeetit.azurewebsites.net/User/Login/';

    // Get values from input fields
    var loginValue = document.getElementById('loginUser').value;
    var passwordValue = document.getElementById('loginPassword').value;

    // Validate input values (you may want to add more validation)
    if (!loginValue || !passwordValue) {
        console.error('Login and password are required');
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
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Status: ', response.status);
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Login successful:', data);
            // Redirect to the desired page after successful login
            window.location.href = 'desiredPage.html';
        } else {
            console.error('Login failed. Incorrect username or password. Try again.');
            // Display an error message on the page
            document.getElementById('loginErrorMessage').textContent = 'Incorrect username or password. Try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
