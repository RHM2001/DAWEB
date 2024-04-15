function getAllRestaurantes(e) {

  return fetch('restaurantes/all', {
    method: 'get',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta no fue exitosa');
      }
      return response.json();
    });
}

function getRestaurante(id) {
  return fetch(`restaurantes/single?id=${id}`, {
    method: 'get',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta no fue exitosa');
      }
      return response.json();
    });
}

function getValoraciones(id) {
  console.log("entro al getValoraciones");
  return fetch(`restaurantes/allValoraciones?id=${id}`, {
    method: 'get',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta no fue exitosa');
      }
      return response.json();
    });
}

function deleteIncidenciasByRestaurante(restaurante) {

  return fetch(`/plato/deleteIncidenciasByRestaurante/${restaurante}`, {
    method: 'delete',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta no fue exitosa');
      }
      return response.json();
    });
}

function borrarRestaurante(id) {


  return fetch(`restaurantes/borrar?id=${id}`, {
    method: 'delete',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })

}

function actualizar(id, nombre, coord) {
  return fetch(`restaurantes/actualizar?id=${id}`, {
    method: 'put',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ 'nombre': nombre, 'coordenadas': coord })
  })
}

function valorar(id, correo, calificacion, comentario) {
  const fechaAct = new Date();
  const fecha = fechaAct.toISOString();

  fetch(`restaurantes/valorar?id=${id}`, {
    method: 'post',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ 'correo': correo, 'fecha': fecha, 'calificacion': calificacion, 'comentario': comentario })
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });

}

function opinar(id) {

  fetch(`restaurantes/opinion?id=${id}`, {
    method: 'post',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' })
  }).then(response => {
    if (!response.ok) {
      throw new Error('La respuesta no fue exitosa');
    }
    return response.json();
  });
}


function renderRestaurantes(data) {
  const restaurantesContainer = document.getElementById('restaurantes-container');

  data.forEach(restaurante => {
    const card = document.createElement('div');
    card.className = 'card mb-3 ';
    card.style = "background-color: #D8F3DC";

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = restaurante.resumen.nombre;
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = 'Coordenadas: ' + restaurante.resumen.coordenadas;
    cardBody.appendChild(cardText);

    card.addEventListener('click', function () {
      window.location.href = 'restaurante.html?id=' + restaurante.resumen.id;
    });

    card.appendChild(cardBody);

    restaurantesContainer.appendChild(card);
  });
}

function getIncidencias(restaurante, plato) {
  let url = `/plato/incidencias?restaurante=${restaurante}&plato=${plato}`;

  return fetch(url, {
    method: 'get',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta no fue exitosa');
      }
      return response.json();
    });
}

function sendPlato(id, nombre, descripcion, precio) {

  fetch(`plato/alta?id=${id}`, {
    method: 'post',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ 'nombre': nombre, 'descripcion': descripcion, 'precio': precio })
  })
    .then(resultado => { return resultado.text() })
    .then(resultado => {
      $('#result_restaurante').text(resultado)
    }
    )

}

function getCookie(nombre) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(nombre + '=')) {
      return cookie.substring(nombre.length + 1);
    }
  }
  return null;
}


