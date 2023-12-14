document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addUser').addEventListener('click', function () {
        event.preventDefault();
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
    var apiUrl = 'https://meet-it.azurewebsites.net/User/AddUser/';

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
    })*/
    .then(response => {
        console.log('User added successfully:', data);
        alert('Konto utworzone');
        window.location.href = 'logowanie.html';
    }) 
    .catch(error => {
        console.error('Error:', error);
    });
}


//skrypt informujacy od ilosci znakow w polu tekstowym
document.addEventListener('DOMContentLoaded', function () {
    // Ukryj div 'password-info' po załadowaniu strony
    let passwordInfo = document.getElementById('password-info');
    passwordInfo.style.display = 'none';

    document.getElementById('loginButton').addEventListener('click', function () {
        loginUser();
    });
});
  // Wybierz elementy input
  let passwordInput = document.getElementById('password');
  let returnPasswordInput = document.getElementById('return-password');

  // Wybierz div do wyświetlania informacji
  let passwordInfo = document.getElementById('password-info');

  // Ustaw komunikat
  let message = "Hasło powinno zawierać:\n - min. 6 znaków \n- min. jedna duża litera\n- min. jedna cyfra";

  // Dodaj zdarzenie 'focus' do elementów input
  passwordInput.addEventListener('focus', function() {
    passwordInfo.style.display = 'block';
    passwordInfo.innerText = message;
  });

  returnPasswordInput.addEventListener('focus', function() {
    passwordInfo.style.display = 'block';
    passwordInfo.innerText = message;
  });

  // Dodaj zdarzenie 'blur' do elementów input
  passwordInput.addEventListener('blur', function() {
    passwordInfo.style.display = 'none';
  });

  returnPasswordInput.addEventListener('blur', function() {
    passwordInfo.style.display = 'none';
  });


