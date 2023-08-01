    
    
    //llamadas de funciones y eventos
    getData()
    // funciones
    function getData() {
        const url = "https://mindhub-xj03.onrender.com/api/amazing";
        fetch(url)
          .then(response => response.json())
          .then(data => {
            createCard(data.events, data.currentDate);
          });
      }
      
    function createCard(array, date){
        let actualDate = date
        if(array.length == 0){
            cardContainer.innerHTML =` 
            <div class="alert alert-light" role="alert">
                ¡Ups! No hay eventos con esa caracteristicas.
            </div>`
        }else{
             
            let card = ``;
            array.forEach(element => {
                    card += `
                    <div class="card align-items-center">
                    <img src="${element.image}" alt="Imagen de "${element.image}" class="card-img">
                    <div class="card-body d-flex flex-column align-items-center justify-content-center">
                        <h5 class="card-title text-center">${element.name}</h5>
                        <p class="card-text text-center mt-2">${element.description}.</p>
                        <div class="row row-cols-2 card-body-button-price">
                            <div class="mt-3">$ ${element.price}</div>
                            <a href="detail.html?id=${element._id}" class="btn btn-primary-aevento">Details</a>
                            </div>
                        </div>
                    </div>`
            });
            cardContainer.innerHTML = card
        }
    }