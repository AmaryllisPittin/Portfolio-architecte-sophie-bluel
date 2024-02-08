let allProjects = [];
let cloneAllProjects = [];

/*fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(imagesTabs => {
    allProjects = imagesTabs;
    cloneAllProjects = imagesTabs;
    
    export function createGallery(imagesTabs) {
        const elementContainer = document.querySelector('.gallery');
        imagesTabs.forEach(item => {
            const figureElement = document.createElement('figure');
            const imgElement = document.createElement('img');
            const titleElement = document.createElement('figcaption');

            imgElement.src = item.imageUrl;
            titleElement.innerText = item.title;

            figureElement.dataset.categoryName = item.category;
            figureElement.setAttribute('data-id', item.id);

            figureElement.appendChild(imgElement);
            figureElement.appendChild(titleElement);
            elementContainer.appendChild(figureElement);
        });
    };
})*/

/***Restructuration du 8 février */
function createGallery(imagesTabs) {
    const elementContainer = document.querySelector('.gallery');
    imagesTabs.forEach(item => {
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const titleElement = document.createElement('figcaption');

        imgElement.src = item.imageUrl;
        titleElement.innerText = item.title;

        figureElement.dataset.categoryName = item.category;
        figureElement.setAttribute('data-id', item.id);

        figureElement.appendChild(imgElement);
        figureElement.appendChild(titleElement);
        elementContainer.appendChild(figureElement);
    });
}

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(imagesTabs => {
        allProjects = imagesTabs;
        cloneAllProjects = imagesTabs;
        
        createGallery(imagesTabs);
    });

    /*** */


function onFilterClick(event){
    const filterButton = event.target;
    const categoryValue = +filterButton.dataset.category;
    const elementContainer = document.querySelector('.gallery');

    elementContainer.innerHTML = '';
    
    let filtredProjects;

    if(categoryValue === 0){
        filtredProjects = allProjects;
    } else {
        filtredProjects = allProjects.filter(item => item.categoryId === categoryValue);
    }

    filtredProjects.forEach(item => {
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const titleElement = document.createElement('figcaption');

        imgElement.src = item.imageUrl;
        titleElement.innerText = item.title;

        figureElement.dataset.categoryName = item.category;
        figureElement.appendChild(imgElement);
        figureElement.appendChild(titleElement);
        elementContainer.appendChild(figureElement);
    });
};

const allFilter = document.getElementById('allButton');
const objectFilter = document.getElementById('objButton');
const appartementFilter = document.getElementById('appButton');
const hotelFilter = document.getElementById('hrButton');

allFilter.addEventListener('click', onFilterClick)
objectFilter.addEventListener('click', onFilterClick)
appartementFilter.addEventListener('click', onFilterClick)
hotelFilter.addEventListener('click', onFilterClick)

/***************************POST Projets***********************************/

/*document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('.modal-btn-valid');
    const inputTitle = document.getElementById('title-input');
    const inputCategory = document.getElementById('category-select');
    const inputPhoto = document.querySelector('.selected-image');

    submitButton.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', inputTitle.value);
        formData.append('category', inputCategory.value);
        formData.append('imageUrl', inputPhoto.files[0]);

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la photo');
            }
            return response.json();
        })
        .then(data => {
            console.log('Projet ajouté avec succès:', data);

            const newProject = {
                title: inputTitle.value,
                category: inputCategory.value,
                imageUrl: inputPhoto.files[0] ? URL.createObjectURL(inputPhoto.files[0]) : ''
            };
            allProjects.push(newProject);
            cloneAllProjects.push(newProject);

            onFilterClick(allProjects);

        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });
});*/