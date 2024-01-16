//Container global de la modal "AJOUT PHOTOS"
const modalContentAdd = document.createElement('div');
modalContentAdd.classList.add('modal-add-wrapper');
modalContentAdd.id = 'modal-content';

//Titre de la modale
const modalTitleSection = createTitleSection();
modalContentAdd.appendChild(modalTitleSection);

//Création de chaque section du formulaire
const addImageSection = createAddImageSection();
const titleInputSection = createTitleInputSection();
const categoryInputSection = createCategoryInputSection();
const submitButton = createSubmitButton()

//Intégration des éléments dans le formulaire
const addWorkForm = document.createElement('form');

addWorkForm.appendChild(addImageSection)
addWorkForm.appendChild(titleInputSection)
addWorkForm.appendChild(categoryInputSection)
addWorkForm.appendChild(submitButton);

//Formulaire ajouté, display none
addWorkForm.style.display = 'none';
modal.appendChild(addWorkForm);

//Affichage de la partie formulaire au clic sur "Ajout Photo", galerie cachée + inversement
const addWorkButton = document.getElementById('add-work-btn');

addWorkButton.addEventListener('click', e => {
    const modalGallery = document.getElementById('modal-gallery');
    modalGallery.style.display = 'none';
    addWorkForm.style.display = 'block';
});

//Création du titre de la modale
function createTitleSection(){

    const modalAddTitle = document.createElement('h3');
    modalAddTitle.innerText='Ajout photo';
    
    arrowIcon = document.createElement('i');
    arrowIcon.classList.add('fa-solid', 'fa-arrow-left');
    
    xIcon = document.createElement('i');
    xIcon.classList.add('fa-solid', 'fa-x');
    xIcon.id = 'js-close-modal-icon';

    modalAddTitle.appendChild(arrowIcon);
    modalAddTitle.appendChild(xIcon);

    return modalAddTitle;
}

//Partie image
function createAddImageSection(){
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


    const inputContainerFlex = document.createElement('div');
    inputContainerFlex.classList.add('input-container-flex');

    inputContainerFlex.appendChild(imageIcon);
    inputContainerFlex.appendChild(fileInput);
    inputContainerFlex.appendChild(labelInsertImage);
    inputContainerFlex.appendChild(pImageFormat);

    return inputContainerFlex;
}

function createTitleInputSection(){
    const titleContainer = document.createElement('div');

    const formTitleImage = document.createElement('input');
    formTitleImage.type = 'text';
    formTitleImage.id = 'title-input';

    const labelTitleImage = document.createElement('label');
    labelTitleImage.htmlFor = 'title-input';
    labelTitleImage.textContent = 'Titre';
    labelTitleImage.classList.add('form-label');

    titleContainer.appendChild(labelTitleImage);
    titleContainer.appendChild(formTitleImage);

    return titleContainer;
}

function createCategoryInputSection(){
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

    selectCategory.appendChild(optionCategory);
    selectCategory.appendChild(optionObjectCategory);
    selectCategory.appendChild(optionAppCategory);
    selectCategory.appendChild(optionHrCategory);

    return selectCategory;
}

//Parties titre et catégorie
function createSubmitButton(){
    const submitButton = document.createElement('button');
    submitButton.type = 'submit'
    submitButton.classList.add('modal-btn-valid');
    submitButton.innerText = 'Valider';

    return submitButton;
}