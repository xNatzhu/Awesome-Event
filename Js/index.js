    // const / variables
    const cardContainer = document.getElementById("cardContainer");
    const checkContainer = document.getElementById("checkContainer");
    const input = document.querySelector("input");
 

    //llamadas de funciones y eventos

    createCard(data.events);
    createCheckbox(data.events);
    // funciones

    function createCard(array){
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

    function createCheckbox(array) {
        let arrayCategory = array.map(element=>{
            return element.category
        })

        //set es una estructura de javascript que no permite elementos repetidos. siempre y cuando sea de elementos basico.
        let setCategory = new Set(arrayCategory)
        console.log(setCategory); //el set tiene foreach lo que permite recorrer.
        let chech = ""
        setCategory.forEach(element=>{
            chech +=`
            <div class="">
                <input class="form-check-input" type="checkbox" value="${element}" id="flexCheckDefault">
                <label class="form-check-label" for="${element}">
                ${element}
                </label>
            </div>`
            checkContainer.innerHTML = chech
        })
    }

    input.addEventListener("input",(e)=>{
        // Evitar que la página se recargue
        e.preventDefault();

        // Tu código de filtrado y creación de tarjetas aquí
        let oneFilter = textFilter(data.events, input.value);
        let twoFilter = filterCategory(oneFilter);
        createCard(twoFilter);
    })

    checkContainer.addEventListener("change",()=>{
        // dentro del contenedor algo esta cambiando - un change
        let oneFilter = textFilter(data.events, input.value)
        let twoFilter = filterCategory(oneFilter)
        createCard(twoFilter);
        
    })



    function textFilter(array, text) {
        let arrayFilter = array.filter(element => {
            return element.name.toLowerCase().includes(text.toLowerCase())
        });
        return arrayFilter;
    }
    
    function filterCategory(array) {
        let checkboxes = document.querySelectorAll("input[type='checkbox']");
        console.log(checkboxes);
        let arrayCheck = Array.from(checkboxes)
        let correctCheck = arrayCheck.filter(check => check.checked)
        if(correctCheck == 0){
            return array
        }else{
            console.log(correctCheck)
            let category = correctCheck.map(check => check.value)
            console.log(category);
            let arrayFilter = array.filter(element => category.includes(element.category))
            return arrayFilter
        }
    }


