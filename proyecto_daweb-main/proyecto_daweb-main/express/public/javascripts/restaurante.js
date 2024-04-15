function borrarRestaurante() {

    console.log("Entro")
  
    let nombre = $('#nombre').val()
    let coordenadas = $('#coordenadas').val()
  
    fetch('restaurantes/register', {
      method: 'post',
      redirect: 'follow',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ 'nombre': nombre, 'coordenadas': coordenadas })
    })
      .then(resultado => { return resultado.text() })
      .then(resultado => {
        $('#result_restaurante').text(resultado)
      }
      )
  
  }


document.addEventListener('DOMContentLoaded', function() {

    let botonBorrar = document.getElementById('botonBorrar');

    botonBorrar.addEventListener('click', function() {
        borrarRestaurante();
        modal.style.display = 'none';
      });

});