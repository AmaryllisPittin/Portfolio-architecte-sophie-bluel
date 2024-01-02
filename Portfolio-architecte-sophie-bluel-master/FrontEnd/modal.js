let modal = null;
const selector = document.getElementById('modal');
const target = selector;
let modalOpened = false;

const openModal = function (e) {
    e.preventDefault();

    if(target !== null) {
        target.style.display = 'flex';
        target.removeAttribute('aria-hidden');
        target.setAttribute('aria-modal', 'true');
        modal = target;
        modal.addEventListener('click', closeModal);
        document.getElementById('js-close-modal-icon').addEventListener('click', closeModal);
        modalOpened = true;
    } else {
        console.log('la cible n\'a pas été trouvée / ou est null');
    }
};

const closeModal = function (e) {
    e.preventDefault();
    if(modal === null) return;
    if(target !== null) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.removeEventListener('click', closeModal);
        document.getElementById('js-close-modal-icon').removeEventListener('click', closeModal);
        modal = null;

        modalOpened = false;
    } else {
        console.log('la cible n\'a pas été trouvée / ou est null');
    }
}

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

        imgElement.src = item.imageUrl;

        elementContainer.appendChild(imgElement);
    });
});












/***Config de base pour la modale***/

/*let modal = null;
const selector = document.getElementById('modal');
const target = selector;

const openModal = function (e) {
    e.preventDefault();

    if(target !== null) {
        target.style.display = 'flex';
        target.removeAttribute('aria-hidden');
        target.setAttribute('aria-modal', 'true');
        modal = target;
        modal.addEventListener('click', closeModal);
        document.getElementById('js-close-modal-icon').addEventListener('click', closeModal);
    } else {
        console.log('la cible n\'a pas été trouvée / ou est null');
    }
};

/*******/

/*const closeModal = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.overlay');

closeModal.addEventListener('click', () => {
    selector.style.display = 'none';
});

modalOverlay.addEventListener('click', () => {
    selector.style.display = 'none';
    resetImage();
    title.value ='';
    category.value ='';
});


/***Fermer la modale***/

/*const closeModal = function (e) {
    e.preventDefault();
    if(modal === null) return;
    if(target !== null) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.removeEventListener('click', closeModal);
        document.getElementById('js-close-modal-icon').removeEventListener('click', closeModal);
        modal = null;
    } else {
        console.log('la cible n\'a pas été trouvée / ou est null');
    }
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

const closeModalOutSide = function (e) {
    if (modal !== null && !modal.contains(e.target)) {
        closeModal(e);
    }
}

document.querySelectorAll('.portfolio-modified').forEach(a => {
    a.addEventListener('click', function(e) {
        openModal(e);
        modal = document.getElementById('modal1');
        e.stopPropagation();
    });
});

document.addEventListener('click', closeModalOutSide);

/*document.getElementById('modal1').addEventListener('click', stopPropagation);*/

