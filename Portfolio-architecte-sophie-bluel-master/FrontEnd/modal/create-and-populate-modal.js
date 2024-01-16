/*CREATION de la partie MODALE 1*/
const overlay = document.getElementById('modal');
const modal = document.getElementById('modal-content');
const addImagesButton = document.querySelector('.modal-btn-add');

let modalOpened = false;

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

modal.addEventListener('click', function(e) {
    e.stopPropagation();
});

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

document.querySelectorAll('.portfolio-modified').forEach(a => {
    a.addEventListener('click', openModal);
});
/**
 * Récupérer les travaux et les ajouter à la modale
 */
fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(imagesTabs => {
    const modalBody = document.querySelector('.modal-body');
    imagesTabs.forEach(item => {
        const imgElement = document.createElement('img');
        const figureElement = document.createElement('figure');

        imgElement.src = item.imageUrl;

        figureElement.appendChild(imgElement);
        modalBody.appendChild(figureElement);

        const spanBinElement = document.createElement('span');
        spanBinElement.classList.add('modal-span-bin');
        binIcon = document.createElement('i');
        binIcon.classList.add('fa-solid', 'fa-trash-can');

        spanBinElement.appendChild(binIcon);
        figureElement.appendChild(spanBinElement);
    });
});