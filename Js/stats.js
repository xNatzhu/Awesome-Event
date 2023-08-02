//variables
let tableStats1 = document.getElementById("tableStats1")

//llamadas de funciones

getData()
// funciones

getData();

function getData() {
  const url = "https://mindhub-xj03.onrender.com/api/amazing";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.events);
      getEventStatistics(data.events, data.currentDate);
      getEventStatisticsUpcoming(data.events, data.currentDate);
      getEventStatisticsPast(data.events, data.currentDate)

    });
}



function getEventStatistics(data,date) {
  let mejorEvento = null;
  let mejorPorcentajeDeAsistencia = 0;
  let menorEvento = null;
  let menorPorcentajeDeAsistencia = 100;
  let mayorCapacidad = 0;
  let mayorCapacidadEvento = null;

  data.forEach((data) => {

    let dateActuality = date;
      const asistencia = data.assistance || data.estimate;
      const porcentajeDeAsistencia = ((asistencia / data.capacity) * 100).toFixed(2);
      if(data.date < dateActuality ){
      if(porcentajeDeAsistencia > mejorPorcentajeDeAsistencia){
        mejorEvento = data;
        mejorPorcentajeDeAsistencia = porcentajeDeAsistencia;
      }
  
      if(porcentajeDeAsistencia < menorPorcentajeDeAsistencia){
        menorEvento = data;
        menorPorcentajeDeAsistencia = porcentajeDeAsistencia;
      }
  
      const capacidad = data.capacity
  
      if(capacidad > mayorCapacidad){
        mayorCapacidad = capacidad
        mayorCapacidadEvento = data;
      }
    }
  });

  const event = {
    mayorPorcentajeDeAsistencia: {
      mejorPorcentajeDeAsistencia: mejorPorcentajeDeAsistencia,
      mejorEvento: mejorEvento
    },
    menorPorcentajeDeAsistencia: {
      menorPorcentajeDeAsistencia: menorPorcentajeDeAsistencia,
      menorEvento: menorEvento,
    },
    mayorCapacidad: {
      mayorCapacidad: mayorCapacidad,
      mayorCapacidadEvento: mayorCapacidadEvento,
    },
  };

  EventStatistics(event);
}


function percentage(capacity, assistance) {
  return (parseFloat(assistance) * 100) / parseFloat(capacity)
}

function getEventStatisticsUpcoming(data, date) {
  let listCategory = new Set([]);
  let dateActuality = date;
  let listElement = [];
  let objUpcomingTotalPrice = {};
  let objUpcomingAveragePercentageAssistance = {};

  data.filter((data) => {
    if (dateActuality < data.date) {
      listCategory.add(data.category);
      console.log(data.date);
      listElement.push(data);
    }
  });

  listElement.forEach((elemento) => {
    // verificar si la propiedad ya existe en el objeto
    if (objUpcomingTotalPrice.hasOwnProperty(elemento.category)) {
      const asistencia = elemento.assistance !== undefined ? elemento.assistance : elemento.estimate || 0;
      
      // si la propiedad existe, agregar el precio al valor actual
      objUpcomingTotalPrice[elemento.category] += elemento.price * asistencia;
    } else {
      // si la propiedad no existe, inicializarla con el precio actual
      const asistencia = elemento.assistance !== undefined ? elemento.assistance : elemento.estimate || 0;
      objUpcomingTotalPrice[elemento.category] = elemento.price * asistencia;
    }

    if (objUpcomingAveragePercentageAssistance.hasOwnProperty(elemento.category)) {
      objUpcomingAveragePercentageAssistance[elemento.category].push(Math.round(percentage(elemento.capacity, elemento.assistance || elemento.estimate)))
    } else {
      objUpcomingAveragePercentageAssistance[elemento.category] = [Math.round(percentage(elemento.capacity, elemento.assistance || elemento.estimate))];
    }
  });

  for (const [category, value] of Object.entries(objUpcomingAveragePercentageAssistance)) {
    const averagePercentage = (value.reduce((sum, percentage) => sum + percentage, 0) / value.length).toFixed(2);
    objUpcomingAveragePercentageAssistance[category] = averagePercentage;
  }
  
  EventStatisticsUpcoming(objUpcomingTotalPrice, objUpcomingAveragePercentageAssistance);
  console.log(listCategory, listElement);
  console.log(objUpcomingTotalPrice);

  console.log("probando", objUpcomingAveragePercentageAssistance);
}



