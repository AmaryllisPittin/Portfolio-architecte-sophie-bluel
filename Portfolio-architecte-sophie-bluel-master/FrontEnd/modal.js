/****************************TENTATIVE DE RESTRUCTURATION**************************************************************************/
/*OUVERTURE de la modale*/

let overlay = document.getElementById('modal');
let modal = document.getElementById('modal-content');

let modalOpened = false;

modal.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    return;
});

const openModal = function (e) {
    e.preventDefault();

    if(overlay !== null) {
        overlay.style.display = 'flex';
        overlay.removeAttribute('aria-hidden');
        overlay.setAttribute('aria-modal', 'true');

        overlay.addEventListener('click', closeModal);
        document.getElementById('js-close-modal-icon').addEventListener('click', closeModal);
        modalOpened = true;
    } else {
        console.log('la cible n\'a pas été trouvée / ou est null');
    }
};




/*FERMETURE de la modale*/

const closeModal = function (e) {
    e.preventDefault();
    if(overlay === null) return;
    if(overlay !== null) {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.removeAttribute('aria-modal');
        overlay.removeEventListener('click', closeModal);
        document.getElementById('js-close-modal-icon').removeEventListener('click', closeModal);
        overlay = null;

        modalOpened = false;
    } else {
        console.log('la cible n\'a pas été trouvée / ou est null');
    }
};

const stopPropagation = function (e) {
    e.stopPropagation();
}

document.querySelectorAll('.portfolio-modified').forEach(a => {
    a.addEventListener('click', openModal);
});




/*FETCH pour la galerie de la PREMIERE MODALE + icone poubelle*/

let allProjects = [];
let cloneAllProjects = [];

fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(imagesTabs => {
    allProjects = imagesTabs;
    cloneAllProjects = imagesTabs;
    
    const elementContainer = document.querySelector('.modal-body');
    imagesTabs.forEach(item => {
        const imgElement = document.createElement('img');
        const figureElement = document.createElement('figure');

        imgElement.src = item.imageUrl;

        figureElement.appendChild(imgElement);
        elementContainer.appendChild(figureElement);

        const spanBinElement = document.createElement('span');
        spanBinElement.classList.add('modal-span-bin');
        binIcon = document.createElement('i');
        binIcon.classList.add('fa-solid', 'fa-trash-can');

        spanBinElement.appendChild(binIcon);
        figureElement.appendChild(spanBinElement);
    });
});





/*CREATION de la partie "AJOUT PHOTOS"*/

let modalContent = document.querySelector('.modal-wrapper');
const addImagesButton = document.querySelector('.modal-btn-add');
const modalContainer = document.getElementById('modal')
let modalContentAdd = document.createElement('div');

modalContentAdd.classList.add('modal-add-wrapper');
modalContentAdd.id = 'modal-content';




/*MODALE 2: header du modalContentAdd**/
const modalAddTitle = document.createElement('h3');
modalAddTitle.innerText='Ajout photo';

arrowIcon = document.createElement('i');
arrowIcon.classList.add('fa-solid', 'fa-arrow-left');

xIcon = document.createElement('i');
xIcon.classList.add('fa-solid', 'fa-x');
xIcon.id = 'js-close-modal-icon';

modalContentAdd.appendChild(modalAddTitle);
modalContentAdd.appendChild(arrowIcon);
modalContentAdd.appendChild(xIcon);





/*AJOUT PHOTOS: body du modalContentAdd*/

const modalContentAddBody = document.createElement('div');
modalContentAddBody.classList.add('modal-add-body');

const modalAddInputContainer = document.createElement('div');
modalAddInputContainer.classList.add('input-container');

modalContentAddBody.appendChild(modalAddInputContainer);
modalContentAdd.appendChild(modalContentAddBody);




/*AJOUT PHOTOS: Contenu du modalAddInputContainer pour importer le fichier image*/

const inputContainerFlex = document.createElement('div');
inputContainerFlex.classList.add('input-container-flex');
modalAddInputContainer.appendChild(inputContainerFlex);

const imageIcon = document.createElement('i');
imageIcon.classList.add('fa-regular', 'fa-image');

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept =  'image/jpeg, image/png';
fileInput.id = 'file-input';

fileInput.style.display = 'none';

const labelInsertImage = document.createElement('label');
labelInsertImage.htmlFor = 'file-input';
labelInsertImage.textContent = '+ Ajouter photo';
labelInsertImage.classList.add('insert-image-label');

