let allProjects = [];
let cloneAllProjects = [];

fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(imagesTabs => {
    allProjects = imagesTabs;
    cloneAllProjects = imagesTabs;
    
    const elementContainer = document.querySelector('.gallery');
    imagesTabs.forEach(item => {
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
});

function onFilterClick(event){
    const filterButton = event.target;
    const categoryValue = +filterButton.dataset.category;
    const elementContainer = document.querySelector('.gallery');
    projectsFigures = document.querySelectorAll('figure');

    projectsFigures.forEach(figure => {
        const category = +figure.dataset.categoryName;

            if(categoryValue === 0 || category === categoryValue) {
                figure.style.display = 'block';
            } else {
                figure.style.display = 'none';
            }
    })


    /*if(categoryValue === 0){
        return allProjects;
    }

    const filtredData = allProjects.filter(function(item) {
        if(item.categoryId === categoryValue){
            return true;
        }else {
            return false;
        }
    });

    console.log(filtredData);*/

};



const allFilter = document.getElementById('allButton');
const objectFilter = document.getElementById('objButton');
const appartementFilter = document.getElementById('appButton');
const hotelFilter = document.getElementById('hrButton');

allFilter.addEventListener('click', onFilterClick)
objectFilter.addEventListener('click', onFilterClick)
appartementFilter.addEventListener('click', onFilterClick)
hotelFilter.addEventListener('click', onFilterClick)







/*
fetch("http://localhost:5678/api/categories")
.then(response => response.json())
.then(categoriesData => {
    const categories = categoriesData;

    const objButton = document.getElementById('objButton');

    objButton.addEventListener('click', () => {
        const elementsToFilter = document.querySelectorAll('.gallery figure');

        function filterChange(categories) {
            return allProjects.filter((imagesTabs) => imagesTabs.categoryId === categories.id);
        }

        elementsToFilter.forEach(element => {
            const categoryName = categories.name;
            if (categoryName === "Objets") {
                element.style.display ='block';
            } else {
                element.style.display ='none';
            }
        });
    });

    objButton.addEventListener('dblclick', () => {
        const elementsToShow = document.querySelectorAll('.gallery figure');
    
        elementsToShow.forEach(element => {
            element.style.display = 'block';
        });
    });
});*/