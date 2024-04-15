function sendUsuario() {
    console.log("send");
  
    fetch('login/register', {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Usuario registrado exitosamente:', data);
    })
    .catch(error => {
      console.error('Error al registrar el usuario:', error);
    });
  }
  
  window.onload = function () {
    let btn_contact = document.getElementById('btnAltaUsuario');
    btn_contact.addEventListener('click', sendUsuario);
  };
  