const pImageFormat = document.createElement('p');
pImageFormat.innerText = 'jpg, png: 4mo max';

inputContainerFlex.appendChild(imageIcon);
inputContainerFlex.appendChild(fileInput);
inputContainerFlex.appendChild(labelInsertImage);
inputContainerFlex.appendChild(pImageFormat);




/*AJOUT PHOTOS: Le formulaire*/

const formContainer = document.createElement('div');
formContainer.classList.add('form-container');
const addImageForm = document.createElement('form');

const formTitleImage = document.createElement('input');
formTitleImage.type = 'text';
formTitleImage.id = 'title-input';
const labelTitleImage = document.createElement('label');
labelTitleImage.htmlFor = 'title-input';
labelTitleImage.textContent = 'Titre';
labelTitleImage.classList.add('form-label');

const labelCategoryImage = document.createElement('label');
labelCategoryImage.htmlFor = 'category-select';
labelCategoryImage.textContent = 'Catégorie';
labelCategoryImage.classList.add('form-label');

const selectCategory = document.createElement('select');
selectCategory.name = 'categories';
selectCategory.id = 'category-select';

const optionCategory = document.createElement('option');
optionCategory.value = '';
const optionObjectCategory = document.createElement('option');
optionObjectCategory.value = 'Objets';
optionObjectCategory.innerText = 'Objets';
const optionAppCategory = document.createElement('option');
optionAppCategory.value = 'Appartements';
optionAppCategory.innerText = 'Appartements';
const optionHrCategory = document.createElement('option');
optionHrCategory.value = 'Hôtels & Restaurants';
optionHrCategory.innerText = 'Hôtels & Restaurants';

addImageForm.appendChild(labelTitleImage);
addImageForm.appendChild(formTitleImage);
addImageForm.appendChild(labelCategoryImage);

selectCategory.appendChild(optionCategory);
selectCategory.appendChild(optionObjectCategory);
selectCategory.appendChild(optionAppCategory);
selectCategory.appendChild(optionHrCategory);
addImageForm.appendChild(selectCategory);

formContainer.appendChild(addImageForm);
modalContentAddBody.appendChild(formContainer);


/*MODALE 2: création du bouton "Valider"*/

const validButton = document.createElement('button');
validButton.type = 'submit'
validButton.classList.add('modal-btn-valid');
validButton.innerText = 'Valider';

addImageForm.appendChild(validButton);




function refreshGallery() {
    const elementContainer = document.querySelector('.gallery');

    elementContainer.innerHTML = '';

    allProjects.forEach(item => {
        const imgElement = document.createElement('img');
        const figureElement = document.createElement('figure');

        imgElement.src = item.imageUrl;

        figureElement.appendChild(imgElement);
        elementContainer.appendChild(figureElement);
    });

    const newProject = allProjects[allProjects.length - 1];
    const imgElement = document.createElement('img');
    const figureElement = document.createElement('figure');

    imgElement.src = newProject.imageUrl;

    figureElement.appendChild(imgElement);
    elementContainer.appendChild(figureElement);
}





/*A DEPLACER: ENVOI de l'image / titre / catégorie*/

fileInput.addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        const selectedFile = event.target.files[0];

        if(selectedFile.type.startsWith('image/jpeg') || selectedFile.type.startsWith('image/png')) {
            const imageElement = document.createElement('img');
            imageElement.src = URL.createObjectURL(selectedFile);
            imageElement.classList.add('post-image');

            modalAddInputContainer.innerHTML = '';
            modalAddInputContainer.appendChild(imageElement);

            const postedImageURL = URL.createObjectURL(selectedFile);

            allProjects.push({
                imageUrl: postedImageURL,
                title: formTitleImage.value,
                category: selectCategory.value
            });
    
            refreshGallery();
        } else {
            alert('Veuillez sélectionner une image au format requis');
        }
    }
});




/*ACCES + FERMETURE de la MODALE 2*/

modalContentAdd.addEventListener('click', function(e) {
    stopPropagation(e);
});

modalContentAdd.querySelector('#js-close-modal-icon').addEventListener('click', closeModal);

addImagesButton.addEventListener('click', () => {
    modalContent.style.display = 'none';
    modalContainer.appendChild(modalContentAdd);
    modalContentAdd.style.display = 'block';
})

