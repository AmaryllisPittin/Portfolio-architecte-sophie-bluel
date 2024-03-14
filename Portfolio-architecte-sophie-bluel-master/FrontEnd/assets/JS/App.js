let listCategories = [];
let allProjects = [];

 async function getWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allProjects = data;
    })
    .then(() => {
      createGallery();
    });
}
getWorks();

const getCategories = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      listCategories = data;
    })
    .then(() => {
      createCategories();
    });
};
getCategories();

const createGallery = (projects) => {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = "";

  const displayWork = projects || allProjects;

  displayWork.forEach((item) => {
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    const titleElement = document.createElement("figcaption");

    imgElement.src = item.imageUrl;
    titleElement.innerText = item.title;

    figureElement.setAttribute("data-id", item.id);

    figureElement.appendChild(imgElement);
    figureElement.appendChild(titleElement);
    galleryContainer.appendChild(figureElement);
  });
};

const createCategories = () => {
  const filterbar = document.querySelector(".buttons-container");
  const buttonTous = document.createElement("button");
  buttonTous.setAttribute("id", 0);
  buttonTous.classList.add("filter-button", "selected");
  buttonTous.textContent = "Tous";
  filterbar.appendChild(buttonTous);

  listCategories.forEach((categories) => {
    const button = document.createElement("button");
    button.setAttribute("id", categories.id);
    button.classList.add("filter-button");
    button.textContent = categories.name;
    filterbar.appendChild(button);

    console.log('Function createCategories called');
  });
  filterWorks();
};

const filterWorks = () => {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const active = document.querySelector(".selected");
      active.classList.remove("selected");
      const button = e.target;
      button.classList.add("selected");

      if (button.id == 0) {
        createGallery();
      } else {
        const filtered = allProjects.filter(
          (item) => item.categoryId == button.id
        );
        createGallery(filtered);
      }
    });
  });
};

/****************** GESTION DE L'AUTHENTIFICATION ******************/
let token = localStorage.getItem("token");

const Auth = () => {
  const portfolioModifyButton = document.getElementById("portfolio-modified");
  const buttonsContainer = document.querySelector(".buttons-container");
  const editionModeBar = document.querySelector(".edition-mode");

  if (token) {
    const loginLinkOnIndex = document.getElementById("login-link");
    loginLinkOnIndex.textContent = "logout";
    loginLinkOnIndex.style.cursor = "pointer";

    portfolioModifyButton.style.display = "flex";
    editionModeBar.style.display = "flex";
    buttonsContainer.style.display = "flex";

    loginLinkOnIndex.addEventListener("click", function () {
      const confirmation = confirm(
        "Êtes-vous sûr de vouloir vous déconnecter ?"
      );
      if (confirmation) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    });
  } else {
    portfolioModifyButton.style.display = "none";
    editionModeBar.style.display = "none";
    buttonsContainer.style.display = "flex";
  }
};

Auth();
