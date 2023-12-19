const elementContainer = document.querySelector('.gallery')
fetch("http://localhost:5678/api/works")
.then(response => {
    return response.json()
})
.then(imagesTabs => {
    console.log(imagesTabs)
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

        const buttons = document.querySelectorAll('#portfolio button');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
        
                const images = document.querySelectorAll('.gallery img');
                images.forEach(image => {
                    image.style.display = 'none';
                });

                const filter = button.getAttribute("imagesTabs.name");
                const filterImg = document.querySelectorAll('.gallery img[src="${imagesTabs.imageUrl}"]');
                filterImg.forEach(image => {
                    image.style.display = 'block';
                });
            });
        });  


    })