arrowIcon.addEventListener('click', () => {
    modalContentAdd.style.display = 'none';
    modalContainer.appendChild(modalContent);
    modalContent.style.display = 'block';
})





/*MODALE 2: PRESENTATION de l'IMAGE dans la modale avant de valider*/

fileInput.addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        const selectedFile = event.target.files[0];

        if(selectedFile.type.startsWith('image/jpeg') || selectedFile.type.startsWith('image/png')) {
            const imageElement = document.createElement('img');
            imageElement.src = URL.createObjectURL(selectedFile);
            imageElement.classList.add('selected-image')

            modalAddInputContainer.innerHTML = '';
            modalAddInputContainer.appendChild(imageElement);

            imageElement.style.width = '30%';
            imageElement.style.height = '100%';

            const postedImageURL = URL.createObjectURL(selectedFile);

            allProjects.push ({
                imageUrl: postedImageURL,
                title: formTitleImage.value,
                category: selectCategory.value
            });

            /*function refreshGallery() {
                const elementContainer = document.querySelector('.modal-body');

                allProjects.forEach(item => {
                    const imgElement = document.createElement('img');
                    const figureElement = document.createElement('figure');

                    imgElement.src = item.imageUrl;
                })
            }*/

        }
    }
});

/*document.addEventListener('DOMContentLoaded', addSubmitListener);*/


/*****ESSAI AJOUT IMAGES 24 janvier 8h27*****/
fileInput.type = 'file';
fileInput.accept = 'image/jpeg, image/png';
fileInput.id = 'file-input';

fileInput.addEventListener('change', function(event) {
    updateSelectedFile(event);
});

function updateSelectedFile(event) {
    let selectedFile = event.target.files[0];
    console.log("Fichier sélectionné :", selectedFile.name);
}

modalContentAddBody.appendChild(fileInput);

modalContentAddBody.addEventListener('submit', function(event) {
    event.preventDefault();
    addProject();
    closeModal(event);
});

function addProject() {
    let inputTitle = document.getElementById('title-input');
    let inputCategory = document.getElementById('category-select');
    let inputPhoto = document.getElementById('file-input');

    let imageFile = inputPhoto.files[0];
    let title = inputTitle.value;
    let category = inputCategory.value;


    if (imageFile && title && category) {

        let formData = new FormData();
        formData.append('image', imageFile);
        formData.append('title', title);
        formData.append('category', category);

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + 'token',
            },
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Réponse de la requête POST :", data);
            sessionStorage.setItem('added', JSON.stringify(true));
            sessionStorage.setItem('Token', data.token);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

        // Réinitialiser le formulaire
        modalContentAddBody.querySelector('form').reset();

        console.log("Projet ajouté :", formData);
        console.log("Nouveau tableau de projets :", allProjects);

    } else {
        alert("Veuillez remplir tous les champs du formulaire.");
    }
}

/******/




/*Fonction pour ENVOYER le titre, la catégorie et l'image: au SUBMIT du bouton + AJOUTER dans la galerie*/
/*function addSubmitListener() {
    console.log('la fonction addSubmitListener a été déclenchée');

    const submitButton = document.querySelector('[type="submit"]');
    const inputTitle = document.getElementById('title-input');
    const inputCategory = document.getElementById('category-select');
    const inputPhoto = document.querySelector('.selected-image');

    submitButton.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('L\'évènement submit a été déclenché haha')

        const formData = new FormData();
        formData.append('title', inputTitle.value);
        formData.append('category', inputCategory.value);
        formData.append('imageUrl', inputPhoto.files[0]);

        console.log('Données à envoyer hoho:', formData);

        const token = sessionStorage.getItem('token');

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
            'Authorization': `Bearer ${token}`
            }
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
};*/





/*A DEPLACER/SUPPRIMER: Fonctions pour valider l'ajout d'images*/

let errorMessage;

validButton.addEventListener('click', function (e) {
    if (formTitleImage.value.length < 1 || selectCategory.value === '') {
        const errorMessageContainer = document.querySelector('.form-container');
        errorMessage = document.createElement('p');
        errorMessage.innerText = 'Erreur: veuillez remplir les deux champs pour valider'
        errorMessage.style.display = 'block';

        errorMessageContainer.appendChild(errorMessage);
        stopPropagation(e);
    }
});

