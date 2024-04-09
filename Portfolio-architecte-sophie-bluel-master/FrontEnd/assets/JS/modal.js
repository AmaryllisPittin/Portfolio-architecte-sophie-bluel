token = localStorage.getItem("token");

/******** GESTION OUVERTURE ET FERMETURE DE LA MODALE ********/

const openModal = function (e) {
  e.preventDefault();

  if (overlay !== null) {
    overlay.style.display = "flex";
    overlay.removeAttribute("aria-hidden");
    overlay.setAttribute("aria-modal", "true");

    overlay.addEventListener("click", closeModal);
    document.getElementById("js-close-modal-icon").addEventListener("click", closeModal);
  } else {
    console.log("la cible n'a pas été trouvée / ou est null");
  }
};

document.getElementById("portfolio-modified").addEventListener("click", openModal);

const modal = document.getElementById("modal-content").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    return;
  });

const stopPropagation = function (e) {
  e.stopPropagation();
};

const closeModal = function () {
  if (overlay === null) return;
  if (overlay !== null) {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    overlay.removeAttribute("aria-modal");

    const closeModalEvent = new Event('modalClosed');
    document.dispatchEvent(closeModalEvent);
  } else {
    console.log("la cible n'a pas été trouvée / ou est null");
  }
};

document.addEventListener('modalClosed', function() {
  resetModalContent();
});


/******** GESTION DES PROJETS DE LA MODALE ********/
let modalWorks = [];
const getWorkModal = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((res) => {
      return res.json();
    })
    .then((data) => (modalWorks = data))
    .then(() => {
      createGalleryModal();
    });
};
getWorkModal();

/*** Création de la galerie ***/
const createGalleryModal = () => {
  const modalContainer = document.querySelector(".modal-body");
  modalContainer.innerHTML = "";

  modalWorks.forEach((item) => {
    const imgElement = document.createElement("img");
    const figureElement = document.createElement("figure");
    figureElement.setAttribute("id", item.id);

    imgElement.src = item.imageUrl;

    figureElement.appendChild(imgElement);
    modalContainer.appendChild(figureElement);

    const spanBinElement = document.createElement("span");
    const binIcon = document.createElement("i");
    spanBinElement.classList.add("modal-span-bin");
    binIcon.classList.add("fa-solid", "fa-trash-can");
    binIcon.setAttribute("id", item.id);

    binIcon.addEventListener("click", DeleteProject);

    spanBinElement.appendChild(binIcon);
    figureElement.appendChild(spanBinElement);
  });
};

/* GESTION DE SUPPRESSION DE PROJET*/
const DeleteProject = async (e) => {
  const id = e.target.id;
  const confirmation = confirm("Etes-vous sûr de supprimer ce projet ?");
  if (confirmation) {
    await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.ok) {
        window.alert("Le projet a été supprimé");
        getWorkModal();
        getWorks();
      } else {
        console.error("Erreur lors de la suppression du projet:", error);
      }
    });
  }
};

const AddProject = async (e) => {
  e.preventDefault();
  const title = document.getElementById("title-input").value;
  const category = document.getElementById("category-select").value;
  const image = document.getElementById("file-input").files[0];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  }).then((response) => {
    if (response.ok) {
      getWorkModal();
      getWorks();
      closeModal();
    }
  });
};

let overlay = document.getElementById("modal");
let arrowIcon;
let xIcon;
let modalContentAddBody;

/*CREATION de la partie "AJOUT PHOTOS"*/

const modalAddContainer = () => {};

modalAddContainer();

let modalContent = document.querySelector(".modal-wrapper");
const addImagesButton = document.querySelector(".modal-btn-add");
const modalContainer = document.getElementById("modal");
let modalContentAdd = document.createElement("div");

modalContentAdd.classList.add("modal-add-wrapper");
modalContentAdd.id = "modal-content";

/*MODALE 2: header du modalContentAdd**/

const modalAddTitle = document.createElement("h3");
modalAddTitle.innerText = "Ajout photo";

arrowIcon = document.createElement("i");
arrowIcon.classList.add("fa-solid", "fa-arrow-left");

xIcon = document.createElement("i");
xIcon.classList.add("fa-solid", "fa-x");
xIcon.id = "js-close-modal-icon";

modalContentAdd.appendChild(modalAddTitle);
modalContentAdd.appendChild(arrowIcon);
modalContentAdd.appendChild(xIcon);

/*AJOUT PHOTOS: body du modalContentAdd*/

modalContentAddBody = document.createElement("div");
modalContentAddBody.classList.add("modal-add-body");

const modalAddInputContainer = document.createElement("div");
modalAddInputContainer.classList.add("input-container");

modalContentAddBody.appendChild(modalAddInputContainer);
modalContentAdd.appendChild(modalContentAddBody);

/*AJOUT PHOTOS: Contenu du modalAddInputContainer pour importer le fichier image*/

const inputContainerFlex = document.createElement("div");
inputContainerFlex.classList.add("input-container-flex");
modalAddInputContainer.appendChild(inputContainerFlex);

const imageIcon = document.createElement("i");
imageIcon.classList.add("fa-regular", "fa-image");

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/jpeg, image/png";
fileInput.id = "file-input";

fileInput.style.display = "none";

const labelInsertImage = document.createElement("label");
labelInsertImage.htmlFor = "file-input";
labelInsertImage.textContent = "+ Ajouter photo";
labelInsertImage.classList.add("insert-image-label");