function getEventStatisticsPast(data, date) {
  let listCategory = new Set([]);
  let dateActuality = date;
  let listElement = [];
  let objUpcomingTotalPrice = {};
  let objUpcomingAveragePercentageAssistance = {};

  data.filter((data) => {
    if (dateActuality > data.date) {
      listCategory.add(data.category);
      console.log(data.date);
      listElement.push(data);
    }
  });

  listElement.forEach((elemento) => {
    // verificar si la propiedad ya existe en el objeto
    if (objUpcomingTotalPrice.hasOwnProperty(elemento.category)) {
      const asistencia = elemento.assistance !== undefined ? elemento.assistance : elemento.estimate || 0;
      
      // si la propiedad existe, agregar el precio al valor actual
      objUpcomingTotalPrice[elemento.category] += elemento.price * asistencia;
    } else {
      // si la propiedad no existe, inicializarla con el precio actual
      const asistencia = elemento.assistance !== undefined ? elemento.assistance : elemento.estimate || 0;
      objUpcomingTotalPrice[elemento.category] = elemento.price * asistencia;
    }

    if (objUpcomingAveragePercentageAssistance.hasOwnProperty(elemento.category)) {
      objUpcomingAveragePercentageAssistance[elemento.category].push(Math.round(percentage(elemento.capacity, elemento.assistance || elemento.estimate)))
    } else {
      objUpcomingAveragePercentageAssistance[elemento.category] = [Math.round(percentage(elemento.capacity, elemento.assistance || elemento.estimate))];
    }
  });

  for (const [category, value] of Object.entries(objUpcomingAveragePercentageAssistance)) {
    const averagePercentage = (value.reduce((sum, percentage) => sum + percentage, 0) / value.length).toFixed(2);
    objUpcomingAveragePercentageAssistance[category] = averagePercentage;
  }
  
  console.log(listCategory, listElement);
  console.log(objUpcomingTotalPrice);
  EventStatisticsPast(objUpcomingTotalPrice, objUpcomingAveragePercentageAssistance)
  console.log("probando11", objUpcomingAveragePercentageAssistance);
}



function EventStatistics(data) {
  let eventStat = `
  <thead class="table-dark">
          <tr>
            <th class="pt-3 pb-3 ">Events with the highest percentage of attendance</th>
            <th class="pt-3 pb-3 ">Events with the lowest percentage of attendance</th>
            <th class="pt-3 pb-3 ">Event with larger capacity</th>
          </tr>
  </thead>
  <tbody>
      <tr>
      <td class="pt-3 pb-3 ">${data.mayorPorcentajeDeAsistencia.mejorEvento.name} ${data.mayorPorcentajeDeAsistencia.mejorPorcentajeDeAsistencia}%</td>
      <td class="pt-3 pb-3 ">${data.menorPorcentajeDeAsistencia.menorEvento.name} ${data.menorPorcentajeDeAsistencia.menorPorcentajeDeAsistencia}%</td>
      <td class="pt-3 pb-3 ">${data.mayorCapacidad.mayorCapacidadEvento.name} Capacity: ${data.mayorCapacidad.mayorCapacidad}</td>
      </tr>
  </tbody>`;

  tableStats1.innerHTML = eventStat;
  console.log(data);
}

function EventStatisticsUpcoming(data, percentages) {
  let eventStat = `
  <br>
    <thead class="table-dark">
      <tr><th class="pt-3 pb-3 " colspan="3"><span>Upcoming Event</span></th></tr>
      <tr>
        <th class="pt-3 pb-3 ">Categories</th>
        <th class="pt-3 pb-3 ">Revenues</th>
        <th class="pt-3 pb-3 ">Percentage of attendance</th>
      </tr>
    </thead>`
  for (const [category, value] of Object.entries(data)) {
    eventStat += `
      <tbody>
        <tr>
          <td class="  pt-3 pb-3 ">${category}</td>
          <td class="  pt-3 pb-3 ">$${value.toFixed(2)}</td>
          <td class="  pt-3 pb-3 ">${percentages[category]}%</td>
        </tr>
      </tbody>`;
  }
  tableStats1.insertAdjacentHTML("beforeend", eventStat);
}

function EventStatisticsPast(data, percentages) {
  let eventStat = `
  <br>
    <thead class="table-dark">
      <tr><th class="pt-3 pb-3" colspan="3"><span>Past Event</span></th></tr>
      <tr>
        <th class="pt-3 pb-3">Categories</th>
        <th class="pt-3 pb-3 ">Revenues</th>
        <th class="pt-3 pb-3 ">Percentage of attendance</th>
      </tr>
    </thead>`
  for (const [category, value] of Object.entries(data)) {
    eventStat += `
      <tbody>
        <tr>
          <td class=" pt-3 pb-3 ">${category}</td>
          <td class=" pt-3 pb-3 ">$${value.toFixed(2)}</td>
          <td class=" pt-3 pb-3 ">${percentages[category]}%</td>
        </tr>
      </tbody>`;
  }
  tableStats1.insertAdjacentHTML("beforeend", eventStat);
}



getData();