formTitleImage.addEventListener('input', function () {
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
});

selectCategory.addEventListener('change', updateValidationFormColor);

function updateValidationFormColor() {
    if (formTitleImage.value.length >= 1 && selectCategory.value !== '') {
        validButton.style.backgroundColor = '#1D6154';
    } else {
        validButton.style.backgroundColor = '';
    }
}





/*************FIN DE LA TENTATIVE***************************************************************************************************/

/*Fonction pour ENVOYER le titre, la catégorie et l'image: au SUBMIT du bouton + AJOUTER dans la galerie*/
/*function addSubmitListener() {
    console.log('la fonction addSubmitListener a été déclenchée hihi');

    const submitButton = document.querySelector('.modal-btn-valid');
    const inputTitle = document.getElementById('title-input');
    const inputCategory = document.getElementById('category-select');
    const inputPhoto = document.querySelector('.selected-image');

    submitButton.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('L\'évènement submit a été déclenché haha')

        const formData = new FormData();
        formData.append('title', inputTitle.value);
        formData.append('category', inputCategory.value);
        formData.append('imageUrl', inputPhoto.files[0]);

        console.log('Données à envoyer hoho:', formData);

        const token = sessionStorage.getItem('token');

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            'Authorization': `Bearer ${token}`
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
};



/*OUVERTURE de la modale*/

/*const overlay = document.getElementById('modal');
const modal = document.getElementById('modal-content');

let modalOpened = false;

modal.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    return;
});

const openModal = function (e) {
    e.preventDefault();

    if(overlay !== null) {
        overlay.style.display = 'flex';
        overlay.removeAttribute('aria-hidden');
        overlay.setAttribute('aria-modal', 'true');

        overlay.addEventListener('click', closeModal);
        document.getElementById('js-close-modal-icon').addEventListener('click', closeModal);
        modalOpened = true;
    } else {
        console.log('la cible n\'a pas été trouvée / ou est null');
    }
};




/*FERMETURE de la modale*/

/*const closeModal = function (e) {
    e.preventDefault();
    if(overlay === null) return;
    if(overlay !== null) {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.removeAttribute('aria-modal');
        overlay.removeEventListener('click', closeModal);
        document.getElementById('js-close-modal-icon').removeEventListener('click', closeModal);
        overlay = null;

        modalOpened = false;
    } else {
        console.log('la cible n\'a pas été trouvée / ou est null');
    }
};

const stopPropagation = function (e) {
    e.stopPropagation();
}

document.querySelectorAll('.portfolio-modified').forEach(a => {
    a.addEventListener('click', openModal);
});




/*FETCH pour la galerie de la PREMIERE MODALE + icone poubelle*/

/*let allProjects = [];
let cloneAllProjects = [];

fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(imagesTabs => {
    allProjects = imagesTabs;
    cloneAllProjects = imagesTabs;
    
    const elementContainer = document.querySelector('.modal-body');
    imagesTabs.forEach(item => {
        const imgElement = document.createElement('img');
        const figureElement = document.createElement('figure');

        imgElement.src = item.imageUrl;

        figureElement.appendChild(imgElement);
        elementContainer.appendChild(figureElement);

        const spanBinElement = document.createElement('span');
        spanBinElement.classList.add('modal-span-bin');
        binIcon = document.createElement('i');
        binIcon.classList.add('fa-solid', 'fa-trash-can');

        spanBinElement.appendChild(binIcon);
        figureElement.appendChild(spanBinElement);
    });
});





/*CREATION de la partie "AJOUT PHOTOS"*/

/*let modalContent = document.querySelector('.modal-wrapper');
const addImagesButton = document.querySelector('.modal-btn-add');
const modalContainer = document.getElementById('modal')
let modalContentAdd = document.createElement('div');

modalContentAdd.classList.add('modal-add-wrapper');
modalContentAdd.id = 'modal-content';





/*AJOUT PHOTOS: header du modalContentAdd**/
/*const modalAddTitle = document.createElement('h3');
modalAddTitle.innerText='Ajout photo';

arrowIcon = document.createElement('i');
arrowIcon.classList.add('fa-solid', 'fa-arrow-left');

xIcon = document.createElement('i');
xIcon.classList.add('fa-solid', 'fa-x');
xIcon.id = 'js-close-modal-icon';

modalContentAdd.appendChild(modalAddTitle);
modalContentAdd.appendChild(arrowIcon);
modalContentAdd.appendChild(xIcon);





/*AJOUT PHOTOS: body du modalContentAdd*/