const pImageFormat = document.createElement("p");
pImageFormat.innerText = "jpg, png: 4mo max";

inputContainerFlex.appendChild(imageIcon);
inputContainerFlex.appendChild(fileInput);
inputContainerFlex.appendChild(labelInsertImage);
inputContainerFlex.appendChild(pImageFormat);


/*AJOUT PHOTOS: Le formulaire*/

getOptionsCategories = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      listCategories = data;
    })
    .then(() => {
      createOptionsCategories();
    });
};
getOptionsCategories();

const formContainer = document.createElement("div");
formContainer.classList.add("form-container");
const addImageForm = document.createElement("form");

const formTitleImage = document.createElement("input");
formTitleImage.type = "text";
formTitleImage.id = "title-input";
const labelTitleImage = document.createElement("label");
labelTitleImage.htmlFor = "title-input";
labelTitleImage.textContent = "Titre";
labelTitleImage.classList.add("form-label");

const labelCategoryImage = document.createElement("label");
labelCategoryImage.htmlFor = "category-select";
labelCategoryImage.textContent = "Catégorie";
labelCategoryImage.classList.add("form-label");

const selectCategory = document.createElement("select");
const option = document.createElement("option");

const createOptionsCategories = () => {
  selectCategory.name = "categories";
  selectCategory.id = "category-select";

  listCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    selectCategory.appendChild(option);
  });
};

selectCategory.appendChild(option);
addImageForm.appendChild(labelTitleImage);
addImageForm.appendChild(formTitleImage);
addImageForm.appendChild(labelCategoryImage);

addImageForm.appendChild(selectCategory);

createOptionsCategories();

formContainer.appendChild(addImageForm);
modalContentAddBody.appendChild(formContainer);

/*MODALE 2: création du bouton "Valider"*/

const validButton = document.createElement("button");
validButton.type = "submit";
validButton.classList.add("modal-btn-valid");
validButton.innerText = "Valider";

addImageForm.appendChild(validButton);

modalContentAdd.addEventListener("click", function (e) {
  stopPropagation(e);
});

modalContentAdd.querySelector("#js-close-modal-icon").addEventListener("click", closeModal);

addImagesButton.addEventListener("click", () => {
  modalContent.style.display = "none";
  modalContainer.appendChild(modalContentAdd);
  modalContentAdd.style.display = "block";
  inputContainerFlex.style.display = "flex";
});

arrowIcon.addEventListener("click", () => {
  modalContentAdd.style.display = "none";
  modalContainer.appendChild(modalContent);
  modalContent.style.display = "block";
});

/*MODALE 2: PRESENTATION de l'IMAGE dans la modale avant de valider*/

fileInput.addEventListener("change", function (event) {
  if (event.target.files.length > 0) {
    const selectedFile = event.target.files[0];

    if (
      selectedFile.type.startsWith("image/jpeg") ||
      selectedFile.type.startsWith("image/png")
    ) {
      const imageElement = document.createElement("img");
      imageElement.src = URL.createObjectURL(selectedFile);
      imageElement.classList.add("selected-image");

      modalAddInputContainer.innerHTML = "";
      modalAddInputContainer.appendChild(imageElement);

      imageElement.style.width = "30%";
      imageElement.style.height = "100%";
    }
  }
});

/***** */
const resetModalContent = function () {
  const titleInput = document.getElementById("title-input");
  if (titleInput) {
    titleInput.value = "";
  }

  const categorySelect = document.getElementById("category-select");
  if (categorySelect) {
    categorySelect.value = "";
  }

  const imageTag = document.querySelector('.input-container img');
  if (imageTag) {
    imageTag.remove();
  }

  modalAddInputContainer.innerHTML = "";
  modalAddInputContainer.appendChild(inputContainerFlex);

  modalContentAdd.style.display = "none";
  modalContainer.appendChild(modalContent);
  modalContent.style.display = "block";
};

/****TENTATIVE POST******/

fileInput.type = "file";
fileInput.accept = "image/jpeg, image/png";
fileInput.id = "file-input";
fileInput.addEventListener("change", function (event) {
  updateSelectedFile(event);
});
function updateSelectedFile(event) {
  let selectedFile = event.target.files[0];
  console.log("Fichier sélectionné :", selectedFile);
}
modalContentAddBody.appendChild(fileInput);
modalContentAddBody.addEventListener("submit", AddProject);

/*Comportement de la modale d'ajout*/

let errorMessage;

validButton.addEventListener("click", function () {
  if (formTitleImage.value.length < 1 || selectCategory.value === "") {
    const errorMessageContainer = document.querySelector(".form-container");
    errorMessage = document.createElement("p");
    errorMessage.innerText =
      "Erreur: veuillez remplir les deux champs pour valider";
    errorMessage.style.display = "block";

    errorMessageContainer.appendChild(errorMessage);
    stopPropagation(e);
  }
});

formTitleImage.addEventListener("input", function () {
  if (errorMessage) {
    errorMessage.style.display = "none";
  }
});

selectCategory.addEventListener("change", updateValidationFormColor);

function updateValidationFormColor() {
  if (formTitleImage.value.length >= 1 && selectCategory.value !== "") {
    validButton.style.backgroundColor = "#1D6154";
  } else {
    validButton.style.backgroundColor = "";
  }
}