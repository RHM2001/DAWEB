function redireccionarRegistro() {
    window.location.href = 'registro.html';
}

function redireccionarInicioSesion() {
    window.location.href = 'index.html';
}

function redireccionarCrearRestaurante() {
    window.location.href = 'altaRestaurante.html';
}

function redireccionarPerfil() {
    window.location.href = 'perfil.html';
}

function redireccionarRestaurantes() {
    window.location.href = 'allRestaurantes.html';
}

function redireccionarPaginaInicio() {
    fetch('login/logout', {
        method: 'get',
        redirect: 'follow',
        headers: new Headers({ 'Content-Type': 'application/json' }),
      })
    window.location.href = 'PaginaInicio.html';
}

function redireccionarInicio() {
    window.location.href = 'http://localhost:3000/';
}

function redireccionarGit() {
    window.location.href = 'http://localhost:8090/oauth2/authorization/github';
}



var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl);
});

window.onload = function () {

    fetch("footer.html").then(response => { return response.text() })
        .then(data => {
            document.querySelector("body").insertAdjacentHTML('beforeend', data)

        });
}

