import { allProjects } from './APIrequest.js';
import { cloneAllProjects } from './APIrequest.js';
import { onFilterClick } from './APIrequest.js';

/*OUVERTURE de la modale*/

let overlay = document.getElementById('modal');
let modal = document.getElementById('modal-content');

let binIcon;
let arrowIcon;
let xIcon;
let modalContentAddBody;

const loggedIn = !!localStorage.getItem('token');

if (loggedIn) {

const token = localStorage.getItem("token");
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
    } else {
        console.log('la cible n\'a pas été trouvée / ou est null');
    }
};




/*FERMETURE de la modale*/

const closeModal = function () {
    if(overlay === null) return;
    if(overlay !== null) {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.removeAttribute('aria-modal');
    } else {
        console.log('la cible n\'a pas été trouvée / ou est null');
    }
};

const stopPropagation = function (e) {
    e.stopPropagation();
}

document.getElementById('portfolio-modified').addEventListener('click', openModal);



/*FETCH pour la galerie de la PREMIERE MODALE + icone poubelle*/

fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(imagesTabs => {
    const elementContainer = document.querySelector('.modal-body');
    imagesTabs.forEach(item => {
        const imgElement = document.createElement('img');
        const figureElement = document.createElement('figure');
        figureElement.setAttribute('data-id', item.id);

        imgElement.src = item.imageUrl;

        figureElement.appendChild(imgElement);
        elementContainer.appendChild(figureElement);

        const spanBinElement = document.createElement('span');
        spanBinElement.classList.add('modal-span-bin');
        binIcon = document.createElement('i');
        binIcon.classList.add('fa-solid', 'fa-trash-can');

        binIcon.addEventListener('click', () => {
            validationDeleteProject(item.id);
        });

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
optionObjectCategory.value = '1';
optionObjectCategory.innerText = 'Objets';
const optionAppCategory = document.createElement('option');
optionAppCategory.value = '2';
optionAppCategory.innerText = 'Appartements';
const optionHrCategory = document.createElement('option');
optionHrCategory.value = '3';
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


modalContentAdd.addEventListener('click', function(e) {
    stopPropagation(e);
});

modalContentAdd.querySelector('#js-close-modal-icon').addEventListener('click', closeModal);
/** */

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
        }
    }
});


/****TENTATIVE POST******/

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

async function addProject(event, token) {
    event.preventDefault();
    let inputTitle = document.getElementById("title-input");
    let inputCategory = document.getElementById("category-select");
    let inputPhoto = document.getElementById("file-input");  
    const title = inputTitle.value;
    const category = inputCategory.value;
    const image = inputPhoto.files[0];
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (response.ok) {
            const newProject = await response.json();

            const elementContainer = document.querySelector('.modal-body');
            const gallery = document.querySelector('.gallery');

            const figureElement = document.createElement('figure');
            console.log('newProject', newProject);

            const id = newProject.id;
            figureElement.setAttribute('data-id', id);

            const imgElement = document.createElement('img');
            imgElement.src = newProject.imageUrl;

            const titleElement = document.createElement('figcaption');
            titleElement.innerText = inputTitle.value;

            figureElement.appendChild(imgElement);
            figureElement.appendChild(titleElement);
            
            figureElement.classList.add('project-figure');

            elementContainer.appendChild(figureElement);
            /*elementContainer.appendChild(figureElement.cloneNode(true));*/
            gallery.appendChild(figureElement);
            
            allProjects.push(newProject);
            /*cloneAllProjects.push(newProject);*/
            
            console.log("Projet ajouté avec succès.");
        } else {
            console.error("Erreur lors de la requête POST pour ajouter un projet");
            throw new Error("Échec de la requête POST");
        }
    } catch (error) {
        console.error("Fetch error:", error);
        throw new Error("Erreur lors de l'ajout du projet");
    }
}

modalContentAddBody.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        await addProject(event, token);
        closeModal(event);

    } catch (error) {
        console.error(error);
        alert("Une erreur s'est produite lors de l'ajout du projet.");
    }

});

/*Comportement de la modale d'ajout*/

let errorMessage;

validButton.addEventListener('click', function () {
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

/****SUPRESSION DE PROJET****/

async function deleteProject(id, token) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                accept: '',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            window.alert('Le projet a été supprimé');
        }
    } catch (error) {
        console.error('erreur lors de la suppression du projet:', error);
    }
}
/** */
async function validationDeleteProject(id) {
    const confirmation = confirm(
        'Etes-vous sûr de supprimer ce projet ?'
    );
    if (confirmation) {
        await deleteProject(id, token);
        const projectDeleted = document.querySelectorAll(`[data-id="${id}"]`);
        if (projectDeleted && projectDeleted.length) {
            projectDeleted.forEach(element => element.remove())
        }
        console.log(projectDeleted);
        closeModal();
    }
}
}
