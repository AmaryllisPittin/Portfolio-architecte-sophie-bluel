const overlay = document.getElementById('modal');
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

/***Ajout de la gallerie à la modale***/

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

/***Création de la partie "Ajout photos"***/
let modalContent = document.querySelector('.modal-wrapper');
const addImagesButton = document.querySelector('.modal-btn-add');
const modalContainer = document.getElementById('modal')
let modalContentAdd = document.createElement('div');

modalContentAdd.classList.add('modal-add-wrapper');

/**header du modalContentAdd**/
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

/**body du modalContentAdd**/
const modalContentAddBody = document.createElement('div');
modalContentAddBody.classList.add('modal-add-body');

const modalAddInputContainer = document.createElement('div');
modalAddInputContainer.classList.add('input-container');
/*Ce que contient le modalAddInputContainer*/
const inputContainerFlex = document.createElement('div');
inputContainerFlex.classList.add('input-container-flex');

const imageIcon = document.createElement('i');
imageIcon.classList.add('fa-regular', 'fa-image');

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept =  'image/*';
fileInput.id = 'file-input';

fileInput.style.display = 'none';

const labelInsertImage = document.createElement('label');
labelInsertImage.htmlFor = 'file-input';
labelInsertImage.textContent = '+ Ajouter photo';
labelInsertImage.classList.add('insert-image-label');

const pImageFormat = document.createElement('p');
pImageFormat.innerText = 'jpg, png: 4mo max';
/*Le formulaire*/
const formContainer = document.createElement('div');
formContainer.classList.add('form-container');
const addImageForm = document.createElement('form');

const formTitleImage = document.createElement('input');
fileInput.type = 'text';
fileInput.id = 'title-input';
const labelTitleImage = document.createElement('label');
labelTitleImage.htmlFor = 'title-input';
labelTitleImage.textContent = 'Titre';
labelTitleImage.classList.add('form-label');

const formCategoryImage = document.createElement('input');
fileInput.type = 'text';
fileInput.id = 'category-input';
const labelCategoryImage = document.createElement('label');
labelCategoryImage.htmlFor = 'category-input';
labelCategoryImage.textContent = 'Catégorie';
labelCategoryImage.classList.add('form-label');

fileInput.addEventListener('change', function(event) {     // réagit aux changements, récupération de l'image//
    const file = event.target.files[0];

    /*if (file {
        // Ici il faudra ajouter l'image au projet//
    })*/
})

inputContainerFlex.appendChild(imageIcon);
inputContainerFlex.appendChild(fileInput);
inputContainerFlex.appendChild(labelInsertImage);
inputContainerFlex.appendChild(pImageFormat);

addImageForm.appendChild(labelTitleImage);
addImageForm.appendChild(formTitleImage);
addImageForm.appendChild(labelCategoryImage);
addImageForm.appendChild(formCategoryImage);

modalContentAddBody.appendChild(modalAddInputContainer);

modalContentAdd.appendChild(modalContentAddBody);
modalAddInputContainer.appendChild(inputContainerFlex);

formContainer.appendChild(addImageForm);
modalContentAddBody.appendChild(formContainer);




addImagesButton.addEventListener('click', () => {

    modalContent.style.display = 'none';
    modalContainer.appendChild(modalContentAdd);
    modalContent = modalContentAdd;
    modalContentAdd.style.display = 'block';
})












