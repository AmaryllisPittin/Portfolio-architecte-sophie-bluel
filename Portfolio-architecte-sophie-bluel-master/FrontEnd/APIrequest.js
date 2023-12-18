const elementContainer = document.querySelector('.gallery');
fetch("http://localhost:5678/api-docs/")
.then((response) => {
    return response.json();
})
.then((imagesTabs) => {
    console.log(imagesTabs);
    for(const imageTab of imagesTabs) {
        const figureElement = document.createElement('figure');
        figureElement.innerText = imageTab;
        elementContainer.appendChild(figureElement);
    }
});



/*async function APIrequest() {
    try {
    const projectsURL = "http://localhost:5678/api-docs/#/default/post_users_login";
    const response = await fetch(projectsURL);

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données')
    }

    const projectsJson = await response.json();
    console.log(projectsJson);

    dataOnHTML(projectsJson);
    } catch (error) {
        console.error('Erreur 2:', error);
    }
}*/



/***Request & Add projects on html***/

/*const elementContainer = document.querySelector('.gallery');

async function APIrequest() {
    try {
    const projectsURL = "http://localhost:5678/api-docs/#/default/post_users_login";
    const response = await fetch(projectsURL);

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données')
    }

    const projectsJson = await response.json();
    console.log(projectsJson);

    dataOnHTML(projectsJson);
    } catch (error) {
        console.error('Erreur 2:', error);
    }
}

function dataOnHTML(imagesTab) {
    console.log(imagesTab);
    for(const imageTab of imagesTab) {
        const figureElement = document.createElement('figure');
        figureElement.innerText = imageTab.title;
        elementContainer.appendChild(figureElement);
    }
}*/
