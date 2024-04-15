function sendIncidencia() {
    e.preventDefault();
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

    fetch('register', {
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

function deleteIncidenciasByPlato(plato, restaruante) {

  return fetch(`/plato/deleteIncidenciasByPlato/${plato}/${restaruante}`, {
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

function borrarPlato(id, nombre) {

  deleteIncidenciasByPlato(nombre, id);

    return fetch(`plato/borrar?id=${id}&nombre=${nombre}`, {
      method: 'delete',
      redirect: 'follow',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
  
  }

  function actualizar(id, nombreP, nombre, descripcion, precio) {
    return fetch(`plato/actualizar?id=${id}&nombre=${nombreP}`, {
      method: 'put',
      redirect: 'follow',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ 'nombre': nombre, 'descripcion': descripcion, 'precio': precio })
    })

  }


 // Modal para borrar restaurante
 document.getElementById('btnBorrar').addEventListener('click', function () {
    $('#demo-modal').modal('show');
  });

  document.getElementById('botonCrear').addEventListener('click', function () {
    $('#demo-modal').modal('hide');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const nombre = urlParams.get('nombre')
    borrarPlato(id, nombre);
    window.history.back();
    window.location.href = `restaurante.html?id=${id}`;
    
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
    $('#modal-act').modal('hide');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const nombreP = urlParams.get('nombre')
    let nombre = $('#nombre').val()
    let descripcion = $('#descripcion').val()
    let precio = $('#precio').val()
    actualizar(id, nombreP, nombre, descripcion, precio);
    window.history.back();
    window.location.href = `restaurante.html?id=${id}`;
   
  });

window.onload = function () {
    let btn_contact = document.getElementById('btnEnviarIncidencia');
    btn_contact.addEventListener('click', sendIncidencia);
      
};