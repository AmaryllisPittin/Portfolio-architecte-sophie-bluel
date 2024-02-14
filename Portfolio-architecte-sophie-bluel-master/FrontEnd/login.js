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
                document.addEventListener('DOMContentLoaded', function () {
                loginLinkOnIndex = document.getElementById('login-link');
                console.log(loginLinkOnIndex);
                loginLinkOnIndex.innerHTML = 'logout';
                });
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    });

    inputMail.addEventListener('input', function () {
        errorMessage.style.display = 'none';
    });
});