function sendIncidencia() {

  console.log("ENTRO AL SEND_INCIDENCIA");

  console.log("send");

  let urlParams = new URLSearchParams(window.location.search);
  let plato = urlParams.get('nombre');
  let restaurante = urlParams.get('id');
  let descripcion = document.getElementById('descripcionIncidencia').value;

  console.log("Plato : " + plato);
  console.log("Restaurante : " + restaurante);
  console.log("Descripcion : " + descripcion);

  let data = {
    restaurante: restaurante,
    plato: plato,
    descripcion: descripcion
  };

  fetch('plato/register', {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Incidencia registrada exitosamente:', data);
    })
    .catch(error => {
      console.error('Error al registrar la incidencia:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {

  if (getCookie('jwt') == null)
    window.location.href = 'index.html';
});

if (window.location.pathname.includes('restaurante.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  var band = false;
  let idOp

  // Modal para borrar restaurante
  document.getElementById('btnBorrar').addEventListener('click', function () {
    $('#demo-modal').modal('show');
  });

  document.getElementById('botonCrear').addEventListener('click', function () {
    borrarRestaurante(id);
    window.location.href = 'allRestaurantes.html';
    $('#demo-modal').modal('hide');
  });

  document.getElementById('cancel').addEventListener('click', function () {
    $('#demo-modal').modal('hide');

  });

  // Modal para actualizar restaurante
  document.getElementById('btnEditar').addEventListener('click', function () {
    $('#modal-act').modal('show');
  });

  document.getElementById('cancelAct').addEventListener('click', function () {
    $('#modal-act').modal('hide');
  });



  document.getElementById('btnAct').addEventListener('click', function () {
    let nombre = $('#nombre').val()
    let coordenadas = $('#coordenadas').val()
    actualizar(id, nombre, coordenadas);
    window.location.reload(true);
    $('#modal-act').modal('hide');
  });

  // Modal para crear una valoración
  document.getElementById('btnAddOpinion').addEventListener('click', function () {
    $('#modal-opi').modal('show');
  });

  document.getElementById('cancelOpi').addEventListener('click', function () {
    $('#modal-opi').modal('hide');
  });

  // Modal para añadir un plato
  document.getElementById('btnAddPlato').addEventListener('click', function () {
    $('#modal-add').modal('show');
  });

  document.getElementById('cancelAdd').addEventListener('click', function () {
    $('#modal-add').modal('hide');
  });

  document.getElementById('btnAdd').addEventListener('click', function () {
    let nombre = $('#nombreP').val()
    let descripcion = $('#descripcion').val()
    let precio = $('#precio').val()
    sendPlato(id, nombre, descripcion, precio);
    window.location.reload(true);
    $('#modal-add').modal('hide');
  });


  getRestaurante(id)
    .then(data => {
      const restauranteNombre = document.getElementById('restauranteNombre');
      const restauranteCoordenadas = document.getElementById('restauranteCoordenadas');
      restauranteNombre.innerHTML = data.nombre;
      restauranteCoordenadas.innerHTML = "Coordenadas: " + data.coordenadas;
      restauranteNumPlatos.innerHTML = "Número de platos: " + data.platos.length;

      if (data.valoraciones.idOpinion == null) {
        restauranteNumVal.innerHTML = "Número de valoraciones: 0";
        restauranteCalMed.innerHTML = "Calificacion media: 0";
        opinar(id);

      }
      else {
        band = true;
        restauranteNumVal.innerHTML = "Número de valoraciones: " + data.valoraciones.numValoraciones;
        restauranteCalMed.innerHTML = "Calificacion media: " + data.valoraciones.calificacionMedia;
      }

      // MOSTRAR LOS PLATOS EN EL LIST-GROUP
      if (data.platos && data.platos.length > 0) {
        data.platos.forEach(plato => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item');

          const nombrePrecio = document.createElement('div');
          nombrePrecio.classList.add('d-flex', 'justify-content-between');

          const nombre = document.createElement('h5');
          nombre.classList.add('mb-1');
          nombre.textContent = plato.nombre;
          nombre.style.fontWeight = 'bold';

          const precio = document.createElement('span');
          precio.classList.add('badge', 'bg-success');
          precio.textContent = plato.precio + ' €';

          const descripcion = document.createElement('p');
          descripcion.classList.add('mb-1');
          descripcion.textContent = plato.descripcion;

          nombrePrecio.appendChild(nombre);
          nombrePrecio.appendChild(precio);
          listItem.appendChild(nombrePrecio);
          listItem.appendChild(descripcion);

          listItem.addEventListener('click', function () {
            const platoNombre = plato.nombre;
            const restauranteId = id;
            const nuevaRuta = 'plato.html?id=' + restauranteId + '&nombre=' + platoNombre;
            window.location.href = nuevaRuta;
          });




          platosList.appendChild(listItem);

        });
      } else {
        const noPlatosItem = document.createElement('li');
        noPlatosItem.classList.add('list-group-item');
        noPlatosItem.textContent = 'No hay platos disponibles.';
        platosList.appendChild(noPlatosItem);
      }

      console.log(band);
      if (band == true) {
        getValoraciones(id)
          .then(data => {
            const valoracionesList = document.getElementById('valoracionesList');

            // MOSTRAR LAS VALORACIONES EN EL LIST-GROUP
            if (data.length > 0) {
              console.log(data);
              data.forEach(valoracion => {
                console.log("ENTRO AL RECORRER");
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');

                const rowDiv = document.createElement('div');
                rowDiv.classList.add('row');

                const correoCol = document.createElement('div');
                correoCol.classList.add('col');
                const correo = document.createElement('h5');
                correo.classList.add('mb-1', 'font-weight-bold');
                correo.textContent = valoracion.Correo;
                correoCol.appendChild(correo);

                const estrellasCol = document.createElement('div');
                estrellasCol.classList.add('col-auto');
                const estrellas = document.createElement('span');
                estrellas.classList.add('badge', 'bg-success');
                estrellas.textContent = '★'.repeat(valoracion.Calificacion) + '☆'.repeat(5 - valoracion.Calificacion);
                estrellasCol.appendChild(estrellas);

                const comentarioCol = document.createElement('div');
                comentarioCol.classList.add('col');
                const comentario = document.createElement('p');
                comentario.classList.add('mb-1');
                comentario.textContent = valoracion.Comentario;
                console.log("Comentario -> " + valoracion.Comentario);
                comentarioCol.appendChild(comentario);

                const nestedRowDiv = document.createElement('div');
                nestedRowDiv.classList.add('row');
                nestedRowDiv.appendChild(correoCol);
                nestedRowDiv.appendChild(estrellasCol);

                rowDiv.appendChild(nestedRowDiv);
                rowDiv.appendChild(comentarioCol);

                listItem.appendChild(rowDiv);
                valoracionesList.appendChild(listItem);
              });
            } else {
              console.log("entro al else de obtener las valoraciones");
              const noValoracionesItem = document.createElement('li');
              noValoracionesItem.classList.add('list-group-item');
              noValoracionesItem.textContent = 'No hay valoraciones disponibles';
              valoracionesList.appendChild(noValoracionesItem);
            }


          })
          .catch(error => {
            console.error(error);
          });
      }
      else {
        console.log("entro al else de obtener las valoraciones");
        const noValoracionesItem = document.createElement('li');
        noValoracionesItem.classList.add('list-group-item');
        noValoracionesItem.textContent = 'No hay valoraciones disponibles';
        valoracionesList.appendChild(noValoracionesItem);
      }
    })
    .catch(error => {
      console.error(error);
    });

  document.getElementById('btnOpi').addEventListener('click', function () {
    console.log("ACCION DEL BOTON BTNOPI")
    let correo = $('#correo').val()
    let calificacion = $('#calificacion').val()
    let comentario = $('#cometario').val()
    console.log("Bandera : " + band)


    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');


    console.log("ID del restaruante dentro del enviar valoracion -> " + id);
    getRestaurante(id)
      .then(data => {
        console.log("ID de la opinion dentro del enviar valoracion -> " + data.valoraciones.idOpinion);
        valorar(data.valoraciones.idOpinion, correo, calificacion, comentario);
        console.log(idOp);
        window.location.reload(true);
      })
      .catch(error => {
        // Manejo de errores
        console.error(error);
      });





    $('#modal-opi').modal('hide');

  });

}

function renderIncidencias(incidencias) {
  const incidenciasList = document.getElementById('incidenciasList');

  // Limpiar la lista de incidencias antes de renderizar los nuevos elementos
  incidenciasList.innerHTML = '';

  incidencias.forEach(incidencia => {
    // Crear el elemento list item para cada incidencia
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    const nombreDescripcionFecha = document.createElement('div');
    nombreDescripcionFecha.classList.add('d-flex', 'justify-content-between');

    const nombreDescripcion = document.createElement('div');

    const usuario = document.createElement('h5');
    usuario.classList.add('mb-1');
    usuario.textContent = incidencia.usuario;
    usuario.style.fontWeight = 'bold';

    const descripcion = document.createElement('p');
    descripcion.classList.add('mb-1');
    descripcion.textContent = incidencia.descripcion;

    nombreDescripcion.appendChild(usuario);
    nombreDescripcionFecha.appendChild(nombreDescripcion);

    const fecha = document.createElement('span');
    fecha.classList.add('badge', 'bg-success', 'align-self-center');
    fecha.textContent = formatDate(incidencia.fecha_creacion);

    nombreDescripcionFecha.appendChild(fecha);

    listItem.appendChild(nombreDescripcionFecha);
    listItem.appendChild(descripcion);

    incidenciasList.appendChild(listItem);
  });
}


function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', options);
}

if (window.location.pathname.includes('plato.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const nombrePlato = urlParams.get('nombre');
  var band = false;
  console.log(id);
  getRestaurante(id)
    .then(data => {
      if (data.platos && data.platos.length > 0) {
        data.platos.forEach(plato => {
          if (plato.nombre == nombrePlato) {
            platoNombre.innerHTML = "Plato: " + plato.nombre;
            descripcionPlato.innerHTML = "Descripción: " + plato.descripcion;
            PrecioPlato.innerHTML = "Precio: " + plato.precio + "€";
          }
        });
      }

    })
}

// Función para buscar restaurantes por nombre parcial
function buscarRestaurantes(nombreB) {

  const restaurantesContainer = document.getElementById('restaurantes-container');
  restaurantesContainer.innerHTML = "";

  getAllRestaurantes()
    .then(data => {

      data.forEach(restaurante => {
        if (restaurante.resumen.nombre.includes(nombreB)) {

          renderRestaurantes([restaurante])
        }

        return true;


      })
    })
    .catch(error => {
      console.error(error);
    });
}

function buscarRestaurantesRango(min, max) {

  const restaurantesContainer = document.getElementById('restaurantes-container');
  restaurantesContainer.innerHTML = "";

  getAllRestaurantes()
    .then(data => {

      data.forEach(restaurante => {
        getRestaurante(restaurante.resumen.id)
          .then(data => {
            if (data.valoraciones == null) {
              return;
            }

            if (data.valoraciones.calificacionMedia >= min && data.valoraciones.calificacionMedia <= max) {
              renderRestaurantes([restaurante])
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
    })
    .catch(error => {
      console.error(error);
    });
}

function buscarRestaurantesCiudad(ciudad) {

  const restaurantesContainer = document.getElementById('restaurantes-container');
  restaurantesContainer.innerHTML = "";

  getAllRestaurantes()
    .then(data => {

      data.forEach(restaurante => {
        if (restaurante.resumen.ciudad !== null && restaurante.resumen.ciudad === ciudad) {
          renderRestaurantes([restaurante])
        }
        return true;
      })
    })
    .catch(error => {
      console.error(error);
    });
}

function obtenerCoordenadas(cadena) {
  let partes = cadena.split(',');
  
  let valor1 = parseInt(partes[0].trim(), 10);
  let valor2 = parseInt(partes[1].trim(), 10);

 
  
  return { valor1, valor2 };
}

function obtenerDistancia(x1, x2, y1, y2) {
  let x = x2-x1;
  const xCua = Math.pow(x, 2);

  let y = y2-y1;
  const yCua = Math.pow(y, 2);

  let suma = xCua + yCua;

  return Math.sqrt(suma);

}

function buscarRestaurantesDistancia(dist, cX, cY) {

  const restaurantesContainer = document.getElementById('restaurantes-container');
  restaurantesContainer.innerHTML = "";

  let x1 
  let d


  getAllRestaurantes()
    .then(data => {

      data.forEach(restaurante => {
        
        x1 = obtenerCoordenadas(restaurante.resumen.coordenadas);

        d = obtenerDistancia(x1.valor1, x1.valor2, cX, cY)

        if (d <= dist) {
          renderRestaurantes([restaurante])
        }

        return true;
        
      })
    })
    .catch(error => {
      console.error(error);
    });
}


if (window.location.pathname.includes('allRestaurantes.html')) {

  document.getElementById('buscar').addEventListener('click', function (event) {
    const input = document.getElementById('searchInput');
    const nombre = input.value.trim();
    buscarRestaurantes(nombre);
  });

  // Modal para buscar por rango
  document.getElementById('btnRango').addEventListener('click', function () {
    $('#modal-rango').modal('show');
  });

  document.getElementById('cancelrango').addEventListener('click', function () {
    $('#modal-rango').modal('hide');
  });

  document.getElementById('btnBRango').addEventListener('click', function () {
    let minimo = $('#minimo').val()
    let maximo = $('#maximo').val()
    buscarRestaurantesRango(minimo, maximo)
    $('#modal-rango').modal('hide');
  });

  // Modal para buscar por ciudad
  document.getElementById('btnCiudad').addEventListener('click', function () {
    $('#modal-ciudad').modal('show');
  });

  document.getElementById('cancelCiudad').addEventListener('click', function () {
    $('#modal-ciudad').modal('hide');
  });

  document.getElementById('btnBCiudad').addEventListener('click', function () {
    let ciudad = $('#ciudad').val()
    buscarRestaurantesCiudad(ciudad)
    $('#modal-ciudad').modal('hide');
  });


  // Modal para buscar por distancia
  document.getElementById('btnDist').addEventListener('click', function () {
    $('#modal-dist').modal('show');
  });

  document.getElementById('cancelDist').addEventListener('click', function () {
    $('#modal-dist').modal('hide');
  });

  document.getElementById('btnBDist').addEventListener('click', function () {
    let distancia = $('#distancia').val()
    let coordX = $('#coordX').val()
    let coordY = $('#coordY').val()
    buscarRestaurantesDistancia(distancia, coordX, coordY)
    $('#modal-dist').modal('hide');
  });

  getAllRestaurantes()
    .then(data => {
      renderRestaurantes(data);
    })
    .catch(error => {
      console.error(error);
    });
}

if (window.location.pathname.includes('plato.html')) {
  let btn_contact = document.getElementById('btnEnviarIncidencia');
  btn_contact.addEventListener('click', sendIncidencia);
};

if (window.location.pathname.includes('plato.html')) {
  let btnEnviarIncidencia = document.getElementById('btnEnviarIncidencia');
  btnEnviarIncidencia.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = window.location.href;
  });
};

if (window.location.pathname.includes('plato.html')) {
  let urlParams = new URLSearchParams(window.location.search);
  let plato = urlParams.get('nombre');
  let restaurante = urlParams.get('id');
  getIncidencias(restaurante, plato)
    .then(incidencias => {
      renderIncidencias(incidencias);
    })
    .catch(error => {
      console.error('Error al obtener las incidencias:', error);
    });

}

if (window.location.pathname.includes('restaurante.html')) {
  document.getElementById('btnSitiosTuristicos').addEventListener('click', function (event) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    window.history.back();
    window.location.href = `sitiosTuristicos.html?id=${id}`;
  });

}





