
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

  if ( getCookie('jwt') == null)
    window.location.href = 'index.html';
    // Obtener el valor de la cookie 'nombre'
    function getCookieValue(name) {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    }
  
    // Obtener el nombre de usuario de la cookie 'nombre'
    const nombreUsuario = getCookieValue('nombre');
  
    // Mostrar el nombre de usuario en la página
    const nombreUsuarioElement = document.getElementById('nombreUsuario');
    nombreUsuarioElement.textContent = `Bienvenido a tu perfil, ${nombreUsuario}`;
  });
  