/*const inputMail = document.getElementById('email');
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

            window.location.replace('index.html?loggedIn=true');
            const loginLinkOnIndex = document.getElementById('login-link');
            console.log(loginLinkOnIndex);
            loginLinkOnIndex.innerHTML = 'logout';
        }
    });
});*/





/***ancienne version****/

/*let errorMessage = document.createElement('p');

document.addEventListener('DOMContentLoaded', function () {
    const inputMail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const inputSubmitConnection = document.querySelector('.login-submit');
    const errorMessageContainer = document.querySelector('.login-submit-and-link');

    inputSubmitConnection.addEventListener('click', function () {
        if (inputMail.value.length < 1) {
            errorMessage.innerText = 'Erreur: veuillez remplir les deux champs pour vous connecter';
            errorMessage.style.display = 'block';
            errorMessageContainer.appendChild(errorMessage);
            return;
        }
    });

    inputMail.addEventListener('input', function () {
        errorMessage.style.display = 'none';
    });

    let loginLinkOnIndex;

    inputSubmitConnection.addEventListener('click', (a) => {
        a.preventDefault();

        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                Accept: 'Application/json',
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
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

                window.location.replace('index.html?loggedIn=true');
                loginLinkOnIndex = document.getElementById('login-link');
                console.log(loginLinkOnIndex);
                loginLinkOnIndex.innerHTML = 'logout';
            }
        });
    });
});*/




/****ESSAI 26 janvier: couloir manor*****/

document.addEventListener('DOMContentLoaded', function () {
    const inputMail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const inputSubmitConnection = document.querySelector('.login-submit');
    const errorMessageContainer = document.querySelector('.login-submit-and-link');
    let loginLinkOnIndex = document.getElementById('login-link');

    inputSubmitConnection.addEventListener('click', function (event) {
        event.preventDefault();

        if (inputMail.value.length < 1 || inputPassword.value.length < 1) {
            errorMessage.innerText = 'Erreur: veuillez remplir les deux champs pour vous connecter';
            errorMessage.style.display = 'block';
            errorMessageContainer.appendChild(errorMessage);
            return;
        }

        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: inputMail.value,
                password: inputPassword.value,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.message || data.errorMessage) {
                alert('Erreur: identifiant ou mot de passe incorrects');
            } else {
                
                sessionStorage.setItem('connected', JSON.stringify(true));
                sessionStorage.setItem('Token', data.token);

                window.location.replace('index.html?loggedIn=true');
                loginLinkOnIndex = document.getElementById('login-link');
                console.log(loginLinkOnIndex);
                loginLinkOnIndex.innerHTML = 'logout';
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Gérez l'erreur ici, par exemple, affichez un message d'erreur à l'utilisateur
        });
    });

    inputMail.addEventListener('input', function () {
        errorMessage.style.display = 'none';
    });
});