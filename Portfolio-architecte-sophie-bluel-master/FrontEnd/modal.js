let modal = null;
const selector = document.getElementById('modal1');
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