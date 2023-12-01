document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addUser').addEventListener('click', function () {
        addUser();
    });
});

function addUser() {
    var apiUrl = 'https://localhost:7168/User/AddUser/';

    // Get values from input fields
    var loginValue = document.getElementById('user').value;
    var passwordValue = document.getElementById('password').value;

    // Validate input values (you may want to add more validation)
    if (!loginValue || !passwordValue) {
        console.error('Login and password are required');
        return;
    }

    var user = {
        login: loginValue,
        psswd: passwordValue
        // Add other user properties as needed
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
        console.log('User added successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
