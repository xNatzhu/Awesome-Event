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
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">${card.name}</li>
            </ol>
          </nav>
          <div class="container">
            <div class="container-detail mt-4">
              <img src="${card.image}" alt="" srcset="">
              <h6><span>${card.category}</span> - ${card.date}</h6>
              <h2 class="mb-3">${card.name}</h2>
              <p class="detail-price mb-3"><span>Price: $ ${card.price}</span></p>
              <p>${card.description}</p>      
            </div>
          </div> `

          });
      }
    