/*const modalContentAddBody = document.createElement('div');
modalContentAddBody.classList.add('modal-add-body');

const modalAddInputContainer = document.createElement('div');
modalAddInputContainer.classList.add('input-container');






/*AJOUT PHOTOS: Contenu du modalAddInputContainer pour importer le fichier image*/

/*const inputContainerFlex = document.createElement('div');
inputContainerFlex.classList.add('input-container-flex');

const imageIcon = document.createElement('i');
imageIcon.classList.add('fa-regular', 'fa-image');

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept =  'image/jpeg, image/png';
fileInput.id = 'file-input';

fileInput.style.display = 'none';

const labelInsertImage = document.createElement('label');
labelInsertImage.htmlFor = 'file-input';
labelInsertImage.textContent = '+ Ajouter photo';
labelInsertImage.classList.add('insert-image-label');

const pImageFormat = document.createElement('p');
pImageFormat.innerText = 'jpg, png: 4mo max';





/*AJOUT PHOTOS: Le formulaire*/

/*const formContainer = document.createElement('div');
formContainer.classList.add('form-container');
const addImageForm = document.createElement('form');

const formTitleImage = document.createElement('input');
formTitleImage.type = 'text';
formTitleImage.id = 'title-input';
const labelTitleImage = document.createElement('label');
labelTitleImage.htmlFor = 'title-input';
labelTitleImage.textContent = 'Titre';
labelTitleImage.classList.add('form-label');

const labelCategoryImage = document.createElement('label');
labelCategoryImage.htmlFor = 'category-select';
labelCategoryImage.textContent = 'Catégorie';
labelCategoryImage.classList.add('form-label');

const selectCategory = document.createElement('select');
selectCategory.name = 'categories';
selectCategory.id = 'category-select';

const optionCategory = document.createElement('option');
optionCategory.value = '';
const optionObjectCategory = document.createElement('option');
optionObjectCategory.value = 'Objets';
optionObjectCategory.innerText = 'Objets';
const optionAppCategory = document.createElement('option');
optionAppCategory.value = 'Appartements';
optionAppCategory.innerText = 'Appartements';
const optionHrCategory = document.createElement('option');
optionHrCategory.value = 'Hôtels & Restaurants';
optionHrCategory.innerText = 'Hôtels & Restaurants';





/*MODALE 2: création du bouton "Valider"*/

/*const validButton = document.createElement('button');
validButton.type = 'submit'
validButton.classList.add('modal-btn-valid');
validButton.innerText = 'Valider';




/*A DEPLACER: ENVOI de l'image / titre / catégorie*/

/*fileInput.addEventListener('change', function(event) {     // réagit aux changements, récupération de l'image//

    if (event.target.files.length > 0) {
        const selectedFile = event.target.files[0];

        if(selectedFile.type.startsWith('image/jpeg') || selectedFile.type.startsWith('image/png')) {
            const imageElement = document.createElement('img');
            imageElement.src = URL.createObjectURL(selectedFile);
            imageElement.classList.add('post-image');

            modalAddInputContainer.innerHTML = '';
            modalAddInputContainer.appendChild(imageElement);

            const postedImageURL = URL.createObjectURL(selectedFile);

            allProjects.push(postedImageURL);
        } else {
            alert('Veuillez sélectionner une image au format requis');
        };
    };
})




/*MODALE 2: intégration des éléments*/

/*inputContainerFlex.appendChild(imageIcon);
inputContainerFlex.appendChild(fileInput);
inputContainerFlex.appendChild(labelInsertImage);
inputContainerFlex.appendChild(pImageFormat);

addImageForm.appendChild(labelTitleImage);
addImageForm.appendChild(formTitleImage);
addImageForm.appendChild(labelCategoryImage);

selectCategory.appendChild(optionCategory);
selectCategory.appendChild(optionObjectCategory);
selectCategory.appendChild(optionAppCategory);
selectCategory.appendChild(optionHrCategory);
addImageForm.appendChild(selectCategory);
addImageForm.appendChild(validButton);

modalContentAddBody.appendChild(modalAddInputContainer);

modalContentAdd.appendChild(modalContentAddBody);
modalAddInputContainer.appendChild(inputContainerFlex);

formContainer.appendChild(addImageForm);
modalContentAddBody.appendChild(formContainer);




/*ACCES + FERMETURE de la MODALE 2*/

