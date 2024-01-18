/*document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        try {
            const token = sessionStorage.getItem('token');
            let logout;

        const loginLinkOnIndex = document.getElementById('login-link');

        if (token) {
            console.log('Avant la recherche de login-link');

                if (loginLinkOnIndex) {
                    loginLinkOnIndex.innerHTML = 'logout';
                    loginLinkOnIndex.id = 'logout';
                    logout = document.getElementById('logout');
                } else {
                    throw new Error("L'élément avec l'ID 'login-link' n'a pas été trouvé.");
                }
        }

        if (logout) {
            logout.addEventListener('click', () => {
                sessionStorage.removeItem('token');
            });
        }
        } catch (error) {
            console.error(error.message);
        }
    }, 0);
});*/




document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const urlParams = new URLSearchParams(window.location.search);
        const loggedIn = urlParams.get('loggedIn');

        if (loggedIn === 'true') {
            console.log('Avant la recherche de login-link')
            const loginLinkOnIndex = document.getElementById('login-link');
            console.log(loginLinkOnIndex);
            loginLinkOnIndex.innerHTML = 'logout';
        } else {
            console.error("l'élément avec l'ID 'login-link' n'a pas été trouvé.")
        }
    }, 100);
});