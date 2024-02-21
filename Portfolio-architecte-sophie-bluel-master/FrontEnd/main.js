let portfolioModifyButton = document.getElementById("portfolio-modified");
let buttonsContainer = document.querySelector(".buttons-container");

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const loggedIn = !!localStorage.getItem('token')

        if (loggedIn) {
            const loginLinkOnIndex = document.getElementById('login-link');
            loginLinkOnIndex.innerHTML = 'logout';
            loginLinkOnIndex.style.cursor = 'pointer';

            portfolioModifyButton.style.display = 'flex';
            buttonsContainer.style.display = 'flex';

            loginLinkOnIndex.addEventListener('click', function() {
                const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
                if (confirmation) {
                    localStorage.removeItem('token');
                    window.location.reload();
                }
            });
        } else {
            portfolioModifyButton.style.display = 'none';
            buttonsContainer.style.display = 'none';
        }
    }, 100);
});