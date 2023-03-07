window.addEventListener("load", () => {
    let actualDate = data.currentDate

    data.events.map(data => {
        if(data.date > actualDate){
            //Vincula el elemento con el contenedor.
            const cardContainer = document.getElementById("cardContainer");
            //Creamos el contenedor de las cartas
            const mainCardContainer = document.createElement("div");
                mainCardContainer.classList.add('card');
                mainCardContainer.classList.add('align-items-center');
            //Contenido

            //Img
            const cardImg = document.createElement("img");
            cardImg.setAttribute('src', data.image);
            cardImg.setAttribute('alt',`Imagen de ${data.image}`);
            //Los setatribute nos permite gestionar atributos a nuestras etiquetas.
                cardImg.classList.add("card-img");
                mainCardContainer.appendChild(cardImg);


            //Card Body

            const cardBody = document.createElement("div");
                cardBody.classList.add("card-body","d-flex","flex-column","align-items-center","justify-content-center");
                //agregando a la class list la "," permite agregar diversas clases.


            //Card Body Element

            const title = document.createElement("h5")
                title.textContent = data.name
                title.classList.add("card-title","text-center")
            cardBody.appendChild(title)


            const description = document.createElement("p")
                description.textContent = data.description
                description.classList.add("card-text","text-center","mt-2")
            cardBody.appendChild(description)

            //CARD BODY ELEMENT CONTAINER BUTTON AND PRICE

            const cardBodyElementContainerButtonAndPrice = document.createElement("div")
                cardBodyElementContainerButtonAndPrice.classList.add("row","row-cols-2","card-body-button-price")
            
                const cardBodyPriceContainer = document.createElement("div")
                cardBodyPriceContainer.classList.add("mt-3")
                cardBodyPriceContainer.textContent = '$ '+ data.price
                cardBodyElementContainerButtonAndPrice.appendChild(cardBodyPriceContainer)

                const cardBodyButton = document.createElement("a")
                cardBodyButton.textContent = "Details"
                cardBodyButton.classList.add("btn","btn-primary-aevento")
                cardBodyElementContainerButtonAndPrice.appendChild(cardBodyButton)
                
            cardBody.appendChild(cardBodyElementContainerButtonAndPrice)

            mainCardContainer.appendChild(cardBody)

            cardContainer.appendChild(mainCardContainer);
        }
    })

})