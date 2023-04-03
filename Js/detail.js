const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")

    //llamadas de funciones y eventos
    getData()
    // funciones
    function getData() {
        const url = "https://mindhub-xj03.onrender.com/api/amazing";
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data.events)
            const card = data.events.find(card => card._id == id)

            const createCard = document.getElementById("detailsContainer");
            createCard.innerHTML = `
                <div>
                    <img src="${card.image}" alt="" srcset="">
                </div>
                <div class="details-text details-text">
                    <h2>${card.name}</h2>
                    <p>
                    ${card.description}
                    </p>
                </div>`

          });
      }
    