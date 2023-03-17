const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")

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