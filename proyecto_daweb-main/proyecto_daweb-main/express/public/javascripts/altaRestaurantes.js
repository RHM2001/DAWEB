function sendRestaurante() {

  console.log("Entro")

  let nombre = $('#nombre').val()
  let coordenadasX = $('#coordenadasX').val()
  let coordenadasY = $('#coordenadasY').val()
  let ciudad = $('#ciudad').val()
  var coordenadas = coordenadasX + ',' + coordenadasY;

  fetch('restaurantes/register', {
    method: 'post',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ 'nombre': nombre, 'coordenadas': coordenadas, 'ciudad': ciudad})
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

document.addEventListener('DOMContentLoaded', function() {
  let botonAlta = document.getElementById('btnAltaRestaurante');
  let modal = document.getElementById('demo-modal');
  let botonClose = document.getElementById('cancel');
  let botonCrear = document.getElementById('botonCrear');

  if ( getCookie('jwt') == null)
    window.location.href = 'index.html';

  botonClose.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  botonAlta.addEventListener('click', function() {
    modal.style.display = 'block';
  });

  botonCrear.addEventListener('click', function() {
    const res = sendRestaurante();
    window.location.href = 'allRestaurantes.html';
    modal.style.display = 'none';
  });
});


var botonCrear = document.getElementById('btnAltaRestaurante');

botonCrear.addEventListener('click', function () {

  var nombre = document.getElementById('nombre').value;
  var ciudad = document.getElementById('ciudad').value;
  var coordenadasX = document.getElementById('coordenadasX').value;
  var coordenadasY = document.getElementById('coordenadasY').value;
  var coordenadas = coordenadasX + ',' + coordenadasY;

  var contentModal = document.getElementById('modal-body');
  contentModal.innerHTML = '<strong>Nombre:</strong> ' + nombre + '<br>' + '<strong>Coordenadas</strong>: ' + coordenadas + '<br>' + '<strong>Ciudad</strong>: ' + ciudad;
});