/*modalContentAdd.addEventListener('click', function(e) {
    stopPropagation(e);
});

modalContentAdd.querySelector('#js-close-modal-icon').addEventListener('click', closeModal);

addImagesButton.addEventListener('click', () => {
    modalContent.style.display = 'none';
    modalContainer.appendChild(modalContentAdd);
    modalContentAdd.style.display = 'block';
})

arrowIcon.addEventListener('click', () => {
    modalContentAdd.style.display = 'none';
    modalContainer.appendChild(modalContent);
    modalContent.style.display = 'block';
})





/*A DEPLACER/SUPPRIMER: Fonctions pour valider l'ajout d'images*/
/*let errorMessage;

validButton.addEventListener('click', function (e) {

    if (formTitleImage.value.length < 1 || selectCategory.value === '') {
        const errorMessageContainer = document.querySelector('.form-container');
        errorMessage = document.createElement('p');
        errorMessage.innerText = 'Erreur: veuillez remplir les deux champs pour valider'
        errorMessage.style.display = 'block';

        errorMessageContainer.appendChild(errorMessage);
        stopPropagation(e);

    }
});

formTitleImage.addEventListener('input', function () {
    errorMessage.style.display = 'none'
});

selectCategory.addEventListener('change', updateValidationFormColor)

function updateValidationFormColor() {
    if (formTitleImage.value.length >= 1 && selectCategory.value !== '') {
        validButton.style.backgroundColor = '#1D6154';
    } else {
        validButton.style.backgroundColor = '';
    }
}





/*MODALE 2: PRESENTATION de l'IMAGE dans la modale avant de valider*/

/*fileInput.addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        const selectedFile = event.target.files[0];

        if(selectedFile.type.startsWith('image/jpeg') || selectedFile.type.startsWith('image/png')) {
            const imageElement = document.createElement('img');
            imageElement.src = URL.createObjectURL(selectedFile);
            imageElement.classList.add('selected-image')

            modalAddInputContainer.innerHTML = '';
            modalAddInputContainer.appendChild(imageElement);

            imageElement.style.width = '30%';
            imageElement.style.height = '100%';

            const postedImageURL = URL.createObjectURL(selectedFile);

            allProjects.push ({
                imageUrl: postedImageURL,
                title: formTitleImage.value,
                category: inputCategory.value
            });

            function refreshGallery() {
                const elementContainer = document.querySelector('.modal-body');

                allProjects.forEach(item => {
                    const imgElement = document.createElement('img');
                    const figureElement = document.createElement('figure');

                    imgElement.src = item.imageUrl;
                })
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', addSubmitListener);





/*TENTATIVE DE CORRECTION début et fin*/

/*document.addEventListener('DOMContentLoaded', function() {

    const inputTitle = document.getElementById('title-input');
    const submitButton = document.querySelector('.modal-btn-valid');
    submitButton.type = 'submit';

function addSubmitListener() {
    console.log('la fonction addSubmitListener a été déclenchée');

    const inputCategory = document.getElementById('category-select');
    const inputPhoto = document.querySelector('.selected-image');

    submitButton.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('L\'évènement submit a été déclenché')

        const formData = new FormData();
        formData.append('title', inputTitle.value);
        formData.append('category', inputCategory.value);
        formData.append('imageUrl', inputPhoto.files[0]);

        console.log('Données à envoyer hoho:', formData);

        const token = sessionStorage.getItem('token');

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
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
};

fileInput.addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        const selectedFile = event.target.files[0];

        if(selectedFile.type.startsWith('image/jpeg') || selectedFile.type.startsWith('image/png')) {
            const imageElement = document.createElement('img');
            imageElement.src = URL.createObjectURL(selectedFile);
            imageElement.classList.add('selected-image')

            modalAddInputContainer.innerHTML = '';
            modalAddInputContainer.appendChild(imageElement);

            imageElement.style.width = '30%';
            imageElement.style.height = '100%';

            const postedImageURL = URL.createObjectURL(selectedFile);

            const newProject = {
                imageUrl: postedImageURL,
                title: inputTitle.value,
                category: inputCategory.value,
            };

            allProjects.push(newProject);
            }
        }
    });
    addSubmitListener();
})*/
