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