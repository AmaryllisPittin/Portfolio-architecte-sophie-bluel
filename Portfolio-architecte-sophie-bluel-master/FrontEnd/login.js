const inputMail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputSubmitConnection = document.querySelector('.login-submit');

inputSubmitConnection.addEventListener('click', function () {
    if (inputMail.value.length < 1 ) {
        const errorMessageContainer = document.querySelector('.login-submit-and-link');
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Erreur: veuillez remplir les deux champs pour vous connecter'
        errorMessage.style.display = 'block';

        errorMessageContainer.appendChild(errorMessage);

        return;
    }
});

inputMail.addEventListener('input', function () {
    errorMessage.style.display = 'none'
});

let loginConnexion = inputSubmitConnection.addEventListener('click', (a) => {
    a.preventDefault();

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'Application/json',
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify ({
            email: inputMail.value,
            password: inputPassword.value,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message || data.errorMessage) {
            alert('Erreur: identifiant ou mot de passe incorrects');
        } else {
            sessionStorage.setItem('connected', JSON.stringify(true));
            sessionStorage.setItem('Token', data.token);

            window.location.replace('index.html');
        }
    });
});
