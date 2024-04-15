function sendPlato(id) {

  let nombre = $('#nombre').val()
  let descripcion = $('#descripcion').val()
  let precio = $('#precio').val()

  fetch(`plato/alta?id=${id}`, {
    method: 'post',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ 'nombre': nombre, 'descripcion': coordenadas, 'precio': precio })
  })
    .then(resultado => { return resultado.text() })
    .then(resultado => {
      $('#result_restaurante').text(resultado)
    }
    )

}



const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

document.getElementById('cancel').addEventListener('click', function () {
  $('#demo-modal').modal('hide');
});

document.getElementById('btnAltaPlato').addEventListener('click', function () {
  window.location.href = `altaPlato.html?id=${id}`;
  $('#demo-modal').modal('show');
});

document.getElementById('botonCrear').addEventListener('click', function () {
  sendPlato(id);
  window.location.href = `altaPlato.html?id=${id}`;
  $('#demo-modal').modal('hide');
});