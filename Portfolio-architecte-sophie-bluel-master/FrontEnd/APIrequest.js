/***function for API request***/
async function APIrequest() {
    try {
    const projectsURL = "http://localhost:5678/api-docs/#/default/post_users_login";
    fetch(projectsURL)

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données')
    }
    const fetchUrl = await fetch(projectsURL)
    const projectsJson = await fetchUrl.json()
    console.log(projectsJson)
    dataOnHTML(projectsJson);
    } catch (error) {
        console.error('Erreur 2:', error);
    }
}

/***Add projects on html***/
function dataOnHTML(data) {
    const projectsContainer = document.querySelector(".gallery");

    data.array.forEach(item => {
        const projectsElement = document.createElement('figure');

        const imageElement = document.createElement('img');
        imageElement.src = item.imageUrl;
        const titleElement = document.createElement('figcaption');
        titleElement.innerText = item.title;

        projectsElement.appencChild(projectsElement);
        projectsElement.appendChild(imageElement);
        projectsContainer.appendChild(projectsElement);

    });
}

