/*let portfolioModifyButton = document.querySelector(".portfolio-modified");
let buttonsContainer = document.querySelector(".buttons-container");

portfolioModifyButton.style.overflow = 'hidden';
buttonsContainer.style.overflow = 'hidden';
console.log('overflow', portfolioModifyButton.style.overflow)

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const urlParams = new URLSearchParams(window.location.search);
        const loggedIn = urlParams.get('loggedIn');

        if (loggedIn === 'true') {
            console.log('Avant la recherche de login-link')
            const loginLinkOnIndex = document.getElementById('login-link');
            console.log(loginLinkOnIndex);
            loginLinkOnIndex.innerHTML = 'logout';
            portfolioModifyButton.style.overflow = 'visible';
            buttonsContainer.style.overflow = 'visible';

            loginLinkOnIndex.addEventListener('click', function() {
                // Demander à l'utilisateur s'il est sûr de se déconnecter
                const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
                if (confirmation) {
                    // Réinitialiser les informations de connexion
                    sessionStorage.removeItem('connected');
                    sessionStorage.removeItem('Token');
                    // Rediriger vers la page de connexion
                    window.location.href = '/';
                    portfolioModifyButton.style.overflow = 'hidden';
                    buttonsContainer.style.overflow = 'hidden';
                }
            });
        } 
    }, 100);
});*/


/***ESSAI FONCTIONNEL MAIS STYLE DECALE */
/*let portfolioModifyButton = document.querySelector(".portfolio-modified");
let buttonsContainer = document.querySelector(".buttons-container");

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const urlParams = new URLSearchParams(window.location.search);
        const loggedIn = urlParams.get('loggedIn');

        if (loggedIn === 'true') {
            const loginLinkOnIndex = document.getElementById('login-link');
            loginLinkOnIndex.innerHTML = 'logout';

            // Afficher les éléments lorsque l'utilisateur est connecté
            portfolioModifyButton.style.display = 'block';
            buttonsContainer.style.display = 'block';

            loginLinkOnIndex.addEventListener('click', function() {
                const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
                if (confirmation) {
                    sessionStorage.removeItem('connected');
                    sessionStorage.removeItem('Token');
                    window.location.href = '/';
                }
            });
        } else {
            // Cacher les éléments lorsque l'utilisateur n'est pas connecté
            portfolioModifyButton.style.display = 'none';
            buttonsContainer.style.display = 'none';
        }
    }, 100);
});*/

/**** */

let portfolioModifyButton = document.querySelector(".portfolio-modified");
let buttonsContainer = document.querySelector(".buttons-container");

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const urlParams = new URLSearchParams(window.location.search);
        const loggedIn = urlParams.get('loggedIn');

        if (loggedIn === 'true') {
            const loginLinkOnIndex = document.getElementById('login-link');
            loginLinkOnIndex.innerHTML = 'logout';
            loginLinkOnIndex.style.cursor = 'pointer';

            portfolioModifyButton.style.display = 'flex';
            buttonsContainer.style.display = 'flex';

            loginLinkOnIndex.addEventListener('click', function() {
                const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
                if (confirmation) {
                    sessionStorage.removeItem('connected');
                    sessionStorage.removeItem('Token');
                    window.location.href = '/';
                }
            });
        } else {
            portfolioModifyButton.style.display = 'none';
            buttonsContainer.style.display = 'none';
        }
    }, 100);
});