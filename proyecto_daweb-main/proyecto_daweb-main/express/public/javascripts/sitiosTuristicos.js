function getSitiosTuristicosXY(x, y) {

    return fetch(`/sitiosTuristicos/xy?x=${x}&y=${y}`, {
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

function establecerSitiosTuristicos(sitiosTuristicos) {

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    var data = {
        sitiosTuristicos: sitiosTuristicos
    };

    return fetch(`/sitiosTuristicos/establecer?id=${id}`, {
        method: 'put',
        redirect: 'follow',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta no fue exitosa');
            }
            // Resuelve un valor (puede ser cualquier valor que desees)
            return 'Solicitud exitosa';
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


function cargarActuales() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    getRestaurante(id)
        .then(function (restaurante) {
            var sitiosTuristicos = restaurante.sitiosTuristicos;
            console.log("VALOR DE SITIOS TURISTICOS ->" + sitiosTuristicos);

            var listaElementosSeleccionados = $("#elementosSeleccionados");
            listaElementosSeleccionados.empty(); // Limpiar la lista antes de agregar los elementos

            if (sitiosTuristicos.length > 0) {
                console.log("SI TENGO");
                sitiosTuristicos.forEach(function (sitio) {
                    var titulo = sitio.titutlo;
                    var li = $("<li>")
                        .addClass("list-group-item")
                        .text(titulo)
                        .data("sitio", sitio);
                    listaElementosSeleccionados.append(li);
                });
            } else {
                console.log("NO TENGO");
                var mensaje = "No hay sitios turísticos establecidos.";
                var li = $("<li>")
                    .addClass("list-group-item")
                    .text(mensaje);
                listaElementosSeleccionados.append(li);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

var elementosSeleccionados = []; // Array para almacenar los elementos seleccionados

function seleccionarElemento() {
    var elemento = $(this).data("sitio");
    var isChecked = $(this).prop("checked");

    if (isChecked) {
        elementosSeleccionados.push(elemento);
    } else {
        var index = elementosSeleccionados.indexOf(elemento);
        if (index > -1) {
            elementosSeleccionados.splice(index, 1);
        }
    }
}


function cargarElementosDisponibles() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    var x, y;

    // Llamar al método getRestaurante para obtener las coordenadas
    getRestaurante(id)
        .then(function (restaurante) {
            var nombreRestaurante = restaurante.nombre;

            // Mostrar el nombre del restaurante en el elemento h2
            $("#restauranteNombre").text(nombreRestaurante);

            var coordenadas = restaurante.coordenadas;

            // Separar las coordenadas en x e y
            var coordenadasArray = coordenadas.split(",");
            x = coordenadasArray[0].trim();
            y = coordenadasArray[1].trim();

            getSitiosTuristicosXY(x, y)
                .then(function (sitio) {
                    var listaElementosDisponibles = $("#elementosDisponibles");

                    sitio.forEach(function (sitioItem) {
                        var titulo = sitioItem.titutlo;
                        var li = $("<li>").addClass("list-group-item");

                        var label = $("<label>").addClass("form-check-label");
                        var checkbox = $("<input>")
                            .attr("type", "checkbox")
                            .addClass("form-check-input")
                            .data("sitio", sitioItem)
                            .change(seleccionarElemento);

                        label.append(checkbox, titulo);
                        li.append(label);
                        listaElementosDisponibles.append(li);
                    });
                });
        })
        .catch(function (error) {
            console.error(error);
        });
}

$("#btnAceptar").click(function () {
    console.log(elementosSeleccionados);

    establecerSitiosTuristicos(elementosSeleccionados)
        .then(function (response) {
            console.log(response);
            location.reload();
        })
        .catch(function (error) {
            console.error(error);
        });

});


// Cargar los elementos disponibles al cargar la página
$(document).ready(function () {
    cargarElementosDisponibles();
    cargarActuales();
});



