export let allProjects = [];
export let cloneAllProjects = [];

export function createGallery(imagesTabs) {
    const elementContainer = document.querySelector('.gallery');
    imagesTabs.forEach(item => {
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const titleElement = document.createElement('figcaption');

        imgElement.src = item.imageUrl;
        titleElement.innerText = item.title;

        figureElement.setAttribute('data-id', item.id);

        figureElement.appendChild(imgElement);
        figureElement.appendChild(titleElement);
        elementContainer.appendChild(figureElement);
    });
}

fetch("http://localhost:5678/api/works", {
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(imagesTabs => {
    allProjects = imagesTabs;
    cloneAllProjects = imagesTabs;
    
    createGallery(imagesTabs);
});

    /*** */


    export function onFilterClick(event) {
        const filterButton = event.target;
        const categoryValue = +filterButton.dataset.category;
    
        let filtredProjects;
    
        if (categoryValue === 0) {
            filtredProjects = allProjects;
        } else {
            filtredProjects = allProjects.filter(item => item.categoryId === categoryValue);
        }
    
        const elementContainer = document.querySelector('.gallery');
        elementContainer.innerHTML = '';
    
        filtredProjects.forEach(item => {
            const figureElement = document.createElement('figure');
            const imgElement = document.createElement('img');
            const titleElement = document.createElement('figcaption');
    
            imgElement.src = item.imageUrl;
            titleElement.innerText = item.title;
    
            figureElement.appendChild(imgElement);
            figureElement.appendChild(titleElement);
            elementContainer.appendChild(figureElement);
        });
    }
    
    

const allFilter = document.getElementById('allButton');
const objectFilter = document.getElementById('objButton');
const appartementFilter = document.getElementById('appButton');
const hotelFilter = document.getElementById('hrButton');

allFilter.addEventListener('click', onFilterClick)
objectFilter.addEventListener('click', onFilterClick)
appartementFilter.addEventListener('click', onFilterClick)
hotelFilter.addEventListener('click', onFilterClick)