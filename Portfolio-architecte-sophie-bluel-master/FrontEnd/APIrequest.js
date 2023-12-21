function onObjectsChange() {
    let categories = [];

    const objFilteredElement = categories.filter(categories => categories.name === "Objets");
    const appartFilteredElement = categories.filter(categories => categories.name === "Appartements");
    const hrFilteredElement = categories.filter(categories => categories.name === "Hôtels & Restaurants");

    const objButton = document.getElementById('objButton');
    const appButton = document.getElementById('appButton');
    const hrButton = document.getElementById('hrButton');
}

fetch("http://localhost:5678/api/works")
.then(response => {
    return response.json();
})
.then(imagesTabs => {
    console.log(imagesTabs)

    const elementContainer = document.querySelector('.gallery');
    imagesTabs.forEach(item => {

        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const titleElement = document.createElement('figcaption');

        imgElement.src = item.imageUrl;
        titleElement.innerText = item.title;

        figureElement.appendChild(imgElement);
        figureElement.appendChild(titleElement);
        elementContainer.appendChild(figureElement);
    });


});

fetch("http://localhost:5678/api/categories")
.then(response => {
    return response.json()
})
.then(categories => {
    console.log(categories);
});













/*const elementContainer = document.querySelector('.gallery')
fetch("http://localhost:5678/api/works")
.then(response => {
    return response.json()
})
.then(imagesTabs => {
    console.log(imagesTabs)
    console.log(imagesTabs.name)
        for(let i = 0; i < imagesTabs.length; i++) {
            const figureElement = document.createElement('figure')
            const imgElement = document.createElement('img')
            const titleElement = document.createElement('figcaption')

            imgElement.src = imagesTabs[i].imageUrl
            titleElement.innerText = imagesTabs[i].title

            elementContainer.appendChild(figureElement)
            figureElement.appendChild(imgElement)
            figureElement.appendChild(titleElement)
        }
        imagesTabs.forEach(item => {
            const category = item.category;
            console.log(category);

            if(item.name !== 'Objets') {
                item.style.display = 'none';
                };
        });
    })*/

/***Filter Function***/
/*fetch("http://localhost:5678/api/categories")
.then(response => {
    return response.json()
})

onObjectsChange();


    const objButton = document.getElementById('objButton');
    const elementsToHide = document.querySelectorAll('[name]:not([name="Objets"])');


    objButton.addEventListener('click', onObjectsChange);*/